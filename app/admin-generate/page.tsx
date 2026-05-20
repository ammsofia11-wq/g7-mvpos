"use client"

import { useRef, useState } from "react"

import PdfBooklet from "../components/g7/PdfBooklet"
import { G7_PLANS, PlanKey } from "../components/g7/plans"

export default function GeneratePage() {
  const pdfRef = useRef<HTMLDivElement>(null)

  const [selectedPlan, setSelectedPlan] =
    useState<PlanKey>("lean_bulk")

  const [clientName, setClientName] =
    useState("Ahmed Client")

  const [customKcal, setCustomKcal] =
    useState(2200)

  const [flavor, setFlavor] =
    useState("Middle Eastern Performance")

  const [price, setPrice] =
    useState("50 جنيه")

  const plan = G7_PLANS[selectedPlan]

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

            function safeColor(
              value: string,
              fallback: string
            ) {
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

            el.style.color = safeColor(
              style.color,
              "#ffffff"
            )

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

    await html2pdf()
      .set(opt)
      .from(pdfRef.current)
      .save()
  }

  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      <div className="grid min-h-screen grid-cols-[240px_300px_1fr]">
        <aside className="border-r border-[#22D3EE]/15 bg-[#020817] p-3">
          <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-3">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#22D3EE] text-[25px] font-black text-black">
              G7
            </div>

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
                Admin Generator
              </p>

              <p className="mt-1 text-[10px] text-white/55">
                Client PDF Studio
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {Object.values(G7_PLANS).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPlan(item.id)
                  setCustomKcal(item.kcal)
                  setPrice(item.price)
                }}
                className={`w-full rounded-[18px] border p-3 text-left transition ${
                  selectedPlan === item.id
                    ? "border-[#B7F532] bg-[#B7F532]/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <p className="text-[15px] font-black text-white">
                  {item.name}
                </p>

                <p className="mt-1 text-[10px] font-bold text-[#D8C56A]">
                  {item.arabicName}
                </p>

                <p className="mt-2 text-[14px] font-black text-[#B7F532]">
                  {item.price}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <section className="border-r border-[#22D3EE]/15 bg-[#0B1220] p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">
            Internal Chef-Based Nutrition OS
          </p>

          <h1 className="mt-2 text-[27px] font-black leading-tight text-white">
            Generate
            <span className="block text-[#B7F532]">
              Client PDF
            </span>
          </h1>

          <button
            onClick={generatePdf}
            className="mt-4 w-full rounded-[16px] bg-[#B7F532] px-4 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-black"
          >
            Generate PDF
          </button>

          <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
            <h2 className="text-[20px] font-black text-[#22D3EE]">
              Client Settings
            </h2>

            <div className="mt-4 space-y-3">
              <label className="block">
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

              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  Calories
                </span>

                <input
                  type="number"
                  value={customKcal}
                  onChange={(e) =>
                    setCustomKcal(Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  Flavor Profile
                </span>

                <input
                  value={flavor}
                  onChange={(e) =>
                    setFlavor(e.target.value)
                  }
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/45">
                  Price
                </span>

                <input
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="mt-2 w-full rounded-[14px] border border-white/10 bg-black/30 px-3 py-2.5 text-[13px] text-white outline-none"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="overflow-y-auto bg-[#07111F] p-4">
          <div ref={pdfRef}>
            <PdfBooklet
              plan={plan}
              clientName={clientName}
              customKcal={customKcal}
              flavor={flavor}
              price={price}
            />
          </div>
        </section>
      </div>
    </main>
  )
}