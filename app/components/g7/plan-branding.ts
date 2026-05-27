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
  lean_bulk: {
    id: "lean_bulk",
    publicName: "G7 CORE",
    publicArabicName: "تحوّل رياضي متوازن",
    internalName: "Lean Bulk",
    badge: "CORE",
    shortLabel: "Balanced Athlete System",
    description:
      "Balanced real food performance system for sustainable body recomposition.",
    price: "75 جنيه",
    kcalLabel: "2200",
    proteinLabel: "200g",
    carbsLabel: "180g",
    fatLabel: "Controlled",
  },

  budget_athlete: {
    id: "budget_athlete",
    publicName: "G7 FLEX",
    publicArabicName: "نظام رياضي مرن",
    internalName: "Budget Athlete",
    badge: "FLEX",
    shortLabel: "Lifestyle Athlete System",
    description:
      "Flexible budget-conscious system built around practical ingredients and real adherence.",
    price: "50 جنيه",
    kcalLabel: "2100",
    proteinLabel: "180g",
    carbsLabel: "200g",
    fatLabel: "Balanced",
  },

  shredding: {
    id: "shredding",
    publicName: "G7 SHRED",
    publicArabicName: "تنشيف وحرق دهون",
    internalName: "Shredding",
    badge: "SHRED",
    shortLabel: "Fat Loss & Definition System",
    description:
      "Low-fat real food system designed for definition, satiety, and controlled calories.",
    price: "75 جنيه",
    kcalLabel: "1700",
    proteinLabel: "180g",
    carbsLabel: "140g",
    fatLabel: "Low",
  },

  mass_gainer: {
    id: "mass_gainer",
    publicName: "G7 MASS",
    publicArabicName: "تضخيم وكتلة عضلية",
    internalName: "Mass Gainer",
    badge: "MASS",
    shortLabel: "Lean Muscle Growth System",
    description:
      "Higher-calorie performance system built to support muscle gain and training output.",
    price: "100 جنيه",
    kcalLabel: "3200",
    proteinLabel: "240g",
    carbsLabel: "320g",
    fatLabel: "High",
  },

  premium_chef: {
    id: "premium_chef",
    publicName: "G7 PREMIUM",
    publicArabicName: "تجربة شيف متقدمة",
    internalName: "Premium Chef Edition",
    badge: "CHEF",
    shortLabel: "Advanced Culinary System",
    description:
      "Premium chef-based system with richer flavor variety, higher culinary quality, and advanced meal structure.",
    price: "150 جنيه",
    kcalLabel: "2400",
    proteinLabel: "220g",
    carbsLabel: "220g",
    fatLabel: "Controlled",
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