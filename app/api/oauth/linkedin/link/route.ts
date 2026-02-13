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

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

    // Scopes required for posting and profile access
    const scope = encodeURIComponent("w_member_social profile openid email");

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized: Missing user ID" }, { status: 401 });
    }

    // We pass siteId in the 'state' parameter to retrieve it in the callback
    const state = encodeURIComponent(JSON.stringify({ siteId, userId: session.user.id }));

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}
