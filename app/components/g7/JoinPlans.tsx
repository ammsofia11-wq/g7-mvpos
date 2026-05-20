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

function buildWhatsAppMessage(
  planName: string,
  arabicName: string,
  price: string
) {
  return encodeURIComponent(
    `مرحبًا G7 👋

اخترت النظام ده:

✅ ${planName}
${arabicName}

اختر طريقة الدفع المناسبة:

1️⃣ Vodafone Cash
2️⃣ WE Cash
3️⃣ InstaPay

السعر:
• ${price}

وأبعتلي رقم طريقة الدفع اللي اخترتها 🙌`
  )
}

export default function JoinPlans() {
  return (
    <section id="plans" className="pb-4">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#22D3EE]">
            Choose Your System
          </p>

          <h2 className="mt-2 text-[28px] font-black text-white">
            خطط <span className="text-[#B7F532]">G7</span>
          </h2>
        </div>

        <p className="max-w-md text-right text-[12px] leading-6 text-white/60">
          اضغط على أي خطة لفتح واتساب برسالة جاهزة.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {Object.values(G7_PLANS).map((plan) => {
          const whatsappUrl = `https://wa.me/201128442058?text=${buildWhatsAppMessage(
            plan.name,
            plan.arabicName,
            plan.price
          )}`

          return (
            <a
              key={plan.id}
              href={whatsappUrl}
              target="_blank"
              className="group relative overflow-hidden rounded-[24px] border border-[#22D3EE]/15 bg-[#0B1A29]/92 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-[#22D3EE]/55 hover:bg-[#0F2235]"
            >
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-16 blur-2xl transition group-hover:opacity-30"
                style={{ backgroundColor: plan.accent }}
              />

              <div
                className="mb-3 h-1.5 w-12 rounded-full"
                style={{ backgroundColor: plan.accent }}
              />

              <div className="flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border bg-black/15 text-[18px] shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                  style={{
                    borderColor: plan.accent,
                    color: plan.accent,
                  }}
                >
                  {planIcons[plan.id]}
                </div>

                {planTags[plan.id] ? (
                  <span className="rounded-full bg-[#B7F532]/18 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#B7F532]">
                    {planTags[plan.id]}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-[16px] font-black uppercase leading-tight text-white">
                {plan.name}
              </h3>

              <p className="mt-1 text-[12px] font-black text-[#D8C56A]">
                {plan.arabicName}
              </p>

              <p className="mt-1 text-[11px] font-bold text-white/55">
                {plan.subtitle}
              </p>

              <p className="mt-3 min-h-[60px] text-[11px] leading-6 text-white/70">
                {plan.description}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[#22D3EE]/12 bg-black/20 p-2 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">
                    KCAL
                  </p>

                  <p className="mt-1 text-[18px] font-black text-white">
                    {plan.kcal}
                  </p>
                </div>

                <div className="rounded-xl border border-[#22D3EE]/12 bg-black/20 p-2 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">
                    Protein
                  </p>

                  <p className="mt-1 text-[18px] font-black text-white">
                    {plan.protein}g
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                {plan.features.slice(0, 2).map((feature) => (
                  <div
                    key={feature}
                    className="rounded-lg border border-white/7 bg-white/[0.035] px-2 py-1.5 text-[10px] text-white/68"
                  >
                    {feature}
                  </div>
                ))}

                <p className="pt-1 text-[10px] font-black text-[#22D3EE]">
                  More +
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-[18px] font-black text-[#B7F532]">
                  {plan.price}
                </p>

                <span className="rounded-xl bg-[#B7F532] px-3 py-2 text-[10px] font-black text-black shadow-[0_12px_35px_rgba(183,245,50,0.18)]">
                  اختار
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}