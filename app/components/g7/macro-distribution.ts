export type MealMacroRole = "BREAKFAST" | "LUNCH" | "DINNER"

export type CoachMacroPresetId =
  | "lean_cut"
  | "gym_standard"
  | "lean_bulk"
  | "athlete_performance"

export type MacroTarget = {
  protein: number
  carbs: number
  fat: number
}

export type MealMacroSplit = MacroTarget & {
  role: MealMacroRole
}

export type CoachMacroPreset = {
  id: CoachMacroPresetId
  label: string
  arabicLabel: string
  description: string
  target: MacroTarget
  split: Record<MealMacroRole, MealMacroSplit>
}

export const COACH_MACRO_PRESETS: CoachMacroPreset[] = [
  {
    id: "lean_cut",
    label: "Lean Cut",
    arabicLabel: "تنشيف ذكي",
    description: "For fat loss while keeping protein high and carbs controlled.",
    target: {
      protein: 180,
      carbs: 150,
      fat: 45,
    },
    split: {
      BREAKFAST: {
        role: "BREAKFAST",
        protein: 40,
        carbs: 35,
        fat: 10,
      },
      LUNCH: {
        role: "LUNCH",
        protein: 70,
        carbs: 60,
        fat: 17,
      },
      DINNER: {
        role: "DINNER",
        protein: 70,
        carbs: 55,
        fat: 18,
      },
    },
  },

  {
    id: "gym_standard",
    label: "Gym Standard",
    arabicLabel: "نظام الجيم الأساسي",
    description: "The most common gym-style setup: high protein with solid carbs.",
    target: {
      protein: 200,
      carbs: 250,
      fat: 60,
    },
    split: {
      BREAKFAST: {
        role: "BREAKFAST",
        protein: 45,
        carbs: 60,
        fat: 14,
      },
      LUNCH: {
        role: "LUNCH",
        protein: 80,
        carbs: 100,
        fat: 23,
      },
      DINNER: {
        role: "DINNER",
        protein: 75,
        carbs: 90,
        fat: 23,
      },
    },
  },

  {
    id: "lean_bulk",
    label: "Lean Bulk",
    arabicLabel: "زيادة عضلية نظيفة",
    description: "Higher carbs for training output with controlled fats.",
    target: {
      protein: 220,
      carbs: 300,
      fat: 70,
    },
    split: {
      BREAKFAST: {
        role: "BREAKFAST",
        protein: 50,
        carbs: 75,
        fat: 16,
      },
      LUNCH: {
        role: "LUNCH",
        protein: 85,
        carbs: 115,
        fat: 27,
      },
      DINNER: {
        role: "DINNER",
        protein: 85,
        carbs: 110,
        fat: 27,
      },
    },
  },

  {
    id: "athlete_performance",
    label: "Athlete Performance",
    arabicLabel: "أداء رياضي عالي",
    description: "For advanced lifters needing higher carbs and bigger meal portions.",
    target: {
      protein: 250,
      carbs: 350,
      fat: 80,
    },
    split: {
      BREAKFAST: {
        role: "BREAKFAST",
        protein: 55,
        carbs: 90,
        fat: 18,
      },
      LUNCH: {
        role: "LUNCH",
        protein: 100,
        carbs: 135,
        fat: 31,
      },
      DINNER: {
        role: "DINNER",
        protein: 95,
        carbs: 125,
        fat: 31,
      },
    },
  },
]

export function calculateMacroCalories(target: MacroTarget) {
  return Math.round(
    target.protein * 4 +
      target.carbs * 4 +
      target.fat * 9
  )
}

export function getCoachMacroPreset(id: CoachMacroPresetId) {
  return COACH_MACRO_PRESETS.find((preset) => preset.id === id)
}

export function getDefaultCoachMacroPreset() {
  return COACH_MACRO_PRESETS[1]
}

export function getMealMacroSplit(
  presetId: CoachMacroPresetId,
  role: MealMacroRole
) {
  const preset =
    getCoachMacroPreset(presetId) ??
    getDefaultCoachMacroPreset()

  return preset.split[role]
}