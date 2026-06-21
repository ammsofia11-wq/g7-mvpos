"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Ingredient = {
  name: string;
  amountG: number;
  station: string;
  stage: string;
  yieldRatio: number | null;
  note?: string;
};

type Brick = {
  name: string;
  type: string;
  station: string;
  productionType: string;
  ingredients: Ingredient[];
  notes: string[];
};

type GeneratedTask = {
  step: string;
  station: string;
  task: string;
  worker: string;
  expectedOutput: string;
  approval: string;
};

const controlledStations = [
  "Full Pilot Flow",
  "Store",
  "Butchery",
  "Vegetable Prep",
  "Bakery",
  "Cold Prep",
  "Hot Kitchen",
  "Packaging",
  "QA",
];

const cookingYieldRules = [
  {
    item: "Chicken",
    cookingLoss: "40–45%",
    cookedYield: "55–60%",
    note: "Chicken breast must be measured live from raw usable weight to cooked output.",
  },
  {
    item: "Beef / Tenderloin",
    cookingLoss: "30–35%",
    cookedYield: "65–70%",
    note: "Tenderloin and premium beef cuts should have their own method-specific cooked yield.",
  },
  {
    item: "Fish / Salmon / Hamour / White Fish",
    cookingLoss: "TBD live",
    cookedYield: "TBD live",
    note: "Fish yield must be measured by species, cut, thickness, and cooking method.",
  },
];

const baseBricks: Brick[] = [
  {
    name: "Chicken Fajita Filling",
    type: "Protein Filling",
    station: "Butchery → Vegetable Prep → Hot Kitchen",
    productionType: "In-House",
    notes: [
      "All weights are RAW usable weights per portion.",
      "Fresh cilantro is added after cooking during final mixing.",
      "Chicken cooking loss target: 40–45%. Expected cooked yield: 55–60%. Final cooked output must be measured live.",
      "Chicken butchery and cooking yield must be measured during the live pilot.",
    ],
    ingredients: [
      {
        name: "Chicken Breast",
        amountG: 180,
        station: "Butchery",
        stage: "Raw net before cooking",
        yieldRatio: null,
        note: "Measure live: gross pull → trimmed net → cooked output → packed portion",
      },
      {
        name: "Red Onion",
        amountG: 30,
        station: "Vegetable Prep",
        stage: "Cleaned and cut julienne",
        yieldRatio: 79 / 93,
      },
      {
        name: "Green Bell Pepper",
        amountG: 30,
        station: "Vegetable Prep",
        stage: "Cleaned and cut julienne",
        yieldRatio: 70 / 85,
      },
      {
        name: "Red Bell Pepper",
        amountG: 30,
        station: "Vegetable Prep",
        stage: "Cleaned and cut julienne",
        yieldRatio: 205 / 255,
      },
      {
        name: "Yellow Bell Pepper",
        amountG: 30,
        station: "Vegetable Prep",
        stage: "Cleaned and cut julienne",
        yieldRatio: 160 / 186,
      },
      {
        name: "Olive Oil",
        amountG: 15,
        station: "Hot Kitchen",
        stage: "Cooking fat",
        yieldRatio: 1,
      },
      {
        name: "Sea Salt",
        amountG: 1,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Black Pepper",
        amountG: 0.3,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Cumin Powder",
        amountG: 0.5,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Coriander Powder",
        amountG: 0.3,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Paprika",
        amountG: 0.5,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Onion Powder",
        amountG: 0.3,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Garlic Powder",
        amountG: 0.3,
        station: "Hot Kitchen",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Fresh Cilantro",
        amountG: 3,
        station: "Hot Kitchen",
        stage: "After cooking / final mixing",
        yieldRatio: null,
        note: "Measure cleaning yield live",
      },
    ],
  },
  {
    name: "Tortilla Bread",
    type: "Bakery / Carb Matrix",
    station: "Bakery or Store",
    productionType: "In-House or Purchased Ready",
    notes: [
      "If made in-house, bakery needs a full tortilla recipe.",
      "If purchased ready, G7 creates a store issue and supplier spec check instead of a bakery production task.",
      "Target dough or piece weight is 70g per portion.",
    ],
    ingredients: [
      {
        name: "Tortilla Bread / Dough",
        amountG: 70,
        station: "Bakery",
        stage: "Final dough or approved ready piece",
        yieldRatio: 1,
        note: "In-house recipe details to be entered later",
      },
    ],
  },
  {
    name: "Guacamole",
    type: "Cold Sauce Matrix",
    station: "Cold Prep",
    productionType: "In-House",
    notes: [
      "Cold prep task with taste approval.",
      "Avocado and lemon juice purchase weights are calculated from before/after yield.",
    ],
    ingredients: [
      {
        name: "Avocado",
        amountG: 30,
        station: "Cold Prep",
        stage: "Cleaned usable avocado",
        yieldRatio: 134 / 204,
      },
      {
        name: "Red Onion",
        amountG: 5,
        station: "Cold Prep",
        stage: "Fine dice",
        yieldRatio: 79 / 93,
      },
      {
        name: "Tomato",
        amountG: 20,
        station: "Cold Prep",
        stage: "Diced usable tomato",
        yieldRatio: null,
        note: "Measure tomato cleaning yield live",
      },
      {
        name: "Fresh Cilantro",
        amountG: 2,
        station: "Cold Prep",
        stage: "Chopped fresh",
        yieldRatio: null,
        note: "Measure cleaning yield live",
      },
      {
        name: "Sea Salt",
        amountG: 0.5,
        station: "Cold Prep",
        stage: "Seasoning",
        yieldRatio: 1,
      },
      {
        name: "Lemon Juice",
        amountG: 5,
        station: "Cold Prep",
        stage: "Fresh juice",
        yieldRatio: 50 / 124,
        note: "Purchase as lemon, output as juice",
      },
    ],
  },
];

