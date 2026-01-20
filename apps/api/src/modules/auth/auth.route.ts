import { Router } from "express";
import { signUp, signIn, getMe, signOut } from "./auth.controller";
import { validate } from "../../middlewares/validator";
import { signUpSchema, signInSchema } from "./auth.schema";
import { protect } from "../../middlewares/auth.middleware";
import { rateLimiter } from "../../middlewares/rateLimit";

const router = Router();

const authLimiter = rateLimiter(5, 900);

router.post('/signup', authLimiter, validate(signUpSchema), signUp);
router.post('/signin', authLimiter, validate(signInSchema), signIn);
router.get('/me', protect, getMe);
router.post('/signout', protect, signOut);

export default router;