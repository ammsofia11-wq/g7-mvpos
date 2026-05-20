export type ProductionTimelineEvent = {
  id: string
  time: string
  employeeId: string
  employeeName: string
  dishId: string
  recipe: string
  stage: string
  action: "STARTED" | "COMPLETED"
}

const STORAGE_KEY = "g7-production-timeline-events"

export const PRODUCTION_TIMELINE_EVENT =
  "g7-production-timeline-updated"

export function getProductionTimelineEvents(): ProductionTimelineEvent[] {
  if (typeof window === "undefined") return []

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) return []

  try {
    return JSON.parse(stored) as ProductionTimelineEvent[]
  } catch {
    return []
  }
}

export function saveProductionTimelineEvents(
  events: ProductionTimelineEvent[]
) {
  if (typeof window === "undefined") return

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events)
  )

  window.dispatchEvent(new Event(PRODUCTION_TIMELINE_EVENT))
}

export function addProductionTimelineEvent(
  event: Omit<ProductionTimelineEvent, "id">
) {
  const currentEvents = getProductionTimelineEvents()

  const nextEvent: ProductionTimelineEvent = {
    ...event,
    id: `EV-${Date.now()}`,
  }

  saveProductionTimelineEvents([
    nextEvent,
    ...currentEvents,
  ])
}

export function resetProductionTimelineEvents() {
  if (typeof window === "undefined") return

  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(PRODUCTION_TIMELINE_EVENT))
}