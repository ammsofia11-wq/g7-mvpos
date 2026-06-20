import Link from "next/link"

const deviceNodes = [
  {
    name: "Smart Combi Ovens",
    signal: "Program status, chamber temp, core temp, time left, alarms",
  },
  {
    name: "Blast Chillers",
    signal: "Capacity, cooling cycle, entry time, exit time, temperature evidence",
  },
  {
    name: "Kettles",
    signal: "Batch status, cook time, temperature, hold state",
  },
  {
    name: "Tilting Pans",
    signal: "Cooking load, cycle progress, temperature, operator action",
  },
  {
    name: "Sous Vide Systems",
    signal: "Water temperature, cycle time, batch validation",
  },
  {
    name: "Weighing Scales",
    signal: "Yield checks, portion accuracy, batch weight proof",
  },
  {
    name: "Packaging Machines",
    signal: "Line status, packaging speed, stops, readiness",
  },
  {
    name: "Metal Detectors",
    signal: "Pass / fail checks, rejection evidence, QA proof",
  },
  {
    name: "Temperature Sensors",
    signal: "Live food safety readings across cooking, cooling, holding, and dispatch",
  },
  {
    name: "Walk-in Chillers",
    signal: "Storage temperature, door state, safety alerts",
  },
  {
    name: "Freezers",
    signal: "Frozen storage state, temperature excursions, stock protection",
  },
  {
    name: "Delivery Fleet Sensors",
    signal: "Vehicle temperature, route condition, cold-chain evidence",
  },
]

const runtimeFlow = [
  "Demand",
  "Production Plan",
  "Station Tasks",
  "Equipment Assignment",
  "Equipment Telemetry",
  "QA / HACCP Evidence",
  "Packaging Readiness",
  "Dispatch Control",
]

const scenarioEvents = [
  {
    label: "Batch A",
    value: "Assigned to Oven 1",
    note: "Oven 1 returns running status, chamber temperature, core temperature, time left, and completion signal.",
  },
  {
    label: "Batch B",
    value: "Assigned to Oven 2",
    note: "Oven 2 returns alarm status. G7 raises a production exception before the delay reaches packaging.",
  },
  {
    label: "Soup Batch",
    value: "Assigned to Kettle 1",
    note: "Kettle 1 reports cook state and hold readiness before QA handoff.",
  },
  {
    label: "Blast Chiller",
    value: "Capacity Full",
    note: "G7 protects cooling compliance and warns that the next hot batch cannot safely move forward yet.",
  },
]

const architectureRules = [
  "Manufacturer APIs or approved hardware gateways are required for live machine integration.",
  "Security rules must control who can send, approve, or override equipment actions.",
  "Operational validation is required before any equipment instruction affects live production.",
  "G7 should record evidence first, then support controlled actions when the integration is approved.",
]

