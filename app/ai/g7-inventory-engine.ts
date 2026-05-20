export type InventoryStatus = "HEALTHY" | "RESTOCK" | "CRITICAL"
export type ProcurementPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type ForecastRisk = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type InventoryItem = {
  name: string
  stock: number
  weeklyUsage: number
  unit: string
  costPerUnit: number
  supplier: string
}

export type InventoryConsumptionItem = InventoryItem & {
  status: InventoryStatus
  projectedRemaining: number
  requiredOrder: number
  estimatedOrderCost: number
}

export type ProcurementRecommendation = InventoryConsumptionItem & {
  priority: ProcurementPriority
  reason: string
  recommendedAction: string
}

export type SmartProcurementForecast = {
  nextWeekDemand: number
  predictedProcurementCost: number
  highestConsumptionIngredient: string
  highestConsumptionValue: number
  wasteRisk: ForecastRisk
  supplierPressure: ForecastRisk
  forecastStatus: string
  monthlyProjectedProcurementCost: number
  recommendedBudgetBuffer: number
}

export const INVENTORY: InventoryItem[] = [
  {
    name: "Chicken Breast",
    stock: 18,
    weeklyUsage: 32,
    unit: "kg",
    costPerUnit: 8.5,
    supplier: "Prime Poultry",
  },
  {
    name: "Steamed Rice",
    stock: 42,
    weeklyUsage: 28,
    unit: "kg",
    costPerUnit: 2.2,
    supplier: "Grain House",
  },
  {
    name: "Broccoli",
    stock: 9,
    weeklyUsage: 14,
    unit: "kg",
    costPerUnit: 3.1,
    supplier: "Fresh Farm",
  },
  {
    name: "Greek Yogurt",
    stock: 4,
    weeklyUsage: 12,
    unit: "kg",
    costPerUnit: 4.8,
    supplier: "Dairy Pro",
  },
  {
    name: "Quinoa",
    stock: 16,
    weeklyUsage: 10,
    unit: "kg",
    costPerUnit: 5.2,
    supplier: "Clean Grains",
  },
]

export function getInventoryStatus(
  stock: number,
  usage: number
): InventoryStatus {
  if (stock <= usage * 0.4) {
    return "CRITICAL"
  }

  if (stock <= usage * 0.7) {
    return "RESTOCK"
  }

  return "HEALTHY"
}

export function getInventoryValue() {
  return INVENTORY.reduce((total, item) => {
    return total + item.stock * item.costPerUnit
  }, 0)
}

export function getWeeklyUsage() {
  return INVENTORY.reduce((total, item) => {
    return total + item.weeklyUsage
  }, 0)
}

export function getLowStockItems() {
  return INVENTORY.filter((item) => {
    return getInventoryStatus(item.stock, item.weeklyUsage) !== "HEALTHY"
  })
}

export function generateWeeklyInventoryConsumption() {
  return INVENTORY.map((item): InventoryConsumptionItem => {
    const projectedRemaining = item.stock - item.weeklyUsage
    const safeRemaining = Math.max(projectedRemaining, 0)

    const status = getInventoryStatus(item.stock, item.weeklyUsage)

    const requiredOrder =
      projectedRemaining < item.weeklyUsage * 0.4
        ? Math.ceil(item.weeklyUsage - safeRemaining + item.weeklyUsage * 0.3)
        : 0

    return {
      ...item,
      status,
      projectedRemaining: safeRemaining,
      requiredOrder,
      estimatedOrderCost: requiredOrder * item.costPerUnit,
    }
  })
}

export function getProcurementList() {
  return generateWeeklyInventoryConsumption().filter((item) => {
    return item.requiredOrder > 0
  })
}

export function getProjectedInventoryValueAfterWeeklyUsage() {
  return generateWeeklyInventoryConsumption().reduce((total, item) => {
    return total + item.projectedRemaining * item.costPerUnit
  }, 0)
}

export function getEstimatedProcurementCost() {
  return getProcurementList().reduce((total, item) => {
    return total + item.estimatedOrderCost
  }, 0)
}

