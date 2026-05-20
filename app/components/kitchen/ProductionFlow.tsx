const productionFlow = [
  {
    number: "01",
    value: "Preparation",
    team: "Preparation Team",
  },
  {
    number: "02",
    value: "Hot Kitchen Cooking",
    team: "Lunch & Dinner Team",
  },
  {
    number: "03",
    value: "Cold Section / Cooling",
    team: "Cold Section Team",
  },
  {
    number: "04",
    value: "Food Safety QC",
    team: "Food Safety",
  },
  {
    number: "05",
    value: "Plating / Assembly",
    team: "Salads / Packaging Team",
  },
  {
    number: "06",
    value: "Packaging",
    team: "Packaging Team",
  },
  {
    number: "07",
    value: "Dispatch Ready",
    team: "Packaging Team",
  },
]

export default function ProductionFlow() {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
          Production Flow
        </p>

        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-cyan-200">
          7 Stages
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {productionFlow.map((step) => (
          <FlowItem
            key={step.number}
            number={step.number}
            value={step.value}
            team={step.team}
          />
        ))}
      </div>
    </div>
  )
}

function FlowItem({
  number,
  value,
  team,
}: {
  number: string
  value: string
  team: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-black/20 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-cyan-300/10 text-[10px] font-black text-cyan-300">
        {number}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-black text-slate-200">
          {value}
        </p>

        <p className="mt-1 text-[9px] font-bold text-slate-500">
          {team}
        </p>
      </div>
    </div>
  )
}