import JoinPlans from "../components/g7/JoinPlans"

export default function JoinPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08111D] text-white">
      <div className="pointer-events-none fixed left-[-180px] top-[-160px] h-[420px] w-[420px] rounded-full bg-[#22D3EE]/20 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-160px] top-[220px] h-[420px] w-[420px] rounded-full bg-[#B7F532]/12 blur-[130px]" />
      <div className="pointer-events-none fixed bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-[#D8C56A]/10 blur-[130px]" />

      <section className="relative z-10 mx-auto max-w-[1320px] px-6 py-5">
        <header className="flex items-center justify-between rounded-[28px] border border-[#22D3EE]/25 bg-[#0B1A29]/85 px-6 py-4 shadow-[0_0_70px_rgba(34,211,238,0.13)] backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-[22px] bg-[#22D3EE] text-[34px] font-black text-black shadow-[0_0_42px_rgba(34,211,238,0.38)]">
              G7
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#22D3EE]">
                G7 Culinary Intelligence
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/65">
                Chef-Based Nutrition OS
              </p>
            </div>
          </div>

          <a
            href="#plans"
            className="rounded-[18px] bg-[#B7F532] px-5 py-3 text-[12px] font-black text-black shadow-[0_18px_50px_rgba(183,245,50,0.22)]"
          >
            اختار نظامك
          </a>
        </header>

        <section className="py-7 text-center">
          <h1 className="text-[38px] font-black leading-[1.05] text-white md:text-[54px]">
            اختار النظام
            <span className="block text-[#D8C56A] drop-shadow-[0_0_22px_rgba(216,197,106,0.20)]">
              اللي شبهك
            </span>
          </h1>

          <h2 className="mt-4 text-[19px] font-black text-white">
            Choose the system that feels like you.
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-[14px] leading-7 text-white/76">
            G7 نظام أكل ذكي مبني على الهوية، النكهات، المكونات الحقيقية،
            والتحضير الأسبوعي بدون ملل. اختار الخطة وافتح واتساب برسالة جاهزة.
          </p>

          <div className="mx-auto mt-5 grid max-w-4xl gap-3 sm:grid-cols-4">
            {["AI Chef", "Weekly OS", "Shopping List", "Real Food"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[16px] border border-[#22D3EE]/15 bg-white/[0.055] px-3 py-3 text-[12px] font-black text-white shadow-[0_0_30px_rgba(34,211,238,0.06)]"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </section>

        <JoinPlans />
      </section>
    </main>
  )
}