import { prisma } from "../../lib/prisma";
import { createError } from "../../http/error";

type PrismaErrorLike = {
    code?: string;
};

export const getBookmarksService = async (userId: number) => {
    return prisma.bookmark.findMany({
        where: {
            userId
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
