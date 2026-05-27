import type { G7FlavorId, G7MealType } from "./g7-base-meals"

export type G7FlavorIntensity = "light" | "medium" | "bold"

export type G7FlavorProfile = {
  id: G7FlavorId
  weekLabel: string
  publicName: string
  arabicName: string
  subtitle: string
  description: string
  intensity: G7FlavorIntensity
  bestFor: string[]
  avoidIf: string[]
  sauceSystem: string[]
  spiceSystem: string[]
  garnishSystem: string[]
  mealTypeNotes: Partial<Record<G7MealType, string>>
  aiTags: string[]
}

export const G7_FLAVOR_PROFILES: G7FlavorProfile[] = [
  {
    id: "middle_eastern_performance",
    weekLabel: "Week 1",
    publicName: "Middle Eastern Performance",
    arabicName: "أداء شرقي",
    subtitle: "Warm spices, grilled flavors, yogurt sauces, tahini accents.",
    description:
      "A high-performance Middle Eastern flavor system built around cumin, paprika, garlic, lemon, yogurt, tahini, parsley, and grilled aromas.",
    intensity: "medium",
    bestFor: ["lean_bulk", "fat_loss", "athlete", "diabetic"],
    avoidIf: [],
    sauceSystem: ["light tahini", "garlic yogurt", "lemon yogurt", "tomato cumin sauce"],
    spiceSystem: ["cumin", "paprika", "garlic powder", "black pepper", "sumac"],
    garnishSystem: ["parsley", "pickles", "lemon", "cucumber"],
    mealTypeNotes: {
      breakfast: "Savory or lightly sweet breakfast with Arabic comfort notes.",
      lunch: "Grilled protein bowls with rice, bulgur, or potato.",
      dinner: "Warm recovery meals with controlled sauces.",
    },
    aiTags: ["balanced", "arabic", "gym_friendly", "not_boring", "market_ready"],
  },
  {
    id: "mexican_fire",
    weekLabel: "Week 2",
    publicName: "Mexican Fire",
    arabicName: "مكسيكي حار",
    subtitle: "Chili, lime, salsa, smoky paprika, and fresh bowls.",
    description:
      "A spicy high-energy flavor system for clients who like bold meals, salsa, chili-lime proteins, burrito bowls, and fresh toppings.",
    intensity: "bold",
    bestFor: ["lean_bulk", "athlete", "fat_loss"],
    avoidIf: ["hates_spicy", "sensitive_stomach"],
    sauceSystem: ["salsa", "lime yogurt", "chipotle light sauce", "tomato chili sauce"],
    spiceSystem: ["chili", "smoked paprika", "cumin", "garlic", "lime zest"],
    garnishSystem: ["cilantro", "lettuce", "tomato", "lime", "jalapeno optional"],
    mealTypeNotes: {
      breakfast: "Can become spicy egg plates or sweet cinnamon protein breakfasts.",
      lunch: "Best for bowls, wraps, rice plates, and high-energy training meals.",
      dinner: "Strong for cravings control without breaking macros.",
    },
    aiTags: ["spicy", "bold", "craving_control", "training_day", "fun"],
  },
  {
    id: "asian_soy_ginger",
    weekLabel: "Week 3",
    publicName: "Asian Soy Ginger",
    arabicName: "آسيوي صويا وزنجبيل",
    subtitle: "Soy, ginger, garlic, sesame, stir-fry vegetables, clean umami.",
    description:
      "A clean Asian-inspired profile for stir-fries, rice bowls, noodles, tuna bowls, shrimp meals, and fast high-protein dinners.",
    intensity: "medium",
    bestFor: ["fat_loss", "lean_bulk", "athlete"],
    avoidIf: ["soy_allergy"],
    sauceSystem: ["soy ginger", "light teriyaki", "garlic sesame", "chili soy optional"],
    spiceSystem: ["ginger", "garlic", "white pepper", "chili flakes optional"],
    garnishSystem: ["green onion", "sesame", "cucumber", "lime"],
    mealTypeNotes: {
      breakfast: "Works best for savory rice bowls or light cold bowls.",
      lunch: "Excellent for chicken, shrimp, tuna, and rice performance bowls.",
      dinner: "Best for stir-fry meals with controlled sauces.",
    },
    aiTags: ["umami", "fast", "clean", "stir_fry", "high_protein"],
  },
  {
    id: "italian_lean",
    weekLabel: "Week 4",
    publicName: "Italian Lean",
    arabicName: "إيطالي خفيف",
    subtitle: "Tomato basil, oregano, parmesan accents, lean creamy sauces.",
    description:
      "A comfort-food flavor profile built for pasta, meatballs, chicken plates, tomato sauces, basil, oregano, and controlled creamy meals.",
    intensity: "medium",
    bestFor: ["lean_bulk", "athlete", "fat_loss"],
    avoidIf: ["hates_tomato"],
    sauceSystem: ["tomato basil", "light alfredo", "mushroom cream light", "herb yogurt"],
    spiceSystem: ["oregano", "basil", "garlic", "black pepper", "chili flakes optional"],
    garnishSystem: ["parsley", "basil", "parmesan controlled", "rocket leaves"],
    mealTypeNotes: {
      breakfast: "Works with toast, cottage cheese, tomato, and herbs.",
      lunch: "Great for chicken pasta, meatballs, and tomato-based meals.",
      dinner: "Comfort dinner profile while keeping calories controlled.",
    },
    aiTags: ["comfort_food", "pasta", "creamy", "tomato", "premium"],
  },
  {
    id: "egyptian_home_fit",
    weekLabel: "Week 5",
    publicName: "Egyptian Home Fit",
    arabicName: "مصري بيتي صحي",
    subtitle: "Foul, kofta, shawarma notes, rice plates, cumin, lemon, garlic.",
    description:
      "A local Egyptian-friendly flavor pack designed for affordability, familiarity, high satiety, and realistic home cooking.",
    intensity: "medium",
    bestFor: ["fat_loss", "lean_bulk", "diabetic", "athlete"],
    avoidIf: [],
    sauceSystem: ["garlic yogurt", "light tahini", "tomato cumin", "lemon garlic"],
    spiceSystem: ["cumin", "coriander", "paprika", "garlic", "black pepper"],
    garnishSystem: ["parsley", "pickles", "tomato", "cucumber", "lemon"],
    mealTypeNotes: {
      breakfast: "Strong for foul, eggs, cheese, toast, and savory breakfast plates.",
      lunch: "Affordable chicken, kofta, rice, potato, and vegetable plates.",
      dinner: "Best for shawarma-style, kofta-style, and home-style controlled meals.",
    },
    aiTags: ["egyptian", "budget_friendly", "local_market", "satiety", "real_food"],
  },
  {
    id: "bbq_smoke",
    weekLabel: "Week 6",
    publicName: "BBQ Smoke",
    arabicName: "باربكيو مدخن",
    subtitle: "Smoky paprika, BBQ glaze, grilled plates, steak and chicken energy.",
    description:
      "A bold smoky profile for clients who love grilled food, steak plates, chicken bowls, meatballs, and high-protein comfort meals.",
    intensity: "bold",
    bestFor: ["lean_bulk", "athlete", "fat_loss"],
    avoidIf: ["hates_smoky"],
    sauceSystem: ["light BBQ", "smoky yogurt", "tomato BBQ", "garlic BBQ glaze"],
    spiceSystem: ["smoked paprika", "garlic", "black pepper", "mustard powder", "chili optional"],
    garnishSystem: ["spring onion", "pickles", "lettuce", "grilled onion"],
    mealTypeNotes: {
      breakfast: "Works mainly with savory egg plates and potato skillets.",
      lunch: "Excellent for steak, chicken, turkey, and rice/potato meals.",
      dinner: "Good for comfort meals while staying high-protein.",
    },
    aiTags: ["smoky", "grilled", "comfort_food", "high_protein", "craving_control"],
  },
  {
    id: "indian_spice",
    weekLabel: "Week 7",
    publicName: "Indian Spice",
    arabicName: "هندي متبل",
    subtitle: "Curry spices, yogurt marinades, warm bowls, turmeric and cumin.",
    description:
      "A warm spice profile using curry-style seasoning, yogurt marinades, turmeric, cumin, ginger, and controlled rice-based meals.",
    intensity: "bold",
    bestFor: ["lean_bulk", "athlete", "fat_loss"],
    avoidIf: ["hates_curry", "sensitive_stomach"],
    sauceSystem: ["light curry yogurt", "tomato curry", "ginger yogurt", "spiced tomato sauce"],
    spiceSystem: ["turmeric", "cumin", "coriander", "ginger", "garam masala light"],
    garnishSystem: ["coriander", "cucumber", "lime", "mint yogurt"],
    mealTypeNotes: {
      breakfast: "Use carefully; better for savory plates than sweet breakfasts.",
      lunch: "Strong for chicken, turkey, rice, bulgur, and couscous bowls.",
      dinner: "Good for warm recovery meals with controlled sauce volume.",
    },
    aiTags: ["spiced", "warm", "bold", "rice_bowl", "meal_prep"],
  },
  {
    id: "gulf_clean",
    weekLabel: "Week 8",
    publicName: "Gulf Clean Plates",
    arabicName: "خليجي نظيف",
    subtitle: "Lemon, herbs, grilled seafood, rice plates, clean yogurt sauces.",
    description:
      "A clean Gulf-inspired profile for grilled proteins, seafood, rice plates, yogurt sauces, lemon, herbs, and premium clean eating.",
    intensity: "light",
    bestFor: ["fat_loss", "lean_bulk", "athlete", "gf_df"],
    avoidIf: [],
    sauceSystem: ["lemon herb", "yogurt mint", "garlic lemon", "light tomato herb"],
    spiceSystem: ["cardamom light", "black pepper", "garlic", "cumin light", "lemon zest"],
    garnishSystem: ["mint", "parsley", "cucumber", "lemon", "pickles"],
    mealTypeNotes: {
      breakfast: "Fresh, light, and clean breakfast direction.",
      lunch: "Excellent for fish, shrimp, chicken, rice, and potato plates.",
      dinner: "Clean recovery dinners with light sauces.",
    },
    aiTags: ["clean", "premium", "light", "seafood_friendly", "fresh"],
  },
]

export function getFlavorProfileById(id: G7FlavorId) {
  return G7_FLAVOR_PROFILES.find((profile) => profile.id === id)
}

export function getFlavorProfilesByPlan(planId: string) {
  return G7_FLAVOR_PROFILES.filter((profile) => profile.bestFor.includes(planId))
}

export function getDefaultFlavorProfile() {
  return G7_FLAVOR_PROFILES[0]
}