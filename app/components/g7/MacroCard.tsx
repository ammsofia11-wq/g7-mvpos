type MacroCardProps = {
  label: string
  value: string | number
}

export default function MacroCard({
  label,
  value,
}: MacroCardProps) {
  return (
    <div className="rounded-[18px] border border-[#CCFF33]/40 bg-[#07111F] px-4 py-3 text-center shadow-[0_0_18px_rgba(34,211,238,0.08)]">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE]">
        {label}
      </p>

      <p className="mt-2 text-[28px] font-black text-[#CCFF33]">
        {value}
      </p>
    </div>
  )
}