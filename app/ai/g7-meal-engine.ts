import { G7Plan } from "./g7-plans"
import { runAutonomousSystem } from "./g7-autonomous-engine"

export type G7Flavor =
  | "Chef Signature"
  | "Mediterranean"
  | "Asian Fusion"
  | "Mexican"
  | "Middle Eastern"
  | "Italian"
  | "American"

export type G7KitchenOS = {
  costPerMeal: string
  shelfLife: string
  reheatMethod: string
  prepContainers: string
  kitchenStation: string
  batchPrepNote: string
  productionMode: string
  storageNote: string
}

export type G7RecipeOutput = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  steps: string[]
  sauce: string
  kitchenNote: string
  aiDescription: string
  chefVoice: string
  systemMood: string
  repeatabilityReason: string
  executionPromise: string
  kitchenOS: G7KitchenOS
}

const PLAN_LABELS: Record<G7Plan, string> = {
  fat_loss: "Fat Loss",
  keto: "Keto",
  vegan: "Vegan",
  diabetic: "Diabetic",
  athlete: "Athlete",
  gf_df: "GF & DF",
  carnivore: "Carnivore",
}

const PLAN_CHEF_IDENTITY: Record<G7Plan, string> = {
  fat_loss: "Lean Metabolic",
  keto: "Low-Carb Focus",
  vegan: "Plant Power",
  diabetic: "Balanced Energy",
  athlete: "Performance Fuel",
  gf_df: "Clean Comfort",
  carnivore: "Primal Protein",
}

const PLAN_PERSONALITY: Record<
  G7Plan,
  {
    mood: string
    voice: string
    aiDescription: string
    repeatabilityReason: string
    executionPromise: string
  }
> = {
  fat_loss: {
    mood: "Metabolic Clarity",
    voice: "Lean, clean, controlled.",
    aiDescription:
      "A high-satiety fat loss structure built to keep meals light, repeatable, and satisfying without feeling restrictive.",
    repeatabilityReason:
      "Simple ingredients, measured sauce, and controlled carbs make this easy to repeat across the week.",
    executionPromise:
      "Designed for portion control, clean prep, and consistent energy.",
  },
  keto: {
    mood: "Low-Carb Focus",
    voice: "Rich, stable, sharp.",
    aiDescription:
      "A low-carb chef system focused on flavor density, stable energy, and satisfying fat-based structure.",
    repeatabilityReason:
      "The meal uses strong flavor and simple low-carb bases so it feels rich without needing high carbs.",
    executionPromise:
      "Designed for low-carb execution with high satisfaction.",
  },
  vegan: {
    mood: "Plant Creativity",
    voice: "Fresh, colorful, creative.",
    aiDescription:
      "A plant-powered culinary system built around color, fiber, texture, and satisfying flavor contrast.",
    repeatabilityReason:
      "Flexible plant proteins, grains, vegetables, and sauce logic make the system easy to adapt.",
    executionPromise:
      "Designed for plant-based cooking with strong flavor identity.",
  },
  diabetic: {
    mood: "Balanced Energy",
    voice: "Smart, steady, controlled.",
    aiDescription:
      "A controlled-energy meal system designed around steady carbs, lean protein, and balanced plate architecture.",
    repeatabilityReason:
      "Measured carbs, clean protein, and light sauce help keep the meal predictable and repeatable.",
    executionPromise:
      "Designed for steady energy and smarter portion control.",
  },
  athlete: {
    mood: "Performance Fuel",
    voice: "Power, recovery, output.",
    aiDescription:
      "A performance-focused meal structure built for training output, recovery, protein delivery, and usable energy.",
    repeatabilityReason:
      "High protein, structured carbs, and clear prep logic make it reliable for training days.",
    executionPromise:
      "Designed for recovery, strength, and daily performance.",
  },
  gf_df: {
    mood: "Clean Comfort",
    voice: "Light, clean, digestive.",
    aiDescription:
      "A gluten-free and dairy-free comfort system built to feel clean, practical, and easy to digest.",
    repeatabilityReason:
      "Simple clean bases and dairy-free sauce logic keep the meal practical and comfortable.",
    executionPromise:
      "Designed for clean comfort without gluten or dairy.",
  },
  carnivore: {
    mood: "Primal Protein",
    voice: "Fire, protein, primal.",
    aiDescription:
      "A protein-first primal meal system built around animal-based structure, deep flavor, and aggressive satiety.",
    repeatabilityReason:
      "Protein-first ingredients and minimal complexity make it extremely repeatable.",
    executionPromise:
      "Designed for primal protein execution and maximum satiety.",
  },
}

