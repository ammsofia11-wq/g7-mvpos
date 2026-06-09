"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const WHATSAPP_NUMBER = "201128442058"

const G7_SYSTEMS = [
  {
    id: "shredding",
    name: "G7 SHRED",
    label: "SHREDDING",
    subtitle: "Shredding Food System",
    arabic: "تنشيف وحرق دهون",
    calories: 1700,
    protein: 180,
    carbs: 140,
    fat: 47,
    price: 75,
    color: "#FF4D4D",
    warmColor: "#FF8C42",
    promise:
      "High protein, controlled carbs, lower calories, and meals that still feel exciting.",
    output:
      "7-day shredding system with filling meals, lean proteins, controlled carbs, weekly prep, shopping list, and portion guidance.",
    pattern: "HIGH PROTEIN / CONTROLLED CARBS",
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
    id: "budget-athlete",
    name: "G7 FLEX",
    label: "FLEX",
    subtitle: "Smart Budget Food System",
    arabic: "نظام جيم اقتصادي مرن",
    calories: 1900,
    protein: 160,
    carbs: 180,
    fat: 53,
    price: 50,
    color: "#19D9E6",
    warmColor: "#FFB07A",
    promise:
      "A smart affordable system for gym clients who want clear results without expensive food.",
    output:
      "7-day flexible budget gym system with 21 meals, shopping list, simple prep steps, and practical portion guidance.",
    pattern: "BUDGET / PRACTICAL GYM ROUTINE",
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
    id: "lean-bulk",
    name: "G7 CORE",
    label: "CORE",
    subtitle: "Balanced Gym Food System",
    arabic: "نظام جيم متوازن",
    calories: 2000,
    protein: 180,
    carbs: 200,
    fat: 53,
    price: 75,
    color: "#B7F532",
    warmColor: "#FFB07A",
    promise:
      "A balanced gym system for better shape, performance, and a consistent real-food routine.",
    output:
      "7-day balanced gym system with 21 meals, cooking steps, portion map, shopping list, and weekly prep method.",
    pattern: "BALANCED PERFORMANCE / RECOMP",
    meals: [
      "🔥 Smoky Kofta Rice Bowl",
      "🥣 Creamy Protein Oats",
      "🍝 Italian Chicken Pasta",
      "🥙 Lean Hawawshi",
      "🐟 Tuna Rice Reset",
      "🍗 Cajun Chicken Potato",
    ],
  },
  {
    id: "premium-chef",
    name: "G7 PREMIUM",
    label: "PREMIUM CHEF",
    subtitle: "Premium Chef Food System",
    arabic: "نظام شيف بريميوم للجيم",
    calories: 2200,
    protein: 190,
    carbs: 230,
    fat: 58,
    price: 100,
    color: "#D96CFF",
    warmColor: "#FFB07A",
    promise:
      "A premium chef-style gym system for people who want taste, structure, and better food experience.",
    output:
      "7-day premium chef gym system with elevated meals, flavor rotation, smart prep, shopping list, and a premium food experience.",
    pattern: "PREMIUM FUEL / CHEF EXPERIENCE",
    meals: [
      "🥩 Egyptian Beef Plate",
      "🍝 Creamy Pink Chicken",
      "🔥 Street Grill Kofta",
      "🍫 Chocolate Recovery Oats",
      "🍋 Lemon Herb Fish",
      "🍗 Chef Chicken Bowl",
    ],
  },
  {
    id: "mass-gainer",
    name: "G7 MASS",
    label: "MASS GAINER",
    subtitle: "Mass Gain Food System",
    arabic: "زيادة كتلة عضلية",
    calories: 2500,
    protein: 200,
    carbs: 300,
    fat: 56,
    price: 75,
    color: "#FF8C42",
    warmColor: "#FFB07A",
    promise:
      "A higher energy system for athletes who need serious fuel without eating randomly.",
    output:
      "7-day mass gain system with higher carbs, strong protein, weekly prep, shopping list, and practical portion guidance.",
    pattern: "HIGH FUEL / MASS GAIN",
    meals: [
      "🍝 Mass Chicken Pasta",
      "🥣 Power Oats",
      "🥩 Beef Power Plate",
      "🌯 Quesadilla Street Fit",
      "🍠 Fajita Sweet Potato",
      "🍚 Chicken Rice Muscle Box",
    ],
  },
] as const

