"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const resolvedTheme = theme === "system" ? systemTheme : theme;

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </Button>
    );
}

