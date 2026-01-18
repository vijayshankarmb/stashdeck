import type { Response, Request } from "express";
import { success, failure } from "../../http/response";
import { getBookmarksService, createBookmarkService } from "./bookmark.service";

export const getBookmarks = async (req: Request, res: Response) => {

    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const bookmarks = await getBookmarksService(user.id)

    return success(res,{message: "Bookmarks fetched successfully", bookmarks}, 200);

}

export const createBookmark = async (req: Request, res: Response) => {

    const { title, url, description } = req.body

    const user = req.user

    if (!user) {
        return failure(res, "Not authorized to access this route", 401);
    }

    const bookmark = await createBookmarkService(url, title, description, user.id)

    return success(res,{messge: "Bookmark created successfully", bookmark}, 201);
}

