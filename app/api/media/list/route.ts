import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const siteSlug = searchParams.get("siteSlug") || "all";

        const mediaDir = path.join(process.cwd(), "public", "media");
        let files: any[] = [];

        const getFilesFromDir = async (dir: string, slug: string) => {
            try {
                const items = await readdir(dir, { withFileTypes: true });
                return items
                    .filter(item => item.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(item.name))
                    .map(item => ({
                        id: `${slug}-${item.name}`,
                        name: item.name,
                        url: `/media/${slug}/${item.name}`,
                        site: slug
                    }));
            } catch (e) {
                return [];
            }
        };

        const SITES = ["turnerinstalls", "inurpc", "receptionists"];

        if (siteSlug === "all") {
            for (const slug of SITES) {
                const siteDir = path.join(mediaDir, slug);
                const siteFiles = await getFilesFromDir(siteDir, slug);
                files = [...files, ...siteFiles];
            }
        } else {
            files = await getFilesFromDir(path.join(mediaDir, siteSlug), siteSlug);
        }

        return NextResponse.json(files);
    } catch (error) {
        console.error("List Media Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
