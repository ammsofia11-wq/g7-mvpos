import Link from "next/link"

type LibraryStatus = "Active" | "Ready" | "Draft" | "Tenant Controlled"

type OperatingLibraryItem = {
  title: string
  label: string
  status: LibraryStatus
  description: string
  includes: string[]
  owner: string
  route?: {
    label: string
    href: string
  }
}

const operatingSystems: OperatingLibraryItem[] = [
  {
    title: "Healthy Central Kitchen Base OS",
    label: "Tenant operating model",
    status: "Active",
    description:
      "A complete operating model for running a healthy central kitchen from daily planning to production release.",
    includes: [
      "Production program lines",
      "Station ownership",
      "QA release gates",
      "Workforce support paths",
    ],
    owner: "Owner / Executive Chef",
    route: {
      label: "Open Command OS",
      href: "/command",
    },
  },
  {
    title: "Weekly Production Planning OS",
    label: "Kitchen template",
    status: "Ready",
    description:
      "Turns weekly demand into controlled production blocks, program lines, station pressure, and prep visibility.",
    includes: [
      "Weekly production rhythm",
      "Program line planning",
      "Prep pressure signals",
      "Kitchen-ready outputs",
    ],
    owner: "Production Manager",
    route: {
      label: "Open Weekly OS",
      href: "/weekly",
    },
  },
  {
    title: "Recipe Runtime Bridge",
    label: "Production bridge",
    status: "Ready",
    description:
      "Connects approved recipes to station tasks, batch codes, QA gates, and release authority without exposing protected data.",
    includes: [
      "Approved recipe runtime",
      "Batch readiness",
      "QA gate linkage",
      "Role-protected visibility",
    ],
    owner: "Chef / QA",
    route: {
      label: "Open Recipe Studio",
      href: "/recipe-studio",
    },
  },
]

const playbooks: OperatingLibraryItem[] = [
  {
    title: "Morning Production Launch Playbook",
    label: "Production playbook",
    status: "Ready",
    description:
      "A structured start-of-day operating flow for checking readiness before production begins.",
    includes: [
      "Station readiness review",
      "Worker assignment check",
      "Ingredient availability",
      "Blocked batch escalation",
    ],
    owner: "Head Chef",
    route: {
      label: "Open Kitchen Floor",
      href: "/kitchen",
    },
  },
  {
    title: "QA Hold & Release Playbook",
    label: "Approved SOP pack",
    status: "Ready",
    description:
      "A release-control workflow for batches that require QA review before packaging or dispatch.",
    includes: [
      "QA hold decision",
      "Corrective action path",
      "Release authority",
      "Escalation notes",
    ],
    owner: "QA / Executive Chef",
    route: {
      label: "Open Approval Gate",
      href: "/approval",
    },
  },
  {
    title: "Station Support Movement Playbook",
    label: "Workforce playbook",
    status: "Active",
    description:
      "Guides when support should move between stations based on pressure, blockers, and runtime risk.",
    includes: [
      "Station pressure review",
      "Support recommendation",
      "Worker movement logic",
      "Escalation command",
    ],
    owner: "Production Manager",
    route: {
      label: "Open Workforce",
      href: "/workforce",
    },
  },
]

const stationWorkflows: OperatingLibraryItem[] = [
  {
    title: "Prep Station Workflow",
    label: "Station workflow",
    status: "Ready",
    description:
      "Controls prep sequencing, handoff readiness, batch dependency, and worker task clarity.",
    includes: [
      "Prep task cards",
      "Handoff checks",
      "Batch dependency",
      "Visual SOP support",
    ],
    owner: "Prep Lead",
  },
  {
    title: "Cooking Station Workflow",
    label: "Station workflow",
    status: "Ready",
    description:
      "Supports cooking execution with chef-approved methods, timing control, and runtime exception visibility.",
    includes: [
      "Cooking method control",
      "Temperature awareness",
      "Batch progress",
      "Chef escalation",
    ],
    owner: "Cooking Lead",
  },
  {
    title: "Cooling & QA Workflow",
    label: "Station workflow",
    status: "Draft",
    description:
      "Foundation for controlled cooling checks, timestamp tracking, and QA decision readiness.",
    includes: [
      "Cooling entry check",
      "Cooling exit check",
      "Temperature checkpoint",
      "QA release dependency",
    ],
    owner: "QA / Food Safety",
  },
  {
    title: "Portioning & Packaging Workflow",
    label: "Station workflow",
    status: "Draft",
    description:
      "Controls portion consistency, packaging readiness, label checks, and dispatch handoff.",
    includes: [
      "Portion target control",
      "Packaging readiness",
      "Label verification",
      "Dispatch handoff",
    ],
    owner: "Packaging Lead",
  },
]

