import { defineTool } from "@lovable.dev/mcp-js";
import { offer } from "@/lib/sales-content";

const reais = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

export default defineTool({
  name: "subscription_prices",
  title: "Planos e preços da assinatura",
  description:
    "Returns the Lei Seca em Questões subscription prices in Brazilian reais: the monthly plan (charged every month) and the annual plan split into installments.",
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
    };
    return {
      content: [
        {
          type: "text",
          text: `Plano mensal (cobrança todo mês, cancele quando quiser): ${prices.monthly.label}. Plano anual: ${prices.annual.label}, total de R$ ${offer.annualTotal.toFixed(2).replace(".", ",")} por ano. Garantia de ${offer.guaranteeDays} dias, com devolução integral.`,
        },
      ],
      structuredContent: { prices },
    };
  },
});
