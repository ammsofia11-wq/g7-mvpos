"use client"

import { useMemo, useState } from "react"

type Ingredient = {
  name: string
  quantity: number
  unit: string
}

const initialIngredients: Ingredient[] = [
  {
    name: "Tomato",
    quantity: 10,
    unit: "kg",
  },
  {
    name: "Onion",
    quantity: 2,
    unit: "kg",
  },
  {
    name: "Olive Oil",
    quantity: 1,
    unit: "L",
  },
]

export default function IChefPage() {
  const [recipeName, setRecipeName] = useState("Marinara Sauce")
  const [chefName, setChefName] = useState("Ahmed Salem")
  const [category, setCategory] = useState("Sauce")
  const [recipeType, setRecipeType] = useState("Commercial")
  const [baseYield, setBaseYield] = useState(10)
  const [targetYield, setTargetYield] = useState(25)
  const [voiceNote, setVoiceNote] = useState("")
  const [ingredients] = useState(initialIngredients)

  const multiplier = useMemo(() => {
    if (baseYield <= 0) return 1
    return targetYield / baseYield
  }, [baseYield, targetYield])

  const scaledIngredients = useMemo(() => {
    return ingredients.map((ingredient) => {
      return {
        ...ingredient,
        scaled: ingredient.quantity * multiplier,
      }
    })
  }, [ingredients, multiplier])

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-4">
        <section className="rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(255,255,255,0.025))] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-cyan-300">
            I Chef Documentation OS
          </p>

          <h1 className="mt-2 text-[34px] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-[44px]">
            Chef Recipe
            <span className="block text-cyan-300">
              Documentation Engine
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-[12px] leading-6 text-slate-300">
            Voice-assisted culinary recipe documentation system for chef
            inventions, batch intelligence, production scaling, SOP creation,
            kitchen execution, and digital shelf management.
          </p>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Recipe Identity
                  </p>

                  <h2 className="mt-2 text-[28px] font-black leading-none tracking-[-0.04em] text-white">
                    Recipe Master File
                  </h2>
                </div>

                <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">
                  Version 1.0
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InputCard
                  label="Recipe Name"
                  value={recipeName}
                  onChange={setRecipeName}
                />

                <InputCard
                  label="Chef Creator"
                  value={chefName}
                  onChange={setChefName}
                />

                <InputCard
                  label="Category"
                  value={category}
                  onChange={setCategory}
                />

                <InputCard
                  label="Recipe Type"
                  value={recipeType}
                  onChange={setRecipeType}
                />
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Voice Documentation
                  </p>

                  <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.04em] text-white">
                    Chef Voice Notes
                  </h2>
                </div>

                <button className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300 hover:text-[#001018]">
                  Start Recording
                </button>
              </div>

              <textarea
                value={voiceNote}
                onChange={(e) => setVoiceNote(e.target.value)}
                placeholder="Chef speaks recipe instructions here..."
                className="mt-5 h-[160px] w-full rounded-[20px] border border-white/10 bg-black/20 p-4 text-[13px] text-white outline-none placeholder:text-slate-500"
              />
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Batch Scaling
                  </p>

                  <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.04em] text-white">
                    Production Yield Engine
                  </h2>
                </div>

                <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">
                  x{multiplier.toFixed(2)}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <NumberCard
                  label="Base Yield"
                  value={baseYield}
                  onChange={setBaseYield}
                />

                <NumberCard
                  label="Target Yield"
                  value={targetYield}
                  onChange={setTargetYield}
                />
              </div>

              <div className="mt-5 overflow-hidden rounded-[20px] border border-white/10">
                <table className="w-full border-collapse">
                  <thead className="bg-white/[0.03]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Ingredient
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Base
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Scaled
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {scaledIngredients.map((ingredient) => (
                      <tr
                        key={ingredient.name}
                        className="border-t border-white/5"
                      >
                        <td className="px-4 py-4 text-[12px] font-bold text-white">
                          {ingredient.name}
                        </td>

                        <td className="px-4 py-4 text-[12px] text-slate-300">
                          {ingredient.quantity} {ingredient.unit}
                        </td>

                        <td className="px-4 py-4 text-[12px] font-black text-cyan-300">
                          {ingredient.scaled.toFixed(2)} {ingredient.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Recipe Intelligence
              </p>

              <h2 className="mt-2 text-[28px] font-black leading-none tracking-[-0.04em] text-white">
                {recipeName}
              </h2>

              <div className="mt-5 grid gap-3">
                <MetricCard label="Chef Creator" value={chefName} />
                <MetricCard label="Recipe Type" value={recipeType} />
                <MetricCard label="Category" value={category} />
                <MetricCard
                  label="Production Yield"
                  value={`${targetYield} batches`}
                />
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Shelf Intelligence
              </p>

              <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.04em] text-white">
                Electronic Shelf
              </h2>

              <div className="mt-5 space-y-3">
                <ShelfCard
                  title="Production Date"
                  value="13 May 2026"
                />

                <ShelfCard
                  title="Expiry Date"
                  value="18 May 2026"
                />

                <ShelfCard
                  title="Batch Code"
                  value="MAR-2026-0513"
                />

                <ShelfCard
                  title="Storage"
                  value="Chilled 2°C - 4°C"
                />
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Production Actions
              </p>

              <div className="mt-5 grid gap-3">
                <ActionButton label="Generate Batch Sheet" />
                <ActionButton label="Generate Production Labels" />
                <ActionButton label="Export Recipe SOP" />
                <ActionButton label="Send To Kitchen Workforce" primary />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

function InputCard({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full bg-transparent text-[14px] font-black text-white outline-none"
      />
    </div>
  )
}

function NumberCard({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full bg-transparent text-[18px] font-black text-white outline-none"
      />
    </div>
  )
}

function MetricCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[14px] font-black text-white">
        {value}
      </p>
    </div>
  )
}

function ShelfCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-300">
        {title}
      </p>

      <p className="mt-2 text-[13px] font-black text-white">
        {value}
      </p>
    </div>
  )
}

function ActionButton({
  label,
  primary,
}: {
  label: string
  primary?: boolean
}) {
  return (
    <button
      className={`rounded-full px-4 py-3 text-[11px] font-black transition ${
        primary
          ? "bg-cyan-300 text-[#001018] hover:scale-[1.01]"
          : "border border-cyan-300/25 bg-white/[0.04] text-cyan-300 hover:bg-cyan-300 hover:text-[#001018]"
      }`}
    >
      {label}
    </button>
  )
}