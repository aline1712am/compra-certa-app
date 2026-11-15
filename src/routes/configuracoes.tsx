import { createFileRoute } from "@tanstack/react-router";
import { InitialPage, pageHead } from "@/components/compra-certa";

export const Route = createFileRoute("/configuracoes")({
  head: () => pageHead("Configurações", "Preferências e configurações da sua conta no Compra Certa."),
  component: () => <InitialPage section="configuracoes" />,
});
