export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold">You’re offline</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This page is available without a network connection. Please reconnect
        and try again.
      </p>
    </div>
  );
}

