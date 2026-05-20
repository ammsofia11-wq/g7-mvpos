export type TaskStatus =
  | "ASSIGNED"
  | "INGREDIENT_COLLECTION"
  | "PREP_STARTED"
  | "COOKING"
  | "READY"
  | "STORED"
  | "PACKAGING_READY"

export type Ingredient = {
  name: string
  quantity: number
  unit: string
}

export type RecipeSOP = {
  ingredients: string[]
  preparation: string[]
  cooking: string[]
  storage: string[]
  packaging: string[]
}

export type ProductionRecipe = {
  id: number
  recipeName: string
  category: string
  chef: string
  type: "Commercial" | "Home"
  station: string
  batchYield: number
  shelfLife: string
  batchCode: string
  estimatedTime: string
  ingredients: Ingredient[]
  sop: RecipeSOP
}

export type StaffTask = {
  id: number
  recipeId: number
  assignedTo: string
  station: string
  portions: number
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  status: TaskStatus
}

export const PRODUCTION_RECIPES: ProductionRecipe[] = [
  {
    id: 1,
    recipeName: "Marinara Sauce",
    category: "Sauce",
    chef: "Ahmed Salem",
    type: "Commercial",
    station: "Hot Kitchen",
    batchYield: 25,
    shelfLife: "5 Days",
    batchCode: "MAR-2026-0513",
    estimatedTime: "90 min",

    ingredients: [
      {
        name: "Tomato",
        quantity: 10,
        unit: "kg",
      },
      {
        name: "Onion",
        quantity: 2,
        unit: "kg",
      },
      {
        name: "Olive Oil",
        quantity: 1,
        unit: "L",
      },
    ],

    sop: {
      ingredients: [
        "Tomato",
        "Onion",
        "Olive Oil",
      ],

      preparation: [
        "Wash tomatoes",
        "Dice onions",
        "Prepare sauce station",
      ],

      cooking: [
        "Sweat onions",
        "Add tomatoes",
        "Simmer for 60 minutes",
      ],

      storage: [
        "Cool rapidly",
        "Store chilled 2°C - 4°C",
      ],

      packaging: [
        "Fill labeled containers",
        "Apply production sticker",
      ],
    },
  },

  {
    id: 2,
    recipeName: "Butter Chicken",
    category: "Main Course",
    chef: "Ahmed Salem",
    type: "Commercial",
    station: "Hot Kitchen",
    batchYield: 55,
    shelfLife: "3 Days",
    batchCode: "BTC-2026-0513",
    estimatedTime: "70 min",

    ingredients: [
      {
        name: "Chicken Breast",
        quantity: 12,
        unit: "kg",
      },
      {
        name: "Tomato Sauce",
        quantity: 5,
        unit: "kg",
      },
      {
        name: "Cooking Cream",
        quantity: 2,
        unit: "L",
      },
    ],

    sop: {
      ingredients: [
        "Chicken Breast",
        "Tomato Sauce",
        "Cooking Cream",
      ],

      preparation: [
        "Cut chicken",
        "Prepare spice mix",
        "Build sauce base",
      ],

      cooking: [
        "Cook chicken",
        "Reduce sauce",
        "Combine and simmer",
      ],

      storage: [
        "Cool safely",
        "Transfer to chilled storage",
      ],

      packaging: [
        "Portion evenly",
        "Seal meal trays",
      ],
    },
  },
]

export const STAFF_TASKS: StaffTask[] = [
  {
    id: 1,
    recipeId: 2,
    assignedTo: "Ahmed",
    station: "Hot Kitchen",
    portions: 55,
    priority: "URGENT",
    status: "ASSIGNED",
  },

  {
    id: 2,
    recipeId: 1,
    assignedTo: "Mahmoud",
    station: "Hot Kitchen",
    portions: 25,
    priority: "HIGH",
    status: "ASSIGNED",
  },
]

export function getRecipeById(recipeId: number) {
  return PRODUCTION_RECIPES.find((recipe) => {
    return recipe.id === recipeId
  })
}

export function getTasksByWorker(worker: string) {
  return STAFF_TASKS.filter((task) => {
    return task.assignedTo === worker
  })
}

export function getRecipesByChef(chef: string) {
  return PRODUCTION_RECIPES.filter((recipe) => {
    return recipe.chef === chef
  })
}