const KITCHEN_OS: Record<G7Plan, G7KitchenOS> = {
  fat_loss: {
    costPerMeal: "$3.60–$4.40",
    shelfLife: "3 days chilled",
    reheatMethod: "Microwave 90 sec or pan reheat",
    prepContainers: "1 main container + 1 sauce cup",
    kitchenStation: "Grill + veg station",
    batchPrepNote: "Batch grill protein and keep sauce separate until serving.",
    productionMode: "Lean Meal Prep",
    storageNote: "Keep vegetables slightly undercooked for better reheating.",
  },
  keto: {
    costPerMeal: "$4.20–$5.20",
    shelfLife: "2–3 days chilled",
    reheatMethod: "Pan reheat preferred",
    prepContainers: "1 low-carb container + 1 fat sauce cup",
    kitchenStation: "Protein + cold garnish station",
    batchPrepNote: "Cook protein fresh where possible and add avocado after heating.",
    productionMode: "Low-Carb Production",
    storageNote: "Store fresh fats and greens separately from hot protein.",
  },
  vegan: {
    costPerMeal: "$3.20–$4.10",
    shelfLife: "3 days chilled",
    reheatMethod: "Microwave 75 sec or serve warm",
    prepContainers: "1 bowl container + 1 sauce cup",
    kitchenStation: "Plant protein + grain station",
    batchPrepNote: "Batch grains and legumes, then finish with fresh herbs.",
    productionMode: "Plant-Based Prep",
    storageNote: "Keep herbs and sauce separate to protect freshness.",
  },
  diabetic: {
    costPerMeal: "$3.80–$4.80",
    shelfLife: "3 days chilled",
    reheatMethod: "Microwave 90 sec",
    prepContainers: "1 controlled portion container + 1 sauce cup",
    kitchenStation: "Portion control station",
    batchPrepNote: "Use fixed carb portions and label each container clearly.",
    productionMode: "Controlled Energy Prep",
    storageNote: "Keep carb weight consistent across all portions.",
  },
  athlete: {
    costPerMeal: "$4.80–$6.20",
    shelfLife: "4 days chilled",
    reheatMethod: "Microwave 120 sec or pan reheat",
    prepContainers: "1 large meal container + 1 sauce cup",
    kitchenStation: "High-volume protein + carb station",
    batchPrepNote: "Batch cook carbs and proteins in larger production cycles.",
    productionMode: "Performance Batch Prep",
    storageNote: "Separate sauce to keep carbs from becoming soggy.",
  },
  gf_df: {
    costPerMeal: "$4.00–$5.10",
    shelfLife: "3 days chilled",
    reheatMethod: "Microwave 90 sec",
    prepContainers: "1 allergen-safe container + 1 sauce cup",
    kitchenStation: "Clean allergen-safe station",
    batchPrepNote: "Avoid cross-contact with gluten or dairy ingredients.",
    productionMode: "Clean Comfort Prep",
    storageNote: "Label GF/DF clearly before storage.",
  },
  carnivore: {
    costPerMeal: "$5.80–$7.50",
    shelfLife: "2–3 days chilled",
    reheatMethod: "Pan reheat or air fryer 3 min",
    prepContainers: "1 protein container + 1 jus cup",
    kitchenStation: "Protein grill station",
    batchPrepNote: "Cook proteins in batches and rest before packing.",
    productionMode: "Primal Protein Prep",
    storageNote: "Keep jus or broth glaze separate until reheating.",
  },
}

