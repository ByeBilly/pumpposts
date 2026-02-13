"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FolderOpen,
    Image as ImageIcon,
    Video,
    MoreVertical,
    UploadCloud,
    Search,
    Grid,
    List as ListIcon,
    Trash2,
    ExternalLink,
    Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MOCK_FILES = [
    { id: "1", name: "van-decal-preview.jpg", size: "1.2 MB", type: "IMAGE", site: "Turner Installs", date: "2026-02-14" },
    { id: "2", name: "pc-build-timelapse.mp4", size: "45 MB", type: "VIDEO", site: "INURPC", date: "2026-02-13" },
    { id: "3", name: "receptionist-hero.png", size: "2.5 MB", type: "IMAGE", site: "Receptionists", date: "2026-02-10" },
    { id: "4", name: "installation-promo.jpg", size: "800 KB", type: "IMAGE", site: "Turner Installs", date: "2026-02-14" },
];

export function MediaVault() {
    const [view, setView] = useState<"grid" | "list">("grid");

    const [uploading, setUploading] = useState(false);
    const [selectedSite, setSelectedSite] = useState("turnerinstalls");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("siteSlug", selectedSite);

        try {
            const res = await fetch("/api/media/upload", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                alert(`Payload Transmitted: ${data.name} is now in the ${selectedSite} vault.`);
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-white/5 bg-white/[0.01] px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <CardTitle className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-2">
                            <FolderOpen className="text-orange-500" size={24} />
                            Media Vault
                        </CardTitle>
                        <CardDescription className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                            Static asset repository for your SaaS fleet
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <Input
                                placeholder="Search Assets..."
                                className="bg-zinc-950/50 border-white/5 h-9 pl-9 text-xs w-[200px] focus:border-orange-600/50 transition-all font-mono"
                            />
                        </div>
                        <label className="cursor-pointer">
                            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                            <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 h-9 font-black uppercase text-[10px] tracking-tight">
                                <span>
                                    {uploading ? "Transmitting..." : <><UploadCloud className="mr-2 h-4 w-4" /> Upload</>}
                                </span>
                            </Button>
                        </label>
                    </div>
                </div>
            </CardHeader>

            <div className="p-4 border-b border-white/5 bg-zinc-950/20 flex justify-between items-center px-8">
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedSite("all")}
                        className={cn("text-[10px] font-black uppercase tracking-widest pb-1 transition-colors", selectedSite === "all" ? "text-orange-500 border-b-2 border-orange-600" : "text-zinc-600 hover:text-zinc-400")}
                    >
                        All Assets
                    </button>
                    <button
                        onClick={() => setSelectedSite("turnerinstalls")}
                        className={cn("text-[10px] font-black uppercase tracking-widest pb-1 transition-colors", selectedSite === "turnerinstalls" ? "text-orange-500 border-b-2 border-orange-600" : "text-zinc-600 hover:text-zinc-400")}
                    >
                        Turner Installs
                    </button>
                    <button
                        onClick={() => setSelectedSite("inurpc")}
                        className={cn("text-[10px] font-black uppercase tracking-widest pb-1 transition-colors", selectedSite === "inurpc" ? "text-orange-500 border-b-2 border-orange-600" : "text-zinc-600 hover:text-zinc-400")}
                    >
                        INURPC
                    </button>
                    <button
                        onClick={() => setSelectedSite("receptionists")}
                        className={cn("text-[10px] font-black uppercase tracking-widest pb-1 transition-colors", selectedSite === "receptionists" ? "text-orange-500 border-b-2 border-orange-600" : "text-zinc-600 hover:text-zinc-400")}
                    >
                        Receptionists
                    </button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setView("grid")}
                        className={view === "grid" ? "text-orange-500 bg-orange-600/10" : "text-zinc-600"}
                    >
                        <Grid size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setView("list")}
                        className={view === "list" ? "text-orange-500 bg-orange-600/10" : "text-zinc-600"}
                    >
                        <ListIcon size={16} />
                    </Button>
                </div>
            </div>

            <CardContent className="p-8">
                {view === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {MOCK_FILES.map((file) => (
                            <div key={file.id} className="group relative bg-zinc-950/50 border border-white/5 rounded-xl aspect-square overflow-hidden hover:border-orange-600/30 transition-all cursor-pointer">
                                {/* File Preview Placeholder */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                    {file.type === "IMAGE" ? (
                                        <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                            <ImageIcon className="text-zinc-700" size={32} />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                            <Video className="text-zinc-700" size={32} />
                                        </div>
                                    )}
                                </div>

                                {/* Overlay info */}
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    <p className="text-[10px] font-bold text-white truncate">{file.name}</p>
                                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{file.site}</p>
                                </div>

                                {/* Actions */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex gap-1">
                                        <Button size="icon" variant="secondary" className="h-6 w-6 bg-black/50 hover:bg-orange-600 text-white rounded-md">
                                            <Plus size={12} />
                                        </Button>
                                        <Button size="icon" variant="destructive" className="h-6 w-6 bg-black/50 hover:bg-red-600 text-white rounded-md">
                                            <Trash2 size={12} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Upload Trigger */}
                        <div className="border-2 border-dashed border-white/5 rounded-xl aspect-square flex flex-col items-center justify-center p-4 hover:border-orange-600/20 hover:bg-orange-600/[0.02] transition-all cursor-pointer group">
                            <Plus className="text-zinc-800 group-hover:text-orange-500 group-hover:scale-120 transition-all" size={32} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 mt-2">New Payload</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {MOCK_FILES.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-white/5 rounded-lg hover:border-orange-600/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    {file.type === "IMAGE" ? <ImageIcon className="text-zinc-600" size={18} /> : <Video className="text-zinc-600" size={18} />}
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-orange-500 transition-colors uppercase italic">{file.name}</span>
                                        <span className="text-[9px] text-zinc-600 font-mono">{file.size} • {file.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-zinc-800 text-[8px] text-zinc-500 border-none uppercase font-black">{file.site}</Badge>
                                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white h-8 w-8">
                                        <MoreVertical size={14} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            <div className="bg-zinc-950/50 border-t border-white/5 p-4 px-8 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Storage Stable</span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-widest">Cap: 50.0 GB</span>
                </div>
                <Button variant="link" className="text-orange-600 text-[10px] font-black uppercase tracking-tighter p-0 h-auto gap-1">
                    Explore File System <ExternalLink size={10} />
                </Button>
            </div>
        </Card>
    );
}
