'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { runEzoic } from '@/lib/ezoic';

export default function EzoicRouteHandler() {
  const pathname = usePathname();

  useEffect(() => {
    runEzoic(() => {
      if (window.ezstandalone?.destroyPlaceholders) {
        window.ezstandalone.destroyPlaceholders();
      }
      requestAnimationFrame(() => {
        if (window.ezstandalone?.showAds) {
          window.ezstandalone.showAds();
        }
      });
    });
  }, [pathname]);

  return null;
}
