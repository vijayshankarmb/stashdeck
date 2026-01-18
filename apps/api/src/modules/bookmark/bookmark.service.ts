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
    });
};

export const createBookmarkService = async (
    url: string,
    title: string,
    description: string | undefined,
    userId: number
) => {
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
            },
        });
    } catch (err) {
        const e = err as PrismaErrorLike;

        if (e?.code === "P2002") {
            throw createError("Bookmark already exists", 409);
        }

        throw err;
    }
};
