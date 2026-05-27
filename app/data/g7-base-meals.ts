export type G7MealType = "breakfast" | "lunch" | "dinner"

export type G7PlanId =
  | "fat_loss"
  | "lean_bulk"
  | "athlete"
  | "keto"
  | "diabetic"
  | "vegan"
  | "gf_df"
  | "carnivore"

export type G7FlavorId =
  | "middle_eastern_performance"
  | "mexican_fire"
  | "asian_soy_ginger"
  | "italian_lean"
  | "egyptian_home_fit"
  | "bbq_smoke"
  | "indian_spice"
  | "gulf_clean"

export type G7Ingredient = {
  name: string
  grams?: number
  unit?: string
  category: "protein" | "carb" | "fat" | "vegetable" | "fruit" | "sauce" | "extra"
  note?: string
}

export type G7MacroTarget = {
  kcal: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export type G7SopStep = {
  title: string
  instruction: string
}

export type G7ProteinCore =
  | "eggs"
  | "oats"
  | "protein_shake"
  | "chicken_core"
  | "beef_core"
  | "tuna_core"
  | "fish_core"

export type G7CarbCore =
  | "none"
  | "rice"
  | "pasta"
  | "whole_wheat_bread"
  | "burger_bun"
  | "sweet_potato"
  | "potato"
  | "oats"

export type G7SauceCore =
  | "none"
  | "cucumber_yogurt"
  | "tomato_sauce"
  | "pink_sauce"
  | "burger_sauce"
  | "tahini"
  | "white_sauce"
  | "quesadilla_sauce"
  | "fajita_sauce"

export type G7BaseMeal = {
  id: string
  day: number
  mealType: G7MealType
  title: string
  subtitle: string
  baseCalories: number
  baseMacros: G7MacroTarget
  ingredients: G7Ingredient[]
  sop: G7SopStep[]
  compatiblePlans: G7PlanId[]
  flavorReady: G7FlavorId[]
  aiTags: string[]
  avoidIf?: string[]
  imagePrompt: string

  proteinCore?: G7ProteinCore
  transformation?: string
  carbCore?: G7CarbCore
  sauceCore?: G7SauceCore
  cookedProteinTarget?: number
  cookedCarbTarget?: number
  maxFat?: number
  rawProteinNeeded?: number
  rawCarbNeeded?: number
  productionNote?: string
}

const gymPlans: G7PlanId[] = ["fat_loss", "lean_bulk", "athlete", "diabetic", "gf_df"]

const weeklyFlavors: G7FlavorId[] = [
  "middle_eastern_performance",
  "mexican_fire",
  "italian_lean",
  "egyptian_home_fit",
  "bbq_smoke",
  "gulf_clean",
]

export const G7_BASE_MEALS: G7BaseMeal[] = [
  {
    id: "day-1-eggs-breakfast",
    day: 1,
    mealType: "breakfast",
    title: "G7 Egg Power Breakfast",
    subtitle: "High satiety egg breakfast for gym clients",
    baseCalories: 390,
    baseMacros: { kcal: 390, protein: 35, carbs: 35, fat: 10, fiber: 5 },
    proteinCore: "eggs",
    carbCore: "whole_wheat_bread",
    sauceCore: "none",
    cookedProteinTarget: 45,
    cookedCarbTarget: 35,
    maxFat: 12,
    ingredients: [
      { name: "Whole Eggs", unit: "2 eggs", category: "protein" },
      { name: "Egg Whites", grams: 150, category: "protein" },
      { name: "Whole Wheat Bread", unit: "1 slice", category: "carb" },
      { name: "Tomato & Cucumber", grams: 150, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Eggs", instruction: "اطبخ البيض والبياض في طاسة non-stick بملح وفلفل." },
      { title: "Prepare Side", instruction: "جهز خيار وطماطم مع رشة ملح بحري." },
      { title: "Serve", instruction: "قدّم البيض مع شريحة عيش حبة كاملة والخضار." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "eggs", "satiety", "low_fat"],
    imagePrompt: "premium egg fitness breakfast with tomatoes and cucumber, dark G7 style",
  },

  {
    id: "day-1-chicken-kofta-rice-yogurt",
    day: 1,
    mealType: "lunch",
    title: "Chicken Kofta Basmati Bowl",
    subtitle: "G7 chicken core with basmati rice and cucumber yogurt sauce",
    baseCalories: 650,
    baseMacros: { kcal: 650, protein: 62, carbs: 60, fat: 9, fiber: 5 },
    proteinCore: "chicken_core",
    transformation: "kofta",
    carbCore: "rice",
    sauceCore: "cucumber_yogurt",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 50,
    productionNote: "Part of 2kg raw chicken breast G7 spice blend batch.",
    ingredients: [
      { name: "Chicken Breast", grams: 280, category: "protein", note: "raw weight for ~200g cooked" },
      { name: "Basmati Rice", grams: 50, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Cucumber Yogurt Sauce", grams: 60, category: "sauce" },
      { name: "Parsley Salad", grams: 100, category: "vegetable" },
    ],
    sop: [
      { title: "Prepare Chicken Core", instruction: "افرم صدور الدجاج مع G7 spice blend: بابريكا، ثوم بودرة، بصل بودرة، أوريجانو، فلفل أسمر، ملح بحري." },
      { title: "Shape Kofta", instruction: "قسّم الخليط وشكّله كفتة صغيرة." },
      { title: "Cook", instruction: "اشوي أو سوّي في طاسة non-stick لحد النضج." },
      { title: "Assemble", instruction: "قدّم مع الأرز البسمتي وصوص الزبادي بالخيار." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["chicken_core", "rice", "kofta", "egyptian_market", "low_fat"],
    imagePrompt: "chicken kofta basmati rice bowl with cucumber yogurt sauce premium fitness meal",
  },

  {
    id: "day-1-beef-kofta-rice-tahini",
    day: 1,
    mealType: "dinner",
    title: "Beef Kofta Rice Bowl",
    subtitle: "Lean beef kofta with basmati rice and light tahini",
    baseCalories: 670,
    baseMacros: { kcal: 670, protein: 58, carbs: 60, fat: 10, fiber: 5 },
    proteinCore: "beef_core",
    transformation: "kofta",
    carbCore: "rice",
    sauceCore: "tahini",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 50,
    productionNote: "Part of 2kg lean minced beef oriental kofta batch.",
    ingredients: [
      { name: "Lean Minced Beef", grams: 280, category: "protein", note: "raw weight for ~200g cooked" },
      { name: "Basmati Rice", grams: 50, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Light Tahini Sauce", grams: 35, category: "sauce" },
      { name: "Green Salad", grams: 120, category: "vegetable" },
    ],
    sop: [
      { title: "Prepare Beef Core", instruction: "اخلط اللحم المفروم قليل الدهون مع بصل، طماطم، فلفل أخضر، بهارات، ملح وفلفل." },
      { title: "Shape Kofta", instruction: "شكّل الكفتة أصابع أو كرات حسب الوجبة." },
      { title: "Cook", instruction: "اشوي أو سوّي في طاسة non-stick بدون دهون زيادة." },
      { title: "Assemble", instruction: "قدّم مع الأرز البسمتي وصوص الطحينة الخفيف." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["middle_eastern_performance", "egyptian_home_fit", "bbq_smoke", "gulf_clean"],
    aiTags: ["beef_core", "rice", "kofta", "low_fat", "egyptian_market"],
    imagePrompt: "lean beef kofta rice bowl with light tahini sauce premium dark fitness food",
  },

  {
    id: "day-2-oats-breakfast",
    day: 2,
    mealType: "breakfast",
    title: "Protein Oats Bowl",
    subtitle: "Training energy oats breakfast",
    baseCalories: 430,
    baseMacros: { kcal: 430, protein: 35, carbs: 55, fat: 8, fiber: 8 },
    proteinCore: "oats",
    carbCore: "oats",
    sauceCore: "none",
    cookedProteinTarget: 35,
    cookedCarbTarget: 55,
    maxFat: 10,
    ingredients: [
      { name: "Oats", grams: 70, category: "carb" },
      { name: "Whey Protein", unit: "1 scoop", category: "protein" },
      { name: "Banana", grams: 80, category: "fruit" },
      { name: "Cinnamon", grams: 2, category: "extra" },
    ],
    sop: [
      { title: "Cook Oats", instruction: "اطبخ الشوفان بالماء لحد ما يبقى كريمي." },
      { title: "Add Protein", instruction: "اطفي النار وضيف البروتين تدريجيًا مع التقليب." },
      { title: "Finish", instruction: "ضيف موز وقرفة حسب الخطة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "oats", "training_energy"],
    imagePrompt: "protein oats bowl with banana and cinnamon premium G7 style",
  },

  {
    id: "day-2-chicken-meatballs-pasta",
    day: 2,
    mealType: "lunch",
    title: "Chicken Meatballs Tomato Penne",
    subtitle: "Chicken core meatballs with tomato sauce and whole wheat penne",
    baseCalories: 680,
    baseMacros: { kcal: 680, protein: 62, carbs: 70, fat: 9, fiber: 7 },
    proteinCore: "chicken_core",
    transformation: "meatballs",
    carbCore: "pasta",
    sauceCore: "tomato_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 63,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein", note: "raw chicken core portion" },
      { name: "Whole Wheat Penne", grams: 63, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Tomato Sauce", grams: 120, category: "sauce" },
      { name: "Green Pepper", grams: 80, category: "vegetable" },
    ],
    sop: [
      { title: "Shape Meatballs", instruction: "خد جزء من خليط الدجاج واعمله كرات صغيرة." },
      { title: "Cook Sauce", instruction: "سخّن صوص الطماطم مع ثوم وفلفل أسمر وأوريجانو." },
      { title: "Cook Pasta", instruction: "اسلق الباستا ووزنها مطبوخة حسب الخطة." },
      { title: "Combine", instruction: "حط كرات الدجاج في الصوص وقدّمها مع الباستا." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["italian_lean", "middle_eastern_performance", "egyptian_home_fit"],
    aiTags: ["chicken_core", "pasta", "meatballs", "tomato_sauce"],
    imagePrompt: "chicken meatballs with tomato sauce and whole wheat penne premium fitness meal",
  },

  {
    id: "day-2-beef-meatballs-pasta",
    day: 2,
    mealType: "dinner",
    title: "Beef Kofta Meatballs Penne",
    subtitle: "Lean beef meatballs with penne pasta",
    baseCalories: 700,
    baseMacros: { kcal: 700, protein: 58, carbs: 70, fat: 10, fiber: 7 },
    proteinCore: "beef_core",
    transformation: "meatballs",
    carbCore: "pasta",
    sauceCore: "tomato_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 63,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein", note: "raw beef core portion" },
      { name: "Whole Wheat Penne", grams: 63, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Tomato Sauce", grams: 120, category: "sauce" },
      { name: "Parsley", grams: 20, category: "vegetable" },
    ],
    sop: [
      { title: "Shape Meatballs", instruction: "شكّل خليط اللحم كرات متوسطة." },
      { title: "Cook Beef", instruction: "سوّي كرات اللحم في طاسة non-stick." },
      { title: "Add Sauce", instruction: "ضيف صوص الطماطم وخليه يتسبك." },
      { title: "Serve", instruction: "قدّم مع الباستا المسلوقة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["italian_lean", "middle_eastern_performance", "egyptian_home_fit"],
    aiTags: ["beef_core", "pasta", "meatballs"],
    imagePrompt: "lean beef meatballs with penne pasta premium fitness meal dark background",
  },

  {
    id: "day-3-eggs-breakfast",
    day: 3,
    mealType: "breakfast",
    title: "Eggs & Potato Fitness Plate",
    subtitle: "Egg breakfast with controlled potato carbs",
    baseCalories: 410,
    baseMacros: { kcal: 410, protein: 35, carbs: 40, fat: 10, fiber: 6 },
    proteinCore: "eggs",
    carbCore: "potato",
    sauceCore: "none",
    cookedProteinTarget: 45,
    cookedCarbTarget: 40,
    maxFat: 12,
    ingredients: [
      { name: "Whole Eggs", unit: "2 eggs", category: "protein" },
      { name: "Egg Whites", grams: 150, category: "protein" },
      { name: "Potato", grams: 180, category: "carb", note: "raw weight" },
      { name: "Bell Pepper", grams: 80, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Potato", instruction: "قطّع البطاطس مكعبات وسوّيها في air fryer أو طاسة non-stick." },
      { title: "Cook Eggs", instruction: "اطبخ البيض والبياض مع الفلفل الرومي." },
      { title: "Serve", instruction: "قدّمهم مع خضار طازة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "eggs", "potato", "satiety"],
    imagePrompt: "eggs and potato fitness breakfast plate premium dark G7 style",
  },

  {
    id: "day-3-chicken-quesadilla",
    day: 3,
    mealType: "lunch",
    title: "Chicken Quesadilla Fit",
    subtitle: "Flattened chicken core with whole wheat bread and light mozzarella",
    baseCalories: 690,
    baseMacros: { kcal: 690, protein: 62, carbs: 65, fat: 10, fiber: 6 },
    proteinCore: "chicken_core",
    transformation: "quesadilla_flattened",
    carbCore: "whole_wheat_bread",
    sauceCore: "quesadilla_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein", note: "raw chicken core portion" },
      { name: "Whole Wheat Tortilla", unit: "2 medium wraps", category: "carb" },
      { name: "Light Mozzarella", grams: 25, category: "extra" },
      { name: "Green Pepper & Coriander", grams: 80, category: "vegetable" },
    ],
    sop: [
      { title: "Flatten Chicken", instruction: "افرد خليط الدجاج في الصينية كطبقة رفيعة مقسمة." },
      { title: "Cook", instruction: "سوّي الدجاج لحد ما يمسك ويتحمر خفيف." },
      { title: "Build Quesadilla", instruction: "حط الدجاج مع العيش الحبة الكاملة وموتزاريلا خفيفة وكزبرة وفلفل." },
      { title: "Toast", instruction: "حمّرها على الجريل أو طاسة non-stick." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["mexican_fire", "bbq_smoke", "egyptian_home_fit"],
    aiTags: ["chicken_core", "quesadilla", "street_food_fit"],
    imagePrompt: "healthy chicken quesadilla with coriander and peppers premium fitness food",
  },

  {
    id: "day-3-beef-hawawshi-fit",
    day: 3,
    mealType: "dinner",
    title: "Lean Beef Hawawshi Fit",
    subtitle: "Egyptian street-food illusion with lean beef core",
    baseCalories: 700,
    baseMacros: { kcal: 700, protein: 58, carbs: 65, fat: 10, fiber: 6 },
    proteinCore: "beef_core",
    transformation: "hawawshi",
    carbCore: "whole_wheat_bread",
    sauceCore: "none",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein", note: "raw beef core portion" },
      { name: "Baladi Bread", unit: "1 medium loaf", category: "carb" },
      { name: "Green Salad", grams: 150, category: "vegetable" },
      { name: "Pickles", grams: 40, category: "extra" },
    ],
    sop: [
      { title: "Fill Bread", instruction: "افرد خليط اللحم المتبل داخل العيش البلدي." },
      { title: "Bake", instruction: "ادخله الفرن أو air fryer لحد ما يستوي ويتحمص." },
      { title: "Control Fat", instruction: "استخدم لحم قليل الدهون وما تزودش زيت." },
      { title: "Serve", instruction: "قدّم مع سلطة خضرا." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["egyptian_home_fit", "middle_eastern_performance", "bbq_smoke"],
    aiTags: ["beef_core", "hawawshi", "egyptian_market", "craving_control"],
    imagePrompt: "healthy lean beef hawawshi with green salad premium G7 style",
  },

  {
    id: "day-4-protein-shake-breakfast",
    day: 4,
    mealType: "breakfast",
    title: "G7 Protein Shake",
    subtitle: "Fast breakfast for light day balance",
    baseCalories: 330,
    baseMacros: { kcal: 330, protein: 35, carbs: 35, fat: 5, fiber: 4 },
    proteinCore: "protein_shake",
    carbCore: "oats",
    sauceCore: "none",
    cookedProteinTarget: 35,
    cookedCarbTarget: 35,
    maxFat: 8,
    ingredients: [
      { name: "Whey Protein", unit: "1 scoop", category: "protein" },
      { name: "Oats", grams: 40, category: "carb" },
      { name: "Banana", grams: 60, category: "fruit" },
      { name: "Water or Low-Fat Milk", unit: "as needed", category: "extra" },
    ],
    sop: [
      { title: "Blend", instruction: "اخلط البروتين مع الشوفان والموز والماء أو لبن قليل الدسم." },
      { title: "Serve", instruction: "يتشرب فورًا كفطار سريع." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "protein_shake", "fast", "light_day"],
    imagePrompt: "premium protein shake with oats and banana G7 fitness style",
  },

  {
    id: "day-4-chicken-pink-pasta",
    day: 4,
    mealType: "lunch",
    title: "Chicken Pink Sauce Pasta",
    subtitle: "Chicken core with controlled white-red pink sauce",
    baseCalories: 700,
    baseMacros: { kcal: 700, protein: 62, carbs: 70, fat: 10, fiber: 6 },
    proteinCore: "chicken_core",
    transformation: "crumbled_pasta",
    carbCore: "pasta",
    sauceCore: "pink_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 63,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein", note: "raw chicken core portion" },
      { name: "Pasta", grams: 63, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Light Pink Sauce", grams: 100, category: "sauce" },
      { name: "Mushroom or Pepper", grams: 100, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Chicken", instruction: "فتت خليط الدجاج في الطاسة كأنه بولونيز." },
      { title: "Make Pink Sauce", instruction: "اخلط صوص طماطم مع صوص أبيض خفيف بنسب محسوبة." },
      { title: "Cook Pasta", instruction: "اسلق الباستا ووزنها مطبوخة." },
      { title: "Combine", instruction: "قلّب الدجاج مع الصوص والباستا." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["italian_lean", "mexican_fire", "bbq_smoke"],
    aiTags: ["chicken_core", "pink_sauce", "pasta", "comfort_food"],
    imagePrompt: "chicken pink sauce pasta premium fitness meal dark background",
  },

  {
    id: "day-4-beef-stir-fry-rice",
    day: 4,
    mealType: "dinner",
    title: "Beef Kofta Stir-Fry Rice",
    subtitle: "Lean beef core stir-fry with basmati rice",
    baseCalories: 680,
    baseMacros: { kcal: 680, protein: 58, carbs: 60, fat: 10, fiber: 6 },
    proteinCore: "beef_core",
    transformation: "stir_fry",
    carbCore: "rice",
    sauceCore: "fajita_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 50,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein", note: "raw beef core portion" },
      { name: "Basmati Rice", grams: 50, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Colored Peppers & Red Onion", grams: 150, category: "vegetable" },
      { name: "Light Stir-Fry Sauce", grams: 40, category: "sauce" },
    ],
    sop: [
      { title: "Cook Beef", instruction: "سوّي خليط اللحم كقطع صغيرة أو crumbles." },
      { title: "Add Vegetables", instruction: "ضيف فلفل ألوان وبصل أحمر وقلب بسرعة." },
      { title: "Add Rice", instruction: "قدّم فوق الأرز البسمتي." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["middle_eastern_performance", "asian_soy_ginger", "bbq_smoke"],
    aiTags: ["beef_core", "rice", "stir_fry"],
    imagePrompt: "lean beef stir fry with basmati rice peppers and red onion premium fitness food",
  },

  {
    id: "day-5-eggs-breakfast",
    day: 5,
    mealType: "breakfast",
    title: "Egg White Omelette Plate",
    subtitle: "Low-fat high-protein omelette breakfast",
    baseCalories: 380,
    baseMacros: { kcal: 380, protein: 38, carbs: 32, fat: 9, fiber: 5 },
    proteinCore: "eggs",
    carbCore: "whole_wheat_bread",
    sauceCore: "none",
    cookedProteinTarget: 45,
    cookedCarbTarget: 32,
    maxFat: 10,
    ingredients: [
      { name: "Egg Whites", grams: 220, category: "protein" },
      { name: "Whole Egg", unit: "1 egg", category: "protein" },
      { name: "Whole Wheat Bread", unit: "1 slice", category: "carb" },
      { name: "Mushroom & Pepper", grams: 120, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Omelette", instruction: "اطبخ البياض مع بيضة كاملة وخضار في طاسة non-stick." },
      { title: "Serve", instruction: "قدّم مع شريحة عيش حبة كاملة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "eggs", "omelette", "low_fat"],
    imagePrompt: "egg white omelette fitness breakfast with whole wheat bread premium style",
  },

  {
    id: "day-5-chicken-burger",
    day: 5,
    mealType: "lunch",
    title: "Chicken Burger Fit",
    subtitle: "Chicken core patty with burger sauce, lettuce, tomato and brown bun",
    baseCalories: 690,
    baseMacros: { kcal: 690, protein: 62, carbs: 62, fat: 10, fiber: 6 },
    proteinCore: "chicken_core",
    transformation: "burger_patty",
    carbCore: "burger_bun",
    sauceCore: "burger_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein", note: "raw chicken core portion" },
      { name: "Brown Burger Bun", unit: "1 bun", category: "carb" },
      { name: "Light Burger Sauce", grams: 35, category: "sauce" },
      { name: "Lettuce & Tomato", grams: 120, category: "vegetable" },
    ],
    sop: [
      { title: "Shape Patty", instruction: "شكّل خليط الدجاج برجر باتي." },
      { title: "Cook Patty", instruction: "اشوي أو سوّي في طاسة non-stick لحد النضج." },
      { title: "Build Burger", instruction: "حط خس وطماطم وصوص برجر خفيف داخل خبز بني." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["bbq_smoke", "mexican_fire", "egyptian_home_fit"],
    aiTags: ["chicken_core", "burger", "craving_control"],
    imagePrompt: "healthy chicken burger with lettuce tomato brown bun premium fitness food",
  },

  {
    id: "day-5-beef-kofta-yogurt-rice",
    day: 5,
    mealType: "dinner",
    title: "Beef Kofta Yogurt Rice Bowl",
    subtitle: "Lean beef kofta rice with yogurt sauce",
    baseCalories: 670,
    baseMacros: { kcal: 670, protein: 58, carbs: 60, fat: 10, fiber: 5 },
    proteinCore: "beef_core",
    transformation: "kofta_rice_bowl",
    carbCore: "rice",
    sauceCore: "cucumber_yogurt",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 50,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein" },
      { name: "Basmati Rice", grams: 50, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Yogurt Sauce", grams: 60, category: "sauce" },
      { name: "Green Salad", grams: 120, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Kofta", instruction: "سوّي الكفتة في طاسة أو جريل." },
      { title: "Prepare Rice", instruction: "جهز الأرز البسمتي بالوزن المطلوب." },
      { title: "Assemble", instruction: "قدّم الكفتة فوق الأرز مع صوص زبادي وسلطة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["middle_eastern_performance", "egyptian_home_fit", "gulf_clean"],
    aiTags: ["beef_core", "kofta", "rice", "yogurt_sauce"],
    imagePrompt: "lean beef kofta rice bowl with yogurt sauce premium dark fitness food",
  },

  {
    id: "day-6-oats-breakfast",
    day: 6,
    mealType: "breakfast",
    title: "Chocolate Protein Oats",
    subtitle: "Sweet controlled oats breakfast",
    baseCalories: 430,
    baseMacros: { kcal: 430, protein: 35, carbs: 55, fat: 8, fiber: 8 },
    proteinCore: "oats",
    carbCore: "oats",
    sauceCore: "none",
    cookedProteinTarget: 35,
    cookedCarbTarget: 55,
    maxFat: 10,
    ingredients: [
      { name: "Oats", grams: 70, category: "carb" },
      { name: "Whey Protein", unit: "1 scoop", category: "protein" },
      { name: "Cocoa Powder", grams: 8, category: "extra" },
      { name: "Banana", grams: 80, category: "fruit" },
    ],
    sop: [
      { title: "Cook Oats", instruction: "اطبخ الشوفان بالماء." },
      { title: "Add Cocoa Protein", instruction: "ضيف البروتين والكاكاو بعد ما تطفي النار." },
      { title: "Serve", instruction: "ضيف موز حسب الخطة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "oats", "sweet", "chocolate"],
    imagePrompt: "chocolate protein oats bowl premium G7 fitness breakfast",
  },

  {
    id: "day-6-chicken-fajita-sweet-potato",
    day: 6,
    mealType: "lunch",
    title: "Chicken Fajita Sweet Potato",
    subtitle: "Chicken core fajita with peppers, red onion and sweet potato",
    baseCalories: 680,
    baseMacros: { kcal: 680, protein: 62, carbs: 62, fat: 9, fiber: 8 },
    proteinCore: "chicken_core",
    transformation: "fajita",
    carbCore: "sweet_potato",
    sauceCore: "fajita_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein" },
      { name: "Sweet Potato", grams: 180, category: "carb", note: "raw weight target adjusted by plan" },
      { name: "Colored Peppers & Red Onion", grams: 180, category: "vegetable" },
      { name: "Fajita Sauce", grams: 35, category: "sauce" },
    ],
    sop: [
      { title: "Prepare Fajita", instruction: "قطّع خليط الدجاج أو شكّله شرائح مع فلفل ألوان وبصل أحمر." },
      { title: "Cook", instruction: "سوّي في طاسة ساخنة non-stick مع بهارات فاهيتا." },
      { title: "Cook Sweet Potato", instruction: "اشوي البطاطا الحلوة أو air fryer." },
      { title: "Serve", instruction: "قدّم الفاهيتا مع البطاطا الحلوة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["mexican_fire", "bbq_smoke", "middle_eastern_performance"],
    aiTags: ["chicken_core", "fajita", "sweet_potato"],
    imagePrompt: "chicken fajita with sweet potato peppers and red onion premium fitness meal",
  },

  {
    id: "day-6-beef-quesadilla",
    day: 6,
    mealType: "dinner",
    title: "Beef Quesadilla Fit",
    subtitle: "Lean beef core quesadilla with peppers and light cheese",
    baseCalories: 700,
    baseMacros: { kcal: 700, protein: 58, carbs: 65, fat: 10, fiber: 6 },
    proteinCore: "beef_core",
    transformation: "quesadilla",
    carbCore: "whole_wheat_bread",
    sauceCore: "quesadilla_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein" },
      { name: "Whole Wheat Tortilla", unit: "2 medium wraps", category: "carb" },
      { name: "Light Mozzarella", grams: 25, category: "extra" },
      { name: "Peppers & Coriander", grams: 90, category: "vegetable" },
    ],
    sop: [
      { title: "Cook Beef", instruction: "سوّي اللحم المتبل مع فلفل وبصل." },
      { title: "Build Quesadilla", instruction: "حط اللحم داخل التورتيلا مع موتزاريلا خفيفة وكزبرة." },
      { title: "Toast", instruction: "حمّرها في طاسة أو جريل." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["mexican_fire", "bbq_smoke", "egyptian_home_fit"],
    aiTags: ["beef_core", "quesadilla", "street_food_fit"],
    imagePrompt: "lean beef quesadilla with peppers and light cheese premium fitness food",
  },

  {
    id: "day-7-eggs-breakfast",
    day: 7,
    mealType: "breakfast",
    title: "G7 Shakshuka Eggs",
    subtitle: "Egyptian-style eggs with controlled carbs",
    baseCalories: 390,
    baseMacros: { kcal: 390, protein: 35, carbs: 35, fat: 10, fiber: 6 },
    proteinCore: "eggs",
    carbCore: "whole_wheat_bread",
    sauceCore: "tomato_sauce",
    cookedProteinTarget: 45,
    cookedCarbTarget: 35,
    maxFat: 12,
    ingredients: [
      { name: "Whole Eggs", unit: "2 eggs", category: "protein" },
      { name: "Egg Whites", grams: 150, category: "protein" },
      { name: "Tomato Sauce", grams: 120, category: "sauce" },
      { name: "Whole Wheat Bread", unit: "1 slice", category: "carb" },
    ],
    sop: [
      { title: "Cook Sauce", instruction: "سخّن صوص الطماطم مع فلفل وكمون بسيط." },
      { title: "Add Eggs", instruction: "ضيف البيض والبياض وسيبه يستوي." },
      { title: "Serve", instruction: "قدّم مع شريحة عيش حبة كاملة." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["breakfast", "eggs", "shakshuka", "egyptian_market"],
    imagePrompt: "healthy shakshuka eggs breakfast premium G7 style",
  },

  {
    id: "day-7-chicken-core-rice-bowl",
    day: 7,
    mealType: "lunch",
    title: "Chicken Core Rice Bowl",
    subtitle: "Simple final chicken bowl with vegetables and sauce rotation",
    baseCalories: 650,
    baseMacros: { kcal: 650, protein: 62, carbs: 60, fat: 9, fiber: 6 },
    proteinCore: "chicken_core",
    transformation: "final_core_bowl",
    carbCore: "rice",
    sauceCore: "cucumber_yogurt",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    rawCarbNeeded: 50,
    ingredients: [
      { name: "Chicken Breast Core", grams: 280, category: "protein" },
      { name: "Basmati Rice", grams: 50, category: "carb", note: "raw weight for ~150g cooked" },
      { name: "Mixed Salad", grams: 150, category: "vegetable" },
      { name: "Weekly Sauce Core", grams: 50, category: "sauce" },
    ],
    sop: [
      { title: "Cook Chicken", instruction: "استخدم آخر portion من chicken core وشكّله أو فتته حسب الصوص الأسبوعي." },
      { title: "Prepare Rice", instruction: "جهز الأرز بالوزن المطلوب." },
      { title: "Assemble", instruction: "قدّم مع السلطة والصوص المختار للأسبوع." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: weeklyFlavors,
    aiTags: ["chicken_core", "rice", "weekly_sauce_rotation"],
    imagePrompt: "chicken rice bowl with weekly sauce rotation premium fitness meal",
  },

  {
    id: "day-7-beef-potato-hash",
    day: 7,
    mealType: "dinner",
    title: "Ground Beef Potato Hash",
    subtitle: "Lean beef with sweet and regular potato, red onion and peppers",
    baseCalories: 700,
    baseMacros: { kcal: 700, protein: 58, carbs: 65, fat: 10, fiber: 8 },
    proteinCore: "beef_core",
    transformation: "potato_hash",
    carbCore: "potato",
    sauceCore: "fajita_sauce",
    cookedProteinTarget: 200,
    cookedCarbTarget: 150,
    maxFat: 10,
    rawProteinNeeded: 280,
    ingredients: [
      { name: "Lean Beef Core", grams: 280, category: "protein" },
      { name: "Sweet Potato & Regular Potato", grams: 220, category: "carb", note: "raw mixed potato weight adjusted by plan" },
      { name: "Red Onion & Peppers", grams: 160, category: "vegetable" },
      { name: "Light Sauce Core", grams: 35, category: "sauce" },
    ],
    sop: [
      { title: "Cook Potato", instruction: "قطّع البطاطا والبطاطس مكعبات وسوّيهم في air fryer أو الفرن." },
      { title: "Cook Beef", instruction: "سوّي اللحم مع بصل أحمر وفلفل ألوان." },
      { title: "Combine", instruction: "قلّب البطاطس مع اللحم والخضار وقدّمها hot hash." },
    ],
    compatiblePlans: gymPlans,
    flavorReady: ["bbq_smoke", "mexican_fire", "egyptian_home_fit", "middle_eastern_performance"],
    aiTags: ["beef_core", "potato_hash", "comfort_food", "low_fat"],
    imagePrompt: "lean ground beef potato hash with red onion and peppers premium fitness meal",
  },
]

export function getBaseMealsByDay(day: number) {
  return G7_BASE_MEALS.filter((meal) => meal.day === day)
}

export function getBaseMealsByPlan(planId: G7PlanId) {
  return G7_BASE_MEALS.filter((meal) => meal.compatiblePlans.includes(planId))
}

export function getBaseMealsByFlavor(flavorId: G7FlavorId) {
  return G7_BASE_MEALS.filter((meal) => meal.flavorReady.includes(flavorId))
}

export function getBaseMealById(id: string) {
  return G7_BASE_MEALS.find((meal) => meal.id === id)
}