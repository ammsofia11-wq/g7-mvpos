export type MacroGapInput = {
  actualProtein: number
  actualCarbs: number
  actualFat: number

  targetProtein: number
  targetCarbs: number
  targetFat: number
}

export type MacroGapResult = {
  proteinGap: number
  carbGap: number
  fatGap: number

  proteinStatus: "UNDER" | "ON_TARGET" | "OVER"
  carbStatus: "UNDER" | "ON_TARGET" | "OVER"
  fatStatus: "UNDER" | "ON_TARGET" | "OVER"
}

function getStatus(gap: number) {
  if (Math.abs(gap) <= 5) return "ON_TARGET"
  if (gap > 0) return "UNDER"

  return "OVER"
}

export function calculateMacroGap(
  input: MacroGapInput
): MacroGapResult {
  const proteinGap = input.targetProtein - input.actualProtein
  const carbGap = input.targetCarbs - input.actualCarbs
  const fatGap = input.targetFat - input.actualFat

  return {
    proteinGap,
    carbGap,
    fatGap,

    proteinStatus: getStatus(proteinGap),
    carbStatus: getStatus(carbGap),
    fatStatus: getStatus(fatGap),
  }
}