export default function JoinHero() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 text-center">
      <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-[30px] bg-[#22D3EE] text-[46px] font-black text-black shadow-[0_0_50px_rgba(34,211,238,0.35)]">
        G7
      </div>

      <p className="mt-7 text-[12px] font-black uppercase tracking-[0.28em] text-white/55">
        Chef-Based Nutrition OS
      </p>

      <h1 className="mt-5 text-[42px] font-black leading-[1.05] text-white sm:text-[64px]">
        اختر النظام
        <span className="block text-[#B7F532]">
          اللي شبهك
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-9 text-white/75">
        G7 مش مجرد دايت. ده نظام أكل ذكي مبني على الطبخ الحقيقي،
        النكهات، والتحضير الأسبوعي بدون ملل.
      </p>

      <div className="mt-8 flex justify-center">
        <a
          href="#plans"
          className="rounded-2xl border border-[#22D3EE]/45 bg-white/[0.03] px-8 py-4 text-[14px] font-black uppercase tracking-[0.18em] text-[#22D3EE] transition hover:bg-[#22D3EE]/10"
        >
          عرض الخطط ↓
        </a>
      </div>

      <p className="mt-5 text-[12px] text-white/45">
        اختار الخطة من الكروت تحت، وهيفتح واتساب برسالة فيها اسم النظام المختار.
      </p>
    </section>
  )
}