const tenantControls = [
  "Currency controlled by tenant settings",
  "Country and locale controlled by tenant settings",
  "Timezone controlled by tenant settings",
  "Units controlled by tenant settings",
  "Role access controlled by operating permissions",
  "Protected recipe and ingredient data remain server-safe",
]

function getStatusClass(status: LibraryStatus) {
  if (status === "Active") {
    return "border-lime-400/40 bg-lime-400/10 text-lime-200"
  }

  if (status === "Ready") {
    return "border-sky-300/40 bg-sky-300/10 text-sky-100"
  }

  if (status === "Tenant Controlled") {
    return "border-amber-300/40 bg-amber-300/10 text-amber-100"
  }

  return "border-white/20 bg-white/10 text-white/70"
}

function LibraryCard({ item }: { item: OperatingLibraryItem }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/80">
            {item.label}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
            item.status,
          )}`}
        >
          {item.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/68">{item.description}</p>

      <div className="mt-5 grid gap-2">
        {item.includes.map((include) => (
          <div
            key={include}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/76"
          >
            <span className="h-2 w-2 rounded-full bg-lime-300" />
            {include}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">
          Owner: <span className="text-white/75">{item.owner}</span>
        </p>

        {item.route ? (
          <Link
            href={item.route.href}
            className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"
          >
            {item.route.label}
          </Link>
        ) : (
          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/45">
            Library item
          </span>
        )}
      </div>
    </article>
  )
}

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">
                G7 Kitchen OS
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Operating Systems Library
              </h1>
              <p className="mt-4 text-base leading-7 text-white/68 sm:text-lg">
                A central place for kitchen operating templates, production
                playbooks, approved SOP packs, station workflows, and
                tenant-controlled operating models.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-sm font-semibold text-amber-100">
                Legacy cleaned
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/65">
                This page no longer represents saved diet systems. It now works
                as the library layer for the Central Kitchen Runtime OS.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Kitchen templates", "Reusable operating structures"],
              ["Production playbooks", "Daily execution control"],
              ["Approved SOP packs", "Chef and QA standardization"],
              ["Tenant models", "Global configuration foundation"],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm text-white/55">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {operatingSystems.map((item) => (
            <LibraryCard key={item.title} item={item} />
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                Runtime playbooks
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Production Control Library
              </h2>
            </div>

            <Link
              href="/generate"
              className="w-fit rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-sm font-semibold text-lime-100 transition hover:bg-lime-300/20"
            >
              Open AI Chef Lab
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {playbooks.map((item) => (
              <LibraryCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
              Station workflows
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Kitchen Execution Templates
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">
              These workflows are designed as operating templates for real
              central-kitchen stations. They do not expose protected recipe or
              ingredient source data inside the client page.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {stationWorkflows.map((item) => (
                <LibraryCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-lime-300/20 bg-lime-300/10 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-lime-200">
                  Tenant foundation
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Global Operating Model
                </h2>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                  "Tenant Controlled",
                )}`}
              >
                Tenant Controlled
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/66">
              The library is prepared for multi-market kitchens. Currency,
              locale, units, and timezone must come from tenant settings instead
              of being hard-coded into the product.
            </p>

            <div className="mt-6 grid gap-3">
              {tenantControls.map((control) => (
                <div
                  key={control}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72"
                >
                  {control}
                </div>
              ))}
            </div>

            <Link
              href="/settings"
              className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Open Tenant Settings
            </Link>
          </aside>
        </section>
      </section>
    </main>
  )
}