"use client"

import { useMemo, useRef, useState } from "react"

import PdfBooklet, { type PdfLanguage } from "../components/g7/PdfBooklet"
import { G7_PLANS, PlanKey } from "../components/g7/plans"

const PDF_LANGUAGES: {
  id: PdfLanguage
  label: string
  subtitle: string
  fileSuffix: string
}[] = [
  {
    id: "ar",
    label: "Arabic",
    subtitle: "نسخة عربية للعميل المصري / العربي",
    fileSuffix: "ar",
  },
  {
    id: "en",
    label: "English",
    subtitle: "Clean international client version",
    fileSuffix: "en",
  },
  {
    id: "bg",
    label: "Bulgarian",
    subtitle: "Версия за клиент в България",
    fileSuffix: "bg",
  },
]

function createSafeFileName(value: string) {
  return value
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
}

export default function GeneratePage() {
  const pdfRef = useRef<HTMLDivElement>(null)

  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("lean_bulk")
  const [clientName, setClientName] = useState("Ahmed Client")
  const [pdfLanguage, setPdfLanguage] = useState<PdfLanguage>("ar")
  const [copied, setCopied] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  const plan = G7_PLANS[selectedPlan]

  const languageMeta =
    PDF_LANGUAGES.find((item) => item.id === pdfLanguage) ?? PDF_LANGUAGES[0]

  const whatsappMessage = useMemo(() => {
    if (pdfLanguage === "bg") {
      return `Hi G7

I want to activate my G7 Nutrition System.

Client Name: ${clientName}
Selected Plan: ${plan.name}
PDF Language: Bulgarian
Calories: ${plan.kcal}
Protein: ${plan.protein}g
Carbs: ${plan.carbs}g
Fat: ${plan.fat}
Price: ${plan.price}

Please prepare my full G7 client PDF in Bulgarian.`
    }

    if (pdfLanguage === "en") {
      return `Hi G7

I want to activate my G7 Nutrition System.

Client Name: ${clientName}
Selected Plan: ${plan.name}
PDF Language: English
Calories: ${plan.kcal}
Protein: ${plan.protein}g
Carbs: ${plan.carbs}g
Fat: ${plan.fat}
Price: ${plan.price}

Please prepare my full G7 client PDF in English.`
    }

    return `Hi G7

I want to activate my G7 Nutrition System.

Client Name: ${clientName}
Selected Plan: ${plan.name}
Arabic Plan: ${plan.arabicName}
PDF Language: Arabic
Calories: ${plan.kcal}
Protein: ${plan.protein}g
Carbs: ${plan.carbs}g
Fat: ${plan.fat}
Price: ${plan.price}

I understand this is a 7-day gym-focused system with:
- 21 meals
- recipes
- cooking SOP
- grocery list
- batch cooking every 3 days

Please prepare my full G7 client PDF.`
  }, [clientName, plan, pdfLanguage])

  const whatsappLink = useMemo(() => {
    return `https://wa.me/201128442058?text=${encodeURIComponent(
      whatsappMessage
    )}`
  }, [whatsappMessage])

  async function copyWhatsappMessage() {
    await navigator.clipboard.writeText(whatsappMessage)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1600)
  }

  async function printPdf() {
    if (!pdfRef.current || isPrinting) return

    setIsPrinting(true)

    const oldTitle = document.title

    const safeClientName = createSafeFileName(clientName || "g7-client")
    const safePlanName = createSafeFileName(plan.name || "g7-plan")

    document.title = `${safeClientName}-${safePlanName}-${languageMeta.fileSuffix}`

    await new Promise((resolve) => requestAnimationFrame(resolve))
    await new Promise((resolve) => setTimeout(resolve, 250))

    window.print()

    setTimeout(() => {
      document.title = oldTitle
      setIsPrinting(false)
    }, 1000)
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #020817 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          #g7-pdf-export,
          #g7-pdf-export * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #g7-pdf-export {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #020817 !important;
            color: #ffffff !important;
          }

          #g7-pdf-export section {
            background: #07111F !important;
            break-after: page;
            page-break-after: always;
          }

          #g7-pdf-export section:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          #g7-pdf-export article,
          #g7-pdf-export img,
          #g7-pdf-export table {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .g7-admin-shell {
            background: #020817 !important;
          }
        }
      `}</style>

      <main className="g7-admin-shell min-h-screen bg-[#07111F] text-white">
        <div className="grid min-h-screen grid-cols-[250px_330px_1fr]">
          <aside className="border-r border-[#22D3EE]/15 bg-[#020817] p-3">
            <div className="rounded-[22px] border border-[#22D3EE]/15 bg-white/[0.035] p-4">
              <div className="flex items-center gap-3">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7"
                  className="h-[58px] w-auto object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]"
                />

                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
                    Admin Control Room
                  </p>

                  <p className="mt-1 text-[10px] text-white/55">
                    Gym PDF Studio
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {Object.values(G7_PLANS).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPlan(item.id)}
                  className={`w-full rounded-[18px] border p-3 text-left transition ${
                    selectedPlan === item.id
                      ? "border-[#B7F532] bg-[#B7F532]/10 shadow-[0_0_25px_rgba(183,245,50,0.08)]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#22D3EE]/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-black text-white">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-[#D8C56A]">
                        {item.arabicName}
                      </p>
                    </div>

                    {selectedPlan === item.id && (
                      <span className="rounded-full bg-[#B7F532] px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-black">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-[10px] leading-4 text-white/45">
                    {item.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[14px] font-black text-[#B7F532]">
                      {item.price}
                    </p>

                    <p className="text-[10px] font-black text-[#22D3EE]">
                      {item.kcal} kcal
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="border-r border-[#22D3EE]/15 bg-[#0B1220] p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">
              G7 Gym Core MVP
            </p>

            <h1 className="mt-2 text-[28px] font-black leading-tight text-white">
              Generate
              <span className="block text-[#B7F532]">Gym Client PDF</span>
            </h1>

            <div className="mt-4 grid gap-2">
              <button
                onClick={printPdf}
                disabled={isPrinting}
                className={`w-full rounded-[16px] px-4 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-black transition ${
                  isPrinting
                    ? "cursor-not-allowed bg-white/30"
                    : "bg-[#B7F532] hover:bg-[#d6ff5f]"
                }`}
              >
                {isPrinting
                  ? `Opening ${languageMeta.label} Print...`
                  : `Print / Save ${languageMeta.label} PDF`}
              </button>

              <a
                href="/join"
                target="_blank"
                className="w-full rounded-[16px] border border-[#22D3EE]/25 bg-[#22D3EE]/10 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.15em] text-[#22D3EE]"
              >
                Open Join Page
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                className="w-full rounded-[16px] border border-[#B7F532]/25 bg-[#B7F532]/10 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.15em] text-[#B7F532]"
              >
                Open WhatsApp Lead
              </a>

              <button
                onClick={copyWhatsappMessage}
                className="w-full rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-white/70"
              >
                {copied ? "Copied!" : "Copy WhatsApp Message"}
              </button>
            </div>

            <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
              <h2 className="text-[20px] font-black text-[#22D3EE]">
                Client Settings
              </h2>

              <label className="mt-4 block">
                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  Client Name
                </span>

                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none"
                />
              </label>

              <div className="mt-4">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  PDF Language
                </p>

                <div className="mt-2 grid gap-2">
                  {PDF_LANGUAGES.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => setPdfLanguage(language.id)}
                      className={`rounded-[14px] border px-3 py-3 text-left transition ${
                        pdfLanguage === language.id
                          ? "border-[#B7F532] bg-[#B7F532]/10"
                          : "border-white/10 bg-black/20 hover:border-[#22D3EE]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[12px] font-black text-white">
                            {language.label}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-white/45">
                            {language.subtitle}
                          </p>
                        </div>

                        {pdfLanguage === language.id && (
                          <span className="rounded-full bg-[#B7F532] px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-black">
                            Active
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[16px] border border-[#22D3EE]/15 bg-black/20 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  Selected Gym Plan
                </p>

                <p className="mt-2 text-[20px] font-black text-white">
                  {plan.name}
                </p>

                <p className="mt-1 text-[11px] font-bold text-[#D8C56A]">
                  {plan.arabicName}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-[12px] bg-white/[0.04] p-2">
                    <p className="text-[8px] font-black text-[#22D3EE]">
                      KCAL
                    </p>
                    <p className="text-[14px] font-black text-[#B7F532]">
                      {plan.kcal}
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-white/[0.04] p-2">
                    <p className="text-[8px] font-black text-[#22D3EE]">
                      PRICE
                    </p>
                    <p className="text-[14px] font-black text-[#B7F532]">
                      {plan.price}
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-white/[0.04] p-2">
                    <p className="text-[8px] font-black text-[#22D3EE]">
                      PROTEIN
                    </p>
                    <p className="text-[14px] font-black text-[#B7F532]">
                      {plan.protein}g
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-white/[0.04] p-2">
                    <p className="text-[8px] font-black text-[#22D3EE]">
                      CARBS / FAT
                    </p>
                    <p className="text-[14px] font-black text-[#B7F532]">
                      {plan.carbs}g / {plan.fat}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-[12px] border border-[#B7F532]/20 bg-[#B7F532]/5 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#B7F532]">
                    Gym Core Mode
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/55">
                    This page is now focused only on G7 gym plans: Shred, Core,
                    Mass, Flex, and Premium.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[22px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#D8C56A]">
                Client Cooking Logic
              </p>

              <h3 className="mt-2 text-[18px] font-black text-white">
                Shop weekly. Cook every 3 days.
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-white/55">
                The G7 method is built on Protein Engine, Carb Engine, and Sauce
                Engine. The client shops once, cooks every 3 days, and assembles
                meals easily.
              </p>

              <div className="mt-3 grid gap-2">
                {[
                  ["Batch 1", "Day 1–3"],
                  ["Batch 2", "Day 4–6"],
                  ["Light Day", "Day 7"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-[12px] border border-white/10 bg-black/20 px-3 py-2"
                  >
                    <span className="text-[10px] font-black text-[#22D3EE]">
                      {label}
                    </span>

                    <span className="text-[10px] font-black text-[#B7F532]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-y-auto bg-[#07111F] p-4">
            <div
              id="g7-pdf-export"
              ref={pdfRef}
              className="bg-[#020817] text-white"
            >
              <PdfBooklet
                selectedPlan={selectedPlan}
                clientName={clientName}
                language={pdfLanguage}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}