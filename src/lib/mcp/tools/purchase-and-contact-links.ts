import { defineTool } from "@lovable.dev/mcp-js";
import { checkoutUrl, whatsappUrl } from "@/lib/sales-content";

export default defineTool({
  name: "purchase_and_contact_links",
  title: "Link de compra e WhatsApp",
  description:
    "Returns the Lei Seca em Questões signup page (free account, subscription from there) and the WhatsApp link used to ask questions before buying.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: () => ({
    content: [
      { type: "text", text: `Criar conta grátis ou assinar: ${checkoutUrl}\nTirar dúvidas no WhatsApp: ${whatsappUrl}` },
    ],
    structuredContent: { checkoutUrl, whatsappUrl },
  }),
});
