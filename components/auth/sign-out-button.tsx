"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    return (
        <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border-white/5 text-zinc-500 hover:text-white bg-white/[0.02] h-11 px-4"
        >
            <LogOut size={16} className="mr-2" />
            Logout
        </Button>
    );
}
