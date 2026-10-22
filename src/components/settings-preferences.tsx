import { Bell, Palette, Monitor, Sun, Moon, Mail, MessageCircle } from "lucide-react";
import { SettingsSection, ToggleRow, type PanelProps } from "@/components/settings-section";
import { cn } from "@/lib/utils";

export function NotificationsPanel({ settings, update }: PanelProps) {
  const { notifications } = settings;

  return (
    <SettingsSection
      id="notificacoes"
      icon={Bell}
      title="Notificações"
      description="Escolha o que você quer receber e por onde. Você pode mudar isso quando quiser."
    >
      <ToggleRow
        title="Lembretes por e-mail"
        description="Aviso diário com o que estudar e as revisões pendentes."
        checked={notifications.emailReminders}
        onCheckedChange={(checked) => update("notifications", { emailReminders: checked })}
      />
      <ToggleRow
        title="Lembretes no WhatsApp"
        description="Mensagem curta com a tarefa do dia, enviada no horário do seu turno."
        checked={notifications.whatsappReminders}
        onCheckedChange={(checked) => update("notifications", { whatsappReminders: checked })}
      />
      <ToggleRow
        title="Novas aulas e materiais"
        description="Avisamos quando um novo conteúdo do seu concurso entrar na plataforma."
        checked={notifications.newLessons}
        onCheckedChange={(checked) => update("notifications", { newLessons: checked })}
      />
      <ToggleRow
        title="Relatório semanal"
        description="Resumo de desempenho, horas estudadas e acertos nas questões."
        checked={notifications.weeklyReport}
        onCheckedChange={(checked) => update("notifications", { weeklyReport: checked })}
      />
      <ToggleRow
        title="Ofertas e novidades"
        description="Condições especiais em cursos e mentorias parceiras."
        checked={notifications.offers}
        onCheckedChange={(checked) => update("notifications", { offers: checked })}
      />

      <ul className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
        <li className="flex items-center gap-2">
          <Mail className="size-3.5 text-gold" aria-hidden="true" /> E-mail: {settings.profile.email || "não informado"}
        </li>
        <li className="flex items-center gap-2">
          <MessageCircle className="size-3.5 text-chat" aria-hidden="true" /> WhatsApp: {settings.profile.phone || "não informado"}
        </li>
      </ul>
    </SettingsSection>
  );
}

const FONT_OPTIONS = [
  { value: "padrao", label: "Padrão", sample: "Aa", description: "Leitura equilibrada" },
  { value: "grande", label: "Grande", sample: "Aa", description: "Textos maiores" },
] as const;

export function AppearancePanel({ settings, update }: PanelProps) {
  const { appearance } = settings;

  return (
    <SettingsSection
      id="aparencia"
      icon={Palette}
      title="Aparência e acessibilidade"
      description="Ajuste a leitura da plataforma para estudar com mais conforto."
    >
      <div>
        <p className="text-sm font-semibold text-foreground">Tamanho do texto</p>
        <div role="radiogroup" aria-label="Tamanho do texto" className="mt-2 grid gap-3 sm:grid-cols-2">
          {FONT_OPTIONS.map((option) => {
            const active = appearance.fontSize === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update("appearance", { fontSize: option.value })}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  active
                    ? "border-gold/60 bg-gold/10"
                    : "border-border bg-background/40 hover:border-gold/40",
                )}
              >
                <span
                  className={cn(
                    "font-display font-bold text-gold",
                    option.value === "grande" ? "text-2xl" : "text-lg",
                  )}
                  aria-hidden="true"
                >
                  {option.sample}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{option.label}</span>
                  <span className="block text-xs text-muted-foreground">{option.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Tema</p>
        <p className="mt-1 text-xs text-muted-foreground">
          O modo escuro é o padrão do Método. O modo claro chega em breve para toda a plataforma.
        </p>
        <div className="mt-2 flex gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-gold/60 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold">
            <Moon className="size-4" aria-hidden="true" /> Escuro
          </span>
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground opacity-60"
          >
            <Sun className="size-4" aria-hidden="true" /> Claro (em breve)
          </span>
        </div>
      </div>

      <ToggleRow
        title="Modo compacto"
        description="Menos espaçamento entre as seções para ver mais conteúdo na tela."
        checked={appearance.compact}
        onCheckedChange={(checked) => update("appearance", { compact: checked })}
      />
      <ToggleRow
        title="Reduzir animações"
        description="Desativa transições e efeitos de movimento na plataforma."
        checked={appearance.reduceMotion}
        onCheckedChange={(checked) => update("appearance", { reduceMotion: checked })}
      />

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Monitor className="size-3.5 text-gold" aria-hidden="true" />
        Suas preferências valem para este navegador.
      </p>
    </SettingsSection>
  );
}
