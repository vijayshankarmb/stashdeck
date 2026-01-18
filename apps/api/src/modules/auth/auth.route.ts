import { Router } from "express";
import { signUp, signIn, getMe, signOut } from "./auth.controller";
import { validate } from "../../middlewares/validator";
import { signUpSchema, signInSchema } from "./auth.schema";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post('/signup', validate(signUpSchema), signUp);
router.post('/signin', validate(signInSchema), signIn);
router.get('/me', protect, getMe);
router.post('/signout', protect, signOut);

export default router;