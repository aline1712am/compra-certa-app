import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, ShoppingBasket, LayoutDashboard, ListChecks, Package, History, Users, Settings, ChevronDown, ChevronRight, Leaf, Menu, X, Wallet, CircleCheck, Heart, Plus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import groceryTote from "@/assets/grocery-tote.png";

const navigation = [
  { to: "/", label: "Dashboard", short: "Início", icon: LayoutDashboard },
  { to: "/minhas-compras", label: "Minhas compras", short: "Compras", icon: ListChecks },
  { to: "/produtos", label: "Produtos", short: "Produtos", icon: Package },
  { to: "/historico", label: "Histórico", short: "Histórico", icon: History },
  { to: "/minha-familia", label: "Minha família", short: "Família", icon: Users },
  { to: "/configuracoes", label: "Configurações", short: "Ajustes", icon: Settings },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Compra Certa` }, { name: "description", content: description }, { property: "og:title", content: `${title} | Compra Certa` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}

function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="Compra Certa — início"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShoppingBasket size={24} strokeWidth={1.8} /></span><span className="whitespace-nowrap text-xl font-bold">Compra<span className="text-primary"> Certa</span></span></Link>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navigation.find((item) => item.to === pathname) ?? navigation[0];
  return <>
    {menuOpen && <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    <aside className="app-sidebar" data-open={menuOpen}>
      <div className="px-6 pb-8 pt-9"><Brand /></div>
      <div className="mx-5 mb-7 flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-3"><span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground"><Users size={18} /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium text-muted-foreground">Seu espaço familiar</p><p className="mt-1 text-sm font-semibold">Nenhuma família</p></div><ChevronDown size={15} className="text-muted-foreground" /></div>
      <p className="px-8 pb-3 text-[10px] font-semibold tracking-widest text-muted-foreground">PRINCIPAL</p>
      <nav aria-label="Navegação principal" className="space-y-1 px-4">{navigation.map(({ to, label, icon: Icon }) => <Button asChild variant="ghost" className="nav-item" key={to} data-active={pathname === to}><Link to={to} onClick={() => setMenuOpen(false)} aria-current={pathname === to ? "page" : undefined}><Icon size={19} />{label}</Link></Button>)}</nav>
      <div className="mt-auto px-7 pb-7 pt-12"><div className="mb-5 flex items-center gap-2 text-primary"><Leaf size={17} /><span className="text-xs font-medium">Mais organização.<br />Menos desperdício.</span></div><div className="border-t border-border pt-5"><p className="text-xs text-muted-foreground">Um cuidado a mais com suas compras.</p><p className="mt-2 text-[10px] text-muted-foreground">Compra Certa · Versão inicial</p></div></div>
    </aside>
    <div className="app-main">
      <header className="flex h-[76px] items-center justify-between border-b border-border bg-card px-5 md:px-10">
        <div className="hidden items-center gap-2 text-sm md:flex"><span className="text-muted-foreground">Seu espaço</span><ChevronRight size={14} className="text-muted-foreground" /><span className="font-medium">{current.label}</span></div>
        <div className="md:hidden"><Brand /></div>
        <div className="hidden items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-primary md:flex"><span className="size-1.5 rounded-full bg-primary" />Um novo começo</div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      <main className="page-content page-enter" key={pathname}>{children}<footer className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground"><span>Compra Certa — compras com mais tranquilidade.</span><span className="flex items-center gap-1.5">Feito para compartilhar <Heart size={12} className="text-primary" /></span></footer></main>
    </div>
    <nav className="mobile-bottom" aria-label="Navegação rápida">{navigation.slice(0, 5).map(({ to, short, icon: Icon }) => <Button key={to} asChild variant="ghost" className="mobile-nav-item" data-active={pathname === to}><Link to={to} aria-current={pathname === to ? "page" : undefined}><Icon size={20} />{short}</Link></Button>)}</nav>
  </>;
}

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-[28px] font-bold leading-tight md:text-[30px]">{title}</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div>{action}</div>;
}

function SectionLink({ to, children }: { to: typeof navigation[number]["to"]; children: ReactNode }) {
  return <Button asChild variant="link" className="h-auto p-0 text-xs"><Link to={to}>{children}<ArrowRight size={14} /></Link></Button>;
}

function EmptyState({ icon: Icon, title, description, children, compact = false }: { icon: LucideIcon; title: string; description: string; children?: ReactNode; compact?: boolean }) {
  return <div className={`flex flex-col items-center text-center ${compact ? "px-6 py-8" : "px-6 py-12 md:py-14"}`}><div className="empty-symbol mb-5"><Icon size={29} strokeWidth={1.4} /></div><h3 className="text-base font-semibold">{title}</h3><p className="mt-2 max-w-[310px] text-sm leading-relaxed text-muted-foreground">{description}</p>{children && <div className="mt-5">{children}</div>}</div>;
}

export function Dashboard() {
  const stats = [
    { label: "Listas em andamento", value: "0", note: "Tudo pronto para começar", icon: ListChecks, tone: "bg-success-soft text-primary" },
    { label: "Produtos no catálogo", value: "0", note: "Seu catálogo começa aqui", icon: Package, tone: "bg-info-soft text-info" },
    { label: "Gastos do mês", value: "R$ 0,00", note: "Nenhuma compra concluída", icon: Wallet, tone: "bg-warning-soft text-warning" },
    { label: "Compras concluídas", value: "0", note: "Cada compra, uma conquista", icon: CircleCheck, tone: "bg-success-soft text-primary" },
  ];
  return <>
    <PageHeader title="Tudo começa com uma boa lista." description="Bem-vindo ao seu espaço de compras mais organizadas." />
    <section className="welcome-band mb-7">
      <div className="relative z-10 max-w-[65%] max-md:max-w-full"><span className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><Leaf size={15} />BEM-VINDO AO COMPRA CERTA</span><h2 className="max-w-[400px] text-[26px] font-bold leading-tight md:text-[28px]">Mais cuidado com suas compras.<br className="hidden lg:block" /> Mais tempo para sua família.</h2><p className="mt-3 max-w-[370px] text-sm leading-relaxed text-muted-foreground">Organize suas compras. Compartilhe decisões.<br />Controle seus gastos.</p><div className="mt-5"><SectionLink to="/minhas-compras">Conhecer minhas compras</SectionLink></div></div>
      <img src={groceryTote} alt="Sacola verde com pão, frutas, verduras e leite" width={1024} height={1024} className="welcome-art" />
    </section>
    <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">{stats.map(({ label, value, note, icon: Icon, tone }) => <article key={label} className="stat-card"><div className="mb-4 flex items-center justify-between gap-2"><span className="text-xs font-medium text-muted-foreground">{label}</span><span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone}`}><Icon size={18} strokeWidth={1.8} /></span></div><p className="text-[27px] font-bold leading-none">{value}</p><p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{note}</p></article>)}</div>
    <div className="grid gap-7 lg:grid-cols-[1.7fr_1fr]">
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Suas listas de compras</h2><SectionLink to="/minhas-compras">Ver todas</SectionLink></div><div className="empty-panel"><EmptyState icon={ShoppingBasket} title="Sua próxima compra começa aqui" description="Você ainda não tem listas de compras. Em breve, poderá reunir tudo o que precisa em um só lugar."><SectionLink to="/minhas-compras">Ir para minhas compras</SectionLink></EmptyState></div></section>
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Sua família</h2><Users size={18} className="text-muted-foreground" /></div><div className="empty-panel"><EmptyState compact icon={Users} title="Melhor quando é em família" description="Você ainda não faz parte de uma família. Este será o espaço para organizar as compras juntos."><SectionLink to="/minha-familia">Conhecer minha família</SectionLink></EmptyState></div></section>
    </div>
    <div className="mt-7 flex items-start gap-3"><span className="mt-0.5 text-primary"><Leaf size={19} /></span><div><p className="text-sm font-medium">Pequenas listas, grandes economias.</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Planejar as compras é o primeiro passo para levar só o que você precisa.</p></div></div>
  </>;
}

