import { createFileRoute } from "@tanstack/react-router";
import { InitialPage, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/produtos")({
  head: () => pageHead("Produtos", "O espaço para o catálogo familiar de produtos e preços do Compra Certa."),
  component: () => <InitialPage section="produtos" />,
});
