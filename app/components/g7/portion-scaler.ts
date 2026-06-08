import { PlanKey } from "./plans"

export type RawIngredient = [string, string]

type ScaleRule = {
  names: string[]

  /*
    Current temporary client mapping:
    - shredding = Father 46 · Balanced Shred
    - lean_bulk = Mother 34 · Classic Light
    - budget_athlete = Child 11 · Balanced Junior
    - premium_chef = Grandfather 65 · Classic Senior
    - mass_gainer = Grandmother 75 · Senior Light

    Important:
    These factors are not public plan names.
    They are internal scaling controls until we build a true client-profile engine.
  */
  shredding: number
  lean_bulk: number
  mass_gainer: number
  budget_athlete: number
  premium_chef: number
}

const SCALE_RULES: ScaleRule[] = [
  /*
    Main cooked proteins.
    These were the reason portions became too large.
    Example before:
    Mother/lean_bulk was using 1.15, which pushed chicken/beef portions to ~322g raw.
    Now Mother uses 0.55, closer to 140–160g raw portions.
  */
  {
    names: [
      "Chicken Breast Raw",
      "Chicken Breast Core Raw",
      "Lean Minced Beef Raw",
      "Lean Beef Core Raw",
      "Fish Fillet Raw",
    ],
    shredding: 0.65,
    lean_bulk: 0.55,
    mass_gainer: 0.4,
    budget_athlete: 0.38,
    premium_chef: 0.55,
  },

  /*
    Carbs.
    Mother needs controlled carbs, child needs enough carbs but not athlete-sized portions,
    seniors need moderate carbs.
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
    shredding: 0.9,
    lean_bulk: 0.85,
    mass_gainer: 0.75,
    budget_athlete: 0.85,
    premium_chef: 0.9,
  },

  /*
    Bread / wraps.
    Do not aggressively increase units.
    For family / junior / senior plans we keep bread simple and avoid weird extra gram outputs.
  */
  {
    names: [
      "Whole Wheat Bread",
      "Baladi Bread",
      "Brown Burger Bun",
      "Whole Wheat Tortilla",
    ],
    shredding: 0.85,
    lean_bulk: 0.75,
    mass_gainer: 0.65,
    budget_athlete: 0.75,
    premium_chef: 0.8,
  },

  /*
    Fast proteins.
    This controls cottage-cheese substitutions later in PdfBooklet.
    The old lean_bulk 1.1 produced 270–314g cottage cheese breakfasts.
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
    lean_bulk: 0.65,
    mass_gainer: 0.55,
    budget_athlete: 0.5,
    premium_chef: 0.7,
  },

  /*
    Sauces / fats.
    Keep sauces flavorful but controlled.
    This should reduce items like 132g tomato sauce and very high weekly oil totals.
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
    shredding: 0.75,
    lean_bulk: 0.65,
    mass_gainer: 0.55,
    budget_athlete: 0.6,
    premium_chef: 0.65,
  },

  /*
    Vegetables.
    Keep vegetables mostly stable, but slightly reduce for child / senior-light
    where huge volume may be harder to finish.
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
    shredding: 1,
    lean_bulk: 0.9,
    mass_gainer: 0.8,
    budget_athlete: 0.8,
    premium_chef: 0.9,
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
    We intentionally avoid increasing units for these first real family clients.
    The previous logic created confusing outputs like:
    "2 medium wraps + 41g + 24g"
    We keep units stable and let grams scale where grams exist.
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