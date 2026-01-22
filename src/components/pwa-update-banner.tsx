"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function PwaUpdateBanner() {
  const [visible, setVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const onUpdateAvailable = () => setVisible(true);
    window.addEventListener("pwa:update-available", onUpdateAvailable);
    return () => {
      window.removeEventListener("pwa:update-available", onUpdateAvailable);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const onControllerChange = () => {
      if (!updating) return;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, [updating]);

  const applyUpdate = async () => {
    if (!("serviceWorker" in navigator)) return;
    setUpdating(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const waiting = registration?.waiting;
      if (waiting) {
        waiting.postMessage({ type: "SKIP_WAITING" });
        return;
      }

      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  if (!visible) return null;

  return (
    <div className="border-b bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <Alert className="relative pr-10">
          <AlertTitle className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Update available
          </AlertTitle>
          <AlertDescription className="mt-1">
            A new version of the app is ready. Refresh to update.
          </AlertDescription>

          <div className="mt-3 flex items-center gap-2">
            <Button onClick={applyUpdate} type="button" size="sm" disabled={updating}>
              Refresh
            </Button>
            <Button
              onClick={() => setVisible(false)}
              type="button"
              size="sm"
              variant="ghost"
              disabled={updating}
            >
              Later
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            disabled={updating}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      </div>
    </div>
  );
}

