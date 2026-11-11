import { useState, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutUrl, ctaSub } from '@/lib/sales-content';
import { trackSignupClick, buildKiwifyUrl } from '@/lib/meta-pixel';

export function Checkout({ children, sub, pulse = true, shimmer = false, href = checkoutUrl, track = true, variant = 'gold' }: { children: ReactNode; sub?: ReactNode; pulse?: boolean; shimmer?: boolean; href?: string; track?: boolean; variant?: 'gold' | 'outline' }) {
  const look = variant === 'outline' ? 'border-2 border-gold bg-transparent text-gold shadow-none hover:bg-gold/10' : 'bg-gradient-gold text-primary-foreground shadow-gold';
  const classes = [pulse ? 'animate-pulse-gold' : '', shimmer ? 'cta-shimmer' : '', look, 'h-auto min-h-14 w-full max-w-md whitespace-normal rounded-md px-4 py-4 text-center font-display text-sm font-bold uppercase leading-snug transition-transform hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-5 sm:text-lg'].filter(Boolean).join(' ');
  const handleCheckoutClick = () => {
    if (track) trackSignupClick();
  };
  return <Button asChild className={classes}><a href={buildKiwifyUrl(href)} target="_blank" rel="noopener noreferrer" onClick={handleCheckoutClick}><span className="flex flex-col items-center gap-1 leading-tight"><span className="flex items-center gap-2">{children}<ArrowRight className="size-5 shrink-0" /></span>{sub && <span className="font-sans text-xs font-semibold normal-case tracking-wide opacity-90">{sub}</span>}</span></a></Button>;
}

export function SectionCheckout() {
  return <div className="relative mt-6 flex justify-center px-4"><Checkout sub={ctaSub}>Criar conta gratuita</Checkout></div>;
}
