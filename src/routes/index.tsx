import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Shield, CircleCheck, MessageCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkout, SectionCheckout } from '@/components/sales-checkout';
import { HowItWorks } from '@/components/how-it-works';
import { PlatformShowcase } from '@/components/platform-showcase';
import { PricingPlans } from '@/components/pricing-plans';
import { VslPlayer } from '@/components/vsl-player';
import { MobileCtaBar } from '@/components/mobile-cta-bar';
import { CookieBanner } from '@/components/cookie-banner';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useMetaPixelTracking } from '@/hooks/use-meta-pixel';
import { benefits, whatsappUrl, mentorship, offer, faqs } from '@/lib/sales-content';
// ---------------------------------------------------------------------------
// VÍDEO DE VENDAS
// O vídeo (VSL) ainda é o da aula do Operação Estudei, até gravar um vídeo do Lei Seca.
// O botão e o restante da página só aparecem depois de VSL_REVEAL_SECONDS de vídeo tocado.
// ---------------------------------------------------------------------------
const MOSTRAR_VSL = true;
const VSL_REVEAL_SECONDS = 90;
const VIMEO_ORIGIN = 'https://player.vimeo.com';

export const Route = createFileRoute('/')({
 head: () => ({meta:[
  {title:'Lei Seca em Questões | Questões de concursos, cronograma e edital verticalizado'},
  {name:'description',content:'Treine a lei seca artigo por artigo e resolva 2,7 milhões de questões de concursos, com gabarito oficial, cronograma individual e edital verticalizado.'},
  {property:'og:title',content:'Lei Seca em Questões | Questões de concursos, cronograma e edital verticalizado'},
  {property:'og:description',content:'Treine a lei seca artigo por artigo e resolva 2,7 milhões de questões de concursos, com gabarito oficial, cronograma individual e edital verticalizado.'},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
 ]}),component:Index,
});
function Kicker({children}:{children:ReactNode}) { return <span className="inline-block max-w-full rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-center text-[10px] font-semibold uppercase leading-tight text-gold sm:px-3 sm:text-xs">{children}</span>; }
function Gold({children}:{children:ReactNode}) { return <span className="text-gradient-gold">{children}</span>; }
function Index() {
 const [sectionsVisible, setSectionsVisible] = useState(!MOSTRAR_VSL);
 useMetaPixelTracking();
 // Animações de entrada (fade-in + slide) via IntersectionObserver, após a liberação das seções.
 useScrollReveal(sectionsVisible);
 // Com o vídeo ligado, libera o botão e o restante da página quando o vídeo chega a 90 segundos de reprodução.
 useEffect(() => {
  if (!MOSTRAR_VSL) return;
  const onMessage = (event: MessageEvent) => {
   if (event.origin !== VIMEO_ORIGIN) return;
   let payload: { event?: string; data?: { seconds?: number } } | null = null;
   try { payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
   if (payload?.event === 'timeupdate' && (payload.data?.seconds ?? 0) >= VSL_REVEAL_SECONDS) setSectionsVisible(true);
  };
  window.addEventListener('message', onMessage);
  // Pede ao player do Vimeo os eventos de tempo. O iframe pode responder antes do componente
  // estar escutando, então o pedido é repetido até o vídeo começar a mandar o tempo.
  let tentativas = 0;
  const pedir = () => {
   tentativas += 1;
   document.querySelectorAll<HTMLIFrameElement>('iframe[src*="player.vimeo.com"]').forEach((frame) => {
    frame.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: 'timeupdate' }), VIMEO_ORIGIN);
   });
   if (tentativas > 600) window.clearInterval(timer);
  };
  const timer = window.setInterval(pedir, 500);
  pedir();
  return () => {
   window.clearInterval(timer);
   window.removeEventListener('message', onMessage);
  };
 }, []);

 return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
 <MobileCtaBar />
 <CookieBanner />
 <section className="relative overflow-hidden bg-gradient-hero"><div aria-hidden className="grid-bg absolute inset-0 opacity-40" /><div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-10 pt-8 text-center sm:px-6 sm:py-14">
  <div className="w-full animate-fade-up"><div className="flex flex-wrap items-center justify-center gap-2"><Kicker><Shield className="mr-1.5 inline size-3.5" />Lei seca artigo por artigo</Kicker><Kicker><MessageCircle className="mr-1.5 inline size-3.5" />NÃO É MENTORIA DE MILHARES DE REAIS</Kicker></div><h1 className="mt-4 font-display text-[1.45rem] font-bold uppercase leading-[1.14] sm:mt-5 sm:text-4xl sm:leading-[1.08] md:text-5xl">Conheça a plataforma mais completa para alcançar sua aprovação em concursos!</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">Com ela, fui aprovado <Gold>3x na Polícia Federal</Gold>, <Gold>1x na ABIN</Gold>, <Gold>1x na Polícia Penal</Gold> e <Gold>4x para Delegado de Polícia</Gold>.</p></div>
  {MOSTRAR_VSL ? <div className="mt-6 w-full max-w-3xl sm:mt-8"><VslPlayer /></div> : <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">Questões com gabarito oficial das bancas, cronograma individual e edital verticalizado. Você entra com uma conta grátis e assina quando quiser liberar tudo.</p>}
  <div className={sectionsVisible ? 'animate-fade-up' : 'hidden'}><div id="cta-oferta-principal" className="mt-6 flex w-full max-w-3xl flex-col items-center gap-2.5 sm:gap-3"><Checkout pulse shimmer>Criar conta gratuita</Checkout><span className="text-center text-[10px] uppercase leading-relaxed text-muted-foreground sm:text-xs">Acesso imediato · Garantia de {offer.guaranteeDays} dias com devolução integral</span></div>
  <ul className="mt-7 grid w-full max-w-md gap-2 text-sm sm:mt-8 sm:max-w-none sm:text-base">{['10 questões de lei seca grátis por dia','Gabarito oficial das bancas, com filtros por cargo, órgão e ano','Cronograma e edital verticalizado na mesma conta'].map(t=><li key={t} className="flex items-center justify-center gap-2 text-balance"><CircleCheck className="size-5 shrink-0 text-gold" />{t}</li>)}</ul></div>
 </div></section>
 <div id="conteudo-liberado" className={sectionsVisible ? 'animate-fade-up' : 'hidden'}>
  <section className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6">
   <div className="relative overflow-hidden rounded-2xl bg-gradient-plan p-px shadow-gold sm:rounded-3xl"><div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-plan-soft px-4 py-9 text-center sm:rounded-[calc(var(--radius-3xl)-1px)] sm:px-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-25" /><div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" /><div className="relative">
    <Kicker><Layers className="mr-1.5 inline size-3.5" />TUDO EM UM SÓ SITE</Kicker>
    <h2 className="mx-auto mt-4 max-w-4xl py-1 font-display text-[1.6rem] font-bold uppercase leading-[1.2] text-gradient-plan sm:mt-5 sm:text-4xl md:text-5xl">Tudo o que você precisa para passar</h2>
    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">Questões, planejamento e revisão num só lugar. Você só precisa estudar.</p>
    <div className="mt-6 grid gap-4 text-left sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">{benefits.map(({icon:Icon,title,desc})=><article key={title} className="rounded-xl border border-gold/15 bg-card/70 p-4 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold sm:p-6"><div className="grid size-10 place-items-center rounded-lg border border-gold/20 bg-gold/10 text-gold sm:size-12"><Icon className="size-5 sm:size-6" /></div><h3 className="mt-3 text-base font-bold leading-snug sm:mt-4 sm:text-lg">{title}</h3><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">{desc}</p></article>)}</div>
   </div></div></div>
  </div><SectionCheckout /></section>
  <PlatformShowcase />
  {/* Como funciona? */}
  <HowItWorks />
  {/* Investimento */}
  <PricingPlans />
  <section className="py-10 sm:py-14"><div className="mx-auto max-w-3xl px-4 sm:px-6">
   <h2 className="text-center text-[1.6rem] font-bold uppercase leading-tight sm:text-4xl md:text-5xl">Isso é um <Gold>curso em vídeo?</Gold></h2>
   <div className="mt-6 rounded-2xl rounded-tr-sm bg-chat-bubble px-3.5 py-3 ring-1 ring-chat/20 sm:px-4">
    <p className="text-[15px] leading-relaxed sm:text-base">{mentorship.answerLead}</p>
    <ul className="mt-3 grid gap-2.5">{mentorship.features.map(({icon:Icon,title,desc})=><li key={title} className="flex items-start gap-2 text-sm leading-relaxed"><Icon className="mt-0.5 size-4 shrink-0 text-gold" /><span className="min-w-0 break-words"><span className="font-semibold">{title}</span>{desc && <span className="text-muted-foreground"> — {desc}</span>}</span></li>)}</ul>
   </div>
  </div><SectionCheckout /></section>
  <section aria-labelledby="faq-title" className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-4xl px-4 sm:px-6"><h2 id="faq-title" className="mb-5 text-center text-[1.6rem] font-bold uppercase leading-tight sm:mb-6 sm:text-4xl md:text-5xl">Perguntas <Gold>frequentes</Gold></h2><Accordion type="single" collapsible className="w-full">{faqs.map(({question,answer},index)=><AccordionItem key={question} value={`faq-${index}`} className="border-border"><AccordionTrigger className="gap-3 py-4 text-left text-[15px] font-semibold leading-snug text-foreground hover:text-gold sm:gap-4 sm:py-5 sm:text-lg">{question}</AccordionTrigger><AccordionContent className="pr-4 text-sm leading-relaxed text-muted-foreground sm:pr-8 sm:text-base">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  <section className="relative overflow-hidden bg-gradient-hero py-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-30" /><div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center"><h2 className="text-[1.75rem] font-bold uppercase leading-tight sm:text-5xl md:text-6xl">Ainda está <Gold>em dúvida?</Gold></h2><p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-5 sm:text-lg">Entre em contato pelo WhatsApp e tire suas dúvidas sobre o site antes de começar.</p><div className="mt-6 flex justify-center"><Button asChild variant="outline" className="h-auto min-h-14 w-full max-w-md whitespace-normal rounded-md border-chat/50 bg-card px-4 py-4 font-display text-sm font-bold uppercase text-foreground hover:border-chat hover:bg-chat/10 sm:w-auto sm:px-6 sm:py-5 sm:text-lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-center"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current text-chat sm:size-6"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.45-8.42ZM12.04 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.45 9.85-9.98 9.85Zm5.44-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" /></svg> Tirar dúvidas pelo WhatsApp</a></Button></div></div></section>
 </div>
 <footer className="border-t border-border pb-24 pt-6 text-center text-xs text-muted-foreground lg:pb-6"><p className="px-4">© {new Date().getFullYear()} Lei Seca em Questões. Todos os direitos reservados.</p></footer>
 </main>; }
