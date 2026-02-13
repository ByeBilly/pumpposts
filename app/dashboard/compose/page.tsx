"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Send,
    Calendar as CalendarIcon,
    Instagram,
    Linkedin,
    Twitter,
    Image as ImageIcon,
    X,
    Zap,
    Clock,
    ChevronRight,
    Sparkles,
    UploadCloud,
    FolderOpen
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { VaultPicker } from "@/components/composer/vault-picker";

export default function PostComposer() {
    const [content, setContent] = useState("");
    const [date, setDate] = useState<Date>();
    const [platforms, setPlatforms] = useState({
        instagram: true,
        linkedin: true,
        twitter: false
    });
    const [images, setImages] = useState<string[]>([]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent uppercase italic">Engine Composer</h1>
                        <p className="text-zinc-500 mt-1">Drafting transmission for <span className="text-orange-500 font-bold italic">Turner Installs</span></p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white">
                            Save Draft
                        </Button>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                            Schedule Post
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-orange-600 to-orange-950" />
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-black uppercase italic tracking-tight">Transmission Content</CardTitle>
                                <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/10 gap-2">
                                    <Sparkles size={14} />
                                    AI Enhance
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder="What's the update from the hub?"
                                        className="min-h-[200px] bg-zinc-950/50 border-white/5 focus:border-orange-600/50 transition-all text-lg resize-none"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />

                                    {/* Media Dropzone / Library Picker */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border-2 border-dashed border-white/5 rounded-xl p-8 text-center hover:border-orange-600/30 transition-all cursor-pointer group bg-zinc-950/20">
                                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                <UploadCloud className="text-zinc-500 group-hover:text-orange-500" />
                                            </div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">New Payload</p>
                                            <p className="text-[10px] text-zinc-700 italic">Upload from Device</p>
                                        </div>

                                        <VaultPicker onSelect={(url) => setImages([url])} />
                                    </div>
                                </div>

                                {/* Platform Toggles */}
                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Target Networks</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            platforms.instagram ? "bg-orange-600/5 border-orange-600/30" : "bg-zinc-950/50 border-white/5"
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <Instagram className={platforms.instagram ? "text-orange-500" : "text-zinc-600"} size={18} />
                                                <span className="text-xs font-bold uppercase">Instagram</span>
                                            </div>
                                            <Switch
                                                checked={platforms.instagram}
                                                onCheckedChange={(val) => setPlatforms(p => ({ ...p, instagram: val }))}
                                            />
                                        </div>
                                        <div className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            platforms.linkedin ? "bg-blue-600/5 border-blue-600/30" : "bg-zinc-950/50 border-white/5"
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <Linkedin className={platforms.linkedin ? "text-blue-500" : "text-zinc-600"} size={18} />
                                                <span className="text-xs font-bold uppercase">LinkedIn</span>
                                            </div>
                                            <Switch
                                                checked={platforms.linkedin}
                                                onCheckedChange={(val) => setPlatforms(p => ({ ...p, linkedin: val }))}
                                            />
                                        </div>
                                        <div className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border transition-all",
                                            platforms.twitter ? "bg-zinc-100/5 border-zinc-100/30" : "bg-zinc-950/50 border-white/5 opacity-50"
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <Twitter className={platforms.twitter ? "text-white" : "text-zinc-600"} size={18} />
                                                <span className="text-xs font-bold uppercase tracking-tighter underline decoration-orange-500/50">X (Twitter)</span>
                                            </div>
                                            <Switch
                                                checked={platforms.twitter}
                                                onCheckedChange={(val) => setPlatforms(p => ({ ...p, twitter: val }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Preview */}
                        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-lg font-black uppercase italic tracking-tight text-green-500 flex items-center gap-2">
                                    <Zap size={18} />
                                    Live Pre-Transmission
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 border-t border-white/5">
                                <Tabs defaultValue="instagram" className="w-full">
                                    <div className="flex justify-center p-4">
                                        <TabsList className="bg-zinc-950 border border-white/5">
                                            <TabsTrigger value="instagram" className="data-[state=active]:bg-orange-600">Instagram</TabsTrigger>
                                            <TabsTrigger value="linkedin" className="data-[state=active]:bg-blue-600">LinkedIn</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="instagram" className="flex justify-center p-8 bg-black/50">
                                        <div className="w-[300px] border border-white/10 rounded-xl bg-zinc-900 overflow-hidden shadow-2xl">
                                            <div className="p-3 flex items-center gap-2 border-b border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-pink-600" />
                                                <span className="text-[10px] font-bold">turner_installs_official</span>
                                            </div>
                                            <div className="aspect-square bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                                                {images.length > 0 ? (
                                                    <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="text-zinc-700" size={48} />
                                                )}
                                            </div>
                                            <div className="p-3 space-y-2">
                                                <div className="flex gap-3">
                                                    <Instagram size={16} />
                                                </div>
                                                <p className="text-[11px] leading-snug line-clamp-3">
                                                    <span className="font-bold mr-1">turner_installs_official</span>
                                                    {content || "Your transmission content will appear here..."}
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="linkedin" className="p-8 bg-zinc-950/20">
                                        <p className="text-zinc-600 text-center text-xs italic">LinkedIn preview rendering engine active...</p>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Settings & Scheduling */}
                    <div className="space-y-8">
                        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Scheduling Payload</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest font-black">Transmission Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal bg-zinc-950/50 border-white/5 h-12",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                                                {date ? format(date, "PPP") : <span>Set Pulse Date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                                className="bg-zinc-900 text-white"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest font-black">Specific Pulse Time</Label>
                                    <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 h-12 rounded-md px-3 text-zinc-400">
                                        <Clock size={16} className="text-orange-500" />
                                        <span className="text-sm font-mono">09:00 AM</span>
                                        <ChevronRight size={14} className="ml-auto opacity-20" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-[10px] uppercase tracking-widest font-black">Smart Queue</Label>
                                            <p className="text-[9px] text-zinc-600">Auto-optimize for highest impact</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-orange-600/10 border-orange-600/20">
                            <CardHeader>
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-orange-500">Engine Readiness</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span>Bridge Connection: OK</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                    <span>Media Assets: NONE</span>
                                </div>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700 group mt-4 h-12 uppercase font-black italic tracking-tighter">
                                    Initiate Sync
                                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
