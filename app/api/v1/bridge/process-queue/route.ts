import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // 1. Find pending payloads ready for transmission
        const pendingPosts = await prisma.postQueue.findMany({
            where: {
                status: "PENDING",
                scheduledAt: {
                    lte: new Date()
                }
            },
            include: {
                site: {
                    include: {
                        socialAccounts: true
                    }
                }
            }
        });

        if (pendingPosts.length === 0) {
            return NextResponse.json({ message: "No pending transmissions found in queue." });
        }

        const results = [];

        for (const post of pendingPosts) {
            try {
                // --- REAL WORLD LOGIC WOULD HAPPEN HERE ---
                // 1. Loop through site.socialAccounts
                // 2. Call Meta/LinkedIn/X API with the accessToken
                // 3. Handle rate limits and failures

                // Mocking a successful transmission for this SaaS MVP
                await prisma.postQueue.update({
                    where: { id: post.id },
                    data: {
                        status: "POSTED",
                        postedAt: new Date()
                    }
                });

                results.push({ id: post.id, status: "SUCCESS" });

            } catch (err) {
                console.error(`Failed to transmit post ${post.id}:`, err);

                await prisma.postQueue.update({
                    where: { id: post.id },
                    data: {
                        status: "FAILED",
                        error: (err as Error).message
                    }
                });

                results.push({ id: post.id, status: "FAILED" });
            }
        }

        return NextResponse.json({
            message: `Transmission cycle complete. Processed ${pendingPosts.length} payloads.`,
            results
        });

    } catch (error) {
        console.error("Queue Processor Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
