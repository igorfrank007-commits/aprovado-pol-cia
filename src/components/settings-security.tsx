import { LogOut, ShieldCheck, Smartphone, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, SettingsSection, ToggleRow, type PanelProps } from "@/components/settings-section";
import { useState } from "react";

export function SecurityPanel({ settings, update }: PanelProps) {
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [devices, setDevices] = useState(() => [
    { id: "s1", device: "Chrome · Windows", location: "São Paulo, BR", lastSeen: "Agora", current: true },
    { id: "s2", device: "Safari · iPhone", location: "São Paulo, BR", lastSeen: "Há 2 horas", current: false },
    { id: "s3", device: "App Android", location: "Rio de Janeiro, BR", lastSeen: "Ontem", current: false },
  ]);

  return (
    <SettingsSection
      id="seguranca"
      icon={ShieldCheck}
      title="Segurança"
      description="Proteja sua conta e acompanhe onde ela está conectada."
    >
      <ToggleRow
        title="Verificação em duas etapas"
        description="Além da senha, pedimos um código enviado ao seu e-mail a cada novo acesso."
        checked={settings.security.twoFactor}
        onCheckedChange={(checked) => update("security", { twoFactor: checked })}
      />

      <div className="rounded-xl border border-border/70 bg-background/40 p-4">
        <div className="flex items-center gap-2">
          <KeyRound className="size-4 text-gold" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">Alterar senha</h3>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Field htmlFor="senha-atual" label="Senha atual">
            <Input
              id="senha-atual"
              type="password"
              autoComplete="current-password"
              value={passwords.current}
              onChange={(event) => setPasswords((prev) => ({ ...prev, current: event.target.value }))}
              placeholder="••••••••"
            />
          </Field>
          <Field htmlFor="senha-nova" label="Nova senha">
            <Input
              id="senha-nova"
              type="password"
              autoComplete="new-password"
              value={passwords.next}
              onChange={(event) => setPasswords((prev) => ({ ...prev, next: event.target.value }))}
              placeholder="Mínimo de 8 caracteres"
            />
          </Field>
          <Field htmlFor="senha-confirmar" label="Confirmar nova senha">
            <Input
              id="senha-confirmar"
              type="password"
              autoComplete="new-password"
              value={passwords.confirm}
              onChange={(event) => setPasswords((prev) => ({ ...prev, confirm: event.target.value }))}
              placeholder="Repita a nova senha"
            />
          </Field>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full border-gold/40 text-gold hover:bg-gold/10 hover:text-gold sm:w-auto"
          onClick={() => {
            if (passwords.next !== passwords.confirm) {
              toast.error("As senhas não conferem", {
                description: "Digite a mesma senha nos dois campos de nova senha.",
              });
              return;
            }
            if (passwords.next.length < 8) {
              toast.error("Senha muito curta", { description: "Use pelo menos 8 caracteres." });
              return;
            }
            setPasswords({ current: "", next: "", confirm: "" });
            toast.success("Senha atualizada", { description: "Use a nova senha no próximo acesso." });
          }}
          disabled={!passwords.current || !passwords.next || !passwords.confirm}
        >
          Atualizar senha
        </Button>
      </div>

      <div className="rounded-xl border border-border/70 bg-background/40 p-4">
        <div className="flex items-center gap-2">
          <Smartphone className="size-4 text-gold" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">Sessões ativas</h3>
        </div>
        <ul className="mt-3 divide-y divide-border">
          {devices.map((device) => (
            <li key={device.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {device.device}
                  {device.current ? (
                    <span className="rounded-full border border-chat/40 bg-chat/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-chat">
                      Este dispositivo
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  {device.location} · {device.lastSeen}
                </p>
              </div>
              {!device.current ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-destructive"
                  onClick={() => setDevices((prev) => prev.filter((item) => item.id !== device.id))}
                >
                  <LogOut className="size-3.5" aria-hidden="true" />
                  Encerrar
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </SettingsSection>
  );
}
