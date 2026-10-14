import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutUrl, ctaSub } from '@/lib/sales-content';

export function Checkout({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return <Button asChild className="animate-pulse-gold h-auto min-h-14 max-w-full whitespace-normal rounded-md bg-gradient-gold px-8 py-5 font-display text-base font-bold uppercase text-primary-foreground shadow-gold transition-transform hover:scale-[1.03] sm:text-lg"><a href={checkoutUrl} target="_blank" rel="noopener noreferrer"><span className="flex flex-col items-center gap-1 leading-tight"><span className="flex items-center gap-2">{children}<ArrowRight className="size-5 shrink-0" /></span>{sub && <span className="font-sans text-xs font-semibold normal-case tracking-wide opacity-90">{sub}</span>}</span></a></Button>;
}

export function SectionCheckout() {
  return <div className="relative mt-6 px-4 text-center"><Checkout sub={ctaSub}>Quero ser aprovado</Checkout></div>;
}
