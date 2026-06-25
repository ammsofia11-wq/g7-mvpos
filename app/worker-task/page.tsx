import RealPilotWorkspace from "@/components/real-pilot/RealPilotWorkspace";
import Image from "next/image";
import Link from "next/link";

const executionFlow = [
  {
    step: "01",
    title: "Read Build Card",
    text: "Start from the approved product build, not from memory or scattered instructions.",
  },
  {
    step: "02",
    title: "Collect from Store",
    text: "Use the worker grocery report to collect only the approved ingredients for the assigned station task.",
  },
  {
    step: "03",
    title: "Follow Module Task",
    text: "Execute the assigned G7 Culinary Module task for the correct station and product stage.",
  },
  {
    step: "04",
    title: "Confirm Handoff",
    text: "Mark the task ready only when the station output is complete and ready for the next gate.",
  },
  {
    step: "05",
    title: "Respect Cooling Gate",
    text: "Do not move product forward when cooling is required before QA or packaging.",
  },
  {
    step: "06",
    title: "Wait for QA Release",
    text: "Only released product can move to packaging, fridge call-off, or dispatch handoff.",
  },
];

const workerTasks = [
  {
    module: "Protein Module",
    station: "Cooking Station",
    task: "Cook approved protein batch",
    status: "Ready",
    instruction:
      "Follow the build card timing, doneness standard, yield expectation, and handoff rule.",
  },
  {
    module: "Carb Module",
    station: "Prep Station",
    task: "Prepare carb component",
    status: "Ready",
    instruction:
      "Prepare according to the module task and keep the output aligned with the product build.",
  },
  {
    module: "Sauce Module",
    station: "Finishing Station",
    task: "Prepare sauce for controlled assembly",
    status: "In sequence",
    instruction:
      "Use the approved sauce logic and hold until the product build is ready for assembly.",
  },
  {
    module: "Cooling Gate",
    station: "Cooling Area",
    task: "Hold product before QA",
    status: "Gate required",
    instruction:
      "Confirm cooling requirement before product moves into QA, packaging, or fridge call-off.",
  },
  {
    module: "Packaging Module",
    station: "Packaging Station",
    task: "Package only QA released product",
    status: "Protected",
    instruction:
      "Package after release only, following packaging rule, label logic, and dispatch handoff.",
  },
];

const groceryChecklist = [
  {
    item: "Protein batch",
    source: "Storekeeper Trolley C-02",
    quantity: "Batch quantity by tenant units",
    status: "Collected",
    note: "Must match butchery usable yield before cooking starts.",
  },
  {
    item: "Sauce module kit",
    source: "Storekeeper Trolley C-02",
    quantity: "Controlled kit",
    status: "Collected",
    note: "Sensitive ingredients follow chef scaling intelligence.",
  },
  {
    item: "Spice control pack",
    source: "Dry store issue",
    quantity: "Approved pack",
    status: "Check required",
    note: "Worker should not adjust salt, spice, heat, or aromatics from memory.",
  },
  {
    item: "Labelled handoff tray",
    source: "Station equipment issue",
    quantity: "As required",
    status: "Ready",
    note: "Output must be traceable before cooling, QA, or packaging movement.",
  },
];

const collectionSteps = [
  {
    label: "My Grocery Report",
    text: "Worker sees only the ingredients needed for the assigned module task.",
  },
  {
    label: "Collect from Store",
    text: "The station collects from the prepared trolley before execution starts.",
  },
  {
    label: "Missing Item Escalation",
    text: "If an item is missing, the worker escalates instead of improvising.",
  },
  {
    label: "Ready to Start",
    text: "The task starts only when ingredient readiness is clear.",
  },
];

const workerRules = [
  "Follow the Build Card",
  "Collect approved grocery first",
  "Execute one Module Task at a time",
  "Do not skip Cooling Gate",
  "Do not package before QA Release",
  "Do not change chef logic from the station",
  "Escalate blocked task instead of improvising",
  "Confirm handoff before next movement",
  "Keep dispatch readiness visible",
];

