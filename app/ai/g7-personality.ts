import { getMemory, saveMemory } from "@/lib/g7-memory"

export type FlavorMood = "spicy" | "sweet" | "savory"

type FlavorProfile = {
  spicy: number
  sweet: number
  savory: number
}

// ================= SAFE MEMORY ACCESS =================

function getProfile(): FlavorProfile {
  const memory = getMemory() as any

  return {
    spicy: memory.flavorProfile?.spicy ?? 0,
    sweet: memory.flavorProfile?.sweet ?? 0,
    savory: memory.flavorProfile?.savory ?? 0
  }
}

// ================= UPDATE ENGINE =================

export function updateFlavorPersonality(flavor: FlavorMood) {
  const memory = getMemory() as any
  const profile = getProfile()

  // 🧠 update safely (no mutation reference sharing)
  const updatedProfile: FlavorProfile = {
    ...profile,
    [flavor]: profile[flavor] + 1
  }

  // 🧠 persist properly inside memory object
  const newMemory = {
    ...memory,
    flavorProfile: updatedProfile
  }

  saveMemory(newMemory.planHistory?.slice(-1)[0] || "fat_loss")

  return updatedProfile
}

// ================= DOMINANT FLAVOR =================

export function getDominantFlavor(): FlavorMood | null {
  const profile = getProfile()

  const entries = Object.entries(profile) as [FlavorMood, number][]

  if (entries.length === 0) return null

  const sorted = entries.sort((a, b) => b[1] - a[1])

  if (!sorted[0] || sorted[0][1] === 0) return null

  return sorted[0][0]
}