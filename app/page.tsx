import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Target, Shield, Activity, Share2 } from "lucide-react";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/50 sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-xl skew-x-[-10deg]">P</div>
          <span className="text-xl font-bold tracking-tighter">PUMPPOSTS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#bridge" className="hover:text-white transition-colors">Bridge API</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" className="border-orange-600/50 text-orange-500 hover:bg-orange-600 hover:text-white transition-all">
            Launch Hub
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="relative pt-20 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />

          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-orange-400 mb-8 animate-bounce">
              <Zap size={14} />
              <span>Phase 1: The Engine Initialization is Live</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent uppercase italic">
              Scale Your <br />
              <span className="text-orange-600">SaaS Empire</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate headless engine for multi-tenant social media management. Launch your own social SaaS, manage client inventory, and orchestrate growth from one central hub.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 h-14 rounded-xl text-lg group">
                Open Master Admin
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 h-14 px-8 rounded-xl text-lg">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Abstract Preview */}
          <div className="mt-20 max-w-6xl mx-auto relative group px-4">
            <div className="absolute inset-0 bg-orange-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm overflow-hidden aspect-video shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-900/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-900/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-900/50" />
                </div>
                <div className="text-[10px] text-zinc-500 font-mono text-center flex-1">pumpposts-hub.v1.admin</div>
                <div className="w-10" />
              </div>
              <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4 text-left hidden md:block">
                  <div className="h-4 w-2/3 bg-orange-600/20 rounded animate-pulse" />
                  <div className="h-20 w-full bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="h-20 w-full bg-zinc-800 rounded-lg" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-800/80 rounded-xl border border-white/5">
                      <div className="text-xs text-zinc-500 mb-1">Total Posts</div>
                      <div className="text-2xl font-bold tracking-tighter">12,482</div>
                    </div>
                    <div className="p-4 bg-zinc-800/80 rounded-xl border border-white/5">
                      <div className="text-xs text-zinc-500 mb-1">Connected Sites</div>
                      <div className="text-2xl font-bold tracking-tighter">24</div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 bg-zinc-950 rounded-xl border border-orange-600/20 font-mono text-xs md:text-sm text-orange-400/80">
                    <div className="mb-2 text-zinc-500 italic font-sans text-xs"># Bridge API Activity</div>
                    <div>POST /api/v1/sync SUCCESS [Turner Installs]</div>
                    <div>POST /api/v1/sync SUCCESS [Solar Master]</div>
                    <div className="animate-pulse">_</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 uppercase italic">Engine Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Precision Target", text: "Schedule posts across multiple platforms with pixel-perfect timing control." },
                { icon: Shield, title: "Vault-Grade Security", text: "Encrypted JWT communication between your client sites and the master hub." },
                { icon: Activity, title: "Sync Health", text: "Real-time monitoring of all connected client accounts and posting status." },
                { icon: Share2, title: "Multipath Bridge", text: "One API call from a client site can broadcast to 5+ social platforms." },
                { icon: Zap, title: "Hyper-Scaling", text: "Designed to handle thousands of concurrent client sites without breaking a sweat." },
                { icon: Activity, title: "Automated Recovery", text: "Smart retry logic for failed social API requests to ensure delivery." }
              ].map((f, i) => (
                <Card key={i} className="bg-zinc-900/50 border-white/5 hover:border-orange-600/30 transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 mb-2">
                      <f.icon size={20} />
                    </div>
                    <CardTitle className="text-lg font-bold text-white">{f.title}</CardTitle>
                    <CardDescription className="text-zinc-400">{f.text}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="text-zinc-500 text-sm mb-4">
          Built for dominance by <span className="text-white font-medium italic">Antigravity AI</span>
        </div>
        <div className="flex justify-center gap-6 text-zinc-400 text-xs uppercase tracking-widest font-mono">
          <span>v1.0.0-INIT</span>
          <span>© 2026 PUMPPOSTS HUB</span>
        </div>
      </footer>
    </div>
  );
}
