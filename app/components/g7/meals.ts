import { PlanKey } from "./plans"

export type MealRole =
  | "BREAKFAST"
  | "LUNCH"
  | "DINNER"

export type MealStep = {
  title: string
  body: string
  image: string
}

export type Meal = {
  day: string
  role: MealRole

  title: string
  subtitle: string

  mealPurpose: string

  kcal: number
  protein: number
  carbs: number
  fat: number
  fiber: number

  hero: string

  raw: [string, string][]
  cooked: [string, string][]

  steps: MealStep[]
}

export const LEAN_BULK_MEALS: Meal[] = [
  {
    day: "Day 1",

    role: "BREAKFAST",

    title: "Protein Oats Power Bowl",
    subtitle: "Lean Muscle Breakfast",

    mealPurpose:
      "High protein breakfast for stable energy and muscle recovery.",

    kcal: 540,
    protein: 42,
    carbs: 48,
    fat: 14,
    fiber: 9,

    hero: "",

    raw: [
      ["Oats", "80g"],
      ["Whey Protein", "1 scoop"],
      ["Banana", "120g"],
      ["Peanut Butter", "15g"],
    ],

    cooked: [["Prepared Bowl", "1 serving"]],

    steps: [
      {
        title: "Prepare Oats",
        body:
          "Add oats and milk into a saucepan and cook on medium heat for 4–5 minutes until creamy.",
        image: "",
      },

      {
        title: "Add Protein",
        body:
          "Remove from heat, add whey protein slowly and mix well to avoid clumps.",
        image: "",
      },

      {
        title: "Final Toppings",
        body:
          "Top with sliced banana and peanut butter before serving.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "LUNCH",

    title: "Chicken Rice Performance Bowl",
    subtitle: "Athlete Lunch System",

    mealPurpose:
      "Balanced lunch for performance and lean muscle support.",

    kcal: 690,
    protein: 58,
    carbs: 65,
    fat: 16,
    fiber: 8,

    hero: "",

    raw: [
      ["Chicken Breast", "250g"],
      ["Rice", "90g raw"],
      ["Olive Oil", "10g"],
      ["Mixed Vegetables", "150g"],
    ],

    cooked: [["Cooked Chicken", "180g"]],

    steps: [
      {
        title: "Season Chicken",
        body:
          "Season chicken with salt, pepper, paprika, and garlic powder.",
        image: "",
      },

      {
        title: "Cook Rice",
        body:
          "Boil rice until fluffy and fully cooked.",
        image: "",
      },

      {
        title: "Final Assembly",
        body:
          "Serve chicken over rice with vegetables and olive oil drizzle.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "DINNER",

    title: "Beef Pasta Recovery Plate",
    subtitle: "Recovery Dinner",

    mealPurpose:
      "Night recovery meal with quality protein and carbs.",

    kcal: 760,
    protein: 60,
    carbs: 72,
    fat: 18,
    fiber: 10,

    hero: "",

    raw: [
      ["Lean Beef", "220g"],
      ["Pasta", "100g raw"],
      ["Tomato Sauce", "120g"],
      ["Parmesan", "15g"],
    ],

    cooked: [["Cooked Pasta", "280g"]],

    steps: [
      {
        title: "Cook Pasta",
        body:
          "Boil pasta in salted water until al dente.",
        image: "",
      },

      {
        title: "Prepare Beef Sauce",
        body:
          "Cook beef with tomato sauce and seasonings until rich and thick.",
        image: "",
      },

      {
        title: "Plate Meal",
        body:
          "Serve pasta with beef sauce and parmesan topping.",
        image: "",
      },
    ],
  },
]

export const SHREDDING_MEALS: Meal[] = [
  {
    day: "Day 1",

    role: "BREAKFAST",

    title: "Egg White Cutting Plate",
    subtitle: "Low Calorie High Protein",

    mealPurpose:
      "High protein breakfast with controlled calories.",

    kcal: 360,
    protein: 42,
    carbs: 24,
    fat: 8,
    fiber: 6,

    hero: "",

    raw: [
      ["Egg Whites", "250g"],
      ["Whole Egg", "1"],
      ["Baladi Bread", "50g"],
      ["Cucumber + Lettuce", "150g"],
    ],

    cooked: [["Egg Plate", "1 serving"]],

    steps: [
      {
        title: "Prepare Eggs",
        body:
          "Cook egg whites and whole egg on medium heat using nonstick pan.",
        image: "",
      },

      {
        title: "Prepare Salad",
        body:
          "Slice cucumber and lettuce and prepare fresh side salad.",
        image: "",
      },

      {
        title: "Serve Plate",
        body:
          "Serve eggs with baladi bread and salad.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "LUNCH",

    title: "Grilled Chicken Potato Box",
    subtitle: "Cutting Lunch",

    mealPurpose:
      "Lean protein with controlled carbs for fat loss.",

    kcal: 520,
    protein: 58,
    carbs: 42,
    fat: 8,
    fiber: 7,

    hero: "",

    raw: [
      ["Chicken Breast", "250g"],
      ["Potato", "250g raw"],
      ["Yogurt Sauce", "60g"],
      ["Green Salad", "150g"],
    ],

    cooked: [["Cooked Chicken", "180g"]],

    steps: [
      {
        title: "Season Chicken",
        body:
          "Season chicken using paprika, garlic, salt, and black pepper.",
        image: "",
      },

      {
        title: "Cook Potatoes",
        body:
          "Bake or air fry potatoes until golden.",
        image: "",
      },

      {
        title: "Serve Meal",
        body:
          "Plate chicken with potatoes and yogurt sauce.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "DINNER",

    title: "Tuna Yogurt Salad Bowl",
    subtitle: "Light Recovery Dinner",

    mealPurpose:
      "Light dinner for satiety and recovery.",

    kcal: 420,
    protein: 48,
    carbs: 28,
    fat: 10,
    fiber: 8,

    hero: "",

    raw: [
      ["Tuna in Water", "160g"],
      ["Greek Yogurt", "100g"],
      ["Corn", "50g"],
      ["Mixed Salad", "200g"],
    ],

    cooked: [["Tuna Salad", "1 bowl"]],

    steps: [
      {
        title: "Prepare Salad",
        body:
          "Wash and prepare mixed salad vegetables.",
        image: "",
      },

      {
        title: "Mix Dressing",
        body:
          "Combine yogurt with seasoning and lemon juice.",
        image: "",
      },

      {
        title: "Assemble Bowl",
        body:
          "Add tuna, salad, corn, and dressing into serving bowl.",
        image: "",
      },
    ],
  },
]

export const MASS_GAINER_MEALS: Meal[] = [
  {
    day: "Day 1",

    role: "BREAKFAST",

    title: "Mass Gainer Oats Shake",
    subtitle: "High Calorie Breakfast",

    mealPurpose:
      "Easy calories for muscle gain.",

    kcal: 780,
    protein: 55,
    carbs: 95,
    fat: 20,
    fiber: 10,

    hero: "",

    raw: [
      ["Oats", "100g"],
      ["Milk", "300ml"],
      ["Banana", "150g"],
      ["Peanut Butter", "25g"],
    ],

    cooked: [["Shake", "1 large serving"]],

    steps: [
      {
        title: "Blend Ingredients",
        body:
          "Add all ingredients into blender and blend until smooth.",
        image: "",
      },

      {
        title: "Adjust Texture",
        body:
          "Add ice or milk based on preferred consistency.",
        image: "",
      },

      {
        title: "Serve Shake",
        body:
          "Serve immediately for best flavor and texture.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "LUNCH",

    title: "Beef Rice Mass Bowl",
    subtitle: "Heavy Muscle Lunch",

    mealPurpose:
      "High calorie protein and carb meal.",

    kcal: 950,
    protein: 70,
    carbs: 105,
    fat: 24,
    fiber: 8,

    hero: "",

    raw: [
      ["Lean Beef", "280g"],
      ["Rice", "130g raw"],
      ["Olive Oil", "15g"],
      ["Vegetables", "120g"],
    ],

    cooked: [["Beef Rice Bowl", "1 serving"]],

    steps: [
      {
        title: "Cook Beef",
        body:
          "Cook beef on high heat until caramelized and juicy.",
        image: "",
      },

      {
        title: "Prepare Rice",
        body:
          "Cook rice until fluffy and fully expanded.",
        image: "",
      },

      {
        title: "Build Bowl",
        body:
          "Serve beef over rice with vegetables and olive oil.",
        image: "",
      },
    ],
  },

  {
    day: "Day 1",

    role: "DINNER",

    title: "Chicken Pasta Bulk Plate",
    subtitle: "Bulk Dinner",

    mealPurpose:
      "High carb dinner for recovery and growth.",

    kcal: 900,
    protein: 68,
    carbs: 110,
    fat: 18,
    fiber: 9,

    hero: "",

    raw: [
      ["Chicken Breast", "280g"],
      ["Pasta", "130g raw"],
      ["Tomato Sauce", "150g"],
      ["Cheese", "20g"],
    ],

    cooked: [["Chicken Pasta", "1 serving"]],

    steps: [
      {
        title: "Boil Pasta",
        body:
          "Cook pasta until soft but still slightly firm.",
        image: "",
      },

      {
        title: "Cook Chicken",
        body:
          "Season and grill chicken until fully cooked.",
        image: "",
      },

      {
        title: "Final Plating",
        body:
          "Combine pasta, sauce, chicken, and cheese before serving.",
        image: "",
      },
    ],
  },
]

export function getMealsForPlan(planId: PlanKey): Meal[] {
  if (planId === "shredding") return SHREDDING_MEALS

  if (planId === "mass_gainer") return MASS_GAINER_MEALS

  return LEAN_BULK_MEALS
}