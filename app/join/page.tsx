"use client"

import { useEffect, useMemo, useState } from "react"

const WHATSAPP_NUMBER = "201128442058"

const G7_SYSTEMS = [
  {
    id: "budget-athlete",
    name: "G7 FLEX",
    label: "BUDGET ATHLETE",
    subtitle: "Smart Budget Food System",
    arabic: "نظام اقتصادي للرياضيين",
    calories: 2100,
    protein: 180,
    carbs: 200,
    price: 50,
    color: "#19D9E6",
    warmColor: "#FFB07A",
    promise:
      "A smart affordable system for gym clients who want results without expensive food.",
    output:
      "7-day budget athlete system with 21 meals, shopping list, simple prep steps, and portion guidance.",
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
    name: "G7 SHRED",
    label: "SHREDDING",
    subtitle: "Shredding Food System",
    arabic: "تنشيف وحرق دهون",
    calories: 1700,
    protein: 180,
    carbs: 140,
    price: 75,
    color: "#FF4D4D",
    warmColor: "#FF8C42",
    promise:
      "High protein, controlled carbs, lower calories, and meals that still feel exciting.",
    output:
      "7-day shredding system with filling meals, lean proteins, controlled carbs, and fat-loss structure.",
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
    id: "lean-bulk",
    name: "G7 CORE",
    label: "LEAN BULK",
    subtitle: "Clean Muscle Gain System",
    arabic: "زيادة عضلية نظيفة",
    calories: 2200,
    protein: 200,
    carbs: 180,
    price: 75,
    color: "#B7F532",
    warmColor: "#FFB07A",
    promise:
      "Build lean muscle with controlled carbs, high protein, and real food variety.",
    output:
      "7-day clean muscle gain system with 21 meals, cooking steps, portion map, and grocery list.",
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
    id: "mass-gainer",
    name: "G7 MASS",
    label: "MASS GAINER",
    subtitle: "Mass Gain Food System",
    arabic: "تضخيم عضلي نظيف",
    calories: 3200,
    protein: 240,
    carbs: 320,
    price: 100,
    color: "#FF8C42",
    warmColor: "#FFB07A",
    promise:
      "A higher calorie system for athletes who need serious fuel without eating randomly.",
    output:
      "7-day mass gain system with high-calorie meals, controlled protein, smart carbs, and weekly prep.",
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
    name: "G7 PREMIUM",
    label: "PREMIUM CHEF",
    subtitle: "Premium Chef Food System",
    arabic: "تجربة شيف احترافية",
    calories: 2400,
    protein: 220,
    carbs: 220,
    price: 150,
    color: "#D96CFF",
    warmColor: "#FFB07A",
    promise:
      "A premium chef-style food system for people who want taste, structure, and variety.",
    output:
      "7-day premium chef system with elevated meals, flavor rotation, smart prep, and a premium food experience.",
    meals: [
      "🥩 Egyptian Beef Plate",
      "🍝 Creamy Pink Chicken",
      "🔥 Street Grill Kofta",
      "🍫 Chocolate Recovery Oats",
      "🍋 Lemon Herb Fish",
      "🍗 Chef Chicken Bowl",
    ],
  },
] as const

const scanSteps = [
  "Reading protein target...",
  "Reading carbs target...",
  "Matching your goal profile...",
  "Generating your 7-day food system...",
]

const quickPresets = [
  { label: "200P / 150C", protein: "200", carbs: "150" },
  { label: "180P / 120C", protein: "180", carbs: "120" },
  { label: "240P / 300C", protein: "240", carbs: "300" },
]

type G7System = (typeof G7_SYSTEMS)[number]

function getSystemFromNumbers(proteinValue: number, carbValue: number) {
  if (!proteinValue || !carbValue) {
    return G7_SYSTEMS.find((system) => system.id === "lean-bulk") ?? G7_SYSTEMS[0]
  }

  if (proteinValue >= 230 && carbValue >= 260) {
    return G7_SYSTEMS.find((system) => system.id === "mass-gainer") ?? G7_SYSTEMS[0]
  }

  if (proteinValue >= 210 && carbValue >= 170) {
    return G7_SYSTEMS.find((system) => system.id === "premium-chef") ?? G7_SYSTEMS[0]
  }

  if (proteinValue >= 190 && carbValue >= 150) {
    return G7_SYSTEMS.find((system) => system.id === "lean-bulk") ?? G7_SYSTEMS[0]
  }

  if (proteinValue >= 170 && carbValue <= 150) {
    return G7_SYSTEMS.find((system) => system.id === "shredding") ?? G7_SYSTEMS[0]
  }

  return G7_SYSTEMS.find((system) => system.id === "budget-athlete") ?? G7_SYSTEMS[0]
}

