"use client";

import Link from "next/link";
import { useState } from "react";

type ClientProfile = {
  companyName: string;
  contactName: string;
  kitchenName: string;
  country: string;
  currency: string;
  timezone: string;
  units: string;
  operatingLanguage: string;
};

const selectedPackage = {
  name: "G7 5-Product Pilot Implementation",
  scope: "5 Product Builds",
  fee: "150,000 EGP",
  duration: "7–14 days",
  creditRule:
    "If the client proceeds to full rollout within 30 days, part of the pilot fee can be credited toward the setup fee.",
};

const onboardingSteps = [
  {
    number: "01",
    title: "Client Registration",
    description:
      "Create the first safe pilot workspace with company name, kitchen name, local currency, timezone, units, and operating language.",
    signal: "Tenant start",
  },
  {
    number: "02",
    title: "Roles & Permissions",
    description:
      "Assign protected access for owner, chef, production manager, QA, storekeeper, purchasing, and workers.",
    signal: "Role protection",
  },
  {
    number: "03",
    title: "Kitchen Stations Setup",
    description:
      "Map the real production floor: store, prep, butchery, hot kitchen, cold prep, cooling, portioning, Packaging Module, QA, dispatch, and handoff.",
    signal: "Production map",
  },
  {
    number: "04",
    title: "5 Product Builds",
    description:
      "Convert five real client products into Product Builds with G7 Culinary Modules, purchase/yield calculations, Build Cards, and Module Tasks.",
    signal: "Pilot scope",
  },
  {
    number: "05",
    title: "Worker & QA Simulation",
    description:
      "Show station responsibilities, worker task flow, Packaging Module Build Card, and QA release gate for the selected products.",
    signal: "Controlled run",
  },
  {
    number: "06",
    title: "Pilot Result Report",
    description:
      "Deliver readiness notes, blocked points, training needs, rollout recommendation, and next commercial step.",
    signal: "Rollout decision",
  },
];

const readinessChecks = [
  "Pilot package selected",
  "Client workspace profile prepared",
  "Roles and permissions mapped",
  "Kitchen stations mapped",
  "5 Product Builds ready for intake",
  "Pilot result report planned",
];

const pilotRoles = [
  {
    role: "Owner",
    access: "Commercial view, rollout decision, protected summary",
    responsibility: "Approves pilot scope and full rollout proposal",
  },
  {
    role: "Executive Chef",
    access: "Product Builds, costing confidence, yield, SOPs",
    responsibility: "Approves Culinary Modules, taste, and production method",
  },
  {
    role: "Production Manager",
    access: "Station plan, Module Tasks, output readiness",
    responsibility: "Coordinates stations and confirms production handoff",
  },
  {
    role: "QA",
    access: "QA gates, release checklist, hold/reject notes",
    responsibility: "Checks weight, appearance, label, barcode, and release",
  },
  {
    role: "Storekeeper",
    access: "Issue list, purchase quantities, handoff confirmation",
    responsibility: "Controls raw material issue and station handoff",
  },
  {
    role: "Packaging Worker",
    access: "Packaging Module Build Card and assigned Module Tasks only",
    responsibility: "Executes portioning, closing, sleeve, label, and handoff",
  },
];

const stationPlan = [
  "Store",
  "Butchery",
  "Vegetable Prep",
  "Hot Kitchen",
  "Cold Prep",
  "Cooling",
  "Portioning",
  "Packaging",
  "QA",
  "Dispatch",
];

const pilotProducts = [
  {
    number: "01",
    name: "Club Sandwich",
    modules:
      "Protein Module / Carb Module / Sauce Module / Garnish Module / Packaging Module",
  },
  {
    number: "02",
    name: "Green Thai Chicken Curry",
    modules:
      "Protein Module / Carb Module / Sauce Module / Garnish Module / Packaging Module",
  },
  {
    number: "03",
    name: "Qatari Pasta Chicken Machboos",
    modules:
      "Protein Module / Carb Module / Sauce Module / Garnish Module / Packaging Module",
  },
  {
    number: "04",
    name: "Rice Pudding",
    modules: "Carb Module / Sauce Module / Garnish Module / Packaging Module",
  },
  {
    number: "05",
    name: "Tomato Sauce Batch",
    modules: "Sauce Module / Packaging Module / QA Release Gate",
  },
];

