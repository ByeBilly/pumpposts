import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// Email → scope: "all" = full access, siteId = single-site access
const EMAIL_SCOPE_MAP: Record<string, "all" | string> = {
    "billiamglobal@gmail.com": "all",
    "liam@turnerinstalls.com.au": "turnerinstalls.com.au",
    "gladiuslumen@gmail.com": "receptionists.net.au",
};

const AUTHORIZED_EMAILS = Object.keys(EMAIL_SCOPE_MAP);

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                const email = credentials?.email?.toString()?.toLowerCase()?.trim();
                if (!email || !AUTHORIZED_EMAILS.includes(email)) return null;

                const scopeKey = EMAIL_SCOPE_MAP[email];
                let scope: string = scopeKey;

                if (scopeKey !== "all") {
                    const site = await prisma.site.findUnique({
                        where: { domain: scopeKey },
                    });
                    if (!site) return null;
                    scope = site.id;
                }

                return {
                    id: scope === "all" ? "admin" : scope,
                    email,
                    name: email,
                    scope,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.email = user.email;
                token.scope = (user as { scope?: string }).scope;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub ?? "";
                session.user.email = token.email ?? "";
                (session as { scope?: string }).scope = token.scope as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    trustHost: true,
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
});
