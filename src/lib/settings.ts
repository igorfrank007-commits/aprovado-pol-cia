export const SETTINGS_STORAGE_KEY = "metodo-aprovacao.configuracoes.v1";

export const WEEKDAYS = [
  { value: "seg", label: "Seg" },
  { value: "ter", label: "Ter" },
  { value: "qua", label: "Qua" },
  { value: "qui", label: "Qui" },
  { value: "sex", label: "Sex" },
  { value: "sab", label: "Sáb" },
  { value: "dom", label: "Dom" },
] as const;

export const TARGET_EXAMS = [
  "Polícia Federal",
  "Polícia Civil",
  "Polícia Rodoviária Federal",
  "Delegado de Polícia",
  "ABIN",
  "Outro",
] as const;

export const DAILY_HOURS_OPTIONS = [
  "1 hora",
  "2 horas",
  "3 horas",
  "4 horas",
  "5 horas",
  "6 horas ou mais",
] as const;

export const SHIFT_OPTIONS = ["Manhã", "Tarde", "Noite", "Madrugada"] as const;

export const WEEKLY_QUESTIONS_OPTIONS = [
  "50 questões",
  "100 questões",
  "150 questões",
  "200 questões",
  "300 questões ou mais",
] as const;

export interface Settings {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    targetExam: string;
    examDate: string;
    about: string;
  };
  study: {
    dailyHours: string;
    shift: string;
    weekdays: string[];
    weeklyQuestions: string;
    autoReview: boolean;
  };
  notifications: {
    emailReminders: boolean;
    whatsappReminders: boolean;
    newLessons: boolean;
    weeklyReport: boolean;
    offers: boolean;
  };
  appearance: {
    fontSize: "padrao" | "grande";
    compact: boolean;
    reduceMotion: boolean;
  };
  security: {
    twoFactor: boolean;
  };
}

export const defaultSettings: Settings = {
  profile: {
    fullName: "",
    email: "",
    phone: "",
    targetExam: "Polícia Federal",
    examDate: "",
    about: "",
  },
  study: {
    dailyHours: "3 horas",
    shift: "Manhã",
    weekdays: ["seg", "ter", "qua", "qui", "sex"],
    weeklyQuestions: "150 questões",
    autoReview: true,
  },
  notifications: {
    emailReminders: true,
    whatsappReminders: false,
    newLessons: true,
    weeklyReport: true,
    offers: false,
  },
  appearance: {
    fontSize: "padrao",
    compact: false,
    reduceMotion: false,
  },
  security: {
    twoFactor: false,
  },
};

export function loadSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      profile: { ...defaultSettings.profile, ...(parsed.profile ?? {}) },
      study: { ...defaultSettings.study, ...(parsed.study ?? {}) },
      notifications: { ...defaultSettings.notifications, ...(parsed.notifications ?? {}) },
      appearance: { ...defaultSettings.appearance, ...(parsed.appearance ?? {}) },
      security: { ...defaultSettings.security, ...(parsed.security ?? {}) },
    };
  } catch {
    return defaultSettings;
  }
}

export function persistSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* armazenamento indisponível: as preferências valem só para esta sessão */
  }
}


