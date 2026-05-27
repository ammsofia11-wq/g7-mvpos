export type FlavorBase = {
  id: string
  title: string
  protein: "beef" | "chicken" | "fish" | "tuna" | "breakfast"
  role: string
  ingredients: string[]
  prepLogic: string[]
  worksWith: string[]
}

export type WeeklyFlavorSystem = {
  week: string
  title: string
  subtitle: string
  flavorCount: number
  concept: string
  bases: FlavorBase[]
}

export const G7_WEEKLY_FLAVOR_SYSTEMS: WeeklyFlavorSystem[] = [
  {
    week: "WEEK 1",
    title: "Kofta + G7 Spice Foundation",
    subtitle: "2 main flavor bases for easy execution.",
    flavorCount: 2,
    concept:
      "Week 1 teaches the client the easiest G7 method: prepare one beef flavor base and one chicken flavor base, then rotate carbs, sauces, and cooking style.",
    bases: [
      {
        id: "week1-beef-kofta",
        title: "Beef Kofta Base",
        protein: "beef",
        role: "Main beef flavor for all minced beef dishes in Week 1.",
        ingredients: [
          "Red onion",
          "Tomato",
          "Green bell pepper",
          "Sea salt",
          "Black pepper",
          "Seven spices",
        ],
        prepLogic: [
          "Mix all seasoning ingredients into the raw minced beef.",
          "Do not overwork the meat; mix only until seasoning is distributed.",
          "Divide the beef base into weekly portions before cooking.",
          "Change the final dish by changing shape, sauce, carb, and cooking method.",
        ],
        worksWith: [
          "Kofta rice plate",
          "Meatballs penne pasta",
          "Lean hawawshi",
          "Swedish-style meatballs",
          "Kofta stir-fry",
          "Pink bolognese beef pasta",
        ],
      },
      {
        id: "week1-chicken-g7-spices",
        title: "Chicken G7 Spice Base",
        protein: "chicken",
        role: "Main chicken flavor for all chicken dishes in Week 1.",
        ingredients: [
          "Paprika",
          "Onion powder",
          "Garlic powder",
          "Black pepper",
          "Dried oregano",
          "Sea salt",
        ],
        prepLogic: [
          "Season the chicken base with the dry G7 spice mix.",
          "Use the same base across chicken kofta, meatballs, pasta, burger, fajita, and quesadilla.",
          "Keep the chicken moist by cooking on medium heat and avoiding overcooking.",
          "Use sauce and carb rotation to make each dish feel different.",
        ],
        worksWith: [
          "Chicken kofta rice bowl",
          "Chicken meatballs pasta",
          "Chicken quesadilla fit",
          "Chicken pink sauce pasta",
          "Chicken burger fit",
          "Chicken fajita sweet potato",
        ],
      },
      {
        id: "week1-fish-light",
        title: "Light Fish + Tuna Base",
        protein: "fish",
        role: "Simple recovery flavor for lighter meals.",
        ingredients: [
          "Lemon",
          "Garlic",
          "Black pepper",
          "Sea salt",
          "Parsley or dried herbs",
        ],
        prepLogic: [
          "Keep fish and tuna simple in Week 1 to avoid overwhelming the client.",
          "Use lemon-herb fish for fresh reset days.",
          "Use tuna drained from water with tomato sauce, pasta, wrap, or rice.",
        ],
        worksWith: [
          "Tuna pasta light",
          "Tuna protein wrap",
          "Tuna tomato rice",
          "Oven baked fish lemon herb",
        ],
      },
    ],
  },
  {
    week: "WEEK 2",
    title: "New Flavor Drop",
    subtitle: "3 new flavor bases for variety and adherence.",
    flavorCount: 3,
    concept:
      "Week 2 keeps the same meal architecture and gram logic, but changes flavor identity so the client feels they received a new system.",
    bases: [
      {
        id: "week2-beef-smoky-tomato",
        title: "Smoky Tomato Beef Base",
        protein: "beef",
        role: "Second-week beef flavor with deeper sauce direction.",
        ingredients: [
          "Smoked paprika",
          "Tomato paste",
          "Garlic",
          "Black pepper",
          "Cumin",
          "Sea salt",
        ],
        prepLogic: [
          "Use this flavor base for beef dishes that need richer tomato or smoky notes.",
          "Works well with pasta, rice, hawawshi, and stir-fry.",
          "Keep the same raw weight logic; only the flavor profile changes.",
        ],
        worksWith: [
          "Beef pasta",
          "Beef rice bowl",
          "Hawawshi",
          "Kofta stir-fry",
        ],
      },
      {
        id: "week2-chicken-chimichurri",
        title: "Chicken Chimichurri Base",
        protein: "chicken",
        role: "Fresh herb chicken flavor for Week 2.",
        ingredients: [
          "Mixed bell pepper",
          "Garlic",
          "White vinegar",
          "Fresh mint or parsley",
          "Sea salt or pink salt",
          "Black pepper",
        ],
        prepLogic: [
          "Use chimichurri as marinade or finishing sauce.",
          "Works with grilled chicken, chicken rice bowls, wraps, and pasta.",
          "Can also be used with beef or fish if the client wants flavor flexibility.",
        ],
        worksWith: [
          "Chicken rice bowl",
          "Chicken wrap",
          "Chicken pasta",
          "Chicken fajita",
          "Chicken burger",
        ],
      },
      {
        id: "week2-fish-butter-style",
        title: "Fish Butter-Style Flavor Base",
        protein: "fish",
        role: "Comfort-style fish flavor without making the plan heavy.",
        ingredients: [
          "Garlic",
          "Paprika",
          "Light tomato base",
          "Yogurt or dairy-free alternative",
          "Black pepper",
          "Sea salt",
        ],
        prepLogic: [
          "Use this flavor direction for fish, chicken, beef, eggs, chickpeas, or ful medames.",
          "The same sauce idea can change protein without changing the whole system.",
          "Keep sauce controlled so macros remain plan-friendly.",
        ],
        worksWith: [
          "Fish potato plate",
          "Chicken butter-style bowl",
          "Egg shakshuka butter sauce",
          "Vegan chickpeas",
          "Ful medames flavor bowl",
        ],
      },
    ],
  },
]

export function getCurrentFlavorSystem() {
  return G7_WEEKLY_FLAVOR_SYSTEMS[0]
}