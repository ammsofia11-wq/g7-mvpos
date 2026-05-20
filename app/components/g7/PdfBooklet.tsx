import { buildGroceryList, groupGroceryList } from "./grocery"
import { getMealsForPlan } from "./meals"
import { G7Plan } from "./plans"

type PdfBookletProps = {
  plan: G7Plan
  clientName: string
  customKcal: number
  flavor: string
  price: string
}

export default function PdfBooklet({
  plan,
  clientName,
  customKcal,
  flavor,
  price,
}: PdfBookletProps) {
  const meals = getMealsForPlan(plan.id)

  const groceryItems = buildGroceryList(meals)

  const groceryGroups = groupGroceryList(groceryItems)

  return (
    <div className="mx-auto w-full max-w-[720px] rounded-[26px] border border-[#22D3EE]/20 bg-[#020817] p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] print:max-w-none print:border-0 print:shadow-none">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-[#22D3EE] text-[26px] font-black text-black">
            G7
          </div>

          <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
            Personalized Client Nutrition PDF
          </p>

          <h1 className="mt-2 text-[34px] font-black leading-[0.95] text-white">
            {plan.name}
            <span className="block text-[#B7F532]">
              Client System
            </span>
          </h1>

          <p className="mt-1 text-[14px] font-black text-[#D8C56A]">
            {plan.arabicName}
          </p>

          <p className="mt-2 text-[16px] text-[#22D3EE]">
            {clientName}
          </p>
        </div>

        <div className="rounded-[18px] border border-[#B7F532]/25 bg-black/25 px-4 py-3 text-right">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
            Price
          </p>

          <p className="mt-1 text-[22px] font-black text-[#B7F532]">
            {price}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          ["KCAL", customKcal],
          ["PROTEIN", `${plan.protein}g`],
          ["CARBS", `${plan.carbs}g`],
          ["FAT", plan.fat],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[16px] border border-[#B7F532]/35 bg-black/20 p-3 text-center"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
              {label}
            </p>

            <p className="mt-1 text-[22px] font-black text-[#B7F532]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[20px] border border-[#22D3EE]/20 bg-[#06111E] p-4">
        <h2 className="text-[20px] font-black text-[#22D3EE]">
          System Overview
        </h2>

        <p className="mt-2 text-[14px] leading-7 text-white/75">
          {plan.description}
        </p>

        <p className="mt-2 text-[13px] font-bold text-[#B7F532]">
          Flavor Profile: {flavor}
        </p>
      </div>

      <div className="mt-4 rounded-[20px] border border-[#22D3EE]/15 bg-[#07111F] p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-black text-white">
            Day 1 Meals
          </h2>

          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
            Breakfast • Lunch • Dinner
          </p>
        </div>

        <div className="mt-4 grid gap-3">
          {meals.map((meal) => (
            <div
              key={`${meal.day}-${meal.role}`}
              className="rounded-[18px] border border-white/10 bg-black/25 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
                    {meal.role}
                  </p>

                  <h3 className="mt-1 text-[17px] font-black text-white">
                    {meal.title}
                  </h3>

                  <p className="mt-1 text-[12px] text-white/55">
                    {meal.subtitle}
                  </p>
                </div>

                <p className="rounded-xl bg-[#B7F532]/10 px-3 py-2 text-[13px] font-black text-[#B7F532]">
                  {meal.kcal} kcal
                </p>
              </div>

              {meal.hero ? (
                <div className="mt-4 overflow-hidden rounded-[18px] border border-white/10">
                  <img
                    src={meal.hero}
                    alt={meal.title}
                    className="h-[180px] w-full object-cover"
                  />

                  <div className="border-t border-white/5 bg-[#07111F] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#22D3EE]">
                      Chef-Based Meal Preview
                    </p>

                    <p className="mt-1 text-[12px] leading-6 text-white/60">
                      Premium culinary presentation designed for the G7 Nutrition System.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-black/25 p-2">
                  <p className="text-[9px] text-white/40">P</p>
                  <p className="font-black text-white">{meal.protein}g</p>
                </div>

                <div className="rounded-xl bg-black/25 p-2">
                  <p className="text-[9px] text-white/40">C</p>
                  <p className="font-black text-white">{meal.carbs}g</p>
                </div>

                <div className="rounded-xl bg-black/25 p-2">
                  <p className="text-[9px] text-white/40">F</p>
                  <p className="font-black text-white">{meal.fat}g</p>
                </div>

                <div className="rounded-xl bg-black/25 p-2">
                  <p className="text-[9px] text-white/40">Fiber</p>
                  <p className="font-black text-white">{meal.fiber}g</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {meal.raw.slice(0, 4).map(([name, amount]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.035] px-3 py-2 text-[11px]"
                  >
                    <span className="text-white/65">{name}</span>

                    <span className="font-black text-[#B7F532]">
                      {amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[16px] border border-[#22D3EE]/10 bg-[#07111F] p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
                  SOP • Chef Instructions
                </p>

                <div className="mt-3 space-y-2">
                  {meal.steps.length > 0 ? (
                    meal.steps.map((step, index) => (
                      <div
                        key={step.title}
                        className="rounded-xl border border-white/5 bg-black/20 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22D3EE] text-[10px] font-black text-black">
                            {index + 1}
                          </div>

                          <p className="text-[12px] font-black text-white">
                            {step.title}
                          </p>
                        </div>

                        <p className="mt-2 text-[11px] leading-6 text-white/65">
                          {step.body}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                      <p className="text-[11px] leading-6 text-white/60">
                        Full SOP system will be generated automatically based on the selected plan.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-[#22D3EE]/15 bg-[#07111F] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-black text-white">
            Weekly Grocery List
          </h2>

          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
            Smart Shopping System
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {Object.entries(groceryGroups).map(([category, items]) => (
            <div
              key={category}
              className="rounded-[18px] border border-white/10 bg-black/20 p-4"
            >
              <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#B7F532]">
                {category}
              </p>

              <div className="mt-3 space-y-2">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="text-[11px] text-white/70">
                        {item.name}
                      </span>

                      <span className="text-[11px] font-black text-[#22D3EE]">
                        {item.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-[11px] text-white/35">
                      No items
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-[#22D3EE]/15 bg-[#07111F] p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-black text-white">
            طريقة الاشتراك
          </h2>

          <div className="grid flex-1 grid-cols-3 gap-2">
            {["Vodafone Cash", "WE Cash", "InstaPay"].map((method) => (
              <div
                key={method}
                className="rounded-[14px] border border-white/10 bg-black/25 p-3 text-center"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#22D3EE]">
                  {method}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-4 flex items-center justify-between border-t border-[#22D3EE]/20 pt-3">
        <p className="text-[20px] font-black text-[#22D3EE]">
          G7
        </p>

        <p className="text-[9px] uppercase tracking-[0.16em] text-white/50">
          Chef-Based Nutrition OS | Real Food. Real Results.
        </p>

        <p className="text-[11px] font-black text-[#B7F532]">
          +20 112 844 2058
        </p>
      </footer>
    </div>
  )
}