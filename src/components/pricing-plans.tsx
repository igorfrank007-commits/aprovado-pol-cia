import { ArrowRight, CircleCheck, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkoutUrl, ctaSub, included, offer, whatsappUrl } from '@/lib/sales-content';

function brl(value: number) {
  return value.toFixed(2).replace('.', ',');
}

const plans = [
  {
    name: 'Mensal',
    price: `R$ ${brl(offer.monthly)}`,
    tagline: 'Por mês · assinatura mensal',
    badge: 'Sem fidelidade',
    annual: false,
  },
  {
    name: 'Anual',
    price: `${offer.annualInstallments}x de R$ ${brl(offer.annualInstallment)}`,
    tagline: `Plano anual · ${offer.annualInstallments} meses de acesso`,
    badge: `${offer.annualInstallments} meses de acesso`,
    annual: true,
  },
];

export function PricingPlans() {
  return (
    <section id="oferta" className="relative overflow-hidden py-12 sm:py-16">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase text-gold">Investimento</span>
          <h2 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
            Seu nome pode ser o <span className="text-gradient-gold">próximo aprovado</span>.
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Mas isso depende da decisão que você toma hoje. Comece agora com o método certo e transforme esforço em aprovação.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-gradient-dark p-6 pt-8 sm:p-8 sm:pt-9 ${
                plan.annual ? 'border-gold/60 shadow-gold' : 'border-border'
              }`}
            >
              <div aria-hidden className={`absolute inset-x-0 top-0 h-1 ${plan.annual ? 'bg-gradient-gold' : 'bg-border'}`} />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-2xl font-bold uppercase leading-none">Assinatura {plan.name}</h3>
                <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold">
                  {plan.badge}
                </span>
              </div>

              <p className="mt-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {plan.annual && <span className="text-lg font-semibold text-muted-foreground sm:text-xl">{offer.annualInstallments}x de </span>}
                {plan.annual ? `R$ ${brl(offer.annualInstallment)}` : plan.price}
              </p>
              <p className="mt-2 text-sm font-semibold text-gold">{plan.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Acesso ao curso e aos sistemas de planejamento, questões e revisão durante a assinatura.
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 border-b border-border pb-3 text-[10px] font-bold uppercase text-gold">
                <span>O que está incluído</span>
                <span className="shrink-0">Nos dois planos</span>
              </div>

              <ul className="mb-6 mt-1">
                {included.map((item) => {
                  const isBank = item.startsWith('Raio-X');
                  return (
                    <li
                      key={item}
                      className={
                        isBank
                          ? 'my-2 flex items-start justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 px-3 py-4'
                          : 'flex items-start justify-between gap-3 border-b border-border py-4'
                      }
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                        <span className="min-w-0 text-sm leading-relaxed">
                          <span className={isBank ? 'font-semibold text-foreground' : ''}>{item}</span>
                          {isBank && (
                            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                              Perfil da banca e incidência real de cada assunto na prova, com base nas estatísticas das últimas aplicações.
                            </span>
                          )}
                        </span>
                      </div>
                      {isBank ? (
                        <span className="mt-1 shrink-0 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase text-gold">Novo</span>
                      ) : (
                        <span className="mt-1 shrink-0 text-[9px] font-bold uppercase text-muted-foreground">Incluído</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Button
                asChild
                className="mt-auto h-auto min-h-14 w-full whitespace-normal rounded-md bg-gradient-gold px-4 py-4 font-display text-base font-bold uppercase text-primary-foreground shadow-gold transition-transform hover:scale-[1.02]"
              >
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <span className="flex flex-col items-center gap-1 leading-tight">
                    <span className="flex items-center gap-2">
                      Quero ser aprovado
                      <ArrowRight className="size-5 shrink-0" />
                    </span>
                    <span className="font-sans text-xs font-semibold normal-case tracking-wide opacity-90">{ctaSub}</span>
                  </span>
                </a>
              </Button>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <Button asChild variant="link" className="mt-3 h-auto max-w-full whitespace-normal text-gold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Ainda está em dúvida? Entre em contato pelo WhatsApp
            </a>
          </Button>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs uppercase text-muted-foreground">
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
    </section>
  );
}
