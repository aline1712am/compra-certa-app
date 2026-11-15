import { createFileRoute } from "@tanstack/react-router";
import { InitialPage, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/historico")({
  head: () => pageHead("Histórico", "O histórico das compras e gastos da sua família no Compra Certa."),
  component: () => <InitialPage section="historico" />,
});
