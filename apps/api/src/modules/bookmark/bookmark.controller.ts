import type { Response, Request } from "express";
import { success, failure } from "../../http/response";
import { getBookmarksService, createBookmarkService, deleteBookmarkService, updateBookmarkService } from "./bookmark.service";

export const getBookmarks = async (req: Request, res: Response) => {

    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const rawTag = req.query.tag

    let tags: string[] | undefined;

    if (typeof rawTag === "string") {
        tags = [rawTag];
    } else if (Array.isArray(rawTag)) {
        tags = rawTag.filter((t): t is string => typeof t === "string");
    }

    const bookmarks = await getBookmarksService(user.id, tags)

    return success(res, { message: "Bookmarks fetched successfully", bookmarks }, 200);

}

export const createBookmark = async (req: Request, res: Response) => {

    const { title, url, description, tags } = req.body

    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const bookmark = await createBookmarkService(url, title, description, user.id, tags ?? [])

    return success(res, { messge: "Bookmark created successfully", bookmark }, 201);
}

export const deleteBookmark = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const { id } = req.params

    await deleteBookmarkService(Number(id), user.id)

    return success(res, { messge: "Bookmark deleted successfully" }, 200);
}

export const updateBookmark = async (req: Request, res: Response) => {

    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const { id } = req.params

    const { title, url, description, tags } = req.body

    const bookmark = await updateBookmarkService(title, url, description, tags ?? [], Number(id), user.id)

    return success(res, { messge: "Bookmark updated successfully", bookmark }, 200);
}