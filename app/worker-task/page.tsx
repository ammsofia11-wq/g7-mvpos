import Link from "next/link"

type TaskStepTone = "cyan" | "lime" | "amber" | "red"

type TaskStep = {
  id: string
  title: string
  station: string
  instruction: string
  proof: string
  media: string
  tone: TaskStepTone
}

const taskSteps: TaskStep[] = [
  {
    id: "01",
    title: "Prep setup",
    station: "Prep table",
    instruction:
      "Confirm the approved task, sanitize the station, check tools, and prepare the component tray before work starts.",
    proof: "Worker confirms station readiness before touching product.",
    media: "Photo guide: station setup, tools, tray layout.",
    tone: "cyan",
  },
  {
    id: "02",
    title: "Cutting instruction",
    station: "Butchery / prep",
    instruction:
      "Follow the approved cut size and movement pattern. Do not change thickness, shape, or trim logic without supervisor approval.",
    proof: "Cut size and prep movement are checked before the batch moves forward.",
    media: "Short video: safe knife movement and approved cut example.",
    tone: "lime",
  },
  {
    id: "03",
    title: "Cooking method",
    station: "Hot kitchen",
    instruction:
      "Cook using the approved method, batch sequence, pan loading rule, and visual readiness check defined by the chef.",
    proof: "Cooking method is logged as completed before temperature confirmation.",
    media: "Short video: cooking motion, pan spacing, and visual finish.",
    tone: "amber",
  },
  {
    id: "04",
    title: "Temperature check",
    station: "QA checkpoint",
    instruction:
      "Record the required tenant-defined temperature check. If the reading fails, stop the task and escalate.",
    proof: "Temperature check is required before cooling or portioning can continue.",
    media: "Photo guide: probe placement and reading capture.",
    tone: "red",
  },
  {
    id: "05",
    title: "Cooling control",
    station: "Cooling / blast chiller",
    instruction:
      "Move the batch into the assigned cooling location, record entry time, cooling status, and exit readiness.",
    proof: "Cooling evidence must be completed before QA release.",
    media: "Short video: tray spacing, cooling label, and handoff movement.",
    tone: "cyan",
  },
  {
    id: "06",
    title: "Portioning instruction",
    station: "Portioning line",
    instruction:
      "Portion the component using the assigned size split, tray count, and production quantity from the locked demand.",
    proof: "Portioning accuracy is checked before packaging.",
    media: "Photo guide: portion cup, tray position, and portion layout.",
    tone: "lime",
  },
  {
    id: "07",
    title: "Barcode and storage",
    station: "Storage handoff",
    instruction:
      "Scan or assign the batch barcode, confirm fridge or holding location, and keep traceability visible.",
    proof: "Batch identity and storage location must be known before dispatch readiness.",
    media: "Photo guide: barcode placement and fridge shelf location.",
    tone: "amber",
  },
  {
    id: "08",
    title: "Packing and QA escalation",
    station: "Packaging / QA",
    instruction:
      "Confirm packing rule, sealing, label handoff, and escalate to QA or supervisor if any evidence is missing.",
    proof: "No batch is released when cooling, label, barcode, or QA evidence is missing.",
    media: "Short video: sealing movement, label check, and QA handoff.",
    tone: "red",
  },
]

const checklist = [
  "Approved task loaded",
  "Start button visible",
  "Step-by-step SOP visible",
  "Photo guide available",
  "Short video guidance available",
  "Prep and cutting instructions visible",
  "Cooking method visible",
  "Temperature check required",
  "Cooling evidence required",
  "Barcode scan placeholder visible",
  "Fridge / storage location visible",
  "Portioning instruction visible",
  "Packing and sealing handoff visible",
  "QA or supervisor escalation visible",
]

const taskFacts = [
  {
    label: "Task",
    value: "Chicken Shawarma Component Batch",
    note: "Demo-safe task name",
  },
  {
    label: "Batch Code",
    value: "DEMO-BATCH-204",
    note: "Sample traceability code",
  },
  {
    label: "Station",
    value: "Hot Kitchen",
    note: "Worker execution area",
  },
  {
    label: "Assigned Role",
    value: "Cook / Commis",
    note: "Role-based task view",
  },
]

