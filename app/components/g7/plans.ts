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
  shredding: {
    id: "shredding",

    name: "G7 SHRED",
    arabicName: "تنشيف وحرق دهون",

    subtitle: "Fat Loss & Definition",
    arabicSubtitle: "خفض الدهون وإبراز العضلات",

    kcal: 1700,
    protein: 180,
    carbs: 140,
    fat: "47g",

    price: "75 جنيه",

    accent: "#B7F532",

    description:
      "نظام تنشيف احترافي مبني على بروتين عالي، كارب محسوب، ودهون منخفضة لدعم نزول الدهون مع الحفاظ على الكتلة العضلية.",

    features: [
      "1700 kcal Target",
      "180g Protein / 140g Carbs / 47g Fat",
      "Fat Loss & Definition",
      "High Satiety Meals",
    ],
  },

  lean_bulk: {
    id: "lean_bulk",

    name: "G7 CORE",
    arabicName: "زيادة عضلية نظيفة",

    subtitle: "Clean Muscle Gain",
    arabicSubtitle: "بناء عضلي بأقل دهون",

    kcal: 2200,
    protein: 200,
    carbs: 180,
    fat: "65g",

    price: "75 جنيه",

    accent: "#22D3EE",

    description:
      "نظام رياضي متوازن لبناء عضلي نظيف وتحسين الأداء والطاقة اليومية باستخدام أكل حقيقي وكميات واضحة.",

    features: [
      "2200 kcal Target",
      "200g Protein / 180g Carbs / 65g Fat",
      "Clean Muscle Gain",
      "Performance Recovery Meals",
    ],
  },

  mass_gainer: {
    id: "mass_gainer",

    name: "G7 MASS",
    arabicName: "تضخيم وكتلة عضلية",

    subtitle: "Heavy Muscle Growth",
    arabicSubtitle: "زيادة الوزن والكتلة العضلية",

    kcal: 3200,
    protein: 240,
    carbs: 320,
    fat: "95g",

    price: "100 جنيه",

    accent: "#F59E0B",

    description:
      "نظام تضخيم قوي لزيادة الوزن والكتلة العضلية، مبني على كارب أعلى وبروتين كافي لدعم التمرين والاستشفاء.",

    features: [
      "3200 kcal Target",
      "240g Protein / 320g Carbs / 95g Fat",
      "Heavy Carb Loading",
      "Muscle Growth Support",
    ],
  },

  budget_athlete: {
    id: "budget_athlete",

    name: "G7 FLEX",
    arabicName: "نظام رياضي مرن",

    subtitle: "Budget Friendly Muscle Plan",
    arabicSubtitle: "أفضل قيمة مقابل السعر",

    kcal: 2100,
    protein: 170,
    carbs: 200,
    fat: "65g",

    price: "50 جنيه",

    accent: "#10B981",

    description:
      "نظام اقتصادي ذكي للرياضيين باستخدام مكونات عملية ومتوفرة، مناسب للالتزام اليومي وبناء جسم أفضل بتكلفة أقل.",

    features: [
      "2100 kcal Target",
      "170g Protein / 200g Carbs / 65g Fat",
      "Budget Protein Swaps",
      "Simple Meal Prep",
    ],
  },

  premium_chef: {
    id: "premium_chef",

    name: "G7 PREMIUM",
    arabicName: "تجربة شيف متقدمة",

    subtitle: "VIP Chef Transformation",
    arabicSubtitle: "نسخة احترافية مخصصة",

    kcal: 2400,
    protein: 220,
    carbs: 220,
    fat: "75g",

    price: "150 جنيه",

    accent: "#EAB308",

    description:
      "نسخة شيف احترافية بجودة أعلى في النكهات، تنويع أكبر، وتجربة غذائية مميزة مبنية على هدفك الرياضي.",

    features: [
      "2400 kcal Target",
      "220g Protein / 220g Carbs / 75g Fat",
      "Premium Recipe Experience",
      "Advanced Culinary System",
    ],
  },
}