const baseTasks: GeneratedTask[] = [
  {
    step: "01",
    station: "Store",
    task: "Collect pilot ingredients and scan issue list",
    worker: "Storekeeper 01",
    expectedOutput:
      "Gross issue list prepared for chicken, vegetables, tortilla, guacamole ingredients, spices, labels, and packaging.",
    approval: "Store issue confirmation",
  },
  {
    step: "02",
    station: "Butchery",
    task: "Chicken breast thawing / trimming / julienne cut",
    worker: "Butchery Worker 01",
    expectedOutput:
      "Chicken raw gross, trimmed net, trim waste, cut style, and handoff to hot kitchen recorded.",
    approval: "Chef or production manager accepts butchery handoff",
  },
  {
    step: "03",
    station: "Vegetable Prep",
    task: "Clean and cut onion and bell peppers julienne",
    worker: "Veg Prep Worker 01",
    expectedOutput:
      "Before cleaning weight, after cleaning weight, waste, cut quality, and handoff to hot kitchen recorded.",
    approval: "Cut quality visual check",
  },
  {
    step: "04",
    station: "Hot Kitchen",
    task: "Mix oil and spices, cook chicken fajita filling",
    worker: "Hot Kitchen Worker 01",
    expectedOutput:
      "Cooked fajita filling with final cilantro mixing after cooking. Chicken cooked yield must be measured.",
    approval: "Taste approval required",
  },
  {
    step: "05",
    station: "Bakery",
    task: "Prepare tortilla bread or verify purchased tortilla",
    worker: "Bakery / Store Worker",
    expectedOutput:
      "Either 70g dough/piece produced in-house or ready tortilla issued from approved supplier stock.",
    approval: "Bakery output or supplier spec check",
  },
  {
    step: "06",
    station: "Cold Prep",
    task: "Prepare guacamole",
    worker: "Cold Prep Worker 01",
    expectedOutput:
      "Guacamole mixed cold with avocado, onion, tomato, cilantro, salt, and lemon juice.",
    approval: "Taste approval required",
  },
  {
    step: "07",
    station: "Packaging",
    task: "Portion tortilla, fajita filling, and guacamole",
    worker: "Packaging Worker 01",
    expectedOutput:
      "100 finished meals packed according to visual portioning guide. Packed portion output must be measured.",
    approval: "Packaging supervisor check",
  },
  {
    step: "08",
    station: "QA",
    task: "Final release gate",
    worker: "QA User",
    expectedOutput:
      "Random weight check, appearance check, label check, barcode check, and release decision.",
    approval: "Approve / Hold / Reject",
  },
];

function formatNumber(value: number, decimals = 1) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatWeightFromGrams(grams: number) {
  if (grams >= 1000) {
    return `${formatNumber(grams / 1000, 2)} kg`;
  }

  return `${formatNumber(grams, grams < 10 ? 1 : 0)} g`;
}