export default function EquipmentIntelligencePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111F] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-75">
        <div className="absolute left-[-140px] top-[-160px] h-[380px] w-[380px] rounded-full bg-cyan-400/20 blur-[100px]" />
        <div className="absolute right-[-160px] top-[260px] h-[420px] w-[420px] rounded-full bg-[#C98D46]/15 blur-[110px]" />
        <div className="absolute bottom-[-180px] left-[30%] h-[420px] w-[420px] rounded-full bg-[#CCFF33]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-5 pb-10 sm:px-6 lg:px-8">
        <header className="rounded-[36px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.36)] sm:p-7 lg:p-8">
          <div className="grid gap-7 xl:grid-cols-[1fr_440px]">
            <div>
              <div className="inline-flex rounded-full border border-[#C98D46]/35 bg-[#C98D46]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#F3C27A]">
                G7 Equipment Intelligence
              </div>

              <h1 className="mt-5 max-w-5xl text-[42px] font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-[64px] lg:text-[82px]">
                Equipment
                <span className="block text-cyan-300">
                  Intelligence Layer
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[18px] font-black leading-7 text-white">
                From smart ovens to a smart central kitchen.
              </p>

              <p className="mt-4 max-w-4xl text-[14px] leading-7 text-slate-300 sm:text-[16px]">
                Connected equipment can send signals. G7 turns those signals
                into production decisions, QA protection, workforce action,
                packaging readiness, and dispatch control.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/demo-sale"
                  className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 hover:text-white"
                >
                  Back to Demo Journey
                </Link>

                <Link
                  href="/command"
                  className="rounded-full border border-[#CCFF33]/30 bg-[#CCFF33]/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]"
                >
                  Open Command OS
                </Link>

                <Link
                  href="/demo-deck"
                  className="rounded-full border border-[#C98D46]/35 bg-[#C98D46]/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#F3C27A] transition hover:border-[#F3C27A] hover:bg-[#C98D46]/15 hover:text-[#FFE2A8]"
                >
                  Open Category Launch Deck
                </Link>
              </div>
            </div>

            <aside className="rounded-[30px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                Strategic Positioning
              </p>

              <h2 className="mt-3 text-[34px] font-black leading-[0.92] tracking-[-0.055em] text-white">
                A smart oven makes one machine intelligent.
              </h2>

              <p className="mt-4 text-[14px] leading-7 text-slate-300">
                G7 is designed to make the whole central kitchen intelligent:
                demand, recipes, workers, equipment, QA, cooling, packaging,
                dispatch, and cold-chain evidence.
              </p>

              <div className="mt-5 rounded-[24px] border border-[#C98D46]/25 bg-[#C98D46]/10 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#F3C27A]">
                  Core Claim
                </p>

                <p className="mt-2 text-[22px] font-black leading-tight text-white">
                  G7 is designed to become the operational brain above connected
                  kitchen equipment.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Device Network
              </p>

              <h2 className="mt-3 text-[36px] font-black leading-none tracking-[-0.055em] text-white">
                Every machine becomes a runtime node.
              </h2>
            </div>

            <p className="max-w-xl text-[13px] leading-6 text-slate-300">
              Equipment signals should not stay trapped inside machines. G7
              turns them into production visibility, safety proof, and command
              decisions.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {deviceNodes.map((device) => (
              <article
                key={device.name}
                className="rounded-[24px] border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#CCFF33] shadow-[0_0_18px_rgba(204,255,51,0.65)]" />

                  <div>
                    <h3 className="text-[18px] font-black leading-tight text-white">
                      {device.name}
                    </h3>

                    <p className="mt-3 text-[12px] leading-5 text-slate-400">
                      {device.signal}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Runtime Flow
            </p>

            <h2 className="mt-3 text-[36px] font-black leading-none tracking-[-0.055em] text-white">
              From demand to machine intelligence.
            </h2>

            <div className="mt-6 grid gap-3">
              {runtimeFlow.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-cyan-300/25 bg-cyan-300/10 text-[16px] font-black text-cyan-200">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <p className="text-[20px] font-black leading-tight text-white">
                        {step}
                      </p>
                    </div>

                    {index < runtimeFlow.length - 1 && (
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F3C27A]">
                        Controlled handoff -&gt;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[34px] border border-[#CCFF33]/20 bg-[#CCFF33]/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              System Difference
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[0.92] tracking-[-0.055em] text-white">
              Not machine-first. Production-first.
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-slate-300">
              The machine should not be the center of the system. The production
              plan is the center. Equipment becomes part of the runtime chain:
              assigned, monitored, validated, and connected to QA and dispatch.
            </p>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Category Statement
              </p>

              <p className="mt-2 text-[22px] font-black leading-tight text-white">
                POS systems control sales. G7 controls central kitchen
                production.
              </p>
            </div>
          </aside>
        </section>

        <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Example Scenario
          </p>

          <h2 className="mt-3 text-[36px] font-black leading-none tracking-[-0.055em] text-white">
            G7 reads the floor before the floor becomes late.
          </h2>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {scenarioEvents.map((event) => (
              <article
                key={event.label}
                className="rounded-[26px] border border-white/10 bg-black/20 p-5"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#F3C27A]">
                  {event.label}
                </p>

                <h3 className="mt-2 text-[24px] font-black leading-tight tracking-[-0.04em] text-white">
                  {event.value}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-slate-300">
                  {event.note}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[26px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">
              Automatic G7 Response
            </p>

            <p className="mt-3 text-[16px] font-black leading-7 text-white">
              G7 raises production alerts, protects QA gates, recommends
              workforce movement, and prevents packaging from waiting without
              knowing why the delay happened.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[34px] border border-[#C98D46]/20 bg-[#C98D46]/[0.08] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F3C27A]">
              Safety / Roadmap
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white">
              Integration-ready architecture, not unsafe direct control.
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-slate-300">
              This is an integration-ready architecture layer. Live machine
              control requires manufacturer APIs, approved hardware gateways,
              security rules, and operational validation.
            </p>

            <div className="mt-5 grid gap-3">
              {architectureRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-[12px] font-bold leading-5 text-slate-300">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
              Why This Matters
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white">
              The future is not only connected equipment.
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-slate-300">
              The future is connected production. A smart oven can cook better,
              but it does not know demand, station pressure, cooling capacity,
              packaging readiness, dispatch windows, or workforce limits. G7 is
              designed to connect all of that into one operating system.
            </p>

            <div className="mt-5 rounded-[26px] border border-white/10 bg-black/20 p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Final Positioning
              </p>

              <p className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-white">
                A smart oven makes one machine intelligent. G7 is designed to
                make the whole central kitchen intelligent.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}