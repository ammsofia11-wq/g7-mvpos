import { G7Plan } from "./g7-plans"

// ================= TYPES =================

type Identity = {
  personality: string
  macroBias: string
}

// ================= ENGINE =================

export function getIdentity(plan: G7Plan): Identity {

  switch (plan) {
    case "keto":
      return { personality: "disciplined", macroBias: "high_fat" }

    case "fat_loss":
      return { personality: "focused", macroBias: "high_protein" }

    case "athlete":
      return { personality: "driven", macroBias: "high_carb" }

    case "vegan":
      return { personality: "explorer", macroBias: "balanced" }

    case "carnivore":
      return { personality: "extreme", macroBias: "zero_carb" }

    default:
      return { personality: "balanced", macroBias: "moderate" }
  }
}