function formatYield(ratio: number | null) {
  if (ratio === null) {
    return "TBD live";
  }

  return `${formatNumber(ratio * 100, 1)}%`;
}

export default function PilotIntakePage() {
  const [clientName, setClientName] = useState(
    "Nourish / Diet To Door Egypt Pilot",
  );
  const [kitchenName, setKitchenName] = useState("Main Central Kitchen");
  const [batchQuantity, setBatchQuantity] = useState(100);
  const [pilotStation, setPilotStation] = useState("Full Pilot Flow");
  const [tortillaType, setTortillaType] = useState<"in-house" | "purchased">(
    "in-house",
  );

  const purchaseRows = useMemo(() => {
    const rows = new Map<
      string,
      {
        name: string;
        stations: Set<string>;
        usableG: number;
        purchaseG: number;
        wasteG: number | null;
        yieldRatio: number | null;
        note: string;
      }
    >();

    for (const brick of baseBricks) {
      for (const ingredient of brick.ingredients) {
        if (
          ingredient.name === "Tortilla Bread / Dough" &&
          tortillaType === "purchased"
        ) {
          continue;
        }

        const usableG = ingredient.amountG * batchQuantity;
        const hasYield = ingredient.yieldRatio !== null;
        const purchaseG = hasYield ? usableG / ingredient.yieldRatio! : usableG;
        const wasteG = hasYield ? purchaseG - usableG : null;

        const existing = rows.get(ingredient.name);

        if (existing) {
          existing.usableG += usableG;
          existing.purchaseG += purchaseG;
          existing.wasteG =
            existing.wasteG === null || wasteG === null
              ? null
              : existing.wasteG + wasteG;
          existing.stations.add(ingredient.station);
          if (ingredient.note) {
            existing.note = `${existing.note}; ${ingredient.note}`;
          }
        } else {
          rows.set(ingredient.name, {
            name: ingredient.name,
            stations: new Set([ingredient.station]),
            usableG,
            purchaseG,
            wasteG,
            yieldRatio: ingredient.yieldRatio,
            note: ingredient.note ?? "",
          });
        }
      }
    }

    if (tortillaType === "purchased") {
      rows.set("Ready Tortilla Bread", {
        name: "Ready Tortilla Bread",
        stations: new Set(["Store"]),
        usableG: batchQuantity,
        purchaseG: Math.ceil(batchQuantity * 1.03),
        wasteG: null,
        yieldRatio: 1,
        note: "Purchased ready item. Suggested 3% buffer.",
      });
    }

    return Array.from(rows.values());
  }, [batchQuantity, tortillaType]);

  const visibleTasks = useMemo(() => {
    if (pilotStation === "Full Pilot Flow") {
      return baseTasks;
    }

    return baseTasks.filter((task) => task.station === pilotStation);
  }, [pilotStation]);

  const totalUsableWeight = purchaseRows.reduce((sum, row) => {
    if (row.name === "Ready Tortilla Bread") {
      return sum;
    }

    return sum + row.usableG;
  }, 0);

  const totalPurchaseWeight = purchaseRows.reduce((sum, row) => {
    if (row.name === "Ready Tortilla Bread") {
      return sum;
    }

    return sum + row.purchaseG;
  }, 0);

  const chickenRawUsable = batchQuantity * 180;
  const chickenCookedLow = chickenRawUsable * 0.55;
  const chickenCookedHigh = chickenRawUsable * 0.6;

  return (
    <main className="min-h-screen bg-[#06111F] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-[-160px] top-[-160px] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#CCFF33]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-4 pb-10 sm:px-5 lg:px-7">
        <header className="rounded-[34px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <Link
              href="/pilot-onboarding"
              className="rounded-full border border-white/15 px-4 py-2 transition hover:border-[#CCFF33]/40 hover:text-[#CCFF33]"
            >
              Back to Pilot Onboarding
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/demo-close"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                Demo Close
              </Link>

              <Link
                href="/production-tasks"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                Production Tasks
              </Link>

              <Link
                href="/worker-task"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-emerald-300/40 hover:text-emerald-200"
              >
                Worker Task
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 xl:grid-cols-[1fr_430px]">
            <div>
              <div className="inline-flex rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                G7 Pilot Intake Command
              </div>

              <h1 className="mt-5 max-w-5xl text-[42px] font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-[62px] lg:text-[76px]">
                Turn the client’s first real product into production flow.
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-[17px]">
                This is the missing page after the demo close. When a client
                says yes, G7 starts the first pilot product, breaks it into G7
                Matrix, calculates purchase/yield, generates station tasks, and
                shows worker responsibilities.
              </p>
            </div>

            <aside className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                First Live Test
              </p>

              <h2 className="mt-3 text-[32px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                Chicken Fajita with Bread and Guacamole.
              </h2>

              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Batch Quantity
                  </p>
                  <p className="mt-1 text-[26px] font-black text-white">
                    {batchQuantity} portions
                  </p>
                </div>

                <div className="rounded-[22px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                    Runtime Output
                  </p>
                  <p className="mt-1 text-[18px] font-black leading-tight text-white">
                    G7 Matrix → Purchase → Tasks → Workers → QA
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Step 1 — Client Tenant
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Pilot workspace setup.
            </h2>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Client Name
                </span>
                <input
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Kitchen Name
                </span>
                <input
                  value={kitchenName}
                  onChange={(event) => setKitchenName(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Pilot Batch Quantity
                </span>
                <input
                  type="number"
                  min={1}
                  value={batchQuantity}
                  onChange={(event) =>
                    setBatchQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Pilot Station Scope
                </span>
                <select
                  value={pilotStation}
                  onChange={(event) => setPilotStation(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                >
                  {controlledStations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </label>

              <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Tenant Summary
                </p>
                <div className="mt-3 grid gap-2 text-[13px] font-bold leading-6 text-slate-200">
                  <p>Client: {clientName}</p>
                  <p>Kitchen: {kitchenName}</p>
                  <p>Currency: EGP</p>
                  <p>Timezone: Africa/Cairo</p>
                  <p>Units: g / kg / portion / piece</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Step 2 — G7 Matrix Product Setup
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              One dish becomes a G7 Matrix production structure.
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {baseBricks.map((brick, index) => (
                <article
                  key={brick.name}
                  className="rounded-[26px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-sm font-black text-[#CCFF33]">
                      {index + 1}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                      {brick.type}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[22px] font-black leading-none tracking-[-0.04em] text-white">
                    {brick.name}
                  </h3>

                  <p className="mt-3 text-[12px] font-bold leading-5 text-slate-300">
                    Station: {brick.station}
                  </p>

                  <p className="mt-2 text-[12px] font-bold leading-5 text-slate-400">
                    Production: {brick.productionType}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[26px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Tortilla Production Decision
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setTortillaType("in-house")}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                    tortillaType === "in-house"
                      ? "border-[#CCFF33]/50 bg-[#CCFF33]/15 text-[#E9FF9A]"
                      : "border-white/10 bg-black/20 text-slate-300 hover:border-white/25"
                  }`}
                >
                  In-house bakery tortilla
                </button>

                <button
                  type="button"
                  onClick={() => setTortillaType("purchased")}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                    tortillaType === "purchased"
                      ? "border-[#CCFF33]/50 bg-[#CCFF33]/15 text-[#E9FF9A]"
                      : "border-white/10 bg-black/20 text-slate-300 hover:border-white/25"
                  }`}
                >
                  Purchased ready tortilla
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
            Step 3 — Raw Recipe Per Portion
          </p>

          <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
            Every matrix part has its own raw-weight recipe.
          </h2>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {baseBricks.map((brick) => (
              <article
                key={brick.name}
                className="rounded-[28px] border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-[24px] font-black leading-none tracking-[-0.04em] text-white">
                  {brick.name}
                </h3>

                <div className="mt-4 grid gap-2">
                  {brick.ingredients.map((ingredient) => (
                    <div
                      key={`${brick.name}-${ingredient.name}-${ingredient.stage}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-white">
                            {ingredient.name}
                          </p>
                          <p className="mt-1 text-[11px] font-bold leading-5 text-slate-400">
                            {ingredient.stage}
                          </p>
                        </div>
                        <p className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">
                          {ingredient.amountG}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-2">
                  {brick.notes.map((note) => (
                    <p
                      key={note}
                      className="rounded-2xl border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3 text-[12px] font-bold leading-5 text-slate-300"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Step 4 — Purchase & Yield Calculation
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Raw usable weight becomes purchase requirement.
            </h2>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
              <div className="grid grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_1fr] gap-0 bg-white/[0.06] px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                <span>Ingredient</span>
                <span>Usable</span>
                <span>Yield</span>
                <span>Purchase</span>
                <span>Station / Note</span>
              </div>

              <div className="divide-y divide-white/10">
                {purchaseRows.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_1fr] gap-0 px-4 py-3 text-[12px] font-bold leading-5 text-slate-200"
                  >
                    <span className="text-white">{row.name}</span>
                    <span>
                      {row.name === "Ready Tortilla Bread"
                        ? `${row.usableG} pieces`
                        : formatWeightFromGrams(row.usableG)}
                    </span>
                    <span>{formatYield(row.yieldRatio)}</span>
                    <span>
                      {row.name === "Ready Tortilla Bread"
                        ? `${row.purchaseG} pieces`
                        : formatWeightFromGrams(row.purchaseG)}
                    </span>
                    <span className="text-slate-400">
                      {Array.from(row.stations).join(" / ")}
                      {row.note ? ` — ${row.note}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[32px] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
              Pilot Calculation Summary
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              What G7 calculated.
            </h2>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Total usable recipe weight
                </p>
                <p className="mt-2 text-[28px] font-black text-white">
                  {formatWeightFromGrams(totalUsableWeight)}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Estimated purchase / issue weight
                </p>
                <p className="mt-2 text-[28px] font-black text-white">
                  {formatWeightFromGrams(totalPurchaseWeight)}
                </p>
              </div>

              <div className="rounded-[24px] border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-100">
                  Chicken cooked output estimate
                </p>
                <p className="mt-2 text-[20px] font-black text-white">
                  {formatWeightFromGrams(chickenCookedLow)} –{" "}
                  {formatWeightFromGrams(chickenCookedHigh)}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-200">
                  Based on expected 40–45% cooking loss. Actual cooked output
                  must be measured during the live pilot.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                  Live measurement still required
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-200">
                  Chicken butchery yield, chicken cooking yield, tomato yield,
                  cilantro yield, fish yield, beef yield, and final packed
                  output must be measured in the first live pilot.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
            Step 4B — Cooking Yield Rules
          </p>

          <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
            G7 tracks raw, cooked, and packed output.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cookingYieldRules.map((rule) => (
              <article
                key={rule.item}
                className="rounded-[26px] border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-[22px] font-black leading-none tracking-[-0.04em] text-white">
                  {rule.item}
                </h3>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Cooking Loss
                    </p>
                    <p className="mt-1 text-xl font-black text-amber-100">
                      {rule.cookingLoss}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Cooked Yield
                    </p>
                    <p className="mt-1 text-xl font-black text-[#CCFF33]">
                      {rule.cookedYield}
                    </p>
                  </div>

                  <p className="text-[12px] font-bold leading-6 text-slate-300">
                    {rule.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Step 5 — Generated Station Tasks
          </p>

          <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
            One product becomes controlled worker tasks.
          </h2>

          <div className="mt-6 grid gap-3">
            {visibleTasks.map((task) => (
              <article
                key={task.step}
                className="rounded-[26px] border border-white/10 bg-black/20 p-5"
              >
                <div className="grid gap-4 lg:grid-cols-[80px_170px_1fr_210px] lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[18px] font-black text-[#CCFF33]">
                    {task.step}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Station
                    </p>
                    <p className="mt-2 text-[18px] font-black text-white">
                      {task.station}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[22px] font-black leading-none tracking-[-0.04em] text-white">
                      {task.task}
                    </h3>
                    <p className="mt-3 text-[13px] font-bold leading-6 text-slate-300">
                      {task.expectedOutput}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Worker
                    </p>
                    <p className="mt-2 text-sm font-black text-white">
                      {task.worker}
                    </p>

                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Approval
                    </p>
                    <p className="mt-2 text-sm font-bold leading-5 text-[#CCFF33]">
                      {task.approval}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Intake Result
              </p>

              <h2 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                The client’s first product is ready for runtime simulation.
              </h2>

              <p className="mt-4 max-w-4xl text-[14px] leading-7 text-slate-200">
                This page proves the promise after the demo: G7 can take a real
                product, structure it into G7 Matrix, calculate purchasing and
                yield, generate station tasks, assign workers, and prepare the
                first controlled pilot flow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/production-tasks"
                className="rounded-full border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-3 text-center text-sm font-black text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]"
              >
                View Production Tasks
              </Link>

              <Link
                href="/worker-task"
                className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-black text-white transition hover:border-white"
              >
                View Worker Task
              </Link>

              <Link
                href="/kitchen"
                className="rounded-full border border-cyan-300/30 px-6 py-3 text-center text-sm font-black text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
              >
                Runtime Preview
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}