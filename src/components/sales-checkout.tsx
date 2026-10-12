import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutUrl } from '@/lib/sales-content';

export function Checkout({ children }: { children: ReactNode }) {
  return <Button asChild className="animate-pulse-gold h-auto min-h-14 max-w-full whitespace-normal rounded-md bg-gradient-gold px-8 py-5 font-display text-base font-bold uppercase text-primary-foreground shadow-gold transition-transform hover:scale-[1.03] sm:text-lg"><a href={checkoutUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowRight className="size-5 shrink-0" /></a></Button>;
}

export function SectionCheckout() {
  return <div className="relative mt-6 px-4 text-center"><Checkout>Quero ser aprovado</Checkout></div>;
}