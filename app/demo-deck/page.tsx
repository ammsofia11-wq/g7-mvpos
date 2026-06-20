import Image from "next/image";
import Link from "next/link";

const categorySlides = [
  {
    no: "01",
    kicker: "Category Launch",
    title: "The Missing Operating System for Central Kitchen Production.",
    accent: "G7 is a Chef-Based Kitchen OS.",
    body: "Culinary Intelligence for Central Kitchen Production. Built from real kitchen operations to turn chef logic into controlled execution.",
    visual: "category",
  },
  {
    no: "02",
    kicker: "Market Gap",
    title: "Sales are controlled. Kitchen production is still exposed.",
    accent: "POS controls orders. ERP tracks resources. G7 controls production.",
    body: "Most kitchens have systems around the operation, but the production floor itself still depends on memory, paper, messages, and daily firefighting.",
    visual: "gap",
  },
  {
    no: "03",
    kicker: "What G7 Is",
    title: "A Chef-Based Kitchen OS.",
    accent: "Not a recipe app. Not a dashboard. Not just software.",
    body: "G7 carries chef-approved operating logic into purchasing, recipes, SOPs, worker execution, QA, cold chain, runtime control, and pilot scaling.",
    visual: "core",
  },
  {
    no: "04",
    kicker: "Chef Logic Layer",
    title: "The chef defines the operating logic.",
    accent: "Concept, standards, ingredients, recipes, QA, and execution rules.",
    body: "G7 starts where real kitchen control starts: with the chef’s approved logic, not with disconnected tasks or isolated screens.",
    visual: "chef",
  },
  {
    no: "05",
    kicker: "Purchasing Control Layer",
    title: "Purchasing works inside chef-approved options.",
    accent: "Option A. Option B. Option C.",
    body: "Purchasing can move fast, compare suppliers, and protect availability without breaking the chef’s quality standards.",
    visual: "purchasing",
  },
  {
    no: "06",
    kicker: "Recipe-to-SOP Layer",
    title: "Recipe testing becomes approved SOP.",
    accent: "Test. Feedback. Version. Approve. Standardize.",
    body: "Each recipe becomes a structured operating standard with yield, method, cooling rules, QA checks, photos, videos, and worker-ready instructions.",
    visual: "sop",
  },
  {
    no: "07",
    kicker: "Production Execution Layer",
    title: "Demand becomes station-level execution.",
    accent: "Right task. Right step. Right proof.",
    body: "G7 converts approved demand into production tasks, station workload, timing, handoff proof, worker screens, and execution control.",
    visual: "execution",
  },
  {
    no: "08",
    kicker: "Quality Layer",
    title: "QA and cold chain stay visible.",
    accent: "Every critical movement is traceable.",
    body: "From supplier vehicle to receiving, storage, production, cooling, packaging, dispatch, and delivery handoff — every critical point has responsibility.",
    visual: "quality",
  },
  {
    no: "09",
    kicker: "Intelligence Layer",
    title: "See the kitchen before problems grow.",
    accent: "Runtime visibility. Pressure detection. Release readiness.",
    body: "G7 helps management see active work, delays, blocked batches, QA holds, output gaps, station pressure, and support movement while production is running.",
    visual: "runtime",
  },
  {
    no: "10",
    kicker: "Pilot Path",
    title: "Start focused. Prove value. Scale with confidence.",
    accent: "One pilot flow can prove the operating model.",
    body: "Choose one kitchen scope, prepare the first data pack, approve the chef logic, run controlled production, review results, and scale step by step.",
    visual: "pilot",
  },
];

const coreOrbit = [
  "Chef Logic",
  "Ingredients",
  "Supplier Options",
  "Approved Recipe",
  "SOP",
  "Worker Task",
  "QA",
  "Runtime",
];

const visualFlows: Record<string, string[]> = {
  category: [
    "Missing Layer",
    "Chef-Based OS",
    "Culinary Intelligence",
    "Controlled Execution",
  ],
  gap: ["POS", "ERP", "Kitchen Production Gap", "G7"],
  chef: ["Concept", "Ingredient Standards", "Recipe Logic", "QA Rules"],
  purchasing: ["Ingredient List", "Option A", "Option B", "Option C"],
  sop: ["Recipe Draft", "Test", "Feedback", "Version", "Approval", "SOP"],
  execution: ["Locked Demand", "Station Tasks", "Worker Screen", "Proof"],
  quality: ["Supplier", "Receiving", "Storage", "Cooling", "Dispatch"],
  runtime: ["Active", "Delayed", "Blocked", "QA Hold", "Release"],
  pilot: ["Pilot Scope", "Data Pack", "Chef Approval", "Production Flow", "Review"],
};

