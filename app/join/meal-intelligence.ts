export type MealSlot = "B" | "L" | "D"

export type CarbType =
  | "BREAD"
  | "OATS"
  | "POTATO"
  | "RICE"
  | "PASTA"
  | "WRAP"
  | "SHAKE"

export type MealTexture =
  | "SOFT"
  | "CREAMY"
  | "SAUCY"
  | "CRUNCHY"
  | "LIQUID"

export type DigestionLoad = "LOW" | "MEDIUM" | "HIGH"

export type DayType =
  | "PERFORMANCE"
  | "GLYCOGEN"
  | "STREET_FIT"
  | "MIDWEEK_LIGHT"
  | "COMFORT"
  | "RECOVERY"
  | "FRESH_RESET"

export type SmartMeal = {
  slot: MealSlot
  name: string
  proteinFamily: "EGGS" | "CHICKEN" | "BEEF" | "TUNA" | "FISH" | "WHEY"
  carbType: CarbType
  texture: MealTexture
  digestionLoad: DigestionLoad
  role: string
}

export type SmartDay = {
  day: string
  type: DayType
  label: string
  note: string
  meals: SmartMeal[]
}

export const G7_MASTER_WEEK: SmartDay[] = [
  {
    day: "DAY 1",
    type: "PERFORMANCE",
    label: "Performance Foundation",
    note: "Strong start with eggs, chicken rice, and beef recovery.",
    meals: [
      {
        slot: "B",
        name: "G7 Egg Power Breakfast",
        proteinFamily: "EGGS",
        carbType: "BREAD",
        texture: "SOFT",
        digestionLoad: "LOW",
        role: "Clean morning protein base",
      },
      {
        slot: "L",
        name: "Chicken Kofta & Basmati Rice",
        proteinFamily: "CHICKEN",
        carbType: "RICE",
        texture: "SAUCY",
        digestionLoad: "MEDIUM",
        role: "Training energy support",
      },
      {
        slot: "D",
        name: "Beef Kofta Rice Plate",
        proteinFamily: "BEEF",
        carbType: "RICE",
        texture: "SAUCY",
        digestionLoad: "MEDIUM",
        role: "Recovery dinner",
      },
    ],
  },
  {
    day: "DAY 2",
    type: "GLYCOGEN",
    label: "High Glycogen Training Day",
    note: "Higher-carb pasta day for hard training output.",
    meals: [
      {
        slot: "B",
        name: "Protein Oats Power Breakfast",
        proteinFamily: "WHEY",
        carbType: "OATS",
        texture: "CREAMY",
        digestionLoad: "MEDIUM",
        role: "Slow energy breakfast",
      },
      {
        slot: "L",
        name: "Chicken Meatballs Penne Pasta",
        proteinFamily: "CHICKEN",
        carbType: "PASTA",
        texture: "SAUCY",
        digestionLoad: "MEDIUM",
        role: "Active training lunch",
      },
      {
        slot: "D",
        name: "Kofta Meatballs Penne Pasta",
        proteinFamily: "BEEF",
        carbType: "PASTA",
        texture: "SAUCY",
        digestionLoad: "MEDIUM",
        role: "Glycogen recovery dinner",
      },
    ],
  },
  {
    day: "DAY 3",
    type: "STREET_FIT",
    label: "Street Food Fit Control",
    note: "Psychology day with quesadilla and hawawshi, controlled macros.",
    meals: [
      {
        slot: "B",
        name: "Eggs & Potato Fitness Plate",
        proteinFamily: "EGGS",
        carbType: "POTATO",
        texture: "SOFT",
        digestionLoad: "LOW",
        role: "Stable morning fuel",
      },
      {
        slot: "L",
        name: "Chicken Quesadilla Fit",
        proteinFamily: "CHICKEN",
        carbType: "WRAP",
        texture: "CRUNCHY",
        digestionLoad: "MEDIUM",
        role: "Controlled comfort lunch",
      },
      {
        slot: "D",
        name: "Lean Beef Hawawshi Fit",
        proteinFamily: "BEEF",
        carbType: "BREAD",
        texture: "CRUNCHY",
        digestionLoad: "HIGH",
        role: "Street-food adherence dinner",
      },
    ],
  },
  {
    day: "DAY 4",
    type: "MIDWEEK_LIGHT",
    label: "Midweek Lighter Flow",
    note: "Shake breakfast with chicken pasta and tuna pasta light.",
    meals: [
      {
        slot: "B",
        name: "G7 Protein Shake",
        proteinFamily: "WHEY",
        carbType: "SHAKE",
        texture: "LIQUID",
        digestionLoad: "LOW",
        role: "Fast breakfast",
      },
      {
        slot: "L",
        name: "Chicken Pink Sauce Pasta",
        proteinFamily: "CHICKEN",
        carbType: "PASTA",
        texture: "CREAMY",
        digestionLoad: "MEDIUM",
        role: "Chef-style lunch",
      },
      {
        slot: "D",
        name: "Tuna Pasta Light",
        proteinFamily: "TUNA",
        carbType: "PASTA",
        texture: "SAUCY",
        digestionLoad: "LOW",
        role: "Lighter seafood dinner",
      },
    ],
  },
  {
    day: "DAY 5",
    type: "COMFORT",
    label: "Comfort + Adherence Day",
    note: "Burger-style lunch with beef yogurt recovery dinner.",
    meals: [
      {
        slot: "B",
        name: "Egg White Omelette Plate",
        proteinFamily: "EGGS",
        carbType: "BREAD",
        texture: "SOFT",
        digestionLoad: "LOW",
        role: "Lean breakfast",
      },
      {
        slot: "L",
        name: "Chicken Burger Fit",
        proteinFamily: "CHICKEN",
        carbType: "BREAD",
        texture: "CRUNCHY",
        digestionLoad: "MEDIUM",
        role: "Comfort lunch",
      },
      {
        slot: "D",
        name: "Beef Kofta Rice & Yogurt Sauce",
        proteinFamily: "BEEF",
        carbType: "RICE",
        texture: "CREAMY",
        digestionLoad: "MEDIUM",
        role: "Recovery dinner",
      },
    ],
  },
  {
    day: "DAY 6",
    type: "RECOVERY",
    label: "Athletic Recovery Flow",
    note: "Oats, sweet potato, and tuna wrap for lighter recovery rhythm.",
    meals: [
      {
        slot: "B",
        name: "Chocolate Protein Oats",
        proteinFamily: "WHEY",
        carbType: "OATS",
        texture: "CREAMY",
        digestionLoad: "MEDIUM",
        role: "Recovery breakfast",
      },
      {
        slot: "L",
        name: "Chicken Fajita & Sweet Potato",
        proteinFamily: "CHICKEN",
        carbType: "POTATO",
        texture: "SOFT",
        digestionLoad: "LOW",
        role: "Low-stress lunch",
      },
      {
        slot: "D",
        name: "Tuna Protein Wrap",
        proteinFamily: "TUNA",
        carbType: "WRAP",
        texture: "CRUNCHY",
        digestionLoad: "LOW",
        role: "Light dinner",
      },
    ],
  },
  {
    day: "DAY 7",
    type: "FRESH_RESET",
    label: "Fresh Reset + Clean Finish",
    note: "Light day with tuna rice and baked fish potato finish.",
    meals: [
      {
        slot: "B",
        name: "G7 Shakshuka Eggs",
        proteinFamily: "EGGS",
        carbType: "BREAD",
        texture: "SAUCY",
        digestionLoad: "LOW",
        role: "Fresh breakfast",
      },
      {
        slot: "L",
        name: "Tuna Tomato Sauce & Basmati Rice",
        proteinFamily: "TUNA",
        carbType: "RICE",
        texture: "SAUCY",
        digestionLoad: "LOW",
        role: "Light lunch",
      },
      {
        slot: "D",
        name: "Oven Baked Fish Lemon Herb & Roasted Potato",
        proteinFamily: "FISH",
        carbType: "POTATO",
        texture: "SOFT",
        digestionLoad: "LOW",
        role: "Clean finish dinner",
      },
    ],
  },
]

export function generateSmartWeek(): SmartDay[] {
  return G7_MASTER_WEEK
}