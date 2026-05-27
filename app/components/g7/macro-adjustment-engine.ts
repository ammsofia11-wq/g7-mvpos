import {
  CarbType,
  ProteinFamily,
} from "./meals"

export type RawIngredient = [string, string]

export type IngredientAdjustment = {
  ingredient: string
  increaseGrams: number
  reason: string
}

export type MacroAdjustmentInput = {
  proteinGap: number
  carbGap: number
  fatGap: number

  carbType: CarbType
  proteinFamily: ProteinFamily
}

export type MacroAdjustmentResult = {
  adjustments: IngredientAdjustment[]
}

function buildProteinAdjustment(
  proteinGap: number,
  proteinFamily: ProteinFamily
): IngredientAdjustment[] {
  if (proteinGap <= 5) return []

  if (proteinFamily === "CHICKEN") {
    return [
      {
        ingredient: "Chicken Breast Raw",
        increaseGrams: Math.round(proteinGap * 4.5),
        reason: "Applied chicken increase to hit coach protein target",
      },
    ]
  }

  if (proteinFamily === "BEEF") {
    return [
      {
        ingredient: "Lean Minced Beef Raw",
        increaseGrams: Math.round(proteinGap * 5),
        reason: "Applied beef increase to hit coach protein target",
      },
    ]
  }

  if (proteinFamily === "TUNA") {
    return [
      {
        ingredient: "Tuna in Water",
        increaseGrams: Math.round(proteinGap * 4.6),
        reason: "Applied tuna increase to hit coach protein target",
      },
    ]
  }

  if (proteinFamily === "FISH") {
    return [
      {
        ingredient: "Fish Fillet Raw",
        increaseGrams: Math.round(proteinGap * 5),
        reason: "Applied fish increase to hit coach protein target",
      },
    ]
  }

  if (proteinFamily === "EGGS") {
    return [
      {
        ingredient: "Egg Whites",
        increaseGrams: Math.round(proteinGap * 12),
        reason: "Applied egg-white increase to hit coach protein target",
      },
    ]
  }

  if (proteinFamily === "WHEY") {
    return [
      {
        ingredient: "Whey Protein",
        increaseGrams: Math.round(proteinGap * 1.25),
        reason: "Applied whey increase to hit coach protein target",
      },
    ]
  }

  return []
}

function buildCarbAdjustment(
  carbGap: number,
  carbType: CarbType
): IngredientAdjustment[] {
  if (carbGap <= 5) return []

  if (carbType === "RICE") {
    return [
      {
        ingredient: "Basmati Rice Raw",
        increaseGrams: Math.round(carbGap * 0.9),
        reason: "Applied rice increase to hit coach carb target",
      },
    ]
  }

  if (carbType === "PASTA") {
    return [
      {
        ingredient: "Pasta Raw",
        increaseGrams: Math.round(carbGap * 0.8),
        reason: "Applied pasta increase to hit coach carb target",
      },
    ]
  }

  if (carbType === "POTATO") {
    return [
      {
        ingredient: "Potato Raw",
        increaseGrams: Math.round(carbGap * 4),
        reason: "Applied potato increase to hit coach carb target",
      },
    ]
  }

  if (carbType === "WRAP") {
    return [
      {
        ingredient: "Whole Wheat Tortilla",
        increaseGrams: Math.round(carbGap * 1.2),
        reason: "Applied tortilla increase to hit coach carb target",
      },
    ]
  }

  if (carbType === "BREAD") {
    return [
      {
        ingredient: "Whole Wheat Bread",
        increaseGrams: Math.round(carbGap * 1.1),
        reason: "Applied bread increase to hit coach carb target",
      },
    ]
  }

  if (carbType === "OATS") {
    return [
      {
        ingredient: "Oats",
        increaseGrams: Math.round(carbGap * 1.3),
        reason: "Applied oats increase to hit coach carb target",
      },
    ]
  }

  return []
}

function buildFatAdjustment(
  fatGap: number
): IngredientAdjustment[] {
  if (fatGap <= 5) return []

  return [
    {
      ingredient: "Healthy Fat Source",
      increaseGrams: Math.round(fatGap * 1.1),
      reason: "Applied healthy fat increase to hit coach fat target",
    },
  ]
}

export function buildMacroAdjustments(
  input: MacroAdjustmentInput
): MacroAdjustmentResult {
  const adjustments: IngredientAdjustment[] = [
    ...buildProteinAdjustment(
      input.proteinGap,
      input.proteinFamily
    ),

    ...buildCarbAdjustment(
      input.carbGap,
      input.carbType
    ),

    ...buildFatAdjustment(
      input.fatGap
    ),
  ]

  return {
    adjustments,
  }
}

function normalizeName(name: string) {
  return name.trim().toLowerCase()
}

function addGramsToAmount(
  amount: string,
  increaseGrams: number
) {
  const match = amount.match(/([\d.]+)\s*g/i)

  if (!match) {
    return `${amount} + ${increaseGrams}g`
  }

  const current = Number(match[1])
  const next = Math.round(current + increaseGrams)

  return amount.replace(
    /([\d.]+)\s*g/i,
    `${next}g`
  )
}

export function applyMacroAdjustmentsToRaw(
  raw: RawIngredient[],
  adjustments: IngredientAdjustment[]
): RawIngredient[] {
  if (adjustments.length === 0) return raw

  const nextRaw: RawIngredient[] = raw.map(
    ([name, amount]) => [name, amount]
  )

  adjustments.forEach((adjustment) => {
    const index = nextRaw.findIndex(
      ([name]) =>
        normalizeName(name) ===
        normalizeName(adjustment.ingredient)
    )

    if (index >= 0) {
      const [name, amount] = nextRaw[index]

      nextRaw[index] = [
        name,
        addGramsToAmount(
          amount,
          adjustment.increaseGrams
        ),
      ]

      return
    }

    nextRaw.push([
      adjustment.ingredient,
      `${adjustment.increaseGrams}g`,
    ])
  })

  return nextRaw
}