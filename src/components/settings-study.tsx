import { CalendarClock } from "lucide-react";
import { Field, SettingsSection, ToggleRow, type PanelProps } from "@/components/settings-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DAILY_HOURS_OPTIONS,
  SHIFT_OPTIONS,
  WEEKDAYS,
  WEEKLY_QUESTIONS_OPTIONS,
} from "@/lib/settings";

export function StudyPanel({ settings, update }: PanelProps) {
  const { study } = settings;

  function toggleDay(day: string) {
    const selected = study.weekdays.includes(day)
      ? study.weekdays.filter((value) => value !== day)
      : [...study.weekdays, day];
    update("study", { weekdays: selected });
  }

  return (
    <SettingsSection
      id="estudos"
      icon={CalendarClock}
      title="Rotina de estudos"
      description="Defina quanto tempo você tem por dia para o cronograma acompanhar sua realidade."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field htmlFor="horas" label="Horas de estudo por dia">
          <Select value={study.dailyHours} onValueChange={(value) => update("study", { dailyHours: value })}>
            <SelectTrigger id="horas">
              <SelectValue placeholder="Escolha" />
            </SelectTrigger>
            <SelectContent>
              {DAILY_HOURS_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field htmlFor="turno" label="Melhor turno">
          <Select value={study.shift} onValueChange={(value) => update("study", { shift: value })}>
            <SelectTrigger id="turno">
              <SelectValue placeholder="Escolha" />
            </SelectTrigger>
            <SelectContent>
              {SHIFT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Dias de estudo</p>
        <p className="mt-1 text-xs text-muted-foreground">
          As revisões e os simulados são distribuídos só nos dias marcados.
        </p>
        <div role="group" aria-label="Dias de estudo" className="mt-2 flex flex-wrap gap-2">
          {WEEKDAYS.map((day) => {
            const active = study.weekdays.includes(day.value);
            return (
              <button
                key={day.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDay(day.value)}
                className={cn(
                  "min-w-14 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-border bg-background/40 text-muted-foreground hover:border-gold/40 hover:text-foreground",
                )}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      <Field htmlFor="questoes" label="Meta de questões por semana">
        <Select
          value={study.weeklyQuestions}
          onValueChange={(value) => update("study", { weeklyQuestions: value })}
        >
          <SelectTrigger id="questoes">
            <SelectValue placeholder="Escolha" />
          </SelectTrigger>
          <SelectContent>
            {WEEKLY_QUESTIONS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <ToggleRow
        title="Revisão automática"
        description="O sistema agenda revisões espaçadas dos conteúdos que você já estudou."
        checked={study.autoReview}
        onCheckedChange={(checked) => update("study", { autoReview: checked })}
      />
    </SettingsSection>
  );
}
