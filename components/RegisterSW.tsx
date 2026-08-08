"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    // Only register on secure contexts (https) or localhost
    if (!window.isSecureContext && location.hostname !== 'localhost') return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        // eslint-disable-next-line no-console
        console.log('Service worker registered:', reg);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', err);
      }
    };

    register();
  }, []);

  return null;
}
