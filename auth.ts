import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? process.env.AUTH_RESEND_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "PumpPosts <onboarding@resend.dev>";

const AUTHORIZED_EMAILS = [
    "billiamglobal@gmail.com",
    "gladiuslumen@gmail.com",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    providers: [
        Resend({
            apiKey: RESEND_API_KEY ?? undefined,
            from: EMAIL_FROM,
            async sendVerificationRequest({ identifier: email, url, provider }) {
                if (!RESEND_API_KEY) {
                    const msg = "RESEND_API_KEY or AUTH_RESEND_KEY is not set. Add it to Vercel Environment Variables for production.";
                    console.error("[NextAuth]", msg);
                    throw new Error(msg);
                }

                const { Resend: ResendClient } = await import("resend");
                const resend = new ResendClient(RESEND_API_KEY);

                const result = await resend.emails.send({
                    from: provider.from as string,
                    to: email,
                    subject: "Sign in to PumpPosts",
                    html: `
                        <p>Click the link below to sign in to PumpPosts:</p>
                        <p><a href="${url}">Sign in</a></p>
                        <p>This link will expire in 24 hours.</p>
                    `,
                });

                if (result.error) {
                    console.error("[NextAuth] Resend error:", result.error);
                    throw new Error(result.error.message ?? "Failed to send email");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;
            const isAuthorized = AUTHORIZED_EMAILS.includes(user.email.toLowerCase());
            if (!isAuthorized) return false;

            // Ensure user exists and is ADMIN
            await prisma.user.upsert({
                where: { email: user.email.toLowerCase() },
                update: { role: "ADMIN" },
                create: { email: user.email.toLowerCase(), role: "ADMIN" },
            });
            return true;
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