const FLAVOR_STYLE: Record<G7Flavor, string> = {
  "Chef Signature": "Signature",
  Mediterranean: "Mediterranean",
  "Asian Fusion": "Asian Fusion",
  Mexican: "Mexican",
  "Middle Eastern": "Middle Eastern",
  Italian: "Italian",
  American: "American",
}

const FLAVOR_PERSONALITY: Record<
  G7Flavor,
  {
    mood: string
    language: string
  }
> = {
  "Chef Signature": {
    mood: "Balanced Chef Logic",
    language:
      "balanced acidity, clean finish, and flexible chef-style repeatability",
  },
  Mediterranean: {
    mood: "Fresh Coastal",
    language:
      "lemon, herbs, olive oil, freshness, and bright Mediterranean energy",
  },
  "Asian Fusion": {
    mood: "Bold Umami",
    language:
      "ginger, garlic, soy-style depth, umami, and light aromatic sweetness",
  },
  Mexican: {
    mood: "Smoky Bright",
    language:
      "smoked paprika, lime, tomato, chili warmth, and bright salsa-style energy",
  },
  "Middle Eastern": {
    mood: "Deep Aromatic",
    language:
      "tahini, garlic, cumin, lemon, herbs, and warm Middle Eastern depth",
  },
  Italian: {
    mood: "Classic Comfort",
    language:
      "tomato, basil, oregano, garlic, olive oil, and comforting Italian aroma",
  },
  American: {
    mood: "Smoky Comfort",
    language:
      "smoky mustard, BBQ-style aroma, clean acidity, and comfort-food familiarity",
  },
}

