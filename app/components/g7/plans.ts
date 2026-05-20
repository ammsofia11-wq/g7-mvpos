export type PlanKey =
  | "lean_bulk"
  | "shredding"
  | "mass_gainer"
  | "budget_athlete"
  | "premium_chef"

export type G7Plan = {
  id: PlanKey

  name: string
  arabicName: string

  subtitle: string
  arabicSubtitle: string

  kcal: number
  protein: number
  carbs: number
  fat: string

  price: string

  accent: string

  description: string

  features: string[]
}

export const G7_PLANS: Record<PlanKey, G7Plan> = {
  lean_bulk: {
    id: "lean_bulk",

    name: "Lean Bulk",
    arabicName: "زيادة عضلية نظيفة",

    subtitle: "Clean Muscle Gain",
    arabicSubtitle: "بناء عضلي بأقل دهون",

    kcal: 2200,
    protein: 200,
    carbs: 180,
    fat: "Controlled",

    price: "50 جنيه",

    accent: "#22D3EE",

    description:
      "نظام لبناء العضلات بشكل نظيف مع الحفاظ على الأداء والطاقة اليومية.",

    features: [
      "High Protein Structure",
      "Chef-Based Flavor Rotation",
      "Weekly Smart Prep",
      "Performance Recovery Meals",
    ],
  },

  shredding: {
    id: "shredding",

    name: "Shredding",
    arabicName: "تنشيف وحرق دهون",

    subtitle: "Fat Loss & Definition",
    arabicSubtitle: "خفض الدهون وإبراز العضلات",

    kcal: 1700,
    protein: 180,
    carbs: 140,
    fat: "Low",

    price: "75 جنيه",

    accent: "#B7F532",

    description:
      "نظام تنشيف احترافي لحرق الدهون مع الحفاظ على الكتلة العضلية.",

    features: [
      "Controlled Calories",
      "High Satiety Meals",
      "Fast Weekly Prep",
      "Transformation Focus",
    ],
  },

  mass_gainer: {
    id: "mass_gainer",

    name: "Mass Gainer",
    arabicName: "تضخيم وكتلة عضلية",

    subtitle: "Heavy Muscle Growth",
    arabicSubtitle: "زيادة الوزن والكتلة العضلية",

    kcal: 3200,
    protein: 240,
    carbs: 320,
    fat: "Performance",

    price: "100 جنيه",

    accent: "#F59E0B",

    description:
      "نظام تضخيم قوي لزيادة الكتلة العضلية وتحسين القوة والاستشفاء.",

    features: [
      "Mass Gain Meals",
      "Heavy Carb Loading",
      "Athlete Recovery",
      "Performance Cooking",
    ],
  },

  budget_athlete: {
    id: "budget_athlete",

    name: "Budget Athlete",
    arabicName: "نظام اقتصادي للرياضيين",

    subtitle: "Budget Friendly Muscle Plan",
    arabicSubtitle: "أفضل قيمة مقابل السعر",

    kcal: 2100,
    protein: 170,
    carbs: 200,
    fat: "Balanced",

    price: "50 جنيه",

    accent: "#10B981",

    description:
      "نظام اقتصادي ذكي باستخدام مكونات مصرية عملية وسهلة التنفيذ.",

    features: [
      "Budget Protein Swaps",
      "80/20 Ingredient System",
      "Simple Meal Prep",
      "Low Cost Weekly Structure",
    ],
  },

  premium_chef: {
    id: "premium_chef",

    name: "Premium Chef Edition",
    arabicName: "تجربة تغذية شيف احترافية",

    subtitle: "VIP Chef Transformation",
    arabicSubtitle: "نسخة احترافية مخصصة",

    kcal: 2400,
    protein: 210,
    carbs: 220,
    fat: "Premium",

    price: "100 جنيه",

    accent: "#EAB308",

    description:
      "تجربة شيف احترافية مخصصة بأعلى جودة للنكهات والوجبات والتحويل الجسدي.",

    features: [
      "Custom Flavor Profiles",
      "Premium Recipe Experience",
      "Personalized PDF System",
      "VIP Culinary Coaching",
    ],
  },
}