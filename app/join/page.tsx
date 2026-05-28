"use client"

import { useMemo, useState } from "react"

const WHATSAPP_NUMBER = "201128442058"

const G7_SYSTEMS = [
  {
    id: "lean-bulk",
    name: "LEAN BULK",
    subtitle: "Balanced Athlete Transformation",
    arabic: "زيادة عضلية نظيفة",
    calories: 2200,
    protein: 200,
    carbs: 180,
    price: 75,
    color: "#B7F532",
    warmColor: "#FFB07A",
    promise: "Build lean muscle with controlled carbs, high protein, and real food variety.",
    output: "7-day lean bulk food system with 21 meals, simple cooking steps, and grocery list.",
    meals: [
      "🔥 Smoky Kofta Rice Bowl",
      "🥣 Creamy Muscle Oats",
      "🍝 Italian Chicken Pasta",
      "🥙 Lean Hawawshi",
      "🐟 Tuna Rice Reset",
      "🍗 Cajun Chicken Potato",
    ],
  },
  {
    id: "budget-athlete",
    name: "BUDGET ATHLETE",
    subtitle: "Lifestyle Athlete System",
    arabic: "نظام اقتصادي للرياضيين",
    calories: 2100,
    protein: 180,
    carbs: 160,
    price: 50,
    color: "#19D9E6",
    warmColor: "#FFB07A",
    promise: "A smart affordable system for gym clients who want results without expensive food.",
    output: "7-day budget athlete system using simple ingredients and practical meal prep.",
    meals: [
      "🥙 Chicken Wrap",
      "🍳 Morning Power Eggs",
      "🍚 Tuna Rice Bowl",
      "🍝 Pink Pasta",
      "🥔 Eggs & Potato",
      "🍗 Chicken Rice Box",
    ],
  },
  {
    id: "shredding",
    name: "SHREDDING",
    subtitle: "Elite Fat Loss System",
    arabic: "تنشيف وحرق دهون",
    calories: 1700,
    protein: 180,
    carbs: 120,
    price: 75,
    color: "#FF8C42",
    warmColor: "#FF5A4F",
    promise: "High protein, lower carbs, controlled calories, and meals that still feel exciting.",
    output: "7-day shredding system with filling meals, lean proteins, and fat-loss structure.",
    meals: [
      "🔥 Shred Kofta Bowl",
      "🍳 Lean Omelette",
      "🐟 Tuna Fit Wrap",
      "🥣 Protein Oats",
      "🍋 Lemon Herb Fish",
      "🍗 Spicy Chicken Salad Bowl",
    ],
  },
  {
    id: "mass-gainer",
    name: "MASS GAINER",
    subtitle: "Lean Muscle Growth",
    arabic: "تضخيم عضلي نظيف",
    calories: 3200,
    protein: 240,
    carbs: 300,
    price: 100,
    color: "#D8C56A",
    warmColor: "#FFB07A",
    promise: "A higher calorie system for athletes who need serious fuel without eating randomly.",
    output: "7-day mass gain system with high-calorie meals, controlled protein, and smart carbs.",
    meals: [
      "🍝 Mass Chicken Pasta",
      "🥣 Power Oats",
      "🥩 Beef Power Plate",
      "🌯 Quesadilla Street Fit",
      "🍠 Fajita Sweet Potato",
      "🍚 Chicken Rice Muscle Box",
    ],
  },
  {
    id: "premium-chef",
    name: "PREMIUM CHEF",
    subtitle: "Chef Performance Edition",
    arabic: "تجربة شيف احترافية",
    calories: 2400,
    protein: 210,
    carbs: 200,
    price: 150,
    color: "#D96CFF",
    warmColor: "#FFB07A",
    promise: "A premium chef-style food system for people who want taste, structure, and variety.",
    output: "7-day premium chef system with elevated meals, flavor rotation, and smart prep.",
    meals: [
      "🥩 Egyptian Beef Plate",
      "🍝 Creamy Pink Chicken",
      "🔥 Street Grill Kofta",
      "🍫 Chocolate Recovery Oats",
      "🍋 Lemon Herb Fish",
      "🍗 Chef Chicken Bowl",
    ],
  },
]

