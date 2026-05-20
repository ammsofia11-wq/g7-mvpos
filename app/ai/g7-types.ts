export type Ingredient = {
  name: string
  grams: number
  cost: number
  category: "protein" | "carb" | "fat" | "sauce"
}

export type Nutrition = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type Dish = {
  name: string
  ingredients: Ingredient[]
  totalCost: number
  nutrition: Nutrition
  aiDescription: string
}

export type DayPlan = {
  day: number
  phase: string
  dish: Dish
}

export type WeeklyPlan = {
  plan: string
  days: DayPlan[]
}