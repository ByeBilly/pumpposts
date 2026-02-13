"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Trigger Magic Link email
            const result = await signIn("resend", {
                email: email.toLowerCase(),
                redirect: false,
                callbackUrl: "/dashboard",
            });

            if (result?.error) {
                if (result.error === "AccessDenied") {
                    setError("This email is not authorized to access the Master Hub.");
                } else {
                    setError("Failed to send login code. Check your connection.");
                }
            } else {
                setIsSent(true);
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse border border-orange-600/30">
                    <Mail className="text-orange-500 h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Check Your Inbox</h2>
                <p className="text-zinc-500 max-w-sm mb-8">
                    A security login link has been sent to <span className="text-white font-bold">{email}</span>.
                    The link will expire in 24 hours.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setIsSent(false)}
                    className="bg-transparent border-white/10 text-zinc-500 hover:text-white"
                >
                    Try another email
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 selection:bg-orange-500/30">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full -z-10" />

            <Link href="/" className="flex items-center gap-2 mb-8 group transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-2xl skew-x-[-10deg] shadow-lg shadow-orange-600/20">P</div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">PumpPosts</span>
            </Link>

            <Card className="w-full max-w-md bg-zinc-900/50 border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 to-orange-950" />
                <CardHeader className="space-y-1 pb-8 pt-8">
                    <div className="flex items-center gap-2 text-orange-500 mb-2">
                        <ShieldCheck size={18} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Authorized Access Only</span>
                    </div>
                    <CardTitle className="text-3xl font-black text-white italic tracking-tight uppercase">Secure Entry</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Enter your authorized email to receive a secure login link.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Master Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 h-5 w-5" />
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="bg-zinc-950/50 border-white/5 h-14 pl-12 focus:border-orange-600/50 transition-all font-medium text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase italic leading-tight">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-lg shadow-orange-600/20"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Send Login Link
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em]">
                            SaaS Infrastructure Secured by <span className="text-white">Antigravity</span>
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex items-center gap-4 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                <span>ENCRYPTED</span>
                <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                <span>V1.0.1-OTP</span>
                <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                <span>FIREWALL_ACTIVE</span>
            </div>
        </div>
    );
}
