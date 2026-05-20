"use client"

const memoryNodes = [
  {
    id: "alerts",
    label: "AI Alerts",
    weight: 92,
    relation: "Triggers runtime escalation",
  },
  {
    id: "production",
    label: "Production",
    weight: 84,
    relation: "Feeds blocked-stage memory",
  },
  {
    id: "workforce",
    label: "Workforce",
    weight: 68,
    relation: "Affects execution capacity",
  },
  {
    id: "dispatch",
    label: "Dispatch",
    weight: 57,
    relation: "Raises delivery pressure",
  },
  {
    id: "memory",
    label: "Operational Memory",
    weight: 76,
    relation: "Stores recurring patterns",
  },
  {
    id: "decisions",
    label: "AI Decisions",
    weight: 88,
    relation: "Controls layout focus",
  },
]

export default function RuntimeMemoryGraph() {
  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
          AI Runtime Memory Graph
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
          The OS connects events into operational intelligence.
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
          Each node represents a live kitchen intelligence area. The stronger
          the signal, the more influence it has on runtime decisions.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {memoryNodes.map((node) => (
          <div
            key={node.id}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">
                {node.label}
              </p>

              <p className="rounded-full bg-black/30 px-2 py-1 text-[10px] font-black text-[#CCFF33]">
                {node.weight}
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#CCFF33]"
                style={{ width: `${node.weight}%` }}
              />
            </div>

            <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
              {node.relation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.05] p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
          Memory Interpretation
        </p>

        <p className="mt-2 text-sm font-semibold leading-6 text-white/65">
          The system is learning that alerts and production pressure are the
          strongest drivers of kitchen runtime decisions right now.
        </p>
      </div>
    </section>
  )
}