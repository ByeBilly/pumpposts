import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isLoginPage = req.nextUrl.pathname === "/login";
    const isAuthApi = req.nextUrl.pathname.startsWith("/api/auth");

    if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", req.nextUrl));
    }

    if (!isLoginPage && !isAuthApi && !isLoggedIn) {
        return Response.redirect(new URL("/login", req.nextUrl));
    }

    return undefined;
});

export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
