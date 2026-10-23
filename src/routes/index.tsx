import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Shield, CircleCheck, MessageCircle, CheckCheck, Clock, Layers, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkout, SectionCheckout } from '@/components/sales-checkout';
import { PlatformShowcase } from '@/components/platform-showcase';
import { HowItWorks } from '@/components/how-it-works';
import { PricingPlans } from '@/components/pricing-plans';
import { VslPlayer } from '@/components/vsl-player';
import { MobileCtaBar } from '@/components/mobile-cta-bar';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { benefits, testimonials, offer, whatsappUrl, mentorship, ctaSub, faqs } from '@/lib/sales-content';
// ---------------------------------------------------------------------------
// DELAY INTELIGENTE
// As seções abaixo do vídeo ficam ocultas e são liberadas automaticamente
// depois deste tempo (em segundos). Basta alterar o valor para mudar o delay.
// ---------------------------------------------------------------------------
const delaySeconds = 90;

// Ajuste o valor acima para mudar o tempo de liberação das seções.


export const Route = createFileRoute('/')({
 head: () => ({meta:[
  {title:'Como Passar em Concursos Policiais e Delegado | Método Aprovado'},
  {name:'description',content:'Método validado para aprovação em concursos policiais e delegado. Planejamento, revisões e estratégia para você ser o próximo aprovado.'},
  {property:'og:title',content:'Como Passar em Concursos Policiais e Delegado | Método Aprovado'},
  {property:'og:description',content:'Método validado para aprovação em concursos policiais e delegado. Planejamento, revisões e estratégia para você ser o próximo aprovado.'},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
 ]}),component:Index,
});
function Kicker({children}:{children:ReactNode}) { return <span className="inline-block max-w-full rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-center text-[10px] font-semibold uppercase leading-tight text-gold sm:px-3 sm:text-xs">{children}</span>; }
function Heading({kicker,children,subtitle,center=true}:{kicker?:string;children:ReactNode;subtitle?:string;center?:boolean}) { return <div className={`mb-6 ${center?'mx-auto max-w-3xl text-center':''}`}>{kicker && <Kicker>{kicker}</Kicker>}<h2 className="mt-3 text-[1.6rem] font-bold uppercase leading-tight sm:mt-4 sm:text-4xl md:text-5xl">{children}</h2>{subtitle && <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-lg">{subtitle}</p>}</div>; }
function Gold({children}:{children:ReactNode}) { return <span className="text-gradient-gold">{children}</span>; }
function Index() {
 const [sectionsVisible, setSectionsVisible] = useState(false);
 // Animações de entrada (fade-in + slide) via IntersectionObserver, após a liberação das seções.
 useScrollReveal(sectionsVisible);
 // Delay inteligente: libera as seções abaixo do vídeo após `delaySeconds`.
 useEffect(() => {
  const timer = window.setTimeout(() => setSectionsVisible(true), delaySeconds * 1000);
  return () => window.clearTimeout(timer);
 }, []);
 // Gatilho do player: aos 26:53 do vídeo libera o restante da página e rola até o botão de compra.
 function scrollToOffer() { setSectionsVisible(true); document.getElementById('cta-oferta-principal')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
 return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
 <MobileCtaBar />
 <section className="relative overflow-hidden bg-gradient-hero"><div aria-hidden className="grid-bg absolute inset-0 opacity-40" /><div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-10 pt-8 text-center sm:px-6 sm:py-14">
  <div className="w-full animate-fade-up"><div className="flex flex-wrap items-center justify-center gap-2"><Kicker><Shield className="mr-1.5 inline size-3.5" />Método Validado</Kicker><Kicker><MessageCircle className="mr-1.5 inline size-3.5" />NÃO É MENTORIA DE MILHARES DE REAIS</Kicker></div><h1 className="mt-4 font-display text-[1.45rem] font-bold uppercase leading-[1.14] sm:mt-5 sm:text-4xl sm:leading-[1.08] md:text-5xl">DESCUBRA O MÉTODO QUE USEI PARA SER APROVADO <Gold>3X NA POLÍCIA FEDERAL, 4X PARA DELEGADO DE POLÍCIA E 1X NA ABIN.</Gold> <Gold>AULA 100% GRATUITA</Gold></h1></div>
  <div className="mt-6 w-full max-w-3xl sm:mt-8"><VslPlayer onOfferReached={scrollToOffer} /></div>
  <div id="cta-oferta-principal" className="mt-6 flex w-full max-w-3xl flex-col items-center gap-2.5 sm:gap-3"><Checkout sub={ctaSub} pulse shimmer>Quero ser aprovado</Checkout><span className="text-center text-[10px] uppercase leading-relaxed text-muted-foreground sm:text-xs">Acesso imediato · Garantia {offer.guaranteeDays} dias</span></div>
  <ul className="mt-7 grid w-full max-w-md gap-2 text-sm sm:mt-8 sm:max-w-none sm:text-base">{['Método validado por aprovados','Organização completa pronta para usar','Estudo inteligente e mais rápido'].map(t=><li key={t} className="flex items-center justify-center gap-2 text-balance"><CircleCheck className="size-5 shrink-0 text-gold" />{t}</li>)}</ul>
 </div></section>
 <div id="conteudo-liberado" className={sectionsVisible ? 'animate-fade-up' : 'hidden'}>
  <section className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6">
   <div className="relative overflow-hidden rounded-2xl bg-gradient-plan p-px shadow-gold sm:rounded-3xl"><div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-plan-soft px-4 py-9 text-center sm:rounded-[calc(var(--radius-3xl)-1px)] sm:px-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-25" /><div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" /><div className="relative">
    <Kicker><Layers className="mr-1.5 inline size-3.5" />DE CANDIDATO REPROVADO A CONCURSADO DA FAMÍLIA</Kicker>
    <h2 className="mx-auto mt-4 max-w-4xl py-1 font-display text-[1.6rem] font-bold uppercase leading-[1.2] text-gradient-plan sm:mt-5 sm:text-4xl md:text-5xl">Tudo o que você precisa para passar</h2>
    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">Um sistema completo, do planejamento à aprovação. Você só precisa sentar e estudar.</p>
    <div className="mt-6 grid gap-4 text-left sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">{benefits.map(({icon:Icon,title,desc})=><article key={title} className="rounded-xl border border-gold/15 bg-card/70 p-4 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold sm:p-6"><div className="grid size-10 place-items-center rounded-lg border border-gold/20 bg-gold/10 text-gold sm:size-12"><Icon className="size-5 sm:size-6" /></div><h3 className="mt-3 text-base font-bold leading-snug sm:mt-4 sm:text-lg">{title}</h3><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">{desc}</p></article>)}</div>
   </div></div></div>
  </div><SectionCheckout /></section>
  <PlatformShowcase />
  {/* Como funciona? */}
  <HowItWorks />
  {/* Investimento — mantida imediatamente acima da seção de depoimentos */}
  <PricingPlans />
  {/* Depoimentos
      Comentários dos alunos */}
  <section aria-label="Depoimentos e comentários dos alunos" className="bg-secondary/30 py-10 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6">
   <Heading kicker="Depoimentos" subtitle="Mensagens reais de alunos que seguiram o método e hoje comemoram a aprovação. Cada história começou com a decisão de organizar os estudos.">Comentários <Gold>dos alunos</Gold></Heading>
   <ul className="mx-auto mb-6 flex max-w-3xl flex-col items-stretch gap-2.5 sm:mb-8 sm:flex-row sm:justify-center sm:gap-3">
    {[
     { icon: Star, label: '4,9 de 5', desc: 'média de avaliação' },
     { icon: Users, label: 'Alunos aprovados', desc: 'em todo o Brasil' },
     { icon: CircleCheck, label: 'Aprovações reais', desc: 'PF · PC · PRF · Penal' },
    ].map(({ icon: Icon, label, desc }) => (
     <li key={label} className="flex flex-1 items-center gap-3 rounded-xl border border-gold/15 bg-card/70 px-3.5 py-3 backdrop-blur-sm sm:px-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold sm:size-10"><Icon className="size-4 sm:size-5" /></span>
      <span className="min-w-0 text-left"><span className="block text-sm font-bold leading-tight text-foreground">{label}</span><span className="block text-xs leading-tight text-muted-foreground">{desc}</span></span>
     </li>
    ))}
   </ul>
   <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">{testimonials.map(t=><article key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-elegant transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold sm:p-5"><div className="flex items-center gap-3 border-b border-border pb-3"><img src={t.avatar} alt={`Foto de ${t.name}`} loading="lazy" width={48} height={48} className="size-10 shrink-0 rounded-full object-cover object-center ring-2 ring-gold/40 sm:size-12" /><div className="min-w-0 flex-1"><p className="truncate font-semibold leading-tight">{t.name}</p><p className="flex items-center gap-1 text-xs text-muted-foreground"><CircleCheck className="size-3 shrink-0 text-gold" /><span className="truncate">{t.role}</span></p></div><MessageCircle className="size-5 shrink-0 text-chat" /></div><div className="mt-4 flex flex-col gap-2">{t.messages.map(message=><div key={message} className="ml-auto max-w-[92%] break-words rounded-2xl rounded-tr-sm bg-chat-bubble px-3 py-2 text-sm leading-relaxed ring-1 ring-chat/20">{message}<div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">{t.time}<CheckCheck className="size-3 text-chat" /></div></div>)}</div></article>)}</div></div><SectionCheckout /></section>
<section className="py-10 sm:py-14"><div className="mx-auto max-w-3xl px-4 sm:px-6">
 <h2 className="text-center text-[1.6rem] font-bold uppercase leading-tight sm:text-4xl md:text-5xl">Prof. é uma <Gold>mentoria?</Gold></h2>
 <div className="mt-6 rounded-2xl rounded-tr-sm bg-chat-bubble px-3.5 py-3 ring-1 ring-chat/20 sm:px-4">
  <p className="text-[15px] leading-relaxed sm:text-base">{mentorship.answerLead}</p>
  <ul className="mt-3 grid gap-2.5">{mentorship.features.map(({icon:Icon,title,desc})=><li key={title} className="flex items-start gap-2 text-sm leading-relaxed"><Icon className="mt-0.5 size-4 shrink-0 text-gold" /><span className="min-w-0 break-words"><span className="font-semibold">{title}</span>{desc && <span className="text-muted-foreground">{title === 'Como gerar o Edital Verticalizado' ? ' ' : ' — '}{desc}</span>}</span></li>)}</ul>
 </div>
 </div><SectionCheckout /></section>
  <section aria-labelledby="faq-title" className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-4xl px-4 sm:px-6"><h2 id="faq-title" className="mb-5 text-center text-[1.6rem] font-bold uppercase leading-tight sm:mb-6 sm:text-4xl md:text-5xl">Perguntas <Gold>frequentes</Gold></h2><Accordion type="single" collapsible className="w-full">{faqs.map(({question,answer},index)=><AccordionItem key={question} value={`faq-${index}`} className="border-border"><AccordionTrigger className="gap-3 py-4 text-left text-[15px] font-semibold leading-snug text-foreground hover:text-gold sm:gap-4 sm:py-5 sm:text-lg">{question}</AccordionTrigger><AccordionContent className="pr-4 text-sm leading-relaxed text-muted-foreground sm:pr-8 sm:text-base">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  <section className="relative overflow-hidden bg-gradient-hero py-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-30" /><div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center"><h2 className="text-[1.75rem] font-bold uppercase leading-tight sm:text-5xl md:text-6xl">Ainda está <Gold>em dúvida?</Gold></h2><p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:mt-5 sm:text-lg">Entre em contato pelo WhatsApp e tire suas dúvidas sobre o curso antes de começar.</p><div className="mt-6 flex justify-center"><Button asChild variant="outline" className="h-auto min-h-14 w-full max-w-md whitespace-normal rounded-md border-chat/50 bg-card px-4 py-4 font-display text-sm font-bold uppercase text-foreground hover:border-chat hover:bg-chat/10 sm:w-auto sm:px-6 sm:py-5 sm:text-lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-center"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current text-chat sm:size-6"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.45-8.42ZM12.04 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.45 9.85-9.98 9.85Zm5.44-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" /></svg> Tirar dúvidas pelo WhatsApp</a></Button></div></div></section>
 </div>
 <footer className="border-t border-border pb-24 pt-6 text-center text-xs text-muted-foreground lg:pb-6"><p className="px-4">© {new Date().getFullYear()} Método Aprovação Policial. Todos os direitos reservados.</p></footer>
 </main>; }
