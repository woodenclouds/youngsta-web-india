import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
    if (request.cookies.has("auth_token")) {
    } else {
        if (request.nextUrl.pathname.startsWith("/my-account")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/my-account/:path*", "/"],
};
