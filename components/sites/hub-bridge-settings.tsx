"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, ExternalLink, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HubBridgeSettings({ apiKey, siteId }: { apiKey: string, siteId: string }) {
    const bridgeUrl = `https://pumpposts.com/bridge/auth?siteId=${siteId}&token=[SECURE_JWT]`;

    return (
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <Link className="text-orange-500" size={18} />
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Hub Bridge Connection</CardTitle>
                </div>
                <CardDescription className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
                    Seamlessly link your client site to this Hub Engine
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Key size={12} className="text-orange-500" /> Remote Access Token
                    </h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                        Use this secure link inside the Turner Installs dashboard to allow Liam to bypass the Hub login screen.
                    </p>
                    <div className="bg-black/50 p-2 rounded border border-white/5 font-mono text-[9px] text-zinc-600 break-all mb-4">
                        {bridgeUrl}
                    </div>
                    <Button variant="outline" className="w-full border-orange-600/30 text-orange-500 hover:bg-orange-600/10 text-[10px] font-black uppercase tracking-widest h-10">
                        Copy Bridge Link
                    </Button>
                </div>

                <div className="p-4 border border-blue-600/20 bg-blue-600/5 rounded-xl flex items-start gap-3">
                    <Shield size={14} className="text-blue-500 mt-0.5" />
                    <p className="text-[10px] text-blue-200 leading-snug">
                        Liam will be restricted to ONLY this site's data. He will not see other tenants in your fleet.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
