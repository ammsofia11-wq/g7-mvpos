"use client"

import { G7Plan } from "@/app/ai/g7-plans"

type Props = {
  data: any
  plan: G7Plan
}

export default function WeeklyPlan({ data, plan }: Props) {
  if (!data?.week?.week) return null

  const week = data.week.week

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white/5 p-6 rounded-2xl">
        <h2 className="text-xl font-bold">
          🗓️ Weekly Nutrition Plan
        </h2>
        <p className="text-sm opacity-70">
          AI-generated 7-day adaptive system for {plan}
        </p>
      </div>

      {/* DAYS */}
      <div className="grid gap-4">

        {week.map((day: any) => (
          <div
            key={day.day}
            className="bg-white/5 p-5 rounded-2xl space-y-3"
          >

            {/* DAY HEADER */}
            <div className="flex justify-between">
              <h3 className="font-bold">
                Day {day.day}
              </h3>
              <span className="text-xs opacity-60">
                {day.phase}
              </span>
            </div>

            {/* MEAL NAME */}
            <div className="text-lg font-semibold">
              🍽️ {day.dish.name}
            </div>

            {/* MACROS */}
            <div className="grid grid-cols-4 text-sm opacity-80">
              <div>🔥 {day.dish.nutrition.calories}</div>
              <div>💪 {day.dish.nutrition.protein}</div>
              <div>🍚 {day.dish.nutrition.carbs}</div>
              <div>🥑 {day.dish.nutrition.fat}</div>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}