const sections = {
  compras: { title: "Minhas compras", description: "Um lugar para organizar tudo o que sua família precisa.", icon: ShoppingBasket, empty: "Nenhuma lista por aqui, ainda", message: "Suas listas de compras aparecerão aqui. Em breve, você poderá criar listas e acompanhar os itens no carrinho.", action: "Nova lista", label: "Listas de compras" },
  produtos: { title: "Produtos", description: "Os produtos do dia a dia, reunidos no catálogo da sua família.", icon: Package, empty: "Seu catálogo está esperando o primeiro produto", message: "Nenhum produto cadastrado. Em breve, você poderá organizar os produtos e seus preços estimados.", action: "Novo produto", label: "Catálogo de produtos" },
  historico: { title: "Histórico", description: "Um olhar para suas compras e os gastos ao longo do tempo.", icon: History, empty: "Cada compra vai contar uma história", message: "Você ainda não tem compras concluídas. Quando estiverem disponíveis, elas aparecerão aqui para consulta.", label: "Compras concluídas" },
  familia: { title: "Minha família", description: "Compras compartilhadas, decisões em conjunto.", icon: Users, empty: "Seu espaço em família começa aqui", message: "Você ainda não faz parte de uma família. Em breve, poderá criar seu grupo ou participar por convite.", action: "Criar família", label: "Suas famílias" },
  configuracoes: { title: "Configurações", description: "Seu espaço para cuidar das preferências da sua conta.", icon: Settings, empty: "Tudo no seu tempo", message: "As configurações da conta e as preferências do aplicativo estarão disponíveis nas próximas etapas.", label: "Conta e preferências" },
} as const;

export function InitialPage({ section }: { section: keyof typeof sections }) {
  const info = sections[section];
  return <><PageHeader title={info.title} description={info.description} action={"action" in info ? <Button disabled title="Disponível em uma próxima etapa"><Plus />{info.action}</Button> : undefined} /><section><div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">{info.label}</h2><span className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">{"action" in info ? "0 registros" : "Versão inicial"}</span></div><div className="empty-panel"><EmptyState icon={info.icon} title={info.empty} description={info.message}><span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-primary"><Leaf size={13} />Um novo começo</span></EmptyState></div></section><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><CircleCheck size={15} className="shrink-0 text-primary" />Este espaço está sendo preparado. Nenhum dado foi cadastrado.</p></>;
}
