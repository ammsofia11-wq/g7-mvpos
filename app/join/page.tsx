"use client"

import { useMemo, useRef, useState } from "react"

const WHATSAPP_NUMBER = "201128442058"

const G7_SYSTEMS = [
  {
    id: "lean-bulk",
    name: "LEAN BULK",
    subtitle: "Balanced Athlete Transformation",
    arabic: "زيادة عضلية نظيفة",
    calories: 2200,
    protein: 200,
    price: 75,
    color: "#B7F532",
    meals: [
      "🔥 Smoky Kofta Rice Bowl",
      "🥣 Creamy Muscle Oats",
      "🍝 Italian Chicken Pasta",
      "🥙 Lean Hawawshi",
      "🐟 Tuna Rice Reset",
    ],
  },
  {
    id: "budget-athlete",
    name: "BUDGET ATHLETE",
    subtitle: "Lifestyle Athlete System",
    arabic: "نظام اقتصادي للرياضيين",
    calories: 2100,
    protein: 180,
    price: 50,
    color: "#19D9E6",
    meals: [
      "🥙 Chicken Wrap",
      "🍳 Morning Power Eggs",
      "🍚 Tuna Rice Bowl",
      "🍝 Pink Pasta",
      "🥔 Eggs & Potato",
    ],
  },
  {
    id: "shredding",
    name: "SHREDDING",
    subtitle: "Elite Fat Loss System",
    arabic: "تنشيف وحرق دهون",
    calories: 1700,
    protein: 180,
    price: 75,
    color: "#FF8C42",
    meals: [
      "🔥 Shred Kofta Bowl",
      "🍳 Lean Omelette",
      "🐟 Tuna Fit Wrap",
      "🥣 Protein Oats",
      "🍋 Lemon Herb Fish",
    ],
  },
  {
    id: "mass-gainer",
    name: "MASS GAINER",
    subtitle: "Lean Muscle Growth",
    arabic: "تضخيم عضلي نظيف",
    calories: 3200,
    protein: 240,
    price: 100,
    color: "#D8C56A",
    meals: [
      "🍝 Mass Chicken Pasta",
      "🥣 Power Oats",
      "🥩 Beef Power Plate",
      "🌯 Quesadilla Street Fit",
      "🍠 Fajita Sweet Potato",
    ],
  },
  {
    id: "premium-chef",
    name: "PREMIUM CHEF",
    subtitle: "Chef Performance Edition",
    arabic: "تجربة شيف احترافية",
    calories: 2400,
    protein: 210,
    price: 150,
    color: "#D96CFF",
    meals: [
      "🥩 Egyptian Beef Plate",
      "🍝 Creamy Pink Chicken",
      "🔥 Street Grill Kofta",
      "🍫 Chocolate Recovery Oats",
      "🍋 Lemon Herb Fish",
    ],
  },
]

const scanSteps = [
  "Reading coach targets...",
  "Matching your goal...",
  "Suggesting your G7 system...",
]

type G7System = (typeof G7_SYSTEMS)[number]

