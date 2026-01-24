import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validator";
import { createBookmarkSchema, updateBookmarkSchema } from "./bookmark.schema";
import { getBookmarks, createBookmark, deleteBookmark, updateBookmark, getTags } from "./bookmark.controller";

const router = Router();

router.get('/', protect, getBookmarks);
router.post('/', protect, validate(createBookmarkSchema), createBookmark);
router.delete('/:id', protect, deleteBookmark);
router.put('/:id', protect, validate(updateBookmarkSchema), updateBookmark);
router.get('/tags', protect, getTags);

export default router;