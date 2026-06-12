import {
  getMealVisualIdentityByTitle,
  MealVisualLanguage,
} from "@/app/ai/meal-visual-engine"

type MealVisualCardV2Props = {
  day?: string
  role?: string
  title?: string
  kcal?: number
  protein?: number
  carbs?: number
  fat?: number
  language?: MealVisualLanguage
  compact?: boolean
}

export default function MealVisualCardV2({
  day = "Day",
  role = "Meal",
  title = "G7 Meal",
  kcal,
  protein,
  carbs,
  fat,
  language = "en",
  compact = false,
}: MealVisualCardV2Props) {
  const visual = getMealVisualIdentityByTitle(title, language)

  const hasMacros =
    typeof kcal === "number" ||
    typeof protein === "number" ||
    typeof carbs === "number" ||
    typeof fat === "number"

  const labels = getVisualLabels(language)

  if (compact) {
    return (
      <section className="break-inside-avoid rounded-[22px] border border-[#E7F7FA]/70 bg-[#07121C] p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#35F2FF]">
              {day} · {role}
            </p>

            <h3 className="mt-1 text-lg font-black leading-tight text-white">
              {visual.visualTitle}
            </h3>

            <p className="mt-1 text-[11px] font-bold leading-5 text-white/85">
              {visual.pleasureLine}
            </p>
          </div>

          <div className="rounded-full border border-[#C7A64A] bg-[#FFF6D8] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#101820]">
            G7
          </div>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <InfoBox compact label={labels.protein} value={visual.proteinLabel} />
          <InfoBox compact label={labels.carb} value={visual.carbLabel} />
          <InfoBox compact label={labels.sauce} value={visual.sauceLabel} />
          <InfoBox compact label={labels.veg} value={visual.vegLabel} />
        </div>

        {hasMacros && (
          <div className="mb-3 grid grid-cols-4 gap-2">
            <MacroBox compact label="KCAL" value={kcal} />
            <MacroBox
              compact
              label={labels.proteinMacro}
              value={protein}
              suffix="g"
            />
            <MacroBox
              compact
              label={labels.carbsMacro}
              value={carbs}
              suffix="g"
            />
            <MacroBox
              compact
              label={labels.fatMacro}
              value={fat}
              suffix="g"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#FFF7E6] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#101820]">
              {labels.chefNote}
            </p>

            <p className="mt-1 text-[10px] font-bold leading-5 text-[#101820]">
              {visual.chefNote}
            </p>
          </div>

          <div className="rounded-2xl bg-[#E8FCFF] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#007B86]">
              {labels.prepNote}
            </p>

            <p className="mt-1 text-[10px] font-bold leading-5 text-[#101820]">
              {visual.prepNote}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="break-inside-avoid rounded-[28px] border border-[#DDE4E6] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#009EAD]">
            {day} · {role}
          </p>

          <h2 className="mt-2 text-2xl font-black leading-tight text-[#101820]">
            {visual.visualTitle}
          </h2>

          <p className="mt-2 max-w-[520px] text-sm font-bold leading-6 text-[#263238]">
            {visual.pleasureLine}
          </p>
        </div>

        <div className="rounded-full border border-[#C7A64A] bg-[#FFF6D8] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#101820]">
          G7
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <InfoBox label={labels.protein} value={visual.proteinLabel} />
        <InfoBox label={labels.carb} value={visual.carbLabel} />
        <InfoBox label={labels.sauce} value={visual.sauceLabel} />
        <InfoBox label={labels.veg} value={visual.vegLabel} />
      </div>

      {hasMacros && (
        <div className="mb-5 grid grid-cols-4 gap-3">
          <MacroBox label="KCAL" value={kcal} />
          <MacroBox label={labels.proteinMacro} value={protein} suffix="g" />
          <MacroBox label={labels.carbsMacro} value={carbs} suffix="g" />
          <MacroBox label={labels.fatMacro} value={fat} suffix="g" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#FFF7E6] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#101820]">
            {labels.chefNote}
          </p>

          <p className="mt-2 text-sm font-bold leading-6 text-[#101820]">
            {visual.chefNote}
          </p>
        </div>

        <div className="rounded-2xl bg-[#E8FCFF] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#007B86]">
            {labels.prepNote}
          </p>

          <p className="mt-2 text-sm font-bold leading-6 text-[#101820]">
            {visual.prepNote}
          </p>
        </div>
      </div>
    </section>
  )
}

function getVisualLabels(language: MealVisualLanguage) {
  if (language === "ar") {
    return {
      protein: "البروتين",
      carb: "الكارب",
      sauce: "الصوص",
      veg: "الخضار",
      proteinMacro: "بروتين",
      carbsMacro: "كارب",
      fatMacro: "دهون",
      chefNote: "ملاحظة الشيف",
      prepNote: "ملاحظة التحضير",
    }
  }

  if (language === "bg") {
    return {
      protein: "Протеин",
      carb: "Въглехидрат",
      sauce: "Сос",
      veg: "Зеленчуци",
      proteinMacro: "протеин",
      carbsMacro: "въглехидрати",
      fatMacro: "мазнини",
      chefNote: "Chef бележка",
      prepNote: "Prep бележка",
    }
  }

  return {
    protein: "Protein",
    carb: "Carb",
    sauce: "Sauce",
    veg: "Veg",
    proteinMacro: "protein",
    carbsMacro: "carbs",
    fatMacro: "fat",
    chefNote: "Chef Note",
    prepNote: "Prep Note",
  }
}

function InfoBox({
  label,
  value,
  compact = false,
}: {
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div className={`rounded-2xl bg-[#F3F7F8] ${compact ? "p-3" : "p-4"}`}>
      <p
        className={`${
          compact ? "text-[8px]" : "text-[10px]"
        } font-black uppercase tracking-[0.18em] text-[#007B86]`}
      >
        {label}
      </p>

      <p
        className={`${
          compact ? "text-[11px]" : "text-sm"
        } mt-1 font-black leading-5 text-[#101820]`}
      >
        {value}
      </p>
    </div>
  )
}

function MacroBox({
  label,
  value,
  suffix = "",
  compact = false,
}: {
  label: string
  value?: number
  suffix?: string
  compact?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border border-[#BFC9CC] bg-[#F8FBFC] text-center ${
        compact ? "p-2" : "p-3"
      }`}
    >
      <p
        className={`${
          compact ? "text-sm" : "text-lg"
        } font-black text-[#101820]`}
      >
        {typeof value === "number" ? `${value}${suffix}` : "—"}
      </p>

      <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#007B86]">
        {label}
      </p>
    </div>
  )
}