export default function JoinPage() {
  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [engineActivated, setEngineActivated] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedSystem, setSelectedSystem] = useState<G7System>(
    G7_SYSTEMS.find((system) => system.id === "lean-bulk") ?? G7_SYSTEMS[0]
  )

  const detectedSystem = useMemo(() => {
    const proteinValue = Number(protein)
    const carbValue = Number(carbs)

    if (!proteinValue || !carbValue) return selectedSystem

    return getSystemFromNumbers(proteinValue, carbValue)
  }, [protein, carbs, selectedSystem])

  useEffect(() => {
    if (!isAnalyzing) return

    const timers = scanSteps.map((_, index) =>
      window.setTimeout(() => {
        setActiveStep(index)
      }, index * 360)
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [isAnalyzing])

  function buildWhatsappLink(system: G7System) {
    const message = `
Hello G7 Team 👋

I tried the G7 Coach Numbers Engine.

My coach numbers:
Protein: ${protein || system.protein}g
Carbs: ${carbs || system.carbs}g

Generated package:
${system.name} - ${system.subtitle}

Package price:
${system.price} EGP

Payment method:
Vodafone Cash / Etisalat Cash / InstaPay

Please send me the payment details.

I would like to receive my complete G7 food system:
7 days / 21 meals / weekly prep method / shopping list / portion guidance.
`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  function runG7Engine() {
    const finalProtein = protein.trim() || "200"
    const finalCarbs = carbs.trim() || "150"

    const proteinValue = Number(finalProtein)
    const carbValue = Number(finalCarbs)

    if (!proteinValue || !carbValue) {
      setEngineActivated(false)
      return
    }

    const generatedSystem = getSystemFromNumbers(proteinValue, carbValue)

    setProtein(finalProtein)
    setCarbs(finalCarbs)
    setSelectedSystem(generatedSystem)
    setEngineActivated(false)
    setIsAnalyzing(true)
    setActiveStep(0)

    window.setTimeout(() => {
      setIsAnalyzing(false)
      setEngineActivated(true)
      setSelectedSystem(generatedSystem)
    }, 1700)
  }

  function applyPreset(preset: (typeof quickPresets)[number]) {
    const presetSystem = getSystemFromNumbers(Number(preset.protein), Number(preset.carbs))

    setProtein(preset.protein)
    setCarbs(preset.carbs)
    setSelectedSystem(presetSystem)
    setEngineActivated(false)
    setIsAnalyzing(false)
    setActiveStep(0)
  }

  const smartWhatsappLink = useMemo(
    () => buildWhatsappLink(selectedSystem),
    [selectedSystem, protein, carbs]
  )

  const heroSystem = engineActivated ? selectedSystem : detectedSystem

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B12] pb-24 text-white">
      <div className="pointer-events-none fixed left-[-160px] top-[-160px] h-[340px] w-[340px] rounded-full bg-[#19D9E6]/12 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-120px] top-[160px] h-[340px] w-[340px] rounded-full bg-[#8FD14F]/10 blur-[120px]" />
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
            className="rounded-[14px] bg-[#8FD14F] px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] text-black transition hover:scale-[1.02] md:px-4 md:text-[10px] md:tracking-[0.12em]"
          >
            WhatsApp
          </a>
        </header>

        <section className="pt-4 md:pt-5">
          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="order-2 text-center lg:sticky lg:top-5 lg:order-1 lg:text-left">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#19D9E6]/20 bg-[#19D9E6]/10 px-4 py-2 lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-[#8FD14F] shadow-[0_0_18px_rgba(143,209,79,0.9)]" />
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

                <div className="rounded-[18px] border border-[#B7F532]/15 bg-white/[0.04] p-3 text-center shadow-[0_0_25px_rgba(143,209,79,0.05)]">
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
              <div className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-[220px] w-[220px] rounded-full bg-[#8FD14F]/12 blur-[80px]" />
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

                    <div className="rounded-full border border-[#B7F532]/25 bg-[#8FD14F]/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
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
                      type="button"
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
                          const nextValue = event.target.value
                          setProtein(nextValue)
                          setEngineActivated(false)
                          setIsAnalyzing(false)
                          setActiveStep(0)

                          const proteinValue = Number(nextValue)
                          const carbValue = Number(carbs)

                          if (proteinValue && carbValue) {
                            setSelectedSystem(getSystemFromNumbers(proteinValue, carbValue))
                          }
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
                          const nextValue = event.target.value
                          setCarbs(nextValue)
                          setEngineActivated(false)
                          setIsAnalyzing(false)
                          setActiveStep(0)

                          const proteinValue = Number(protein)
                          const carbValue = Number(nextValue)

                          if (proteinValue && carbValue) {
                            setSelectedSystem(getSystemFromNumbers(proteinValue, carbValue))
                          }
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
                  type="button"
                  disabled={isAnalyzing}
                  className="mt-5 flex w-full items-center justify-center rounded-[22px] px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80 md:px-7 md:text-[12px] md:tracking-[0.24em]"
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

                <div className="mt-3 rounded-[18px] border border-[#B7F532]/15 bg-[#8FD14F]/[0.055] px-4 py-3 text-center">
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
                    Payment available
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-white/62">
                    Vodafone Cash • Etisalat Cash • InstaPay
                  </p>
                </div>

                {isAnalyzing ? (
                  <div className="mt-5 rounded-[26px] border border-[#19D9E6]/20 bg-[#06111E]/85 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#19D9E6]">
                        G7 System Generator
                      </p>

                      <div className="h-2 w-2 rounded-full bg-[#8FD14F] shadow-[0_0_18px_rgba(143,209,79,0.9)]" />
                    </div>

                    <div className="space-y-2">
                      {scanSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`rounded-[14px] border px-3 py-2 text-[11px] font-bold transition ${
                            index <= activeStep
                              ? "border-[#B7F532]/25 bg-[#B7F532]/10 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/35"
                          }`}
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

                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#B7F532]/25 bg-[#B7F532]/10 px-4 py-2">
                        <span className="h-2 w-2 rounded-full bg-[#B7F532] shadow-[0_0_14px_rgba(183,245,50,0.8)]" />
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
                          Generated package
                        </p>
                      </div>

                      <h3
                        className="mt-3 text-[38px] font-black tracking-[-0.09em] md:text-[44px]"
                        style={{
                          color: selectedSystem.color,
                        }}
                      >
                        {selectedSystem.name}
                      </h3>

                      <p className="mt-1 text-[14px] font-black text-white">
                        {selectedSystem.subtitle}
                      </p>

                      <p className="mt-2 text-[13px] font-bold leading-6 text-white/58">
                        {selectedSystem.promise}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Price
                        </p>

                        <p className="mt-1 text-[22px] font-black text-[#B7F532]">
                          {selectedSystem.price}
                        </p>

                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/35">
                          EGP
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Calories
                        </p>

                        <p className="mt-1 text-[22px] font-black text-white">
                          {selectedSystem.calories}
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Protein
                        </p>

                        <p className="mt-1 text-[22px] font-black text-[#19D9E6]">
                          {protein || selectedSystem.protein}g
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Carbs
                        </p>

                        <p className="mt-1 text-[22px] font-black text-[#FFB07A]">
                          {carbs || selectedSystem.carbs}g
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[#B7F532]/15 bg-[#8FD14F]/[0.055] p-4">
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
                        Meal preview from your package
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

                    <div className="mt-4 rounded-[22px] border border-[#19D9E6]/15 bg-[#19D9E6]/[0.045] p-4 text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#19D9E6]">
                        Payment methods
                      </p>

                      <p className="mt-2 text-[12px] font-bold leading-6 text-white/62">
                        Vodafone Cash • Etisalat Cash • InstaPay
                      </p>

                      <p className="mt-1 text-[10px] font-semibold leading-5 text-white/38">
                        Tap WhatsApp and we will send the payment details for your generated package.
                      </p>
                    </div>

                    <a
                      href={smartWhatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-5 flex w-full items-center justify-center rounded-[20px] bg-[#8FD14F] px-7 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.01]"
                    >
                      Send {selectedSystem.name} To WhatsApp
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
                      Live Package Preview
                    </p>

                    <p
                      className="mt-2 text-[28px] font-black tracking-[-0.07em]"
                      style={{
                        color: heroSystem.color,
                      }}
                    >
                      {heroSystem.name}
                    </p>

                    <p className="mt-1 text-[13px] font-black text-white/70">
                      {heroSystem.subtitle}
                    </p>

                    <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-[#B7F532]/20 bg-[#B7F532]/10 px-4 py-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#B7F532]">
                        {heroSystem.price} EGP
                      </p>
                    </div>

                    <p className="mt-2 text-[11px] font-semibold text-white/42">
                      Press Generate to activate the full package preview.
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
                G7 Package Library
              </p>

              <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
                Choose the package that fits your numbers
              </h2>
            </div>

            <p className="max-w-[260px] text-[11px] leading-5 text-white/45 md:text-right">
              The generated package appears above. Payment is available via
              Vodafone Cash, Etisalat Cash, or InstaPay.
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

                  {selected ? (
                    <div className="absolute right-3 top-3 rounded-full bg-[#B7F532] px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-black">
                      Matched
                    </div>
                  ) : null}

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

                    <div className="mt-4 rounded-[18px] border border-white/10 bg-black/25 p-3 text-center">
                      <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                        Package price
                      </p>

                      <div className="mt-1 flex items-end justify-center gap-1">
                        <p
                          className="text-[28px] font-black tracking-[-0.06em]"
                          style={{ color: system.color }}
                        >
                          {system.price}
                        </p>
                        <p className="mb-1 text-[10px] font-black text-white/65">
                          EGP
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
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
                      className="mt-4 flex w-full items-center justify-center rounded-[16px] bg-[#8FD14F] px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:scale-[1.02]"
                    >
                      WhatsApp — {system.price} EGP
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
          className="flex w-full items-center justify-center rounded-[18px] bg-[#8FD14F] px-5 py-4 text-[12px] font-black uppercase tracking-[0.16em] text-black"
        >
          WhatsApp — {selectedSystem.name} • {selectedSystem.price} EGP
        </a>
      </div>
    </main>
  )
}
