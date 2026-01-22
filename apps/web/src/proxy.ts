import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;

    console.log("Middleware running on:", pathname, "| Token found:", !!token);

    const isPublicPath = pathname === "/signin" || pathname === "/signup" || pathname === "/";

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}

