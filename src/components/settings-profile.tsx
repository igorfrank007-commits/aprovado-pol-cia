import { UserRound, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, SettingsSection, type PanelProps } from "@/components/settings-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TARGET_EXAMS } from "@/lib/settings";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "IA";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function ProfilePanel({ settings, update }: PanelProps) {
  const { profile } = settings;

  return (
    <SettingsSection
      id="perfil"
      icon={UserRound}
      title="Perfil"
      description="Seus dados de aluno e o concurso que você está perseguindo agora."
    >
      <div className="flex flex-wrap items-center gap-4">
        <div
          aria-hidden="true"
          className="grid size-16 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gradient-gold font-display text-2xl font-bold text-primary-foreground"
        >
          {initials(profile.fullName)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {profile.fullName || "Seu nome aparece aqui"}
          </p>
          <p className="text-xs text-muted-foreground">Foto de perfil · JPG ou PNG até 2 MB</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            Enviar foto
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field htmlFor="nome" label="Nome completo">
          <Input
            id="nome"
            value={profile.fullName}
            onChange={(event) => update("profile", { fullName: event.target.value })}
            placeholder="Como quer ser chamado"
            autoComplete="name"
          />
        </Field>
        <Field htmlFor="email" label="E-mail">
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(event) => update("profile", { email: event.target.value })}
            placeholder="seu@email.com"
            autoComplete="email"
          />
        </Field>
        <Field htmlFor="telefone" label="WhatsApp" hint="Usamos apenas para avisos do seu plano de estudos.">
          <Input
            id="telefone"
            type="tel"
            value={profile.phone}
            onChange={(event) => update("profile", { phone: event.target.value })}
            placeholder="(11) 90000-0000"
            autoComplete="tel"
          />
        </Field>
        <Field htmlFor="concurso" label="Concurso alvo">
          <Select
            value={profile.targetExam}
            onValueChange={(value) => update("profile", { targetExam: value })}
          >
            <SelectTrigger id="concurso">
              <SelectValue placeholder="Escolha o concurso" />
            </SelectTrigger>
            <SelectContent>
              {TARGET_EXAMS.map((exam) => (
                <SelectItem key={exam} value={exam}>
                  {exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field htmlFor="prova" label="Data prevista da prova" hint="Ajustamos o cronograma automaticamente.">
          <Input
            id="prova"
            type="date"
            value={profile.examDate}
            onChange={(event) => update("profile", { examDate: event.target.value })}
          />
        </Field>
      </div>

      <Field htmlFor="sobre" label="Sobre você" hint="Conte sua rotina, dificuldades e metas para personalizarmos o método.">
        <Textarea
          id="sobre"
          rows={3}
          value={profile.about}
          onChange={(event) => update("profile", { about: event.target.value })}
          placeholder="Ex.: trabalho de dia e estudo 3 horas à noite..."
        />
      </Field>
    </SettingsSection>
  );
}
