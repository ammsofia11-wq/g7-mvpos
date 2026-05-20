import { G7_DS } from "./g7-design-system"

export const G7_UI = {
  page: `
    min-h-screen
    bg-[${G7_DS.colors.bg}]
    text-white
  `,

  container: `
    max-w-7xl
    mx-auto
    px-6
  `,

  card: `
    bg-[${G7_DS.colors.card}]
    border border-[${G7_DS.colors.border}]
    rounded-[${G7_DS.radius.lg}]
    shadow-[${G7_DS.shadow.soft}]
    backdrop-blur-xl
    p-6
  `,

  cardHover: `
    hover:shadow-[${G7_DS.shadow.glow}]
    transition-all duration-300
  `,

  title: `
    text-3xl font-bold tracking-tight
  `,

  subtitle: `
    text-[${G7_DS.colors.textSecondary}]
    text-sm
  `,

  buttonPrimary: `
    bg-cyan-500/20
    border border-cyan-400/30
    hover:bg-cyan-500/30
    transition
    rounded-xl
    px-4 py-3
    font-medium
  `,

  buttonSecondary: `
    bg-white/5
    border border-white/10
    hover:bg-white/10
    transition
    rounded-xl
    px-4 py-3
    font-medium
  `,
}