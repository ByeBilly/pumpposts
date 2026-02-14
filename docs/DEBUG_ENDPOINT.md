# Debug Endpoint — Remove After Confirmation

**Endpoint:** `GET /api/_debug/env`

Returns JSON with boolean flags for env var presence:
- `hasResendKey`
- `hasAuthUrl`
- `hasNextAuthUrl`
- `hasAuthSecret`
- `runtime`

**Purpose:** Verify `RESEND_API_KEY` and related vars reach Vercel serverless runtime.

**Action:** Delete `app/api/_debug/env/route.ts` after confirming env vars are correct in production.
