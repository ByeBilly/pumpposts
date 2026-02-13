import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const siteSlug = formData.get("siteSlug") as string; // e.g., 'turnerinstalls'

        if (!file || !siteSlug) {
            return NextResponse.json({ error: "Missing file or site identifier" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        // Define the path: public/media/[siteSlug]/[filename]
        const relativeDir = path.join("public", "media", siteSlug);
        const absoluteDir = path.join(process.cwd(), relativeDir);
        const absolutePath = path.join(absoluteDir, filename);

        // Ensure directory exists
        await mkdir(absoluteDir, { recursive: true });

        // Write file
        await writeFile(absolutePath, buffer);

        return NextResponse.json({
            message: "Payload secured in vault",
            url: `/media/${siteSlug}/${filename}`,
            name: filename,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        });

    } catch (error) {
        console.error("Upload Bridge Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
