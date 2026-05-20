"use client"

const kitchenSections = [
  { id: "overview", label: "Overview", helper: "Runtime summary" },
  { id: "runtime-engine", label: "Runtime Engine", helper: "Live execution" },
  { id: "runtime-alerts", label: "Escalations", helper: "AI alerts" },
  { id: "workforce", label: "Workforce", helper: "People map" },
  { id: "production-control", label: "Production", helper: "Floor control" },
  { id: "side-runtime", label: "Assistant", helper: "Voice / flow" },
]

export default function KitchenSectionSidebar() {
  return (
    <aside className="sticky top-4 hidden h-fit rounded-[28px] border border-white/10 bg-black/25 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] xl:block">
      <p className="px-3 pt-2 text-[8px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
        Kitchen Workspace
      </p>

      <div className="mt-3 space-y-2">
        {kitchenSections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.035] px-3 py-3 transition-all duration-200 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/10"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[10px] font-black text-[#CCFF33] group-hover:border-[#CCFF33]/30">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span>
              <span className="block text-[12px] font-black tracking-[-0.03em] text-white">
                {section.label}
              </span>
              <span className="mt-0.5 block text-[9px] font-bold text-white/35">
                {section.helper}
              </span>
            </span>
          </a>
        ))}
      </div>
    </aside>
  )
}