import Link from "next/link"

type StationTone = "cyan" | "lime" | "amber" | "red"

type StationTask = {
  id: string
  station: string
  title: string
  demandSignal: string
  workload: string
  taskOutput: string
  proof: string
  handoff: string
  tone: StationTone
}

type DemandCard = {
  label: string
  value: string
  note: string
}

type FlowStep = {
  step: string
  title: string
  note: string
}

const demandCards: DemandCard[] = [
  {
    label: "Locked Demand",
    value: "Demo-safe demand",
    note: "Sample production input after customer choices are locked.",
  },
  {
    label: "Menu Output",
    value: "Dish count report",
    note: "Demand becomes production volume by menu item and program line.",
  },
  {
    label: "Size Split",
    value: "Portion groups",
    note: "The system separates required output by tenant-defined portion rules.",
  },
  {
    label: "Dispatch Window",
    value: "Production deadline",
    note: "Stations work against operational timing, not loose recipe documents.",
  },
]

const flowSteps: FlowStep[] = [
  {
    step: "01",
    title: "Demand locked",
    note: "Customer selections become a controlled production input.",
  },
  {
    step: "02",
    title: "Reports generated",
    note: "Menu, size split, prep, cooking, packaging, barcode, and dispatch reports are prepared.",
  },
  {
    step: "03",
    title: "Station tasks created",
    note: "Each station receives focused work instead of reading one large production sheet.",
  },
  {
    step: "04",
    title: "Worker task opened",
    note: "The assigned worker receives SOP steps, proof requirements, and escalation path.",
  },
]

const stationTasks: StationTask[] = [
  {
    id: "ST-01",
    station: "Prep / Butchery",
    title: "Prepare components from locked demand",
    demandSignal: "Grocery and butchery report",
    workload: "Ingredient readiness, trimming, cutting, tray setup",
    taskOutput: "Prepared components ready for cooking or cold assembly",
    proof: "Cut size, tray identity, and station readiness confirmed",
    handoff: "Moves to hot kitchen, cold kitchen, or holding rack",
    tone: "cyan",
  },
  {
    id: "ST-02",
    station: "Hot Kitchen",
    title: "Cook controlled production batches",
    demandSignal: "Cooking report and batch yield",
    workload: "Batch sequence, pan loading, cooking method, visual finish",
    taskOutput: "Cooked batch ready for temperature proof",
    proof: "Cooking method and tenant-defined temperature check required",
    handoff: "Moves to cooling control before QA release",
    tone: "amber",
  },
  {
    id: "ST-03",
    station: "Cooling",
    title: "Control cooling before release",
    demandSignal: "Cooling task from cooked batch",
    workload: "Cooling entry, rack assignment, status check, exit readiness",
    taskOutput: "Cooled batch ready for QA review",
    proof: "Temperature evidence, timestamp, and cooling location required",
    handoff: "Moves to QA gate or exception escalation",
    tone: "red",
  },
  {
    id: "ST-04",
    station: "QA Gate",
    title: "Protect batch release",
    demandSignal: "QA hold and release rule",
    workload: "Check evidence, approve, hold, reject, or escalate",
    taskOutput: "Batch release decision",
    proof: "QA clearance required before portioning and packaging readiness",
    handoff: "Moves to portioning, packaging, or supervisor exception",
    tone: "lime",
  },
  {
    id: "ST-05",
    station: "Portioning",
    title: "Split output by portion rule",
    demandSignal: "Size split and program demand",
    workload: "Portion size, tray count, component split, accuracy check",
    taskOutput: "Portioned components ready for packing",
    proof: "Portion accuracy and batch identity confirmed",
    handoff: "Moves to packaging with batch traceability attached",
    tone: "cyan",
  },
  {
    id: "ST-06",
    station: "Packaging",
    title: "Prepare dispatch-ready packs",
    demandSignal: "Packaging report and label rules",
    workload: "Pack rule, seal, label handoff, barcode visibility",
    taskOutput: "Packed items ready for dispatch readiness handoff",
    proof: "Packing, sealing, label, and barcode evidence required",
    handoff: "Moves to fridge location or dispatch readiness",
    tone: "amber",
  },
]

const proofChecks = [
  "Demand is locked before production work starts",
  "Station workload is separated before worker execution",
  "Each task has output, proof, and handoff",
  "Cooling is treated as a mandatory control point",
  "QA release is protected before packaging readiness",
  "Barcode and storage identity stay attached to the batch",
  "Worker task opens only after the station task is clear",
  "The page uses demo-safe operational placeholders only",
]

