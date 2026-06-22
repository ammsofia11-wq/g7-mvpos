"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categorySlides = [
  {
    no: "01",
    kicker: "Genius Kitchen by G7",
    title: "Chef-Based Kitchen Operating Intelligence.",
    accent: "Chef intelligence becomes controlled execution.",
    body: "Genius Kitchen by G7 turns demand, chef logic, yield chain, cooling, QA, packaging, fridge call-off, worker tasks, and dispatch into one controlled operating flow.",
    visual: "category",
  },
  {
    no: "02",
    kicker: "Demand to Dispatch",
    title: "Demand must become controlled kitchen execution.",
    accent: "From known demand to production flow, release readiness, and dispatch handoff.",
    body: "The value is not only seeing demand. The value is translating demand into build cards, module tasks, gates, worker execution, packaging rules, and delivery-ready control.",
    visual: "gap",
  },
  {
    no: "03",
    kicker: "What Genius Kitchen Is",
    title: "A chef-based operating layer for central kitchen production.",
    accent: "Not a recipe list. Not a generic dashboard. Not a full SaaS rollout at pilot stage.",
    body: "The Founding Pilot starts focused: selected products are converted into chef-approved logic, production structure, gates, tasks, and handoffs that can be reviewed and delivered.",
    visual: "core",
  },
  {
    no: "04",
    kicker: "Chef Logic Layer",
    title: "The chef defines the operating intelligence.",
    accent: "Standards, build logic, modules, yield, QA, and release rules.",
    body: "Genius Kitchen starts where real production control starts: chef logic. That logic becomes a visible operating system for product builds, G7 Culinary Modules, and station execution.",
    visual: "chef",
  },
  {
    no: "05",
    kicker: "Product Build Layer",
    title: "Every product becomes a controlled build.",
    accent: "Product Build → G7 Culinary Modules → Module Tasks → Worker Execution → QA Release.",
    body: "The pilot organizes each selected product into structure: protein module, carb module, sauce module, garnish module, packaging module, task flow, and release gates.",
    visual: "build",
  },
  {
    no: "06",
    kicker: "Yield Chain Layer",
    title: "Yield control protects execution before waste grows.",
    accent: "Raw prep. Cooked yield. Cooling. Portioning. Packaging. Dispatch.",
    body: "Genius Kitchen makes the yield chain visible so production can understand where output changes, where control is needed, and where product consistency must be protected.",
    visual: "yield",
  },
  {
    no: "07",
    kicker: "Cooling & QA Layer",
    title: "Cooling and QA become controlled gates.",
    accent: "Cooling Gate. QA Gates. Release decision. Handoff proof.",
    body: "Critical movement should not be invisible. The pilot makes cooling requirements, QA checkpoints, packaging accuracy, and release readiness part of the operating flow.",
    visual: "quality",
  },
  {
    no: "08",
    kicker: "Worker Task Layer",
    title: "Chef logic becomes worker-ready execution.",
    accent: "Right task. Right station. Right step. Right handoff.",
    body: "Genius Kitchen converts approved product logic into simple worker task flow so production teams can execute with clarity instead of scattered instructions.",
    visual: "execution",
  },
  {
    no: "09",
    kicker: "Control Layer",
    title: "Consistency, waste control, and readiness stay visible.",
    accent: "Station pressure. QA hold. Output gap. Release readiness.",
    body: "Management needs visibility while production is running. Genius Kitchen helps show what is active, delayed, blocked, waiting for QA, ready for packaging, or ready for dispatch.",
    visual: "runtime",
  },
  {
    no: "10",
    kicker: "Founding Pilot",
    title: "Start with 4–5 products and prove the operating model.",
    accent: "Focused scope. Clear delivery. Controlled pilot workspace.",
    body: "The Founding Pilot converts a small selected product set into Genius Kitchen operating intelligence, ready for onboarding, intake, activation, production preview, and client review.",
    visual: "pilot",
  },
];

const coreOrbit = [
  "Chef Logic",
  "Product Build",
  "G7 Culinary Modules",
  "Yield Chain",
  "Cooling Gate",
  "QA Gates",
  "Worker Tasks",
  "Dispatch",
];

const visualFlows: Record<string, string[]> = {
  category: [
    "Known Demand",
    "Chef Logic",
    "Controlled Execution",
    "Dispatch Readiness",
  ],
  gap: [
    "Demand Signal",
    "Product Build",
    "Kitchen Execution",
    "Genius Kitchen Control",
  ],
  chef: [
    "Chef Standard",
    "Build Logic",
    "Yield Rule",
    "QA Rule",
    "Release Rule",
  ],
  build: [
    "Product Build",
    "Protein Module",
    "Carb Module",
    "Sauce Module",
    "Packaging Module",
    "Module Tasks",
  ],
  yield: [
    "Raw Prep",
    "Cooked Yield",
    "Cooling",
    "Portioning",
    "Packaging",
    "Dispatch",
  ],
  execution: [
    "Approved Build",
    "Station Tasks",
    "Worker Screen",
    "Handoff Proof",
  ],
  quality: [
    "Cooling Gate",
    "QA Check",
    "Packaging Check",
    "Release Decision",
    "Dispatch Handoff",
  ],
  runtime: [
    "Active Work",
    "Delayed Task",
    "QA Hold",
    "Output Gap",
    "Release Ready",
  ],
  pilot: [
    "4–5 Products",
    "Pilot Intake",
    "Client Activation",
    "Production Preview",
    "Delivery Review",
  ],
};