const scanSteps = [
  "Reading protein target...",
  "Reading carbs target...",
  "Locking gym goal pattern...",
  "Building your 7-day food system...",
  "System reveal ready...",
]

const quickPresets = [
  { label: "180P / 140C", protein: "180", carbs: "140" },
  { label: "180P / 150C", protein: "180", carbs: "150" },
  { label: "160P / 180C", protein: "160", carbs: "180" },
  { label: "180P / 200C", protein: "180", carbs: "200" },
  { label: "190P / 230C", protein: "190", carbs: "230" },
  { label: "200P / 300C", protein: "200", carbs: "300" },
]

type G7System = (typeof G7_SYSTEMS)[number]

function findSystem(systemId: G7System["id"]) {
  return G7_SYSTEMS.find((system) => system.id === systemId) ?? G7_SYSTEMS[0]
}

function getSystemFromNumbers(proteinValue: number, carbValue: number) {
  if (!proteinValue || !carbValue) {
    return findSystem("lean-bulk")
  }

  if (proteinValue >= 195 && carbValue >= 260) {
    return findSystem("mass-gainer")
  }

  if (proteinValue >= 185 && carbValue >= 215) {
    return findSystem("premium-chef")
  }

  if (proteinValue >= 170 && carbValue <= 160) {
    return findSystem("shredding")
  }

  if (proteinValue <= 170 && carbValue <= 195) {
    return findSystem("budget-athlete")
  }

  return findSystem("lean-bulk")
}