export function getProcurementPriority(
  item: InventoryConsumptionItem
): ProcurementPriority {
  if (item.projectedRemaining <= 0) {
    return "URGENT"
  }

  if (item.status === "CRITICAL") {
    return "HIGH"
  }

  if (item.status === "RESTOCK") {
    return "MEDIUM"
  }

  return "LOW"
}

export function getProcurementReason(item: InventoryConsumptionItem) {
  if (item.projectedRemaining <= 0) {
    return "Projected weekly usage exceeds current stock."
  }

  if (item.status === "CRITICAL") {
    return "Stock is below critical safety threshold."
  }

  if (item.status === "RESTOCK") {
    return "Stock is below recommended restock threshold."
  }

  return "Inventory is stable for this weekly cycle."
}

export function getRecommendedAction(item: InventoryConsumptionItem) {
  if (item.requiredOrder <= 0) {
    return "No purchase required."
  }

  return `Order ${item.requiredOrder}${item.unit} from ${item.supplier}.`
}

export function generateProcurementRecommendations() {
  return getProcurementList().map((item): ProcurementRecommendation => {
    return {
      ...item,
      priority: getProcurementPriority(item),
      reason: getProcurementReason(item),
      recommendedAction: getRecommendedAction(item),
    }
  })
}

export function getUrgentProcurementItems() {
  return generateProcurementRecommendations().filter((item) => {
    return item.priority === "URGENT" || item.priority === "HIGH"
  })
}

export function getHighestConsumptionIngredient() {
  return INVENTORY.reduce((highest, item) => {
    return item.weeklyUsage > highest.weeklyUsage ? item : highest
  }, INVENTORY[0])
}

export function getSupplierPressureRisk(): ForecastRisk {
  const urgentItems = getUrgentProcurementItems()
  const procurementItems = getProcurementList()

  if (urgentItems.length >= 3) {
    return "CRITICAL"
  }

  if (urgentItems.length >= 2) {
    return "HIGH"
  }

  if (procurementItems.length >= 2) {
    return "MEDIUM"
  }

  return "LOW"
}

export function getWasteRisk(): ForecastRisk {
  const overstockedItems = INVENTORY.filter((item) => {
    return item.stock > item.weeklyUsage * 2.5
  })

  if (overstockedItems.length >= 3) {
    return "HIGH"
  }

  if (overstockedItems.length >= 2) {
    return "MEDIUM"
  }

  return "LOW"
}

export function getForecastStatus() {
  const supplierPressure = getSupplierPressureRisk()
  const procurementCost = getEstimatedProcurementCost()

  if (supplierPressure === "CRITICAL") {
    return "Immediate supplier action required."
  }

  if (supplierPressure === "HIGH") {
    return "High procurement pressure expected next cycle."
  }

  if (procurementCost > 0) {
    return "Procurement required to protect next week production."
  }

  return "Inventory is stable for next week production."
}

export function generateSmartProcurementForecast(): SmartProcurementForecast {
  const highest = getHighestConsumptionIngredient()
  const procurementCost = getEstimatedProcurementCost()

  const demandGrowthFactor = 1.15
  const budgetBufferFactor = 0.12

  const nextWeekDemand = Math.ceil(getWeeklyUsage() * demandGrowthFactor)
  const predictedProcurementCost = procurementCost * demandGrowthFactor
  const monthlyProjectedProcurementCost = predictedProcurementCost * 4
  const recommendedBudgetBuffer =
    monthlyProjectedProcurementCost * budgetBufferFactor

  return {
    nextWeekDemand,
    predictedProcurementCost,
    highestConsumptionIngredient: highest.name,
    highestConsumptionValue: highest.weeklyUsage,
    wasteRisk: getWasteRisk(),
    supplierPressure: getSupplierPressureRisk(),
    forecastStatus: getForecastStatus(),
    monthlyProjectedProcurementCost,
    recommendedBudgetBuffer,
  }
}