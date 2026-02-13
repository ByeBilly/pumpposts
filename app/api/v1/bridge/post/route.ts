import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = req.headers.get("x-api-key");
        if (!apiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
        }

        const { content, mediaUrls, scheduledAt, platforms } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        // 1. Validate Site & API Key
        const site = await prisma.site.findUnique({
            where: { apiKey },
            include: { owner: true }
        });

        if (!site) {
            return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
        }

        if (!site.isActive) {
            return NextResponse.json({ error: "Site is currently suspended" }, { status: 403 });
        }

        // 2. Check Quota (The SaaS "Muscle")
        if (site.currentMonthPosts >= site.monthlyPostLimit) {
            return NextResponse.json({
                error: "Quota Exceeded",
                message: "You have reached your monthly posting limit. Please upgrade your plan."
            }, { status: 402 });
        }

        // 3. Queue the Post
        const post = await prisma.postQueue.create({
            data: {
                siteId: site.id,
                content,
                mediaUrls: mediaUrls || [],
                scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(),
                status: "PENDING",
            }
        });

        // 4. Increment Usage Tracking
        await prisma.site.update({
            where: { id: site.id },
            data: { currentMonthPosts: { increment: 1 } }
        });

        return NextResponse.json({
            message: "Post queued successfully via Hub Bridge",
            postId: post.id,
            status: "PENDING",
            quotaUsed: site.currentMonthPosts + 1,
            quotaLimit: site.monthlyPostLimit
        });

    } catch (error) {
        console.error("Bridge API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