const handoffCards = [
  {
    title: "Barcode scan",
    value: "Awaiting scan",
    note: "Batch identity stays attached to the task before storage or dispatch.",
  },
  {
    title: "Fridge location",
    value: "Cooling Rack A · Shelf 03",
    note: "Sample storage location. Tenant kitchens define their own layout.",
  },
  {
    title: "Label handoff",
    value: "QA label check required",
    note: "The worker cannot release the batch without label and QA evidence.",
  },
  {
    title: "Escalation",
    value: "Supervisor / QA",
    note: "Missing temperature, cooling, barcode, or label evidence triggers escalation.",
  },
]

export default function WorkerTaskExecutionPage() {
  return (
    <main className="min-h-screen bg-[#050B14] px-4 py-5 text-white sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-[1380px] space-y-5">
        <section className="rounded-[34px] border border-cyan-300/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">
                G7 Worker Task Execution
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.07em] text-white sm:text-6xl">
                Tablet-first SOP for real kitchen workers.
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                This isolated demo shows how G7 turns an approved batch into a
                clear worker task: start, follow the SOP, view movement guidance,
                record proof, scan barcode, confirm storage, and escalate when a
                gate is missing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-cyan-300 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#06111F] shadow-[0_0_28px_rgba(34,211,238,0.25)]">
                  Start task
                </button>

                <Link
                  href="/kitchen"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                >
                  Back to kitchen runtime
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-lime-300/20 bg-lime-300/[0.055] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-lime-300">
                Product truth
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white">
                Reduce dependency on specific people.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                The worker should not need to remember every chef movement from
                memory. The system gives the task, the movement, the proof, and
                the escalation path.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {taskFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-lg font-black leading-6 text-white">
                      {fact.value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {fact.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-5">
            <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Worker screen
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                What the worker sees
              </h2>

              <div className="mt-5 space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-3 py-2.5"
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

              <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                No private recipe logic is exposed.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                This route is a product demo layer. It uses sample task names and
                operational placeholders only. Client kitchens will enter their
                own recipes, photos, videos, SOPs, stations, barcode rules,
                storage locations, and QA requirements.
              </p>
            </section>
          </aside>

          <section className="space-y-4">
            {taskSteps.map((step) => (
              <TaskStepCard key={step.id} step={step} />
            ))}
          </section>
        </section>

        <section className="rounded-[32px] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(204,255,51,0.04))] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Barcode · Storage · QA Handoff
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">
                The task does not end until traceability is clear.
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
                G7 should connect worker execution to barcode, fridge location,
                packaging readiness, sealing, label handoff, and QA escalation so
                the production floor does not depend on verbal memory.
              </p>
            </div>

            <Link
              href="/demo-sale"
              className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300 hover:text-[#06111F]"
            >
              Open demo story
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {handoffCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[22px] border border-white/10 bg-black/20 p-4"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {card.title}
                </p>
                <p className="mt-2 text-base font-black text-white">
                  {card.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

function TaskStepCard({ step }: { step: TaskStep }) {
  const toneClass =
    step.tone === "red"
      ? "border-red-300/20 bg-red-300/[0.045] text-red-100"
      : step.tone === "amber"
        ? "border-amber-300/20 bg-amber-300/[0.045] text-amber-100"
        : step.tone === "lime"
          ? "border-lime-300/20 bg-lime-300/[0.045] text-lime-100"
          : "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-100"

  return (
    <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-5">
      <div className="grid gap-4 lg:grid-cols-[88px_1fr_0.95fr]">
        <div className={`flex h-16 w-16 items-center justify-center rounded-[22px] border text-2xl font-black ${toneClass}`}>
          {step.id}
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
            {step.station}
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
            {step.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {step.instruction}
          </p>

          <div className="mt-4 rounded-[20px] border border-white/10 bg-black/20 p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
              Required proof
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {step.proof}
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#06101d] p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            Visual guidance
          </p>

          <div className="mt-3 flex min-h-[150px] items-center justify-center rounded-[22px] border border-dashed border-cyan-300/20 bg-cyan-300/[0.035] p-4 text-center">
            <div>
              <p className="text-sm font-black text-cyan-100">
                Photo / video placeholder
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {step.media}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              View photo
            </button>

            <button className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">
              Play video
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}