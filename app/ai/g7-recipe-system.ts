export type RecipeType = "HOME" | "COMMERCIAL"
export type RecipeCategory = "SAUCE" | "MAIN" | "SALAD" | "SIDE" | "DESSERT"

export type RecipeIngredient = {
  name: string
  quantity: number
  unit: string
  costPerUnit: number
}

export type RecipeSOP = {
  preparation: string[]
  cooking: string[]
  storage: string[]
  packaging: string[]
}

export type G7Recipe = {
  id: string
  name: string
  chef: string
  type: RecipeType
  category: RecipeCategory
  station: string
  baseYield: number
  yieldUnit: string
  estimatedMinutes: number
  shelfLifeDays: number
  storageTemp: string
  batchCodePrefix: string
  ingredients: RecipeIngredient[]
  sop: RecipeSOP
}

export const G7_RECIPES: G7Recipe[] = [
  {
    id: "recipe-butter-chicken",
    name: "Butter Chicken",
    chef: "Ahmed Salem",
    type: "COMMERCIAL",
    category: "MAIN",
    station: "Hot Kitchen",
    baseYield: 55,
    yieldUnit: "portions",
    estimatedMinutes: 70,
    shelfLifeDays: 3,
    storageTemp: "Chilled 2°C - 4°C",
    batchCodePrefix: "BTC",
    ingredients: [
      { name: "Chicken Breast", quantity: 12, unit: "kg", costPerUnit: 8.5 },
      { name: "Tomato Sauce", quantity: 5, unit: "kg", costPerUnit: 2.8 },
      { name: "Cooking Cream", quantity: 2, unit: "L", costPerUnit: 4.8 },
      { name: "Butter", quantity: 1, unit: "kg", costPerUnit: 5.6 },
      { name: "Spice Mix", quantity: 0.4, unit: "kg", costPerUnit: 9.2 },
    ],
    sop: {
      preparation: ["Cut chicken", "Prepare spice mix", "Build sauce base"],
      cooking: ["Cook chicken", "Reduce sauce", "Combine and simmer"],
      storage: ["Cool safely", "Transfer to chilled storage"],
      packaging: ["Portion evenly", "Seal meal trays"],
    },
  },
  {
    id: "recipe-marinara-sauce",
    name: "Marinara Sauce",
    chef: "Ahmed Salem",
    type: "COMMERCIAL",
    category: "SAUCE",
    station: "Sauce Station",
    baseYield: 90,
    yieldUnit: "portions",
    estimatedMinutes: 25,
    shelfLifeDays: 5,
    storageTemp: "Chilled 2°C - 4°C",
    batchCodePrefix: "MAR",
    ingredients: [
      { name: "Tomato", quantity: 10, unit: "kg", costPerUnit: 2.1 },
      { name: "Garlic", quantity: 0.4, unit: "kg", costPerUnit: 3.2 },
      { name: "Olive Oil", quantity: 1, unit: "L", costPerUnit: 6.5 },
      { name: "Basil", quantity: 0.2, unit: "kg", costPerUnit: 7.5 },
    ],
    sop: {
      preparation: ["Wash tomatoes", "Prepare garlic"],
      cooking: ["Cook sauce", "Reduce texture"],
      storage: ["Blast chill", "Label batch"],
      packaging: ["Fill containers"],
    },
  },
]

export function getRecipeById(recipeId: string) {
  return G7_RECIPES.find((recipe) => recipe.id === recipeId)
}

export function getRecipeCost(recipe: G7Recipe) {
  return recipe.ingredients.reduce((total, ingredient) => {
    return total + ingredient.quantity * ingredient.costPerUnit
  }, 0)
}

export function getRecipeCostPerYield(recipe: G7Recipe) {
  if (recipe.baseYield <= 0) return 0

  return getRecipeCost(recipe) / recipe.baseYield
}

export function scaleRecipe(recipe: G7Recipe, targetYield: number) {
  const multiplier = targetYield / recipe.baseYield

  return recipe.ingredients.map((ingredient) => {
    return {
      ...ingredient,
      scaledQuantity: ingredient.quantity * multiplier,
      scaledCost: ingredient.quantity * multiplier * ingredient.costPerUnit,
    }
  })
}

export function createBatchCode(recipe: G7Recipe) {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const dd = String(today.getDate()).padStart(2, "0")

  return `${recipe.batchCodePrefix}-${yyyy}${mm}${dd}`
}

export function getExpiryDate(recipe: G7Recipe) {
  const date = new Date()
  date.setDate(date.getDate() + recipe.shelfLifeDays)

  return date.toLocaleDateString()
}