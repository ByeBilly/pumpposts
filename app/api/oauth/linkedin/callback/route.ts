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

        // 1. Exchange Code for Access Token
        const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                client_id: process.env.LINKEDIN_CLIENT_ID!,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error("LinkedIn Token Error:", tokenData);
            return NextResponse.json({ error: "Failed to obtain access token" }, { status: 500 });
        }

        const accessToken = tokenData.access_token;

        // 2. Fetch LinkedIn Profile Info (to get the username/display name)
        const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profileData = await profileResponse.json();

        // 3. Store/Update the SocialAccount in DB
        const socialAccount = await prisma.socialAccount.upsert({
            where: {
                siteId_platform_username: {
                    siteId,
                    platform: "linkedin",
                    username: profileData.sub, // Use LinkedIn Unique ID as username
                },
            },
            update: {
                accessToken,
                displayName: `${profileData.given_name} ${profileData.family_name}`,
                profileUrl: profileData.picture || "",
                isActive: true,
            },
            create: {
                siteId,
                platform: "linkedin",
                username: profileData.sub,
                platformId: profileData.sub,
                accessToken,
                displayName: `${profileData.given_name} ${profileData.family_name}`,
                profileUrl: profileData.picture || "",
            },
        });

        // 4. Redirect back to the Site Detail Page with success
        return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/sites/${siteId}?linked=linkedin`);

    } catch (error) {
        console.error("LinkedIn OAuth Callback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