const scanSteps = [
  "Reading protein target...",
  "Reading carbs target...",
  "Matching your goal profile...",
  "Generating your 7-day food system...",
]

const quickPresets = [
  {
    label: "200P / 150C",
    protein: "200",
    carbs: "150",
  },
  {
    label: "180P / 120C",
    protein: "180",
    carbs: "120",
  },
  {
    label: "240P / 300C",
    protein: "240",
    carbs: "300",
  },
]

type G7System = (typeof G7_SYSTEMS)[number]

function getSystemFromNumbers(proteinValue: number, carbValue: number) {
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
}

export default function JoinPage() {
  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [engineActivated, setEngineActivated] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<G7System>(G7_SYSTEMS[0])

  const detectedSystem = useMemo(() => {
    const proteinValue = Number(protein)
    const carbValue = Number(carbs)

    if (!proteinValue || !carbValue) return selectedSystem

    return getSystemFromNumbers(proteinValue, carbValue)
  }, [protein, carbs, selectedSystem])

  function buildWhatsappLink(system: G7System) {
    const message = `
السلام عليكم 👋

أنا جربت G7 Coach Numbers Engine.

النظام المقترح:
${system.name}

الهدف:
${system.subtitle}

Protein:
${protein || system.protein}g

Carbs:
${carbs || system.carbs}g

أريد استلام نظام G7 الكامل:
7 أيام / 21 وجبة / طريقة التحضير الأسبوعية / قائمة المشتريات.
`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  function runG7Engine() {
    const finalProtein = protein || "200"
    const finalCarbs = carbs || "150"

    const proteinValue = Number(finalProtein)
    const carbValue = Number(finalCarbs)

    if (!proteinValue || !carbValue) return

    setProtein(finalProtein)
    setCarbs(finalCarbs)
    setEngineActivated(false)
    setIsAnalyzing(true)

    setTimeout(() => {
      setSelectedSystem(getSystemFromNumbers(proteinValue, carbValue))
      setIsAnalyzing(false)
      setEngineActivated(true)
    }, 1200)
  }

  function applyPreset(preset: (typeof quickPresets)[number]) {
    setProtein(preset.protein)
    setCarbs(preset.carbs)
    setEngineActivated(false)
  }

  const smartWhatsappLink = useMemo(
    () => buildWhatsappLink(selectedSystem),
    [selectedSystem, protein, carbs]
  )

  const heroSystem = engineActivated ? selectedSystem : detectedSystem

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B12] pb-24 text-white">
      <div className="pointer-events-none fixed left-[-160px] top-[-160px] h-[340px] w-[340px] rounded-full bg-[#19D9E6]/12 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-120px] top-[160px] h-[340px] w-[340px] rounded-full bg-[#B7F532]/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-180px] left-[30%] h-[360px] w-[360px] rounded-full bg-[#D8C56A]/8 blur-[130px]" />
      <div className="pointer-events-none fixed right-[8%] top-[22%] h-[260px] w-[260px] rounded-full bg-[#C97A42]/12 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[10%] right-[18%] h-[240px] w-[240px] rounded-full bg-[#FF5A4F]/8 blur-[120px]" />

      <section className="relative z-10 mx-auto max-w-[1080px] px-3 py-3 md:px-4 md:py-4">
        <header className="flex items-center justify-between rounded-[22px] border border-[#19D9E6]/15 bg-[#081522]/90 px-3 py-3 backdrop-blur md:px-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/g7-logo-clean.png"
              alt="G7"
              className="h-[42px] w-auto object-contain md:h-[48px]"
            />

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#19D9E6] md:text-[10px] md:tracking-[0.24em]">
                G7 Culinary Intelligence
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-white/40 md:text-[10px] md:tracking-[0.18em]">
                Chef-Based Nutrition OS
              </p>
            </div>
          </div>

          <a
            href={smartWhatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-[14px] bg-[#B7F532] px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] text-black transition hover:scale-[1.02] md:px-4 md:text-[10px] md:tracking-[0.12em]"
          >
            WhatsApp
          </a>
        </header>

        <section className="pt-4 md:pt-5">
          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="order-2 text-center lg:sticky lg:top-5 lg:order-1 lg:text-left">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#19D9E6]/20 bg-[#19D9E6]/10 px-4 py-2 lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-[#B7F532] shadow-[0_0_18px_rgba(183,245,50,0.9)]" />
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#19D9E6]">
                  Live Coach Target Scanner
                </p>
              </div>

              <div className="mt-3 flex justify-center lg:justify-start">
                <div className="rounded-full border border-[#C97A42]/30 bg-[#C97A42]/10 px-4 py-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FFB07A]">
                    New • Smart Engine
                  </p>
                </div>
              </div>

              <h1 className="mt-4 text-[40px] font-black leading-[0.9] tracking-[-0.08em] text-white md:text-[58px]">
                Enter Your
                <span className="block text-[#D8C56A]">Coach Numbers</span>
              </h1>

              <p className="mx-auto mt-4 max-w-md text-[14px] font-semibold leading-7 text-white/62 lg:mx-0">
                Protein + Carbs go in. A real 7-day G7 food system comes out.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-[18px] border border-[#19D9E6]/15 bg-white/[0.04] p-3 text-center shadow-[0_0_25px_rgba(25,217,230,0.05)]">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/35">
                    Input
                  </p>
                  <p className="mt-1 text-[18px] font-black text-[#19D9E6]">
                    2
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#B7F532]/15 bg-white/[0.04] p-3 text-center shadow-[0_0_25px_rgba(183,245,50,0.05)]">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/35">
                    Output
                  </p>
                  <p className="mt-1 text-[18px] font-black text-[#B7F532]">
                    21
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#C97A42]/20 bg-white/[0.04] p-3 text-center shadow-[0_0_25px_rgba(201,122,66,0.08)]">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/35">
                    Time
                  </p>
                  <p className="mt-1 text-[18px] font-black text-[#FFB07A]">
                    5s
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                  What happens next?
                </p>

                <div className="mt-3 space-y-2 text-[11px] font-bold text-white/55">
                  <p>01. Enter protein and carbs.</p>
                  <p>02. G7 scans your target.</p>
                  <p>03. Your food system appears instantly.</p>
                </div>
              </div>
            </div>

            <section
              className="order-1 relative overflow-hidden rounded-[30px] border border-[#19D9E6]/18 bg-[#071421]/95 p-4 shadow-[0_30px_100px_rgba(25,217,230,0.12)] backdrop-blur md:rounded-[32px] md:p-5 lg:order-2"
              style={{
                boxShadow:
                  "0 30px 100px rgba(25,217,230,0.10), 0 0 0 1px rgba(201,122,66,0.10)",
              }}
            >
              <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[#19D9E6]/16 blur-[70px]" />
              <div className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-[220px] w-[220px] rounded-full bg-[#B7F532]/12 blur-[80px]" />
              <div className="pointer-events-none absolute left-[20%] top-[12%] h-[180px] w-[180px] rounded-full bg-[#C97A42]/10 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-[160px] w-[160px] rounded-full bg-[#FF5A4F]/8 blur-[70px]" />

              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(25,217,230,0.65) 30%, rgba(255,122,89,0.65) 70%, transparent 100%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#19D9E6]">
                      Try It Now
                    </p>

                    <h2 className="mt-2 text-[36px] font-black leading-[0.95] tracking-[-0.08em] text-white md:text-[36px]">
                      Build My System
                    </h2>
                  </div>

                  <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <div className="rounded-full border border-[#FF5A4F]/25 bg-[#FF5A4F]/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF8E84]">
                      Hot
                    </div>

                    <div className="rounded-full border border-[#B7F532]/25 bg-[#B7F532]/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
                      Instant
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[12px] font-semibold leading-6 text-white/52">
                  Type your coach targets or tap a quick example.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {quickPresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => applyPreset(preset)}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/60 transition hover:border-[#FF7A59]/35 hover:bg-[#FF7A59]/8 hover:text-[#FFB07A]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <div
                    className="rounded-[24px] border bg-[#06111E]/90 p-4"
                    style={{
                      borderColor: "rgba(25, 217, 230, 0.25)",
                      boxShadow: "0 0 30px rgba(25,217,230,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#19D9E6]">
                        Protein
                      </p>

                      <p className="text-[10px] font-black text-white/25">
                        grams
                      </p>
                    </div>

                    <div className="mt-2 flex items-end justify-center gap-2">
                      <input
                        type="number"
                        value={protein}
                        onChange={(event) => {
                          setProtein(event.target.value)
                          setEngineActivated(false)
                        }}
                        placeholder="200"
                        className="w-full bg-transparent text-center text-[42px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/12"
                      />

                      <span className="mb-3 text-[14px] font-black text-[#19D9E6]">
                        g
                      </span>
                    </div>
                  </div>

                  <div
                    className="rounded-[24px] border bg-[#06111E]/90 p-4"
                    style={{
                      borderColor: "rgba(201, 122, 66, 0.28)",
                      boxShadow: "0 0 30px rgba(201,122,66,0.08)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FFB07A]">
                        Carbs
                      </p>

                      <p className="text-[10px] font-black text-white/25">
                        grams
                      </p>
                    </div>

                    <div className="mt-2 flex items-end justify-center gap-2">
                      <input
                        type="number"
                        value={carbs}
                        onChange={(event) => {
                          setCarbs(event.target.value)
                          setEngineActivated(false)
                        }}
                        placeholder="150"
                        className="w-full bg-transparent text-center text-[42px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/12"
                      />

                      <span className="mb-3 text-[14px] font-black text-[#FFB07A]">
                        g
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runG7Engine}
                  className="mt-5 flex w-full items-center justify-center rounded-[22px] px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.01] md:px-7 md:text-[12px] md:tracking-[0.24em]"
                  style={{
                    background:
                      "linear-gradient(90deg, #19D9E6 0%, #67E4ED 45%, #FF7A59 100%)",
                    boxShadow:
                      "0 0 42px rgba(25,217,230,0.18), 0 0 30px rgba(255,122,89,0.16)",
                  }}
                >
                  {isAnalyzing ? "Generating Your Food System..." : "Generate My G7 System"}
                </button>

                <p className="mt-3 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-white/28 md:text-[10px] md:tracking-[0.16em]">
                  No signup • No waiting • WhatsApp ready
                </p>

                {isAnalyzing ? (
                  <div className="mt-5 rounded-[26px] border border-[#19D9E6]/20 bg-[#06111E]/85 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#19D9E6]">
                        G7 System Generator
                      </p>

                      <div className="h-2 w-2 rounded-full bg-[#B7F532] shadow-[0_0_18px_rgba(183,245,50,0.9)]" />
                    </div>

                    <div className="space-y-2">
                      {scanSteps.map((step, index) => (
                        <div
                          key={step}
                          className="rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold text-white/70"
                        >
                          <span className="mr-2 text-[#FFB07A]">
                            0{index + 1}
                          </span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {engineActivated ? (
                  <div
                    className="mt-5 rounded-[30px] border border-white/10 bg-white/[0.055] p-4 backdrop-blur md:p-5"
                    style={{
                      boxShadow:
                        "0 0 46px rgba(201,122,66,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFB07A]">
                        Generated Plan Preview
                      </p>

                      <h3
                        className="mt-2 text-[36px] font-black tracking-[-0.09em] md:text-[40px]"
                        style={{
                          color: selectedSystem.color,
                        }}
                      >
                        {selectedSystem.name}
                      </h3>

                      <p className="mt-1 text-[13px] font-bold text-white/58">
                        {selectedSystem.promise}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Calories
                        </p>

                        <p className="mt-1 text-[20px] font-black text-white">
                          {selectedSystem.calories}
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Protein
                        </p>

                        <p className="mt-1 text-[20px] font-black text-[#19D9E6]">
                          {protein || selectedSystem.protein}g
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Carbs
                        </p>

                        <p className="mt-1 text-[20px] font-black text-[#FFB07A]">
                          {carbs || selectedSystem.carbs}g
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[#B7F532]/15 bg-[#B7F532]/[0.055] p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
                        What G7 generated for you
                      </p>

                      <p className="mt-2 text-[12px] font-semibold leading-6 text-white/62">
                        {selectedSystem.output}
                      </p>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-[14px] border border-white/10 bg-black/20 p-3">
                          <p className="text-[16px] font-black text-white">
                            7
                          </p>
                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/35">
                            Days
                          </p>
                        </div>

                        <div className="rounded-[14px] border border-white/10 bg-black/20 p-3">
                          <p className="text-[16px] font-black text-white">
                            21
                          </p>
                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/35">
                            Meals
                          </p>
                        </div>

                        <div className="rounded-[14px] border border-white/10 bg-black/20 p-3">
                          <p className="text-[16px] font-black text-white">
                            1
                          </p>
                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/35">
                            List
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#19D9E6]">
                        Meal preview from your plan
                      </p>

                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        {selectedSystem.meals.slice(0, 6).map((meal) => (
                          <div
                            key={meal}
                            className="rounded-[14px] border border-white/10 bg-white/[0.045] px-3 py-3 text-[11px] font-black text-white/72"
                          >
                            {meal}
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={smartWhatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-5 flex w-full items-center justify-center rounded-[20px] bg-[#B7F532] px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.01]"
                    >
                      Send This Plan To WhatsApp
                    </a>
                  </div>
                ) : (
                  <div
                    className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.035] p-4 text-center"
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                    }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                      Live Preview
                    </p>

                    <p
                      className="mt-2 text-[28px] font-black tracking-[-0.07em]"
                      style={{
                        color: heroSystem.color,
                      }}
                    >
                      {heroSystem.name}
                    </p>

                    <p className="mt-1 text-[11px] font-semibold text-white/42">
                      Your generated plan will appear here after scanning.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>

        <section className="pb-8 pt-8 md:pt-10">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#19D9E6]">
                More G7 System Examples
              </p>

              <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
                Other plans you can explore
              </h2>
            </div>

            <p className="max-w-[230px] text-[11px] leading-5 text-white/45 md:text-right">
              The main result is generated above. These are quick examples from
              the G7 library.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {G7_SYSTEMS.map((system) => {
              const selected = selectedSystem.id === system.id
              const whatsappLink = buildWhatsappLink(system)

              return (
                <div
                  key={system.id}
                  className={`relative overflow-hidden rounded-[24px] border p-4 transition-all duration-300 ${
                    selected
                      ? "border-[#B7F532]/60 bg-[#111D25]"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute right-[-40px] top-[-40px] h-[110px] w-[110px] rounded-full opacity-10 blur-3xl"
                    style={{
                      backgroundColor: system.color,
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-[19px] font-black tracking-[-0.06em] text-white">
                      {system.name}
                    </h3>

                    <p
                      className="mt-1 text-[11px] font-black"
                      style={{
                        color: system.color,
                      }}
                    >
                      {system.arabic}
                    </p>

                    <p className="mt-3 min-h-[42px] text-[11px] leading-5 text-white/50">
                      {system.subtitle}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-[14px] border border-white/10 bg-black/20 p-2">
                        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-white/30">
                          kcal
                        </p>

                        <p className="mt-1 text-[16px] font-black text-white">
                          {system.calories}
                        </p>
                      </div>

                      <div className="rounded-[14px] border border-white/10 bg-black/20 p-2">
                        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-white/30">
                          protein
                        </p>

                        <p className="mt-1 text-[16px] font-black text-white">
                          {system.protein}g
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {system.meals.slice(0, 2).map((meal) => (
                        <div
                          key={meal}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-[9px] font-black text-white/60"
                        >
                          {meal}
                        </div>
                      ))}
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setSelectedSystem(system)}
                      className="mt-4 flex w-full items-center justify-center rounded-[16px] bg-[#B7F532] px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:scale-[1.02]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#B7F532]/20 bg-[#07111D]/95 px-4 py-3 backdrop-blur md:hidden">
        <a
          href={smartWhatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-[18px] bg-[#B7F532] px-5 py-4 text-[12px] font-black uppercase tracking-[0.16em] text-black"
        >
          WhatsApp — {selectedSystem.name}
        </a>
      </div>
    </main>
  )
}