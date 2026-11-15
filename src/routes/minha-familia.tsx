import { createFileRoute } from "@tanstack/react-router";
import { InitialPage, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/minha-familia")({
  head: () => pageHead("Minha família", "Compartilhe decisões e organize compras em família no Compra Certa."),
  component: () => <InitialPage section="familia" />,
});
