import { NextResponse } from "next/server";

/**
 * Temporary debug endpoint to verify env vars reach serverless runtime.
 * Remove after confirming RESEND_API_KEY is available in production.
 * GET /api/_debug/env
 */
export async function GET() {
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const hasAuthUrl = !!process.env.AUTH_URL;
    const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
    const hasAuthSecret = !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET);

    return NextResponse.json({
        hasResendKey,
        hasAuthUrl,
        hasNextAuthUrl,
        hasAuthSecret,
        runtime: "nodejs" as const,
    });
}
