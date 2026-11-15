import { createFileRoute } from "@tanstack/react-router";
import { Dashboard, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/")({
  head: () => pageHead("Dashboard", "Organize suas compras, compartilhe decisões e controle seus gastos no Compra Certa."),
  component: Dashboard,
});
