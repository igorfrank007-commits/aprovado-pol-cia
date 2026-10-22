import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  RotateCcw,
  Save,
  Settings,
  UserRound,
  CalendarClock,
  Bell,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { defaultSettings, loadSettings, persistSettings, type Settings } from "@/lib/settings";
import { ProfilePanel } from "@/components/settings-profile";
import { StudyPanel } from "@/components/settings-study";
import { NotificationsPanel, AppearancePanel } from "@/components/settings-preferences";
import { SecurityPanel } from "@/components/settings-security";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações da conta | Método Aprovação Policial" },
      {
        name: "description",
        content:
          "Ajuste seus dados de aluno, rotina de estudos, notificações, aparência e segurança da sua conta no Método Aprovação Policial.",
      },
      { property: "og:title", content: "Configurações da conta | Método Aprovação Policial" },
      {
        property: "og:description",
        content: "Personalize perfil, rotina de estudos, notificações e segurança da sua conta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

const NAV = [
  { id: "perfil", label: "Perfil", icon: UserRound },
  { id: "estudos", label: "Rotina de estudos", icon: CalendarClock },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "aparencia", label: "Aparência", icon: Palette },
  { id: "seguranca", label: "Segurança", icon: ShieldCheck },
] as const;

function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState<Settings>(defaultSettings);
  const [hydrated, setHydrated] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("perfil");

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    setSaved(loaded);
    setHydrated(true);
  }, []);

  const update = useCallback(
    <K extends keyof Settings>(group: K, values: Partial<Settings[K]>) => {
      setSettings((prev) => ({ ...prev, [group]: { ...prev[group], ...values } }));
    },
    [],
  );

  const dirty = useMemo(
    () => hydrated && JSON.stringify(settings) !== JSON.stringify(saved),
    [hydrated, saved, settings],
  );

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-settings-section]"));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hydrated]);

  function handleSave() {
    persistSettings(settings);
    setSaved(settings);
    toast.success("Configurações salvas", {
      description: "Suas preferências já valem para as próximas aulas.",
    });
  }

  function handleRestore() {
    setSettings(defaultSettings);
    persistSettings(defaultSettings);
    setSaved(defaultSettings);
    toast.info("Configurações restauradas", { description: "Voltamos aos valores padrão do método." });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  const panelProps = { settings, update };

  return (
    <main
      className={cn(
        "min-h-screen bg-background text-foreground",
        settings.appearance.fontSize === "grande" && "text-[1.05rem]",
      )}
    >
      <Toaster position="top-right" richColors closeButton />

      <div className="relative overflow-hidden bg-gradient-hero">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:pt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Voltar para a página do curso
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-gold">
            <Settings className="size-3.5" aria-hidden="true" />
            Área do aluno
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
            Configurações da <span className="text-gradient-gold">sua conta</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Ajuste seus dados, a rotina de estudos, os avisos e a segurança em um só lugar. Tudo o que
            muda aqui vale para o seu cronograma e suas revisões.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:pb-20">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
          <nav
            aria-label="Seções das configurações"
            className="rounded-2xl border border-border bg-card/70 p-2 shadow-elegant backdrop-blur-sm lg:sticky lg:top-6"
          >
            <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {NAV.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <li key={id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => scrollTo(id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                        active
                          ? "bg-gold/15 text-gold"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 hidden rounded-xl border border-border/70 bg-background/40 p-3 lg:block">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Plano ativo: <span className="font-semibold text-foreground">Método Completo</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Renovação em 12/09/2026</p>
            </div>
          </nav>

          <div className={cn("flex flex-col", settings.appearance.compact ? "gap-3" : "gap-5")}>
            <ProfilePanel {...panelProps} />
            <StudyPanel {...panelProps} />
            <NotificationsPanel {...panelProps} />
            <AppearancePanel {...panelProps} />
            <SecurityPanel {...panelProps} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            {dirty ? (
              <>
                <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                Você tem alterações não salvas
              </>
            ) : (
              <>
                <Check className="size-3.5 text-chat" aria-hidden="true" />
                Tudo salvo
              </>
            )}
          </p>
          <div className="flex flex-1 justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleRestore}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Restaurar padrões
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!dirty}
              className="gap-2 bg-gradient-gold font-display font-bold uppercase text-primary-foreground hover:opacity-90"
            >
              <Save className="size-4" aria-hidden="true" />
              Salvar alterações
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
