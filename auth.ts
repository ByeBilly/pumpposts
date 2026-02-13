import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// List of authorized emails for the Master Hub
const AUTHORIZED_EMAILS = [
    "billiamglobal@gmail.com",
    "gladiuslumen@gmail.com",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: "onboarding@resend.dev",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            // Only allow authorized emails to log in
            const isAuthorized = AUTHORIZED_EMAILS.includes(user.email.toLowerCase());

            if (isAuthorized) {
                // Automatically promote billiamglobal@gmail.com to ADMIN if they aren't already
                await prisma.user.upsert({
                    where: { email: user.email.toLowerCase() },
                    update: { role: "ADMIN" },
                    create: {
                        email: user.email.toLowerCase(),
                        role: "ADMIN"
                    },
                });
                return true;
            }

            return false; // Access Denied for everyone else
        },
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
        verifyRequest: "/login/verify", // Custom verification page
    },
    debug: process.env.NODE_ENV === "development",
    logger: {
        error(error: Error) {
            console.error("NextAuth Error:", error);
        },
        warn(code: string) {
            console.warn("NextAuth Warning:", code);
        },
        debug(message: string, metadata?: unknown) {
            console.log("NextAuth Debug:", message, metadata);
        },
    },
});
