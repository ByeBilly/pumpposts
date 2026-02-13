"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderOpen, Image as ImageIcon, Check, Loader2 } from "lucide-react";

export function VaultPicker({ onSelect }: { onSelect: (url: string) => void }) {
    const [selected, setSelected] = useState<string | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            fetchFiles();
        }
    }, [open]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/media/list");
            const data = await res.json();
            setFiles(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch vault", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="border-2 border-dashed border-white/5 rounded-xl p-8 text-center hover:border-blue-600/30 transition-all cursor-pointer group bg-zinc-950/20">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <FolderOpen className="text-zinc-500 group-hover:text-blue-500" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Vault Inventory</p>
                    <p className="text-[10px] text-zinc-700 italic">Select from Media Vault</p>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Vault Selection</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Pick an existing asset from your site's secure storage.
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-orange-500" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Accessing Vault...</p>
                    </div>
                ) : files.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-xl my-6">
                        <ImageIcon size={40} className="mx-auto text-zinc-800 mb-4" />
                        <p className="text-xs font-bold text-zinc-500 uppercase">The Vault is currently empty</p>
                        <p className="text-[10px] text-zinc-700 italic mt-1">Upload assets from the site detail page first.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 py-6">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                onClick={() => setSelected(file.url)}
                                className={`relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${selected === file.url ? "border-orange-500 ring-2 ring-orange-500/20" : "border-white/5 hover:border-white/20"
                                    }`}
                            >
                                <img
                                    src={file.url}
                                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                                    alt={file.name}
                                />
                                {selected === file.url && (
                                    <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center">
                                        <div className="bg-orange-600 rounded-full p-1 shadow-xl">
                                            <Check size={16} className="text-white" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 p-2 bg-black/90 backdrop-blur-sm border-t border-white/5">
                                    <p className="text-[8px] truncate font-black uppercase tracking-tight text-white">{file.name}</p>
                                    <p className="text-[7px] text-orange-500 font-bold uppercase">{file.site}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="ghost"
                        className="text-zinc-500 font-bold uppercase text-[10px]"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-orange-600 hover:bg-orange-700 font-bold uppercase italic h-11 px-10 shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all active:scale-95"
                        disabled={!selected}
                        onClick={() => {
                            if (selected) {
                                onSelect(selected);
                                setOpen(false);
                            }
                        }}
                    >
                        Select Asset
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
