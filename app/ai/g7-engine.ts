import { G7Plan } from "./g7-plans"

type G7DishOutput = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  aiDescription: string
}

type PlanRule = {
  name: string
  identity: string
  calories: number
  p: number
  c: number
  f: number
  proteinPool: string[]
  carbPool: string[]
  fatPool: string[]
  moodPool: string[]
}

const RULES: Record<G7Plan, PlanRule> = {
  fat_loss: {
    name: "Fat Loss",
    identity: "Lean Metabolic System",
    calories: 420,
    p: 0.42,
    c: 0.32,
    f: 0.26,
    proteinPool: ["Chicken Breast", "Turkey Breast", "White Fish", "Egg Whites"],
    carbPool: ["Rice", "Sweet Potato", "Quinoa", "Roasted Vegetables"],
    fatPool: ["Olive Oil", "Avocado", "Light Yogurt Sauce"],
    moodPool: ["Clean", "Lean", "Fresh", "Controlled"],
  },

  keto: {
    name: "Keto",
    identity: "Low-Carb Focus System",
    calories: 540,
    p: 0.32,
    c: 0.08,
    f: 0.6,
    proteinPool: ["Chicken Thigh", "Beef", "Salmon", "Eggs"],
    carbPool: ["Cauliflower Rice", "Zucchini", "Spinach", "Mushrooms"],
    fatPool: ["Avocado", "Olive Oil", "Butter", "Cheese"],
    moodPool: ["Rich", "Stable", "Creamy", "Focused"],
  },

  vegan: {
    name: "Vegan",
    identity: "Plant Creativity System",
    calories: 480,
    p: 0.25,
    c: 0.5,
    f: 0.25,
    proteinPool: ["Tofu", "Lentils", "Chickpeas", "Black Beans"],
    carbPool: ["Quinoa", "Brown Rice", "Sweet Potato", "Whole Grain Pasta"],
    fatPool: ["Tahini", "Avocado", "Olive Oil", "Nuts"],
    moodPool: ["Fresh", "Creative", "Plant-Based", "Light"],
  },

  diabetic: {
    name: "Diabetic",
    identity: "Balanced Energy System",
    calories: 430,
    p: 0.36,
    c: 0.34,
    f: 0.3,
    proteinPool: ["Salmon", "Chicken Breast", "Turkey Breast", "White Fish"],
    carbPool: ["Brown Rice", "Lentils", "Quinoa", "Sweet Potato"],
    fatPool: ["Olive Oil", "Avocado", "Seeds"],
    moodPool: ["Balanced", "Steady", "Smart", "Controlled"],
  },

  athlete: {
    name: "Athlete",
    identity: "Performance Fuel System",
    calories: 650,
    p: 0.38,
    c: 0.42,
    f: 0.2,
    proteinPool: ["Chicken Breast", "Beef", "Salmon", "Turkey"],
    carbPool: ["Rice", "Sweet Potato", "Pasta", "Quinoa"],
    fatPool: ["Olive Oil", "Avocado", "Nuts"],
    moodPool: ["Power", "Recovery", "High Output", "Performance"],
  },

  gf_df: {
    name: "GF & DF",
    identity: "Clean Comfort System",
    calories: 460,
    p: 0.32,
    c: 0.4,
    f: 0.28,
    proteinPool: ["Turkey Breast", "Chicken Breast", "Salmon", "Eggs"],
    carbPool: ["Rice", "Quinoa", "Potato", "Sweet Potato"],
    fatPool: ["Avocado", "Olive Oil", "Tahini"],
    moodPool: ["Clean", "Comfort", "Digestive", "Light"],
  },

  carnivore: {
    name: "Carnivore",
    identity: "Primal Protein System",
    calories: 620,
    p: 0.58,
    c: 0.02,
    f: 0.4,
    proteinPool: ["Beef Steak", "Eggs", "Chicken Thigh", "Lamb"],
    carbPool: ["Bone Broth", "Sea Salt", "Zero-Carb Base", "Egg Base"],
    fatPool: ["Butter", "Beef Fat", "Egg Yolk", "Bone Broth Glaze"],
    moodPool: ["Primal", "Protein", "Fire", "Strength"],
  },
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function calculateMacros(calories: number, p: number, c: number, f: number) {
  return {
    protein: Math.round((calories * p) / 4),
    carbs: Math.round((calories * c) / 4),
    fat: Math.round((calories * f) / 9),
  }
}

export function generateG7Dish(plan: G7Plan): G7DishOutput {
  const rules = RULES[plan]

  if (!rules) {
    throw new Error("Invalid G7 plan")
  }

  const proteinSource = pick(rules.proteinPool)
  const carbSource = pick(rules.carbPool)
  const fatSource = pick(rules.fatPool)
  const mood = pick(rules.moodPool)

  const macros = calculateMacros(
    rules.calories,
    rules.p,
    rules.c,
    rules.f
  )

  return {
    name: `${mood} ${rules.name} Bowl`,
    calories: rules.calories,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    aiDescription: `${rules.identity}: ${proteinSource} with ${carbSource} and ${fatSource}.`,
  }
}