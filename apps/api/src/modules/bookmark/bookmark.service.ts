import { prisma } from "../../lib/prisma";
import { createError } from "../../http/error";
import { redis } from "../../lib/redis";

type PrismaErrorLike = {
    code?: string;
};

export const getBookmarksService = async (
    userId: number,
    tags?: string[],
    page: number = 1,
    limit: number = 10,
    q?: string
) => {

    const cacheKey = `bookmarks:${userId}:page-${page}:limit-${limit}:tags-${tags?.join(",") || 'none'}:q-${q || 'none'}`;

    const cacheData = await redis.get(cacheKey);

    if (cacheData){
        return JSON.parse(cacheData);
    }

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId,
            ...(
                q ? {
                    OR: [
                        {
                            title: {
                                contains: q,
                                mode: "insensitive"
                            }
                        },
                        {
                            url: {
                                contains: q,
                                mode: "insensitive"
                            }
                        },
                        {
                            description: {
                                contains: q,
                                mode: "insensitive"
                            }
                        }]
                } : {}
            ),
            ...(tags && tags.length > 0
                ? {
                    tags: {
                        some: {
                            name: {
                                in: tags.map(t => t.toLowerCase())
                            }
                        }
                    }
                }
                : {})
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            tags: true
        }
    });

    await redis.setex(cacheKey, 60, JSON.stringify(bookmarks));

    return bookmarks;

}

export const createBookmarkService = async (
    url: string,
    title: string,
    description: string | undefined,
    userId: number,
    tags?: string[]
) => {
    const safeTags = tags ?? [];
    try {
        const bookmark = await prisma.bookmark.create({
            data: {
                url,
                title,
                description,
                user: {
                    connect: {
                        id: userId
                    }
                },
                tags: {
                    connectOrCreate: safeTags.map(tag => ({
                        where: {
                            name_userId: {
                                name: tag.toLowerCase(),
                                userId
                            }
                        },
                        create: {
                            name: tag.toLowerCase(),
                            userId
                        }
                    }))
                }
            },
            include: {
                tags: true
            }
        });
        await invalidateUserCache(userId)
        return bookmark;
    } catch (err) {
        const e = err as PrismaErrorLike;

        if (e?.code === "P2002") {
            throw createError("Bookmark already exists", 409);
        }

        throw err;
    }
};

export const deleteBookmarkService = async (bookmarkId: number, userId: number) => {
    const bookmark = await prisma.bookmark.findFirst({
        where: {
            id: bookmarkId,
            userId
        }
    })

    if (!bookmark) {
        throw createError("Bookmark not found", 404);
    }

    await prisma.bookmark.deleteMany({
        where: {
            id: bookmarkId,
            userId
        }
    })

    await invalidateUserCache(userId)
}

export const updateBookmarkService = async (
    title: string,
    url: string,
    description: string,
    tags: string[],
    bookmarkId: number,
    userId: number
) => {
    const safeTags = tags ?? [];
    const bookamrk = await prisma.bookmark.findFirst({
        where: {
            id: bookmarkId,
            userId
        }
    })

    if (!bookamrk) {
        throw createError("Bookmark not found", 404);
    }

    const updatedBookmark = await prisma.bookmark.update({
        where: {
            id: bookmarkId,
        },
        data: {
            title,
            url,
            description,
            tags: {
                connectOrCreate: safeTags.map(tag => ({
                    where: {
                        name_userId: {
                            name: tag.toLowerCase(),
                            userId
                        }
                    },
                    create: {
                        name: tag.toLowerCase(),
                        userId
                    }
                }))
            }
        },
        include: {
            tags: true
        }
    })

    await invalidateUserCache(userId);

    return updatedBookmark;
}

export const invalidateUserCache = async (userId: number) => {
    const keys = await redis.keys(`bookmarks:${userId}:*`);

    if (keys.length > 0) {
        await redis.del(keys);
    }
}

