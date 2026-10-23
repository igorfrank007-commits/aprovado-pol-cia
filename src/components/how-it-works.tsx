import { CalendarClock, GraduationCap, Timer, TrendingUp, type LucideIcon } from 'lucide-react';
import { Checkout } from '@/components/sales-checkout';
import { ctaSub } from '@/lib/sales-content';
import editalAsset from '@/assets/edital-verticalizado.png.asset.json';
import planejamentoAsset from '@/assets/planejamento-cronograma.png.asset.json';
import registroAsset from '@/assets/diario-estudos.png.asset.json';
import evolucaoAsset from '@/assets/estatisticas-progresso.png.asset.json';

type Step = {
  number: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  image: { url: string };
  alt: string;
};

const steps: Step[] = [
  {
    number: '1',
    title: 'Escolha seu edital ou plano',
    desc: 'Selecione o concurso, vestibular ou exame, ou monte seu plano personalizado. Todas as matérias são carregadas de forma verticalizada.',
    icon: GraduationCap,
    image: editalAsset,
    alt: 'Tela de escolha do edital com as matérias verticalizadas',
  },
  {
    number: '2',
    title: 'Planejamento inteligente',
    desc: 'Informe sua rotina e preferências. A plataforma distribui as disciplinas de forma equilibrada, considerando suas facilidades e dificuldades.',
    icon: CalendarClock,
    image: planejamentoAsset,
    alt: 'Cronograma de estudos gerado automaticamente pelo app',
  },
  {
    number: '3',
    title: 'Registre seus estudos',
    desc: 'Use o cronômetro no app ou no navegador para registrar horas líquidas e categorizar cada sessão (teoria, questões, revisão).',
    icon: Timer,
    image: registroAsset,
    alt: 'Diário de estudos com registro de horas líquidas por sessão',
  },
  {
    number: '4',
    title: 'Acompanhe, ajuste e celebre suas conquistas',
    desc: 'Gráficos de evolução, metas semanais, recordes de constância, quanto do edital você já cobriu, medalhas de conquistas e desafios para te manter motivado.',
    icon: TrendingUp,
    image: evolucaoAsset,
    alt: 'Painel de estatísticas com gráficos de evolução e medalhas',
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
          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-lg">Escolha o edital, planeje seu ciclo, registre seus estudos e acompanhe sua evolução.</p>
        </div>

        <ol className="mx-auto mt-6 flex max-w-2xl items-center sm:mt-8">
          {steps.map(({ number, title, icon: Icon }, index) => <li key={number} className="flex items-center">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold sm:size-10"><Icon className="size-3.5 sm:size-4" /></span>
            {index < steps.length - 1 && <span className="mx-1 h-px w-full min-w-4 flex-1 bg-gradient-to-r from-gold/50 to-gold/10" />}
          </li>)}
        </ol>

        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5">
          {steps.map(({ number, title, desc, icon: Icon, image, alt }) => <article key={number} className="group flex flex-col overflow-hidden rounded-xl border border-gold/15 bg-card/70 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-gold/15 bg-gradient-dark">
              <img src={image.url} alt={alt} loading="lazy" className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
              <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-gradient-gold font-display text-sm font-bold text-primary-foreground shadow-gold sm:left-4 sm:top-4 sm:size-10 sm:text-base" aria-hidden="true">{number}</span>
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <div className="flex items-center gap-2 text-gold"><Icon className="size-4 sm:size-5" /><span className="text-[10px] font-bold uppercase tracking-wide">Passo {number}</span></div>
              <h3 className="mt-2 text-base font-bold leading-snug sm:mt-3 sm:text-lg">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">{desc}</p>
            </div>
          </article>)}
        </div>

        <div className="mt-7 flex justify-center sm:mt-9"><Checkout sub={ctaSub} shimmer>COMECE AGORA - CRIE SUA CONTA GRATUITA</Checkout></div>
      </div></div></div>
    </div>
  </section>;
}
