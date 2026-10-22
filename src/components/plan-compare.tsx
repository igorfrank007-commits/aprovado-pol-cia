import { CircleCheck, Lock, Shield } from 'lucide-react';
import { Checkout } from '@/components/sales-checkout';
import { included, offer, whatsappUrl } from '@/lib/sales-content';

function brl(value: number) {
  return value.toFixed(2).replace('.', ',');
}

const plans = [
  {
    name: 'Mensal',
    price: `R$ ${brl(offer.monthly)}`,
    suffix: '/mês',
    tagline: 'Sem fidelidade · cancele quando quiser',
    badge: 'Sem fidelidade',
    highlight: false,
  },
  {
    name: 'Anual',
    price: `${offer.annualInstallments}x R$ ${brl(offer.annualInstallment)}`,
    suffix: '',
    tagline: `${offer.annualInstallments} meses de acesso · melhor custo por mês`,
    badge: 'Mais escolhido',
    highlight: true,
  },
];

export function PlanCompare() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-plan p-px shadow-gold">
          <div className="relative overflow-hidden rounded-[calc(var(--radius-3xl)-1px)] bg-gradient-plan-soft px-5 py-10 sm:px-8 sm:py-12">
            <div aria-hidden className="grid-bg absolute inset-0 opacity-25" />
            <div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase text-gold">
                  Planos
                </span>
                <h2 id="planos-title" className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
                  Escolha o seu plano e <span className="text-gradient-gold">comece hoje</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Os dois planos liberam o curso completo e todos os sistemas de planejamento, questões e revisão durante a assinatura.
                </p>
              </div>

              <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className="rounded-2xl border border-gold/15 bg-card/70 p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex items-center justify-between gap-3 border-b border-border pb-3 text-[10px] font-bold uppercase tracking-wide text-gold">
                    <span>O que está incluído</span>
                    <span className="shrink-0">Nos dois planos</span>
                  </div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {included.map((item) => {
                      const isBank = item.startsWith('Raio-X');
                      return (
                        <li
                          key={item}
                          className={`flex items-start gap-2 text-sm leading-relaxed ${isBank ? 'rounded-lg border border-gold/30 bg-gold/10 p-2.5 sm:col-span-2' : ''}`}
                        >
                          <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                          <span className={isBank ? 'font-semibold text-foreground' : 'min-w-0'}>
                            {item}
                            {isBank && (
                              <span className="mt-1 flex flex-wrap items-center gap-2 text-xs font-normal leading-relaxed text-muted-foreground">
                                Perfil da banca e incidência real de cada assunto na prova.
                                <span className="rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase text-gold">Novo</span>
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="grid gap-4">
                  {plans.map((plan) => (
                    <article
                      key={plan.name}
                      className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm ${
                        plan.highlight ? 'border-gold/60 bg-gold/10 shadow-gold' : 'border-border bg-card/70'
                      }`}
                    >
                      {plan.highlight && <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-bold uppercase leading-none">Assinatura {plan.name}</h3>
                        <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold">
                          {plan.badge}
                        </span>
                      </div>
                      <p className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                        {plan.price}
                        {plan.suffix && <span className="text-sm font-semibold text-muted-foreground">{plan.suffix}</span>}
                      </p>
                      <p className="mt-1.5 text-xs font-semibold leading-relaxed text-gold">{plan.tagline}</p>
                      <div className={`mt-4 flex [&>a]:w-full [&>a]:px-4 [&>a]:py-4 [&>a]:text-sm sm:[&>a]:text-base ${plan.highlight ? '' : '[&>a]:shadow-none'}`}>
                        <Checkout pulse={false}>Quero ser aprovado</Checkout>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 text-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Ainda está em dúvida? Entre em contato pelo WhatsApp
                </a>
                <div className="flex flex-wrap justify-center gap-4 text-xs uppercase text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="size-4 text-gold" />
                    Pagamento seguro
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Shield className="size-4 text-gold" />
                    Garantia de {offer.guaranteeDays} dias
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
