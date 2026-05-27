export type NormalizedIngredientCategory =
  | "PROTEINS"
  | "CARBS"
  | "SAUCES"
  | "VEGETABLES"
  | "EXTRAS"

export type ParsedIngredientAmount =
  | { type: "grams"; value: number }
  | { type: "eggs"; value: number }
  | { type: "cans"; value: number }
  | { type: "scoops"; value: number }
  | { type: "unit"; value: number; unit: string }
  | { type: "text"; value: string }

export type NormalizedIngredient = {
  originalName: string
  canonicalName: string
  category: NormalizedIngredientCategory
  amount: ParsedIngredientAmount
  priceKey: string
}

const INGREDIENT_ALIASES: Record<
  string,
  {
    canonicalName: string
    category: NormalizedIngredientCategory
    priceKey: string
  }
> = {
  "Chicken Breast Raw": {
    canonicalName: "Chicken Breast",
    category: "PROTEINS",
    priceKey: "Chicken Breast",
  },
  "Chicken Breast Core Raw": {
    canonicalName: "Chicken Breast",
    category: "PROTEINS",
    priceKey: "Chicken Breast",
  },
  "Lean Minced Beef Raw": {
    canonicalName: "Lean Minced Beef",
    category: "PROTEINS",
    priceKey: "Lean Minced Beef",
  },
  "Lean Beef Core Raw": {
    canonicalName: "Lean Minced Beef",
    category: "PROTEINS",
    priceKey: "Lean Minced Beef",
  },
  "Fish Fillet Raw": {
    canonicalName: "Fish Fillet",
    category: "PROTEINS",
    priceKey: "Fish Fillet",
  },
  "Tuna in Water": {
    canonicalName: "Tuna in Water",
    category: "PROTEINS",
    priceKey: "Tuna in Water",
  },
  "Whole Egg": {
    canonicalName: "Whole Eggs",
    category: "PROTEINS",
    priceKey: "Whole Eggs",
  },
  "Whole Eggs": {
    canonicalName: "Whole Eggs",
    category: "PROTEINS",
    priceKey: "Whole Eggs",
  },
  "Egg Whites": {
    canonicalName: "Egg Whites",
    category: "PROTEINS",
    priceKey: "Egg Whites",
  },
  "Whey Protein": {
    canonicalName: "Whey Protein",
    category: "PROTEINS",
    priceKey: "Whey Protein",
  },

  "Basmati Rice Raw": {
    canonicalName: "Basmati Rice",
    category: "CARBS",
    priceKey: "Basmati Rice",
  },
  "Whole Wheat Penne Raw": {
    canonicalName: "Whole Wheat Penne",
    category: "CARBS",
    priceKey: "Whole Wheat Penne",
  },
  "Pasta Raw": {
    canonicalName: "Pasta",
    category: "CARBS",
    priceKey: "Pasta",
  },
  "Oats": {
    canonicalName: "Oats",
    category: "CARBS",
    priceKey: "Oats",
  },
  "Banana": {
    canonicalName: "Banana",
    category: "CARBS",
    priceKey: "Banana",
  },
  "Potato Raw": {
    canonicalName: "Potato",
    category: "CARBS",
    priceKey: "Potato",
  },
  "Sweet Potato Raw": {
    canonicalName: "Sweet Potato",
    category: "CARBS",
    priceKey: "Sweet Potato",
  },
  "Whole Wheat Bread": {
    canonicalName: "Whole Wheat Bread",
    category: "CARBS",
    priceKey: "Whole Wheat Bread",
  },
  "Baladi Bread": {
    canonicalName: "Baladi Bread",
    category: "CARBS",
    priceKey: "Baladi Bread",
  },
  "Whole Wheat Tortilla": {
    canonicalName: "Whole Wheat Tortilla",
    category: "CARBS",
    priceKey: "Whole Wheat Tortilla",
  },
  "Brown Burger Bun": {
    canonicalName: "Brown Burger Bun",
    category: "CARBS",
    priceKey: "Brown Burger Bun",
  },

  "Cucumber Yogurt Sauce": {
    canonicalName: "Cucumber Yogurt Sauce",
    category: "SAUCES",
    priceKey: "Yogurt Sauce",
  },
  "Yogurt Sauce": {
    canonicalName: "Yogurt Sauce",
    category: "SAUCES",
    priceKey: "Yogurt Sauce",
  },
  "Light Tahini Sauce": {
    canonicalName: "Light Tahini Sauce",
    category: "SAUCES",
    priceKey: "Tahini Sauce",
  },
  "Tomato Sauce": {
    canonicalName: "Tomato Sauce",
    category: "SAUCES",
    priceKey: "Tomato Sauce",
  },
  "Light Pink Sauce": {
    canonicalName: "Light Pink Sauce",
    category: "SAUCES",
    priceKey: "Pink Sauce",
  },
  "Light Stir-Fry Sauce": {
    canonicalName: "Light Stir-Fry Sauce",
    category: "SAUCES",
    priceKey: "Stir-Fry Sauce",
  },
  "Light Burger Sauce": {
    canonicalName: "Light Burger Sauce",
    category: "SAUCES",
    priceKey: "Burger Sauce",
  },
  "Fajita Sauce": {
    canonicalName: "Fajita Sauce",
    category: "SAUCES",
    priceKey: "Fajita Sauce",
  },
  "Lemon Herb Marinade": {
    canonicalName: "Lemon Herb Marinade",
    category: "SAUCES",
    priceKey: "Lemon Herb Marinade",
  },

  "Tomato & Cucumber": {
    canonicalName: "Tomato & Cucumber",
    category: "VEGETABLES",
    priceKey: "Mixed Vegetables",
  },
  "Green Salad": {
    canonicalName: "Green Salad",
    category: "VEGETABLES",
    priceKey: "Green Salad",
  },
  "Green Pepper": {
    canonicalName: "Green Pepper",
    category: "VEGETABLES",
    priceKey: "Green Pepper",
  },
  "Parsley": {
    canonicalName: "Parsley",
    category: "VEGETABLES",
    priceKey: "Parsley",
  },
  "Bell Pepper": {
    canonicalName: "Bell Pepper",
    category: "VEGETABLES",
    priceKey: "Bell Pepper",
  },
  "Green Pepper & Coriander": {
    canonicalName: "Green Pepper & Coriander",
    category: "VEGETABLES",
    priceKey: "Green Pepper & Coriander",
  },
  "Mushroom or Pepper": {
    canonicalName: "Mushroom & Pepper",
    category: "VEGETABLES",
    priceKey: "Mushroom & Pepper",
  },
  "Colored Peppers & Red Onion": {
    canonicalName: "Colored Peppers & Red Onion",
    category: "VEGETABLES",
    priceKey: "Colored Peppers & Red Onion",
  },
  "Mushroom & Pepper": {
    canonicalName: "Mushroom & Pepper",
    category: "VEGETABLES",
    priceKey: "Mushroom & Pepper",
  },
  "Lettuce & Tomato": {
    canonicalName: "Lettuce & Tomato",
    category: "VEGETABLES",
    priceKey: "Lettuce & Tomato",
  },
  "Peppers & Coriander": {
    canonicalName: "Peppers & Coriander",
    category: "VEGETABLES",
    priceKey: "Peppers & Coriander",
  },

  "Light Mozzarella": {
    canonicalName: "Light Mozzarella",
    category: "EXTRAS",
    priceKey: "Light Mozzarella",
  },
  "Pickles": {
    canonicalName: "Pickles",
    category: "EXTRAS",
    priceKey: "Pickles",
  },
  "Cinnamon": {
    canonicalName: "Cinnamon",
    category: "EXTRAS",
    priceKey: "Cinnamon",
  },
  "Cocoa Powder": {
    canonicalName: "Cocoa Powder",
    category: "EXTRAS",
    priceKey: "Cocoa Powder",
  },
  "Water or Low-Fat Milk": {
    canonicalName: "Water or Low-Fat Milk",
    category: "EXTRAS",
    priceKey: "Water or Low-Fat Milk",
  },
}

