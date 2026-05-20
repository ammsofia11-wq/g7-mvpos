import { CENTRAL_KITCHEN_WORKFORCE } from "@/app/components/kitchen/kitchen-workforce-data"

export type WorkforceStatus = "ACTIVE" | "BREAK" | "OFFLINE"

export type WorkforceRuntimeEmployee = {
  id: string
  status: WorkforceStatus
}

const STORAGE_KEY = "g7-workforce-runtime-state"

export const WORKFORCE_RUNTIME_EVENT =
  "g7-workforce-runtime-updated"

export const DEFAULT_WORKFORCE_RUNTIME_STATE: WorkforceRuntimeEmployee[] =
  CENTRAL_KITCHEN_WORKFORCE.flatMap((station) =>
    station.employees.map((employee) => ({
      id: employee.id,
      status: employee.status as WorkforceStatus,
    }))
  )

function mergeWithDefaults(
  storedState: WorkforceRuntimeEmployee[]
): WorkforceRuntimeEmployee[] {
  return DEFAULT_WORKFORCE_RUNTIME_STATE.map((defaultEmployee) => {
    const storedEmployee = storedState.find(
      (item) => item.id === defaultEmployee.id
    )

    return storedEmployee || defaultEmployee
  })
}

export function getWorkforceRuntimeState(): WorkforceRuntimeEmployee[] {
  if (typeof window === "undefined") {
    return DEFAULT_WORKFORCE_RUNTIME_STATE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return DEFAULT_WORKFORCE_RUNTIME_STATE
  }

  try {
    const parsed = JSON.parse(stored) as WorkforceRuntimeEmployee[]
    return mergeWithDefaults(parsed)
  } catch {
    return DEFAULT_WORKFORCE_RUNTIME_STATE
  }
}

export function saveWorkforceRuntimeState(
  state: WorkforceRuntimeEmployee[]
) {
  if (typeof window === "undefined") return

  const mergedState = mergeWithDefaults(state)

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mergedState)
  )

  window.dispatchEvent(new Event(WORKFORCE_RUNTIME_EVENT))
}

export function getEmployeeRuntimeStatus(
  employeeId: string
): WorkforceStatus {
  const state = getWorkforceRuntimeState()

  const employee = state.find((item) => item.id === employeeId)

  return employee?.status || "OFFLINE"
}

export function updateEmployeeRuntimeStatus(
  employeeId: string,
  status: WorkforceStatus
) {
  const currentState = getWorkforceRuntimeState()

  const nextState = currentState.some((item) => item.id === employeeId)
    ? currentState.map((item) =>
        item.id === employeeId
          ? {
              ...item,
              status,
            }
          : item
      )
    : [
        ...currentState,
        {
          id: employeeId,
          status,
        },
      ]

  saveWorkforceRuntimeState(nextState)
}

export function resetWorkforceRuntimeState() {
  saveWorkforceRuntimeState(DEFAULT_WORKFORCE_RUNTIME_STATE)
}