import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
        return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const appId = process.env.META_APP_ID;
    const redirectUri = process.env.META_REDIRECT_URI;

    // Scopes for Facebook Pages and Instagram Business
    const scope = encodeURIComponent("public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish");

    const state = encodeURIComponent(JSON.stringify({ siteId }));

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}