export function parseIngredientAmount(amount: string): ParsedIngredientAmount {
  const cleaned = amount.trim()

  const gramMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s?g$/i)
  if (gramMatch) {
    return {
      type: "grams",
      value: Number(gramMatch[1]),
    }
  }

  const eggMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s?eggs?$/i)
  if (eggMatch) {
    return {
      type: "eggs",
      value: Number(eggMatch[1]),
    }
  }

  const canMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s?cans?$/i)
  if (canMatch) {
    return {
      type: "cans",
      value: Number(canMatch[1]),
    }
  }

  const scoopMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s?scoops?$/i)
  if (scoopMatch) {
    return {
      type: "scoops",
      value: Number(scoopMatch[1]),
    }
  }

  const unitMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s(.+)$/i)
  if (unitMatch) {
    return {
      type: "unit",
      value: Number(unitMatch[1]),
      unit: unitMatch[2],
    }
  }

  return {
    type: "text",
    value: cleaned,
  }
}

export function normalizeIngredient(
  name: string,
  amount: string
): NormalizedIngredient {
  const alias = INGREDIENT_ALIASES[name]

  if (alias) {
    return {
      originalName: name,
      canonicalName: alias.canonicalName,
      category: alias.category,
      priceKey: alias.priceKey,
      amount: parseIngredientAmount(amount),
    }
  }

  return {
    originalName: name,
    canonicalName: name,
    category: "EXTRAS",
    priceKey: name,
    amount: parseIngredientAmount(amount),
  }
}

export function formatNormalizedAmount(input: {
  grams: number
  eggs: number
  cans: number
  scoops: number
  units: Record<string, number>
  texts: string[]
}) {
  const parts: string[] = []

  if (input.grams > 0) {
    if (input.grams >= 1000) {
      parts.push(`${Number((input.grams / 1000).toFixed(2))} kg`)
    } else {
      parts.push(`${Math.round(input.grams)}g`)
    }
  }

  if (input.eggs > 0) {
    parts.push(`${input.eggs} eggs`)
  }

  if (input.cans > 0) {
    parts.push(`${input.cans} cans`)
  }

  if (input.scoops > 0) {
    parts.push(`${input.scoops} scoops`)
  }

  Object.entries(input.units).forEach(([unit, value]) => {
    parts.push(`${value} ${unit}`)
  })

  if (input.texts.length > 0) {
    parts.push(input.texts.join(" + "))
  }

  return parts.join(" / ")
}