export default function ProductionTasksPage() {
  return (
    <main className="min-h-screen bg-[#050B14] px-4 py-5 text-white sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-[1380px] space-y-5">
        <section className="rounded-[34px] border border-cyan-300/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">
                G7 Production Tasks
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.07em] text-white sm:text-6xl">
                Turn locked demand into station-level execution.
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                This isolated demo page shows the missing bridge between demand
                lock and worker SOP execution. G7 should not leave teams with
                static reports. It should convert demand into digital station
                tasks with workload, proof, and handoff.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/worker-task"
                  className="rounded-full bg-cyan-300 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#06111F] shadow-[0_0_28px_rgba(34,211,238,0.25)] transition hover:bg-white"
                >
                  Open worker task
                </Link>

                <Link
                  href="/kitchen"
                  className="rounded-full border border-lime-300/25 bg-lime-300/[0.08] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-lime-100 transition hover:border-lime-200 hover:bg-lime-300/15 hover:text-lime-50"
                >
                  Open live runtime
                </Link>

                <Link
                  href="/demo-sale"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                >
                  Back to demo story
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-lime-300/20 bg-lime-300/[0.055] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-lime-300">
                Product bridge
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">
                Demand to tasks, not demand to paperwork.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                The central kitchen needs a digital task layer between planning
                and worker execution: prep, cooking, cooling, QA, portioning,
                packaging, barcode, storage, and dispatch readiness.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {demandCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-2 text-lg font-black leading-6 text-white">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.035] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Operational flow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">
                Locked Demand -&gt; Station Tasks -&gt; Worker SOP
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
                This page is intentionally static and demo-safe. It does not
                connect to live runtime stores, APIs, protected recipes,
                ingredient databases, WorkerBoard, or ProductionTimeline.
              </p>
            </div>

            <Link
              href="/command"
              className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300 hover:text-[#06111F]"
            >
              Open command view
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-[24px] border border-white/10 bg-black/20 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-cyan-300/25 bg-cyan-300/10 text-lg font-black text-cyan-200">
                  {step.step}
                </div>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {step.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-5">
            <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Task generation proof
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-white">
                What must be true before a worker starts?
              </h2>

              <div className="mt-5 space-y-2">
                {proofChecks.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
                    <span className="text-xs font-bold leading-5 text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-amber-300/15 bg-amber-300/[0.045] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-200">
                Safe demo boundary
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-white">
                No private operational data is exposed.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                The sample demand, stations, workloads, proof rules, storage
                logic, and task names here are placeholders. Client kitchens
                define their own recipes, station map, SOPs, photos, videos,
                packaging rules, QA rules, barcode rules, storage layout, and
                operational numbers.
              </p>
            </section>
          </aside>

          <section className="space-y-4">
            {stationTasks.map((task) => (
              <StationTaskCard key={task.id} task={task} />
            ))}
          </section>
        </section>

        <section className="rounded-[32px] border border-lime-300/15 bg-[linear-gradient(135deg,rgba(204,255,51,0.08),rgba(34,211,238,0.04))] p-5 sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-lime-300">
                Live runtime handoff
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">
                After the task bridge, the live floor shows execution pressure.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                The production tasks bridge explains how demand becomes station
                work. The live runtime floor shows current batches, workforce
                pressure, alerts, approvals, production flow, and operational
                readiness without changing this demo-safe bridge.
              </p>
            </div>

            <div className="rounded-[28px] border border-lime-300/20 bg-lime-300/[0.07] p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-lime-200">
                Live operational view
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
                Open Kitchen Runtime Floor
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Move from the static production task bridge into the existing
                live runtime workspace to inspect current kitchen execution,
                alerts, production flow, workforce state, and approval pressure.
              </p>

              <Link
                href="/kitchen"
                className="mt-5 inline-flex rounded-full bg-lime-300 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#06111F] transition hover:bg-white"
              >
                Open /kitchen
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(204,255,51,0.04))] p-5 sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Worker handoff
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">
                The worker task is the final execution screen, not the whole system.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Production tasks make the system sellable: demand becomes
                station workload, station workload becomes worker SOP, and worker
                SOP stays locked until proof is cleared.
              </p>
            </div>

            <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-200">
                Next operational screen
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
                Worker SOP with completion gate
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Open the isolated worker page to see how one station task becomes
                step-by-step execution with visual guidance, temperature proof,
                cooling evidence, barcode identity, storage location, packing,
                seal, and QA clearance.
              </p>

              <Link
                href="/worker-task"
                className="mt-5 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#06111F] transition hover:bg-white"
              >
                Open /worker-task
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function StationTaskCard({ task }: { task: StationTask }) {
  const toneClass =
    task.tone === "red"
      ? "border-red-300/20 bg-red-300/[0.045] text-red-100"
      : task.tone === "amber"
        ? "border-amber-300/20 bg-amber-300/[0.045] text-amber-100"
        : task.tone === "lime"
          ? "border-lime-300/20 bg-lime-300/[0.045] text-lime-100"
          : "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-100"

  return (
    <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
      <div className="grid gap-4 lg:grid-cols-[96px_1fr_0.95fr]">
        <div
          className={`flex h-16 w-20 items-center justify-center rounded-[22px] border text-sm font-black ${toneClass}`}
        >
          {task.id}
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
            {task.station}
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
            {task.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {task.workload}
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InfoBox title="Demand signal" value={task.demandSignal} />
            <InfoBox title="Task output" value={task.taskOutput} />
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#06101d] p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            Proof and handoff
          </p>

          <div className="mt-3 rounded-[20px] border border-cyan-300/15 bg-cyan-300/[0.055] p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-200">
              Required proof
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              {task.proof}
            </p>
          </div>

          <div className="mt-3 rounded-[20px] border border-lime-300/15 bg-lime-300/[0.055] p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-lime-200">
              Handoff
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              {task.handoff}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-300">
        {value}
      </p>
    </div>
  )
}

