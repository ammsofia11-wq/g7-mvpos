import { G7Plan } from "@/app/ai/g7-plans"

// 👇 IMPORTANT: لازم يرجع نفس النوع بالظبط
export function getUserPlan(): G7Plan | null {
  return null // أو "fat_loss" للتست
}

export function upgradeToPro() {
  console.log("Upgrade logic here")
}