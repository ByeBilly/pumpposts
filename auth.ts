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
            async sendVerificationRequest({ identifier: email, url, provider }) {
                console.log("[NextAuth] sendVerificationRequest called");
                console.log("[NextAuth] Email:", email);
                console.log("[NextAuth] URL:", url);

                if (!process.env.RESEND_API_KEY) {
                    console.error("[NextAuth] RESEND_API_KEY is missing!");
                    throw new Error("RESEND_API_KEY is not configured");
                }

                console.log("[NextAuth] Attempting to send email via Resend...");

                const { Resend } = await import("resend");
                const resend = new Resend(process.env.RESEND_API_KEY);

                try {
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

                    console.log("[NextAuth] Email sent successfully:", result);
                } catch (error) {
                    console.error("[NextAuth] Failed to send email:", error);
                    throw error;
                }
            },
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
