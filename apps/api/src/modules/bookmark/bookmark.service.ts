import { prisma } from "../../lib/prisma";
import { createError } from "../../http/error";

type PrismaErrorLike = {
    code?: string;
};

export const getBookmarksService = async (userId: number, tags?: string[]) => {
    return prisma.bookmark.findMany({
        where: {
            userId,
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
        include: {
            tags: true
        }
    });
};

export const createBookmarkService = async (
    url: string,
    title: string,
    description: string | undefined,
    userId: number,
    tags?: string[]
) => {
    const safeTags = tags ?? [];
    try {
        return await prisma.bookmark.create({
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

    return prisma.bookmark.deleteMany({
        where: {
            id: bookmarkId,
            userId
        }
    })
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

    return prisma.bookmark.update({
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
}


