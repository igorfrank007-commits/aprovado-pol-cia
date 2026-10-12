import { defineMcp } from "@lovable.dev/mcp-js";
import courseFeatures from "./tools/course-features";
import subscriptionPrices from "./tools/subscription-prices";
import purchaseAndContactLinks from "./tools/purchase-and-contact-links";

export default defineMcp({
  name: "aprovado-pol-cia",
  title: "Aprovado Polícia",
  version: "0.1.0",
  instructions:
    "Public information about the Aprovado Polícia course for police exams. Use `course_features` to see everything included in the course, `subscription_prices` for the monthly and annual plans in Brazilian reais, and `purchase_and_contact_links` for the checkout page and the WhatsApp contact.",
  tools: [courseFeatures, subscriptionPrices, purchaseAndContactLinks],
});