export default function JoinPage() {
  const resultRef = useRef<HTMLDivElement | null>(null)

  const [protein, setProtein] = useState("")
  const [carbs, setCarbs] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [engineActivated, setEngineActivated] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [scanPercent, setScanPercent] = useState(0)
  const [selectedSystem, setSelectedSystem] = useState<G7System>(
    findSystem("lean-bulk")
  )

  const detectedSystem = useMemo(() => {
    const proteinValue = Number(protein)
    const carbValue = Number(carbs)

    if (!proteinValue || !carbValue) return selectedSystem

    return getSystemFromNumbers(proteinValue, carbValue)
  }, [protein, carbs, selectedSystem])

  const heroSystem = engineActivated ? selectedSystem : detectedSystem

  useEffect(() => {
    if (!isAnalyzing) {
      setScanPercent(0)
      return
    }

    const stepTimers = scanSteps.map((_, index) =>
      window.setTimeout(() => {
        setActiveStep(index)
      }, index * 420)
    )

    const progressTimers = [12, 31, 55, 78, 100].map((value, index) =>
      window.setTimeout(() => {
        setScanPercent(value)
      }, index * 420 + 120)
    )

    return () => {
      stepTimers.forEach((timer) => window.clearTimeout(timer))
      progressTimers.forEach((timer) => window.clearTimeout(timer))
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

Package target:
${system.calories} kcal / ${system.protein}g protein / ${system.carbs}g carbs / ${system.fat}g fat

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
    const finalProtein = protein.trim() || "180"
    const finalCarbs = carbs.trim() || "200"

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
    setScanPercent(0)

    window.setTimeout(() => {
      setIsAnalyzing(false)
      setEngineActivated(true)
      setSelectedSystem(generatedSystem)

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 120)
    }, 2350)
  }

  function applyPreset(preset: (typeof quickPresets)[number]) {
    const presetSystem = getSystemFromNumbers(
      Number(preset.protein),
      Number(preset.carbs)
    )

    setProtein(preset.protein)
    setCarbs(preset.carbs)
    setSelectedSystem(presetSystem)
    setEngineActivated(false)
    setIsAnalyzing(false)
    setActiveStep(0)
    setScanPercent(0)
  }

  const smartWhatsappLink = useMemo(
    () => buildWhatsappLink(selectedSystem),
    [selectedSystem, protein, carbs]
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B12] pb-24 text-white">
      <style>{`
        @keyframes g7RingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes g7CounterSpin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes g7GlowSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }

        @keyframes g7RevealPop {
          0% { transform: translateY(20px) scale(0.94); opacity: 0; filter: blur(8px); }
          60% { transform: translateY(-4px) scale(1.02); opacity: 1; filter: blur(0); }
          100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
        }

        @keyframes g7PulseBorder {
          0%, 100% { box-shadow: 0 0 0 rgba(183,245,50,0.0), 0 0 40px rgba(25,217,230,0.10); }
          50% { box-shadow: 0 0 32px rgba(183,245,50,0.26), 0 0 70px rgba(25,217,230,0.18); }
        }

        @keyframes g7NumberBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }

        .g7-ring-spin {
          animation: g7RingSpin 1.2s linear infinite;
        }

        .g7-counter-spin {
          animation: g7CounterSpin 1.8s linear infinite;
        }

        .g7-glow-sweep {
          animation: g7GlowSweep 1.1s ease-in-out infinite;
        }

        .g7-reveal-pop {
          animation: g7RevealPop 0.55s cubic-bezier(.2,.9,.25,1.2) both;
        }

        .g7-pulse-border {
          animation: g7PulseBorder 1.15s ease-in-out infinite;
        }

        .g7-number-beat {
          animation: g7NumberBeat 0.9s ease-in-out infinite;
        }
      `}</style>

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

              <p className="mx-auto mt-2 max-w-md text-[13px] font-bold leading-6 text-[#D8C56A]/80 lg:mx-0">
                اكتب أرقام الكوتش… وسيب G7 يحولهم لنظام أكل كامل.
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
              className={`order-1 relative overflow-hidden rounded-[30px] border bg-[#071421]/95 p-4 shadow-[0_30px_100px_rgba(25,217,230,0.12)] backdrop-blur md:rounded-[32px] md:p-5 lg:order-2 ${
                isAnalyzing ? "g7-pulse-border border-[#B7F532]/45" : "border-[#19D9E6]/18"
              }`}
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

                    <h2 className="mt-2 text-[34px] font-black leading-[0.95] tracking-[-0.08em] text-white md:text-[36px]">
                      Build My G7 System
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
                    className={`rounded-[24px] border bg-[#06111E]/90 p-4 ${
                      isAnalyzing ? "g7-number-beat" : ""
                    }`}
                    style={{
                      borderColor: isAnalyzing
                        ? "rgba(183, 245, 50, 0.45)"
                        : "rgba(25, 217, 230, 0.25)",
                      boxShadow: isAnalyzing
                        ? "0 0 40px rgba(183,245,50,0.14)"
                        : "0 0 30px rgba(25,217,230,0.06)",
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
                          setScanPercent(0)

                          const proteinValue = Number(nextValue)
                          const carbValue = Number(carbs)

                          if (proteinValue && carbValue) {
                            setSelectedSystem(
                              getSystemFromNumbers(proteinValue, carbValue)
                            )
                          }
                        }}
                        placeholder="180"
                        className="w-full bg-transparent text-center text-[42px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/12"
                      />

                      <span className="mb-3 text-[14px] font-black text-[#19D9E6]">
                        g
                      </span>
                    </div>
                  </div>

                  <div
                    className={`rounded-[24px] border bg-[#06111E]/90 p-4 ${
                      isAnalyzing ? "g7-number-beat" : ""
                    }`}
                    style={{
                      borderColor: isAnalyzing
                        ? "rgba(183, 245, 50, 0.45)"
                        : "rgba(201, 122, 66, 0.28)",
                      boxShadow: isAnalyzing
                        ? "0 0 40px rgba(255,176,122,0.14)"
                        : "0 0 30px rgba(201,122,66,0.08)",
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
                          setScanPercent(0)

                          const proteinValue = Number(protein)
                          const carbValue = Number(nextValue)

                          if (proteinValue && carbValue) {
                            setSelectedSystem(
                              getSystemFromNumbers(proteinValue, carbValue)
                            )
                          }
                        }}
                        placeholder="200"
                        className="w-full bg-transparent text-center text-[42px] font-black tracking-[-0.08em] text-white outline-none placeholder:text-white/12"
                      />

                      <span className="mb-3 text-[14px] font-black text-[#FFB07A]">
                        g
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[20px] border border-[#B7F532]/20 bg-[#8FD14F]/[0.06] p-4 text-center">
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
                    Live matched preview
                  </p>

                  <p
                    className="mt-2 text-[28px] font-black tracking-[-0.08em]"
                    style={{ color: heroSystem.color }}
                  >
                    {heroSystem.name}
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-white/55">
                    {heroSystem.calories} kcal / {heroSystem.protein}P /{" "}
                    {heroSystem.carbs}C / {heroSystem.fat}F •{" "}
                    {heroSystem.price} EGP
                  </p>
                </div>

                <button
                  onClick={runG7Engine}
                  type="button"
                  disabled={isAnalyzing}
                  className="mt-5 flex w-full items-center justify-center rounded-[22px] px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-90 md:px-7 md:text-[12px] md:tracking-[0.24em]"
                  style={{
                    background:
                      "linear-gradient(90deg, #19D9E6 0%, #67E4ED 45%, #FF7A59 100%)",
                    boxShadow:
                      "0 0 42px rgba(25,217,230,0.18), 0 0 30px rgba(255,122,89,0.16)",
                  }}
                >
                  {isAnalyzing
                    ? "G7 Is Scanning Your Numbers..."
                    : "Generate My G7 System"}
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
                  <div className="mt-5 overflow-hidden rounded-[30px] border border-[#B7F532]/25 bg-[#06111E]/90 p-4 shadow-[0_0_70px_rgba(183,245,50,0.10)]">
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-4">
                      <div className="g7-glow-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#B7F532]">
                            G7 Target Scanner
                          </p>

                          <p className="mt-2 text-[12px] font-bold text-white/55">
                            Locking your gym numbers into the right food system.
                          </p>
                        </div>

                        <div className="relative h-[82px] w-[82px] shrink-0">
                          <div className="g7-ring-spin absolute inset-0 rounded-full border-2 border-transparent border-t-[#19D9E6] border-r-[#B7F532]" />
                          <div className="g7-counter-spin absolute inset-2 rounded-full border border-transparent border-b-[#FFB07A] border-l-[#FF5A4F]" />
                          <div className="absolute inset-5 flex items-center justify-center rounded-full border border-white/10 bg-[#071421]">
                            <p className="text-[14px] font-black text-[#B7F532]">
                              {scanPercent}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#19D9E6] via-[#B7F532] to-[#FF8C42] transition-all duration-300"
                          style={{ width: `${scanPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      {scanSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`rounded-[16px] border px-3 py-3 text-[11px] font-bold transition ${
                            index <= activeStep
                              ? "border-[#B7F532]/35 bg-[#B7F532]/10 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/35"
                          }`}
                        >
                          <span className="mr-2 text-[#FFB07A]">
                            0{index + 1}
                          </span>
                          {step}

                          {index <= activeStep ? (
                            <span className="float-right text-[#B7F532]">
                              ✓
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[#FFB07A]/20 bg-[#FFB07A]/[0.06] p-4 text-center">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#FFB07A]">
                        Target pattern
                      </p>

                      <p className="mt-2 text-[13px] font-black uppercase tracking-[0.12em] text-white">
                        {heroSystem.pattern}
                      </p>
                    </div>
                  </div>
                ) : null}

                {engineActivated ? (
                  <div
                    ref={resultRef}
                    className="g7-reveal-pop mt-5 rounded-[30px] border border-white/10 bg-white/[0.055] p-4 backdrop-blur md:p-5"
                    style={{
                      boxShadow:
                        "0 0 46px rgba(201,122,66,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFB07A]">
                        Your G7 System Is Ready
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#B7F532]/25 bg-[#B7F532]/10 px-4 py-2">
                        <span className="h-2 w-2 rounded-full bg-[#B7F532] shadow-[0_0_14px_rgba(183,245,50,0.8)]" />
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
                          Target locked • System matched
                        </p>
                      </div>

                      <h3
                        className="mt-3 text-[44px] font-black tracking-[-0.09em] md:text-[54px]"
                        style={{
                          color: selectedSystem.color,
                          textShadow: `0 0 30px ${selectedSystem.color}33`,
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

                    <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-5">
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

                      <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                          Fat
                        </p>

                        <p className="mt-1 text-[22px] font-black text-white">
                          {selectedSystem.fat}g
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
                        Tap WhatsApp and we will send the payment details for
                        your generated package.
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
                ) : null}
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
              const selected = heroSystem.id === system.id
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