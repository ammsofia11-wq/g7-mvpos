type SectionTitleProps = {
  title: string
  arabic?: string
}

export default function SectionTitle({
  title,
  arabic,
}: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[24px] font-black text-[#22D3EE]">
        {title}
      </h3>

      {arabic ? (
        <p className="text-[15px] font-bold text-white/80">
          {arabic}
        </p>
      ) : null}
    </div>
  )
}