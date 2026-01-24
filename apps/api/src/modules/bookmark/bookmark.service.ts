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

    let cacheData: string | null = null;
    try {
        cacheData = await redis.get(cacheKey);
    } catch (e) {
        console.warn("Redis is down (read), falling back to DB");
    }

    if (cacheData) {
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

    try {
        await redis.setex(cacheKey, 60, JSON.stringify(bookmarks));
    } catch (e) {
        console.warn("Redis is down (write), skipping cache");
    }

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
        try {
            await invalidateUserCache(userId)
        } catch (error) {
            console.warn("Redis is down (invalidate), skipping cache clear");
        }
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

    try {
        await invalidateUserCache(userId)
    } catch (error) {
        console.warn("Redis is down (invalidate), skipping cache clear");
    }
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

    try {
        await invalidateUserCache(userId);
    } catch (error) {
        console.warn("Redis is down (invalidate), skipping cache clear");
    }

    return updatedBookmark;
}

export const invalidateUserCache = async (userId: number) => {
    const keys = await redis.keys(`bookmarks:${userId}:*`);

    if (keys.length > 0) {
        await redis.del(keys);
    }
}

export const getTagsService = async (userId: number) => {
    const tags = await prisma.tag.findMany({
        where: {
            userId
        },
        include: {
            _count: {
                select: {
                    bookmarks: true
                }
            }
        }
    })

    return tags;
}

