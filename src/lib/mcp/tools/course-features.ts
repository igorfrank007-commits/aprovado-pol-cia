import { defineTool } from "@lovable.dev/mcp-js";
import { benefits } from "@/lib/sales-content";

export default defineTool({
  name: "course_features",
  title: "O que você recebe no curso",
  description:
    "Lists the seven resources included in the police-exam course, each with its title and full description.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const features = benefits.map(({ title, desc }) => ({ title, description: desc }));
    return {
      content: [
        {
          type: "text",
          text: features.map(({ title, description }) => `${title}: ${description}`).join("\n"),
        },
      ],
      structuredContent: { features },
    };
  },
});
