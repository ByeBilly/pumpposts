import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const stateStr = searchParams.get("state");

    if (!code || !stateStr) {
        return NextResponse.json({ error: "Invalid OAuth response" }, { status: 400 });
    }

    try {
        const { siteId } = JSON.parse(decodeURIComponent(stateStr));

        // 1. Exchange Code for Access Token (Long-lived Token)
        const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.META_APP_ID}&redirect_uri=${process.env.META_REDIRECT_URI}&client_secret=${process.env.META_APP_SECRET}&code=${code}`);

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: "Failed to obtain Meta token" }, { status: 500 });
        }

        const accessToken = tokenData.access_token;

        // 2. Fetch User Profile to get a name/id
        const userResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name`);
        const userData = await userResponse.json();

        // 3. Store/Update the Primary Meta Account
        await prisma.socialAccount.upsert({
            where: {
                siteId_platform_username: {
                    siteId,
                    platform: "facebook",
                    username: userData.id,
                },
            },
            update: {
                accessToken,
                displayName: userData.name,
                isActive: true,
            },
            create: {
                siteId,
                platform: "facebook",
                username: userData.id,
                platformId: userData.id,
                accessToken,
                displayName: userData.name,
            },
        });

        return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/sites/${siteId}?linked=meta`);

    } catch (error) {
        console.error("Meta OAuth Callback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
