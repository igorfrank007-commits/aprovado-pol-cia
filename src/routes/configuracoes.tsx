import { createFileRoute, redirect } from "@tanstack/react-router";

// Página de configurações removida a pedido do cliente.
export const Route = createFileRoute("/configuracoes")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});


