export default function PDFPreviewPage() {
  return (
    <main className="min-h-screen bg-[#050A12] px-6 py-10 text-white">
      <section className="mx-auto max-w-3xl rounded-[28px] border border-cyan-400/20 bg-[#08111D] p-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
          G7 PDF Preview
        </p>

        <h1 className="mt-4 text-4xl font-black">
          PDF Preview is currently handled from Admin Generate.
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/60">
          This temporary page is disabled to keep the production build stable.
        </p>
      </section>
    </main>
  )
}