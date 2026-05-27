import { PlanKey } from "./plans"

export type RawIngredient = [string, string]

type ScaleRule = {
  names: string[]
  shredding: number
  lean_bulk: number
  mass_gainer: number
  budget_athlete: number
  premium_chef: number
}

const SCALE_RULES: ScaleRule[] = [
  {
    names: [
      "Chicken Breast Raw",
      "Chicken Breast Core Raw",
      "Lean Minced Beef Raw",
      "Lean Beef Core Raw",
      "Fish Fillet Raw",
    ],
    shredding: 0.9,
    lean_bulk: 1.15,
    mass_gainer: 1.3,
    budget_athlete: 1,
    premium_chef: 1.1,
  },
  {
    names: [
      "Basmati Rice Raw",
      "Whole Wheat Penne Raw",
      "Pasta Raw",
      "Potato Raw",
      "Sweet Potato Raw",
      "Oats",
    ],
    shredding: 0.8,
    lean_bulk: 1.35,
    mass_gainer: 1.65,
    budget_athlete: 1.1,
    premium_chef: 1.25,
  },
  {
    names: [
      "Whole Wheat Bread",
      "Baladi Bread",
      "Brown Burger Bun",
      "Whole Wheat Tortilla",
    ],
    shredding: 0.9,
    lean_bulk: 1.2,
    mass_gainer: 1.4,
    budget_athlete: 1,
    premium_chef: 1.15,
  },
  {
    names: [
      "Tuna in Water",
      "Whey Protein",
      "Egg Whites",
      "Whole Eggs",
      "Whole Egg",
    ],
    shredding: 1,
    lean_bulk: 1.1,
    mass_gainer: 1.2,
    budget_athlete: 1,
    premium_chef: 1.1,
  },
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
    ],
    shredding: 0.85,
    lean_bulk: 1.1,
    mass_gainer: 1.25,
    budget_athlete: 1,
    premium_chef: 1.2,
  },
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
    lean_bulk: 1,
    mass_gainer: 1,
    budget_athlete: 1,
    premium_chef: 1.1,
  },
]

function getScaleFactor(name: string, planId: PlanKey) {
  const rule = SCALE_RULES.find((item) =>
    item.names.includes(name)
  )

  if (!rule) return 1

  if (planId === "shredding") return rule.shredding
  if (planId === "lean_bulk") return rule.lean_bulk
  if (planId === "mass_gainer") return rule.mass_gainer
  if (planId === "budget_athlete") return rule.budget_athlete
  if (planId === "premium_chef") return rule.premium_chef

  return 1
}

function scaleGrams(amount: string, factor: number) {
  const match = amount.match(/([\d.]+)\s*g/i)

  if (!match) return amount

  const value = Number(match[1])
  const scaled = Math.round(value * factor)

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
  if (amount.includes("1 slice")) {
    return factor > 1.25 ? "2 slices" : amount
  }

  if (amount.includes("1 bun")) {
    return amount
  }

  if (amount.includes("1 medium loaf")) {
    return factor > 1.25 ? "1 large loaf" : amount
  }

  if (amount.includes("2 medium wraps")) {
    return factor > 1.25 ? "3 medium wraps" : amount
  }

  if (amount.includes("1 medium wrap")) {
    return factor > 1.25 ? "2 medium wraps" : amount
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