const nextPathCards = [
  {
    title: "Equipment Intelligence",
    href: "/equipment-intelligence",
    label: "Open Equipment Layer",
    body: "Show how G7 can sit above smart ovens, blast chillers, sensors, packaging lines, scales, and fleet cold-chain signals.",
  },
  {
    title: "Demo Close",
    href: "/demo-close",
    label: "Close The Sales Story",
    body: "Move from category explanation into pilot path, protected data rules, client value, and the next decision.",
  },
  {
    title: "Demo Journey",
    href: "/demo-sale",
    label: "Back To Demo Flow",
    body: "Return to the full sellable journey from demand lock to production tasks, worker execution, runtime, QA, and close.",
  },
];

function LogoLockup() {
  return (
    <header className="flex items-center gap-5">
      <Image
        src="/images/g7-logo-clean.png"
        alt="G7 Kitchen OS"
        width={150}
        height={80}
        className="h-14 w-auto object-contain"
        priority
      />
      <div className="h-11 w-px bg-[#C8753C]/75" />
      <p className="text-[11px] font-black uppercase tracking-[0.55em] text-[#C8753C]">
        G7 Kitchen OS
      </p>
    </header>
  );
}

function Signature() {
  return (
    <p
      className="text-[42px] leading-none text-[#C8753C] opacity-95 xl:text-[48px]"
      style={{
        fontFamily:
          '"Brush Script MT","Segoe Script","Lucida Handwriting",cursive',
        transform: "rotate(-7deg)",
        letterSpacing: "0.02em",
      }}
    >
      G7Chef
    </p>
  );
}

function CoreVisual() {
  return (
    <section className="relative mx-auto aspect-square w-full max-w-[520px] xl:max-w-[560px]">
      <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
      <div className="absolute inset-[8%] rounded-full border border-cyan-300/10" />
      <div className="absolute inset-[16%] rounded-full border border-cyan-300/15" />
      <div className="absolute inset-[25%] rounded-full border border-cyan-300/25 shadow-[0_0_70px_rgba(0,210,255,0.22)]" />

      <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-300/40 bg-[#041827]/90 shadow-[0_0_80px_rgba(0,210,255,0.32)]">
        <Image
          src="/images/g7-logo-clean.png"
          alt="G7"
          width={120}
          height={70}
          className="h-16 w-auto object-contain"
          priority
        />
        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.32em] text-white/80">
          Kitchen OS
        </p>
      </div>

      {coreOrbit.map((label, index) => {
        const angle = (index / coreOrbit.length) * 360 - 90;
        const radius = 40;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-full border border-cyan-300/40 bg-[#041827]/90 text-sm font-black text-cyan-200 shadow-[0_0_34px_rgba(0,210,255,0.2)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="w-28 text-[11px] font-bold leading-tight text-slate-100">
              {label}
            </p>
          </div>
        );
      })}
    </section>
  );
}

