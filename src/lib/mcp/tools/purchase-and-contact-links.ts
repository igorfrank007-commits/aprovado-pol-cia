import { defineTool } from "@lovable.dev/mcp-js";
import { checkoutUrl, whatsappUrl } from "@/lib/sales-content";

export default defineTool({
  name: "purchase_and_contact_links",
  title: "Link de compra e WhatsApp",
  description:
    "Returns the checkout page where the course subscription is purchased and the WhatsApp link used to ask questions before buying.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: () => ({
    content: [
      { type: "text", text: `Comprar o curso: ${checkoutUrl}\nTirar dúvidas no WhatsApp: ${whatsappUrl}` },
    ],
    structuredContent: { checkoutUrl, whatsappUrl },
  }),
});
