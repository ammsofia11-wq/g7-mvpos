"use client"

import { useMemo, useState } from "react"

import {
  G7_MASTER_INGREDIENTS,
  calculateG7IngredientMacros,
} from "@/app/data/g7-master-ingredients"

type RecipeIngredient = {
  ref: string
  grams: number
}

function getSafeDefaultRef(searchText: string) {
  return (
    G7_MASTER_INGREDIENTS.find((item) =>
      item.name.toLowerCase().includes(searchText)
    )?.ref ??
    G7_MASTER_INGREDIENTS[0]?.ref ??
    ""
  )
}

export default function RecipeStudioPage() {
  const [recipeName, setRecipeName] =
    useState("Cajun Chicken Bowl")

  const [flavorProfile, setFlavorProfile] =
    useState("Middle Eastern Performance")

  const [ingredients, setIngredients] =
    useState<RecipeIngredient[]>([
      {
        ref: getSafeDefaultRef("chicken"),
        grams: 200,
      },
      {
        ref: getSafeDefaultRef("rice"),
        grams: 150,
      },
    ])

  const totals = useMemo(() => {
    return ingredients.reduce(
      (acc, item) => {
        if (!item.ref) return acc

        const ingredient = G7_MASTER_INGREDIENTS.find(
          (ing) => ing.ref === item.ref
        )

        if (!ingredient) return acc

        try {
          const macros = calculateG7IngredientMacros(
            item.ref,
            item.grams
          )

          acc.kcal += macros.kcal
          acc.protein += macros.protein
          acc.carbs += macros.carbs
          acc.fat += macros.fat
          acc.fiber += macros.fiber
          acc.cost += macros.cost ?? 0
        } catch {
          return acc
        }

        return acc
      },
      {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        cost: 0,
      }
    )
  }, [ingredients])

  function updateIngredient(
    index: number,
    field: keyof RecipeIngredient,
    value: string | number
  ) {
    const updated = [...ingredients]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setIngredients(updated)
  }

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      {
        ref: G7_MASTER_INGREDIENTS[0]?.ref ?? "",
        grams: 100,
      },
    ])
  }

  function removeIngredient(index: number) {
    setIngredients((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    )
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto grid max-w-[1700px] gap-4 p-4 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-[26px] border border-cyan-500/10 bg-[#07111F] p-4">
          <div className="rounded-[24px] border border-cyan-400/15 bg-black/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-cyan-400 text-[28px] font-black text-black">
                G7
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                  Recipe Studio
                </p>

                <p className="mt-1 text-sm text-white/60">
                  Culinary Intelligence OS
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/5 bg-black/20 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Recipe Settings
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                  Recipe Name
                </span>

                <input
                  value={recipeName}
                  onChange={(e) =>
                    setRecipeName(e.target.value)
                  }
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-4 py-3 outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                  Flavor Profile
                </span>

                <input
                  value={flavorProfile}
                  onChange={(e) =>
                    setFlavorProfile(e.target.value)
                  }
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-4 py-3 outline-none"
                />
              </label>
            </div>
          </div>
        </aside>

        <section className="rounded-[28px] border border-cyan-500/10 bg-[#07111F] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                G7 Culinary Intelligence
              </p>

              <h1 className="mt-2 text-[42px] font-black leading-none">
                Recipe Builder
              </h1>

              <p className="mt-2 text-sm text-white/55">
                {recipeName} • {flavorProfile}
              </p>
            </div>

            <button
              onClick={addIngredient}
              className="rounded-[18px] bg-[#B7F532] px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
            >
              + Add Ingredient
            </button>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-3">
            <MacroCard
              title="KCAL"
              value={Math.round(totals.kcal)}
            />

            <MacroCard
              title="PROTEIN"
              value={`${Math.round(totals.protein)}g`}
            />

            <MacroCard
              title="CARBS"
              value={`${Math.round(totals.carbs)}g`}
            />

            <MacroCard
              title="FAT"
              value={`${Math.round(totals.fat)}g`}
            />

            <MacroCard
              title="COST"
              value={`${totals.cost.toFixed(2)} EGP`}
            />
          </div>

          <div className="mt-6 rounded-[24px] border border-white/5 bg-black/20 p-4">
            <div className="grid grid-cols-[1.4fr_120px_120px] gap-3 border-b border-white/5 pb-3 text-[11px] font-black uppercase tracking-[0.16em] text-white/40">
              <div>Ingredient</div>
              <div>Grams</div>
              <div>Actions</div>
            </div>

            <div className="mt-3 space-y-3">
              {ingredients.map((ingredient, index) => {
                const selectedIngredient =
                  G7_MASTER_INGREDIENTS.find(
                    (item) => item.ref === ingredient.ref
                  )

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[1.4fr_120px_120px] gap-3"
                  >
                    <select
                      value={ingredient.ref}
                      onChange={(e) =>
                        updateIngredient(
                          index,
                          "ref",
                          e.target.value
                        )
                      }
                      className="rounded-[14px] border border-white/10 bg-[#020617] px-4 py-3 outline-none"
                    >
                      <option value="">
                        Select Ingredient
                      </option>

                      {G7_MASTER_INGREDIENTS.map((item) => (
                        <option
                          key={item.ref}
                          value={item.ref}
                        >
                          {item.ref} — {item.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={ingredient.grams}
                      onChange={(e) =>
                        updateIngredient(
                          index,
                          "grams",
                          Number(e.target.value)
                        )
                      }
                      className="rounded-[14px] border border-white/10 bg-[#020617] px-4 py-3 outline-none"
                    />

                    <button
                      onClick={() => removeIngredient(index)}
                      className="rounded-[14px] border border-red-500/20 bg-red-500/10 text-sm font-black text-red-300"
                    >
                      Remove
                    </button>

                    {selectedIngredient ? (
                      <div className="col-span-3 rounded-[14px] border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-3 text-xs text-white/55">
                        Selected:{" "}
                        <span className="font-black text-cyan-300">
                          {selectedIngredient.name}
                        </span>{" "}
                        <span className="text-white/35">
                          ({selectedIngredient.ref})
                        </span>
                      </div>
                    ) : (
                      <div className="col-span-3 rounded-[14px] border border-red-400/10 bg-red-500/[0.04] px-4 py-3 text-xs text-red-200/70">
                        Ingredient reference not found.
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function MacroCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="rounded-[20px] border border-[#B7F532]/20 bg-black/25 p-4 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">
        {title}
      </p>

      <p className="mt-3 text-[32px] font-black text-[#B7F532]">
        {value}
      </p>
    </div>
  )
}