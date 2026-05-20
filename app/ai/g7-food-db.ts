export type FoodCategory =
  | "protein"
  | "carb"
  | "fat"
  | "sauce"
  | "vegetable"
  | "fruit"
  | "spice"
  | "grain"
  | "dairy"
  | "bread"
  | "condiment"

export type FoodItem = {
  code: string
  name: string
  category: FoodCategory
}

// ================= G7 MASTER DATABASE =================

export const FOOD_DB: FoodItem[] = [

  // 🥩 PROTEIN
  { code: "1001", name: "Chicken breast", category: "protein" },
  { code: "1002", name: "Tenderloin", category: "protein" },
  { code: "1003", name: "Beef topside", category: "protein" },
  { code: "1004", name: "Salmon", category: "protein" },
  { code: "1005", name: "Shrimp", category: "protein" },
  { code: "1006", name: "Hamour fish", category: "protein" },
  { code: "1007", name: "Veal", category: "protein" },
  { code: "1008", name: "Tuna in water", category: "protein" },

  // 🥦 VEGETABLES
  { code: "2001", name: "Asparagus", category: "vegetable" },
  { code: "2004", name: "Green bell pepper", category: "vegetable" },
  { code: "2005", name: "Red bell pepper", category: "vegetable" },
  { code: "2006", name: "Yellow bell pepper", category: "vegetable" },
  { code: "2007", name: "Broccoli", category: "vegetable" },
  { code: "2008", name: "Carrot", category: "vegetable" },
  { code: "2009", name: "Cauliflower", category: "vegetable" },
  { code: "2011", name: "Cherry tomato", category: "vegetable" },
  { code: "2013", name: "Cucumber", category: "vegetable" },
  { code: "2017", name: "Garlic", category: "vegetable" },
  { code: "2019", name: "Green leaf lettuce", category: "vegetable" },
  { code: "2020", name: "Green onion", category: "vegetable" },
  { code: "2031", name: "Potato", category: "carb" },
  { code: "2041", name: "Tomato", category: "vegetable" },
  { code: "2043", name: "Zucchini", category: "vegetable" },

  // 🍎 FRUITS
  { code: "3001", name: "Avocado", category: "fat" },
  { code: "3002", name: "Banana", category: "fruit" },
  { code: "3004", name: "Apple", category: "fruit" },
  { code: "3007", name: "Orange", category: "fruit" },
  { code: "3009", name: "Pomegranate", category: "fruit" },
  { code: "3011", name: "Mango", category: "fruit" },

  // 🌿 SPICES
  { code: "4007", name: "Black pepper", category: "spice" },
  { code: "4028", name: "Paprika", category: "spice" },
  { code: "4031", name: "Sea salt", category: "spice" },
  { code: "4019", name: "Cumin powder", category: "spice" },
  { code: "4025", name: "Ginger powder", category: "spice" },

  // 🌾 GRAINS
  { code: "5002", name: "Basmati rice", category: "grain" },
  { code: "5004", name: "Brown rice", category: "grain" },
  { code: "5011", name: "Quinoa", category: "grain" },
  { code: "5009", name: "Oatmeal", category: "grain" },
  { code: "5010", name: "Pasta", category: "grain" },

  // 🥫 CONDIMENTS
  { code: "6003", name: "BBQ sauce", category: "condiment" },
  { code: "6009", name: "Hot sauce", category: "condiment" },
  { code: "6011", name: "Ketchup", category: "condiment" },
  { code: "6018", name: "Soy sauce", category: "condiment" },
  { code: "6014", name: "Olive oil", category: "fat" },

  // 🧀 DAIRY
  { code: "7003", name: "Eggs", category: "protein" },
  { code: "7004", name: "Feta cheese", category: "dairy" },
  { code: "7007", name: "Mozzarella cheese", category: "dairy" },
  { code: "7009", name: "Yogurt", category: "dairy" },
  { code: "7011", name: "Butter", category: "fat" },

  // 🍞 BREAD
  { code: "8002", name: "Slider bun", category: "bread" },
  { code: "8004", name: "Whole wheat burger bun", category: "bread" },
  { code: "8007", name: "Pita bread", category: "bread" }
]