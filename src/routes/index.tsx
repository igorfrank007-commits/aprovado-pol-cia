import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-policial.jpg";
import estudanteImg from "@/assets/estudante.jpg";
import trajetoriaImg from "@/assets/trajetoria.png";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, BookOpen, Monitor, Calendar, Target, Route as RouteIcon, Headphones, ListChecks, Check, ShieldCheck, Trophy, MessageCircle, FileSpreadsheet, Scale, Filter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Concurso Público Facilitado | Método de Igor Andrade" },
    { name: "description", content: "Conheça o método de estudos de Igor Andrade para concursos públicos. Planejamento, revisões inteligentes, questões e preparação para sua aprovação." },
    { property: "og:title", content: "Concurso Público Facilitado | Igor Andrade" },
    { property: "og:description", content: "Transforme sua preparação com o método de estudos que aprovou Igor Andrade na Polícia Federal, para Delegado de Polícia e na ABIN." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const pilares = [
  { icon: Brain, title: "Método anti esquecimento", desc: "Revisões inteligentes para consolidar o que você aprende e chegar à prova com o conteúdo na memória." },
  { icon: BookOpen, title: "Provas antigas e correções", desc: "Aprenda a usar questões anteriores para entender as bancas, identificar erros e direcionar seus estudos." },
  { icon: Monitor, title: "Preparação completa", desc: "Um caminho organizado que conecta planejamento, teoria, lei seca, exercícios e revisões." },
  { icon: Calendar, title: "Ciclo estratégico de estudos", desc: "Distribua as matérias de forma equilibrada e encaixe a preparação na sua rotina." },
  { icon: Target, title: "Mudança de mentalidade", desc: "Construa foco, disciplina e constância para continuar avançando, mesmo nos dias difíceis." },
  { icon: RouteIcon, title: "Rotas e destinos do objetivo final", desc: "Defina seu concurso e transforme uma meta distante em etapas claras de preparação." },
  { icon: Headphones, title: "Equipe de apoio", desc: "Conte com o suporte na implementação do método para não enfrentar suas dúvidas sozinho." },
  { icon: ListChecks, title: "Simulados estratégicos", desc: "Aprenda a usar simulados para avaliar seu desempenho e ajustar o caminho até a prova." },
];
const inclusos = [
  { icon: BookOpen, title: "Curso completo", desc: "10 módulos sobre organização, ciclo de estudos, revisões, questões e estratégias de reta final." },
  { icon: MessageCircle, title: "Suporte por 30 dias", desc: "Acompanhamento na implementação do método e plantão de dúvidas pelo WhatsApp." },
  { icon: Calendar, title: "Planejamento individual", desc: "Organize suas prioridades e monte um cronograma de estudos e revisões para sua rotina." },
  { icon: FileSpreadsheet, title: "Controle de desempenho", desc: "Planilhas para acompanhar exercícios, reconhecer dificuldades e visualizar sua evolução." },
  { icon: Scale, title: "Lei seca estratégica", desc: "Direcione a leitura da legislação de acordo com a relevância dos assuntos nas bancas." },
  { icon: Filter, title: "Filtro de questões QConcursos", desc: "Aprenda a selecionar questões relevantes e dedicar tempo ao que importa para seu concurso." },
];
const perguntas = [
  { q: "O curso é presencial ou on-line?", a: "O curso é digital. Você pode estudar de onde estiver e organizar a preparação de acordo com sua rotina." },
  { q: "Tenho acompanhamento por quanto tempo?", a: "O curso inclui suporte por 30 dias na implementação do método e plantão de dúvidas pelo WhatsApp." },
  { q: "Existe grupo de alunos?", a: "O acompanhamento inclui um plantão de dúvidas pelo WhatsApp. A participação em um grupo de alunos não está especificada nesta oferta." },
  { q: "Por onde são feitos os simulados?", a: "O método orienta sua prática de questões e o controle de desempenho, incluindo o uso de filtros no QConcursos. Não é necessário depender de uma plataforma própria de simulados para aplicar essas estratégias." },
  { q: "Qual a média de aprovados com o método?", a: "As aprovações apresentadas nesta página são da trajetória de Igor Andrade: 3 na Polícia Federal, 4 para Delegado de Polícia e 1 na ABIN. Não há uma taxa de aprovação de alunos informada. Resultados dependem da preparação e das condições de cada candidato." },
];

function Checkout({ children }: { children: React.ReactNode }) {
  return <Button asChild size="lg" className="animate-pulse-gold h-auto min-h-14 max-w-full whitespace-normal rounded-xl bg-gradient-gold px-8 py-4 text-center font-display text-lg font-bold uppercase tracking-wide text-gold-foreground shadow-gold transition hover:scale-[1.02]"><a href="https://pay.kiwify.com.br/mPgVeXg" target="_blank" rel="noopener noreferrer">{children}</a></Button>;
}
function Heading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return <div className="text-center">{eyebrow && <span className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</span>}<h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{children}</h2></div>;
}
function FeatureGrid({ items }: { items: { icon: LucideIcon; title: string; desc: string }[] }) {
  return <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(({ icon: Icon, title, desc }) => <div key={title} className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"><div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold"><Icon className="h-6 w-6" /></div><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p></div>)}</div>;
}
function Index() {
  return <div className="min-h-screen bg-background text-foreground">
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold"><ShieldCheck className="h-4 w-4" /> Concurso Público Facilitado</span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">DESCUBRA O <span className="text-gradient-gold">MÉTODO SIMPLIFICADO</span> QUE ME AJUDOU A <span className="text-gradient-gold">PASSAR 3X NA POLÍCIA FEDERAL, 4X PARA DELEGADO DE POLÍCIA E 1X NA ABIN</span> E FATURAR 20 MIL POR MÊS</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Transforme sua preparação para concursos públicos com planejamento, revisões inteligentes e um caminho claro até a prova.</p>
          <div className="mt-8"><Checkout>Eu quero passar no concurso</Checkout></div>
        </div>
      </div>
    </section>

    <section className="border-y border-border/50 bg-card/40 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Antes de revelar o método, deixa eu me apresentar</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Me chamo <span className="text-gradient-gold">Igor Andrade</span>. Minha trajetória é feita de aprovações.</h2>
        <p className="mt-5 text-muted-foreground">Fui aprovado 3 vezes na Polícia Federal, 4 vezes para Delegado de Polícia e 1 vez na ABIN. Ao longo dessa trajetória, organização, prática de questões e revisões fizeram parte da minha preparação.</p>
        <p className="mt-4 text-muted-foreground">Reuni essa experiência em um método para ajudar você a sair dos estudos sem direção e construir uma preparação estratégica para concursos públicos.</p>
        <img src={trajetoriaImg} alt="Trajetória de aprovações de Igor Andrade" loading="lazy" className="mx-auto mt-10 w-full rounded-2xl border border-gold/30 shadow-elegant" />
      </div>
    </section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Concurso Público Facilitado">Conheça os pilares do método</Heading><FeatureGrid items={pilares} /></div></section>

    <section className="border-y border-border/50 bg-card/40 py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Concurso Público Facilitado">Vou te explicar como o método funciona na prática.</Heading><div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center"><img src={estudanteImg} alt="Preparação e estudo para concursos públicos" loading="lazy" className="w-full rounded-2xl border border-gold/20 shadow-elegant" /><ol className="space-y-8">{[
      ["01", "Defina seu objetivo", "Escolha seu concurso, entenda o edital e identifique as matérias que precisam de mais atenção."],
      ["02", "Organize a preparação", "Monte seu ciclo de estudos e um cronograma que caiba na sua rotina, com espaço para revisões."],
      ["03", "Pratique, revise e ajuste", "Resolva questões, acompanhe seu desempenho e use seus erros para direcionar os próximos passos."],
    ].map(([n, t, d]) => <li key={n} className="flex gap-5"><span className="font-display text-4xl font-bold text-gradient-gold">{n}</span><div><h3 className="font-display text-xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div></li>)}</ol></div></div></section>

    <section className="py-20"><div className="mx-auto max-w-4xl px-6 text-center"><Heading eyebrow="Você nunca esteve sozinho(a)">Sua preparação não precisa ser solitária</Heading><MessageCircle className="mx-auto mt-8 h-12 w-12 text-gold" /><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Ter uma direção faz diferença. Além do conteúdo, você conta com suporte por 30 dias e um plantão de dúvidas pelo WhatsApp para aplicar o método à sua rotina.</p></div></section>

    <section className="border-y border-border/50 bg-card/40 py-20"><div className="mx-auto max-w-7xl px-6"><Heading>Conheça os números da minha trajetória</Heading><div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">{[{n:"3x",l:"Polícia Federal"},{n:"4x",l:"Delegado de Polícia"},{n:"1x",l:"ABIN"},{n:"2009",l:"Primeira aprovação na PF"}].map(({n,l}) => <div key={l} className="text-center"><p className="font-display text-5xl font-bold text-gradient-gold">{n}</p><p className="mt-3 text-sm text-muted-foreground">{l}</p></div>)}</div></div></section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Concurso Público Facilitado">O que está incluso</Heading><FeatureGrid items={inclusos} /></div></section>

    <section id="oferta" className="bg-gradient-hero py-24"><div className="mx-auto max-w-3xl px-6"><Heading>Qual é o valor do seu investimento?</Heading><div className="mt-12 overflow-hidden rounded-3xl border border-gold/40 bg-card shadow-gold"><div className="bg-gradient-gold px-6 py-3 text-center font-display text-sm font-bold uppercase tracking-widest text-gold-foreground">Concurso Público Facilitado</div><div className="p-8 sm:p-12"><div className="text-center"><p className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">R$ 497,00</p><p className="mt-3 text-muted-foreground">Ou 12x de R$ 49,70</p></div><ul className="mt-8 space-y-4">{["Curso completo (10 módulos)", "Planejamento individual personalizado", "Cronograma de estudos e revisões", "Planilhas de controle e desempenho", "Bônus: Lei seca estratégica", "Bônus: Filtro de questões QConcursos", "Bônus: Plantão de dúvidas WhatsApp 30 dias"].map(item => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>{item}</span></li>)}</ul><div className="mt-10 text-center"><Checkout>Eu quero me inscrever</Checkout><p className="mt-5 text-xs text-muted-foreground">Acesso imediato · Pagamento pelo Kiwify</p></div></div></div></div></section>

    <section className="py-20"><div className="mx-auto max-w-3xl px-6 text-center"><ShieldCheck className="mx-auto h-14 w-14 text-gold" /><Heading>Garantia de 7 dias</Heading><p className="mt-6 text-lg text-muted-foreground">Você recebe 7 dias para avaliar o método. Se decidir que o curso não é para você, solicite o reembolso dentro desse prazo.</p></div></section>

    <section className="border-t border-border/50 bg-card/40 py-20"><div className="mx-auto max-w-3xl px-6"><Heading>Não tenha dúvidas</Heading><Accordion type="single" collapsible className="mt-10">{perguntas.map(({q,a},i) => <AccordionItem key={q} value={`pergunta-${i}`} className="border-border"><AccordionTrigger className="gap-4 py-6 font-display text-lg font-semibold">{q}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-12 text-center"><Trophy className="mx-auto mb-6 h-12 w-12 text-gold" /><Checkout>Eu quero ser aprovado(a)</Checkout></div></div></section>
    <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Igor Andrade · Concurso Público Facilitado. Todos os direitos reservados.</footer>
  </div>;
}
