const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");
require("dotenv").config();

const libsql = createClient({
    url: process.env.DATABASE_URL || "file:./dev.db",
});
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🚀 Seeding PumpPosts Fleet...");

    // 1. Create the Master Admin User
    const adminEmail = "billiamglobal@gmail.com";
    const user = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
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
            ownerId: user.id,
            monthlyPostLimit: 100
        },
        {
            name: "Turner Installs",
            domain: "turnerinstalls.com.au",
            apiKey: "hub_live_turner_888",
            ownerId: user.id,
            monthlyPostLimit: 50
        },
        {
            name: "Receptionists.net.au",
            domain: "receptionists.net.au",
            apiKey: "hub_live_reception_999",
            ownerId: user.id,
            monthlyPostLimit: 25
        }
    ];

    for (const siteData of sites) {
        const site = await prisma.site.upsert({
            where: { domain: siteData.domain },
            update: siteData,
            create: siteData
        });
        console.log(`📡 Site Boarded: ${site.name} (${site.domain})`);
    }

    console.log("✨ Seeding Complete. Your fleet is ready for transmission.");
    process.exit(0);
}

main().catch(err => {
    console.error("❌ Seeding Failed:", err);
    process.exit(1);
});
