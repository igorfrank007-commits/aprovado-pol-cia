import { CalendarClock, ListChecks, Scale, TrendingUp, type LucideIcon } from 'lucide-react';
import { Checkout } from '@/components/sales-checkout';
import { signupUrl } from '@/lib/sales-content';

type Step = {
  number: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: '1',
    title: 'Resolva questões de lei seca',
    desc: 'Escolha o artigo e resolva questões de certo ou errado, com o trecho da lei que fundamenta cada gabarito. Na conta grátis, são 10 por dia.',
    icon: Scale,
  },
  {
    number: '2',
    title: 'Monte seu cronograma',
    desc: 'Informe o concurso, os dias e as horas que você vai estudar. O site gera o cronograma com revisões de 24 horas, revisão semanal e simulados.',
    icon: CalendarClock,
  },
  {
    number: '3',
    title: 'Organize o edital',
    desc: 'Cadastre as matérias e os tópicos, ou envie o edital para a leitura por IA (exclusiva para assinantes). Marque as cinco etapas de cada tópico.',
    icon: ListChecks,
  },
  {
    number: '4',
    title: 'Revise e acompanhe',
    desc: 'Mande o que você errou para os cadernos, registre o tempo de estudo com o cronômetro e veja o seu desempenho por lei e por semana.',
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  return <section id="como-funciona" aria-labelledby="how-it-works-title" className="py-10 sm:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-plan p-px shadow-gold sm:rounded-3xl"><div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-plan-soft px-4 py-9 sm:rounded-[calc(var(--radius-3xl)-1px)] sm:px-8 sm:py-14"><div aria-hidden className="grid-bg absolute inset-0 opacity-25" /><div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" /><div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block max-w-full rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase leading-tight text-gold sm:px-3 sm:text-xs">Passo a passo</span>
          <h2 id="how-it-works-title" className="mt-3 text-[1.6rem] font-bold uppercase leading-tight sm:mt-4 sm:text-4xl md:text-5xl">Como <span className="text-gradient-gold">funciona?</span></h2>
          <p className="mt-2 font-display text-base font-semibold uppercase leading-tight text-gradient-plan sm:mt-3 sm:text-xl">Simples como 1, 2, 3, 4</p>
          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-lg">Resolva a lei seca, monte o cronograma, organize o edital e acompanhe a sua evolução.</p>
        </div>

        <ol className="mx-auto mt-6 flex max-w-2xl items-center sm:mt-8">
          {steps.map(({ number, icon: Icon }, index) => <li key={number} className="flex items-center">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold sm:size-10"><Icon className="size-3.5 sm:size-4" /></span>
            {index < steps.length - 1 && <span className="mx-1 h-px w-full min-w-4 flex-1 bg-gradient-to-r from-gold/50 to-gold/10" />}
          </li>)}
        </ol>

        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
          {steps.map(({ number, title, desc, icon: Icon }) => <article key={number} className="group flex flex-col rounded-xl border border-gold/15 bg-card/70 p-4 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-gold font-display text-sm font-bold text-primary-foreground shadow-gold sm:size-10 sm:text-base" aria-hidden="true">{number}</span>
              <div className="flex items-center gap-2 text-gold"><Icon className="size-4 sm:size-5" /><span className="text-[10px] font-bold uppercase tracking-wide">Passo {number}</span></div>
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug sm:mt-4 sm:text-lg">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">{desc}</p>
          </article>)}
        </div>

        <div className="mt-7 flex justify-center sm:mt-9"><Checkout href={signupUrl} track={false} sub="Criar conta gratuita" shimmer>COMECE AGORA - CRIE SUA CONTA GRATUITA</Checkout></div>
      </div></div></div>
    </div>
  </section>;
}
