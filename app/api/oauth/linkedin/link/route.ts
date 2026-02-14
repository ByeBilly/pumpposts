import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
        return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

    // Scopes required for posting and profile access
    const scope = encodeURIComponent("w_member_social profile openid email");

    // We pass siteId in the 'state' parameter to retrieve it in the callback
    const state = encodeURIComponent(JSON.stringify({ siteId }));

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}
