import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getMetaConsent, setMetaConsent, setupMetaPixel, trackMetaEvent, trackViewContent } from '@/lib/meta-pixel';

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(getMetaConsent() === null); }, []);
  if (!open) return null;

  const accept = () => {
    setMetaConsent('opt-in');
    setupMetaPixel();
    trackMetaEvent('PageView');
    if (window.location.pathname === '/') trackViewContent();
    setOpen(false);
  };
  const reject = () => { setMetaConsent('opt-out'); setOpen(false); };

  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed inset-x-2 bottom-2 z-50 sm:inset-x-auto sm:left-1/2 sm:w-[min(44rem,calc(100%-2rem))] sm:-translate-x-1/2" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex flex-col gap-2 rounded-lg border border-gold/30 bg-card/95 p-3 shadow-gold backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:px-4">
        <p className="text-xs leading-snug text-muted-foreground sm:text-sm">Usamos cookies para medir o desempenho dos nossos anúncios e melhorar sua experiência.</p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={reject} className="h-8 flex-1 border-border text-xs sm:flex-none">Recusar</Button>
          <Button size="sm" onClick={accept} className="h-8 flex-1 bg-gradient-gold text-xs font-bold text-primary-foreground sm:flex-none">Aceitar</Button>
        </div>
      </div>
    </div>
  );
}
