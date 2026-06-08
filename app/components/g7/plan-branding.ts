import { PlanKey } from "./plans"

export type G7PublicPlanBrand = {
  id: PlanKey
  publicName: string
  publicArabicName: string
  internalName: string
  badge: string
  shortLabel: string
  description: string
  price: string
  kcalLabel: string
  proteinLabel: string
  carbsLabel: string
  fatLabel: string
}

export const G7_PLAN_BRANDING: Record<PlanKey, G7PublicPlanBrand> = {
  shredding: {
    id: "shredding",
    publicName: "G7 SHRED",
    publicArabicName: "تنشيف وحرق دهون",
    internalName: "G7 SHRED · Gym Fat Loss System",
    badge: "SHRED",
    shortLabel: "تنشيف ذكي مع الحفاظ على العضلات",
    description:
      "نظام جيم مصمم للتنشيف وحرق الدهون مع بروتين عالي للحفاظ على الكتلة العضلية، كارب محسوب للطاقة، ودهون مضبوطة لدعم الالتزام والنتيجة.",
    price: "75 جنيه",
    kcalLabel: "1700",
    proteinLabel: "180g",
    carbsLabel: "140g",
    fatLabel: "47g",
  },

  lean_bulk: {
    id: "lean_bulk",
    publicName: "G7 CORE",
    publicArabicName: "نظام جيم متوازن",
    internalName: "G7 CORE · Balanced Fitness System",
    badge: "CORE",
    shortLabel: "الخطة الأساسية المتوازنة للجيم",
    description:
      "نظام جيم متوازن مناسب للحفاظ على الشكل، تحسين الأداء، وبناء روتين أكل ثابت حول بروتين واضح، كارب عملي، ووجبات سهلة التنفيذ.",
    price: "75 جنيه",
    kcalLabel: "2000",
    proteinLabel: "180g",
    carbsLabel: "200g",
    fatLabel: "53g",
  },

  mass_gainer: {
    id: "mass_gainer",
    publicName: "G7 MASS",
    publicArabicName: "زيادة كتلة عضلية",
    internalName: "G7 MASS · Muscle Gain System",
    badge: "MASS",
    shortLabel: "زيادة وزن وكتلة عضلية بأكل منظم",
    description:
      "نظام جيم عالي الطاقة مخصص لزيادة الكتلة العضلية، مع بروتين قوي، كارب أعلى لدعم التمرين والاستشفاء، ووجبات عملية تساعد على الالتزام.",
    price: "75 جنيه",
    kcalLabel: "2500",
    proteinLabel: "200g",
    carbsLabel: "300g",
    fatLabel: "56g",
  },

  budget_athlete: {
    id: "budget_athlete",
    publicName: "G7 FLEX",
    publicArabicName: "نظام اقتصادي مرن",
    internalName: "G7 FLEX · Budget Fitness System",
    badge: "FLEX",
    shortLabel: "نظام جيم اقتصادي وسهل الالتزام",
    description:
      "نظام جيم مرن واقتصادي مبني على وجبات عملية ومكونات بسيطة، مناسب لمن يريد نتيجة واضحة بتكلفة أقل وبدون تعقيد.",
    price: "50 جنيه",
    kcalLabel: "1900",
    proteinLabel: "160g",
    carbsLabel: "180g",
    fatLabel: "53g",
  },

  premium_chef: {
    id: "premium_chef",
    publicName: "G7 PREMIUM",
    publicArabicName: "نظام شيف بريميوم",
    internalName: "G7 PREMIUM · Premium Chef Fitness System",
    badge: "PREMIUM",
    shortLabel: "تجربة جيم بريميوم بطابع شيف",
    description:
      "نظام جيم بريميوم بتجربة أكل أعلى في التنوع والطعم، مصمم لمن يريد خطة منظمة، غنية، وممتعة مع نفس منطق البروتين والكارب الخاص بالجيم.",
    price: "100 جنيه",
    kcalLabel: "2200",
    proteinLabel: "190g",
    carbsLabel: "230g",
    fatLabel: "58g",
  },
}

export function getPlanBranding(planId: PlanKey) {
  return G7_PLAN_BRANDING[planId]
}

export function getPublicPlanName(planId: PlanKey) {
  return getPlanBranding(planId).publicName
}

export function getPublicArabicName(planId: PlanKey) {
  return getPlanBranding(planId).publicArabicName
}

export function getInternalPlanName(planId: PlanKey) {
  return getPlanBranding(planId).internalName
}