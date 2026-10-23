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
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block max-w-full rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase leading-tight text-gold sm:px-3 sm:text-xs">Investimento</span>
          <h2 className="mt-3 text-[1.6rem] font-bold uppercase leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
            Seu nome pode ser o <span className="text-gradient-gold">próximo aprovado</span>.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-lg">
            Mas isso depende da decisão que você toma hoje. Comece agora com o método certo e transforme esforço em aprovação.
          </p>
        </div>

        <div className="mt-7 grid items-stretch gap-5 sm:mt-10 md:grid-cols-2 md:gap-6">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-gradient-dark p-4 pt-7 sm:p-8 sm:pt-9 ${
                plan.annual ? 'border-gold/60 shadow-gold' : 'border-border'
              }`}
            >
              <div aria-hidden className={`absolute inset-x-0 top-0 h-1 ${plan.annual ? 'bg-gradient-gold' : 'bg-border'}`} />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-xl font-bold uppercase leading-none sm:text-2xl">Assinatura {plan.name}</h3>
                <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-gold sm:text-[10px]">
                  {plan.badge}
                </span>
              </div>

              <p className="mt-4 font-display text-[1.7rem] font-bold leading-tight text-foreground sm:mt-5 sm:text-4xl">
                {plan.annual && <span className="text-base font-semibold text-muted-foreground sm:text-xl">{offer.annualInstallments}x de </span>}
                {plan.annual ? `R$ ${brl(offer.annualInstallment)}` : plan.price}
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-gold sm:mt-2">{plan.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4">
                Acesso ao curso e aos sistemas de planejamento, questões e revisão durante a assinatura.
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-b border-border pb-2.5 text-[10px] font-bold uppercase text-gold sm:mt-6 sm:pb-3">
                <span>O que está incluído</span>
                <span className="shrink-0">Nos dois planos</span>
              </div>

              <ul className="mb-5 mt-1 sm:mb-6">
                {included.map((item) => {
                  const isBank = item.startsWith('Raio-X');
                  return (
                    <li
                      key={item}
                      className={
                        isBank
                          ? 'my-2 flex items-start justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 px-3 py-3 sm:py-4'
                          : 'flex items-start justify-between gap-3 border-b border-border py-3 sm:py-4'
                      }
                    >
                      <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                        <span className="min-w-0 break-words text-sm leading-relaxed">
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
                        <span className="mt-1 hidden shrink-0 text-[9px] font-bold uppercase text-muted-foreground sm:block">Incluído</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Button
                asChild
                className="mt-auto h-auto min-h-14 w-full whitespace-normal rounded-md bg-gradient-gold px-4 py-4 font-display text-sm font-bold uppercase leading-snug text-primary-foreground shadow-gold transition-transform hover:scale-[1.02] sm:text-base"
              >
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <span className="flex flex-col items-center gap-1 leading-tight">
                    <span className="flex items-center gap-2">
                      Quero ser aprovado
                      <ArrowRight className="size-4 shrink-0 sm:size-5" />
                    </span>
                    <span className="font-sans text-[10px] font-semibold normal-case tracking-wide opacity-90 sm:text-xs">{ctaSub}</span>
                  </span>
                </a>
              </Button>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-7 max-w-3xl text-center sm:mt-8">
          <Button asChild variant="link" className="mt-3 h-auto max-w-full whitespace-normal px-2 text-sm text-gold sm:text-base">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Ainda está em dúvida? Entre em contato pelo WhatsApp
            </a>
          </Button>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-[10px] uppercase text-muted-foreground sm:mt-6 sm:gap-4 sm:text-xs">
            <span className="inline-flex items-center gap-1">
              <Lock className="size-4 shrink-0 text-gold" />
              Pagamento seguro
            </span>
            <span className="inline-flex items-center gap-1">
              <Shield className="size-4 shrink-0 text-gold" />
              Garantia de {offer.guaranteeDays} dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
