import { G7_THEME } from "./g7-theme"

export const G7_STYLE = {
  card: `
    bg-[${G7_THEME.colors.card}]
    border border-[${G7_THEME.colors.border}]
    rounded-[${G7_THEME.radius.lg}]
    shadow-[${G7_THEME.shadow.soft}]
    backdrop-blur-xl
  `,

  cardGlow: `
    shadow-[${G7_THEME.shadow.glow}]
  `,

  title: `
    text-white text-2xl font-bold
  `,

  subtitle: `
    text-[${G7_THEME.colors.text.secondary}] text-sm
  `,

  muted: `
    text-[${G7_THEME.colors.text.muted}]
  `,

  section: `
    space-y-10
  `,

  grid: `
    grid gap-6
  `,

  buttonPrimary: `
    bg-cyan-500/20 border border-cyan-400/30
    hover:bg-cyan-500/30
    transition
  `,

  buttonSecondary: `
    bg-white/5 border border-white/10
    hover:bg-white/10
    transition
  `,
}