export type NutritionResult = {
  kcal: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

type IngredientNutrition = {
  kcalPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatPer100g: number
  fiberPer100g?: number
}

const INGREDIENT_NUTRITION: Record<string, IngredientNutrition> = {
  "Chicken Breast Raw": {
    kcalPer100g: 120,
    proteinPer100g: 23,
    carbsPer100g: 0,
    fatPer100g: 2.5,
  },

  "Chicken Breast Core Raw": {
    kcalPer100g: 120,
    proteinPer100g: 23,
    carbsPer100g: 0,
    fatPer100g: 2.5,
  },

  "Lean Minced Beef Raw": {
    kcalPer100g: 170,
    proteinPer100g: 21,
    carbsPer100g: 0,
    fatPer100g: 9,
  },

  "Lean Beef Core Raw": {
    kcalPer100g: 170,
    proteinPer100g: 21,
    carbsPer100g: 0,
    fatPer100g: 9,
  },

  "Fish Fillet Raw": {
    kcalPer100g: 105,
    proteinPer100g: 22,
    carbsPer100g: 0,
    fatPer100g: 2,
  },

  "Tuna in Water": {
    kcalPer100g: 110,
    proteinPer100g: 25,
    carbsPer100g: 0,
    fatPer100g: 1,
  },

  "Basmati Rice Raw": {
    kcalPer100g: 360,
    proteinPer100g: 7,
    carbsPer100g: 78,
    fatPer100g: 0.6,
    fiberPer100g: 1,
  },

  "Whole Wheat Penne Raw": {
    kcalPer100g: 350,
    proteinPer100g: 13,
    carbsPer100g: 70,
    fatPer100g: 2,
    fiberPer100g: 8,
  },

  "Pasta Raw": {
    kcalPer100g: 350,
    proteinPer100g: 13,
    carbsPer100g: 70,
    fatPer100g: 2,
    fiberPer100g: 8,
  },

  "Potato Raw": {
    kcalPer100g: 77,
    proteinPer100g: 2,
    carbsPer100g: 17,
    fatPer100g: 0.1,
    fiberPer100g: 2.2,
  },

  "Sweet Potato Raw": {
    kcalPer100g: 86,
    proteinPer100g: 1.6,
    carbsPer100g: 20,
    fatPer100g: 0.1,
    fiberPer100g: 3,
  },

  Oats: {
    kcalPer100g: 389,
    proteinPer100g: 17,
    carbsPer100g: 66,
    fatPer100g: 7,
    fiberPer100g: 10,
  },

  Banana: {
    kcalPer100g: 89,
    proteinPer100g: 1.1,
    carbsPer100g: 23,
    fatPer100g: 0.3,
    fiberPer100g: 2.6,
  },

  "Egg Whites": {
    kcalPer100g: 52,
    proteinPer100g: 11,
    carbsPer100g: 0.7,
    fatPer100g: 0.2,
  },

  "Whole Eggs": {
    kcalPer100g: 143,
    proteinPer100g: 13,
    carbsPer100g: 1,
    fatPer100g: 10,
  },

  "Whole Egg": {
    kcalPer100g: 143,
    proteinPer100g: 13,
    carbsPer100g: 1,
    fatPer100g: 10,
  },

  "Whole Wheat Bread": {
    kcalPer100g: 250,
    proteinPer100g: 10,
    carbsPer100g: 45,
    fatPer100g: 4,
    fiberPer100g: 7,
  },

  "Baladi Bread": {
    kcalPer100g: 270,
    proteinPer100g: 9,
    carbsPer100g: 55,
    fatPer100g: 1.5,
    fiberPer100g: 4,
  },

  "Brown Burger Bun": {
    kcalPer100g: 260,
    proteinPer100g: 9,
    carbsPer100g: 48,
    fatPer100g: 4,
    fiberPer100g: 5,
  },

  "Whole Wheat Tortilla": {
    kcalPer100g: 300,
    proteinPer100g: 9,
    carbsPer100g: 52,
    fatPer100g: 7,
    fiberPer100g: 6,
  },

  "Whey Protein": {
    kcalPer100g: 400,
    proteinPer100g: 80,
    carbsPer100g: 8,
    fatPer100g: 6,
  },

  "Light Mozzarella": {
    kcalPer100g: 230,
    proteinPer100g: 24,
    carbsPer100g: 3,
    fatPer100g: 13,
  },

  "Cucumber Yogurt Sauce": {
    kcalPer100g: 60,
    proteinPer100g: 4,
    carbsPer100g: 5,
    fatPer100g: 2,
  },

  "Light Tahini Sauce": {
    kcalPer100g: 180,
    proteinPer100g: 5,
    carbsPer100g: 8,
    fatPer100g: 14,
  },

  "Tomato Sauce": {
    kcalPer100g: 45,
    proteinPer100g: 1.5,
    carbsPer100g: 8,
    fatPer100g: 0.5,
    fiberPer100g: 2,
  },

  "Light Pink Sauce": {
    kcalPer100g: 90,
    proteinPer100g: 4,
    carbsPer100g: 8,
    fatPer100g: 4,
  },

  "Light Burger Sauce": {
    kcalPer100g: 120,
    proteinPer100g: 2,
    carbsPer100g: 8,
    fatPer100g: 8,
  },

  "Yogurt Sauce": {
    kcalPer100g: 60,
    proteinPer100g: 4,
    carbsPer100g: 5,
    fatPer100g: 2,
  },

  "Fajita Sauce": {
    kcalPer100g: 90,
    proteinPer100g: 2,
    carbsPer100g: 10,
    fatPer100g: 4,
  },

  "Light Yogurt Sauce": {
    kcalPer100g: 60,
    proteinPer100g: 4,
    carbsPer100g: 5,
    fatPer100g: 2,
  },

  "Lemon Herb Marinade": {
    kcalPer100g: 80,
    proteinPer100g: 1,
    carbsPer100g: 6,
    fatPer100g: 5,
  },

  "Tomato & Cucumber": {
    kcalPer100g: 20,
    proteinPer100g: 1,
    carbsPer100g: 4,
    fatPer100g: 0.2,
    fiberPer100g: 1,
  },

  "Green Salad": {
    kcalPer100g: 18,
    proteinPer100g: 1,
    carbsPer100g: 3,
    fatPer100g: 0.2,
    fiberPer100g: 1.5,
  },

  "Green Pepper": {
    kcalPer100g: 20,
    proteinPer100g: 1,
    carbsPer100g: 4.5,
    fatPer100g: 0.2,
    fiberPer100g: 1.7,
  },

  "Bell Pepper": {
    kcalPer100g: 20,
    proteinPer100g: 1,
    carbsPer100g: 4.5,
    fatPer100g: 0.2,
    fiberPer100g: 1.7,
  },

  "Green Pepper & Coriander": {
    kcalPer100g: 20,
    proteinPer100g: 1,
    carbsPer100g: 4,
    fatPer100g: 0.2,
    fiberPer100g: 1.7,
  },

  "Mushroom or Pepper": {
    kcalPer100g: 25,
    proteinPer100g: 2,
    carbsPer100g: 4,
    fatPer100g: 0.2,
    fiberPer100g: 1.5,
  },

  "Mushroom & Pepper": {
    kcalPer100g: 25,
    proteinPer100g: 2,
    carbsPer100g: 4,
    fatPer100g: 0.2,
    fiberPer100g: 1.5,
  },

  "Lettuce & Tomato": {
    kcalPer100g: 18,
    proteinPer100g: 1,
    carbsPer100g: 3.5,
    fatPer100g: 0.2,
    fiberPer100g: 1.2,
  },

  "Colored Peppers & Red Onion": {
    kcalPer100g: 35,
    proteinPer100g: 1,
    carbsPer100g: 8,
    fatPer100g: 0.2,
    fiberPer100g: 2,
  },

  Parsley: {
    kcalPer100g: 36,
    proteinPer100g: 3,
    carbsPer100g: 6,
    fatPer100g: 0.8,
    fiberPer100g: 3,
  },

  Pickles: {
    kcalPer100g: 12,
    proteinPer100g: 0.5,
    carbsPer100g: 2,
    fatPer100g: 0.2,
  },

  Cinnamon: {
    kcalPer100g: 247,
    proteinPer100g: 4,
    carbsPer100g: 81,
    fatPer100g: 1.2,
    fiberPer100g: 53,
  },

  "Cocoa Powder": {
    kcalPer100g: 228,
    proteinPer100g: 20,
    carbsPer100g: 58,
    fatPer100g: 14,
    fiberPer100g: 33,
  },
}

function parseAmountToGrams(amount: string): number {
  const normalized = amount.toLowerCase().trim()

  const gramMatch = normalized.match(/([\d.]+)\s*g/)
  if (gramMatch) {
    return Number(gramMatch[1])
  }

  const eggMatch = normalized.match(/([\d.]+)\s*egg/)
  if (eggMatch) {
    return Number(eggMatch[1]) * 50
  }

  const scoopMatch = normalized.match(/([\d.]+)\s*scoop/)
  if (scoopMatch) {
    return Number(scoopMatch[1]) * 30
  }

  const canMatch = normalized.match(/([\d.]+)\s*can/)
  if (canMatch) {
    return Number(canMatch[1]) * 120
  }

  if (normalized.includes("1 slice")) return 35
  if (normalized.includes("1 bun")) return 80
  if (normalized.includes("1 medium loaf")) return 90
  if (normalized.includes("2 medium wraps")) return 120
  if (normalized.includes("1 medium wrap")) return 60

  return 0
}

export function calculateNutritionFromRaw(
  raw: [string, string][]
): NutritionResult {
  const total = raw.reduce<NutritionResult>(
    (sum, [name, amount]) => {
      const nutrition = INGREDIENT_NUTRITION[name]
      const grams = parseAmountToGrams(amount)

      if (!nutrition || grams <= 0) {
        return sum
      }

      const factor = grams / 100

      return {
        kcal: sum.kcal + nutrition.kcalPer100g * factor,
        protein:
          sum.protein + nutrition.proteinPer100g * factor,
        carbs: sum.carbs + nutrition.carbsPer100g * factor,
        fat: sum.fat + nutrition.fatPer100g * factor,
        fiber:
          sum.fiber +
          (nutrition.fiberPer100g ?? 0) * factor,
      }
    },
    {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    }
  )

  return {
    kcal: Math.round(total.kcal),
    protein: Math.round(total.protein),
    carbs: Math.round(total.carbs),
    fat: Math.round(total.fat),
    fiber: Math.round(total.fiber),
  }
}