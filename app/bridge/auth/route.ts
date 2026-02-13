import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");
    const token = searchParams.get("token");

    if (!siteId || !token) {
        return new Response("Missing Bridge Credentials", { status: 400 });
    }

    // --- BRIDGE HANDSHAKE LOGIC ---
    // In a real production scenario, the 'token' would be a JWT signed by 
    // the client site (Turner Installs) and verified using the Site's secret/API key.

    // 1. Verify the site exists
    const site = await prisma.site.findUnique({
        where: { id: siteId },
        include: { owner: true }
    });

    if (!site) {
        return new Response("Invalid Bridge Endpoint", { status: 404 });
    }

    // 2. Validate the Token
    // The 'token' provided in the URL must match the Site's secret API Key.
    if (token !== site.apiKey) {
        return new Response("Vault Bridge Authentication Failed: Invalid Token", { status: 401 });
    }

    // 3. Impersonate / Bridge the Session
    // We want to log Liam in as a "Site Manager" for this specific site.
    // For now, we'll redirect him to the site's detail page.

    return redirect(`/dashboard/sites/${siteId}?bridge=active`);
}
