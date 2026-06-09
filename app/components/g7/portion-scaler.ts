import { PlanKey } from "./plans"

export type RawIngredient = [string, string]

type ScaleRule = {
  names: string[]

  /*
    G7 Gym Core MVP scaling.

    Public plan meaning:
    - shredding      = G7 SHRED   · Fat loss / high protein / lower carbs
    - lean_bulk      = G7 CORE    · Balanced gym plan
    - mass_gainer    = G7 MASS    · Higher calories / higher carbs / muscle gain
    - budget_athlete = G7 FLEX    · Budget flexible gym plan
    - premium_chef   = G7 PREMIUM · Premium chef-style gym plan

    Important:
    These factors are for Gym Plans only.
    No family profiles, no father/mother/child/senior mapping.
  */
  shredding: number
  lean_bulk: number
  mass_gainer: number
  budget_athlete: number
  premium_chef: number
}

const SCALE_RULES: ScaleRule[] = [
  /*
    Main raw proteins.

    Current observed baseline from generated PDFs:
    - CORE at 0.55 gives about 150g raw protein per main meal.
    - MASS at 0.40 gave only about 110g raw protein, which is wrong.
    - Huge factors above 1.0 pushed meals to 280–340g raw, which is also wrong.

    Target:
    - FLEX: about 130g raw protein per main meal
    - CORE: about 150g raw protein per main meal
    - SHRED: about 165g raw protein per main meal
    - MASS: about 180g raw protein per main meal
    - PREMIUM: about 170g raw protein per main meal
  */
  {
    names: [
      "Chicken Breast Raw",
      "Chicken Breast Core Raw",
      "Lean Minced Beef Raw",
      "Lean Beef Core Raw",
      "Fish Fillet Raw",
    ],
    shredding: 0.6,
    lean_bulk: 0.55,
    mass_gainer: 0.65,
    budget_athlete: 0.48,
    premium_chef: 0.62,
  },

  /*
    Gram-based carbs.

    Carbs should carry the main difference between CORE and MASS.
    MASS must be clearly higher than CORE in rice, pasta, oats, potatoes.
  */
  {
    names: [
      "Basmati Rice Raw",
      "Whole Wheat Penne Raw",
      "Pasta Raw",
      "Potato Raw",
      "Sweet Potato Raw",
      "Oats",
    ],
    shredding: 0.75,
    lean_bulk: 0.85,
    mass_gainer: 1.15,
    budget_athlete: 0.8,
    premium_chef: 0.95,
  },

  /*
    Bread / wraps.

    Keep bread and wraps readable.
    We avoid weird outputs and do not aggressively scale unit-based items.
  */
  {
    names: [
      "Whole Wheat Bread",
      "Baladi Bread",
      "Brown Burger Bun",
      "Whole Wheat Tortilla",
    ],
    shredding: 0.85,
    lean_bulk: 0.85,
    mass_gainer: 1,
    budget_athlete: 0.8,
    premium_chef: 0.9,
  },

  /*
    Fast proteins.

    Keep eggs, tuna, whey, and egg whites practical.
    MASS should not explode into too many cans/eggs.
  */
  {
    names: [
      "Tuna in Water",
      "Whey Protein",
      "Egg Whites",
      "Whole Eggs",
      "Whole Egg",
    ],
    shredding: 0.8,
    lean_bulk: 0.75,
    mass_gainer: 0.9,
    budget_athlete: 0.65,
    premium_chef: 0.8,
  },

  /*
    Sauces / fats.

    Sauces should support flavor, not break the macros.
  */
  {
    names: [
      "Light Mozzarella",
      "Cucumber Yogurt Sauce",
      "Light Tahini Sauce",
      "Tomato Sauce",
      "Light Pink Sauce",
      "Light Burger Sauce",
      "Yogurt Sauce",
      "Fajita Sauce",
      "Light Yogurt Sauce",
      "Lemon Herb Marinade",
      "Healthy Fat Source",
    ],
    shredding: 0.7,
    lean_bulk: 0.75,
    mass_gainer: 0.9,
    budget_athlete: 0.65,
    premium_chef: 0.85,
  },

  /*
    Vegetables.

    Vegetables stay mostly stable and practical.
  */
  {
    names: [
      "Tomato & Cucumber",
      "Green Salad",
      "Green Pepper",
      "Bell Pepper",
      "Green Pepper & Coriander",
      "Mushroom or Pepper",
      "Mushroom & Pepper",
      "Lettuce & Tomato",
      "Colored Peppers & Red Onion",
      "Parsley",
      "Pickles",
    ],
    shredding: 0.95,
    lean_bulk: 0.9,
    mass_gainer: 0.95,
    budget_athlete: 0.85,
    premium_chef: 1,
  },
]

