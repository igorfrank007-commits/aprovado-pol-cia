import { defineTool } from "@lovable.dev/mcp-js";
import { offer } from "@/lib/sales-content";

const reais = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

export default defineTool({
  name: "subscription_prices",
  title: "Planos e preços da assinatura",
  description:
    "Returns the course subscription prices in Brazilian reais: the monthly plan, the annual plan split into installments, plus the refund guarantee and support periods in days.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const prices = {
      currency: "BRL",
      monthly: { amount: offer.monthly, label: `${reais(offer.monthly)} por mês` },
      annual: {
        installments: offer.annualInstallments,
        installmentAmount: offer.annualInstallment,
        label: `${offer.annualInstallments}x de ${reais(offer.annualInstallment)}`,
      },
      guaranteeDays: offer.guaranteeDays,
      supportDays: offer.supportDays,
    };
    return {
      content: [
        {
          type: "text",
          text: `Assinatura mensal: ${prices.monthly.label}. Assinatura anual: ${prices.annual.label}. Garantia de ${offer.guaranteeDays} dias. Suporte por ${offer.supportDays} dias.`,
        },
      ],
      structuredContent: { prices },
    };
  },
});
