"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) {
      // eslint-disable-next-line no-console
      console.warn('Service workers are not supported in this browser');
      return;
    }
    // Only register on secure contexts (https) or localhost
    if (!window.isSecureContext && location.hostname !== 'localhost') {
      // eslint-disable-next-line no-console
      console.warn('Secure context required for service worker (HTTPS). Skipping registration.');
      return;
    }

    const register = async () => {
      try {
        // next-pwa generates `sw.js` in production (dest: 'public')
        const reg = await navigator.serviceWorker.register('/sw.js');
        // eslint-disable-next-line no-console
        console.log('Service worker registered:', reg);
        reg.addEventListener('updatefound', () => {
          // eslint-disable-next-line no-console
          console.log('Service worker update found');
        });
        navigator.serviceWorker.ready.then(() => {
          // eslint-disable-next-line no-console
          console.log('Service worker active and ready');
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', err);
      }
    };

    register();
  }, []);

  return null;
}
