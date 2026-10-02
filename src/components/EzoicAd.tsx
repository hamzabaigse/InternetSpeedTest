'use client';

import { useEffect, useState } from 'react';
import { runEzoic } from '@/lib/ezoic';

interface EzoicAdProps {
  id: number;
  className?: string;
}

export default function EzoicAd({ id, className = '' }: EzoicAdProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    runEzoic(() => {
      if (window.ezstandalone?.showAds) {
        window.ezstandalone.showAds(id);
      }
    });

    return () => {
      runEzoic(() => {
        if (window.ezstandalone?.destroyPlaceholders) {
          window.ezstandalone.destroyPlaceholders(id);
        }
      });
    };
  }, [id]);

  return (
    <div className={`ezoic-ad-container my-4 flex justify-center min-h-[90px] ${className}`}>
      {isRendered && <div id={`ezoic-pub-ad-placeholder-${id}`} />}
    </div>
  );
}
