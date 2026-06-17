const chefLabModes = [
  {
    title: "SOP Assistant",
    description:
      "Turn chef instructions into clean station steps, prep notes, cooking method, cooling control, and packaging guidance.",
    signal: "Recipe → SOP",
    accent: "cyan",
  },
  {
    title: "Batch Issue Assistant",
    description:
      "Help the chef diagnose delayed batches, station blockers, missing prep, yield issues, and production pressure.",
    signal: "Runtime → Decision",
    accent: "lime",
  },
  {
    title: "QA Gate Assistant",
    description:
      "Support food safety checks for cooling evidence, allergen separation, label accuracy, batch code, and release readiness.",
    signal: "QA → Release",
    accent: "amber",
  },
  {
    title: "Recipe Improvement Lab",
    description:
      "Suggest controlled recipe improvements while protecting costing, yield, ingredient substitutions, and operational feasibility.",
    signal: "R&D → Control",
    accent: "cyan",
  },
]

const promptExamples = [
  "Convert this chef note into a station SOP for prep, cooking, cooling, QA, and packaging.",
  "This batch is 18 minutes late. Explain the likely cause and safest support action.",
  "Check whether this batch can be released if cooling is not cleared but packaging is ready.",
  "Suggest three approved ingredient alternatives without changing the dish identity.",
]

const productionSignals = [
  "Protected recipe lifecycle",
  "Station task generation",
  "Worker-friendly instructions",
  "Cooling and QA evidence",
  "Batch code and traceability",
  "Packaging and dispatch readiness",
]

const workflowSteps = [
  {
    step: "01",
    title: "Chef Input",
    description:
      "Executive Chef or R&D Chef enters a production question, recipe note, SOP draft, or batch issue.",
  },
  {
    step: "02",
    title: "Kitchen Context",
    description:
      "The lab frames the request around station, team, shift, QA gate, batch status, and allowed role visibility.",
  },
  {
    step: "03",
    title: "Safe Output",
    description:
      "The response becomes an operational draft: SOP, decision support note, QA checklist, or escalation packet.",
  },
  {
    step: "04",
    title: "Approval Path",
    description:
      "Critical changes require Chef, Production Manager, QA, or Supervisor approval before runtime execution.",
  },
]

export default function GeneratePage() {
  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1180px] space-y-5 px-4 py-4">
        <section className="g7-card g7-card-cyan overflow-hidden p-5">
          <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-end">
            <div>
              <p className="g7-kicker">G7 AI Chef Lab</p>

              <h1 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white lg:text-[56px]">
                Kitchen AI
                <span className="block text-cyan-300">Chef Lab</span>
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                A chef-controlled AI workspace for central kitchen operations:
                SOP drafting, batch troubleshooting, QA gate support, recipe
                improvement, and production decision assistance. This is not a
                customer diet generator; it is an internal kitchen intelligence
                layer for approved production work.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {productionSignals.map((item) => (
                  <span key={item} className="g7-execution-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-cyan-300/20 bg-black/25 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Lab Status
              </p>

              <div className="mt-4 grid gap-3">
                <StatusRow label="Mode" value="Kitchen OS only" />
                <StatusRow label="Scope" value="Internal production support" />
                <StatusRow label="Output" value="Drafts require approval" />
                <StatusRow label="Safety" value="QA gates protected" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {chefLabModes.map((mode) => (
            <div key={mode.title} className="g7-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    {mode.signal}
                  </p>

                  <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em] text-white">
                    {mode.title}
                  </h2>
                </div>

                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                {mode.description}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_380px]">
          <div className="g7-card p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="g7-kicker">Chef Prompt Cockpit</p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-white">
                  Production question builder
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
                  This screen is a safe preview of how AI Chef should behave
                  inside Kitchen OS. Live generation can be connected later to
                  tenant data, role permissions, recipe packets, and runtime
                  state.
                </p>
              </div>

              <span className="w-fit rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-amber-100">
                Approval required for runtime changes
              </span>
            </div>

            <div className="mt-5 rounded-[26px] border border-white/10 bg-black/25 p-4">
              <div className="rounded-[22px] border border-white/10 bg-[#050814] p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Example chef prompt
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A Classic Lunch & Dinner batch is delayed by 18 minutes. Prep
                  station is ahead of schedule. Packaging is waiting. QA cooling
                  evidence is not cleared yet. Recommend the safest operational
                  next step and who must approve it.
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <DecisionCard
                  label="Expected AI Output"
                  title="Operational support recommendation"
                  body="Suggest temporary support movement, explain the reason, protect QA release gates, and require Executive Chef or Production Manager approval."
                />

                <DecisionCard
                  label="Protected Limit"
                  title="No unsafe release"
                  body="The AI must not recommend release before cooling, allergen, label, and batch code checks are cleared by the correct role."
                />
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="g7-card p-4">
              <p className="g7-kicker">Prompt Examples</p>

              <div className="mt-3 space-y-2">
                {promptExamples.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-white/10 bg-black/25 p-3"
                  >
                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-300">
                      Prompt {index + 1}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="g7-card p-4">
              <p className="g7-kicker">Role Protection</p>

              <div className="mt-3 space-y-2">
                <RoleRow role="Executive Chef" access="Full operational draft control" />
                <RoleRow role="QA" access="Food safety and release checks" />
                <RoleRow role="Worker" access="Station task instructions only" />
                <RoleRow role="Owner" access="Full system confidence overview" />
              </div>
            </div>
          </aside>
        </section>

        <section className="g7-card p-5">
          <p className="g7-kicker">Kitchen AI Workflow</p>

          <div className="mt-4 grid gap-3 lg:grid-cols-4">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[24px] border border-white/10 bg-black/25 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.08] text-sm font-black text-cyan-200">
                  {item.step}
                </div>

                <h3 className="mt-4 text-lg font-black tracking-[-0.04em] text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="g7-card border-lime-300/15 bg-lime-300/[0.04] p-5">
          <p className="g7-kicker text-lime-300">Next Integration Path</p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-white">
            Connect AI Chef Lab to Recipe Studio and Command OS
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
            The next safe layer can connect this lab to protected recipe packets,
            SOP drafts, runtime support recommendations, and role-specific
            approval flows without exposing costing or protected recipe data to
            unauthorized roles.
          </p>
        </section>
      </div>
    </main>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>

      <span className="text-xs font-black text-white">{value}</span>
    </div>
  )
}

function DecisionCard({
  label,
  title,
  body,
}: {
  label: string
  title: string
  body: string
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-300">
        {label}
      </p>

      <h3 className="mt-2 text-base font-black tracking-[-0.035em] text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">{body}</p>
    </div>
  )
}

function RoleRow({ role, access }: { role: string; access: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/25 p-3">
      <p className="text-xs font-black text-white">{role}</p>
      <p className="mt-1 text-[11px] leading-5 text-slate-400">{access}</p>
    </div>
  )
}
