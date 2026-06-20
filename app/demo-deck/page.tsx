import Image from "next/image";

const flowNodes = [
  { id: "01", label: "Ingredients" },
  { id: "02", label: "Supplier Options" },
  { id: "03", label: "Approved Recipe" },
  { id: "04", label: "SOP" },
  { id: "05", label: "Worker Task" },
  { id: "06", label: "QA" },
  { id: "07", label: "Runtime" },
];

export default function DemoDeckPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#041827] text-white">
      <section className="relative h-screen overflow-hidden px-10 py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(0,210,255,0.24),transparent_34%),radial-gradient(circle_at_16%_88%,rgba(200,117,60,0.13),transparent_25%),linear-gradient(135deg,#041827_0%,#073044_48%,#03111F_100%)]" />

        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(0,214,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,214,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto grid h-full max-w-[1360px] grid-cols-[0.82fr_1.18fr] items-center gap-10">
          <section className="min-w-0">
            <header className="mb-7 flex items-center gap-5">
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

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.42em] text-cyan-300">
              Culinary Intelligence
            </p>

            <h1 className="max-w-[560px] text-[54px] font-black leading-[0.9] tracking-[-0.06em] xl:text-[64px]">
              <span className="block">G7 is a</span>
              <span className="block bg-gradient-to-r from-cyan-300 to-sky-500 bg-clip-text text-transparent">
                Chef-Based
              </span>
              <span className="block">Kitchen OS.</span>
            </h1>

            <div className="mt-5 h-px max-w-[500px] bg-gradient-to-r from-cyan-300/85 via-cyan-300/20 to-transparent" />

            <p className="mt-5 max-w-[540px] text-[22px] font-bold leading-tight text-[#C8753C] xl:text-[24px]">
              Culinary Intelligence for Central Kitchen Production.
            </p>

            <div className="mt-6 border-l-2 border-cyan-300/75 pl-5">
              <p className="max-w-[520px] text-[19px] leading-snug text-slate-50">
                From chef logic to controlled kitchen execution.
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between gap-6">
              <p
                className="text-[44px] leading-none text-[#C8753C] opacity-95 xl:text-[50px]"
                style={{
                  fontFamily:
                    '"Brush Script MT","Segoe Script","Lucida Handwriting",cursive',
                  transform: "rotate(-7deg)",
                  letterSpacing: "0.02em",
                }}
              >
                G7Chef
              </p>

              <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/5 px-5 py-2 text-[9px] font-black uppercase tracking-[0.32em] text-slate-300 xl:block">
                Built from{" "}
                <span className="text-[#C8753C]">
                  real kitchen operations.
                </span>
              </div>
            </div>
          </section>

          <section className="relative mx-auto aspect-square w-full max-w-[540px] xl:max-w-[570px]">
            <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
            <div className="absolute inset-[8%] rounded-full border border-cyan-300/10" />
            <div className="absolute inset-[16%] rounded-full border border-cyan-300/15" />
            <div className="absolute inset-[25%] rounded-full border border-cyan-300/25 shadow-[0_0_70px_rgba(0,210,255,0.24)]" />

            <div className="absolute left-1/2 top-1/2 flex h-38 w-38 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-300/40 bg-[#041827]/90 shadow-[0_0_80px_rgba(0,210,255,0.34)]">
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

            <div className="absolute left-1/2 top-[24%] -translate-x-1/2 rounded-full border border-[#C8753C]/50 bg-[#041827]/75 px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#F0B27A]">
              Chef Logic
            </div>

            <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 rounded-full border border-[#C8753C]/50 bg-[#041827]/75 px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#F0B27A]">
              Controlled Execution
            </div>

            {flowNodes.map((node, index) => {
              const angle = (index / flowNodes.length) * 360 - 90;
              const radius = 40;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={node.label}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-full border border-cyan-300/40 bg-[#041827]/90 text-base font-black text-cyan-200 shadow-[0_0_34px_rgba(0,210,255,0.22)]">
                    {node.id}
                  </div>

                  <p className="w-28 text-[12px] font-bold leading-tight text-slate-100">
                    {node.label}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}