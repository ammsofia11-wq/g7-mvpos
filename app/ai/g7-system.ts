import { ingredientDB } from "./ingredient-db"

// ================= TYPES =================

type Plan = "balanced" | "keto" | "vegan"
type Flavor = "cajun" | "asian" | "italian"

type Ingredient = {
  name: string
  grams: number
  cost: number
}

type Dish = {
  name: string
  ingredients: Ingredient[]
  totalCost: number
}

// ================= HELPERS =================

function getPrice(name: string) {
  const item = ingredientDB.find(i => i.name === name)
  return item ? item.price : 1
}

function buildIngredient(name: string, grams: number): Ingredient {
  const price = getPrice(name)
  const cost = (grams / 100) * price

  return { name, grams, cost }
}

// ================= MAIN =================

export function generateDish(): Dish {

  const items = [
    buildIngredient("Chicken", 150),
    buildIngredient("Potato", 200),
    buildIngredient("Cajun Cream Sauce", 50),
    buildIngredient("Paprika", 5),
    buildIngredient("Garlic", 5),
    buildIngredient("Cajun Mix", 5)
  ]

  const totalCost = items.reduce((sum, i) => sum + i.cost, 0)

  return {
    name: "Spicy American Chicken Bowl",
    ingredients: items,
    totalCost
  }
}