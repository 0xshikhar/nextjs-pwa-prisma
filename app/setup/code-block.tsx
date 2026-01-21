"use client";

import { useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      return;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/50 py-2">
        <span className="text-xs text-muted-foreground">Terminal</span>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          type="button"
          aria-label="Copy to clipboard"
          className="h-8 px-2"
        >
          {copied ? (
            <span className="text-xs">Copied</span>
          ) : (
            <ClipboardCopy className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="bg-zinc-950 p-4">
        <pre className="overflow-x-auto text-sm text-zinc-200">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