const nextLinks = [
  {
    label: "Production Tasks",
    href: "/production-tasks",
    text: "Return to the full production task structure.",
  },
  {
    label: "Inventory OS",
    href: "/inventory",
    text: "Review storekeeper trolley readiness, ingredient issue, and safety holds before worker collection.",
  },
  {
    label: "Kitchen Runtime",
    href: "/kitchen",
    text: "Open the production floor execution view.",
  },
  {
    label: "Recipe Studio",
    href: "/recipe-studio",
    text: "Review chef logic and product build intelligence.",
  },
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Return to the pilot activation path.",
  },
];

export default function WorkerTaskPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061622] text-white">
      <section className="relative isolate px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(184,115,51,0.16),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-6">          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/g7-logo-clean.png"
              alt="G7 logo"
              width={54}
              height={54}
              priority
              className="h-12 w-auto"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                G7 Kitchen OS
              </p>
              <p className="text-sm font-semibold text-white">
                Worker Execution
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/production-tasks"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Production Tasks
            </Link>
            <Link
              href="/inventory"
              className="rounded-full border border-emerald-300/40 px-5 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/10"
            >
              Inventory OS
            </Link>
            <Link
              href="/kitchen"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Kitchen Runtime
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Worker Task Screen
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Turn chef logic into simple worker execution.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">              The worker screen shows how G7 Kitchen OS converts the Build Card
              into clear G7 Culinary Module tasks. Workers see what to collect,
              what to do, which station owns the task, when to stop, and when QA
              release is required before the next movement.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kitchen"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Kitchen Runtime
              </Link>
              <Link
                href="/inventory"
                className="rounded-full border border-emerald-300/40 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/10"
              >
                Inventory OS
              </Link>
              <Link
                href="/production-tasks"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Back to Production Tasks
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Source
                </p>
                <p className="mt-2 font-bold text-white">Build Card</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Before Start
                </p>
                <p className="mt-2 font-bold text-white">Collect Grocery</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Protection
                </p>
                <p className="mt-2 font-bold text-white">QA Release</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Worker Execution Flow
              </p>

              <div className="mt-6 space-y-4">
                {executionFlow.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100">
                        {item.step}
                      </span>
                      <div>
                        <h2 className="font-black text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Worker protection rule
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The worker should not decide the chef logic or replace missing
                  ingredients by memory. The worker collects the approved
                  grocery, executes the approved Module Task, and escalates when
                  blocked.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                My Grocery Report
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                The worker collects before execution.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                This preview protects the start of work. The worker sees what
                must be collected, where it comes from, what is ready, and what
                must be escalated before the Module Task starts.
              </p>

              <div className="mt-6 grid gap-3">
                {collectionSteps.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4"
                  >
                    <p className="text-sm font-black text-cyan-100">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {groceryChecklist.map((item) => (
                <div
                  key={`${item.item}-${item.source}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                        {item.item}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {item.source}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-400">
                        {item.quantity}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {item.note}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Check
                      </p>
                      <p className="mt-2 text-sm font-bold text-white">
                        Correct item
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Confirm
                      </p>
                      <p className="mt-2 text-sm font-bold text-white">
                        Collected
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Escalate
                      </p>
                      <p className="mt-2 text-sm font-bold text-white">
                        If missing
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Active Module Tasks
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What the worker sees
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Each task is simplified for execution while still staying tied to
              the Build Card, G7 Culinary Modules, grocery readiness, cooling
              gate, QA release, and dispatch readiness.
            </p>
          </div>

          <div className="grid gap-4">
            {workerTasks.map((task) => (
              <div
                key={`${task.module}-${task.task}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                      {task.module}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {task.task}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-400">
                      {task.station}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                    {task.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {task.instruction}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Start
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">
                      After grocery ready
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Proof
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">
                      Confirm handoff
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071a27] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Gate
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">
                      QA protected
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Worker Guardrails
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              What protects execution
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              G7 Kitchen OS keeps the worker screen simple while protecting the
              approved chef logic behind the task.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {workerRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-4"
                >
                  <p className="text-sm font-bold text-white">{rule}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Execution guardrail
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              Continue Flow
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Move from worker execution into runtime control.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              After worker tasks are clear, the pilot can continue into
              storekeeper trolley control, kitchen runtime visibility, recipe
              intelligence, and client activation review.
            </p>

            <div className="mt-7 grid gap-3">
              {nextLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition hover:border-cyan-200/50 hover:bg-white/[0.1]"
                >
                  <p className="text-base font-black text-white">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {link.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
        <RealPilotWorkspace mode="worker" />
    </main>
  );
}