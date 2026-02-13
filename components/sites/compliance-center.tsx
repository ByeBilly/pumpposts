"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, FileText, Trash2, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplianceCenter() {
    return (
        <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
                <CardHeader className="border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                        <Shield className="text-orange-500" size={18} />
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-white">API Compliance Engine</CardTitle>
                    </div>
                    <CardDescription className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
                        Required metadata for Meta & LinkedIn App Review
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl space-y-3">
                        <div className="flex items-start gap-3">
                            <FileText size={16} className="text-zinc-600 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Privacy Policy</h4>
                                <p className="text-[10px] text-zinc-500 mt-1">Legally required link for all social API endpoints.</p>
                                <Button variant="link" className="text-orange-500 text-[10px] p-0 h-auto mt-2 gap-1 uppercase font-black">
                                    View Policy <ExternalLink size={10} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl space-y-3">
                        <div className="flex items-start gap-3">
                            <Trash2 size={16} className="text-zinc-600 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Data Deletion Instructions</h4>
                                <p className="text-[10px] text-zinc-500 mt-1">Meta requirement: Users must have a clear path to request data removal.</p>
                                <Button variant="link" className="text-orange-500 text-[10px] p-0 h-auto mt-2 gap-1 uppercase font-black">
                                    Data Request Flow <ExternalLink size={10} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-orange-600/5 border border-orange-600/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <Info size={16} className="text-orange-500 mt-0.5" />
                            <div>
                                <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-widest">Screencast Readiness</h4>
                                <p className="text-[10px] text-zinc-400 mt-1">This screen is configured to be used in your official App Review video for Meta/LinkedIn.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