export default function JoinPage() {
  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [engineActivated, setEngineActivated] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<G7System>(G7_SYSTEMS[0])

  const engineRef = useRef<HTMLElement | null>(null)

  const detectedSystem = useMemo(() => {
    const proteinValue = Number(protein)
    const carbValue = Number(carbs)

    if (!proteinValue || !carbValue) return G7_SYSTEMS[0]

    if (proteinValue >= 220 && carbValue >= 250) {
      return G7_SYSTEMS.find((system) => system.id === "mass-gainer") ?? G7_SYSTEMS[0]
    }

    if (proteinValue >= 200 && carbValue <= 220) {
      return G7_SYSTEMS.find((system) => system.id === "lean-bulk") ?? G7_SYSTEMS[0]
    }

    if (proteinValue >= 180 && carbValue <= 160) {
      return G7_SYSTEMS.find((system) => system.id === "shredding") ?? G7_SYSTEMS[0]
    }

    if (proteinValue <= 170) {
      return G7_SYSTEMS.find((system) => system.id === "budget-athlete") ?? G7_SYSTEMS[0]
    }

    return G7_SYSTEMS.find((system) => system.id === "premium-chef") ?? G7_SYSTEMS[0]
  }, [protein, carbs])

  function buildWhatsappLink(system: G7System) {
    const message = `
السلام عليكم 👋

أنا مهتم بخطة ${system.name}

الهدف:
${system.subtitle}

Protein:
${protein || system.protein}g

Carbs:
${carbs || "حسب هدف الكوتش"}

أريد استلام نظام G7 الكامل:
7 أيام / 21 وجبة / طريقة التحضير الأسبوعية / قائمة المشتريات.
`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  function runG7Engine() {
    if (!protein || !carbs || !detectedSystem) return

    setEngineActivated(false)
    setIsAnalyzing(true)

    setTimeout(() => {
      setSelectedSystem(detectedSystem)
      setIsAnalyzing(false)
      setEngineActivated(true)
    }, 1000)
  }

  const smartWhatsappLink = useMemo(
    () => buildWhatsappLink(selectedSystem),
    [selectedSystem, protein, carbs]
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111D] pb-24 text-white">
      <div className="pointer-events-none fixed left-[-160px] top-[-160px] h-[320px] w-[320px] rounded-full bg-[#19D9E6]/10 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-140px] top-[180px] h-[300px] w-[300px] rounded-full bg-[#B7F532]/10 blur-[120px]" />

      <section className="relative z-10 mx-auto max-w-[1040px] px-4 py-4">
        <header className="flex items-center justify-between rounded-[22px] border border-[#19D9E6]/15 bg-[#0B1725]/85 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <img
              src="/images/g7-logo-clean.png"
              alt="G7"
              className="h-[48px] w-auto object-contain"
            />

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#19D9E6]">
                G7 Culinary Intelligence
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                Chef-Based Nutrition
              </p>
            </div>
          </div>

          <a
            href={smartWhatsappLink}
            target="_blank"
            className="rounded-[14px] bg-[#B7F532] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-black"
          >
            WhatsApp
          </a>
        </header>

        <section className="py-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#19D9E6]">
            Scan • Choose • WhatsApp
          </p>

          <h1 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.07em] text-white md:text-[52px]">
            اختار النظام
            <span className="block text-[#D8C56A]">اللي شبهك</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[13px] font-semibold leading-7 text-white/60">
            اختار خطتك، ابعت رسالة واتساب جاهزة، واستلم نظام G7 كامل باسمك:
            7 أيام، 21 وجبة، تحضير أسبوعي، وقائمة مشتريات.
          </p>

          <button
            onClick={() =>
              engineRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="mt-5 rounded-[18px] border border-[#19D9E6]/25 bg-[#19D9E6]/10 px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#19D9E6]"
          >
            عندك أرقام الكوتش؟ جرّبها
          </button>
        </section>

        <section className="pb-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#19D9E6]">
                Choose Your Plan
              </p>

              <h2 className="mt-2 text-[30px] font-black tracking-[-0.06em] text-white">
                اختار خطتك
              </h2>
            </div>

            <p className="max-w-[210px] text-right text-[11px] leading-5 text-white/45">
              اضغط على أي خطة لفتح واتساب برسالة جاهزة.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {G7_SYSTEMS.map((system) => {
              const selected = selectedSystem.id === system.id
              const whatsappLink = buildWhatsappLink(system)

              return (
                <div
                  key={system.id}
                  className={`relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border p-5 transition-all duration-300 ${
                    selected
                      ? "border-[#B7F532]/70 bg-[#111D25]"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute right-[-60px] top-[-60px] h-[160px] w-[160px] rounded-full opacity-10 blur-3xl"
                    style={{
                      backgroundColor: system.color,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div>
                      <h3 className="text-[26px] font-black tracking-[-0.06em] text-white">
                        {system.name}
                      </h3>

                      <p
                        className="mt-1 text-[12px] font-black"
                        style={{
                          color: system.color,
                        }}
                      >
                        {system.arabic}
                      </p>

                      <p className="mt-4 text-[13px] leading-6 text-white/55">
                        {system.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/30">
                          Calories
                        </p>

                        <p
                          className="mt-1 text-[24px] font-black"
                          style={{
                            color: system.color,
                          }}
                        >
                          {system.calories}
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/30">
                          Protein
                        </p>

                        <p className="mt-1 text-[24px] font-black text-white">
                          {system.protein}g
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#19D9E6]">
                        Meal Preview
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {system.meals.map((meal) => (
                          <div
                            key={meal}
                            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-black text-white/75"
                          >
                            {meal}
                          </div>
                        ))}

                        <div className="rounded-full border border-dashed border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
                          +16 More
                        </div>
                      </div>

                      <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/35">
                        7 Days • 21 Meals • Grocery List • Prep System
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Price
                        </p>

                        <p
                          className="mt-1 text-[28px] font-black"
                          style={{
                            color: system.color,
                          }}
                        >
                          {system.price} جنيه
                        </p>
                      </div>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        onClick={() => setSelectedSystem(system)}
                        className="rounded-[18px] bg-[#B7F532] px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_24px_rgba(183,245,50,0.16)]"
                      >
                        افتح واتساب
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section
          ref={engineRef}
          className="rounded-[28px] border border-[#19D9E6]/15 bg-[#06111E]/80 p-5 backdrop-blur"
        >
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#19D9E6]">
              Coach Numbers Engine
            </p>

            <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
              عندك أرقام الكوتش؟
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-[12px] leading-6 text-white/50">
              اكتب البروتين والكارب، و G7 يقترح أقرب نظام مناسب لك.
            </p>
          </div>

          <div className="mx-auto mt-5 grid max-w-xl gap-3 md:grid-cols-2">
            <div className="rounded-[22px] border border-[#19D9E6]/20 bg-[#09131F]/90 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#19D9E6]">
                Protein
              </p>

              <div className="mt-2 flex items-end justify-center gap-2">
                <input
                  type="number"
                  value={protein}
                  onChange={(event) => setProtein(event.target.value)}
                  placeholder="200"
                  className="w-full bg-transparent text-center text-[34px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/15"
                />

                <span className="mb-2 text-[13px] font-black text-[#19D9E6]">
                  g
                </span>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#D8C56A]/20 bg-[#09131F]/90 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D8C56A]">
                Carbs
              </p>

              <div className="mt-2 flex items-end justify-center gap-2">
                <input
                  type="number"
                  value={carbs}
                  onChange={(event) => setCarbs(event.target.value)}
                  placeholder="150"
                  className="w-full bg-transparent text-center text-[34px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/15"
                />

                <span className="mb-2 text-[13px] font-black text-[#D8C56A]">
                  g
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={runG7Engine}
            className="mx-auto mt-5 flex rounded-[18px] bg-[#19D9E6] px-7 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(25,217,230,0.18)]"
          >
            {isAnalyzing ? "Analyzing..." : "Find My G7 System"}
          </button>

          {isAnalyzing && (
            <div className="mx-auto mt-5 max-w-xl rounded-[24px] border border-[#19D9E6]/20 bg-[#06111E]/85 p-4">
              <div className="space-y-2">
                {scanSteps.map((step) => (
                  <div
                    key={step}
                    className="rounded-[14px] border border-[#19D9E6]/15 bg-[#19D9E6]/5 px-3 py-2 text-[11px] font-bold text-white/65"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {engineActivated && (
            <div className="mx-auto mt-5 max-w-xl rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Suggested System
              </p>

              <h3
                className="mt-2 text-[34px] font-black tracking-[-0.07em]"
                style={{
                  color: selectedSystem.color,
                }}
              >
                {selectedSystem.name}
              </h3>

              <p className="mt-1 text-[13px] font-bold text-white/55">
                {selectedSystem.subtitle}
              </p>

              <a
                href={smartWhatsappLink}
                target="_blank"
                className="mx-auto mt-5 flex w-fit items-center justify-center rounded-[18px] bg-[#B7F532] px-7 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-black"
              >
                افتح واتساب
              </a>
            </div>
          )}
        </section>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#B7F532]/20 bg-[#07111D]/95 px-4 py-3 backdrop-blur md:hidden">
        <a
          href={smartWhatsappLink}
          target="_blank"
          className="flex w-full items-center justify-center rounded-[18px] bg-[#B7F532] px-5 py-4 text-[12px] font-black uppercase tracking-[0.16em] text-black"
        >
          افتح واتساب — {selectedSystem.name}
        </a>
      </div>
    </main>
  )
}