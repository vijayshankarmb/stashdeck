import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { success, failure } from "../../http/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../../config";

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        return failure(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    return success(res,{messge: "User created successfully", user: {
        id: user.id,
        email: user.email
    }}, 201);

}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return failure(res, "User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return failure(res, "Invalid password", 401);
    }

    const token =  jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production" ? true : false,
        sameSite: "lax"
    })

    return success(res,{messge: "User signed in successfully", user: {
        id: user.id,
        email: user.email
    }}, 200);
}

export const signOut = async (req: Request, res: Response) => {
    res.clearCookie("token");
    return success(res,{messge: "User signed out successfully"}, 200);
}

export const getMe = async (req: Request, res: Response) => {
    const user = req.user

    return success(res,{messge: "User fetched successfully", user}, 200);
}