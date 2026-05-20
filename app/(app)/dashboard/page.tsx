"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import {
  INVENTORY,
  getInventoryStatus,
  getInventoryValue,
  getWeeklyUsage,
  getLowStockItems,
} from "@/app/ai/g7-inventory-engine"

type Plan = {
  id: string
  user_id: string
  meal_name: string
  plan_type: string
  calories: number
  protein: number
  carbs: number
  fat: number
  created_at: string
}

type G7System = {
  name: string
  icon: string
  meal: string
  calories: number
  protein: number
  carbs: number
  fat: number
  tag: string
  mood: string
  description: string
  chefScore: number
  flavor: string
  kitchenAction: string
}

const g7Systems: G7System[] = [
  {
    name: "Fat Loss",
    icon: "🔥",
    meal: "Fat Loss System Bowl",
    calories: 420,
    protein: 42,
    carbs: 38,
    fat: 14,
    tag: "Lean",
    mood: "Metabolic Clarity",
    description: "High-protein controlled energy for clean fat loss.",
    chefScore: 94,
    flavor: "Fresh / Spicy / Clean",
    kitchenAction: "Lean protein + controlled carbs.",
  },

  {
    name: "Keto",
    icon: "🥑",
    meal: "Keto Power Bowl",
    calories: 520,
    protein: 38,
    carbs: 9,
    fat: 38,
    tag: "Low Carb",
    mood: "Low-Carb Focus",
    description: "Low-carb chef logic with rich fats and stable energy.",
    chefScore: 91,
    flavor: "Creamy / Smoky / Rich",
    kitchenAction: "Low carbs, high flavor fats.",
  },

  {
    name: "Carnivore",
    icon: "🥩",
    meal: "Carnivore Chef Bowl",
    calories: 610,
    protein: 65,
    carbs: 4,
    fat: 36,
    tag: "Protein",
    mood: "Primal Protein",
    description: "Protein-led chef system with minimal carbs.",
    chefScore: 97,
    flavor: "Smoky / Umami / Primal",
    kitchenAction: "Protein first, satiety logic.",
  },
]

const commandCards = [
  {
    title: "AI Chef",
    href: "/generate",
    icon: "⚡",
    description: "Generate intelligent chef systems.",
    metric: "Flavor Intelligence",
  },

  {
    title: "Weekly OS",
    href: "/weekly",
    icon: "▣",
    description: "7-day orchestration layer.",
    metric: "2940 kcal weekly",
  },

  {
    title: "Kitchen OS",
    href: "/kitchen",
    icon: "◈",
    description: "Batch production & SOP execution.",
    metric: "25 portions",
  },

  {
    title: "Inventory OS",
    href: "/inventory",
    icon: "▤",
    description: "Procurement & stock intelligence.",
    metric: `${getLowStockItems().length} low stock alerts`,
  },
]

