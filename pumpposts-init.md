# 🚀 PumpPosts Hub: The Master Initialization File
**Last Updated: 2026-02-14 (The Engine is Live)**

This document serves as the **SINGLE SOURCE OF TRUTH (SSOT)** for project resumption. When starting a new session, Antigravity MUST read this file to understand the architecture, current state, and immediate next steps.

---

## 🏛️ Architecture: The "Headless Engine"
The **PumpPosts Hub** is a centralized SaaS platform for managing social media posts across multiple client sites (the "Fleet").
*   **Core**: Next.js 16 (App Router) + TypeScript + Tailwind CSS.
*   **Database**: **SQLite** (Migrated from Postgres for portability).
    *   **Driver**: `@prisma/adapter-libsql` (Prisma 7 + LibSQL).
    *   **File**: `dev.db` (Local file database).
    *   **Config**: Managed via `prisma.config.ts`.
*   **Auth**: NextAuth v5 (currently blocked by Resend limit - **See Critical TODOs**).
*   **Media**: Local File System (`/public/media/[site-slug]`).
*   **Bridge**: API endpoints for client sites to communicate with the Hub.

---

## 📍 Current State: "Phase 1 Complete - Phase 2 Pending"
*   ✅ **Media Vault**: Fully functional. Scans local folders (`/public/media/...`) and serves assets via API.
*   ✅ **Engine Composer**: Live preview works. Real assets can be selected from the Vault.
*   ✅ **The Bridge**: Secure link API built for client sites.
*   ✅ **Database**: Schema finalized for SQLite (User, Site, SocialAccount, PostQueue).
*   ✅ **Flet Seeded**: The initial fleet (Turner, INURPC, Receptionists) has been populated into the database.
*   ⚠️ **Authentication**: Currently using "Magic Links" via Resend, but the **quota is exceeded**. Login is blocked.

---

## 🚨 CRITICAL NEXT STEPS (Resume Here)
**Priority 1: Bypass Authentication**
*   Create a "Dev Login" credential provider in `auth.ts` to bypass email requirements.
*   Allow login with a simple username/password for local development.

**Priority 2: Bridge Access**
*   Secure "Bridge Links" have been generated for direct site access.
*   **File**: `c:/dev/pumpposts/bridge-links.json`
*   Use these links to test site-specific dashboards (e.g., Turner Installs) without full login.

**Priority 3: Connect INURPC**
*   Upload real assets for INURPC to the Vault.
*   Test the full "Transmit" workflow with a real photo.

---

## 🛠️ Environment Configuration
Ensure `.env` matches this structure:
```env
# Database (Prisma 7 + SQLite)
DATABASE_URL="file:./dev.db"

# Auth (NextAuth v5)
AUTH_SECRET="[REDACTED]"
# RESEND_API_KEY="" (Currently exceeded)

# OAuth Clients (Fill these to enable social linking)
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
META_APP_ID=""
META_APP_SECRET=""
```

---

## 📜 Dev Commands
*   **Start Server**: `npm run dev` (Runs on `localhost:3000`)
*   **Database Push**: `npx prisma db push` (Updates SQLite schema)
*   **Generate Client**: `npx prisma generate` (Required after schema changes for Prisma 7)
*   **Seed Fleet**: `curl http://localhost:3000/api/seed` (Executed via API to avoid Node/Prisma binary mismatch)

---
*Blueprint generated for Billiam by Antigravity AI • 2026-02-14*
