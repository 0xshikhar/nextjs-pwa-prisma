"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
});

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="w-full border-b bg-background px-6 py-4">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    Superblog
                </Link>
                <div className="flex items-center gap-3">
                    <Button asChild variant="secondary">
                        <Link href="/posts">Posts</Link>
                    </Button>
                    {session ? (
                        <>
                            <Button asChild>
                                <Link href="/posts/new">New Post</Link>
                            </Button>
                            <div className="flex items-center gap-3">
                                <div className="text-xs text-muted-foreground">
                                    {session.user?.name && (
                                        <div className="text-foreground">{session.user.name}</div>
                                    )}
                                    <div>{session.user?.email}</div>
                                </div>
                                <Button
                                    onClick={() => signOut()}
                                    variant="destructive"
                                    type="button"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    )}
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
