import {
  RUNTIME_DISHES,
  RuntimeDish,
} from "@/app/components/kitchen/kitchen-runtime-data"

const STORAGE_KEY = "g7-production-runtime-dishes"

export const PRODUCTION_RUNTIME_EVENT =
  "g7-production-runtime-updated"

export function getProductionRuntimeDishes(): RuntimeDish[] {
  if (typeof window === "undefined") {
    return RUNTIME_DISHES
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    saveProductionRuntimeDishes(RUNTIME_DISHES)
    return RUNTIME_DISHES
  }

  try {
    return JSON.parse(stored) as RuntimeDish[]
  } catch {
    saveProductionRuntimeDishes(RUNTIME_DISHES)
    return RUNTIME_DISHES
  }
}

export function saveProductionRuntimeDishes(dishes: RuntimeDish[]) {
  if (typeof window === "undefined") return

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(dishes)
  )

  window.dispatchEvent(
    new Event(PRODUCTION_RUNTIME_EVENT)
  )
}

export function resetProductionRuntimeDishes() {
  saveProductionRuntimeDishes(RUNTIME_DISHES)
}