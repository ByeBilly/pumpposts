import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        const { name, domain, ownerEmail } = await req.json();

        if (!name || !domain || !ownerEmail) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Ensure User exists
        let user = await prisma.user.findUnique({
            where: { email: ownerEmail },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { email: ownerEmail },
            });
        }

        // Check if site already exists
        const existing = await prisma.site.findUnique({
            where: { domain },
        });

        if (existing) {
            return NextResponse.json({ error: "Domain already registered" }, { status: 409 });
        }

        // Generate API Key
        const apiKey = `pp_${randomBytes(24).toString("hex")}`;

        const site = await prisma.site.create({
            data: {
                name,
                domain,
                apiKey,
                ownerId: user.id,
            },
        });

        return NextResponse.json({
            message: "Site registered successfully",
            siteId: site.id,
            apiKey: site.apiKey,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