function getScaleFactor(name: string, planId: PlanKey) {
  const rule = SCALE_RULES.find((item) => item.names.includes(name))

  if (!rule) return 1

  if (planId === "shredding") return rule.shredding
  if (planId === "lean_bulk") return rule.lean_bulk
  if (planId === "mass_gainer") return rule.mass_gainer
  if (planId === "budget_athlete") return rule.budget_athlete
  if (planId === "premium_chef") return rule.premium_chef

  return 1
}

function roundScaledGramValue(value: number) {
  if (value <= 15) return Math.max(5, Math.round(value))
  if (value <= 80) return Math.round(value / 5) * 5
  return Math.round(value / 10) * 10
}

function scaleGrams(amount: string, factor: number) {
  const match = amount.match(/([\d.]+)\s*g/i)

  if (!match) return amount

  const value = Number(match[1])
  const scaled = roundScaledGramValue(value * factor)

  return amount.replace(/([\d.]+)\s*g/i, `${scaled}g`)
}

function scaleEggs(amount: string, factor: number) {
  const match = amount.match(/([\d.]+)\s*egg/i)

  if (!match) return amount

  const value = Number(match[1])
  const scaled = Math.max(1, Math.round(value * factor))

  return amount.replace(/([\d.]+)\s*egg/i, `${scaled} eggs`)
}

function scaleScoops(amount: string, factor: number) {
  const match = amount.match(/([\d.]+)\s*scoop/i)

  if (!match) return amount

  const value = Number(match[1])
  const scaled = Math.max(1, Math.round(value * factor))

  return amount.replace(/([\d.]+)\s*scoop/i, `${scaled} scoop`)
}

function scaleCans(amount: string, factor: number) {
  const match = amount.match(/([\d.]+)\s*can/i)

  if (!match) return amount

  const value = Number(match[1])
  const scaled = Math.max(1, Math.round(value * factor))

  return amount.replace(/([\d.]+)\s*can/i, `${scaled} cans`)
}

function scaleUnitAmount(amount: string, factor: number) {
  /*
    Keep pure unit outputs stable.

    This avoids confusing PDF outputs like:
    "2 medium wraps + 41g + 24g"

    We only scale gram values, eggs, scoops, and cans.
    Bread/wrap units stay readable for the customer.
  */

  if (amount.includes("1 slice")) {
    return amount
  }

  if (amount.includes("1 bun")) {
    return amount
  }

  if (amount.includes("1 medium loaf")) {
    return amount
  }

  if (amount.includes("1 large loaf")) {
    return amount
  }

  if (amount.includes("2 medium wraps")) {
    return amount
  }

  if (amount.includes("1 medium wrap")) {
    return amount
  }

  return amount
}

function scaleAmount(amount: string, factor: number) {
  let scaled = amount

  scaled = scaleGrams(scaled, factor)
  scaled = scaleEggs(scaled, factor)
  scaled = scaleScoops(scaled, factor)
  scaled = scaleCans(scaled, factor)
  scaled = scaleUnitAmount(scaled, factor)

  return scaled
}

export function scaleRawIngredientsForPlan(
  raw: RawIngredient[],
  planId: PlanKey
): RawIngredient[] {
  return raw.map(([name, amount]) => {
    const factor = getScaleFactor(name, planId)

    return [name, scaleAmount(amount, factor)]
  })
}