const nextPathCards = [
  {
    title: "Genius Kitchen Workspace",
    href: "/genius-kitchen",
    label: "Open Pilot Workspace",
    body: "Review the Founding Pilot workspace and how selected products become controlled operating intelligence.",
  },
  {
    title: "Demo Close",
    href: "/demo-close",
    label: "Move To Pilot Decision",
    body: "Move from the deck into the Genius Kitchen Founding Pilot close path and commercial decision.",
  },
  {
    title: "Pilot Onboarding",
    href: "/pilot-onboarding",
    label: "Start Onboarding",
    body: "Begin the client setup flow for selected products, chef logic, intake, activation, and delivery review.",
  },
];

function LogoLockup() {
  return (
    <header className="flex items-center gap-5">
      <Image
        src="/images/g7-logo-clean.png"
        alt="G7 logo"
        width={150}
        height={80}
        className="h-14 w-auto object-contain"
        priority
      />
      <div className="h-11 w-px bg-[#C8753C]/75" />
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.42em] text-[#C8753C]">
          Genius Kitchen by G7
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-100/80">
          Culinary Intelligence
        </p>
      </div>
    </header>
  );
}

function Signature() {
  return (
    <div className="relative -ml-1 -mt-5 h-12 w-40 xl:h-14 xl:w-52">
      <Image
        src="/images/g7chef-signature-04.png"
        alt="G7Chef signature"
        fill
        sizes="208px"
        className="object-contain object-left drop-shadow-[0_0_12px_rgba(200,117,60,0.16)]"
        priority
      />
    </div>
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
        <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.24em] text-white/80">
          Genius Kitchen
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
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-[#041827]/90 text-sm font-black text-cyan-200 shadow-[0_0_34px_rgba(0,210,255,0.2)]">
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/35 bg-[#041827]/90 text-base font-black text-cyan-200 shadow-[0_0_30px_rgba(0,210,255,0.12)]">
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

function DemandVisual() {
  return (
    <section className="relative mx-auto w-full max-w-[700px]">
      <div className="grid gap-5">
        <div className="rounded-[32px] border border-cyan-300/20 bg-cyan-300/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-cyan-200">
            Before Control
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-2xl font-black text-white">Demand</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The kitchen knows what must be produced.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-2xl font-black text-white">Execution</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The floor needs clear tasks, gates, and handoffs.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#C8753C]/35 bg-[#C8753C]/10 p-6 shadow-[0_0_55px_rgba(200,117,60,0.12)]">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#F0B27A]">
            Genius Kitchen Layer
          </p>
          <p className="mt-4 text-4xl font-black leading-tight text-white">
            Chef-Based Operating Intelligence
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            The layer that turns known demand into controlled production,
            release readiness, and dispatch handoff.
          </p>
        </div>
      </div>
    </section>
  );
}

function SlideVisual({ type }: { type: string }) {
  if (type === "core") return <CoreVisual />;
  if (type === "gap") return <DemandVisual />;
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
  const deckRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getSlides = () =>
      Array.from(
        deckRef.current?.querySelectorAll<HTMLElement>("[data-deck-slide]") ??
          [],
      );

    const getCurrentSlideIndex = () => {
      const container = deckRef.current;
      const slides = getSlides();

      if (!container || slides.length === 0) {
        return 0;
      }

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetTop - container.scrollTop);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const goToSlide = (index: number) => {
      const slides = getSlides();

      if (slides.length === 0) {
        return;
      }

      const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
      slides[safeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const targetTag = target?.tagName;

      if (
        target?.isContentEditable ||
        targetTag === "INPUT" ||
        targetTag === "TEXTAREA" ||
        targetTag === "SELECT"
      ) {
        return;
      }

      const currentIndex = getCurrentSlideIndex();
      const totalSlides = getSlides().length;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main
      ref={deckRef}
      className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[#041827] text-white"
    >
      {categorySlides.map((slide) => (
        <section
          key={slide.no}
          data-deck-slide={slide.no}
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
                Chef intelligence{" "}
                <span className="text-[#C8753C]">
                  becomes controlled execution.
                </span>
              </div>
            </footer>
          </div>
        </section>
      ))}

      <section
        data-deck-slide="final"
        className="relative min-h-screen snap-start snap-always overflow-hidden px-10 py-7"
      >
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
                Move from deck to Genius Kitchen pilot workspace.
              </h1>

              <div className="mt-5 h-px max-w-[520px] bg-gradient-to-r from-cyan-300/85 via-cyan-300/20 to-transparent" />

              <p className="mt-5 max-w-[620px] text-[22px] font-bold leading-tight text-[#C8753C] xl:text-[24px]">
                Workspace preview. Demo close. Pilot onboarding.
              </p>

              <div className="mt-6 border-l-2 border-cyan-300/75 pl-5">
                <p className="max-w-[620px] text-[18px] leading-7 text-slate-50 xl:text-[20px]">
                  After the deck, continue into the Founding Pilot path: open
                  the Genius Kitchen workspace, close the demo decision, and
                  move into onboarding, intake, activation, and execution
                  preview.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/genius-kitchen"
                  className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 hover:text-white"
                >
                  Open Pilot Workspace
                </Link>

                <Link
                  href="/demo-close"
                  className="rounded-full border border-[#C8753C]/40 bg-[#C8753C]/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#F0B27A] transition hover:border-[#F0B27A] hover:bg-[#C8753C]/15 hover:text-[#FFE2A8]"
                >
                  Close Demo
                </Link>

                <Link
                  href="/pilot-onboarding"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Start Pilot Onboarding
                </Link>
              </div>
            </section>

            <NextPathVisual />
          </div>

          <footer className="flex items-center justify-between gap-6">
            <Signature />

            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-5 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-slate-300">
              Genius Kitchen{" "}
              <span className="text-[#C8753C]">
                connected to the pilot path.
              </span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}