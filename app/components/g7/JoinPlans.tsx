"use client"

import { useMemo, useState } from "react"
import { G7_BASE_MEALS } from "../../data/g7-base-meals"
import { G7_PLANS, PlanKey } from "./plans"

const planIcons: Record<PlanKey, string> = {
  lean_bulk: "💪",
  shredding: "🔥",
  mass_gainer: "🏋️",
  budget_athlete: "💳",
  premium_chef: "👨‍🍳",
}

const planTags: Partial<Record<PlanKey, string>> = {
  shredding: "Popular",
  premium_chef: "Premium",
}

function buildWhatsAppMessage(planName: string, arabicName: string, price: string) {
  return encodeURIComponent(
    `مرحبًا G7 👋

أنا مهتم بالخطة دي:

✅ ${planName}
${arabicName}

شوفت ملخص الخطة وأسماء أطباق الأسبوع على صفحة G7.

حابب أستلم ملف PDF الكامل:
7 أيام / 21 وجبة / المقادير / طريقة التحضير / قائمة الشراء.

السعر:
• ${price}

ابعتلي طريقة الدفع المناسبة.`
  )
}

export default function JoinPlans() {
  const plans = Object.values(G7_PLANS)
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("shredding")

  const activePlan = G7_PLANS[selectedPlan]

  const weeklyPreview = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7].map((day) => ({
      day,
      meals: G7_BASE_MEALS.filter((meal) => meal.day === day).map(
        (meal) => meal.title
      ),
    }))
  }, [])

  const whatsappUrl = `https://wa.me/201128442058?text=${buildWhatsAppMessage(
    activePlan.name,
    activePlan.arabicName,
    activePlan.price
  )}`

  return (
    <section id="plans" className="pb-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#22D3EE]">
            Choose Your G7 System
          </p>

          <h2 className="mt-2 text-[28px] font-black text-white">
            خطط <span className="text-[#B7F532]">G7</span>
          </h2>
        </div>

        <p className="max-w-md text-right text-[12px] leading-6 text-white/60">
          شوف ملخص كل خطة وأسماء أطباق الأسبوع فقط. التفاصيل الكاملة داخل ملف
          PDF بعد الدفع.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        <aside className="space-y-3">
          {plans.map((plan) => {
            const isActive = selectedPlan === plan.id

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`group relative w-full cursor-pointer overflow-hidden rounded-[24px] border p-4 text-left shadow-[0_22px_70px_rgba(0,0,0,0.25)] transition ${
                  isActive
                    ? "border-[#B7F532] bg-[#102235] ring-2 ring-[#B7F532]/25"
                    : "border-[#22D3EE]/15 bg-[#0B1A29]/92 hover:border-[#22D3EE]/50"
                }`}
              >
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl"
                  style={{ backgroundColor: plan.accent }}
                />

                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border bg-black/15 text-[18px]"
                    style={{
                      borderColor: plan.accent,
                      color: plan.accent,
                    }}
                  >
                    {planIcons[plan.id]}
                  </div>

                  {isActive ? (
                    <span className="rounded-full bg-[#B7F532] px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-black">
                      Selected
                    </span>
                  ) : planTags[plan.id] ? (
                    <span className="rounded-full bg-[#B7F532]/18 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#B7F532]">
                      {planTags[plan.id]}
                    </span>
                  ) : null}
                </div>

                <h3 className="relative z-10 mt-4 text-[15px] font-black uppercase text-white">
                  {plan.name}
                </h3>

                <p className="relative z-10 mt-1 text-[12px] font-black text-[#D8C56A]">
                  {plan.arabicName}
                </p>

                <p className="relative z-10 mt-2 text-[11px] leading-5 text-white/60">
                  {plan.subtitle}
                </p>

                <div className="relative z-10 mt-3 flex items-center justify-between">
                  <span className="text-[17px] font-black text-[#B7F532]">
                    {plan.price}
                  </span>

                  <span className="text-[10px] font-black text-[#22D3EE]">
                    {plan.kcal} kcal
                  </span>
                </div>
              </button>
            )
          })}
        </aside>

        <div className="rounded-[30px] border border-[#22D3EE]/18 bg-[#0B1A29]/88 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#22D3EE]">
                Selected Plan Preview
              </p>

              <h3 className="mt-2 text-[30px] font-black text-white">
                {activePlan.name}
              </h3>

              <p className="mt-1 text-[13px] font-bold text-[#D8C56A]">
                {activePlan.arabicName}
              </p>

              <p className="mt-2 max-w-2xl text-[12px] leading-6 text-white/62">
                {activePlan.description}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              className="rounded-[18px] bg-[#B7F532] px-5 py-3 text-center text-[12px] font-black text-black shadow-[0_18px_50px_rgba(183,245,50,0.22)]"
            >
              أنا مهتم بالخطة دي
            </a>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <MiniStat label="Calories" value={`${activePlan.kcal}`} />
            <MiniStat label="Protein" value={`${activePlan.protein}g`} />
            <MiniStat label="Days" value="7" />
            <MiniStat label="Meals" value="21" />
          </div>

          <div className="mt-5 rounded-[24px] border border-[#D8C56A]/18 bg-[#D8C56A]/[0.045] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D8C56A]">
              What you unlock after payment
            </p>

            <div className="mt-3 grid gap-2 md:grid-cols-4">
              {[
                "المقادير بالجرام",
                "طريقة التحضير SOP",
                "قائمة الشراء",
                "حساب النيء والمطبوخ",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[14px] border border-white/10 bg-black/20 px-3 py-2 text-center text-[11px] font-bold text-white/72"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#22D3EE]">
                  Week Menu Preview
                </p>

                <h4 className="mt-1 text-[20px] font-black text-white">
                  أسماء الأطباق فقط
                </h4>
              </div>

              <p className="text-right text-[11px] leading-5 text-white/45">
                التفاصيل الكاملة تظهر في ملف PDF بعد الدفع.
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {weeklyPreview.map((day) => (
                <article
                  key={day.day}
                  className="rounded-[22px] border border-[#22D3EE]/14 bg-[#08111D]/85 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
                    Day {day.day}
                  </p>

                  <div className="mt-3 space-y-2">
                    {day.meals.map((mealName, index) => (
                      <div
                        key={mealName}
                        className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/[0.035] px-3 py-2"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22D3EE]/12 text-[10px] font-black text-[#22D3EE]">
                          {index === 0 ? "B" : index === 1 ? "L" : "D"}
                        </span>

                        <p className="text-[12px] font-bold text-white/78">
                          {mealName}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-[#B7F532]/18 bg-[#B7F532]/[0.055] p-4 text-center">
            <p className="text-[13px] font-black text-white">
              جاهز تستلم الخطة الكاملة؟
            </p>

            <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-6 text-white/64">
              اضغط على الزر، هيفتح واتساب برسالة جاهزة باسم الخطة اللي اخترتها،
              وبعد الدفع تستلم ملف PDF الكامل.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              className="mt-4 inline-flex rounded-[18px] bg-[#B7F532] px-6 py-3 text-[12px] font-black text-black shadow-[0_18px_50px_rgba(183,245,50,0.22)]"
            >
              ابعتلي على واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#22D3EE]/14 bg-black/20 p-3 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/45">
        {label}
      </p>

      <p className="mt-1 text-[20px] font-black text-[#B7F532]">{value}</p>
    </div>
  )
}