export default function DashboardPage() {
  const router = useRouter()

  const [plans, setPlans] = useState<Plan[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [selectedSystem, setSelectedSystem] = useState<G7System>(g7Systems[0])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const inventoryValue = getInventoryValue()
  const weeklyUsage = getWeeklyUsage()
  const lowStockItems = getLowStockItems()

  const aiRecommendations = useMemo(() => {
    const recommendations = []

    if (lowStockItems.length > 0) {
      recommendations.push({
        title: "Low Stock Alert",
        text: `${lowStockItems[0].name} requires procurement attention.`,
        type: "danger",
      })
    }

    recommendations.push({
      title: "Inventory Usage",
      text: `${weeklyUsage}kg projected ingredient movement this week.`,
      type: "info",
    })

    recommendations.push({
      title: "Inventory Value",
      text: `$${inventoryValue.toFixed(2)} active inventory value detected.`,
      type: "success",
    })

    if (selectedSystem.name === "Carnivore") {
      recommendations.push({
        title: "Protein Procurement",
        text: "High beef demand expected for carnivore production.",
        type: "warning",
      })
    }

    if (selectedSystem.name === "Keto") {
      recommendations.push({
        title: "Healthy Fat Logic",
        text: "Increase olive oil and avocado purchasing.",
        type: "success",
      })
    }

    if (selectedSystem.name === "Fat Loss") {
      recommendations.push({
        title: "Lean Production",
        text: "Lean protein inventory aligned with weekly calorie targets.",
        type: "success",
      })
    }

    return recommendations
  }, [selectedSystem, inventoryValue, weeklyUsage, lowStockItems])

  const fetchPlans = async (uid: string) => {
    const { data } = await supabase
      .from("plans")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })

    setPlans(data || [])
  }

  useEffect(() => {
    const initDashboard = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.push("/login")
        return
      }

      const uid = data.user.id

      setUserId(uid)
      setEmail(data.user.email || "")

      await fetchPlans(uid)

      setLoading(false)
    }

    initDashboard()
  }, [router])

  const savePlan = async () => {
    if (!userId) return

    setSaving(true)

    await supabase.from("plans").insert({
      user_id: userId,
      meal_name: selectedSystem.meal,
      plan_type: selectedSystem.name,
      calories: selectedSystem.calories,
      protein: selectedSystem.protein,
      carbs: selectedSystem.carbs,
      fat: selectedSystem.fat,
    })

    await fetchPlans(userId)

    setSaving(false)

    setMessage(`${selectedSystem.name} saved successfully`)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const totalPlans = plans.length

  const activeTypes = new Set(
    plans.map((plan) => plan.plan_type)
  ).size

  const totalCalories = useMemo(() => {
    return plans.reduce((sum, plan) => {
      return sum + Number(plan.calories || 0)
    }, 0)
  }, [plans])

  if (loading) {
    return (
      <main className="g7-page flex min-h-screen items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-slate-300">
          Loading G7...
        </div>
      </main>
    )
  }

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1040px] px-4 py-4">

        {/* HERO */}

        <section className="rounded-[24px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
          <div className="grid gap-4 lg:grid-cols-[1fr_240px]">

            <div>
              <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.22em] text-cyan-200">
                G7 Autonomous Brain
              </div>

              <h1 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.05em] text-white lg:text-[44px]">
                AI Culinary
                <span className="block text-cyan-300">
                  Operating System
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">
                Central intelligence layer for chef systems, weekly orchestration,
                kitchen execution, inventory management, and autonomous procurement.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <MiniStat label="Saved" value={totalPlans} />
                <MiniStat label="Types" value={activeTypes} />
                <MiniStat label="Energy" value={`${totalCalories} kcal`} />
                <MiniStat label="Inventory" value={`$${inventoryValue.toFixed(0)}`} />
              </div>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
                Current User
              </p>

              <p className="mt-2 truncate text-[11px] font-bold text-slate-300">
                {email}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-cyan-300/20 bg-cyan-300/10 text-2xl">
                  {selectedSystem.icon}
                </div>

                <div>
                  <p className="text-xl font-black text-white">
                    {selectedSystem.name}
                  </p>

                  <p className="text-[10px] font-bold text-cyan-300">
                    {selectedSystem.mood}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="mt-5 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* COMMAND CARDS */}

        <section className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {commandCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/10 bg-black/20 text-xl">
                  {card.icon}
                </div>

                <span className="text-xs font-black text-cyan-300">
                  →
                </span>
              </div>

              <h3 className="mt-4 text-[20px] font-black leading-none text-white">
                {card.title}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                {card.description}
              </p>

              <div className="mt-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-200">
                {card.metric}
              </div>
            </Link>
          ))}
        </section>

        {/* AI BRAIN */}

        <section className="mt-4 rounded-[24px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.05),rgba(255,255,255,0.02))] p-5">

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Operational Intelligence
              </p>

              <h2 className="mt-2 text-[28px] font-black leading-none tracking-[-0.05em] text-white">
                Autonomous Culinary Brain
              </h2>
            </div>

            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
              Live Inventory Sync
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {aiRecommendations.map((item) => (
              <RecommendationCard
                key={item.title}
                title={item.title}
                text={item.text}
                type={item.type}
              />
            ))}
          </div>
        </section>

        {/* SYSTEM + INVENTORY */}

        <section className="mt-4 grid gap-4 xl:grid-cols-[220px_1fr_260px]">

          {/* SYSTEM SELECTOR */}

          <aside className="rounded-[22px] border border-white/10 bg-white/[0.035] p-3">

            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Choose Identity
            </p>

            <div className="mt-3 grid gap-2">

              {g7Systems.map((system) => {
                const isSelected =
                  selectedSystem.name === system.name

                return (
                  <button
                    key={system.name}
                    onClick={() => setSelectedSystem(system)}
                    className={`w-full rounded-[16px] border p-2.5 text-left transition ${
                      isSelected
                        ? "border-cyan-300/60 bg-cyan-300/10"
                        : "border-white/10 bg-black/18"
                    }`}
                  >
                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-lg">
                        {system.icon}
                      </div>

                      <div>
                        <p className="text-[12px] font-black text-white">
                          {system.name}
                        </p>

                        <p className="text-[9px] font-bold text-cyan-300">
                          {system.mood}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ACTIVE SYSTEM */}

          <section className="rounded-[22px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.07),rgba(255,255,255,0.018))] p-4">

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Active System
                </p>

                <h2 className="mt-2 text-[36px] font-black leading-[0.9] tracking-[-0.055em] text-white">
                  <span className="mr-2">
                    {selectedSystem.icon}
                  </span>

                  {selectedSystem.name}
                </h2>

                <p className="mt-2 max-w-md text-[12px] leading-5 text-slate-300">
                  {selectedSystem.description}
                </p>
              </div>

              <div className="rounded-[18px] border border-cyan-300/20 bg-cyan-300/10 p-3">
                <p className="text-[7px] font-black uppercase tracking-[0.2em] text-cyan-200">
                  Chef Score
                </p>

                <p className="mt-1 text-[28px] font-black leading-none text-white">
                  {selectedSystem.chefScore}%
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Macro label="Energy" value={`${selectedSystem.calories} kcal`} />
              <Macro label="Protein" value={`${selectedSystem.protein}g`} />
              <Macro label="Carbs" value={`${selectedSystem.carbs}g`} />
              <Macro label="Fat" value={`${selectedSystem.fat}g`} />
            </div>

            <div className="mt-4 rounded-[20px] border border-white/10 bg-black/22 p-3">

              <h3 className="text-[23px] font-black text-white">
                {selectedSystem.meal}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-slate-400">
                Connected to Weekly OS, Kitchen OS, and Inventory OS.
              </p>

              <button
                onClick={savePlan}
                disabled={saving}
                className="mt-4 h-10 rounded-full bg-cyan-300 px-5 text-[11px] font-black text-[#001018]"
              >
                {saving ? "Saving..." : "Save System"}
              </button>

              {message && (
                <div className="mt-3 rounded-[16px] border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-[11px] font-bold text-cyan-100">
                  {message}
                </div>
              )}
            </div>
          </section>

          {/* INVENTORY PANEL */}

          <aside className="rounded-[22px] border border-white/10 bg-white/[0.035] p-3">

            <div className="flex items-center justify-between">
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Inventory Sync
              </p>

              <span className="text-[9px] font-bold text-slate-500">
                {INVENTORY.length} items
              </span>
            </div>

            <div className="mt-3 grid gap-2">

              {INVENTORY.map((item) => {
                const status = getInventoryStatus(
                  item.stock,
                  item.weeklyUsage
                )

                return (
                  <div
                    key={item.name}
                    className="rounded-[16px] border border-white/10 bg-black/18 p-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[12px] font-black text-white">
                        {item.name}
                      </p>

                      <p className="text-[8px] font-black text-cyan-300">
                        {status}
                      </p>
                    </div>

                    <p className="mt-1 text-[9px] font-bold text-slate-500">
                      {item.stock}
                      {item.unit} stock ·
                      {" "}
                      {item.weeklyUsage}
                      {item.unit} usage
                    </p>
                  </div>
                )
              })}
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

function RecommendationCard({
  title,
  text,
  type,
}: {
  title: string
  text: string
  type: string
}) {

  const styles =
    type === "warning"
      ? "border-amber-400/20 bg-amber-400/10"
      : type === "danger"
      ? "border-red-400/20 bg-red-400/10"
      : type === "success"
      ? "border-emerald-400/20 bg-emerald-400/10"
      : "border-cyan-300/20 bg-cyan-300/10"

  return (
    <div className={`rounded-[20px] border p-4 ${styles}`}>
      <p className="text-[12px] font-black text-white">
        {title}
      </p>

      <p className="mt-2 text-[11px] leading-5 text-slate-200">
        {text}
      </p>
    </div>
  )
}

function MiniStat({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
      <span className="mr-2 text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>

      <span className="text-[10px] font-black text-white">
        {value}
      </span>
    </div>
  )
}

function Macro({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[17px] border border-white/10 bg-black/22 p-2.5">
      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-1.5 text-[15px] font-black text-white">
        {value}
      </p>
    </div>
  )
}