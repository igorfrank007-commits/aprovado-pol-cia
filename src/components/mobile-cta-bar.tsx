import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { checkoutUrl, ctaSub } from '@/lib/sales-content';

/**
 * Barra fixa de CTA para celular e tablet.
 * Aparece depois que o usuário rola um pouco a página, garantindo que a ação
 * principal esteja sempre a um toque de distância.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-background/95 px-3 pt-2 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-md bg-gradient-gold px-4 py-3 text-center font-display text-sm font-bold uppercase leading-tight text-primary-foreground shadow-gold"
      >
        <span className="flex flex-col items-center gap-0.5">
          <span className="flex items-center gap-2">
            Quero ser aprovado
            <ArrowRight className="size-4 shrink-0" />
          </span>
          <span className="font-sans text-[10px] font-semibold normal-case tracking-wide opacity-90">{ctaSub}</span>
        </span>
      </a>
    </div>
  );
}