const INGREDIENT_BANK: Record<G7Plan, Record<G7Flavor, string[]>> = {
  fat_loss: {
    "Chef Signature": [
      "Chicken breast — 180g",
      "Steamed rice — 120g",
      "Broccoli — 80g",
      "Zucchini — 70g",
      "Light yogurt sauce — 35g",
    ],
    Mediterranean: [
      "Chicken breast — 180g",
      "Quinoa — 115g",
      "Cucumber — 70g",
      "Tomato — 70g",
      "Lemon herb yogurt — 35g",
    ],
    "Asian Fusion": [
      "Chicken breast — 180g",
      "Jasmine rice — 115g",
      "Green beans — 80g",
      "Cabbage — 70g",
      "Ginger garlic glaze — 30g",
    ],
    Mexican: [
      "Chicken breast — 180g",
      "Brown rice — 115g",
      "Bell peppers — 80g",
      "Corn salsa — 50g",
      "Smoked lime sauce — 30g",
    ],
    "Middle Eastern": [
      "Chicken breast — 180g",
      "Bulgur — 110g",
      "Cucumber — 70g",
      "Parsley salad — 50g",
      "Garlic tahini light sauce — 30g",
    ],
    Italian: [
      "Chicken breast — 180g",
      "Tomato basil rice — 115g",
      "Zucchini — 80g",
      "Spinach — 50g",
      "Oregano tomato sauce — 35g",
    ],
    American: [
      "Grilled chicken — 180g",
      "Sweet potato — 130g",
      "Broccoli — 80g",
      "Pickled cucumber — 40g",
      "Light smoky mustard — 30g",
    ],
  },

  keto: {
    "Chef Signature": [
      "Grilled chicken thigh — 170g",
      "Avocado — 80g",
      "Cauliflower rice — 140g",
      "Spinach — 60g",
      "Olive oil dressing — 25g",
    ],
    Mediterranean: [
      "Salmon — 160g",
      "Avocado — 75g",
      "Greek salad — 120g",
      "Zucchini — 90g",
      "Lemon olive oil sauce — 25g",
    ],
    "Asian Fusion": [
      "Beef strips — 165g",
      "Cabbage — 120g",
      "Mushrooms — 80g",
      "Sesame cucumber — 60g",
      "Soy ginger glaze — 25g",
    ],
    Mexican: [
      "Chicken thigh — 170g",
      "Avocado — 80g",
      "Cauliflower rice — 140g",
      "Cheddar — 25g",
      "Chipotle lime sauce — 25g",
    ],
    "Middle Eastern": [
      "Beef kofta — 170g",
      "Cauliflower tabbouleh — 130g",
      "Cucumber — 70g",
      "Tahini — 25g",
      "Garlic cumin sauce — 25g",
    ],
    Italian: [
      "Chicken thigh — 170g",
      "Zucchini noodles — 160g",
      "Spinach — 60g",
      "Parmesan — 20g",
      "Creamy tomato basil sauce — 30g",
    ],
    American: [
      "Beef patty — 170g",
      "Egg — 55g",
      "Avocado — 70g",
      "Lettuce — 60g",
      "Smoky mustard mayo — 25g",
    ],
  },

  vegan: {
    "Chef Signature": [
      "Tofu — 180g",
      "Quinoa — 130g",
      "Roasted chickpeas — 70g",
      "Bell peppers — 80g",
      "Tahini lemon sauce — 35g",
    ],
    Mediterranean: [
      "Chickpeas — 140g",
      "Quinoa — 130g",
      "Cucumber — 70g",
      "Tomato — 70g",
      "Lemon tahini sauce — 35g",
    ],
    "Asian Fusion": [
      "Tofu — 180g",
      "Rice noodles — 120g",
      "Cabbage — 80g",
      "Carrots — 60g",
      "Sesame ginger sauce — 30g",
    ],
    Mexican: [
      "Black beans — 140g",
      "Brown rice — 125g",
      "Corn — 60g",
      "Avocado — 60g",
      "Smoked tomato salsa — 35g",
    ],
    "Middle Eastern": [
      "Falafel tofu — 170g",
      "Bulgur — 125g",
      "Parsley — 35g",
      "Cucumber — 70g",
      "Tahini cumin sauce — 35g",
    ],
    Italian: [
      "Tofu — 180g",
      "Tomato lentil sauce — 130g",
      "Zucchini — 90g",
      "Basil — 10g",
      "Olive oil herb sauce — 25g",
    ],
    American: [
      "Vegan patty — 160g",
      "Sweet potato — 140g",
      "Slaw — 80g",
      "Pickles — 35g",
      "Light BBQ sauce — 30g",
    ],
  },

  diabetic: {
    "Chef Signature": [
      "Grilled salmon — 150g",
      "Brown rice — 100g",
      "Green beans — 90g",
      "Cucumber — 70g",
      "Herb yogurt sauce — 30g",
    ],
    Mediterranean: [
      "Grilled fish — 160g",
      "Lentil rice — 110g",
      "Cucumber — 70g",
      "Tomato — 60g",
      "Lemon herb sauce — 30g",
    ],
    "Asian Fusion": [
      "Chicken breast — 170g",
      "Brown rice — 105g",
      "Broccoli — 90g",
      "Cabbage — 70g",
      "Low-sugar ginger sauce — 25g",
    ],
    Mexican: [
      "Turkey strips — 170g",
      "Beans — 100g",
      "Bell peppers — 80g",
      "Lettuce — 60g",
      "Lime salsa — 30g",
    ],
    "Middle Eastern": [
      "Chicken kofta — 170g",
      "Bulgur — 105g",
      "Cucumber — 70g",
      "Mint — 10g",
      "Garlic yogurt sauce — 30g",
    ],
    Italian: [
      "Turkey breast — 170g",
      "Whole grain pasta — 105g",
      "Zucchini — 80g",
      "Tomato — 70g",
      "Basil sauce — 30g",
    ],
    American: [
      "Grilled turkey — 170g",
      "Sweet potato — 115g",
      "Green beans — 90g",
      "Slaw — 60g",
      "Light mustard sauce — 30g",
    ],
  },

  athlete: {
    "Chef Signature": [
      "Chicken breast — 220g",
      "Sweet potato — 180g",
      "Rice — 150g",
      "Mixed vegetables — 100g",
      "Performance herb sauce — 40g",
    ],
    Mediterranean: [
      "Chicken breast — 220g",
      "Rice — 160g",
      "Chickpeas — 80g",
      "Greek salad — 100g",
      "Lemon olive oil sauce — 35g",
    ],
    "Asian Fusion": [
      "Beef strips — 210g",
      "Jasmine rice — 170g",
      "Edamame — 80g",
      "Broccoli — 90g",
      "Soy ginger glaze — 35g",
    ],
    Mexican: [
      "Chicken breast — 220g",
      "Rice — 160g",
      "Black beans — 90g",
      "Corn salsa — 70g",
      "Chipotle lime sauce — 35g",
    ],
    "Middle Eastern": [
      "Beef kofta — 210g",
      "Rice — 160g",
      "Lentils — 80g",
      "Cucumber salad — 90g",
      "Garlic tahini sauce — 35g",
    ],
    Italian: [
      "Chicken breast — 220g",
      "Pasta — 170g",
      "Tomato sauce — 80g",
      "Spinach — 60g",
      "Basil parmesan sauce — 35g",
    ],
    American: [
      "Turkey burger — 210g",
      "Sweet potato — 180g",
      "Rice — 140g",
      "Slaw — 80g",
      "Smoky BBQ sauce — 35g",
    ],
  },

  gf_df: {
    "Chef Signature": [
      "Turkey breast — 180g",
      "Quinoa — 125g",
      "Roasted vegetables — 100g",
      "Avocado — 60g",
      "Dairy-free herb sauce — 30g",
    ],
    Mediterranean: [
      "Chicken breast — 180g",
      "Quinoa — 125g",
      "Cucumber — 70g",
      "Olives — 20g",
      "Lemon herb olive oil — 25g",
    ],
    "Asian Fusion": [
      "Salmon — 160g",
      "Rice — 120g",
      "Cabbage — 80g",
      "Carrots — 60g",
      "Gluten-free tamari ginger sauce — 30g",
    ],
    Mexican: [
      "Turkey breast — 180g",
      "Rice — 120g",
      "Black beans — 80g",
      "Avocado — 60g",
      "Tomato lime salsa — 30g",
    ],
    "Middle Eastern": [
      "Chicken kofta — 180g",
      "Rice — 120g",
      "Cucumber — 70g",
      "Parsley — 30g",
      "Tahini lemon sauce — 30g",
    ],
    Italian: [
      "Turkey breast — 180g",
      "Gluten-free pasta — 125g",
      "Tomato — 70g",
      "Zucchini — 80g",
      "Basil olive oil sauce — 25g",
    ],
    American: [
      "Grilled chicken — 180g",
      "Potato wedges — 130g",
      "Slaw — 80g",
      "Pickles — 35g",
      "Dairy-free smoky sauce — 30g",
    ],
  },

  carnivore: {
    "Chef Signature": [
      "Beef steak — 220g",
      "Eggs — 110g",
      "Chicken thigh — 140g",
      "Bone broth glaze — 40g",
      "Sea salt — 2g",
    ],
    Mediterranean: [
      "Lamb chops — 220g",
      "Eggs — 110g",
      "Beef mince — 120g",
      "Bone broth — 50g",
      "Rosemary salt — 2g",
    ],
    "Asian Fusion": [
      "Beef strips — 220g",
      "Eggs — 110g",
      "Chicken thigh — 140g",
      "Bone broth glaze — 40g",
      "Ginger salt — 2g",
    ],
    Mexican: [
      "Beef steak — 220g",
      "Eggs — 110g",
      "Chicken thigh — 140g",
      "Smoked salt — 2g",
      "Bone broth jus — 40g",
    ],
    "Middle Eastern": [
      "Lamb kofta — 220g",
      "Eggs — 110g",
      "Beef steak — 140g",
      "Cumin salt — 2g",
      "Bone broth reduction — 40g",
    ],
    Italian: [
      "Beef steak — 220g",
      "Eggs — 110g",
      "Chicken thigh — 140g",
      "Parmesan crisp — 20g",
      "Oregano salt — 2g",
    ],
    American: [
      "Beef patty — 220g",
      "Eggs — 110g",
      "Chicken thigh — 140g",
      "Smoked salt — 2g",
      "Bone broth glaze — 40g",
    ],
  },
}

