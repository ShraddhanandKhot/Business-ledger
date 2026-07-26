"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallApp() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler as EventListener
    );

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const install = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();

    await installPrompt.userChoice;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">

      <h1 className="text-4xl font-bold">
        Business Ledger
      </h1>

      <p className="text-gray-500">
        Install the app to continue.
      </p>

      <button
        onClick={install}
        className="bg-blue-600 text-white rounded-xl px-6 py-3"
      >
        Install App
      </button>

    </div>
  );
}