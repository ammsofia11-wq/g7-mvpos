"use client"

import { useMemo, useRef, useState } from "react"

import PdfBooklet from "../components/g7/PdfBooklet"
import { G7_PLANS, PlanKey } from "../components/g7/plans"

export default function GeneratePage() {
  const pdfRef = useRef<HTMLDivElement>(null)

  const [selectedPlan, setSelectedPlan] =
    useState<PlanKey>("lean_bulk")

  const [clientName, setClientName] =
    useState("Ahmed Client")

  const [copied, setCopied] = useState(false)

  const plan = G7_PLANS[selectedPlan]

  const whatsappMessage = useMemo(() => {
    return `Hi G7 👋

I want to activate my G7 Nutrition System.

Client Name: ${clientName}
Selected Plan: ${plan.name}
Arabic Plan: ${plan.arabicName}
Calories: ${plan.kcal}
Price: ${plan.price}

I understand this is a 7-day system with:
- 21 meals
- recipes
- cooking SOP
- grocery list
- batch cooking every 3 days

Please prepare my full G7 client PDF.`
  }, [clientName, plan])

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

  async function generatePdf() {
    if (!pdfRef.current) return

    const html2pdfModule = await import("html2pdf.js")
    const html2pdf = html2pdfModule.default

    const opt: any = {
      margin: 0.25,
      filename: `${clientName
        .replace(/\s+/g, "-")
        .toLowerCase()}-${plan.name}.pdf`,

      image: {
        type: "jpeg",
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#020817",

        onclone: (clonedDocument: Document) => {
          const elements =
            clonedDocument.querySelectorAll<HTMLElement>("*")

          elements.forEach((el) => {
            const style =
              clonedDocument.defaultView?.getComputedStyle(el)

            if (!style) return

            function safeColor(value: string, fallback: string) {
              if (
                value.includes("oklch") ||
                value.includes("lch") ||
                value.includes("lab") ||
                value.includes("color(")
              ) {
                return fallback
              }

              return value
            }

            el.style.color = safeColor(style.color, "#ffffff")

            el.style.backgroundColor = safeColor(
              style.backgroundColor,
              "transparent"
            )

            el.style.borderColor = safeColor(
              style.borderColor,
              "rgba(34,211,238,0.25)"
            )

            el.style.boxShadow = "none"
          })
        },
      },

      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    }

    await html2pdf().set(opt).from(pdfRef.current).save()
  }

  return (
    <main className="min-h-screen bg-[#07111F] text-white">
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
                  Client PDF Studio
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
            Internal Chef-Based Nutrition OS
          </p>

          <h1 className="mt-2 text-[28px] font-black leading-tight text-white">
            Generate
            <span className="block text-[#B7F532]">
              Client PDF
            </span>
          </h1>

          <div className="mt-4 grid gap-2">
            <button
              onClick={generatePdf}
              className="w-full rounded-[16px] bg-[#B7F532] px-4 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-black"
            >
              Generate PDF
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
                onChange={(e) =>
                  setClientName(e.target.value)
                }
                className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none"
              />
            </label>

            <div className="mt-4 rounded-[16px] border border-[#22D3EE]/15 bg-black/20 p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                Selected Plan
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
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[22px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#D8C56A]">
              Client Cooking Logic
            </p>

            <h3 className="mt-2 text-[18px] font-black text-white">
              يطبخ كل 3 أيام
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-white/55">
              النظام مبني على Batch Cooking: أول 3 أيام مرة، ثم الأيام 4–6 مرة،
              واليوم السابع يكون أخف أو طازج.
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
          <div ref={pdfRef}>
            <PdfBooklet
              selectedPlan={selectedPlan}
              clientName={clientName}
            />
          </div>
        </section>
      </div>
    </main>
  )
}