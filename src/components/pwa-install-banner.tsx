"use client";

import { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [helpOpen, setHelpOpen] = useState(false);

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

  const shouldShow = !dismissed && platform !== "unknown" && !installed;

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

  const primaryAction = async () => {
    if (ios) {
      setHelpOpen(true);
      return;
    }
    if (bipEvent) {
      await install();
      return;
    }
    setHelpOpen(true);
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
            ) : bipEvent ? (
              "Install the app for a faster, more native experience."
            ) : (
              "To install, open your browser menu and choose “Install app” / “Add to Home screen”."
            )}
          </AlertDescription>

          <div className="mt-3 flex items-center gap-2">
            <Button onClick={primaryAction} type="button" size="sm">
              Install
            </Button>
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

        <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Install Superblog</DialogTitle>
              <DialogDescription>
                Add the app to your home screen for a faster, more native experience.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              {ios ? (
                <div className="space-y-2">
                  <div className="font-medium">iPhone / iPad (Safari)</div>
                  <div className="text-muted-foreground">
                    Tap <Share2 className="inline h-4 w-4 align-text-bottom" /> then
                    choose “Add to Home Screen”.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="font-medium">Chrome / Edge</div>
                  <div className="text-muted-foreground">
                    Use the browser menu and select “Install app” / “Add to Home screen”.
                    If you see an install icon in the address bar, you can use that too.
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Got it
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