function FlowVisual({ type }: { type: string }) {
  const items = visualFlows[type] ?? visualFlows.category;

  return (
    <section className="relative mx-auto w-full max-w-[660px]">
      <div className="absolute -inset-8 rounded-[44px] border border-cyan-300/10 bg-cyan-300/[0.03] shadow-[0_0_80px_rgba(0,210,255,0.08)]" />

      <div className="relative grid gap-4">
        {items.map((item, index) => (
          <div
            key={item}
            className="grid grid-cols-[66px_1fr] items-center gap-4"
          >
            <div className="flex h-15 w-15 items-center justify-center rounded-2xl border border-cyan-300/35 bg-[#041827]/90 text-base font-black text-cyan-200 shadow-[0_0_30px_rgba(0,210,255,0.12)]">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-[#061C2D]/80 px-5 py-4">
              <p className="text-lg font-black text-white">{item}</p>
              <div className="mt-2 h-px bg-gradient-to-r from-[#C8753C]/80 via-cyan-300/30 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketGapVisual() {
  return (
    <section className="relative mx-auto w-full max-w-[700px]">
      <div className="grid gap-5">
        <div className="rounded-[32px] border border-cyan-300/20 bg-cyan-300/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-cyan-200">
            Existing Systems
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-3xl font-black text-white">POS</p>
              <p className="mt-2 text-sm text-slate-300">
                Controls sales, orders, and payments.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-3xl font-black text-white">ERP</p>
              <p className="mt-2 text-sm text-slate-300">
                Tracks resources, stock, and accounting.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#C8753C]/35 bg-[#C8753C]/10 p-6 shadow-[0_0_55px_rgba(200,117,60,0.12)]">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#F0B27A]">
            Missing Layer
          </p>
          <p className="mt-4 text-4xl font-black leading-tight text-white">
            Kitchen Production OS
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            The layer that controls what happens after demand exists.
          </p>
        </div>
      </div>
    </section>
  );
}

function SlideVisual({ type }: { type: string }) {
  if (type === "core") return <CoreVisual />;
  if (type === "gap") return <MarketGapVisual />;
  return <FlowVisual type={type} />;
}

function NextPathVisual() {
  return (
    <section className="relative mx-auto w-full max-w-[700px]">
      <div className="absolute -inset-8 rounded-[44px] border border-cyan-300/10 bg-cyan-300/[0.03] shadow-[0_0_80px_rgba(0,210,255,0.08)]" />

      <div className="relative grid gap-4">
        {nextPathCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-[28px] border border-cyan-300/20 bg-[#061C2D]/80 p-5 transition hover:border-[#C8753C]/60 hover:bg-[#08263A]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/35 bg-[#041827]/90 text-base font-black text-cyan-200 shadow-[0_0_30px_rgba(0,210,255,0.12)]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#C8753C]">
                  {card.label}
                </p>

                <h3 className="mt-2 text-2xl font-black leading-tight text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {card.body}
                </p>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 transition group-hover:text-[#F0B27A]">
                  Continue -&gt;
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function DemoDeckPage() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[#041827] text-white">
      {categorySlides.map((slide) => (
        <section
          key={slide.no}
          className="relative min-h-screen snap-start snap-always overflow-hidden px-10 py-7"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(0,210,255,0.24),transparent_34%),radial-gradient(circle_at_16%_88%,rgba(200,117,60,0.13),transparent_25%),linear-gradient(135deg,#041827_0%,#073044_48%,#03111F_100%)]" />

          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,214,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,214,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-56px)] max-w-[1360px] grid-rows-[auto_1fr_auto] gap-7">
            <div className="flex items-center justify-between gap-6">
              <LogoLockup />
              <div className="rounded-full border border-cyan-300/25 bg-cyan-300/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-100">
                Slide {slide.no} of 10
              </div>
            </div>

            <div className="grid min-h-0 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <section className="min-w-0">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.42em] text-cyan-300">
                  {slide.kicker}
                </p>

                <h1 className="max-w-[700px] text-[48px] font-black leading-[0.92] tracking-[-0.06em] xl:text-[60px]">
                  {slide.title}
                </h1>

                <div className="mt-5 h-px max-w-[520px] bg-gradient-to-r from-cyan-300/85 via-cyan-300/20 to-transparent" />

                <p className="mt-5 max-w-[620px] text-[22px] font-bold leading-tight text-[#C8753C] xl:text-[24px]">
                  {slide.accent}
                </p>

                <div className="mt-6 border-l-2 border-cyan-300/75 pl-5">
                  <p className="max-w-[620px] text-[18px] leading-7 text-slate-50 xl:text-[20px]">
                    {slide.body}
                  </p>
                </div>
              </section>

              <SlideVisual type={slide.visual} />
            </div>

            <footer className="flex items-center justify-between gap-6">
              <Signature />

              <div className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-5 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-slate-300">
                Built from{" "}
                <span className="text-[#C8753C]">
                  real kitchen operations.
                </span>
              </div>
            </footer>
          </div>
        </section>
      ))}

      <section className="relative min-h-screen snap-start snap-always overflow-hidden px-10 py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,210,255,0.22),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(200,117,60,0.18),transparent_28%),linear-gradient(135deg,#041827_0%,#073044_46%,#03111F_100%)]" />

        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,214,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,214,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-56px)] max-w-[1360px] grid-rows-[auto_1fr_auto] gap-7">
          <div className="flex items-center justify-between gap-6">
            <LogoLockup />
            <div className="rounded-full border border-[#C8753C]/35 bg-[#C8753C]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#F0B27A]">
              Final Path
            </div>
          </div>

          <div className="grid min-h-0 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="min-w-0">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.42em] text-cyan-300">
                Next Step
              </p>

              <h1 className="max-w-[720px] text-[48px] font-black leading-[0.92] tracking-[-0.06em] xl:text-[60px]">
                Move from category story to system proof.
              </h1>

              <div className="mt-5 h-px max-w-[520px] bg-gradient-to-r from-cyan-300/85 via-cyan-300/20 to-transparent" />

              <p className="mt-5 max-w-[620px] text-[22px] font-bold leading-tight text-[#C8753C] xl:text-[24px]">
                Equipment Intelligence. Demo Close. Pilot Decision.
              </p>

              <div className="mt-6 border-l-2 border-cyan-300/75 pl-5">
                <p className="max-w-[620px] text-[18px] leading-7 text-slate-50 xl:text-[20px]">
                  After the category launch story, continue into how G7 connects
                  central kitchen production with equipment intelligence, sales
                  close logic, and a focused pilot path.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/equipment-intelligence"
                  className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 hover:text-white"
                >
                  Open Equipment Intelligence
                </Link>

                <Link
                  href="/demo-close"
                  className="rounded-full border border-[#C8753C]/40 bg-[#C8753C]/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#F0B27A] transition hover:border-[#F0B27A] hover:bg-[#C8753C]/15 hover:text-[#FFE2A8]"
                >
                  Close Demo
                </Link>

                <Link
                  href="/demo-sale"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Back To Demo Journey
                </Link>
              </div>
            </section>

            <NextPathVisual />
          </div>

          <footer className="flex items-center justify-between gap-6">
            <Signature />

            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-5 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-slate-300">
              Category story{" "}
              <span className="text-[#C8753C]">
                connected to next action.
              </span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}