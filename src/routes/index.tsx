import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Shield, CircleCheck, TriangleAlert, Flame, MessageCircle, CheckCheck, Clock, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkout, SectionCheckout } from '@/components/sales-checkout';
import { PlatformShowcase } from '@/components/platform-showcase';
import { PricingPlans } from '@/components/pricing-plans';
import { PlanCompare } from '@/components/plan-compare';
import { VslPlayer } from '@/components/vsl-player';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { benefits, problems, testimonials, offer, whatsappUrl, mentorship, ctaSub, faqs } from '@/lib/sales-content';
export const Route = createFileRoute('/')({
 head: () => ({meta:[
  {title:'Como Passar em Concursos Policiais e Delegado | Método Aprovado'},
  {name:'description',content:'Método validado para aprovação em concursos policiais e delegado. Planejamento, revisões e estratégia para você ser o próximo aprovado.'},
  {property:'og:title',content:'Como Passar em Concursos Policiais e Delegado | Método Aprovado'},
  {property:'og:description',content:'Método validado para aprovação em concursos policiais e delegado. Planejamento, revisões e estratégia para você ser o próximo aprovado.'},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
 ]}),component:Index,
});
function Kicker({children}:{children:ReactNode}) { return <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase text-gold">{children}</span>; }
function Heading({kicker,children,subtitle,center=true}:{kicker?:string;children:ReactNode;subtitle?:string;center?:boolean}) { return <div className={`mb-6 ${center?'mx-auto max-w-3xl text-center':''}`}>{kicker && <Kicker>{kicker}</Kicker>}<h2 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">{children}</h2>{subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}</div>; }
function Gold({children}:{children:ReactNode}) { return <span className="text-gradient-gold">{children}</span>; }
// Tempo (em segundos) que as seções abaixo do vídeo ficam ocultas.
// Altere apenas este valor para mudar o delay inteligente.
const delaySeconds = 90;

function Index() {
 const [sectionsVisible, setSectionsVisible] = useState(false);
 useEffect(() => { const timer = window.setTimeout(() => setSectionsVisible(true), delaySeconds * 1000); return () => window.clearTimeout(timer); }, []);
 // Animações de entrada (fade-in + slide) via IntersectionObserver, após a liberação das seções.
 useScrollReveal(sectionsVisible);
 // Ao chegar em 37:35 do vídeo, rola suavemente até o botão de compra abaixo do player.
 function scrollToOffer() { document.getElementById('cta-oferta-principal')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
 return <main className="min-h-screen bg-background text-foreground">
 <section className="relative overflow-hidden bg-gradient-hero"><div aria-hidden className="grid-bg absolute inset-0 opacity-40" /><div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-10 text-center sm:py-14">
  <div className="w-full animate-fade-up"><div className="flex flex-wrap items-center justify-center gap-2"><Kicker><Shield className="mr-2 inline size-3.5" />Método Validado</Kicker><Kicker><MessageCircle className="mr-2 inline size-3.5" />Não é mentoria</Kicker></div><h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl md:text-6xl">DESCUBRA O MÉTODO QUE ME AJUDOU A <Gold>PASSAR 3X NA POLÍCIA FEDERAL, 4X PARA DELEGADO DE POLÍCIA E 1X NA ABIN.</Gold> <Gold>AULA 100% GRATUITA</Gold></h1></div>
  <div className="mt-8 w-full max-w-3xl"><VslPlayer onOfferReached={scrollToOffer} /></div>
  <div id="cta-oferta-principal" className="mt-6 flex w-full max-w-3xl flex-col items-center gap-3"><Checkout sub={ctaSub} shimmer>Quero ser aprovado</Checkout><span className="text-xs uppercase text-muted-foreground">Acesso imediato · Garantia {offer.guaranteeDays} dias</span></div>
  <ul className="mt-8 grid gap-2 text-sm sm:text-base">{['Método validado por aprovados','Organização completa pronta para usar','Estudo inteligente e mais rápido'].map(t=><li key={t} className="flex items-center justify-center gap-2"><CircleCheck className="size-5 shrink-0 text-gold" />{t}</li>)}</ul>
 </div></section>
 <div id="conteudo-liberado" className={sectionsVisible ? 'animate-fade-up' : 'hidden'}>
  <section className="pb-10 pt-8 sm:pb-14 sm:pt-10"><div className="mx-auto max-w-6xl px-4"><Heading kicker="Diagnóstico">Você sonha em passar em concurso publico mas <Gold>enfrenta os seguintes problemas?</Gold></Heading><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{problems.map(p=><div key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"><TriangleAlert className="size-5 shrink-0 text-destructive" /><p className="text-base">{p}</p></div>)}</div><div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-gold/30 bg-card p-8 text-center"><Flame className="mx-auto mb-4 size-7 text-gold" /><p className="text-xl font-semibold">Precisa de um <Gold>método certeiro para alcançar a aprovação</Gold></p></div></div></section>
  <section className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-7xl px-4">
   <div className="relative overflow-hidden rounded-3xl bg-gradient-plan p-px shadow-gold"><div className="relative overflow-hidden rounded-[calc(var(--radius-3xl)-1px)] bg-gradient-plan-soft px-6 py-12 text-center sm:px-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-25" /><div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" /><div className="relative">
    <Kicker><Layers className="mr-2 inline size-3.5" />O que você recebe</Kicker>
    <h2 className="mx-auto mt-5 max-w-4xl py-1 font-display text-3xl font-bold uppercase leading-[1.2] text-gradient-plan sm:text-4xl md:text-5xl">Tudo o que você precisa para passar</h2>
    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Um sistema completo, do planejamento à aprovação. Você só precisa sentar e estudar.</p>
    <div className="mt-8 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">{benefits.map(({icon:Icon,title,desc})=><article key={title} className="rounded-xl border border-gold/15 bg-card/70 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold"><div className="grid size-12 place-items-center rounded-lg border border-gold/20 bg-gold/10 text-gold"><Icon className="size-6" /></div><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p></article>)}</div>
   </div></div></div>
  </div><SectionCheckout /></section>
  <PlatformShowcase />
  <PlanCompare />
  <section className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-7xl px-4"><Heading kicker="Depoimentos">Comentários <Gold>dos alunos</Gold></Heading><div className="grid gap-6 md:grid-cols-3">{testimonials.map(t=><article key={t.name} className="rounded-2xl border border-border bg-card p-5 shadow-elegant"><div className="flex items-center gap-3 border-b border-border pb-3"><div className="grid size-11 place-items-center rounded-full bg-gradient-gold font-display text-lg font-bold text-primary-foreground">{t.initial}</div><div className="flex-1"><p className="font-semibold">{t.name}</p></div><MessageCircle className="size-5 text-chat" /></div><div className="mt-4 flex flex-col gap-2">{t.messages.map(message=><div key={message} className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-chat-bubble px-3 py-2 text-sm leading-relaxed ring-1 ring-chat/20">{message}<div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">{t.time}<CheckCheck className="size-3 text-chat" /></div></div>)}</div></article>)}</div></div><SectionCheckout /></section>
<section className="py-10 sm:py-14"><div className="mx-auto max-w-3xl px-4">
 <h2 className="text-center text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">Prof. é uma <Gold>mentoria?</Gold></h2>
 <div className="mt-6 rounded-2xl rounded-tr-sm bg-chat-bubble px-4 py-3 ring-1 ring-chat/20">
  <p className="text-base leading-relaxed">{mentorship.answerLead}</p>
  <ul className="mt-3 grid gap-2.5">{mentorship.features.map(({icon:Icon,title,desc})=><li key={title} className="flex items-start gap-2 text-sm leading-relaxed"><Icon className="mt-0.5 size-4 shrink-0 text-gold" /><span><span className="font-semibold">{title}</span>{desc && <span className="text-muted-foreground">{title === 'Como gerar o Edital Verticalizado' ? ' ' : ' — '}{desc}</span>}</span></li>)}</ul>
 </div>
</div><SectionCheckout /></section>
 <PricingPlans />
  <section aria-labelledby="faq-title" className="bg-secondary/30 py-10 sm:py-14"><div className="mx-auto max-w-4xl px-4"><h2 id="faq-title" className="mb-6 text-center text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">Perguntas <Gold>frequentes</Gold></h2><Accordion type="single" collapsible className="w-full">{faqs.map(({question,answer},index)=><AccordionItem key={question} value={`faq-${index}`} className="border-border"><AccordionTrigger className="gap-4 py-5 text-base font-semibold text-foreground hover:text-gold sm:text-lg">{question}</AccordionTrigger><AccordionContent className="pr-8 text-base leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  <section className="relative overflow-hidden bg-gradient-hero py-10 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-30" /><div className="relative mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-bold uppercase leading-tight sm:text-5xl md:text-6xl">Ainda está <Gold>em dúvida?</Gold></h2><p className="mx-auto mt-5 max-w-2xl text-muted-foreground sm:text-lg">Entre em contato pelo WhatsApp e tire suas dúvidas sobre o curso antes de começar.</p><div className="mt-6"><Button asChild variant="outline" className="h-auto min-h-14 max-w-full whitespace-normal rounded-md border-chat/50 bg-card px-6 py-5 font-display text-base font-bold uppercase text-foreground hover:border-chat hover:bg-chat/10 sm:text-lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 fill-current text-chat"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.45-8.42ZM12.04 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.45 9.85-9.98 9.85Zm5.44-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" /></svg> Tirar dúvidas pelo WhatsApp</a></Button></div></div></section>
 </div>
 <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Método Aprovação Policial. Todos os direitos reservados.</footer>
 </main>; }
