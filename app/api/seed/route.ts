import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        console.log("🚀 Seeding PumpPosts Fleet...");

        // 1. Create the Master Admin User
        const adminEmail = "billiamglobal@gmail.com";
        const user = await prisma.user.upsert({
            where: { email: adminEmail },
            update: { role: "ADMIN" },
            create: {
                email: adminEmail,
                name: "Billiam",
                role: "ADMIN"
            }
        });

        console.log(`✅ Master Admin Created: ${user.email}`);

        // 2. Create the Site Fleet
        const sites = [
            {
                name: "INURPC",
                domain: "inurpc.com",
                apiKey: "hub_live_inurpc_777",
                monthlyPostLimit: 100
            },
            {
                name: "Turner Installs",
                domain: "turnerinstalls.com.au",
                apiKey: "hub_live_turner_888",
                monthlyPostLimit: 50
            },
            {
                name: "Receptionists.net.au",
                domain: "receptionists.net.au",
                apiKey: "hub_live_reception_999",
                monthlyPostLimit: 25
            }
        ];

        const results = [];

        for (const siteData of sites) {
            // Upsert requires a unique identifier. We'll use domain as the unique key for lookup.
            // If it doesn't exist, we create it.
            const site = await prisma.site.upsert({
                where: { domain: siteData.domain },
                update: {
                    apiKey: siteData.apiKey,
                    ownerId: user.id
                },
                create: {
                    name: siteData.name,
                    domain: siteData.domain,
                    apiKey: siteData.apiKey,
                    monthlyPostLimit: siteData.monthlyPostLimit,
                    ownerId: user.id
                }
            });
            results.push(site);
            console.log(`📡 Site Boarded: ${site.name} (${site.domain})`);
        }

        return NextResponse.json({
            message: "Fleet Seeded Successfully",
            admin: user.email,
            sites: results.map(s => ({ name: s.name, id: s.id, bridgeLink: `/bridge/auth?siteId=${s.id}&token=${s.apiKey}` }))
        });

    } catch (error) {
        console.error("Seeding Failed:", error);
        return NextResponse.json({ error: "Seeding Failed", details: String(error) }, { status: 500 });
    }
}
