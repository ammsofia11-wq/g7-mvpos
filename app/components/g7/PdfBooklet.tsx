import {
  formatNormalizedAmount,
  normalizeIngredient,
  NormalizedIngredientCategory,
} from "./ingredient-normalizer"
import { getMealIntelligenceNote } from "./meal-intelligence-notes"
import { getMealsForPlan, getMealsGroupedByDay, Meal } from "./meals"
import { PlanKey } from "./plans"
import { getPlanBranding } from "./plan-branding"

type PdfBookletProps = {
  selectedPlan: PlanKey
  clientName: string
}

type GrocerySummaryItem = {
  name: string
  category: NormalizedIngredientCategory
  amount: string
  grams: number
  eggs: number
  cans: number
  scoops: number
}

const MARKET_PRICE_EGP: Record<string, number> = {
  "Chicken Breast": 260,
  "Lean Minced Beef": 420,
  "Tuna in Water": 55,
  "Fish Fillet": 260,
  "Basmati Rice": 95,
  "Whole Wheat Penne": 70,
  Pasta: 70,
  Oats: 85,
  Potato: 25,
  "Sweet Potato": 35,
  "Whole Eggs": 8,
  "Whole Wheat Bread": 55,
  "Baladi Bread": 5,
  "Whole Wheat Tortilla": 90,
  "Brown Burger Bun": 15,
}

function buildWeeklyGroceryList(meals: Meal[]): GrocerySummaryItem[] {
  const map = new Map<
    string,
    {
      name: string
      category: NormalizedIngredientCategory
      grams: number
      eggs: number
      cans: number
      scoops: number
      units: Record<string, number>
      texts: string[]
    }
  >()

  meals.forEach((meal) => {
    meal.raw.forEach(([name, amount]) => {
      const normalized = normalizeIngredient(name, amount)
      const key = normalized.canonicalName

      const current =
        map.get(key) ?? {
          name: normalized.canonicalName,
          category: normalized.category,
          grams: 0,
          eggs: 0,
          cans: 0,
          scoops: 0,
          units: {},
          texts: [],
        }

      if (normalized.amount.type === "grams") current.grams += normalized.amount.value
      if (normalized.amount.type === "eggs") current.eggs += normalized.amount.value
      if (normalized.amount.type === "cans") current.cans += normalized.amount.value
      if (normalized.amount.type === "scoops") current.scoops += normalized.amount.value

      if (normalized.amount.type === "unit") {
        current.units[normalized.amount.unit] =
          (current.units[normalized.amount.unit] ?? 0) + normalized.amount.value
      }

      if (normalized.amount.type === "text") current.texts.push(normalized.amount.value)

      map.set(key, current)
    })
  })

  return Array.from(map.values()).map((item) => ({
    name: item.name,
    category: item.category,
    grams: item.grams,
    eggs: item.eggs,
    cans: item.cans,
    scoops: item.scoops,
    amount: formatNormalizedAmount({
      grams: item.grams,
      eggs: item.eggs,
      cans: item.cans,
      scoops: item.scoops,
      units: item.units,
      texts: item.texts,
    }),
  }))
}

function groupWeeklyGroceryList(items: GrocerySummaryItem[]) {
  return {
    PROTEINS: items.filter((item) => item.category === "PROTEINS"),
    CARBS: items.filter((item) => item.category === "CARBS"),
    SAUCES: items.filter((item) => item.category === "SAUCES"),
    VEGETABLES: items.filter((item) => item.category === "VEGETABLES"),
    EXTRAS: items.filter((item) => item.category === "EXTRAS"),
  }
}

function estimateItemCost(item: GrocerySummaryItem) {
  const price = MARKET_PRICE_EGP[item.name]

  if (!price) return 0
  if (item.grams > 0) return Math.round((item.grams / 1000) * price)
  if (item.eggs > 0) return Math.round(item.eggs * price)
  if (item.cans > 0) return Math.round(item.cans * price)

  return 0
}

function getMealRoleMeta(role: Meal["role"]) {
  if (role === "BREAKFAST") {
    return {
      label: "ENERGY",
      icon: "☀️",
      note: "فطار للطاقة وبداية اليوم.",
    }
  }

  if (role === "LUNCH") {
    return {
      label: "ACTIVE",
      icon: "⚡",
      note: "غداء للطاقة والأداء خلال اليوم.",
    }
  }

  return {
    label: "RECOVERY",
    icon: "🌙",
    note: "عشاء للريكافري والشبع قبل النوم.",
  }
}

