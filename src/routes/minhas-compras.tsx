import { createFileRoute } from "@tanstack/react-router";
import { InitialPage, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/minhas-compras")({
  head: () => pageHead("Minhas compras", "Reúna as listas de supermercado da sua família no Compra Certa."),
  component: () => <InitialPage section="compras" />,
});
