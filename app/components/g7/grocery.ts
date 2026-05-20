import { Meal } from "./meals"

export type GroceryCategory =
  | "Proteins"
  | "Carbs"
  | "Vegetables"
  | "Sauces"
  | "Extras"

export type GroceryItem = {
  name: string
  amount: string
  category: GroceryCategory
}

function detectCategory(name: string): GroceryCategory {
  const value = name.toLowerCase()

  if (
    value.includes("chicken") ||
    value.includes("beef") ||
    value.includes("tuna") ||
    value.includes("egg") ||
    value.includes("whey")
  ) {
    return "Proteins"
  }

  if (
    value.includes("rice") ||
    value.includes("oats") ||
    value.includes("pasta") ||
    value.includes("potato") ||
    value.includes("bread") ||
    value.includes("banana")
  ) {
    return "Carbs"
  }

  if (
    value.includes("salad") ||
    value.includes("vegetables") ||
    value.includes("lettuce") ||
    value.includes("cucumber")
  ) {
    return "Vegetables"
  }

  if (
    value.includes("sauce") ||
    value.includes("yogurt")
  ) {
    return "Sauces"
  }

  return "Extras"
}

export function buildGroceryList(meals: Meal[]): GroceryItem[] {
  return meals.flatMap((meal) =>
    meal.raw.map(([name, amount]) => ({
      name,
      amount,
      category: detectCategory(name),
    }))
  )
}

export function groupGroceryList(items: GroceryItem[]) {
  return items.reduce<Record<GroceryCategory, GroceryItem[]>>(
    (groups, item) => {
      groups[item.category].push(item)
      return groups
    },
    {
      Proteins: [],
      Carbs: [],
      Vegetables: [],
      Sauces: [],
      Extras: [],
    }
  )
}