const SAUCE_BANK: Record<G7Flavor, string> = {
  "Chef Signature":
    "G7 signature sauce with balanced acidity, clean finish, and chef-style repeatability.",
  Mediterranean:
    "Lemon, herbs, olive oil, and light acidity for a fresh Mediterranean finish.",
  "Asian Fusion":
    "Ginger, garlic, soy-style depth, and light sweetness for bold Asian fusion balance.",
  Mexican:
    "Smoked paprika, lime, tomato, and chili warmth for a bright Mexican flavor mood.",
  "Middle Eastern":
    "Tahini, garlic, cumin, lemon, and herbs for a deep Middle Eastern profile.",
  Italian:
    "Tomato, basil, oregano, garlic, and olive oil for a classic Italian comfort profile.",
  American:
    "Light smoky mustard, BBQ-style aroma, and clean acidity for an American comfort finish.",
}

export const G7_FLAVORS: G7Flavor[] = [
  "Chef Signature",
  "Mediterranean",
  "Asian Fusion",
  "Mexican",
  "Middle Eastern",
  "Italian",
  "American",
]

export function generateG7Meal(plan: G7Plan, flavor: G7Flavor): G7RecipeOutput {
  const result = runAutonomousSystem(plan)
  const baseMeal = result.meal

  const planLabel = PLAN_LABELS[plan]
  const identity = PLAN_CHEF_IDENTITY[plan]
  const planPersonality = PLAN_PERSONALITY[plan]
  const flavorStyle = FLAVOR_STYLE[flavor]
  const flavorPersonality = FLAVOR_PERSONALITY[flavor]
  const sauce = SAUCE_BANK[flavor]
  const kitchenOS = KITCHEN_OS[plan]

  return {
    ...baseMeal,
    name: `${flavorStyle} ${identity} Bowl`,
    ingredients: INGREDIENT_BANK[plan][flavor],
    sauce,

    aiDescription: `${planPersonality.aiDescription} The flavor direction is ${flavorPersonality.mood}, built with ${flavorPersonality.language}.`,

    chefVoice: planPersonality.voice,

    systemMood: `${planPersonality.mood} × ${flavorPersonality.mood}`,

    repeatabilityReason: planPersonality.repeatabilityReason,

    executionPromise: planPersonality.executionPromise,

    kitchenOS,

    kitchenNote: `${planLabel} system designed with ${flavorStyle} flavor direction. ${planPersonality.executionPromise} ${kitchenOS.batchPrepNote}`,

    steps: [
      "Prepare and weigh all ingredients before cooking.",
      "Cook the main protein separately to keep texture and portion control consistent.",
      "Prepare the carb, vegetable, or low-carb base according to the selected nutrition system.",
      `Finish the meal with measured sauce: ${sauce}`,
      `Pack using: ${kitchenOS.prepContainers}.`,
      `Storage: ${kitchenOS.storageNote}`,
    ],
  }
}

export function getPlanLabel(plan: G7Plan) {
  return PLAN_LABELS[plan]
}