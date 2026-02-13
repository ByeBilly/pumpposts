import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Globe,
    Plus,
    ArrowLeft,
    Settings,
    Zap,
    Activity,
    MessageSquare,
    Star,
    TrendingUp,
    UserPlus
} from "lucide-react";
import Link from "next/link";
import { SocialConnectionManager } from "@/components/sites/social-connection-manager";
import { ComplianceCenter } from "@/components/sites/compliance-center";
import { HubBridgeSettings } from "@/components/sites/hub-bridge-settings";

export default async function SiteDetailPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) redirect("/login");

    // Mocking turnerinstalls.com.au for the demo
    const site = {
        id: params.id,
        name: "Turner Installs",
        domain: "turnerinstalls.com.au",
        apiKey: "pp_4f92...a82b",
        plan: "PRO",
        status: "Healthy",
        currentMonthPosts: 42,
        monthlyPostLimit: 500,
        metrics: {
            mentions: 1248,
            reviewScore: 4.8,
            syncHealth: 99.2,
            activeLeads: 42
        },
        socialAccounts: [
            { id: "1", platform: "instagram", username: "turner_installs_official", status: "Connected", lastSync: "14 mins ago" },
            { id: "2", platform: "facebook", username: "turnerinstalls", status: "Connected", lastSync: "14 mins ago" },
            { id: "3", platform: "linkedin", username: "turner-installs-flooring", status: "Connected", lastSync: "3 hours ago" },
            { id: "4", platform: "google", username: "Turner Installs GMB", status: "Connected", lastSync: "2 mins ago" }
        ]
    };

    if (!site) return notFound();

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 selection:bg-orange-500/30">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group w-fit">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Hub Inventory</span>
                </Link>

                {/* Site Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center border border-orange-600/30">
                                <Globe className="text-orange-500 h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">{site.name}</h1>
                                    <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/50 text-[10px] uppercase font-black italic">
                                        {site.plan}
                                    </Badge>
                                </div>
                                <p className="text-zinc-500 font-mono text-sm ml-1">{site.domain}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/dashboard/compose">
                            <Button className="bg-zinc-100 text-black hover:bg-white font-black px-6 rounded-lg uppercase italic text-xs tracking-tight h-11">
                                <Zap className="mr-2 h-4 w-4 text-orange-600 fill-orange-600" /> Transmit Update
                            </Button>
                        </Link>
                        <Button variant="outline" className="border-white/5 text-zinc-400 hover:text-white bg-white/[0.02] h-11">
                            <Settings className="mr-2 h-4 w-4" /> Config
                        </Button>
                    </div>
                </div>

                {/* Metric Grid - Matching the Energy */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Total Mentions", value: site.metrics.mentions, icon: MessageSquare, color: "text-blue-500", trend: "+12.5%" },
                        { label: "Review Score", value: site.metrics.reviewScore, icon: Star, color: "text-yellow-500", trend: "+0.2" },
                        { label: "Sync Health", value: `${site.metrics.syncHealth}%`, icon: Activity, color: "text-green-500", trend: "Optimal" },
                        { label: "Active Leads", value: site.metrics.activeLeads, icon: TrendingUp, color: "text-orange-500", trend: "+34%" },
                    ].map((metric, i) => (
                        <Card key={i} className="bg-zinc-900/50 border-white/5 backdrop-blur-sm group hover:border-white/10 transition-all">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{metric.label}</span>
                                    <metric.icon className={metric.color} size={16} />
                                </div>
                                <div className="text-3xl font-black tracking-tighter">{metric.value}</div>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className={`text-[10px] font-bold ${metric.trend.includes('+') ? 'text-green-500' : 'text-zinc-600'}`}>{metric.trend}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <SocialConnectionManager
                            initialAccounts={site.socialAccounts}
                            apiKey={site.apiKey}
                            siteId={site.id}
                        />

                        {/* Sync Logic List */}
                        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="bg-white/[0.01] border-b border-white/5">
                                <CardTitle className="text-lg font-black italic uppercase tracking-tight">Platform Health</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-white/5">
                                    {site.socialAccounts.map((acc) => (
                                        <div key={acc.id} className="flex items-center justify-between p-6 hover:bg-white/[0.01] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${acc.status === 'Connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
                                                <span className="text-sm font-bold capitalize text-zinc-300">{acc.platform} {acc.platform === 'google' ? 'Business' : acc.platform === 'linkedin' ? 'Company' : 'Page'}</span>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-[10px] text-zinc-600 font-mono uppercase">Last sync: {acc.lastSync}</span>
                                                <Button variant="ghost" size="icon" className="h-4 w-4 text-zinc-800 hover:text-white">
                                                    <Settings size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {/* Team Access */}
                        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                        <UserPlus size={16} /> Team Access
                                    </CardTitle>
                                    <span className="text-[9px] font-mono text-zinc-700">1/5 SLOTS</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-white/5 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center border border-orange-600/30 text-orange-500 font-black text-xs">L</div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold">Liam</span>
                                            <span className="text-[9px] text-zinc-600 uppercase">Site Manager</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-500/10 text-green-500 border-none text-[8px] font-black italic">ACTIVE</Badge>
                                </div>
                                <Button className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[10px] tracking-widest h-11">
                                    Add Staff Member
                                </Button>
                            </CardContent>
                        </Card>

                        <ComplianceCenter />
                        <HubBridgeSettings apiKey={site.apiKey} siteId={site.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
