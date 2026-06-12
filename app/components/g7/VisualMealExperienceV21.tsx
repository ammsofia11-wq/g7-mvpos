import MealVisualCardV2 from "./MealVisualCardV2"

type PdfLanguage = "ar" | "en" | "bg"

type MealRole = "BREAKFAST" | "LUNCH" | "DINNER"

type VisualMeal = {
  id: string
  role: MealRole
  title: string
  kcal: number
  protein: number
  carbs: number
  fat: number
}

type VisualMealContainer = {
  day: string
  meal: VisualMeal
}

type VisualMealExperienceV21Props = {
  foodContainers: VisualMealContainer[]
  language: PdfLanguage
  getDayDisplay: (day: string, language: PdfLanguage) => string
  getRoleDisplay: (role: MealRole, language: PdfLanguage) => string
}

export default function VisualMealExperienceV21({
  foodContainers,
  language,
  getDayDisplay,
  getRoleDisplay,
}: VisualMealExperienceV21Props) {
  const featuredMeals = foodContainers.slice(0, 4)

  return (
    <>
      <section
        className="break-before-page rounded-[24px] border border-[#2CA6A4]/30 bg-[#07121C] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#35F2FF]">
              G7 VISUAL MEAL EXPERIENCE
            </p>

            <h2 className="mt-2 max-w-[610px] text-[30px] font-black leading-tight text-white">
              {language === "ar"
                ? "تجربة الوجبات البصرية"
                : language === "bg"
                  ? "Визуално meal experience"
                  : "Visual Meal Experience"}
            </h2>

            <p className="mt-3 max-w-[650px] text-[13px] font-black leading-7 text-white/85">
              {language === "ar"
                ? "G7 لا يعطيك أرقام فقط. نفس البروتين، الكارب والصوص يتحولوا إلى أطباق ممتعة تشبه نظام meal prep حقيقي."
                : language === "bg"
                  ? "G7 не ти дава само числа. Същият протеин, въглехидрат и сос се превръщат в истински meal prep ястия."
                  : "G7 does not give you numbers only. The same protein, carb, and sauce engines turn into real meal-prep dishes."}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#2CA6A4]/40 bg-white px-4 py-3 text-center">
            <p className="text-[24px] font-black text-[#009EAD]">V2.1</p>

            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#101820]">
              Visual Engine
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featuredMeals.map(({ day, meal }) => (
            <MealVisualCardV2
              key={`visual-${day}-${meal.id}`}
              day={getDayDisplay(day, language)}
              role={getRoleDisplay(meal.role, language)}
              title={meal.title}
              kcal={meal.kcal}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              language={language}
              compact
            />
          ))}
        </div>
      </section>

      <section
        className="break-before-page rounded-[24px] border border-[#2CA6A4]/30 bg-[#07121C] p-6 text-white"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#35F2FF]">
              G7 MASTERPIECES ENGINE
            </p>

            <h2 className="mt-2 max-w-[650px] text-[30px] font-black leading-tight text-white">
              {language === "ar"
                ? "من قاعدة تحضير واحدة إلى أطباق متعددة"
                : language === "bg"
                  ? "От една база до много ястия"
                  : "From One Prep Base To Multiple Masterpieces"}
            </h2>

            <p className="mt-3 max-w-[680px] text-[13px] font-black leading-7 text-white/85">
              {language === "ar"
                ? "العبقرية هنا إنك لا تطبخ كل وجبة من الصفر. G7 يحوّل نفس البروتين المتبل إلى أطباق مختلفة بإحساس مختلف."
                : language === "bg"
                  ? "Идеята е, че не готвиш всяко ястие от нулата. G7 превръща същата база в различни ястия."
                  : "The intelligence is simple: you do not cook every meal from scratch. G7 turns the same prepared base into different meals."}
            </p>
          </div>

          <div className="rounded-[18px] border border-[#A8FF3E]/35 bg-[#102313] px-4 py-3 text-center">
            <p className="text-[24px] font-black text-[#A8FF3E]">2</p>

            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white">
              Core Bases
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <MasterpieceBox
            title={
              language === "ar"
                ? "G7 Chicken Mix"
                : language === "bg"
                  ? "G7 пилешка база"
                  : "G7 Chicken Mix"
            }
            amount={language === "ar" ? "1 كجم تقريبًا" : "Approx. 1kg"}
            meals={
              language === "ar"
                ? [
                    "كفتة فراخ جريل مع أرز",
                    "باستا كرات الفراخ الإيطالية",
                    "كاساديا فراخ لايت",
                    "برجر فراخ لايت",
                    "فاهيتا فراخ مدخنة",
                  ]
                : [
                    "Chicken Kofta Bowl",
                    "Chicken Meatball Pasta",
                    "Chicken Quesadilla",
                    "Chicken Burger",
                    "Smoky Chicken Fajita",
                  ]
            }
          />

          <MasterpieceBox
            title={
              language === "ar"
                ? "G7 Beef Mix"
                : language === "bg"
                  ? "G7 телешка база"
                  : "G7 Beef Mix"
            }
            amount={language === "ar" ? "778 جم تقريبًا" : "Approx. 778g"}
            meals={
              language === "ar"
                ? [
                    "طبق كفتة لحمة",
                    "باستا كفتة للريكافري",
                    "حواوشي مصري لايت",
                    "كفتة لحمة للريكافري",
                  ]
                : [
                    "Beef Kofta Plate",
                    "Recovery Kofta Pasta",
                    "Lean Egyptian Hawawshi",
                    "Recovery Beef Kofta Bowl",
                  ]
            }
          />
        </div>

        <div className="mt-5 rounded-[18px] border border-[#A8FF3E]/30 bg-[#102313] p-4">
          <p className="text-center text-[13px] font-black leading-7 text-[#A8FF3E]">
            {language === "ar"
              ? "حضّر مرة. قسّم بذكاء. حوّل القواعد إلى أطباق ممتعة."
              : language === "bg"
                ? "Подготви веднъж. Раздели умно. Превърни базите в ястия."
                : "Prep once. Split smart. Turn bases into enjoyable meals."}
          </p>
        </div>
      </section>
    </>
  )
}

function MasterpieceBox({
  title,
  amount,
  meals,
}: {
  title: string
  amount: string
  meals: string[]
}) {
  return (
    <div className="rounded-[24px] border border-white/20 bg-white/[0.08] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-black text-white">{title}</h3>

        <span className="rounded-full bg-[#A8FF3E]/15 px-3 py-1 text-[10px] font-black text-[#A8FF3E]">
          {amount}
        </span>
      </div>

      <div className="space-y-2">
        {meals.map((meal, index) => (
          <div
            key={`${title}-${meal}`}
            className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#06101A] p-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2CA6A4]/25 text-xs font-black text-[#35F2FF]">
              {index + 1}
            </span>

            <p className="text-sm font-black leading-6 text-white">{meal}</p>
          </div>
        ))}
      </div>
    </div>
  )
}