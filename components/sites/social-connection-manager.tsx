"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Instagram,
    Linkedin,
    Twitter,
    Facebook,
    Plus,
    ShieldCheck,
    Copy,
    Check,
    ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SocialConnectionManager({ initialAccounts, apiKey, siteId }: { initialAccounts: any[], apiKey: string, siteId: string }) {
    const [copied, setCopied] = useState(false);

    const linkSocial = (platform: string) => {
        const endpoint = platform === 'meta' || platform === 'facebook' || platform === 'instagram'
            ? '/api/oauth/meta/link'
            : `/api/oauth/${platform}/link`;
        window.location.href = `${endpoint}?siteId=${siteId}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Outlets */}
            <div className="md:col-span-2 space-y-8">
                <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-white/[0.01] border-b border-white/5 pb-6">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-black italic uppercase tracking-tight">Social Outlets</CardTitle>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest h-8">
                                        <Plus className="mr-1 h-3 w-3" /> Connect New
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-white/10 text-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Expand Network</DialogTitle>
                                        <DialogDescription className="text-zinc-500">
                                            Link a new social platform to this site's deployment engine.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 gap-4 py-6">
                                        <Button
                                            onClick={() => linkSocial('meta')}
                                            variant="outline"
                                            className="h-24 flex flex-col gap-2 border-white/5 bg-zinc-950/50 hover:border-orange-600/50 transition-all"
                                        >
                                            <Instagram className="text-pink-500" />
                                            <span className="text-[10px] font-black uppercase">Instagram</span>
                                        </Button>
                                        <Button
                                            onClick={() => linkSocial('linkedin')}
                                            variant="outline"
                                            className="h-24 flex flex-col gap-2 border-white/5 bg-zinc-950/50 hover:border-blue-600/50 transition-all"
                                        >
                                            <Linkedin className="text-blue-500" />
                                            <span className="text-[10px] font-black uppercase">LinkedIn</span>
                                        </Button>
                                        <Button
                                            onClick={() => linkSocial('twitter')}
                                            variant="outline"
                                            className="h-24 flex flex-col gap-2 border-white/5 bg-zinc-950/50 hover:border-blue-400/50 transition-all"
                                        >
                                            <Twitter className="text-white" />
                                            <span className="text-[10px] font-black uppercase">X (Twitter)</span>
                                        </Button>
                                        <Button
                                            onClick={() => linkSocial('meta')}
                                            variant="outline"
                                            className="h-24 flex flex-col gap-2 border-white/5 bg-zinc-950/50 hover:border-blue-800/50 transition-all"
                                        >
                                            <Facebook className="text-blue-800" />
                                            <span className="text-[10px] font-black uppercase">Facebook</span>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {initialAccounts.map((acc) => (
                            <div key={acc.id} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-white/5 rounded-xl group hover:border-orange-600/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${acc.platform === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-blue-600'
                                        }`}>
                                        {acc.platform === 'instagram' ? <Instagram className="text-white h-5 w-5" /> : <Linkedin className="text-white h-5 w-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm uppercase tracking-tight">{acc.platform}</h4>
                                        <p className="text-xs text-zinc-500 font-mono">@{acc.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[9px] font-black uppercase">Active</Badge>
                                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white">
                                        <ExternalLink size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Bridge Control (API Key) */}
            <div className="space-y-8">
                <Card className="bg-orange-600/5 border-orange-600/20 backdrop-blur-sm shadow-[0_0_40px_rgba(234,88,12,0.05)]">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Bridging API Key</span>
                        </div>
                        <CardTitle className="text-sm font-black text-white uppercase tracking-widest">Access Credentials</CardTitle>
                        <CardDescription className="text-xs text-zinc-500">Authenticates transmissions from client sites.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative group">
                            <div className="bg-zinc-950 rounded-lg p-3 font-mono text-sm text-zinc-400 border border-white/5 pr-12 overflow-hidden truncate">
                                {apiKey}
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={copyToClipboard}
                                className="absolute right-1 top-1 text-zinc-500 hover:text-orange-500 transition-colors"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </Button>
                        </div>
                        <div className="mt-6 p-3 bg-green-500/5 rounded-lg border border-green-500/10 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-widest leading-none">Bridge Operational</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