export default function PilotOnboardingPage() {
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    companyName: "Salem's diet",
    contactName: "Operations Owner",
    kitchenName: "Main Central Kitchen",
    country: "Egypt",
    currency: "EGP",
    timezone: "Africa/Cairo",
    units: "g / kg / portion / piece",
    operatingLanguage: "English / Arabic",
  });

  function updateClientProfile(field: keyof ClientProfile, value: string) {
    setClientProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#06111f] text-white">
      <section className="relative min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(202,138,4,0.18),transparent_28%),linear-gradient(135deg,#06111f_0%,#071827_48%,#020617_100%)]" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/demo-close"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
            >
              Back to Close
            </Link>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                First Client Pilot Workspace
              </span>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                Paid Pilot Implementation
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  Start the first real client journey from registration to 5 Product Builds.
                </h1>

                <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                  This page is the bridge between the signed pilot agreement and
                  the first operational setup. G7 creates a limited client pilot
                  workspace, maps the kitchen, protects role access, and prepares
                  five Product Builds for intake.
                </p>
              </div>

              <div className="grid gap-3 rounded-[2rem] border border-[#CCFF33]/25 bg-[#CCFF33]/10 p-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#CCFF33]">
                    Selected Package
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-tight text-white">
                    {selectedPackage.name}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#CCFF33]">
                    Scope
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-tight text-white">
                    {selectedPackage.scope}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#CCFF33]">
                    Founder Pricing
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-tight text-white">
                    {selectedPackage.fee}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pilot-intake"
                  className="rounded-2xl border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#CCFF33] shadow-[0_0_28px_rgba(204,255,51,0.12)] transition hover:bg-[#CCFF33]/15"
                >
                  Start 5 Product Intake
                </Link>

                <Link
                  href="/production-tasks"
                  className="rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.14)] transition hover:bg-cyan-300/15"
                >
                  Preview Module Tasks
                </Link>

                <Link
                  href="/worker-task"
                  className="rounded-2xl border border-lime-300/30 bg-lime-300/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-lime-100 transition hover:bg-lime-300/15"
                >
                  Worker Task Preview
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[#071827]/80 p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                      Client Workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Registration Details
                    </h2>
                  </div>
                  <div className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-100">
                    Draft
                  </div>
                </div>

                <div className="grid gap-3">
                  {(
                    [
                      ["companyName", "Company Name"],
                      ["contactName", "Main Contact"],
                      ["kitchenName", "Kitchen Name"],
                      ["country", "Country"],
                      ["currency", "Currency"],
                      ["timezone", "Timezone"],
                      ["units", "Units"],
                      ["operatingLanguage", "Operating Language"],
                    ] as [keyof ClientProfile, string][]
                  ).map(([field, label]) => (
                    <label key={field} className="grid gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {label}
                      </span>
                      <input
                        value={clientProfile[field]}
                        onChange={(event) =>
                          updateClientProfile(field, event.target.value)
                        }
                        className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {onboardingSteps.map((step) => (
              <article
                key={step.number}
                className="group rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[0.28em] text-cyan-100/70">
                    {step.number}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 group-hover:border-cyan-300/30 group-hover:text-cyan-100">
                    {step.signal}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {step.description}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                    Roles Setup
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Access is protected before the first Product Build.
                  </h2>
                </div>
                <span className="rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#CCFF33]">
                  {pilotRoles.length} roles
                </span>
              </div>

              <div className="grid gap-3">
                {pilotRoles.map((role) => (
                  <div
                    key={role.role}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {role.role}
                      </h3>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Pilot Access
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-cyan-100/75">
                      {role.access}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {role.responsibility}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/70">
                    Kitchen Stations
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    The production floor is mapped before intake.
                  </h2>
                </div>
                <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                  {stationPlan.length} stations
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {stationPlan.map((station, index) => (
                  <div
                    key={station}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-white/75">
                      {station}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80">
                  Protection Rule
                </p>
                <p className="mt-2 text-sm leading-6 text-white/68">
                  G7 onboarding uses the client’s own operational data. The
                  sales presentation never exposes proprietary G7 recipes, real
                  costing, or protected internal assets.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#CCFF33]">
                  5-Product Pilot Scope
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  The client can see what will be built before intake starts.
                </h2>
              </div>
              <div className="rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#CCFF33]">
                {selectedPackage.duration}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {pilotProducts.map((product) => (
                <article
                  key={product.number}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-sm font-semibold text-[#CCFF33]">
                      {product.number}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                      Product Build
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-tight text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-xs font-semibold leading-6 text-cyan-100/70">
                    {product.modules}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                Workspace Summary
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {clientProfile.companyName || "Client"} is ready to start the paid pilot.
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {readinessChecks.map((check) => (
                  <div
                    key={check}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-lime-300/35 bg-lime-300/10 text-xs text-lime-100">
                      ✓
                    </div>
                    <p className="text-sm text-white/72">{check}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-white/60">
                {selectedPackage.creditRule}
              </p>
            </article>

            <footer className="rounded-[2rem] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#CCFF33]">
                Next Operational Step
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Start the 5 Product Build intake.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/68">
                The next page converts the selected products into G7 Culinary
                Modules, Module Tasks, purchase/yield calculations, Packaging
                Module Build Cards, and QA release gates.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/pilot-intake"
                  className="rounded-2xl border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#CCFF33] transition hover:bg-[#CCFF33]/15"
                >
                  Start 5 Product Intake
                </Link>

                <Link
                  href="/demo-sale"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-cyan-300/35 hover:text-cyan-100"
                >
                  Review Sales Journey
                </Link>
              </div>
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}
