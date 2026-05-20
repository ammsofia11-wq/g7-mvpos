"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

import {
  INITIAL_RUNTIME_STATE,
  createRuntimeSnapshot,
  runtimeReducer,
  type RuntimeAction,
} from "./runtime-store"

type RuntimeContextValue = {
  runtime: ReturnType<typeof createRuntimeSnapshot>
  dispatch: React.Dispatch<RuntimeAction>
}

const RuntimeContext = createContext<RuntimeContextValue | null>(null)

export function RuntimeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    runtimeReducer,
    INITIAL_RUNTIME_STATE
  )

  const runtime = useMemo(() => {
    return createRuntimeSnapshot(state)
  }, [state])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: "SYNC_RUNTIME",
      })

      runtime.liveStages.forEach((stage) => {
        if (stage.status === "ACTIVE") {
          dispatch({
            type: "INCREASE_OUTPUT",
            stageId: stage.id,
            amount: Math.floor(Math.random() * 18) + 4,
          })
        }

        if (
          stage.pressureScore > 85 &&
          stage.status !== "BLOCKED" &&
          stage.status !== "COMPLETED"
        ) {
          dispatch({
            type: "BLOCK_STAGE",
            stageId: stage.id,
          })
        }
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [runtime.liveStages])

  return (
    <RuntimeContext.Provider value={{ runtime, dispatch }}>
      {children}
    </RuntimeContext.Provider>
  )
}

export function useRuntime() {
  const context = useContext(RuntimeContext)

  if (!context) {
    throw new Error("useRuntime must be used inside RuntimeProvider")
  }

  return context
}