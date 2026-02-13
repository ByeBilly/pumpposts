import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, Globe, Plus, Rocket, CreditCard, Users, Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { MediaVault } from "@/components/dashboard/media-vault";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    // SaaS Multi-tenant Mock Data (User's Core Fleet)
    const sites = [
        { id: "1", name: "Turner Installs", domain: "turnerinstalls.com.au", status: "Healthy", plan: "PRO", usage: 42, limit: 500 },
        { id: "2", name: "INURPC", domain: "inurpc.com", status: "Healthy", plan: "PRO", usage: 12, limit: 500 },
        { id: "3", name: "Receptionists", domain: "receptionists.net.au", status: "Healthy", plan: "AGENCY", usage: 85, limit: 2000 },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 selection:bg-orange-500/30">
            <div className="max-w-7xl mx-auto">
                {/* SaaS Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="border-orange-600/50 text-orange-500 bg-orange-950/20 px-2 py-0 uppercase">ADMIN: {session.user?.email}</Badge>
                            <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">v1.0-SaaS</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent text-left uppercase italic">Engine Control</h1>
                        <p className="text-zinc-400 mt-1">Multi-tenant social synchronization orchestration.</p>
                    </div>
                    <div className="flex gap-3">
                        <SignOutButton />
                        <Link href="/dashboard/compose">
                            <Button className="bg-zinc-100 text-black hover:bg-white font-black h-11 px-6 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] uppercase italic text-xs tracking-tight">
                                <Zap className="mr-2 h-4 w-4 text-orange-600 fill-orange-600" /> Compose Transmission
                            </Button>
                        </Link>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold h-11 px-6 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                                    <Plus className="mr-2 h-4 w-4" /> Register Tenant
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border-white/10 text-white">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black uppercase italic italic tracking-tighter">Initialize New Tenant</DialogTitle>
                                    <DialogDescription className="text-zinc-500">
                                        Register a new site to the hub. This will generate a unique Bridging API Key.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Site Identity (Name)</Label>
                                        <Input placeholder="e.g. Turner Installs" className="bg-zinc-950/50 border-white/5 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Digital Domain</Label>
                                        <Input placeholder="e.g. turnerinstalls.com.au" className="bg-zinc-950/50 border-white/5 h-12" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700 font-black uppercase italic tracking-widest h-12">
                                        Activate Engine
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* SaaS-ready Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm group hover:border-orange-600/20 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Tenants</CardTitle>
                            <Globe className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tighter">24</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-green-500 font-bold">+8.2%</span>
                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Growth</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm group hover:border-green-600/20 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Monthly Throughput</CardTitle>
                            <Activity className="h-4 w-4 text-green-500 group-hover:animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tighter">12.8k</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Successful Posts</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm group hover:border-blue-600/20 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Avg. Engagement</CardTitle>
                            <Rocket className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tighter">4.2%</div>
                            <div className="flex items-center gap-2 mt-1 text-zinc-600 uppercase tracking-widest text-[10px]">Across all platforms</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-600/10 border-orange-600/20 backdrop-blur-sm hover:bg-orange-600/20 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-orange-500 uppercase tracking-widest">Projected Revenue</CardTitle>
                            <CreditCard className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tighter text-orange-500">$2,450</div>
                            <div className="text-[10px] text-orange-900 font-bold uppercase tracking-widest mt-1">MRR Estimate</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tenant Table */}
                <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
                    <CardHeader className="border-b border-white/5 pb-6 bg-white/[0.01] px-8">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-black italic tracking-tighter uppercase">Tenant Inventory</CardTitle>
                            <div className="flex gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">All Engines Nominal</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-zinc-950/50">
                                    <TableRow className="border-white/5 hover:bg-transparent">
                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] pl-8">Site Identity</TableHead>
                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Tier</TableHead>
                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Quota Utilization</TableHead>
                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em]">Sync Status</TableHead>
                                        <TableHead className="text-right text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] pr-8">Orchestration</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sites.map((site) => (
                                        <TableRow key={site.id} className="border-white/5 hover:bg-orange-600/[0.02] transition-colors group">
                                            <TableCell className="pl-8 py-6">
                                                <Link href={`/dashboard/sites/${site.id}`} className="flex flex-col group/link">
                                                    <span className="font-black text-white group-hover/link:text-orange-500 transition-colors uppercase tracking-tight">{site.name}</span>
                                                    <span className="text-zinc-600 text-[10px] font-mono">{site.domain}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn(
                                                    "text-[9px] font-black italic",
                                                    site.plan === 'AGENCY' ? 'bg-purple-600/20 text-purple-400 border-purple-600/50' :
                                                        site.plan === 'PRO' ? 'bg-orange-600/20 text-orange-400 border-orange-600/50' :
                                                            'bg-zinc-800 text-zinc-500 border-white/5'
                                                )}>
                                                    {site.plan}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="min-w-[200px]">
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-[10px] font-mono">
                                                        <span className="text-zinc-500">{site.usage} / {site.limit} posts</span>
                                                        <span className={site.usage / site.limit > 0.9 ? 'text-red-500' : 'text-zinc-600'}>
                                                            {Math.round((site.usage / site.limit) * 100)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full transition-all duration-1000",
                                                                site.usage / site.limit > 0.9 ? "bg-red-600" : "bg-orange-600"
                                                            )}
                                                            style={{ width: `${(site.usage / site.limit) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "h-1 w-1 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.5)]",
                                                        site.status === "Healthy" ? "bg-green-500" : "bg-orange-500"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest",
                                                        site.status === "Healthy" ? "text-green-500" : "text-orange-500"
                                                    )}>
                                                        {site.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Link href={`/dashboard/sites/${site.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white hover:bg-white/10 h-8 rounded-md font-bold uppercase text-[10px] tracking-widest">
                                                        <Users className="h-3 w-3 mr-2 text-orange-600" /> Manage
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Media Management Center */}
                <div className="mt-12">
                    <MediaVault />
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
