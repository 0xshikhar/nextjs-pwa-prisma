"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Share2, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
    nav.standalone === true
  );
}

const DISMISS_KEY = "pwa_install_banner_dismissed_v1";

export default function PwaInstallBanner() {
  const [bipEvent, setBipEvent] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [dismissed, setDismissed] = useState(false);
  const [platform, setPlatform] = useState<"unknown" | "ios" | "other">(
    "unknown",
  );
  const [installed, setInstalled] = useState(false);

  const ios = platform === "ios";

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    setPlatform(isIosDevice() ? "ios" : "other");
    setInstalled(isStandalone());

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setBipEvent(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setBipEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const shouldShow = useMemo(() => {
    if (dismissed) return false;
    if (platform === "unknown") return false;
    if (installed) return false;
    if (ios) return true;
    return bipEvent !== null;
  }, [bipEvent, dismissed, installed, ios, platform]);

  if (!shouldShow) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      return;
    } finally {
      setDismissed(true);
    }
  };

  const install = async () => {
    if (!bipEvent) return;
    try {
      await bipEvent.prompt();
      await bipEvent.userChoice;
    } finally {
      setBipEvent(null);
    }
  };

  return (
    <div className="border-b bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <Alert className="relative pr-10">
          <AlertTitle className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Install Superblog
          </AlertTitle>
          <AlertDescription className="mt-1">
            {ios ? (
              <span className="flex flex-wrap items-center gap-1">
                To install, tap <Share2 className="h-4 w-4" /> then “Add to Home
                Screen”.
              </span>
            ) : (
              "Install the app for a faster, more native experience."
            )}
          </AlertDescription>

          <div className="mt-3 flex items-center gap-2">
            {!ios && (
              <Button onClick={install} type="button" size="sm">
                Install
              </Button>
            )}
            <Button onClick={dismiss} type="button" size="sm" variant="ghost">
              Not now
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={dismiss}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      </div>
    </div>
  );
}
