import { Router } from "express";
import { getBookmarks, createBookmark } from "./bookmark.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validator";
import { createBookmarkSchema } from "./bookmark.schema";

const router = Router();

router.get('/', protect, getBookmarks);
router.post('/', protect, validate(createBookmarkSchema), createBookmark);

export default router;