function getDayArabicNote(day: string) {
  const notes: Record<string, string> = {
    "Day 1": "بداية سهلة ومألوفة للالتزام.",
    "Day 2": "يوم مريح بطابع باستا محسوب.",
    "Day 3": "يوم street-food fit بدون خروج عن النظام.",
    "Day 4": "يوم متوازن بين وجبة خفيفة وغداء أكتيف.",
    "Day 5": "يوم cravings-control بذكاء.",
    "Day 6": "يوم فاهيتا وكاساديا بطابع مختلف.",
    "Day 7": "نهاية أسبوع أخف مع تونة وسمك.",
  }

  return notes[day] ?? "يوم متوازن داخل نظام G7."
}

function getPrepWindow(day: string) {
  if (["Day 1", "Day 2", "Day 3"].includes(day)) {
    return "Prep Batch 1 · اطبخهم مرة واحدة لأول 3 أيام"
  }

  if (["Day 4", "Day 5", "Day 6"].includes(day)) {
    return "Prep Batch 2 · اطبخ الأيام 4–6 مرة واحدة"
  }

  return "Fresh / Light Day · يوم أخف في نهاية الأسبوع"
}

export default function PdfBooklet({
  selectedPlan,
  clientName,
}: PdfBookletProps) {
  const branding = getPlanBranding(selectedPlan)
  const meals = getMealsForPlan(selectedPlan)
  const groupedMeals = getMealsGroupedByDay(selectedPlan)
  const groceryItems = buildWeeklyGroceryList(meals)
  const groceryGroups = groupWeeklyGroceryList(groceryItems)

  const estimatedTotal = groceryItems.reduce(
    (total, item) => total + estimateItemCost(item),
    0
  )

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-[26px] border border-[#22D3EE]/20 bg-[#020817] p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] print:max-w-none print:border-0 print:shadow-none">
      <section>
        <div className="flex items-start justify-between gap-5">
          <div>
            <img
              src="/images/g7-logo-clean.png"
              alt="G7"
              className="h-[72px] w-auto object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            />

            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
              Personalized Client Nutrition PDF
            </p>

            <h1 className="mt-2 text-[34px] font-black leading-[0.95] text-white">
              {branding.publicName}
              <span className="block text-[#B7F532]">Client System</span>
            </h1>

            <p className="mt-1 text-[14px] font-black text-[#D8C56A]">
              {branding.publicArabicName}
            </p>

            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              Internal Engine: {branding.internalName}
            </p>

            <p className="mt-2 text-[16px] text-[#22D3EE]">{clientName}</p>
          </div>

          <div className="rounded-[18px] border border-[#B7F532]/25 bg-black/25 px-4 py-3 text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
              Price
            </p>

            <p className="mt-1 text-[22px] font-black text-[#B7F532]">
              {branding.price}
            </p>

            <p className="mt-2 rounded-full border border-[#22D3EE]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
              {branding.badge}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {[
            ["KCAL", branding.kcalLabel],
            ["PROTEIN", branding.proteinLabel],
            ["CARBS", branding.carbsLabel],
            ["FAT", branding.fatLabel],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[16px] border border-[#B7F532]/35 bg-black/20 p-3 text-center"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
                {label}
              </p>

              <p className="mt-1 text-[22px] font-black text-[#B7F532]">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[20px] border border-[#22D3EE]/20 bg-[#06111E] p-4">
          <h2 className="text-[20px] font-black text-[#22D3EE]">
            System Overview
          </h2>

          <p className="mt-2 text-[14px] leading-7 text-white/75">
            {branding.description}
          </p>

          <p className="mt-2 text-[13px] font-bold text-[#B7F532]">
            {branding.shortLabel}
          </p>

          <p className="mt-2 text-[12px] leading-6 text-white/45">
            Flavor Profile: Middle Eastern Performance · Chef-Based Nutrition OS
          </p>
        </div>

        <div className="mt-4 rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-4">
          <h2 className="text-[20px] font-black text-white">
            طريقة التحضير الأسبوعية
          </h2>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              ["Batch 1", "Day 1–3", "اطبخ أول 3 أيام مرة واحدة"],
              ["Batch 2", "Day 4–6", "اطبخ الأيام 4–6 مرة واحدة"],
              ["Day 7", "Light Day", "تونة / سمك / تحضير أخف"],
            ].map(([title, days, note]) => (
              <div
                key={title}
                className="rounded-[16px] border border-white/10 bg-black/20 p-3"
              >
                <p className="text-[11px] font-black text-[#22D3EE]">
                  {title}
                </p>

                <p className="mt-1 text-[16px] font-black text-[#B7F532]">
                  {days}
                </p>

                <p className="mt-2 text-[11px] leading-5 text-white/60">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {Object.entries(groupedMeals).map(([day, dayMeals]) => (
        <section
          key={day}
          className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-4"
          style={{
            pageBreakBefore: "always",
            pageBreakInside: "avoid",
            breakInside: "avoid",
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">
                {branding.publicName} Weekly Menu
              </p>

              <h2 className="mt-1 text-[28px] font-black text-white">{day}</h2>

              <p className="mt-1 text-[12px] leading-6 text-white/55">
                {getDayArabicNote(day)}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#B7F532]/20 bg-black/25 px-4 py-3 text-right">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
                Prep Window
              </p>

              <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-white/65">
                {getPrepWindow(day)}
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {dayMeals.map((meal) => {
              const roleMeta = getMealRoleMeta(meal.role)
              const intelligence = getMealIntelligenceNote(meal.id)

              return (
                <article
                  key={meal.id}
                  className="break-inside-avoid rounded-[18px] border border-white/10 bg-black/25 p-3"
                  style={{
                    pageBreakInside: "avoid",
                    breakInside: "avoid",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
                        {roleMeta.icon} {roleMeta.label} · {meal.role}
                      </p>

                      <h3 className="mt-1 text-[17px] font-black text-white">
                        {meal.title}
                      </h3>

                      <p className="mt-1 text-[12px] text-white/55">
                        {meal.subtitle}
                      </p>

                      <p className="mt-2 text-[11px] font-bold text-[#D8C56A]">
                        {roleMeta.note}
                      </p>
                    </div>

                    <p className="rounded-xl bg-[#B7F532]/10 px-3 py-2 text-[13px] font-black text-[#B7F532]">
                      {meal.kcal} kcal
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <Macro label="P" value={`${meal.protein}g`} />
                    <Macro label="C" value={`${meal.carbs}g`} />
                    <Macro label="F" value={`${meal.fat}g`} />
                    <Macro label="Fiber" value={`${meal.fiber}g`} />
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <MacroCompare label="Protein" actual={meal.protein} target={meal.targetProtein} />
                    <MacroCompare label="Carbs" actual={meal.carbs} target={meal.targetCarbs} />
                    <MacroCompare label="Fat" actual={meal.fat} target={meal.targetFat} />
                  </div>

                  {meal.adjustmentSummary.length > 0 && (
                    <div className="mt-3 rounded-[16px] border border-[#D8C56A]/15 bg-[#D8C56A]/[0.05] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#D8C56A]">
                            Applied Macro Corrections
                          </p>

                          <p className="mt-1 text-[11px] text-white/50">
                            Smart ingredient balancing applied automatically.
                          </p>
                        </div>

                        <div className="rounded-full border border-[#D8C56A]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#D8C56A]">
                          G7 Intelligence
                        </div>
                      </div>

                      <div className="mt-3 grid gap-2">
                        {meal.macroAdjustments.map((adjustment) => (
                          <div
                            key={`${meal.id}-${adjustment.ingredient}`}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-3 py-2"
                          >
                            <div>
                              <p className="text-[11px] font-black text-white">
                                +{adjustment.increaseGrams}g {adjustment.ingredient}
                              </p>

                              <p className="mt-1 text-[10px] text-white/45">
                                {adjustment.reason}
                              </p>
                            </div>

                            <div className="rounded-full bg-[#B7F532]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#B7F532]">
                              Applied
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {meal.raw.slice(0, 4).map(([name, amount]) => (
                      <div
                        key={`${meal.id}-${name}`}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.035] px-3 py-2 text-[11px]"
                      >
                        <span className="text-white/65">{name}</span>

                        <span className="font-black text-[#B7F532]">
                          {amount}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-[16px] border border-[#22D3EE]/10 bg-[#07111F] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
                      Fast Batch Cooking SOP
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-white/45">
                      اقرأ الخطوات بسرعة، اطبخ الوجبة، وقسّمها حسب Prep Window.
                    </p>

                    <div className="mt-2 grid gap-2">
                      {meal.steps.map((step, index) => (
                        <div
                          key={`${meal.id}-${step.title}`}
                          className="rounded-xl border border-white/5 bg-black/20 p-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22D3EE] text-[10px] font-black text-black">
                              {index + 1}
                            </div>

                            <p className="text-[12px] font-black text-white">
                              {step.title}
                            </p>
                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-white/65">
                            {step.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {intelligence && (
                    <div className="mt-3 grid gap-2 lg:grid-cols-3">
                      <div className="rounded-[14px] border border-[#B7F532]/15 bg-[#B7F532]/[0.05] p-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#B7F532]">
                          Flavor Identity
                        </p>

                        <p className="mt-2 text-[12px] font-black text-white">
                          {intelligence.flavorBase}
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-white/55">
                          {intelligence.yieldNote}
                        </p>
                      </div>

                      <div className="rounded-[14px] border border-[#22D3EE]/15 bg-[#22D3EE]/[0.05] p-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#22D3EE]">
                          Chef Quick Tips
                        </p>

                        <div className="mt-2 space-y-2">
                          {intelligence.chefTips.slice(0, 2).map((tip) => (
                            <p
                              key={tip}
                              className="text-[11px] leading-5 text-white/60"
                            >
                              • {tip}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[14px] border border-[#D8C56A]/15 bg-[#D8C56A]/[0.05] p-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#D8C56A]">
                          Store & Reheat
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-white/60">
                          {intelligence.storageNote}
                        </p>

                        <p className="mt-2 text-[11px] font-bold text-[#D8C56A]">
                          Best Reheat: {intelligence.bestReheat}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      ))}

      <section
        className="break-before-page rounded-[20px] border border-[#22D3EE]/15 bg-[#07111F] p-4"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-black text-white">
            Weekly Grocery List
          </h2>

          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
            Full Week Shopping System
          </p>
        </div>

        <p className="mt-2 text-[12px] leading-6 text-white/55">
          الكميات دي محسوبة للأسبوع كامل بناءً على 7 أيام / 21 وجبة. بعض
          المكونات قد تكون موجودة في البيت بالفعل.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {Object.entries(groceryGroups).map(([category, items]) => (
            <div
              key={category}
              className="break-inside-avoid rounded-[18px] border border-white/10 bg-black/20 p-4"
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#B7F532]">
                {category}
              </p>

              <div className="mt-3 space-y-2">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="text-[11px] text-white/70">
                        {item.name}
                      </span>

                      <span className="text-[11px] font-black text-[#22D3EE]">
                        {item.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-[11px] text-white/35">No items</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 break-inside-avoid rounded-[20px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.04] p-4">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-[22px] font-black text-white">
              Estimated Weekly Cost
            </h2>

            <p className="mt-2 text-[12px] leading-6 text-white/55">
              تقدير تقريبي بناءً على أسعار سوقية عامة في مصر. السعر الحقيقي
              ممكن يختلف حسب كارفور العبور، العروض، الموسم، والحاجات الموجودة
              في البيت.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#B7F532]/25 bg-black/25 px-5 py-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
              Approx.
            </p>

            <p className="mt-1 text-[26px] font-black text-[#B7F532]">
              {estimatedTotal > 0 ? `${estimatedTotal} EGP` : "Manual"}
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-4 flex items-center justify-between border-t border-[#22D3EE]/20 pt-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/g7-logo-clean.png"
            alt="G7"
            className="h-[38px] w-auto object-contain opacity-90"
          />

          <p className="text-[9px] uppercase tracking-[0.16em] text-white/50">
            Chef-Based Nutrition OS
          </p>
        </div>

        <p className="text-[9px] uppercase tracking-[0.16em] text-white/50">
          Real Food. Real Results.
        </p>

        <p className="text-[11px] font-black text-[#B7F532]">
          +20 112 844 2058
        </p>
      </footer>
    </div>
  )
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/25 p-2">
      <p className="text-[9px] text-white/40">{label}</p>
      <p className="font-black text-white">{value}</p>
    </div>
  )
}

function MacroCompare({
  label,
  actual,
  target,
}: {
  label: string
  actual: number
  target: number
}) {
  const diff = actual - target
  const isClose = Math.abs(diff) <= 5

  return (
    <div className="rounded-xl border border-[#22D3EE]/10 bg-[#06111E] p-2">
      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#22D3EE]">
        {label}
      </p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <div>
          <p className="text-[8px] text-white/35">Actual</p>
          <p className="text-[13px] font-black text-white">{actual}g</p>
        </div>

        <div className="text-right">
          <p className="text-[8px] text-white/35">Coach Target</p>
          <p className="text-[13px] font-black text-[#B7F532]">{target}g</p>
        </div>
      </div>

      <p
        className={`mt-1 text-[9px] font-bold ${
          isClose ? "text-[#B7F532]" : "text-[#D8C56A]"
        }`}
      >
        {isClose
          ? "On Target"
          : diff > 0
          ? `+${diff}g over`
          : `${Math.abs(diff)}g under`}
      </p>
    </div>
  )
}