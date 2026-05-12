import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-policial.jpg";
import autoridadeImg from "@/assets/autoridade.jpg";
import estudanteImg from "@/assets/estudante.jpg";
import {
  Target, Calendar, BookOpen, ListChecks, Scale, FileSpreadsheet,
  Filter, MessageCircle, Headphones, Clock, Trophy, Check,
  ShieldCheck, Brain, Flame, AlertTriangle, Star, Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Como Passar em Concursos Policiais e Delegado | Método Aprovação" },
      { name: "description", content: "O método validado que organiza seus estudos, acelera sua aprovação e coloca seu nome na lista dos aprovados em concursos policiais e delegado." },
      { property: "og:title", content: "Como Passar em Concursos Policiais e Delegado" },
      { property: "og:description", content: "Método validado para aprovação em concursos policiais. Planejamento, cronograma, revisões e suporte completo." },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const beneficios = [
  { icon: BookOpen, title: "Guia passo a passo", desc: "Caminho completo de aprovação, do zero à posse." },
  { icon: Target, title: "Planejamento individual", desc: "Estratégia personalizada para o seu concurso." },
  { icon: Calendar, title: "Cronograma diário", desc: "Estudos e revisões prontos, é só executar." },
  { icon: ListChecks, title: "Organização total", desc: "Senta, abre o material e estuda. Sem perder tempo." },
  { icon: Scale, title: "Lei seca estratégica", desc: "Cronograma de leitura por relevância nas bancas." },
  { icon: FileSpreadsheet, title: "Planilha de exercícios", desc: "Controle de desempenho e evolução real." },
  { icon: Filter, title: "Filtro QConcursos", desc: "Resolva apenas as questões que importam." },
  { icon: Headphones, title: "Suporte 30 dias", desc: "Acompanhamento na implementação do método." },
  { icon: MessageCircle, title: "Plantão no WhatsApp", desc: "Tire dúvidas direto com a equipe." },
  { icon: Clock, title: "Aplicável à rotina", desc: "Funciona mesmo com pouco tempo livre." },
  { icon: Trophy, title: "Técnicas de aprovados", desc: "Estratégias usadas por quem já passou." },
  { icon: Brain, title: "Mentalidade vencedora", desc: "Foco, disciplina e constância para chegar lá." },
];

const modulos = [
  { n: "01", t: "Mentalidade do aprovado", d: "Construa a base mental dos que conquistam a vaga." },
  { n: "02", t: "Como organizar seus estudos", d: "Estrutura completa para nunca mais se perder." },
  { n: "03", t: "Ciclo de estudos policiais", d: "O ciclo otimizado para concursos da área policial." },
  { n: "04", t: "Revisões inteligentes", d: "Memorização real com o sistema de revisões espaçadas." },
  { n: "05", t: "Lei seca estratégica", d: "Como ler a lei do jeito que cai na prova." },
  { n: "06", t: "Resolução de questões", d: "A técnica correta para acertar mais e revisar menos." },
  { n: "07", t: "Controle de desempenho", d: "Saiba exatamente onde melhorar a cada semana." },
  { n: "08", t: "Planejamento individual", d: "Monte o seu plano sob medida em poucos passos." },
  { n: "09", t: "Técnicas de memorização", d: "Mnemônicos, palácios da memória e mapas mentais." },
  { n: "10", t: "Estratégias de reta final", d: "O que fazer nos últimos 30 dias antes da prova." },
];

const erros = [
  "Estudar sem planejamento e sem direção",
  "Acumular materiais demais e nunca terminar",
  "Não fazer revisões — esquecer tudo na prova",
  "Não saber quais matérias priorizar",
  "Resolver questões do jeito errado",
  "Perder tempo com métodos ineficientes",
];

const depoimentos = [
  { nome: "Rafael Mendes", cargo: "Aprovado Polícia Civil – SP", txt: "Em 7 meses seguindo o método consegui a aprovação. A organização mudou tudo. Antes eu estudava muito e rendia pouco." },
  { nome: "Juliana Carvalho", cargo: "Aprovada Polícia Federal", txt: "O cronograma de revisões foi o divisor de águas. Eu finalmente parei de esquecer o que estudava." },
  { nome: "Lucas Andrade", cargo: "Aprovado Delegado – MG", txt: "O filtro do QConcursos sozinho já valeu o curso. Resolvi só o que cai e meu desempenho disparou." },
];

const publico = [
  "Iniciantes que estão começando do zero",
  "Quem já estuda mas não evolui",
  "Candidatos à Polícia Civil",
  "Candidatos à Polícia Federal",
  "Candidatos à Polícia Penal e Militar",
  "Futuros Delegados",
  "Concurseiros da PRF",
  "Qualquer concurso policial",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
              <ShieldCheck className="h-4 w-4" /> Método validado
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Descubra o método que já <span className="text-gradient-gold">aprovou alunos</span> em concursos policiais —
              e pode colocar seu nome na lista dos aprovados.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Mesmo que você esteja perdido nos estudos. Planejamento individual, cronograma pronto,
              revisões inteligentes e foco total em concursos policiais e delegado.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#oferta"
                className="animate-pulse-gold inline-flex items-center justify-center rounded-xl bg-gradient-gold px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-gold-foreground shadow-gold transition hover:scale-[1.02]"
              >
                Quero ser aprovado
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <span>+1.000 alunos transformados</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-20 blur-3xl" />
            <img
              src={heroImg}
              alt="Policial aprovado em concurso"
              width={1536}
              height={1024}
              className="relative rounded-3xl border border-gold/20 shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* POR QUE NÃO ESTÁ PASSANDO */}
      <section className="border-y border-border/50 bg-card/40 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-destructive">
            <AlertTriangle className="h-4 w-4" /> A verdade que ninguém te conta
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">
            Por que você <span className="text-destructive">ainda não passou?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            O problema não é falta de inteligência. É falta de método. Veja se você se identifica:
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {erros.map((e) => (
              <div key={e} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-5 text-left">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">✕</span>
                <p className="text-sm sm:text-base">{e}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl font-display text-xl text-foreground sm:text-2xl">
            Aprovados não são mais inteligentes. Eles apenas estudam <span className="text-gradient-gold">do jeito certo</span>.
          </p>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">O que você recebe</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Tudo o que você precisa para ser aprovado</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Um sistema completo que tira você do caos e te coloca no caminho mais curto até a vaga.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULOS */}
      <section className="border-y border-border/50 bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Conteúdo do curso</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">O que você vai aprender</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              10 módulos diretos ao ponto. Sem enrolação, sem teoria inútil.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {modulos.map((m) => (
              <div key={m.n} className="flex gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-gold/40">
                <span className="font-display text-4xl font-bold text-gradient-gold">{m.n}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{m.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Resultados reais</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Quem aplicou, foi aprovado</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d) => (
              <div key={d.nome} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
                <Quote className="h-8 w-8 text-gold/60" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{d.txt}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold font-display text-lg font-bold text-gold-foreground">
                    {d.nome[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{d.nome}</p>
                    <p className="text-xs text-gold">{d.cargo}</p>
                  </div>
                </div>
                <div className="mt-3 flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="border-y border-border/50 bg-card/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Indicado para você</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Para quem é esse curso?</h2>
            <p className="mt-4 text-muted-foreground">
              Se a sua meta é vestir a farda e conquistar a estabilidade do serviço público policial — esse método é para você.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {publico.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-15 blur-3xl" />
            <img src={estudanteImg} alt="Aluno estudando para concurso policial" loading="lazy" width={1024} height={1024} className="relative rounded-3xl border border-gold/20 shadow-elegant" />
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-gold opacity-15 blur-3xl" />
            <img src={autoridadeImg} alt="Autoridade do método" loading="lazy" width={1024} height={1024} className="relative rounded-3xl border border-gold/20 shadow-elegant" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Quem está por trás</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Um método forjado dentro do mundo real dos concursos policiais</h2>
            <p className="mt-4 text-muted-foreground">
              Anos de imersão no padrão das principais bancas, dezenas de aprovações e um sistema testado em quem realmente
              precisava: o concurseiro que não tinha tempo a perder.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "+1.510", l: "Aprovados" },
                { n: "10+", l: "Anos de método" },
                { n: "98%", l: "Satisfação" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-5 text-center">
                  <p className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">{s.n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="overflow-hidden rounded-3xl border border-gold/40 bg-card shadow-gold">
            <div className="bg-gradient-gold px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-widest text-gold-foreground">
              <Flame className="mr-2 inline h-4 w-4" /> Oferta por tempo limitado
            </div>
            <div className="p-8 sm:p-12">
              <h2 className="text-center font-display text-3xl font-bold sm:text-5xl">
                Curso completo + Bônus exclusivos
              </h2>
              <div className="mt-8 grid gap-3">
                {[
                  "Curso completo (10 módulos)",
                  "Planejamento individual personalizado",
                  "Cronograma de estudos e revisões",
                  "Planilhas de controle e desempenho",
                  "Bônus: Lei seca estratégica",
                  "Bônus: Filtro de questões QConcursos",
                  "Bônus: Plantão de dúvidas WhatsApp 30 dias",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
                    <Check className="h-5 w-5 shrink-0 text-gold" />
                    <span className="text-sm sm:text-base">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground line-through">De R$ 1.997,00</p>
                <p className="mt-1 font-display text-sm uppercase tracking-widest text-gold">Por apenas</p>
                <p className="mt-1 font-display text-5xl font-bold text-gradient-gold sm:text-6xl">12x R$ 49,70</p>
                <p className="mt-1 text-sm text-muted-foreground">ou R$ 497,00 à vista</p>
                <a
                  href="#"
                  className="animate-pulse-gold mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-gold px-8 py-5 font-display text-lg font-bold uppercase tracking-wide text-gold-foreground shadow-gold transition hover:scale-[1.02] sm:w-auto"
                >
                  Quero garantir minha vaga
                </a>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground sm:flex-row">
                  <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Garantia incondicional de 7 dias</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Acesso imediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Trophy className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Seu nome pode ser <span className="text-gradient-gold">o próximo</span> na lista de aprovados.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Mas isso depende da decisão que você toma hoje. Daqui a 6 meses você vai agradecer — ou se arrepender — pelo que decidir agora.
          </p>
          <a
            href="#oferta"
            className="animate-pulse-gold mt-10 inline-flex items-center justify-center rounded-xl bg-gradient-gold px-10 py-5 font-display text-lg font-bold uppercase tracking-wide text-gold-foreground shadow-gold transition hover:scale-[1.02]"
          >
            Quero começar agora
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Método Aprovação Policial. Todos os direitos reservados.
      </footer>
    </div>
  );
}
