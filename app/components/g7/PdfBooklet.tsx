import {
  formatNormalizedAmount,
  normalizeIngredient,
  NormalizedIngredientCategory,
} from "./ingredient-normalizer";
import { getMealIntelligenceNote } from "./meal-intelligence-notes";
import {
  getMealsForPlan,
  getMealsGroupedByDay,
  Meal,
} from "./meals";
import { PlanKey } from "./plans";
import { getPlanBranding } from "./plan-branding";
import {
  getMealTranslation,
  translateIngredientName,
  translateMealStep,
  translateMealSubtitle,
  translateMealTitle,
} from "./meal-translations";
import VisualMealExperienceV21 from "./VisualMealExperienceV21";

export type PdfLanguage = "ar" | "en" | "bg";

type PdfBookletProps = {
  selectedPlan?: PlanKey;
  clientName: string;
  language?: PdfLanguage;
};

type GrocerySummaryItem = {
  name: string;
  category: NormalizedIngredientCategory;
  amount: string;
  grams: number;
  eggs: number;
  cans: number;
  scoops: number;
};

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
  "Cottage Cheese": 190,
  "Whole Wheat Bread": 55,
  "Baladi Bread": 5,
  "Whole Wheat Tortilla": 90,
  "Brown Burger Bun": 15,
};

function buildWeeklyGroceryList(meals: Meal[]): GrocerySummaryItem[] {
  const map = new Map<
    string,
    {
      name: string;
      category: NormalizedIngredientCategory;
      grams: number;
      eggs: number;
      cans: number;
      scoops: number;
      units: Record<string, number>;
      texts: string[];
    }
  >();

  meals.forEach((meal) => {
    meal.raw.forEach(([name, amount]) => {
      const normalized = normalizeIngredient(name, amount);
      const key = normalized.canonicalName;

      const current = map.get(key) ?? {
        name: normalized.canonicalName,
        category: normalized.category,
        grams: 0,
        eggs: 0,
        cans: 0,
        scoops: 0,
        units: {},
        texts: [],
      };

      if (normalized.amount.type === "grams") {
        current.grams += normalized.amount.value;
      }

      if (normalized.amount.type === "eggs") {
        current.eggs += normalized.amount.value;
      }

      if (normalized.amount.type === "cans") {
        current.cans += normalized.amount.value;
      }

      if (normalized.amount.type === "scoops") {
        current.scoops += normalized.amount.value;
      }

      if (normalized.amount.type === "unit") {
        current.units[normalized.amount.unit] =
          (current.units[normalized.amount.unit] ?? 0) +
          normalized.amount.value;
      }

      if (normalized.amount.type === "text") {
        current.texts.push(normalized.amount.value);
      }

      map.set(key, current);
    });
  });

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
  }));
}

function groupWeeklyGroceryList(items: GrocerySummaryItem[]) {
  const sauces = items.filter((item) => item.category === "SAUCES");
  const extras = items.filter((item) => item.category === "EXTRAS");

  return {
    PROTEINS: items.filter((item) => item.category === "PROTEINS"),
    CARBS: items.filter((item) => item.category === "CARBS"),
    SAUCES: [...sauces, ...extras],
    VEGETABLES: items.filter((item) => item.category === "VEGETABLES"),
  };
}

function makeGrocerySummaryItem(
  name: string,
  category: NormalizedIngredientCategory,
  amount: string,
  grams = 0,
): GrocerySummaryItem {
  return {
    name,
    category,
    amount,
    grams,
    eggs: 0,
    cans: 0,
    scoops: 0,
  };
}

function applyEgyptMarketGrocerySubstitutions(items: GrocerySummaryItem[]) {
  const filtered = items.filter((item) => {
    const name = item.name.toLowerCase();
    if (name.includes("egg whites")) return false;
    if (name.includes("whey protein")) return false;
    if (item.category === "SAUCES") return false;
    if (name.includes("pickle")) return false;
if (name.includes("pickles")) return false;
if (name.includes("مخلل")) return false;
    return true;
  });

  const proteins = filtered.filter((item) => item.category === "PROTEINS");
  const carbs = filtered.filter((item) => item.category === "CARBS");
  const vegetables = filtered.filter((item) => item.category === "VEGETABLES");
  const extras = filtered.filter((item) => item.category === "EXTRAS");

  return [
    ...proteins,
    makeGrocerySummaryItem("Cottage Cheese", "PROTEINS", "1.5kg", 1500),
    ...carbs,
    ...vegetables,
    makeGrocerySummaryItem("G7 Tomato Sauce Engine", "SAUCES", "1 batch", 0),
    makeGrocerySummaryItem("G7 Yogurt Spice Sauce", "SAUCES", "1 batch", 0),
    makeGrocerySummaryItem("G7 Green Pea Guacamole", "SAUCES", "optional", 0),
    makeGrocerySummaryItem(
      "Light Tahini Sauce",
      "SAUCES",
      "optional small amount",
      0,
    ),
    ...extras,
  ];
}

function estimateItemCost(item: GrocerySummaryItem) {
  const price = MARKET_PRICE_EGP[item.name];

  if (!price) return 0;
  if (item.grams > 0) return Math.round((item.grams / 1000) * price);
  if (item.eggs > 0) return Math.round(item.eggs * price);
  if (item.cans > 0) return Math.round(item.cans * price);

  return 0;
}

function getMealRoleMeta(role: Meal["role"], language: PdfLanguage) {
  const text = {
    breakfast: {
      label:
        language === "bg" ? "ЕНЕРГИЯ" : language === "ar" ? "طاقة" : "ENERGY",
      icon: "",
      note:
        language === "bg"
          ? "Закуска за енергия и силен старт на деня."
          : language === "en"
            ? "Breakfast for energy and a strong start to the day."
            : "فطار للطاقة وبداية قوية لليوم.",
      customerNote:
        language === "bg"
          ? "Лесно ястие, което ти помага да започнеш деня с протеин и изчислени калории."
          : language === "en"
            ? "An easy meal that helps you start the day with protein and calculated calories."
            : "وجبة سهلة لبدء اليوم ببروتين وسعرات محسوبة.",
    },
    lunch: {
      label:
        language === "bg" ? "АКТИВНО" : language === "ar" ? "نشاط" : "ACTIVE",
      icon: "",
      note:
        language === "bg"
          ? "Обяд за енергия, ситост и добро представяне през деня."
          : language === "en"
            ? "Lunch for energy and performance through the day."
            : "غداء للطاقة والأداء خلال اليوم.",
      customerNote:
        language === "bg"
          ? "Основно ястие, създадено да те засити и да подкрепи целта ти в тренировките."
          : language === "en"
            ? "A main meal built to keep you full and support your training goal."
            : "وجبة أساسية للشبع ودعم هدفك في التمرين.",
    },
    dinner: {
      label:
        language === "bg"
          ? "ВЪЗСТАНОВЯВАНЕ"
          : language === "ar"
            ? "ريكافري"
            : "RECOVERY",
      icon: "",
      note:
        language === "bg"
          ? "Вечеря за възстановяване и ситост преди сън."
          : language === "en"
            ? "Dinner for recovery and satiety before sleep."
            : "عشاء للريكافري والشبع قبل النوم.",
      customerNote:
        language === "bg"
          ? "Възстановяващо ястие, което ти помага да завършиш деня без хаотично хранене."
          : language === "en"
            ? "A recovery meal that helps you close the day without random eating."
            : "وجبة ريكافري تساعدك تنهي اليوم بشكل منظم.",
    },
  };

  if (role === "BREAKFAST") return text.breakfast;
  if (role === "LUNCH") return text.lunch;
  return text.dinner;
}

function getDayNote(day: string, language: PdfLanguage) {
  const notes: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      "Day 1": "بداية سهلة ومألوفة تساعدك تلتزم من أول يوم.",
      "Day 2": "يوم مريح بطابع باستا محسوب من غير لخبطه.",
      "Day 3": "وجبات بطابع أكل الشارع لكن بشكل محسوب ومناسب للنظام.",
      "Day 4": "يوم متوازن بين فطار خفيف وطاقة للتمرين.",
      "Day 5": "يوم مصمم للتحكم في الرغبة في الأكل مع الحفاظ على النظام.",
      "Day 6": "نكهات فاهيتا وراب لتغيير الطعم والحفاظ على التنويع.",
      "Day 7": "نهاية أسبوع أخف مع تونة وسمك وتحضير بسيط.",
    },
    en: {
      "Day 1": "An easy, familiar start for consistency.",
      "Day 2": "A controlled pasta-style comfort day.",
      "Day 3": "Street-food fit meals without leaving the system.",
      "Day 4": "A balanced day between light breakfast and active fuel.",
      "Day 5": "Smart cravings-control without breaking the plan.",
      "Day 6": "Fajita and wrap flavors for variety.",
      "Day 7": "A lighter end-of-week reset with tuna and fish.",
    },
    bg: {
      "Day 1": "Лесно и познато начало, което помага за постоянство.",
      "Day 2": "Контролиран ден с паста и ясни количества.",
      "Day 3": "Ястия с вкус на любима бърза храна, но в рамките на системата.",
      "Day 4": "Балансиран ден между лека закуска и енергия за тренировка.",
      "Day 5": "Умен контрол на апетита, без да нарушаваш плана.",
      "Day 6": "Фахита и тортила вкусове за повече разнообразие.",
      "Day 7": "По-лек край на седмицата с риба тон и риба.",
    },
  };

  return notes[language][day] ?? notes[language]["Day 1"];
}

function getPrepWindow(day: string, language: PdfLanguage) {
  if (["Day 1", "Day 2", "Day 3"].includes(day)) {
    return language === "bg"
      ? "Подготовка 1 · Сготви веднъж за първите 3 дни"
      : language === "en"
        ? "Prep Batch 1 · Cook once for the first 3 days"
        : "المرحلة الأولى · حضّر أول 3 أيام مرة واحدة";
  }

  if (["Day 4", "Day 5", "Day 6"].includes(day)) {
    return language === "bg"
      ? "Подготовка 2 · Сготви дни 4–6 наведнъж"
      : language === "en"
        ? "Prep Batch 2 · Cook days 4–6 once"
        : "المرحلة الثانية · حضّر الأيام 4–6 مرة واحدة";
  }

  return language === "bg"
    ? "Свеж / лек ден · По-лек край на седмицата"
    : language === "en"
      ? "Fresh / Light Day · A lighter end-of-week day"
      : "يوم خفيف · تحضير أبسط في نهاية الأسبوع";
}

function getClientFriendlyAdjustmentReason(
  ingredient: string,
  language: PdfLanguage,
) {
  const lower = ingredient.toLowerCase();

  const isProtein =
    lower.includes("chicken") ||
    lower.includes("beef") ||
    lower.includes("fish") ||
    lower.includes("tuna");

  const isCarb =
    lower.includes("rice") ||
    lower.includes("pasta") ||
    lower.includes("potato") ||
    lower.includes("bread") ||
    lower.includes("tortilla") ||
    lower.includes("oats");

  const isFlavor =
    lower.includes("sauce") ||
    lower.includes("fat") ||
    lower.includes("mozzarella") ||
    lower.includes("yogurt");

  if (language === "bg") {
    if (isProtein)
      return "G7 коригира количеството протеин, за да пасне на твоята цел.";
    if (isCarb)
      return "G7 коригира въглехидратите, за да паснат на твоята цел.";
    if (isFlavor)
      return "G7 коригира соса или източника на мазнини според вида на ястието, без да нарушава целта.";
    return "G7 коригира тази съставка, за да пасне ястието на твоята цел.";
  }

  if (language === "ar") {
    if (lower.includes("chicken"))
      return "G7 عدّل كمية الفراخ لتقريب الوجبة من هدف البروتين.";
    if (lower.includes("beef"))
      return "G7 عدّل كمية اللحمة لتقريب الوجبة من هدف البروتين.";
    if (lower.includes("fish"))
      return "G7 عدّل كمية السمك لتقريب الوجبة من هدف البروتين.";
    if (lower.includes("tuna"))
      return "G7 عدّل كمية التونة لتقريب الوجبة من هدف البروتين.";
    if (isCarb) return "G7 عدّل كمية الكارب لتناسب هدفك الغذائي.";
    if (isFlavor)
      return "G7 عدّل الصوص أو الدهون حسب نوع الوجبة للحفاظ على الطعم مع بقاء الهدف محسوبًا.";
    return "G7 اعتمد على جبنة قريش كبروتين سريع عملي يناسب السوق المصري ويقلل الهدر.";
  }

  if (lower.includes("chicken"))
    return "G7 adjusted the chicken amount to match your protein target.";
  if (lower.includes("beef"))
    return "G7 adjusted the beef amount to match your protein target.";
  if (lower.includes("fish"))
    return "G7 adjusted the fish amount to match your protein target.";
  if (lower.includes("tuna"))
    return "G7 adjusted the tuna amount to match your protein target.";
  if (isCarb)
    return "G7 adjusted the carb amount to match your nutrition goal.";
  if (isFlavor)
    return "G7 adjusted the sauce or fat source based on the meal type without breaking your target.";

  return "G7 adjusted this ingredient so the meal fits your target.";
}

function getPdfText(language: PdfLanguage) {
  return {
    clientPdf:
      language === "bg"
        ? "Персонализиран клиентски хранителен PDF"
        : language === "en"
          ? "Personalized Client Nutrition PDF"
          : "ملف تغذية شخصي للعميل",
    clientSystem:
      language === "bg"
        ? "Клиентска система"
        : language === "en"
          ? "Client System"
          : "نظام العميل",
    price: language === "bg" ? "Цена" : language === "en" ? "Price" : "السعر",
    coachNumbers:
      language === "bg"
        ? "Треньорът ти даде числа"
        : language === "en"
          ? "Your Coach Gave You Numbers"
          : "G7 جهّز لك نظام أكل واضح حسب هدفك",
    systemLine:
      language === "bg"
        ? "G7 ги превръща в реална хранителна система."
        : language === "en"
          ? "G7 turned them into a real food system."
          : "G7 يحوّل هدفك إلى نظام أكل متوازن لمدة 7 أيام.",
    supportLine:
      language === "bg"
        ? "Треньорът ти даде числа. G7 ги превръща в пълна хранителна система."
        : language === "en"
          ? "Your coach gave you numbers. G7 turned them into a complete food system."
          : "هدفك يتحول هنا إلى نظام أكل واضح لمدة 7 أيام، بكميات محسوبة وخطوات تنفيذ سهلة.",
    explanation:
      language === "bg"
        ? "Този PDF не е просто списък с ястия. Това е 7-дневна хранителна система, създадена от chef logic около твоя план, макроси, ритъм на готвене и седмично пазаруване."
        : language === "en"
          ? "This PDF is not just a list of meals. It is a 7-day chef-based nutrition system built around your plan, your macros, your cooking rhythm, and your weekly shopping."
          : "هذا الملف يقدم لك نظام أكل كامل لمدة 7 أيام: وجبات محسوبة، خطوات تحضير واضحة، وقائمة مشتريات مبنية على هدفك.",
    systemOverview:
      language === "bg"
        ? "Преглед на системата"
        : language === "en"
          ? "System Overview"
          : "نظرة على النظام",
    flavorProfile:
      language === "bg"
        ? "Вкусов профил: Middle Eastern Performance · G7 Nutrition OS"
        : language === "en"
          ? "Flavor Profile: Middle Eastern Performance · Chef-Based Nutrition OS"
          : "هوية الطعم: أكل بيتي متوازن بنكهة شرق أوسطية · نظام تغذية G7",
    whatYouGet:
      language === "bg"
        ? "Какво получаваш"
        : language === "en"
          ? "What You Get"
          : "محتوى النظام",
    whatYouGetSub:
      language === "bg"
        ? "Пълен клиентски пакет"
        : language === "en"
          ? "Your full client package"
          : "كل ما تحتاجه لتطبيق الأسبوع بسهولة",
    prepTitle:
      language === "bg"
        ? "Седмичен метод за подготовка"
        : language === "en"
          ? "Weekly Prep Method"
          : "طريقة التحضير الأسبوعية",
    prepBody:
      language === "bg"
        ? "Системата е направена да намали мисленето и да спести време: готвиш част от седмицата наведнъж, а останалите дни остават лесни."
        : language === "en"
          ? "The system is designed to reduce thinking and save time: cook part of the week once, then keep the remaining days easy and clear."
          : "النظام مصمم لتسهيل الالتزام: حضّر البروتين والكارب والصوص على مراحل، ثم ركّب وجباتك بسهولة حسب الخطة.",
    startGuide:
      language === "bg"
        ? "Стартово ръководство"
        : language === "en"
          ? "Client Start Guide"
          : "دليل البداية",
    howToUse:
      language === "bg"
        ? "Как да използваш"
        : language === "en"
          ? "How To Use"
          : "ابدأ من هنا",
    yourSystem:
      language === "bg"
        ? "твоята G7 система"
        : language === "en"
          ? "Your G7 System"
          : "نظامك من G7",
    howToUseArabic:
      language === "ar"
        ? "خطوات البداية"
        : language === "bg"
          ? "Започни оттук"
          : "Start here",
    startGuideBody:
      language === "bg"
        ? "Тази страница ти показва откъде да започнеш веднага след получаване на файла. Не мислиш вместо системата; просто следваш стъпките."
        : language === "en"
          ? "This page shows you exactly where to start after receiving the file. You do not need to overthink the system; just follow the steps."
          : "اتبع الخطوات التالية بالترتيب: راجع أهدافك، جهّز مشترياتك، حضّر أول 3 أيام، ثم امشِ على ترتيب الوجبات اليومي.",
    simpleRule:
      language === "bg"
        ? "Просто правило"
        : language === "en"
          ? "Simple Rule"
          : "قاعدة بسيطة",
    simpleRuleTitle:
      language === "bg"
        ? "Не следвай случайни ястия. Следвай системата."
        : language === "en"
          ? "Don’t follow random meals. Follow the system."
          : "القاعدة: لا تطبخ كل وجبة من الصفر.",
    simpleRuleBody:
      language === "bg"
        ? "Всяко ястие има роля: закуска за енергия, обяд за представяне и вечеря за възстановяване. Следвай реда и количествата."
        : language === "en"
          ? "Every meal has a role: breakfast for energy, lunch for performance, and dinner for recovery. Follow the order and quantities to make the system easier."
          : "حضّر القواعد الأساسية، ثم ركّب الوجبات. بروتين الأيام 4–6 لا يبقى نيّ في الثلاجة؛ احفظه في الفريزر وانقله للثلاجة قبل التحضير الثاني.",
    weeklyMenu:
      language === "bg"
        ? "Седмично меню"
        : language === "en"
          ? "Weekly Menu"
          : "تفاصيل الوجبات",
    prepWindow:
      language === "bg"
        ? "Време за подготовка"
        : language === "en"
          ? "Prep Window"
          : "نافذة التحضير",
    smartAdjustments:
      language === "bg"
        ? "Умни G7 корекции"
        : language === "en"
          ? "G7 Smart Adjustments"
          : "تعديلات G7 الذكية",
    smartAdjustmentsBody:
      language === "bg"
        ? "G7 коригира количествата, за да пасне ястието на твоята цел."
        : language === "en"
          ? "G7 adjusted the quantities so the meal matches your target."
          : "G7 يضبط الكميات بحيث تقترب الوجبة من هدفك الغذائي.",
    g7Intelligence:
      language === "bg"
        ? "G7 интелигентност"
        : language === "en"
          ? "G7 Intelligence"
          : "ذكاء G7",
    applied:
      language === "bg"
        ? "Приложено"
        : language === "en"
          ? "Applied"
          : "تم التطبيق",
    sopTitle:
      language === "bg"
        ? "Бързи стъпки за готвене на порции"
        : language === "en"
          ? "Fast Batch Cooking Steps"
          : "خطوات الطبخ السريعة",
    sopBody:
      language === "bg"
        ? "Прочети стъпките бързо, сготви ястието и го раздели според времето за подготовка."
        : language === "en"
          ? "Read the steps quickly, cook the meal, and portion it according to the Prep Window."
          : "اتبع خطوات الطبخ، ثم قسّم الوجبة حسب نافذة التحضير الموضحة.",
    flavorIdentity:
      language === "bg"
        ? "Вкусова идентичност"
        : language === "en"
          ? "Flavor Identity"
          : "هوية النكهة",
    chefQuickTips:
      language === "bg"
        ? "Бързи съвети от шефа"
        : language === "en"
          ? "Chef Quick Tips"
          : "نصائح الشيف السريعة",
    storeReheat:
      language === "bg"
        ? "Съхранение и затопляне"
        : language === "en"
          ? "Store & Reheat"
          : "التخزين والتسخين",
    bestReheat:
      language === "bg"
        ? "Най-добро затопляне"
        : language === "en"
          ? "Best Reheat"
          : "أفضل طريقة تسخين",
    shoppingTitle:
      language === "bg"
        ? "Твоята 7-дневна система за пазаруване"
        : language === "en"
          ? "Your 7-Day Shopping System"
          : "قائمة مشتريات الأسبوع",
    shoppingSubtitle:
      language === "bg"
        ? "Списък за пазаруване за цялата седмица"
        : language === "en"
          ? "Your full-week shopping list"
          : "كل المكونات المطلوبة للأسبوع",
    shoppingBadge:
      language === "bg"
        ? "Седмично пазаруване"
        : language === "en"
          ? "Full Week Shopping System"
          : "مشتريات الأسبوع",
    shoppingBody:
      language === "bg"
        ? "Количествата са изчислени за цяла седмица на база 7 дни / 21 ястия. Някои продукти може вече да ги имаш у дома, затова използвай списъка като умен shopping guide, не като фиксирана фактура."
        : language === "en"
          ? "These quantities are calculated for the full week based on 7 days / 21 meals. Some ingredients may already be at home, so use this list as a smart shopping guide, not a fixed invoice."
          : "اشترِ المكونات الناقصة فقط. نسخة مصر تعتمد على جبنة قريش كبروتين سريع عملي، والصوصات تُحضّر داخل نظام G7 ولا تُشترى جاهزة.",
    noItems:
      language === "bg"
        ? "Няма продукти"
        : language === "en"
          ? "No items"
          : "لا توجد عناصر",
    estimatedCost:
      language === "bg"
        ? "Ориентировъчна седмична цена"
        : language === "en"
          ? "Estimated Weekly Cost"
          : "التكلفة الأسبوعية التقريبية",
    estimatedCostSubtitle:
      language === "bg"
        ? "Ориентировъчна цена за седмицата"
        : language === "en"
          ? "Approximate weekly cost"
          : "تقدير تقريبي للأسبوع",
    estimatedCostBody:
      language === "bg"
        ? "Ориентировъчна оценка на база общи пазарни цени в Египет. Реалната цена може да се промени според магазина, офертите, сезона и продуктите, които вече имаш у дома."
        : language === "en"
          ? "Approximate estimate based on general market prices in Egypt. The real price may change depending on the store, offers, season, and items already available at home."
          : "تقدير تقريبي بناءً على أسعار سوقية عامة في مصر. قد تختلف التكلفة الفعلية حسب المتجر، العروض، الموسم، وما هو متوفر لديك مسبقًا.",
    amountApprox:
      language === "bg" ? "Прибл." : language === "en" ? "Approx." : "تقريبًا",
    manualCost:
      language === "bg" ? "Ръчно" : language === "en" ? "Manual" : "يدوي",
    perMeal:
      language === "bg"
        ? "на ястие"
        : language === "en"
          ? "per meal"
          : "للوجبة",
    footerSystem:
      language === "bg"
        ? "G7 Nutrition OS"
        : language === "en"
          ? "Chef-Based Nutrition OS"
          : "نظام G7 للتغذية",
    footerPromise:
      language === "bg"
        ? "Истинска храна. Истински резултати."
        : language === "en"
          ? "Real Food. Real Results."
          : "أكل حقيقي. نتائج حقيقية.",
    mealCostLine: (cost: number) =>
      language === "bg"
        ? `Около ${cost} EGP на ястие при разделяне на цената върху 21 ястия.`
        : language === "en"
          ? `Around ${cost} EGP per meal when dividing the weekly cost across 21 meals.`
          : `متوسط تقريبي ${cost} جنيه للوجبة عند تقسيم تكلفة الأسبوع على 21 وجبة.`,
  };
}

function formatPriceForLanguage(price: string, language: PdfLanguage) {
  const numericPrice = price.match(/\d+(?:\.\d+)?/)?.[0] ?? price;

  if (language === "ar") return price;
  return `${numericPrice} EGP`;
}

function cleanDisplayAmount(amount: string, language: PdfLanguage = "en") {
  const normalized = amount
    .replace(/\beggss\b/gi, "eggs")
    .replace(/\bcanss\b/gi, "cans")
    .replace(/\bscoopss\b/gi, "scoops")
    .replace(/\bslicess\b/gi, "slices")
    .replace(/\bwrapss\b/gi, "wraps")
    .replace(/\bloafss\b/gi, "loaves")
    .replace(/\b1 eggs\b/gi, "1 egg")
    .replace(/\b1 cans\b/gi, "1 can")
    .replace(/\b1 scoops\b/gi, "1 scoop")
    .replace(/\b1 slices\b/gi, "1 slice")
    .replace(/\b1 wraps\b/gi, "1 wrap")
    .replace(/\b1 loaves\b/gi, "1 loaf");

  if (language === "bg") {
    return normalized
      .replace(/\bg(\d+(?:\.\d+)?)\b/gi, "$1g")
      .replace(/\b(\d+(?:\.\d+)?)g\b/gi, "$1g")
      .replace(/\b(\d+) medium wraps?\b/gi, "$1 средни тортили")
      .replace(/\bmedium wraps?\b/gi, "средна тортила")
      .replace(/\blarge loaf\b/gi, "голям хляб")
      .replace(/\bmedium loaf\b/gi, "среден хляб")
      .replace(/\bbun\b/gi, "бургер питка")
      .replace(/\beggs\b/gi, "яйца")
      .replace(/\begg\b/gi, "яйце")
      .replace(/\bcans\b/gi, "консерви")
      .replace(/\bcan\b/gi, "консерва")
      .replace(/\bscoops\b/gi, "мерителни лъжички")
      .replace(/\bscoop\b/gi, "мерителна лъжичка")
      .replace(/\bslices\b/gi, "филии")
      .replace(/\bslice\b/gi, "филия")
      .replace(/\bwraps\b/gi, "тортили")
      .replace(/\bwrap\b/gi, "тортила")
      .replace(/\b([2-9]|\d{2,}) филия\b/g, "$1 филии")
      .replace(/\b1 мерителни лъжички\b/g, "1 мерителна лъжичка")
      .replace(/(\d+(?:\.\d+)?)g \/ (\d+) филии?/gi, "$2 филии + $1g")
      .replace(
        /(\d+(?:\.\d+)?)g \/ (\d+) средни тортили/gi,
        "$2 средни тортили + $1g",
      )
      .replace(/\bas needed\b/gi, "според нуждата");
  }

  if (language === "ar") {
    return normalized
      .replace(/\bg(\d+(?:\.\d+)?)\b/gi, "$1 جم")
      .replace(/\b(\d+(?:\.\d+)?)g\b/gi, "$1 جم")
      .replace(/\b(\d+) medium wraps?\b/gi, "$1 راب متوسط")
      .replace(/\b(\d+) large loaf\b/gi, "$1 رغيف كبير")
      .replace(/\b(\d+) medium loaf\b/gi, "$1 رغيف متوسط")
      .replace(/\b(\d+) bun\b/gi, "$1")
      .replace(/\bmedium wrap\b/gi, "راب متوسط")
      .replace(/\blarge loaf\b/gi, "رغيف كبير")
      .replace(/\bmedium loaf\b/gi, "رغيف متوسط")
      .replace(/\bbun\b/gi, "عيش برجر")
      .replace(/\beggs\b/gi, "بيض")
      .replace(/\begg\b/gi, "بيضة")
      .replace(/\bcans\b/gi, "علب")
      .replace(/\bcan\b/gi, "علبة")
      .replace(/\bscoops\b/gi, "سكوب")
      .replace(/\bscoop\b/gi, "سكوب")
      .replace(/\bslices\b/gi, "شرائح")
      .replace(/\bslice\b/gi, "شريحة")
      .replace(/\bwraps\b/gi, "راب")
      .replace(/\bwrap\b/gi, "راب")
      .replace(/(\d+(?:\.\d+)?) جم \/ (\d+) شرائح?/g, "$2 شرائح + $1 جم")
      .replace(/(\d+(?:\.\d+)?) جم \/ (\d+) شريحة/g, "$2 شريحة + $1 جم")
      .replace(/(\d+(?:\.\d+)?) جم \/ (\d+) راب متوسط/g, "$2 راب متوسط + $1 جم")
      .replace(/\b([3-9]|\d{2,}) شريحة\b/g, "$1 شرائح")
      .replace(/\bas needed\b/gi, "حسب الحاجة");
  }

  return normalized
    .replace(/(\d+(?:\.\d+)?)g \/ (\d+) slices?/gi, "$2 slices + $1g")
    .replace(
      /(\d+(?:\.\d+)?)g \/ (\d+) medium wraps?/gi,
      "$2 medium wraps + $1g",
    )
    .replace(/\b([2-9]|\d{2,}) slice\b/gi, "$1 slices")
    .replace(/\b([2-9]|\d{2,}) egg\b/gi, "$1 eggs")
    .replace(/\b([2-9]|\d{2,}) can\b/gi, "$1 cans")
    .replace(/\b([2-9]|\d{2,}) scoop\b/gi, "$1 scoops")
    .replace(/\b([2-9]|\d{2,}) wrap\b/gi, "$1 wraps");
}

function cleanFinalPortionLine(value: string, language: PdfLanguage) {
  const cleaned = cleanDisplayAmount(value, language);

  if (language === "ar") {
    return cleaned
      .replace(/(\d+) بيض بيض كامل/g, "$1 بيض كامل")
      .replace(/1 بيضة بيض كامل/g, "1 بيضة كاملة")
      .replace(/(\d+) عيش برجر عيش برجر/g, "$1 عيش برجر")
      .replace(/(\d+) عيش برجر بني عيش برجر بني/g, "$1 عيش برجر بني")
      .replace(/(\d+) عيش برجر عيش برجر بني/g, "$1 عيش برجر بني")
      .replace(/Egg Whites/g, "جبنة قريش")
      .replace(/Whey Protein/g, "جبنة قريش")
      .replace(/بياض بيض/g, "جبنة قريش")
      .replace(/بروتين واي/g, "جبنة قريش")
      .replace(/1 علب/g, "1 علبة")
      .replace(/2 علب تونة بالماء/g, "علبتين تونة بالماء")
      .replace(/2 علب/g, "علبتين")
      .replace(/1 بيض/g, "1 بيضة")
      .replace(/بيضةة/g, "بيضة")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (language === "en") {
    return cleaned
      .replace(/(\d+) eggs Whole Eggs/gi, "$1 whole eggs")
      .replace(/1 egg Whole Eggs/gi, "1 whole egg")
      .replace(/(\d+) bun Brown Burger Bun/gi, "$1 brown burger bun")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (language === "bg") {
    return cleaned
      .replace(/(\d+) яйца Цели яйца/g, "$1 цели яйца")
      .replace(/1 яйце Цели яйца/g, "1 цяло яйце")
      .replace(
        /1 бургер питка Пълнозърнеста бургер питка/g,
        "1 пълнозърнеста бургер питка",
      )
      .replace(/1 среден хляб Балади хляб/g, "1 среден балади хляб")
      .replace(/(\d+) средни тортили/g, "$1 средни тортили")
      .replace(/\s+/g, " ")
      .trim();
  }

  return cleaned.replace(/\s+/g, " ").trim();
}

function hasLatinText(value: string) {
  return /[A-Za-z]/.test(value);
}

function formatGrams(value: number, language: PdfLanguage) {
  if (language === "ar") return `${value} جم`;
  if (language === "bg") return `${value}g`;
  return `${value}g`;
}

type YieldKind = "protein" | "carb" | "same";

function getCookedYieldInfo(canonicalName: string) {
  const name = canonicalName.toLowerCase();

  if (name.includes("chicken")) {
    return { ratio: 0.7, kind: "protein" as YieldKind };
  }

  if (name.includes("beef")) {
    return { ratio: 0.75, kind: "protein" as YieldKind };
  }

  if (name.includes("fish")) {
    return { ratio: 0.8, kind: "protein" as YieldKind };
  }

  if (name.includes("rice")) {
    return { ratio: 2.8, kind: "carb" as YieldKind };
  }

  if (name.includes("penne") || name === "pasta" || name.includes("pasta")) {
    return { ratio: 2.4, kind: "carb" as YieldKind };
  }

  if (name.includes("potato") || name.includes("sweet potato")) {
    return { ratio: 0.85, kind: "carb" as YieldKind };
  }

  return { ratio: 1, kind: "same" as YieldKind };
}

function getCookedPortionLabel(language: PdfLanguage) {
  if (language === "ar") {
    return {
      raw: "قبل الطبخ",
      cooked: "وقت التوزيع",
      approx: "حوالي",
      asWritten: "كما هو",
      note: "الشراء والتحضير بالوزن النيء، والتوزيع داخل العلبة بالوزن المطبوخ.",
    };
  }

  if (language === "bg") {
    return {
      raw: "преди готвене",
      cooked: "за кутията",
      approx: "около",
      asWritten: "както е написано",
      note: "Пазарувай и подготвяй по сурово тегло; разпределяй в кутиите по готово тегло.",
    };
  }

  return {
    raw: "before cooking",
    cooked: "container portion",
    approx: "approx.",
    asWritten: "as written",
    note: "Buy and prep by raw weight; portion containers by cooked weight.",
  };
}

function getCookedIngredientDisplayName(
  canonicalName: string,
  language: PdfLanguage,
  mealId?: string,
) {
  const baseName = getDisplayIngredientName(canonicalName, language, mealId);
  const lower = canonicalName.toLowerCase();

  const isCooked =
    lower.includes("chicken") ||
    lower.includes("beef") ||
    lower.includes("fish") ||
    lower.includes("rice") ||
    lower.includes("pasta") ||
    lower.includes("penne") ||
    lower.includes("potato");

  if (!isCooked) return baseName;

  if (language === "ar") return `${baseName} مطبوخ`;
  if (language === "bg") return `${baseName} готово`;
  return `cooked ${baseName}`;
}

function getMixedProteinPortionInfo(
  canonicalName: string,
  rawGrams: number,
  language: PdfLanguage,
) {
  const name = canonicalName.toLowerCase();

  if (!Number.isFinite(rawGrams) || rawGrams <= 0) return null;

  const isChicken = name.includes("chicken");
  const isBeef = name.includes("beef");

  if (!isChicken && !isBeef) return null;

  const mixedFactor = isChicken ? 1.111 : 1.299;
  const cookedYieldFromMixed = isChicken ? 0.7 : 0.7;

  const mixedGrams = roundToNearest(rawGrams * mixedFactor, 5);
  const cookedMixedGrams = roundToNearest(mixedGrams * cookedYieldFromMixed, 5);

  if (language === "ar") {
    return {
      rawLabel: "بروتين خام داخل الخليط",
      mixedLabel: "خليط متبل قبل الطبخ",
      cookedLabel: "وقت التوزيع بعد الطبخ",
      mixedName: isChicken ? "خليط فراخ متبل" : "خليط لحمة متبل",
      cookedName: isChicken ? "فراخ مطبوخة متبلة" : "كفتة مطبوخة",
      mixedGrams,
      cookedMixedGrams,
      approx: "حوالي",
    };
  }

  if (language === "bg") {
    return {
      rawLabel: "суров протеин в сместа",
      mixedLabel: "овкусена смес преди готвене",
      cookedLabel: "готова порция за кутията",
      mixedName: isChicken ? "овкусена пилешка смес" : "овкусена телешка смес",
      cookedName: isChicken ? "готово овкусено пиле" : "готова телешка кофта",
      mixedGrams,
      cookedMixedGrams,
      approx: "около",
    };
  }

  return {
    rawLabel: "raw protein inside mix",
    mixedLabel: "seasoned mix before cooking",
    cookedLabel: "cooked portion for container",
    mixedName: isChicken ? "seasoned chicken mix" : "seasoned beef mix",
    cookedName: isChicken ? "cooked seasoned chicken" : "cooked beef kofta",
    mixedGrams,
    cookedMixedGrams,
    approx: "approx.",
  };
}

function formatMixedProteinPortionLine(
  item: {
    name: string;
    grams: number;
    eggs: number;
    cans: number;
    scoops: number;
    units: Record<string, number>;
    texts: string[];
  },
  language: PdfLanguage,
  mealId?: string,
) {
  const mixedInfo = getMixedProteinPortionInfo(
    item.name,
    item.grams,
    language,
  );

  if (!mixedInfo) return null;

  const rawAmount = formatGroupedPortionAmount(item, language);
  const displayName = getDisplayIngredientName(item.name, language, mealId);

  const rawLine = cleanFinalPortionLine(
    `${rawAmount} ${displayName}`,
    language,
  );

  const mixedLine = cleanFinalPortionLine(
    `${formatGrams(mixedInfo.mixedGrams, language)} ${mixedInfo.mixedName}`,
    language,
  );

  const cookedLine = cleanFinalPortionLine(
    `${formatGrams(mixedInfo.cookedMixedGrams, language)} ${mixedInfo.cookedName}`,
    language,
  );

  return `${mixedInfo.rawLabel}: ${rawLine}\n${mixedInfo.mixedLabel}: ${mixedInfo.approx} ${mixedLine}\n${mixedInfo.cookedLabel}: ${mixedInfo.approx} ${cookedLine}`;
}

function formatRawToCookedLine(
  item: {
    name: string;
    grams: number;
    eggs: number;
    cans: number;
    scoops: number;
    units: Record<string, number>;
    texts: string[];
  },
  language: PdfLanguage,
  mealId?: string,
) {
  const lowerName = item.name.toLowerCase();
  if (lowerName.includes("egg whites")) {
    const amount = formatGrams(item.grams, language);
    const name = getDisplayIngredientName("Cottage Cheese", language, mealId);
    return cleanFinalPortionLine(`${amount} ${name}`, language);
  }

  if (lowerName.includes("whey protein")) {
    const cottageGrams = Math.max(
      150,
      roundToNearest(item.scoops * 150 + item.grams * 2, 10),
    );
    const amount = formatGrams(cottageGrams, language);
    const name = getDisplayIngredientName("Cottage Cheese", language, mealId);
    return cleanFinalPortionLine(`${amount} ${name}`, language);
  }

  const labels = getCookedPortionLabel(language);
  const rawAmount = formatGroupedPortionAmount(item, language);
  const displayName =
    item.name === "Healthy Fat Source"
      ? getHealthyFatDisplayName(language, mealId)
      : getDisplayIngredientName(item.name, language, mealId);

  if (item.grams <= 0) {
    return cleanFinalPortionLine(`${rawAmount} ${displayName}`, language);
  }

  const mixedProteinLine = formatMixedProteinPortionLine(
    item,
    language,
    mealId,
  );

  if (mixedProteinLine) {
    return mixedProteinLine;
  }

  const yieldInfo = getCookedYieldInfo(item.name);

  if (yieldInfo.kind === "same") {
    return cleanFinalPortionLine(`${rawAmount} ${displayName}`, language);
  }

  const cookedAmount = roundToNearest(item.grams * yieldInfo.ratio, 5);
  const cookedName = getCookedIngredientDisplayName(
    item.name,
    language,
    mealId,
  );

  const rawLine = cleanFinalPortionLine(
    `${rawAmount} ${displayName}`,
    language,
  );
  const cookedLine = cleanFinalPortionLine(
    `${formatGrams(cookedAmount, language)} ${cookedName}`,
    language,
  );

  if (language === "ar") {
    return `${labels.raw}: ${rawLine}\n${labels.cooked}: ${labels.approx} ${cookedLine}`;
  }

  if (language === "bg") {
    return `${labels.raw}: ${rawLine}\n${labels.cooked}: ${labels.approx} ${cookedLine}`;
  }

  return `${labels.raw}: ${rawLine}\n${labels.cooked}: ${labels.approx} ${cookedLine}`;
}

function getRawToCookedSystemText(language: PdfLanguage) {
  if (language === "ar") {
    return {
      badge: "G7 WEIGHT LIFECYCLE",
      title: "من الشراء إلى التحضير إلى الطبخ إلى العلبة",
      subtitle:
        "G7 يوضح لك رحلة الوزن كاملة: ماذا تشتري، ماذا يتبقى بعد التحضير، ماذا يدخل الطبخ، ثم ماذا يوضع في العلبة بعد الطبخ.",
      rawTitle: "1. وزن الشراء",
      rawBody:
        "هو الوزن الذي تشتريه من السوق أو السوبر ماركت قبل التنظيف أو التقشير أو الطبخ.",
      prepTitle: "2. وزن التحضير",
      prepBody:
        "هو الوزن بعد التنظيف، التقشير، التقطيع، وإزالة الهالك. هذا هو الوزن العملي الجاهز للوصفة.",
      cookTitle: "3. وزن الطبخ",
      cookBody:
        "هو الوزن الذي يدخل الوصفة أو الباتش قبل الطبخ، ومعه التتبيلة أو مكونات الوصفة حسب الحاجة.",
      portionTitle: "4. وزن التوزيع",
      portionBody:
        "هو الوزن النهائي بعد الطبخ الذي يوضع داخل العلبة بالميزان حسب خريطة تجهيز العلب.",
      resultTitle: "النتيجة",
      resultBody:
        "كل علبة محسوبة حسب هدفك الغذائي. أنت لا تحتاج تحسب من جديد؛ G7 حسبها لك.",
      formula: "وزن شراء · وزن تحضير · وزن طبخ · وزن توزيع داخل العلبة",
      chickenExample: "مثال فراخ: 150 جم قبل الطبخ ≈ 105 جم وقت التوزيع",
      riceExample: "مثال أرز: 45 جم قبل الطبخ ≈ 125 جم وقت التوزيع",
    };
  }

  if (language === "bg") {
    return {
      badge: "G7 WEIGHT LIFECYCLE",
      title: "От покупката до prep, готвене и кутия",
      subtitle:
        "G7 показва целия път на теглото: какво купуваш, какво остава след prep, какво влиза в готвенето и какво отива в кутията.",
      rawTitle: "1. Тегло за покупка",
      rawBody:
        "Теглото, което купуваш от магазина преди почистване, белене, рязане или готвене.",
      prepTitle: "2. Prep тегло",
      prepBody:
        "Теглото след почистване, белене, рязане и премахване на отпадъка.",
      cookTitle: "3. Тегло за готвене",
      cookBody:
        "Теглото, което влиза в рецептата или batch-а преди готвене, включително марината при нужда.",
      portionTitle: "4. Тегло за кутията",
      portionBody:
        "Готовото тегло след готвене, което се поставя в кутията с кантар.",
      resultTitle: "Резултат",
      resultBody:
        "Всяка кутия е изчислена според твоята цел. Не е нужно да преизчисляваш.",
      formula:
        "Тегло за покупка · prep тегло · тегло за готвене · тегло за кутията",
      chickenExample: "Пример пиле: 150g сурово ≈ 105g готово",
      riceExample: "Пример ориз: 45g суров ≈ 125g готов",
    };
  }

  return {
    badge: "G7 WEIGHT LIFECYCLE",
    title: "From shopping to prep, cooking, and container",
    subtitle:
      "G7 shows the full weight journey: what you buy, what remains after prep, what enters the batch, and what goes into the container after cooking.",
    rawTitle: "1. Purchase weight",
    rawBody:
      "The weight you buy from the market before cleaning, peeling, trimming, or cooking.",
    prepTitle: "2. Prep weight",
    prepBody:
      "The weight after cleaning, peeling, trimming, cutting, and removing waste.",
    cookTitle: "3. Cooking input weight",
    cookBody:
      "The weight that enters the recipe or batch before cooking, including marinade when needed.",
    portionTitle: "4. Portioning weight",
    portionBody:
      "The final cooked weight placed inside the container using a scale.",
    resultTitle: "Result",
    resultBody:
      "Each container is calculated around your nutrition goal. No recalculation is needed.",
    formula:
      "Purchase weight · Prep weight · Cooking weight · Portioning weight",
    chickenExample: "Chicken example: 150g raw ≈ 105g cooked portion",
    riceExample: "Rice example: 45g raw ≈ 125g cooked portion",
  };
}

function getNinetyMinutePrepWorkflowText(language: PdfLanguage) {
  if (language === "ar") {
    return {
      badge: "G7 90-MINUTE PREP WORKFLOW",
      title: "في 90 دقيقة حضّر أساس أول 3 أيام",
      subtitle:
        "امشي بالترتيب كأن الشيف واقف معاك: تبّل البروتين، اقسمه، اطبخ أول باتش، حضّر الكارب والصوص والخضار، ثم وزّع بالوزن المطبوخ.",
      promise: "النتيجة: أول 9 علب جاهزة، وهدفك الغذائي موجود داخل العلبة.",
      timelineLabel: "ترتيب التنفيذ",
      batchLabel: "Batch 1 الآن · Batch 2 للفريزر",
      steps: [
        [
          "00–10",
          "تبّل لحمة الأسبوع",
          "اخلط اللحمة مع الطماطم، الفلفل، البصل، الملح، الفلفل والقرفة. خلّي الخليط في طبق كبير.",
        ],
        [
          "10–20",
          "تبّل فراخ الأسبوع",
          "اخلط الفراخ المفرومة مع خلطة G7، البصل، الثوم، البابريكا، الأوريجانو، الملح والفلفل.",
        ],
        [
          "20–25",
          "اقسم البروتين",
          "خذ كمية الأيام 1–3 للطبخ الآن. جزء الأيام 4–6 يدخل الفريزر فورًا للتحضير الثاني.",
        ],
        [
          "25–55",
          "اطبخ بروتين Batch 1",
          "شكّل الفراخ واللحمة حسب الوجبات: كفتة، كرات باستا، حواوشي، كاساديا أو برجر.",
        ],
        [
          "55–70",
          "حضّر كارب Batch 1",
          "اطبخ كارب المرحلة فقط: أرز، مكرونة أو بطاطس. الخبز والتورتيلا يستخدموا كما هم.",
        ],
        [
          "70–80",
          "حضّر Sauce Engine",
          "جهّز صوص الطماطم G7 وصوص الزبادي G7. خلي الصوص منفصل للحفاظ على الطعم والقوام.",
        ],
        [
          "80–85",
          "جهّز Fresh Engine",
          "اغسل وقطّع الخضار وخزّنه منفصلًا: سلطة، خس، طماطم، خيار، فلفل وبقدونس.",
        ],
        [
          "85–90",
          "افتح خريطة تجهيز العلب",
          "وزّع بالوزن المطبوخ داخل العلب. لا توزّع بالوزن النيء. G7 حسبها لك.",
        ],
      ],
      footer:
        "لا تبدأ من صفحات الوصفات. ابدأ من هذا الـ Workflow، ثم استخدم خريطة تجهيز العلب فقط أثناء تجهيز العلب.",
    };
  }

  if (language === "bg") {
    return {
      badge: "G7 90-MINUTE PREP WORKFLOW",
      title: "Подготви базата за първите 3 дни за 90 минути",
      subtitle:
        "Следвай реда като в кухня с chef guidance: овкуси протеина, раздели го, сготви първия batch, подготви въглехидратите, соса и зеленчуците, после разпредели по готово тегло.",
      promise:
        "Резултат: първите 9 кутии са готови, а хранителната цел е вътре в кутията.",
      timelineLabel: "Ред на работа",
      batchLabel: "Batch 1 сега · Batch 2 във фризера",
      steps: [
        [
          "00–10",
          "Овкуси телешкото",
          "Смеси телешката кайма с домат, чушка, лук, сол, черен пипер и канела.",
        ],
        [
          "10–20",
          "Овкуси пилешкото",
          "Смеси мляното пилешко с G7 подправки, лук, чесън, червен пипер, риган, сол и пипер.",
        ],
        [
          "20–25",
          "Раздели протеина",
          "Вземи количеството за дни 1–3 за готвене сега. Дни 4–6 отиват във фризера.",
        ],
        [
          "25–55",
          "Сготви Batch 1 протеина",
          "Оформи ястията: кофта, паста топчета, хауаши, кесадия или бургер.",
        ],
        [
          "55–70",
          "Подготви Batch 1 въглехидрати",
          "Сготви само въглехидратите за етапа: ориз, паста или картофи.",
        ],
        [
          "70–80",
          "Подготви Sauce Engine",
          "Направи G7 доматен сос и G7 йогурт сос. Дръж соса отделно.",
        ],
        [
          "80–85",
          "Подготви Fresh Engine",
          "Измий и нарежи зеленчуците. Съхранявай ги отделно.",
        ],
        [
          "85–90",
          "Отвори картата за кутиите",
          "Разпредели готовата храна по cooked weight. Не използвай raw weight за кутиите.",
        ],
      ],
      footer:
        "Не започвай от рецептите. Започни от този workflow, после използвай portion map при сглобяване.",
    };
  }

  return {
    badge: "G7 90-MINUTE PREP WORKFLOW",
    title: "Prep the first 3 days in 90 minutes",
    subtitle:
      "Follow the order like a chef is standing with you: season protein, split it, cook Batch 1, prep carbs, sauces, and vegetables, then portion by cooked weight.",
    promise:
      "Result: the first 9 containers are ready, and your nutrition goal is inside the container.",
    timelineLabel: "Execution order",
    batchLabel: "Batch 1 now · Batch 2 to freezer",
    steps: [
      [
        "00–10",
        "Season the weekly beef",
        "Mix beef with tomato, pepper, onion, salt, black pepper, and cinnamon. Keep it in one large bowl.",
      ],
      [
        "10–20",
        "Season the weekly chicken",
        "Mix minced chicken with G7 spices, onion, garlic, paprika, oregano, salt, and black pepper.",
      ],
      [
        "20–25",
        "Split the protein",
        "Take days 1–3 for cooking now. Freeze days 4–6 immediately for the second prep.",
      ],
      [
        "25–55",
        "Cook Batch 1 protein",
        "Shape the chicken and beef for the meals: kofta, pasta balls, hawawshi, quesadilla, or burger.",
      ],
      [
        "55–70",
        "Prep Batch 1 carbs",
        "Cook only this batch carbs: rice, pasta, or potatoes. Bread and tortillas are used as written.",
      ],
      [
        "70–80",
        "Prep Sauce Engine",
        "Make G7 tomato sauce and G7 yogurt sauce. Keep sauces separate for better texture.",
      ],
      [
        "80–85",
        "Prep Fresh Engine",
        "Wash and cut vegetables. Store salad, lettuce, tomato, cucumber, peppers, and parsley separately.",
      ],
      [
        "85–90",
        "Open the Portion Map",
        "Portion cooked food into containers. Do not portion cooked food using raw weight. G7 calculated it for you.",
      ],
    ],
    footer:
      "Do not start from the recipe pages. Start with this workflow, then use the Portion Map while assembling.",
  };
}

function formatMacroDelta(diff: number, language: PdfLanguage) {
  const amount = formatGrams(Math.abs(diff), language);

  if (language === "ar") {
    return diff > 0 ? `زيادة ${amount}` : `أقل ${amount}`;
  }

  if (language === "bg") {
    return diff > 0 ? `+${amount} над` : `${amount} под`;
  }

  return diff > 0 ? `+${amount} over` : `${amount} under`;
}

function getDisplayMealTitle(meal: Meal, language: PdfLanguage) {
  const translated = translateMealTitle(meal.id, meal.title, language);

  if (language === "en") return translated;

  const arabicTitles: Record<string, string> = {
    "Morning Power Eggs": "بيض صباحي عالي البروتين",
    "Street Grill Chicken Kofta Bowl": "كفتة فراخ جريل مع أرز",
    "Egyptian Beef Power Plate": "طبق كفتة لحمة",
    "Creamy Muscle Oats": "شوفان بروتين كريمي",
    "Italian Chicken Meatball Pasta": "باستا كرات الفراخ الإيطالية",
    "Recovery Kofta Pasta": "باستا كفتة للريكافري",
    "Street Style Eggs & Potato": "بيض وبطاطس بطابع ستريت",
    "Chicken Quesadilla Street Fit": "كاساديا فراخ لايت",
    "Lean Egyptian Hawawshi": "حواوشي مصري لايت",
    "Fast Fuel Protein Shake": "شيك بروتين سريع",
    "Creamy Pink Chicken Pasta": "باستا فراخ بالصوص البينك",
    "Mediterranean Tuna Pasta": "باستا تونة متوسطية",
    "Lean Morning Omelette": "أومليت صباحي لايت",
    "Lean Smash Chicken Burger": "برجر فراخ لايت",
    "Recovery Beef Kofta Bowl": "كفتة لحمة للريكافري",
    "Chocolate Recovery Oats": "شوفان شوكولاتة بالبروتين",
    "Smoky Chicken Fajita Bowl": "فاهيتا فراخ مدخنة",
    "High Protein Tuna Melt Wrap": "راب تونة عالي البروتين",
    "Cairo Shakshuka Power Eggs": "شكشوكة بروتين",
    "Tuna Tomato Rice Reset": "تونة بالطماطم والأرز",
    "Lemon Herb Fish Reset Plate": "سمك ليمون وأعشاب",
  };

  const bulgarianTitles: Record<string, string> = {
    "Morning Power Eggs": "Сутрешни силови яйца",
    "Street Grill Chicken Kofta Bowl": "Пилешка кофта с ориз басмати",
    "Egyptian Beef Power Plate": "Египетска телешка силова чиния",
    "Creamy Muscle Oats": "Протеинов овес",
    "Italian Chicken Meatball Pasta": "Пилешка паста",
    "Recovery Kofta Pasta": "Паста с телешка кофта",
    "Street Style Eggs & Potato": "Яйца с картофи",
    "Chicken Quesadilla Street Fit": "Фит пилешка кесадия",
    "Lean Egyptian Hawawshi": "Лек египетски хауаши",
    "Fast Fuel Protein Shake": "Бърз протеинов шейк",
    "Creamy Pink Chicken Pasta": "Кремообразна розова паста с пилешко",
    "Mediterranean Tuna Pasta": "Средиземноморска паста с риба тон",
    "Lean Morning Omelette": "Лек сутрешен омлет",
    "Lean Smash Chicken Burger": "Лек пилешки бургер",
    "Recovery Beef Kofta Bowl": "Възстановяваща телешка кофта с ориз",
    "Chocolate Recovery Oats": "Шоколадов протеинов овес",
    "Smoky Chicken Fajita Bowl": "Опушена пилешка фахита купа",
    "High Protein Tuna Melt Wrap": "Рап с риба тон",
    "Cairo Shakshuka Power Eggs": "Шакшука с яйца",
    "Tuna Tomato Rice Reset": "Риба тон с домат и ориз",
    "Lemon Herb Fish Reset Plate": "Риба с лимон",
  };

  if (language === "ar") {
    return hasLatinText(translated)
      ? (arabicTitles[meal.title] ?? translated)
      : translated;
  }

  if (language === "bg") {
    return hasLatinText(translated) && bulgarianTitles[meal.title]
      ? bulgarianTitles[meal.title]
      : translated;
  }

  return translated;
}

function isColdOrSweetFatContext(value?: string) {
  const key = (value ?? "").toLowerCase();

  return (
    key.includes("oat") ||
    key.includes("shake") ||
    key.includes("smoothie") ||
    key.includes("شوفان") ||
    key.includes("شيك") ||
    key.includes("овес") ||
    key.includes("шейк")
  );
}

function getHealthyFatDisplayName(
  language: PdfLanguage,
  mealContext?: string,
  mode: "meal" | "shopping" = "meal",
) {
  const isColdOrSweet = isColdOrSweetFatContext(mealContext);

  if (mode === "shopping") {
    if (language === "ar") return "زيت زيتون أو بخاخ طبخ";
    if (language === "bg") return "Зехтин или спрей за готвене";
    return "Olive oil or cooking spray";
  }

  if (isColdOrSweet) {
    if (language === "ar") return "دهون محسوبة حسب الخطة";
    if (language === "bg") return "Планиран източник на мазнини";
    return "Planned healthy fat option";
  }

  if (language === "ar") return "زيت زيتون أو بخاخ طبخ";
  if (language === "bg") return "Зехтин или спрей за готвене";
  return "Olive oil or cooking spray";
}

function getDisplayIngredientName(
  ingredient: string,
  language: PdfLanguage,
  mealId?: string,
  context?: "raw" | "cooked",
) {
  if (ingredient === "Healthy Fat Source") {
    return getHealthyFatDisplayName(language, mealId);
  }

  const translated = translateIngredientName(
    ingredient,
    language,
    mealId,
    context,
  );

  if (language === "en") return translated;

  const arabicIngredients: Record<string, string> = {
    "Egg Whites": "جبنة قريش",
    "Whole Eggs": "بيض كامل",
    "Whole Egg": "بيضة كاملة",
    "Tomato & Cucumber": "طماطم وخيار",
    "Whole Wheat Bread": "عيش حبوب كاملة",
    "Chicken Breast": "صدور دجاج",
    "Chicken Breast Raw": "صدور دجاج وزن نيء",
    "Chicken Breast Core Raw": "قاعدة دجاج وزن نيء",
    "Lean Minced Beef": "لحمة مفرومة قليلة الدهون",
    "Lean Minced Beef Raw": "لحمة مفرومة قليلة الدهون وزن نيء",
    "Lean Beef Core Raw": "قاعدة لحمة قليلة الدهون وزن نيء",
    "Lean Beef": "لحمة قليلة الدهون",
    "Basmati Rice": "أرز بسمتي",
    "Basmati Rice Raw": "أرز بسمتي وزن نيء",
    "Green Salad": "سلطة خضراء",
    "Cucumber Yogurt Sauce": "صوص زبادي جي سفن بالخيار",
    "Light Tahini Sauce": "صوص طحينة لايت",
    "Whey Protein": "جبنة قريش",
    Oats: "شوفان",
    Cinnamon: "قرفة",
    Banana: "موز",
    "Whole Wheat Penne": "مكرونة بيني حبوب كاملة",
    "Whole Wheat Penne Raw": "مكرونة بيني حبوب كاملة وزن نيء",
    Pasta: "مكرونة",
    "Pasta Raw": "مكرونة وزن نيء",
    "Green Pepper": "فلفل أخضر",
    "Tomato Sauce": "صوص طماطم",
    Parsley: "بقدونس",
    Potato: "بطاطس",
    "Potato Raw": "بطاطس وزن نيء",
    "Bell Pepper": "فلفل رومي",
    "Whole Wheat Tortilla": "تورتيلا حبوب كاملة",
    "Green Pepper & Coriander": "فلفل أخضر وكزبرة",
    "Light Mozzarella": "موتزاريلا لايت",
    "Baladi Bread": "عيش بلدي",
    Pickles: "مخلل",
    "Water or Low-Fat Milk": "ماء أو لبن قليل الدسم",
    "Mushroom or Pepper": "مشروم أو فلفل",
    "Light Pink Sauce": "صوص بينك جي سفن (طماطم + زبادي)",
    "Tuna in Water": "تونة بالماء",
    "Mushroom & Pepper": "مشروم وفلفل",
    "Brown Burger Bun": "عيش برجر بني",
    "Lettuce & Tomato": "خس وطماطم",
    "Light Burger Sauce": "صوص زبادي جي سفن للبرجر",
    "Yogurt Sauce": "صوص زبادي جي سفن",
    "Sweet Potato": "بطاطا",
    "Sweet Potato Raw": "بطاطا وزن نيء",
    "Fajita Sauce": "جواكامولي البسلة جي سفن أو صوص زبادي جي سفن",
    "Colored Peppers & Red Onion": "فلفل ألوان وبصل أحمر",
    "Light Yogurt Sauce": "صوص زبادي جي سفن لايت",
    "Cocoa Powder": "كاكاو بودرة",
    "Fish Fillet": "فيليه سمك",
    "Fish Fillet Raw": "فيليه سمك وزن نيء",
    "Lemon Herb Marinade": "تتبيلة ليمون وأعشاب",
    "Healthy Fat Source": "زيت زيتون أو بخاخ طبخ",
    "Cottage Cheese": "جبنة قريش",
    "G7 Tomato Sauce Engine": "صوص طماطم G7",
    "G7 Yogurt Spice Sauce": "صوص زبادي جي سفن بخلطة G7",
    "G7 Green Pea Guacamole": "جواكامولي البسلة G7",
  };

  const bulgarianIngredients: Record<string, string> = {
    "Healthy Fat Source": "Зехтин или спрей за готвене",
    "Egg Whites": "Котидж сирене",
    "Whole Eggs": "Цели яйца",
    "Whole Egg": "цяло яйце",
    "Tomato & Cucumber": "Домат и краставица",
    "Whole Wheat Bread": "Пълнозърнест хляб",
    "Chicken Breast": "Пилешки гърди",
    "Chicken Breast Raw": "Сурови пилешки гърди",
    "Chicken Breast Core Raw": "Сурова база от пилешки гърди",
    "Lean Minced Beef": "Постна телешка кайма",
    "Lean Minced Beef Raw": "Сурова постна телешка кайма",
    "Lean Beef Core Raw": "Сурова база от постно телешко",
    "Lean Beef": "Постно телешко",
    "Basmati Rice": "Ориз басмати",
    "Basmati Rice Raw": "Суров ориз басмати",
    "Green Salad": "Зелена салата",
    "Cucumber Yogurt Sauce": "Йогурт сос с краставица",
    "Light Tahini Sauce": "Лек таханов сос",
    "Whey Protein": "Котидж сирене",
    Oats: "Овесени ядки",
    Cinnamon: "Канела",
    Banana: "Банан",
    "Whole Wheat Penne": "Пълнозърнеста пене паста",
    "Whole Wheat Penne Raw": "Сурова пълнозърнеста пене паста",
    Pasta: "Паста",
    "Pasta Raw": "Сурова паста",
    "Green Pepper": "Зелена чушка",
    "Tomato Sauce": "Доматен сос",
    Parsley: "Магданоз",
    Potato: "Картофи",
    "Potato Raw": "Сурови картофи",
    "Bell Pepper": "Чушка",
    "Whole Wheat Tortilla": "Пълнозърнеста тортила",
    "Green Pepper & Coriander": "Зелена чушка и кориандър",
    "Light Mozzarella": "Лека моцарела",
    "Baladi Bread": "Балади хляб",
    Pickles: "Кисели краставички",
    "Water or Low-Fat Milk": "Вода или нискомаслено мляко",
    "Mushroom or Pepper": "Гъби или чушка",
    "Mushroom & Pepper": "Гъби и чушка",
    "Light Pink Sauce": "Лек розов сос",
    "Tuna in Water": "Риба тон във вода",
    "Brown Burger Bun": "Пълнозърнеста бургер питка",
    "Lettuce & Tomato": "Маруля и домат",
    "Light Burger Sauce": "Лек бургер сос",
    "Yogurt Sauce": "Йогурт сос",
    "Sweet Potato": "Сладък картоф",
    "Sweet Potato Raw": "Суров сладък картоф",
    "Fajita Sauce": "Фахита сос",
    "Colored Peppers & Red Onion": "Цветни чушки и червен лук",
    "Light Yogurt Sauce": "Лек йогурт сос",
    "Cocoa Powder": "Какао на прах",
    "Fish Fillet": "Рибно филе",
    "Fish Fillet Raw": "Сурово рибно филе",
    "Lemon Herb Marinade": "Марината с лимон и билки",
    "Cottage Cheese": "Котидж сирене",
    "G7 Tomato Sauce Engine": "G7 доматен сос",
    "G7 Yogurt Spice Sauce": "G7 йогурт сос с подправки",
    "G7 Green Pea Guacamole": "G7 гуакамоле от зелен грах",
  };

  const map = language === "ar" ? arabicIngredients : bulgarianIngredients;
  const direct = map[ingredient];
  if (direct) return direct;

  return hasLatinText(translated) && map[translated]
    ? map[translated]
    : translated;
}

function getWhatYouGetItems(language: PdfLanguage) {
  if (language === "bg") {
    return [
      "7 дни",
      "21 ястия",
      "Списък за пазаруване",
      "Стъпки за готвене",
      "Макро цели",
      "Оценка на цена",
    ];
  }

  if (language === "ar") {
    return [
      "7 أيام",
      "21 وجبة",
      "قائمة المشتريات",
      "خطوات الطبخ",
      "أهداف الماكروز",
      "تقدير التكلفة",
    ];
  }

  return [
    "7 Days",
    "21 Meals",
    "Shopping List",
    "Cooking Steps",
    "Macro Targets",
    "Cost Estimate",
  ];
}

function getBatchCards(language: PdfLanguage) {
  if (language === "bg") {
    return [
      ["Подготовка 1", "Ден 1–3", "Сготви първите 3 дни наведнъж"],
      ["Подготовка 2", "Ден 4–6", "Сготви дни 4–6 наведнъж"],
      ["Ден 7", "Лек ден", "Тон / риба / по-лека подготовка"],
    ];
  }

  if (language === "ar") {
    return [
      ["تحضير 1", "اليوم 1–3", "حضّر أول 3 أيام مرة واحدة"],
      ["تحضير 2", "اليوم 4–6", "حضّر الأيام 4–6 مرة واحدة"],
      ["اليوم 7", "يوم خفيف", "تونة / سمك / يوم أخف"],
    ];
  }

  return [
    ["Batch 1", "Day 1–3", "Cook the first 3 days once"],
    ["Batch 2", "Day 4–6", "Cook days 4–6 once"],
    ["Day 7", "Light Day", "Tuna / fish / lighter prep"],
  ];
}

function getStartGuideSteps(language: PdfLanguage) {
  if (language === "bg") {
    return [
      [
        "01",
        "Провери дневните си цели",
        "Провери калориите, протеина и въглехидратите на корицата, преди да започнеш.",
      ],
      [
        "02",
        "Пазарувай от списъка",
        "Използвай списъка в началото на файла и купи само продуктите, които липсват.",
      ],
      [
        "03",
        "Подготви протеина",
        "Овкуси протеина за седмицата, после го раздели: част за дни 1–3 и част за дни 4–6.",
      ],
      [
        "04",
        "Сготви първия етап",
        "Подготви въглехидратите и сосовете за първите 3 дни, после раздели първите 9 кутии.",
      ],
      [
        "05",
        "Запази втория етап",
        "Сложи протеина за дни 4–6 във фризера и го премести в хладилника преди втората подготовка.",
      ],
      [
        "06",
        "Нужна е корекция?",
        "Ако целта, теглото или активността се променят, изпрати актуализация за корекция.",
      ],
    ];
  }

  if (language === "ar") {
    return [
      [
        "01",
        "راجع أرقامك",
        "تأكد من السعرات والبروتين والكارب في صفحة الغلاف.",
      ],
      [
        "02",
        "اشتري المكونات",
        "افتح قائمة المشتريات في بداية الملف واشترِ الناقص فقط.",
      ],
      [
        "03",
        "حضّر البروتين",
        "تبّل بروتين الأسبوع، ثم اقسمه: جزء للأيام 1–3 وجزء للأيام 4–6.",
      ],
      [
        "04",
        "اطبخ المرحلة الأولى",
        "حضّر كارب وصوص المرحلة الأولى، ثم قسّم أول 9 وجبات في علب.",
      ],
      [
        "05",
        "احفظ المرحلة الثانية",
        "ضع بروتين الأيام 4–6 في الفريزر، وانقله للثلاجة قبل التحضير الثاني.",
      ],
      [
        "06",
        "تعديل الأرقام",
        "لو هدفك أو وزنك أو نشاطك اتغير، ابعت التحديث لتعديل الخطة.",
      ],
    ];
  }

  return [
    [
      "01",
      "Check your daily targets",
      "Check calories, protein, and carbs on the cover before you start.",
    ],
    [
      "02",
      "Shop from the list",
      "Use the shopping list near the beginning and buy only what is missing.",
    ],
    [
      "03",
      "Prepare the protein",
      "Season the weekly protein, then split it: one part for days 1–3 and one part for days 4–6.",
    ],
    [
      "04",
      "Cook the first batch",
      "Prepare the carbs and sauces for the first 3 days, then portion the first 9 containers.",
    ],
    [
      "05",
      "Store the second batch",
      "Freeze the days 4–6 protein and move it to the fridge before the second prep.",
    ],
    [
      "06",
      "Need an adjustment?",
      "If your goal, weight, or activity changes, send an update so the plan can be adjusted.",
    ],
  ];
}

function getPrepEngineText(language: PdfLanguage) {
  if (language === "bg") {
    return {
      badge: "G7 PREP ENGINE",
      title: "21 кутии храна от една умна подготовка",
      subtitle:
        "G7 не те кара да готвиш всяко ястие от нулата. Системата подготвя основните компоненти веднъж, после променя вкуса, соса, въглехидрата и начина на сглобяване.",
      magicLine:
        "G7 не повтаря храната. G7 повтаря умната подготовка и променя преживяването.",
      proteinTitle: "Протеинов двигател",
      proteinBody:
        "Подготви основния протеин веднъж: постна телешка кайма и мляно пилешко филе. От една база можеш да направиш кофта, паста, бургер, хауаши, кесадия или bowl.",
      proteinFormula: "1.2kg телешка кайма + 1600g мляно пилешко филе",
      beefMixTitle: "Основна телешка смес",
      beefMixBody:
        "Телешка кайма + домат + зелена чушка + червен лук + сол + черен пипер + щипка канела. Смели зеленчуците и подправките, смеси с месото и раздели по порции.",
      carbTitle: "Двигател за въглехидрати",
      carbBody:
        "Ориз, паста, картофи, тортила или хляб се разпределят според целта. Така всяка кутия има точни въглехидрати, без случайни порции.",
      sauceTitle: "Двигател за сосове",
      sauceBody:
        "В следващите седмици сосовете могат да станат главният двигател: тахан, йогурт, доматен сос, розов сос, бургер сос, фахита и мексикански стил.",
      futureTitle: "Следващи седмици",
      futureBody:
        "Седмица може да бъде Protein Engine. Друга седмица може да бъде Sauce Engine. Трета може да бъде Carb Engine. Това прави G7 система, не просто PDF.",
      containerTitle: "Седмични food containers",
      containerSub:
        "Всяка кутия е част от системата: роля, протеин, въглехидрат и вкус.",
    };
  }

  if (language === "ar") {
    return {
      badge: "طريقة تحضير G7",
      title: "تحضير بسيط… ووجبات أسبوع كاملة",
      subtitle:
        "الفكرة ليست طبخ كل وجبة من الصفر. حضّر القواعد الأساسية، ثم ركّب وجباتك بسهولة حسب الجدول.",
      magicLine: "حضّر أقل، رتّب أكثر، والتزم بسهولة طوال الأسبوع.",
      proteinTitle: "تحضير البروتين",
      proteinBody:
        "تبّل بروتين الأسبوع مرة واحدة، ثم اقسمه فورًا: جزء للأيام 1–3 للطبخ، وجزء للأيام 4–6 يدخل الفريزر للتحضير الثاني.",
      proteinFormula: "لحمة الأسبوع + فراخ الأسبوع",
      beefMixTitle: "خلطة اللحمة الأساسية",
      beefMixBody:
        "لحمة مفرومة + طماطم + فلفل أخضر رومي + بصل أحمر + ملح + فلفل أسود + رشة قرفة. اخلط الخضار والتوابل في محضّر الطعام، ثم امزجها مع اللحمة وقسّم الخليط حسب الوجبات.",
      carbTitle: "تقسيم الكارب",
      carbBody:
        "الأرز، الباستا، البطاطس، التورتيلا أو العيش يتم تقسيمهم حسب هدفك، بحيث تحتوي كل علبة على كمية كارب محسوبة.",
      sauceTitle: "تنويع الصوص",
      sauceBody:
        "في أسابيع أخرى يمكن أن يكون الصوص هو محرك التنويع الأساسي: طحينة لايت، زبادي وخيار، صوص طماطم، صوص بينك، برجر لايت، فاهيتا ومكسيكان.",
      futureTitle: "قاعدة الأمان",
      futureBody:
        "لا تترك بروتين الأسبوع كله نيّ في الثلاجة. الجزء الخاص بالأيام 4–6 يدخل الفريزر مباشرة، ثم ينتقل للثلاجة قبل التحضير الثاني.",
      containerTitle: "أسبوعك في 21 وجبة",
      containerSub:
        "كل يوم يحتوي على فطار وغداء وعشاء. هذه الصفحة تعطيك نظرة كاملة قبل الدخول في تفاصيل الطبخ.",
    };
  }

  return {
    badge: "G7 PREP ENGINE",
    title: "21 food containers from one smart prep",
    subtitle:
      "G7 does not make you cook every meal from scratch. The system prepares the core components once, then changes the flavor, sauce, carb, and assembly method.",
    magicLine:
      "G7 does not repeat food. G7 repeats smart prep and changes the experience.",
    proteinTitle: "Protein Engine",
    proteinBody:
      "Prep the core protein once: lean minced beef and minced chicken breast. From the same base you can create kofta, pasta, burger, hawawshi, quesadilla, or bowls.",
    proteinFormula: "1.2kg lean minced beef + 1600g minced chicken breast",
    beefMixTitle: "Ground Beef Flavor Mix",
    beefMixBody:
      "Minced beef + tomato + green bell pepper + red onion + salt + black pepper + a touch of cinnamon. Blend the vegetables and spices, mix with beef, then portion across meals.",
    carbTitle: "Carb Engine",
    carbBody:
      "Rice, pasta, potatoes, tortilla, or bread are portioned around your target. Every container gets calculated carbs without random portions.",
    sauceTitle: "Sauce Engine",
    sauceBody:
      "In future weeks, sauces can become the main engine: light tahini, cucumber yogurt, tomato sauce, pink sauce, burger sauce, fajita, and Mexican style.",
    futureTitle: "Future G7 weeks",
    futureBody:
      "One week can be Protein Engine. Another week can be Sauce Engine. A third week can be Carb Engine. That makes G7 a food operating system, not just a PDF.",
    containerTitle: "Weekly food containers",
    containerSub:
      "Each container has a role: protein, carb, sauce, and a different eating experience.",
  };
}

function getFoodContainerRole(role: Meal["role"], language: PdfLanguage) {
  if (language === "bg") {
    if (role === "BREAKFAST") return "Енергия";
    if (role === "LUNCH") return "Активно";
    return "Възстановяване";
  }

  if (language === "ar") {
    if (role === "BREAKFAST") return "طاقة";
    if (role === "LUNCH") return "نشاط";
    return "ريكافري";
  }

  if (role === "BREAKFAST") return "Energy";
  if (role === "LUNCH") return "Active";
  return "Recovery";
}

function getMealNumberLabel(index: number, language: PdfLanguage) {
  if (language === "bg") return `Кутия ${index + 1}`;
  if (language === "ar") return `علبة ${index + 1}`;
  return `Container ${index + 1}`;
}

function getRoleDisplay(role: Meal["role"], language: PdfLanguage) {
  if (language === "bg") {
    if (role === "BREAKFAST") return "ЗАКУСКА";
    if (role === "LUNCH") return "ОБЯД";
    return "ВЕЧЕРЯ";
  }

  if (language === "ar") {
    if (role === "BREAKFAST") return "فطار";
    if (role === "LUNCH") return "غداء";
    return "عشاء";
  }

  return role;
}

function getShoppingAmount(item: GrocerySummaryItem, language: PdfLanguage) {
  if (item.name === "Cottage Cheese") {
    if (language === "ar") return "1.5 كجم تقريبًا";
    if (language === "bg") return "около 1.5kg";
    return "about 1.5kg";
  }

  if (item.name === "G7 Tomato Sauce Engine") {
    if (language === "ar")
      return "طماطم + بصل أصفر + ثوم + أوريجانو + زيت زيتون";
    if (language === "bg") return "домати + лук + чесън + риган + зехтин";
    return "tomatoes + onion + garlic + oregano + olive oil";
  }

  if (item.name === "G7 Yogurt Spice Sauce") {
    if (language === "ar") return "زبادي + ليمون + خلطة G7";
    if (language === "bg") return "йогурт + лимон + G7 spice mix";
    return "yogurt + lemon + G7 spice mix";
  }

  if (item.name === "G7 Green Pea Guacamole") {
    if (language === "ar")
      return "اختياري: بسلة + ليمون + بصل أحمر + طماطم + كزبرة";
    if (language === "bg")
      return "по избор: грах + лимон + червен лук + домат + кориандър";
    return "optional: peas + lemon + red onion + tomato + coriander";
  }

  if (item.name === "Light Tahini Sauce") {
    if (language === "ar") return "اختياري: كمية صغيرة";
    if (language === "bg") return "по избор: малко количество";
    return "optional: small amount";
  }

  const cleaned = cleanDisplayAmount(item.amount, language);

  if (language === "en" && item.name === "Whole Wheat Tortilla") {
    const wrapMatches = Array.from(cleaned.matchAll(/(\d+)\s+medium wraps?/gi));
    const gramMatches = Array.from(cleaned.matchAll(/(\d+(?:\.\d+)?)g/gi));
    const wraps = wrapMatches.reduce(
      (total, match) => total + Number(match[1]),
      0,
    );
    const grams = Math.round(
      gramMatches.reduce((total, match) => total + Number(match[1]), 0),
    );

    if (wraps > 0 && grams > 0) return `${wraps} medium wraps + ${grams}g`;
    if (wraps > 0) return `${wraps} medium wraps`;
    if (grams > 0) return `${grams}g`;
  }

  if (language === "ar" && item.name === "Whole Wheat Bread") {
    return cleaned.replace(/3 شريحة/g, "3 شرائح");
  }

  return cleaned;
}

function getShoppingIngredientName(ingredient: string, language: PdfLanguage) {
  if (ingredient === "Healthy Fat Source") {
    return getHealthyFatDisplayName(language, undefined, "shopping");
  }

  return getDisplayIngredientName(ingredient, language);
}

function getEgyptMarketMealIngredientName(
  name: string,
  language: PdfLanguage,
  mealId?: string,
) {
  const lower = name.toLowerCase();
  if (lower.includes("egg white") || lower.includes("whey protein")) {
    return getDisplayIngredientName("Cottage Cheese", language, mealId);
  }
  return getDisplayIngredientName(name, language, mealId, "raw");
}

function getEgyptMarketMealIngredientAmount(
  name: string,
  amount: string,
  language: PdfLanguage,
) {
  const lower = name.toLowerCase();
  if (lower.includes("egg white")) return cleanDisplayAmount(amount, language);

  if (lower.includes("whey protein")) {
    const normalized = normalizeIngredient(name, amount);
    let grams = 150;
    if (normalized.amount.type === "scoops")
      grams = normalized.amount.value * 150;
    if (normalized.amount.type === "grams") grams = normalized.amount.value * 2;
    if (normalized.amount.type === "text") {
      const scoopMatch = normalized.amount.value.match(
        /(\d+(?:\.\d+)?)\s*scoop/i,
      );
      const gramMatch = normalized.amount.value.match(/(\d+(?:\.\d+)?)\s*g/i);
      grams =
        (scoopMatch ? Number(scoopMatch[1]) * 150 : 150) +
        (gramMatch ? Number(gramMatch[1]) * 2 : 0);
    }
    return formatGrams(roundToNearest(grams, 10), language);
  }

  return cleanDisplayAmount(amount, language);
}

function getCategoryLabel(category: string, language: PdfLanguage) {
  const labels: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      PROTEINS: "البروتين",
      CARBS: "الكارب",
      SAUCES: "الصوصات والإضافات",
      VEGETABLES: "الخضار",
      EXTRAS: "إضافات",
    },
    en: {
      PROTEINS: "Proteins",
      CARBS: "Carbs",
      SAUCES: "Sauces & Extras",
      VEGETABLES: "Vegetables",
      EXTRAS: "Extras",
    },
    bg: {
      PROTEINS: "Протеини",
      CARBS: "Въглехидрати",
      SAUCES: "Сосове и добавки",
      VEGETABLES: "Зеленчуци",
      EXTRAS: "Допълнения",
    },
  };

  return labels[language][category] ?? category;
}

function getMacroUiText(language: PdfLanguage) {
  if (language === "bg") {
    return {
      actual: "Реално",
      coachTarget: "Цел от треньора",
      onTarget: "В целта",
      over: "над",
      under: "под",
    };
  }

  if (language === "ar") {
    return {
      actual: "الفعلي",
      coachTarget: "هدف الكوتش",
      onTarget: "مظبوط",
      over: "زيادة",
      under: "أقل",
    };
  }

  return {
    actual: "Actual",
    coachTarget: "Coach Target",
    onTarget: "On Target",
    over: "over",
    under: "under",
  };
}

function getBestReheatLabel(value: string, language: PdfLanguage) {
  const clean = value === "air_fryer" ? "air fryer" : value;

  if (language === "ar") {
    const map: Record<string, string> = {
      pan: "طاسة",
      microwave: "ميكروويف",
      oven: "فرن",
      "air fryer": "إير فراير",
    };
    return map[clean] ?? clean;
  }

  if (language === "bg") {
    const map: Record<string, string> = {
      pan: "тиган",
      microwave: "микровълнова",
      oven: "фурна",
      "air fryer": "еър фрайър",
    };
    return map[clean] ?? clean;
  }

  return clean;
}

function getTranslatedIntelligence(
  mealId: string,
  language: PdfLanguage,
  mealTranslation: ReturnType<typeof getMealTranslation>,
) {
  const intelligence = getMealIntelligenceNote(mealId);

  if (!intelligence) return null;

  if (language === "ar") {
    return {
      flavorBase: mealTranslation?.title ?? "هوية طعم محسوبة من G7",
      yieldNote:
        mealTranslation?.chefNote ??
        "ملاحظة شيف تساعدك تحافظ على الطعم والقوام أثناء تحضير الأسبوع.",
      chefTips: [
        mealTranslation?.storageTip ?? "خزّن الوجبة في علبة محكمة بعد أن تبرد.",
        mealTranslation?.reheatMethod ??
          "سخّن الوجبة بهدوء للحفاظ على الطعم والقوام.",
      ],
      storageNote:
        mealTranslation?.storageTip ??
        "خزّن الوجبة في الثلاجة داخل علبة محكمة، وافصل الصوص عند الحاجة للحفاظ على القوام.",
      bestReheat:
        intelligence.bestReheat === "air_fryer"
          ? "air fryer"
          : intelligence.bestReheat,
    };
  }

  if (language === "bg") {
    return {
      flavorBase: mealTranslation?.title ?? "Вкусова идентичност от G7",
      yieldNote:
        mealTranslation?.chefNote ??
        "Бележка от шефа за вкус, текстура и стабилна седмична подготовка.",
      chefTips: [
        mealTranslation?.storageTip ??
          "Съхранявай компонентите правилно, за да запазиш текстурата.",
        mealTranslation?.reheatMethod ??
          "Затопляй внимателно, за да запазиш качеството на ястието.",
      ],
      storageNote:
        mealTranslation?.storageTip ??
        "Съхранявай храната охладена и добре затворена.",
      bestReheat:
        intelligence.bestReheat === "air_fryer"
          ? "air fryer"
          : intelligence.bestReheat,
    };
  }

  return {
    flavorBase: mealTranslation?.title ?? intelligence.flavorBase,
    yieldNote:
      mealTranslation?.chefNote ??
      "Chef note for flavor, texture, and weekly prep consistency.",
    chefTips: [
      mealTranslation?.storageTip ??
        "Store components correctly to preserve texture.",
      mealTranslation?.reheatMethod ??
        "Reheat gently to keep the meal quality high.",
    ],
    storageNote:
      mealTranslation?.storageTip ??
      "Store chilled and sealed for best quality.",
    bestReheat:
      intelligence.bestReheat === "air_fryer"
        ? "air fryer"
        : intelligence.bestReheat,
  };
}

function getDayDisplay(day: string, language: PdfLanguage) {
  const map: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      "Day 1": "اليوم 1",
      "Day 2": "اليوم 2",
      "Day 3": "اليوم 3",
      "Day 4": "اليوم 4",
      "Day 5": "اليوم 5",
      "Day 6": "اليوم 6",
      "Day 7": "اليوم 7",
    },
    en: {
      "Day 1": "Day 1",
      "Day 2": "Day 2",
      "Day 3": "Day 3",
      "Day 4": "Day 4",
      "Day 5": "Day 5",
      "Day 6": "Day 6",
      "Day 7": "Day 7",
    },
    bg: {
      "Day 1": "Ден 1",
      "Day 2": "Ден 2",
      "Day 3": "Ден 3",
      "Day 4": "Ден 4",
      "Day 5": "Ден 5",
      "Day 6": "Ден 6",
      "Day 7": "Ден 7",
    },
  };

  return map[language][day] ?? day;
}

function getClientPlanDescription(
  selectedPlan: PlanKey,
  fallback: string,
  language: PdfLanguage,
) {
  const key = String(selectedPlan).toLowerCase();

  if (language === "ar") {
    if (key.includes("shredding")) {
      return "نظام جيم للتنشيف وحرق الدهون لمدة 7 أيام، مصمم ببروتين عالي للحفاظ على العضلات، كارب محسوب للطاقة، ووجبات واضحة سهلة التنفيذ.";
    }

    if (key.includes("lean_bulk")) {
      return "نظام جيم متوازن لمدة 7 أيام، مناسب لتحسين الشكل والأداء وبناء روتين أكل ثابت حول بروتين واضح وكارب عملي.";
    }

    if (key.includes("mass_gainer")) {
      return "نظام جيم عالي الطاقة لمدة 7 أيام، مصمم لزيادة الكتلة العضلية مع بروتين قوي وكارب أعلى لدعم التمرين والاستشفاء.";
    }

    if (key.includes("budget_athlete")) {
      return "نظام جيم اقتصادي ومرن لمدة 7 أيام، مبني على وجبات عملية ومكونات بسيطة لتحقيق نتيجة واضحة بتكلفة أقل.";
    }

    if (key.includes("premium_chef")) {
      return "نظام جيم بريميوم لمدة 7 أيام، بتجربة شيف أعلى في التنوع والطعم مع نفس منطق البروتين والكارب الخاص بالجيم.";
    }

    return fallback;
  }

  if (language === "en") {
    if (key.includes("shredding")) {
      return "A 7-day gym fat-loss system built with high protein to protect muscle, calculated carbs for training energy, and clear easy prep.";
    }

    if (key.includes("lean_bulk")) {
      return "A balanced 7-day gym system for better shape, better performance, and a consistent real-food routine.";
    }

    if (key.includes("mass_gainer")) {
      return "A high-energy 7-day gym system for muscle gain with strong protein, higher carbs, and practical recovery-focused meals.";
    }

    if (key.includes("budget_athlete")) {
      return "A flexible budget gym system built around simple ingredients, practical meals, and clear results at a lower cost.";
    }

    if (key.includes("premium_chef")) {
      return "A premium chef-style gym system with more flavor, variety, and structure while keeping the protein-and-carb logic clear.";
    }

    return fallback;
  }

  if (language === "bg") {
    if (key.includes("shredding"))
      return "7-дневна gym fat-loss система с висок протеин, изчислени въглехидрати и ясна подготовка.";
    if (key.includes("lean_bulk"))
      return "7-дневна балансирана gym система за форма, performance и стабилен хранителен ритъм.";
    if (key.includes("mass_gainer"))
      return "7-дневна висококалорийна gym система за мускулна маса, тренировка и възстановяване.";
    if (key.includes("budget_athlete"))
      return "7-дневна икономична и гъвкава gym система с прости продукти и практични ястия.";
    if (key.includes("premium_chef"))
      return "7-дневна premium chef gym система с повече вкус, разнообразие и структура.";
  }

  return fallback;
}

function getClientPlanLabel(
  selectedPlan: PlanKey,
  fallback: string,
  language: PdfLanguage,
) {
  const key = String(selectedPlan).toLowerCase();

  if (language === "ar") {
    if (key.includes("shredding")) return "نظام جيم للتنشيف وحرق الدهون";
    if (key.includes("lean_bulk")) return "نظام جيم متوازن";
    if (key.includes("mass_gainer")) return "نظام زيادة كتلة عضلية";
    if (key.includes("budget_athlete")) return "نظام جيم اقتصادي مرن";
    if (key.includes("premium_chef")) return "نظام شيف بريميوم للجيم";
    return fallback;
  }

  if (language === "en") {
    if (key.includes("shredding")) return "Gym Fat-Loss System";
    if (key.includes("lean_bulk")) return "Balanced Gym System";
    if (key.includes("mass_gainer")) return "Muscle Gain System";
    if (key.includes("budget_athlete")) return "Budget Fitness System";
    if (key.includes("premium_chef")) return "Premium Chef Fitness System";
    return fallback;
  }

  if (language === "bg") {
    if (key.includes("shredding")) return "Gym fat-loss система";
    if (key.includes("lean_bulk")) return "Балансирана gym система";
    if (key.includes("mass_gainer")) return "Система за мускулна маса";
    if (key.includes("budget_athlete")) return "Икономична fitness система";
    if (key.includes("premium_chef")) return "Premium chef fitness система";
    return fallback;
  }

  return fallback;
}

function getQuickStartActions(language: PdfLanguage) {
  if (language === "ar") {
    return [
      "افتح قائمة المشتريات واشترِ الناقص فقط.",
      "حضّر بروتين الأسبوع وقسّمه بذكاء.",
      "اطبخ وقسّم وجبات الأيام 1–3 في علب.",
      "احفظ بروتين الأيام 4–6 في الفريزر للتحضير الثاني.",
    ];
  }

  if (language === "bg") {
    return [
      "Отвори списъка за пазаруване и купи само липсващото.",
      "Овкуси протеина за седмицата и го раздели на два етапа.",
      "Сготви и разпредели ястията за дни 1–3 в кутии.",
      "Замрази протеина за дни 4–6 и го премести в хладилника преди втората подготовка.",
    ];
  }

  return [
    "Open the shopping list and buy only what is missing.",
    "Season the weekly protein and split it into two batches.",
    "Cook and portion days 1–3 into containers.",
    "Freeze the days 4–6 protein and thaw it in the fridge before the second prep.",
  ];
}

type EngineDistributionItem = {
  day: string;
  title: string;

  /*
    grams = pure raw protein weight used for macro calculation.
    mixedGrams = approximate seasoned mix weight before cooking, after adding marinade/veg/spices.
  */
  grams: number;
  mixedGrams?: number;
};

type EngineRecipeItem = {
  name: string;
  grams: number;
};

type ProteinEngineSop = {
  title: string;
  subtitle: string;
  totalProtein: number;
  recipeItems: EngineRecipeItem[];
  readyMix: number;
  batch1: number;
  batch2: number;
  day7: number;
  distribution: EngineDistributionItem[];
};

type PrepBatchSummaryItem = {
  name: string;
  total: string;
  batch1: string;
  batch2: string;
  day7: string;
  note: string;
};

type EngineSopSummary = {
  beef: ProteinEngineSop;
  chicken: ProteinEngineSop;
  quickProteins: PrepBatchSummaryItem[];
  carbPrep: PrepBatchSummaryItem[];
  saucePrep: PrepBatchSummaryItem[];
  vegetablePrep: PrepBatchSummaryItem[];
  carbs: GrocerySummaryItem[];
  sauces: GrocerySummaryItem[];
};

function roundToNearest(value: number, nearest = 5) {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.round(value / nearest) * nearest;
}

function formatSopWeight(value: number, language: PdfLanguage) {
  if (!Number.isFinite(value) || value <= 0) {
    return language === "ar" ? "0 جم" : "0g";
  }

  if (value >= 1000) {
    const kg = Math.round((value / 1000) * 100) / 100;
    return language === "ar" ? `${kg} كجم` : `${kg}kg`;
  }

  return language === "ar"
    ? `${Math.round(value)} جم`
    : `${Math.round(value)}g`;
}

function getMealIngredientGrams(meal: Meal, matchers: string[]) {
  return meal.raw.reduce((total, [name, amount]) => {
    const normalized = normalizeIngredient(name, amount);
    const source = `${name} ${normalized.canonicalName}`.toLowerCase();
    const isMatch = matchers.some((matcher) => source.includes(matcher));

    if (!isMatch || normalized.amount.type !== "grams") return total;
    return total + normalized.amount.value;
  }, 0);
}

function buildProteinDistribution(
  groupedMeals: Record<string, Meal[]>,
  matchers: string[],
  language: PdfLanguage,
) {
  const distribution: EngineDistributionItem[] = [];

  Object.entries(groupedMeals).forEach(([day, dayMeals]) => {
    dayMeals.forEach((meal) => {
      const grams = getMealIngredientGrams(meal, matchers);
      if (grams <= 0) return;

      distribution.push({
        day,
        title: getDisplayMealTitle(meal, language),
        grams,
      });
    });
  });

  return distribution;
}

function sumDistributionForDays(
  distribution: EngineDistributionItem[],
  days: string[],
) {
  return distribution.reduce(
    (total, item) => (days.includes(item.day) ? total + item.grams : total),
    0,
  );
}

function sumMixedDistributionForDays(
  distribution: EngineDistributionItem[],
  days: string[],
) {
  return distribution.reduce(
    (total, item) =>
      days.includes(item.day) ? total + (item.mixedGrams ?? item.grams) : total,
    0,
  );
}

function addMixedWeightsToDistribution(
  distribution: EngineDistributionItem[],
  totalProtein: number,
  readyMix: number,
): EngineDistributionItem[] {
  if (!Number.isFinite(totalProtein) || totalProtein <= 0) return distribution;

  const mixFactor = readyMix / totalProtein;

  return distribution.map((item) => ({
    ...item,
    mixedGrams: roundToNearest(item.grams * mixFactor, 5),
  }));
}

function getMixedPortionLabels(language: PdfLanguage) {
  if (language === "ar") {
    return {
      raw: "بروتين خام",
      mixed: "خليط متبل قبل الطبخ",
      note:
        "قسّم الخليط المتبل بالميزان، وليس وزن البروتين الخام وحده. لو التتبيلة طلعت سوائل أثناء الطبخ، اقسم الوزن المطبوخ النهائي على عدد الوجبات.",
    };
  }

  if (language === "bg") {
    return {
      raw: "суров протеин",
      mixed: "овкусена смес преди готвене",
      note:
        "Разделяй овкусената смес с кантар, не само суровия протеин. Ако маринатата пусне течност, сготви batch-а и раздели готовото тегло по броя порции.",
    };
  }

  return {
    raw: "raw protein",
    mixed: "seasoned mix before cooking",
    note:
      "Portion the seasoned mix by scale, not the pure raw protein alone. If the marinade releases liquid, cook the batch first and divide the final cooked weight by the number of portions.",
  };
}

function buildScaledRecipeItems(
  totalProtein: number,
  recipe: Array<{ name: string; ratio: number; minimum?: number }>,
) {
  return recipe.map((item) => ({
    name: item.name,
    grams: Math.max(
      item.minimum ?? 0,
      roundToNearest(totalProtein * item.ratio, item.ratio < 0.02 ? 1 : 5),
    ),
  }));
}

type IngredientAccumulator = {
  name: string;
  grams: number;
  eggs: number;
  cans: number;
  scoops: number;
  units: Record<string, number>;
  texts: string[];
};

function createIngredientAccumulator(name: string): IngredientAccumulator {
  return {
    name,
    grams: 0,
    eggs: 0,
    cans: 0,
    scoops: 0,
    units: {},
    texts: [],
  };
}

function addNormalizedAmountToAccumulator(
  current: IngredientAccumulator,
  amount: ReturnType<typeof normalizeIngredient>["amount"],
) {
  if (amount.type === "grams") current.grams += amount.value;
  if (amount.type === "eggs") current.eggs += amount.value;
  if (amount.type === "cans") current.cans += amount.value;
  if (amount.type === "scoops") current.scoops += amount.value;
  if (amount.type === "unit") {
    current.units[amount.unit] =
      (current.units[amount.unit] ?? 0) + amount.value;
  }
  if (amount.type === "text") current.texts.push(amount.value);
}

function formatAccumulatorAmount(
  item: IngredientAccumulator,
  language: PdfLanguage,
) {
  const amount = formatGroupedPortionAmount(item, language);

  if (!amount.trim())
    return language === "ar"
      ? "حسب الحاجة"
      : language === "bg"
        ? "според нуждата"
        : "as needed";
  return cleanDisplayAmount(amount, language);
}

function formatEgyptEngineAmount(
  key: "cottage" | "tomato" | "yogurt" | "pea" | "tahini",
  language: PdfLanguage,
) {
  if (language === "ar") {
    const amounts = {
      cottage: "1.5 كجم تقريبًا",
      tomato: "حوالي 500 جم صوص جاهز",
      yogurt: "حوالي 180 جم صوص جاهز",
      pea: "اختياري للفاهيتا والكاساديا",
      tahini: "30 جم فقط عند الحاجة",
    };
    return amounts[key];
  }

  if (language === "bg") {
    const amounts = {
      cottage: "около 1.5kg",
      tomato: "около 500g готов сос",
      yogurt: "около 180g готов сос",
      pea: "по избор за фахита/кесадия",
      tahini: "30g само при нужда",
    };
    return amounts[key];
  }

  const amounts = {
    cottage: "about 1.5kg",
    tomato: "about 500g finished sauce",
    yogurt: "about 180g finished sauce",
    pea: "optional for fajita/quesadilla",
    tahini: "30g only when needed",
  };
  return amounts[key];
}

function getEgyptQuickProteinPrep(
  language: PdfLanguage,
): PrepBatchSummaryItem[] {
  if (language === "ar") {
    return [
      {
        name: "بيض كامل",
        total: "7 بيض",
        batch1: "4 بيض",
        batch2: "1 بيضة",
        day7: "2 بيض",
        note: "يستخدم حسب الفطار، وليس داخل تتبيلة اللحمة أو الفراخ.",
      },
      {
        name: "جبنة قريش",
        total: formatEgyptEngineAmount("cottage", language),
        batch1: "حوالي 600 جم",
        batch2: "حوالي 650 جم",
        day7: "حوالي 250 جم",
        note: "بروتين سريع عملي ومتوفر في مصر؛ استخدمها بجانب الفطار أو بدل البروتين السريع.",
      },
      {
        name: "تونة بالماء",
        total: "6 علب",
        batch1: "—",
        batch2: "4 علب",
        day7: "علبتين",
        note: "تستخدم في يومها حتى لا تنشف؛ صفّيها ثم اخلطها بالصوص.",
      },
      {
        name: "فيليه سمك",
        total: "306 جم",
        batch1: "—",
        batch2: "—",
        day7: "306 جم",
        note: "يوم 7 فقط، تحضير أخف.",
      },
    ];
  }

  if (language === "bg") {
    return [
      {
        name: "Цели яйца",
        total: "7 яйца",
        batch1: "4 яйца",
        batch2: "1 яйце",
        day7: "2 яйца",
        note: "Използвай според закуската; не влиза в маринатата.",
      },
      {
        name: "Котидж сирене",
        total: formatEgyptEngineAmount("cottage", language),
        batch1: "около 600g",
        batch2: "около 650g",
        day7: "около 250g",
        note: "Практична алтернатива на белтъци и whey за Египет.",
      },
      {
        name: "Риба тон във вода",
        total: "6 консерви",
        batch1: "—",
        batch2: "4 консерви",
        day7: "2 консерви",
        note: "Използвай в деня на ястието, за да не изсъхва.",
      },
      {
        name: "Рибно филе",
        total: "306g",
        batch1: "—",
        batch2: "—",
        day7: "306g",
        note: "Само ден 7.",
      },
    ];
  }

  return [
    {
      name: "Whole Eggs",
      total: "7 eggs",
      batch1: "4 eggs",
      batch2: "1 egg",
      day7: "2 eggs",
      note: "Use per breakfast; not inside beef/chicken marinade.",
    },
    {
      name: "Cottage Cheese",
      total: formatEgyptEngineAmount("cottage", language),
      batch1: "about 600g",
      batch2: "about 650g",
      day7: "about 250g",
      note: "Egypt-friendly alternative to egg whites and whey protein.",
    },
    {
      name: "Tuna in Water",
      total: "6 cans",
      batch1: "—",
      batch2: "4 cans",
      day7: "2 cans",
      note: "Use on the meal day so it stays fresh.",
    },
    {
      name: "Fish Fillet",
      total: "306g",
      batch1: "—",
      batch2: "—",
      day7: "306g",
      note: "Day 7 light prep only.",
    },
  ];
}

function findGroceryItemByName(items: GrocerySummaryItem[], names: string[]) {
  return items.find((item) =>
    names.some((name) => item.name.toLowerCase() === name.toLowerCase()),
  );
}

function createQuickProteinPrepItem(
  item: GrocerySummaryItem | undefined,
  fallbackName: string,
  language: PdfLanguage,
  note: string,
): PrepBatchSummaryItem | null {
  if (!item) return null;

  const name = getShoppingIngredientName(item.name, language) || fallbackName;
  const total = getShoppingAmount(item, language);
  const asMap =
    language === "ar"
      ? "حسب خريطة تجهيز العلب"
      : language === "bg"
        ? "според portion map"
        : "per portion map";

  return {
    name,
    total,
    batch1: asMap,
    batch2: asMap,
    day7: asMap,
    note,
  };
}

function getEgyptQuickProteinPrepFromGrocery(
  groceryGroups: ReturnType<typeof groupWeeklyGroceryList>,
  language: PdfLanguage,
): PrepBatchSummaryItem[] {
  const proteins = groceryGroups.PROTEINS;

  const note =
    language === "ar"
      ? "استخدمه حسب الوجبة في خريطة تجهيز العلب؛ لا يدخل في تتبيلة اللحمة أو الفراخ."
      : language === "bg"
        ? "Използвай според portion map; не влиза в маринатата."
        : "Use according to the portion map; do not add to the meat marinade.";

  return [
    createQuickProteinPrepItem(
      findGroceryItemByName(proteins, ["Whole Eggs", "Whole Egg"]),
      language === "ar"
        ? "بيض كامل"
        : language === "bg"
          ? "Цели яйца"
          : "Whole Eggs",
      language,
      note,
    ),
    createQuickProteinPrepItem(
      findGroceryItemByName(proteins, ["Cottage Cheese"]),
      language === "ar"
        ? "جبنة قريش"
        : language === "bg"
          ? "Котидж сирене"
          : "Cottage Cheese",
      language,
      note,
    ),
    createQuickProteinPrepItem(
      findGroceryItemByName(proteins, ["Tuna in Water"]),
      language === "ar"
        ? "تونة بالماء"
        : language === "bg"
          ? "Риба тон във вода"
          : "Tuna in Water",
      language,
      note,
    ),
    createQuickProteinPrepItem(
      findGroceryItemByName(proteins, ["Fish Fillet"]),
      language === "ar"
        ? "فيليه سمك"
        : language === "bg"
          ? "Рибно филе"
          : "Fish Fillet",
      language,
      note,
    ),
  ].filter((item): item is PrepBatchSummaryItem => Boolean(item));
}

function getEgyptSauceEnginePrep(
  language: PdfLanguage,
): PrepBatchSummaryItem[] {
  if (language === "ar") {
    return [
      {
        name: "صوص طماطم G7",
        total: formatEgyptEngineAmount("tomato", language),
        batch1: "باستا الفراخ + باستا الكفتة",
        batch2: "باستا التونة + صوص بينك",
        day7: "شكشوكة + تونة طماطم",
        note: "طماطم فريش أو مقشرة + بصل أصفر + ثوم + أوريجانو + زيت زيتون. يتسبك حتى يتركز.",
      },
      {
        name: "صوص زبادي جي سفن بخلطة G7",
        total: formatEgyptEngineAmount("yogurt", language),
        batch1: "زبادي وخيار",
        batch2: "برجر + راب تونة + صوص زبادي",
        day7: "حسب الحاجة",
        note: "زبادي + ليمون + خلطة G7: بابريكا، ثوم بودرة، بصل بودرة، أوريجانو، ملح بحري، فلفل أسود. المستردة اختيارية فقط.",
      },
      {
        name: "جواكامولي البسلة G7",
        total: formatEgyptEngineAmount("pea", language),
        batch1: "كاساديا اختياري",
        batch2: "فاهيتا اختياري",
        day7: "—",
        note: "بسلة مسلوقة ومصفاة + ليمون + ملح، ثم بصل أحمر وطماطم وكزبرة. بديل ذكي للأفوكادو.",
      },
      {
        name: "صوص طحينة لايت",
        total: formatEgyptEngineAmount("tahini", language),
        batch1: "طبق كفتة لحمة",
        batch2: "اختياري",
        day7: "—",
        note: "استخدم كمية صغيرة فقط عند الحاجة.",
      },
    ];
  }

  if (language === "bg") {
    return [
      {
        name: "G7 доматен сос",
        total: formatEgyptEngineAmount("tomato", language),
        batch1: "пилешка паста + кофта паста",
        batch2: "паста с тон + розов сос",
        day7: "шакшука + тон с домат",
        note: "Домати + лук + чесън + риган + зехтин. Остави да се редуцира.",
      },
      {
        name: "G7 йогурт сос с подправки",
        total: formatEgyptEngineAmount("yogurt", language),
        batch1: "краставица йогурт",
        batch2: "бургер + рап с тон",
        day7: "при нужда",
        note: "Йогурт + лимон + G7 spice mix. Горчицата е само опция.",
      },
      {
        name: "G7 грахово гуакамоле",
        total: formatEgyptEngineAmount("pea", language),
        batch1: "по избор",
        batch2: "по избор",
        day7: "—",
        note: "Сварен грах + лимон + сол, после червен лук, домат и кориандър.",
      },
      {
        name: "Лек таханов сос",
        total: formatEgyptEngineAmount("tahini", language),
        batch1: "телешка чиния",
        batch2: "по избор",
        day7: "—",
        note: "Малко количество само при нужда.",
      },
    ];
  }

  return [
    {
      name: "G7 Tomato Sauce",
      total: formatEgyptEngineAmount("tomato", language),
      batch1: "chicken pasta + kofta pasta",
      batch2: "tuna pasta + pink sauce",
      day7: "shakshuka + tomato tuna",
      note: "Fresh or peeled tomatoes + yellow onion + garlic + oregano + olive oil. Simmer until concentrated.",
    },
    {
      name: "G7 Yogurt Spice Sauce",
      total: formatEgyptEngineAmount("yogurt", language),
      batch1: "cucumber yogurt",
      batch2: "burger + tuna wrap",
      day7: "as needed",
      note: "Yogurt + lemon + G7 spice mix. Mustard is optional only.",
    },
    {
      name: "G7 Green Pea Guacamole",
      total: formatEgyptEngineAmount("pea", language),
      batch1: "optional quesadilla",
      batch2: "optional fajita",
      day7: "—",
      note: "Boiled peas + lemon + salt, then red onion, tomato, and coriander.",
    },
    {
      name: "Light Tahini Sauce",
      total: formatEgyptEngineAmount("tahini", language),
      batch1: "beef plate",
      batch2: "optional",
      day7: "—",
      note: "Small amount only when needed.",
    },
  ];
}

function getPrepBatchNote(
  kind: "quickProtein" | "carb" | "sauce" | "vegetable",
  language: PdfLanguage,
) {
  if (language === "ar") {
    if (kind === "quickProtein")
      return "لا يدخل في تتبيلة اللحمة أو الفراخ؛ استخدمه حسب الوجبة.";
    if (kind === "carb")
      return "اطبخ كمية المرحلة فقط، ثم قسّمها بالميزان على العلب.";
    if (kind === "sauce")
      return "جهّزه في علب صغيرة وافصله عن الوجبة قدر الإمكان.";
    return "اغسل وقطّع وخزّن في علبة منفصلة للحفاظ على القوام.";
  }

  if (language === "bg") {
    if (kind === "quickProtein")
      return "Не влиза в маринатата; използвай го според конкретното ястие.";
    if (kind === "carb")
      return "Сготви само количеството за съответния batch и раздели с кантар.";
    if (kind === "sauce")
      return "Подготви в малки кутии и дръж отделно, когато е възможно.";
    return "Измий, нарежи и съхранявай отделно за по-добра текстура.";
  }

  if (kind === "quickProtein")
    return "Do not marinate with the meat batch; use it per meal.";
  if (kind === "carb")
    return "Cook only the batch amount, then portion with a scale.";
  if (kind === "sauce")
    return "Prep in small containers and keep separate when possible.";
  return "Wash, cut, and store separately to preserve texture.";
}

function buildPrepBatchSummary(
  groupedMeals: Record<string, Meal[]>,
  language: PdfLanguage,
  filter: (normalized: ReturnType<typeof normalizeIngredient>) => boolean,
  noteKind: "quickProtein" | "carb" | "sauce" | "vegetable",
): PrepBatchSummaryItem[] {
  const totalMap = new Map<string, IngredientAccumulator>();
  const batch1Map = new Map<string, IngredientAccumulator>();
  const batch2Map = new Map<string, IngredientAccumulator>();
  const day7Map = new Map<string, IngredientAccumulator>();

  function getOrCreate(map: Map<string, IngredientAccumulator>, name: string) {
    const current = map.get(name) ?? createIngredientAccumulator(name);
    map.set(name, current);
    return current;
  }

  Object.entries(groupedMeals).forEach(([day, dayMeals]) => {
    dayMeals.forEach((meal) => {
      meal.raw.forEach(([name, amount]) => {
        const normalized = normalizeIngredient(name, amount);
        if (!filter(normalized)) return;

        const canonicalName = normalized.canonicalName;
        addNormalizedAmountToAccumulator(
          getOrCreate(totalMap, canonicalName),
          normalized.amount,
        );

        if (["Day 1", "Day 2", "Day 3"].includes(day)) {
          addNormalizedAmountToAccumulator(
            getOrCreate(batch1Map, canonicalName),
            normalized.amount,
          );
        }

        if (["Day 4", "Day 5", "Day 6"].includes(day)) {
          addNormalizedAmountToAccumulator(
            getOrCreate(batch2Map, canonicalName),
            normalized.amount,
          );
        }

        if (day === "Day 7") {
          addNormalizedAmountToAccumulator(
            getOrCreate(day7Map, canonicalName),
            normalized.amount,
          );
        }
      });
    });
  });

  return Array.from(totalMap.values()).map((item) => {
    const name =
      item.name === "Healthy Fat Source"
        ? getHealthyFatDisplayName(language, undefined, "shopping")
        : getShoppingIngredientName(item.name, language);

    return {
      name,
      total: formatAccumulatorAmount(item, language),
      batch1: formatAccumulatorAmount(
        batch1Map.get(item.name) ?? createIngredientAccumulator(item.name),
        language,
      ),
      batch2: formatAccumulatorAmount(
        batch2Map.get(item.name) ?? createIngredientAccumulator(item.name),
        language,
      ),
      day7: formatAccumulatorAmount(
        day7Map.get(item.name) ?? createIngredientAccumulator(item.name),
        language,
      ),
      note: getPrepBatchNote(noteKind, language),
    };
  });
}

function getSopLabel(
  key:
    | "supportTitle"
    | "supportSubtitle"
    | "quickProtein"
    | "carbs"
    | "sauces"
    | "vegetables"
    | "total"
    | "batch1"
    | "batch2"
    | "day7"
    | "workflow"
    | "workflowBody",
  language: PdfLanguage,
) {
  const labels: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      supportTitle: "G7 Prep Engine",
      supportSubtitle:
        "حضّر الأسبوع كـ 4 Engines واضحة: Protein Engine، Carb Engine، Sauce Engine، وFresh Engine. بعدها افتح Portion Engine ووزّع كل علبة بالميزان.",
      quickProtein: "Protein Engine السريع",
      carbs: "Carb Engine",
      sauces: "Sauce Engine",
      vegetables: "Fresh Engine",
      total: "إجمالي الأسبوع",
      batch1: "الأيام 1–3",
      batch2: "الأيام 4–6",
      day7: "اليوم 7",
      workflow: "G7 Operating Rule",
      workflowBody:
        "لا تطبخ 21 وجبة من الصفر. حضّر البروتين، الكارب، الصوص، والخضار كقواعد منفصلة، ثم استخدم خريطة تجهيز العلب كـ Portion Engine للتوزيع النهائي.",
    },
    en: {
      supportTitle: "G7 Prep Engine",
      supportSubtitle:
        "Prep the week as 4 clear engines: Protein Engine, Carb Engine, Sauce Engine, and Fresh Engine. Then open the Portion Engine and weigh each container.",
      quickProtein: "Quick Protein Engine",
      carbs: "Carb Engine",
      sauces: "Sauce Engine",
      vegetables: "Fresh Engine",
      total: "Full week",
      batch1: "Days 1–3",
      batch2: "Days 4–6",
      day7: "Day 7",
      workflow: "G7 Operating Rule",
      workflowBody:
        "Do not cook 21 meals from scratch. Prep protein, carbs, sauces, and fresh vegetables as separate engines, then use the Portion Map as the final Portion Engine.",
    },
    bg: {
      supportTitle: "G7 Prep Engine",
      supportSubtitle:
        "Подготви седмицата като 4 ясни engines: Protein Engine, Carb Engine, Sauce Engine и Fresh Engine. После използвай Portion Engine за кутиите.",
      quickProtein: "Quick Protein Engine",
      carbs: "Carb Engine",
      sauces: "Sauce Engine",
      vegetables: "Fresh Engine",
      total: "Цяла седмица",
      batch1: "Дни 1–3",
      batch2: "Дни 4–6",
      day7: "Ден 7",
      workflow: "G7 Operating Rule",
      workflowBody:
        "Не готви 21 ястия от нулата. Подготви протеин, въглехидрати, сосове и fresh зеленчуци като отделни engines, после използвай Portion Map.",
    },
  };

  return labels[language][key];
}

function getPrepCardRule(
  kind: "quickProtein" | "carbs" | "sauces" | "vegetables",
  language: PdfLanguage,
) {
  const rules: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      quickProtein:
        "اللحمة والفراخ هم Protein Batch الأساسي. البروتين السريع مثل الجبنة القريش، البيض، التونة والسمك يستخدم حسب اليوم داخل خريطة تجهيز العلب.",
      carbs:
        "اطبخ كارب المرحلة فقط: أرز، مكرونة، بطاطس أو بطاطا. العيش، التورتيلا، الشوفان والموز لا يدخلوا Bulk Cooking؛ استخدمهم وقت التجميع.",
      sauces:
        "لا تشتري صوصات جاهزة. حضّر Sauce Engine: صوص طماطم G7، صوص زبادي G7، وجواكامولي البسلة عند الحاجة. خزّن الصوص منفصل للحفاظ على القوام.",
      vegetables:
        "اغسل، نشّف، قطّع، وخزّن الخضار منفصلًا. الخضار الطازة تدخل وقت التجميع، والخضار المطبوخة تدخل حسب خريطة العلب.",
    },
    en: {
      quickProtein:
        "Beef and chicken are the main Protein Batch. Quick proteins like cottage cheese, eggs, tuna, and fish are used on their specific day inside the Portion Map.",
      carbs:
        "Cook only the current batch carbs: rice, pasta, potatoes, or sweet potatoes. Bread, tortillas, oats, and bananas are not bulk-cooked; use them during assembly.",
      sauces:
        "Do not buy ready-made sauces. Build the Sauce Engine: G7 tomato sauce, G7 yogurt spice sauce, and green pea guacamole when needed. Store sauces separately.",
      vegetables:
        "Wash, dry, cut, and store vegetables separately. Fresh vegetables are assembled later; cooked vegetables follow the Portion Map.",
    },
    bg: {
      quickProtein:
        "Телешкото и пилешкото са основният Protein Batch. Бързи протеини като cottage cheese, яйца, риба тон и риба се използват в конкретния ден от Portion Map.",
      carbs:
        "Сготви само въглехидратите за текущия етап: ориз, паста, картофи или сладък картоф. Хляб, тортили, овес и банан не се готвят bulk.",
      sauces:
        "Не купувай готови сосове. Изгради Sauce Engine: G7 доматен сос, G7 йогурт сос и гуакамоле от грах при нужда. Дръж сосовете отделно.",
      vegetables:
        "Измий, подсуши, нарежи и съхранявай зеленчуците отделно. Fresh зеленчуците се добавят при сглобяване; готвените следват Portion Map.",
    },
  };

  return rules[language][kind];
}

function getPrepCardFooter(
  kind: "quickProtein" | "carbs" | "sauces" | "vegetables",
  language: PdfLanguage,
) {
  const footers: Record<PdfLanguage, Record<string, string>> = {
    ar: {
      quickProtein: "البروتين السريع لا يدخل في باتش اللحمة أو الفراخ؛ استخدمه حسب اليوم.",
      carbs: "اطبخ كارب المرحلة فقط، وليس كارب الأسبوع كله.",
      sauces: "الصوص المنفصل يحافظ على الطعم والقوام ويمنع العلبة من أنها تطرى.",
      vegetables: "الخضار الطازة أفضل عند التخزين المنفصل والتجميع وقت الأكل.",
    },
    en: {
      quickProtein: "Quick proteins do not enter the beef or chicken batch; use them by day.",
      carbs: "Cook the current carb batch only, not the whole week.",
      sauces: "Separate sauces preserve flavor, texture, and container quality.",
      vegetables: "Fresh vegetables hold better when stored separately and assembled later.",
    },
    bg: {
      quickProtein: "Точните количества са в картата за разпределяне.",
      carbs: "Не готви всички въглехидрати за седмицата наведнъж.",
      sauces: "Отделните сосове пазят вкус и текстура.",
      vegetables: "Зеленчуците се запазват по-добре отделно.",
    },
  };

  return footers[language][kind];
}

function getSimpleItemList(items: PrepBatchSummaryItem[], limit = 5) {
  return items.slice(0, limit).map((item) => `${item.name} · ${item.total}`);
}

function formatPrepListItem(item: PrepBatchSummaryItem, language: PdfLanguage) {
  const separator = language === "ar" ? ": " : ": ";
  return `${item.name}${separator}${item.total}`;
}

function PrepBatchTable({
  title,
  items,
  language,
  accent = "cyan",
  limit = 6,
}: {
  title: string;
  items: PrepBatchSummaryItem[];
  language: PdfLanguage;
  accent?: "cyan" | "lime" | "gold" | "white";
  limit?: number;
}) {
  const accentClass =
    accent === "lime"
      ? "text-[#B7F532] border-[#B7F532]/15 bg-[#B7F532]/[0.04]"
      : accent === "gold"
        ? "text-[#D8C56A] border-[#D8C56A]/15 bg-[#D8C56A]/[0.04]"
        : accent === "white"
          ? "text-white border-white/16 bg-white/[0.03]"
          : "text-[#22D3EE] border-[#22D3EE]/15 bg-[#22D3EE]/[0.04]";

  return (
    <div className={`rounded-[18px] border p-3 ${accentClass}`}>
      <p className="text-[12px] font-black">{title}</p>

      <div className="mt-2 grid gap-1.5">
        {items.slice(0, limit).map((item) => (
          <div
            key={`${title}-${item.name}`}
            className="rounded-[12px] border border-white/16 bg-black/20 p-2"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="max-w-[55%] text-[9px] font-black leading-4 text-white">
                {item.name}
              </p>
              <p className="text-[8px] font-black text-white/84">
                {getSopLabel("total", language)} · {item.total}
              </p>
            </div>

            <div className="mt-1.5 grid grid-cols-3 gap-1 text-center">
              {[
                [getSopLabel("batch1", language), item.batch1],
                [getSopLabel("batch2", language), item.batch2],
                [getSopLabel("day7", language), item.day7],
              ].map(([label, value]) => (
                <div
                  key={`${item.name}-${label}`}
                  className="rounded-[8px] bg-white/[0.035] px-1 py-1"
                >
                  <p className="text-[7px] font-black text-white/80">{label}</p>
                  <p className="mt-0.5 text-[8px] font-black text-white/72">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-1.5 text-[7.5px] font-bold leading-4 text-white/88">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

type MealPortionItem = {
  day: string;
  title: string;
  role: Meal["role"];
  protein: string;
  carbs: string;
  vegetables: string;
  sauces: string;
};

type BatchPortionSummary = {
  batch1: MealPortionItem[];
  batch2: MealPortionItem[];
  day7: MealPortionItem[];
};

function formatPortionAmount(
  amount: ReturnType<typeof normalizeIngredient>["amount"],
  language: PdfLanguage,
) {
  if (amount.type === "grams") {
    return language === "ar" ? `${amount.value} جم` : `${amount.value}g`;
  }

  if (amount.type === "eggs") {
    if (language === "ar")
      return amount.value === 1 ? "1 بيضة" : `${amount.value} بيض`;
    if (language === "bg")
      return amount.value === 1 ? "1 яйце" : `${amount.value} яйца`;
    return amount.value === 1 ? "1 egg" : `${amount.value} eggs`;
  }

  if (amount.type === "cans") {
    if (language === "ar") return `${amount.value} علب`;
    if (language === "bg")
      return amount.value === 1 ? "1 консерва" : `${amount.value} консерви`;
    return amount.value === 1 ? "1 can" : `${amount.value} cans`;
  }

  if (amount.type === "scoops") {
    if (language === "ar") return `${amount.value} سكوب`;
    if (language === "bg") return `${amount.value} мерителни лъжички`;
    return amount.value === 1 ? "1 scoop" : `${amount.value} scoops`;
  }

  if (amount.type === "unit") {
    return cleanDisplayAmount(`${amount.value} ${amount.unit}`, language);
  }

  return cleanDisplayAmount(amount.value, language);
}

function formatGroupedPortionAmount(
  item: {
    grams: number;
    eggs: number;
    cans: number;
    scoops: number;
    units: Record<string, number>;
    texts: string[];
  },
  language: PdfLanguage,
) {
  const parts: string[] = [];

  if (item.eggs > 0) {
    parts.push(
      formatPortionAmount({ type: "eggs", value: item.eggs }, language),
    );
  }

  if (item.cans > 0) {
    parts.push(
      formatPortionAmount({ type: "cans", value: item.cans }, language),
    );
  }

  if (item.scoops > 0) {
    parts.push(
      formatPortionAmount({ type: "scoops", value: item.scoops }, language),
    );
  }

  Object.entries(item.units).forEach(([unit, value]) => {
    parts.push(formatPortionAmount({ type: "unit", unit, value }, language));
  });

  item.texts.forEach((value) => {
    parts.push(formatPortionAmount({ type: "text", value }, language));
  });

  if (item.grams > 0) {
    parts.push(
      formatPortionAmount({ type: "grams", value: item.grams }, language),
    );
  }

  return parts.join(language === "ar" ? " + " : " + ");
}

function getCategoryPortionText(
  meal: Meal,
  category: NormalizedIngredientCategory,
  language: PdfLanguage,
) {
  const map = new Map<
    string,
    {
      name: string;
      grams: number;
      eggs: number;
      cans: number;
      scoops: number;
      units: Record<string, number>;
      texts: string[];
    }
  >();

  meal.raw.forEach(([name, amount]) => {
    const normalized = normalizeIngredient(name, amount);
    if (normalized.category !== category) return;

    const current = map.get(normalized.canonicalName) ?? {
      name: normalized.canonicalName,
      grams: 0,
      eggs: 0,
      cans: 0,
      scoops: 0,
      units: {},
      texts: [],
    };

    if (normalized.amount.type === "grams")
      current.grams += normalized.amount.value;
    if (normalized.amount.type === "eggs")
      current.eggs += normalized.amount.value;
    if (normalized.amount.type === "cans")
      current.cans += normalized.amount.value;
    if (normalized.amount.type === "scoops")
      current.scoops += normalized.amount.value;
    if (normalized.amount.type === "unit") {
      current.units[normalized.amount.unit] =
        (current.units[normalized.amount.unit] ?? 0) + normalized.amount.value;
    }
    if (normalized.amount.type === "text")
      current.texts.push(normalized.amount.value);

    map.set(normalized.canonicalName, current);
  });

  const items = Array.from(map.values()).map((item) =>
    formatRawToCookedLine(item, language, `${meal.id} ${meal.title}`),
  );

  if (items.length === 0) return "—";
  return items.join(language === "ar" ? " + " : " + ");
}

function getHealthyFatPortionText(meal: Meal, language: PdfLanguage) {
  const map = new Map<
    string,
    {
      name: string;
      grams: number;
      eggs: number;
      cans: number;
      scoops: number;
      units: Record<string, number>;
      texts: string[];
    }
  >();

  meal.raw.forEach(([name, amount]) => {
    const normalized = normalizeIngredient(name, amount);
    if (normalized.canonicalName !== "Healthy Fat Source") return;

    const current = map.get(normalized.canonicalName) ?? {
      name: normalized.canonicalName,
      grams: 0,
      eggs: 0,
      cans: 0,
      scoops: 0,
      units: {},
      texts: [],
    };

    if (normalized.amount.type === "grams")
      current.grams += normalized.amount.value;
    if (normalized.amount.type === "eggs")
      current.eggs += normalized.amount.value;
    if (normalized.amount.type === "cans")
      current.cans += normalized.amount.value;
    if (normalized.amount.type === "scoops")
      current.scoops += normalized.amount.value;
    if (normalized.amount.type === "unit") {
      current.units[normalized.amount.unit] =
        (current.units[normalized.amount.unit] ?? 0) + normalized.amount.value;
    }
    if (normalized.amount.type === "text")
      current.texts.push(normalized.amount.value);

    map.set(normalized.canonicalName, current);
  });

  const items = Array.from(map.values()).map((item) =>
    cleanFinalPortionLine(
      `${formatGroupedPortionAmount(item, language)} ${getHealthyFatDisplayName(
        language,
        `${meal.id} ${meal.title}`,
      )}`,
      language,
    ),
  );

  if (items.length === 0) return "—";
  return items.join(language === "ar" ? " + " : " + ");
}

function combinePortionTexts(
  primary: string,
  secondary: string,
  language: PdfLanguage,
) {
  const items = [primary, secondary].filter((item) => item && item !== "—");
  if (items.length === 0) return "—";
  return items.join(language === "ar" ? " + " : " + ");
}

function buildBatchPortionSummary(
  groupedMeals: Record<string, Meal[]>,
  language: PdfLanguage,
): BatchPortionSummary {
  const items = Object.entries(groupedMeals).flatMap(([day, dayMeals]) =>
    dayMeals.map((meal) => ({
      day,
      title: getDisplayMealTitle(meal, language),
      role: meal.role,
      protein: getCategoryPortionText(meal, "PROTEINS", language),
      carbs: getCategoryPortionText(meal, "CARBS", language),
      vegetables: getCategoryPortionText(meal, "VEGETABLES", language),
      sauces: combinePortionTexts(
        getCategoryPortionText(meal, "SAUCES", language),
        getHealthyFatPortionText(meal, language),
        language,
      ),
    })),
  );

  return {
    batch1: items.filter((item) =>
      ["Day 1", "Day 2", "Day 3"].includes(item.day),
    ),
    batch2: items.filter((item) =>
      ["Day 4", "Day 5", "Day 6"].includes(item.day),
    ),
    day7: items.filter((item) => item.day === "Day 7"),
  };
}

function buildEngineSopSummary(
  groupedMeals: Record<string, Meal[]>,
  groceryGroups: ReturnType<typeof groupWeeklyGroceryList>,
  language: PdfLanguage,
): EngineSopSummary {
  const beefDistribution = buildProteinDistribution(
    groupedMeals,
    ["beef", "minced beef"],
    language,
  );
  const chickenDistribution = buildProteinDistribution(
    groupedMeals,
    ["chicken"],
    language,
  );

  const beefTotal = beefDistribution.reduce(
    (total, item) => total + item.grams,
    0,
  );
  const chickenTotal = chickenDistribution.reduce(
    (total, item) => total + item.grams,
    0,
  );

  const beefRecipe =
    language === "ar"
      ? [
          { name: "طماطم", ratio: 0.12 },
          { name: "فلفل أخضر رومي", ratio: 0.08 },
          { name: "بصل أحمر", ratio: 0.08 },
          { name: "ملح", ratio: 0.008, minimum: 2 },
          { name: "فلفل أسود", ratio: 0.004, minimum: 1 },
          { name: "قرفة", ratio: 0.002, minimum: 1 },
        ]
      : [
          { name: "Tomato", ratio: 0.12 },
          { name: "Green pepper", ratio: 0.08 },
          { name: "Red onion", ratio: 0.08 },
          { name: "Salt", ratio: 0.008, minimum: 2 },
          { name: "Black pepper", ratio: 0.004, minimum: 1 },
          { name: "Cinnamon", ratio: 0.002, minimum: 1 },
        ];

  const chickenRecipe =
    language === "ar"
      ? [
          { name: "بصل", ratio: 0.08 },
          { name: "ثوم", ratio: 0.015, minimum: 3 },
          { name: "بابريكا", ratio: 0.006, minimum: 2 },
          { name: "أوريجانو", ratio: 0.003, minimum: 1 },
          { name: "ملح", ratio: 0.008, minimum: 2 },
          { name: "فلفل أسود", ratio: 0.004, minimum: 1 },
        ]
      : [
          { name: "Onion", ratio: 0.08 },
          { name: "Garlic", ratio: 0.015, minimum: 3 },
          { name: "Paprika", ratio: 0.006, minimum: 2 },
          { name: "Oregano", ratio: 0.003, minimum: 1 },
          { name: "Salt", ratio: 0.008, minimum: 2 },
          { name: "Black pepper", ratio: 0.004, minimum: 1 },
        ];

  const beefItems = buildScaledRecipeItems(beefTotal, beefRecipe);
  const chickenItems = buildScaledRecipeItems(chickenTotal, chickenRecipe);

  const beefReadyMix =
    beefTotal + beefItems.reduce((total, item) => total + item.grams, 0);
  const chickenReadyMix =
    chickenTotal + chickenItems.reduce((total, item) => total + item.grams, 0);

  const beefMixedDistribution = addMixedWeightsToDistribution(
    beefDistribution,
    beefTotal,
    beefReadyMix,
  );
  const chickenMixedDistribution = addMixedWeightsToDistribution(
    chickenDistribution,
    chickenTotal,
    chickenReadyMix,
  );

  return {
    beef: {
      title:
        language === "ar"
          ? "لحمة الأسبوع"
          : language === "bg"
            ? "Телешко за седмицата"
            : "Beef Prep",
      subtitle:
        language === "ar"
          ? "لحمة مفرومة متبلة لوجبات الأسبوع"
          : language === "bg"
            ? "Овкусена телешка кайма за седмицата"
            : "Seasoned minced beef for the week",
      totalProtein: beefTotal,
      recipeItems: beefItems,
      readyMix: beefReadyMix,
      batch1: sumMixedDistributionForDays(beefMixedDistribution, [
        "Day 1",
        "Day 2",
        "Day 3",
      ]),
      batch2: sumMixedDistributionForDays(beefMixedDistribution, [
        "Day 4",
        "Day 5",
        "Day 6",
      ]),
      day7: sumMixedDistributionForDays(beefMixedDistribution, ["Day 7"]),
      distribution: beefMixedDistribution,
    },
    chicken: {
      title:
        language === "ar"
          ? "فراخ الأسبوع"
          : language === "bg"
            ? "Пилешко за седмицата"
            : "Chicken Prep",
      subtitle:
        language === "ar"
          ? "صدور دجاج متبلة لوجبات الأسبوع"
          : language === "bg"
            ? "Овкусени пилешки гърди за седмицата"
            : "Seasoned chicken breast for the week",
      totalProtein: chickenTotal,
      recipeItems: chickenItems,
      readyMix: chickenReadyMix,
      batch1: sumMixedDistributionForDays(chickenMixedDistribution, [
        "Day 1",
        "Day 2",
        "Day 3",
      ]),
      batch2: sumMixedDistributionForDays(chickenMixedDistribution, [
        "Day 4",
        "Day 5",
        "Day 6",
      ]),
      day7: sumMixedDistributionForDays(chickenMixedDistribution, ["Day 7"]),
      distribution: chickenMixedDistribution,
    },
    quickProteins: getEgyptQuickProteinPrepFromGrocery(groceryGroups, language),
    carbPrep: buildPrepBatchSummary(
      groupedMeals,
      language,
      (normalized) => normalized.category === "CARBS",
      "carb",
    ),
    saucePrep: getEgyptSauceEnginePrep(language),
    vegetablePrep: buildPrepBatchSummary(
      groupedMeals,
      language,
      (normalized) => normalized.category === "VEGETABLES",
      "vegetable",
    ),
    carbs: groceryGroups.CARBS.slice(0, 6),
    sauces: groceryGroups.SAUCES.slice(0, 6),
  };
}

function BulkCookingReportPage({
  engineSop,
  language,
}: {
  engineSop: EngineSopSummary;
  language: PdfLanguage;
}) {
  const isArabic = language === "ar";

  const labels = {
    title: "G7 Bulk Cooking Report",
    subtitle:
      language === "ar"
        ? "أنت مش بتطبخ 21 وجبة من الصفر. أنت بتحضّر 3 Engines كبيرة، وبعدها خريطة تجهيز العلب تحوّلهم إلى علب محسوبة."
        : language === "bg"
          ? "Не готвиш 21 ястия от нулата. Подготвяш 3 големи engines, после картата ги превръща в точни кутии."
          : "You are not cooking 21 dishes from scratch. You build 3 bulk engines, then the portion map turns them into measured containers.",
    rule:
      language === "ar"
        ? "اطبخ مرة. قسّم بذكاء. كُل طول الأسبوع."
        : language === "bg"
          ? "Готви веднъж. Разпределяй умно. Храни се цяла седмица."
          : "Cook once. Portion smarter. Eat all week.",
    proteinEngine: "Protein Engine",
    carbEngine: "Carb Engine",
    sauceEngine: "Sauce Engine",
    totalPrep:
      language === "ar"
        ? "إجمالي التحضير"
        : language === "bg"
          ? "Общо"
          : "Total prep",
    usedFor:
      language === "ar"
        ? "يتحوّل إلى"
        : language === "bg"
          ? "Става за"
          : "Turns into",
  };

  const proteinCards = [
    {
      title: "G7 Chicken Mix",
      amount: formatSopWeight(engineSop.chicken.readyMix, language),
      main: [
        [
          language === "ar" ? "صدور دجاج" : "Chicken breast",
          formatSopWeight(engineSop.chicken.totalProtein, language),
        ],
        ...engineSop.chicken.recipeItems
          .slice(0, 6)
          .map((item) => [item.name, formatSopWeight(item.grams, language)]),
      ],
      usedFor: engineSop.chicken.distribution
        .slice(0, 6)
        .map((item) => item.title),
    },
    {
      title: "G7 Beef Mix",
      amount: formatSopWeight(engineSop.beef.readyMix, language),
      main: [
        [
          language === "ar" ? "لحمة مفرومة" : "Minced beef",
          formatSopWeight(engineSop.beef.totalProtein, language),
        ],
        ...engineSop.beef.recipeItems
          .slice(0, 6)
          .map((item) => [item.name, formatSopWeight(item.grams, language)]),
      ],
      usedFor: engineSop.beef.distribution
        .slice(0, 5)
        .map((item) => item.title),
    },
  ];

  const carbRules =
    language === "ar"
      ? [
          "اطبخ كارب المرحلة فقط، مش كارب الأسبوع كله.",
          "الأرز والمكرونة والبطاطس يتوزنوا قبل الطبخ للتحضير.",
          "وقت التوزيع استخدم الوزن المطبوخ الموجود في خريطة العلب.",
          "العيش والتورتيلا لا يطبخوا Bulk؛ استخدمهم وقت التجميع.",
        ]
      : language === "bg"
        ? [
            "Готви само въглехидратите за текущия batch.",
            "Оризът, пастата и картофите се мерят сурови за подготовка.",
            "При разпределяне използвай готовото тегло от portion map.",
            "Хлябът и тортилите се ползват при сглобяване.",
          ]
        : [
            "Cook only the current batch carbs, not the whole week.",
            "Rice, pasta, and potatoes are weighed raw for prep.",
            "At portioning time, use the cooked weights in the portion map.",
            "Bread and tortillas are used at assembly time.",
          ];

  const sauceCards =
    language === "ar"
      ? [
          {
            name: "صوص طماطم G7",
            text: "طماطم + بصل أصفر + ثوم + أوريجانو + زيت زيتون. يتسبك حتى يتركز.",
          },
          {
            name: "صوص زبادي G7",
            text: "زبادي + ليمون + خلطة G7: بابريكا، ثوم بودرة، بصل بودرة، أوريجانو، ملح بحري، فلفل أسود.",
          },
          {
            name: "جواكامولي البسلة G7",
            text: "بسلة مسلوقة ومصفاة + ليمون + ملح، ثم بصل أحمر وطماطم وكزبرة. اختياري للفاهيتا والكاساديا.",
          },
        ]
      : language === "bg"
        ? [
            {
              name: "G7 Tomato Sauce",
              text: "Домати + жълт лук + чесън + риган + зехтин. Готви се до сгъстяване.",
            },
            {
              name: "G7 Yogurt Sauce",
              text: "Йогурт + лимон + G7 подправки: паприка, чесън, лук, риган, морска сол, черен пипер.",
            },
            {
              name: "G7 Green Pea Guacamole",
              text: "Сварен грах + лимон + сол, после червен лук, домати и кориандър. По избор.",
            },
          ]
        : [
            {
              name: "G7 Tomato Sauce",
              text: "Tomato + yellow onion + garlic + oregano + olive oil. Simmer until concentrated.",
            },
            {
              name: "G7 Yogurt Sauce",
              text: "Yogurt + lemon + G7 spice mix: paprika, garlic powder, onion powder, oregano, sea salt, black pepper.",
            },
            {
              name: "G7 Green Pea Guacamole",
              text: "Cooked peas + lemon + salt, then red onion, tomato, and coriander. Optional for fajita and quesadilla.",
            },
          ];

  return (
    <section
      className="break-before-page rounded-[22px] border border-[#22D3EE]/25 bg-[#07111F] p-5"
      style={{
        pageBreakBefore: "always",
        pageBreakInside: "avoid",
        breakInside: "avoid",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
            {labels.title}
          </p>

          <h2 className="mt-2 max-w-[690px] text-[29px] font-black leading-tight text-white">
            {labels.subtitle}
          </h2>

          <p className="mt-3 inline-flex rounded-full border border-[#B7F532]/35 bg-[#B7F532]/[0.08] px-4 py-2 text-[11px] font-black text-[#B7F532]">
            {labels.rule}
          </p>
        </div>

        <div className="rounded-[20px] border border-[#B7F532]/35 bg-black/35 px-4 py-3 text-center">
          <p className="text-[30px] font-black text-[#B7F532]">3</p>
          <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/80">
            ENGINES
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1.18fr_0.82fr] gap-4">
        <div className="rounded-[18px] border border-[#22D3EE]/25 bg-black/28 p-4">
          <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
            {labels.proteinEngine}
          </p>

          <p className="mt-1 text-[9px] font-bold leading-5 text-white/82">
            {language === "ar"
              ? "تبّل البروتين مرة واحدة، ثم اقسم Batch 1 للطبخ الآن وBatch 2 للفريزر."
              : language === "bg"
                ? "Овкуси протеина веднъж, после раздели Batch 1 за готвене и Batch 2 за фризер."
                : "Season protein once, then split Batch 1 for cooking now and Batch 2 for the freezer."}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {proteinCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[15px] border border-white/16 bg-[#07111F] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-black leading-5 text-white">
                    {card.title}
                  </p>

                  <p className="rounded-full border border-[#B7F532]/30 bg-[#B7F532]/[0.07] px-2 py-1 text-[8px] font-black text-[#B7F532]">
                    {card.amount}
                  </p>
                </div>

                <div className="mt-2 rounded-[12px] border border-white/14 bg-black/20 p-2">
                  <p className="text-[7.5px] font-black uppercase tracking-[0.12em] text-white/72">
                    {labels.totalPrep}
                  </p>

                  <div className="mt-1 grid gap-1">
                    {card.main.map(([name, amount]) => (
                      <div
                        key={`${card.title}-${name}`}
                        className="flex items-center justify-between gap-2 text-[7.5px] font-bold"
                      >
                        <p className="leading-4 text-white/86">{name}</p>
                        <p className="shrink-0 text-[#B7F532]">{amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-[8px] font-black text-[#D8C56A]">
                  {labels.usedFor}
                </p>

                <p className="mt-1 text-[7.5px] font-bold leading-4 text-white/80">
                  {card.usedFor.join(isArabic ? " · " : " · ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[18px] border border-[#B7F532]/25 bg-[#B7F532]/[0.05] p-4">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#B7F532]">
              {labels.carbEngine}
            </p>

            <div className="mt-3 grid gap-2">
              {carbRules.map((rule, index) => (
                <div
                  key={`carb-rule-${index}`}
                  className="flex gap-2 rounded-[12px] border border-white/14 bg-black/24 p-2"
                >
                  <p className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B7F532]/15 text-[8px] font-black text-[#B7F532]">
                    {index + 1}
                  </p>
                  <p className="text-[8.5px] font-bold leading-5 text-white/86">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-[#D8C56A]/25 bg-[#D8C56A]/[0.05] p-4">
            <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#D8C56A]">
              {labels.sauceEngine}
            </p>

            <div className="mt-3 grid gap-2">
              {sauceCards.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[12px] border border-white/14 bg-black/24 p-2"
                >
                  <p className="text-[9px] font-black leading-4 text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[7.5px] font-bold leading-4 text-white/80">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[18px] border border-[#B7F532]/30 bg-[#B7F532]/[0.07] p-3">
        <p className="text-[12px] font-black leading-6 text-[#B7F532]">
          {language === "ar"
            ? "بعد تجهيز الـ Engines، افتح خريطة تجهيز العلب فقط: وزّن الأكل المطبوخ واملأ العلب. لا تحتاج صفحات وصفات طويلة."
            : language === "bg"
              ? "След engines отвори само portion map: претегли готовата храна и напълни кутиите. Няма нужда от дълги рецепти."
              : "After the engines are ready, open only the portion map: weigh the cooked food and fill the containers. No long recipe pages needed."}
        </p>
      </div>
    </section>
  );
}

export default function PdfBooklet({
  selectedPlan = "lean_bulk",
  clientName,
  language = "ar",
}: PdfBookletProps) {
  const branding = getPlanBranding(selectedPlan);

  const meals = getMealsForPlan(selectedPlan);

  const groupedMeals = getMealsGroupedByDay(selectedPlan);

  const groceryItems = applyEgyptMarketGrocerySubstitutions(
    buildWeeklyGroceryList(meals),
  );
  const groceryGroups = groupWeeklyGroceryList(groceryItems);

  const estimatedTotal = groceryItems.reduce(
    (total, item) => total + estimateItemCost(item),
    0,
  );

  const estimatedMealCost =
    estimatedTotal > 0 ? Math.round(estimatedTotal / 21) : 0;

  const t = getPdfText(language);
  const isArabic = language === "ar";
  const prepEngine = getPrepEngineText(language);
  const engineSop = buildEngineSopSummary(
    groupedMeals,
    groceryGroups,
    language,
  );
  const portionSummary = buildBatchPortionSummary(groupedMeals, language);
  const foodContainers = Object.entries(groupedMeals).flatMap(
    ([day, dayMeals]) => dayMeals.map((meal) => ({ day, meal })),
  );

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto w-full max-w-[760px] rounded-[26px] border border-[#22D3EE]/20 bg-[#020817] p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] print:max-w-none print:border-0 print:shadow-none"
    >
      <section>
        <div className="flex items-start justify-between gap-5">
          <div>
            <img
              src="/images/g7-logo-clean.png"
              alt="G7"
              className="h-[72px] w-auto object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            />

            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/84">
              {t.clientPdf}
            </p>

            <h1 className="mt-2 text-[34px] font-black leading-[0.95] text-white">
              {branding.publicName}
              <span className="block text-[#B7F532]">{t.clientSystem}</span>
            </h1>

            {isArabic && (
              <p className="mt-1 text-[14px] font-black text-[#D8C56A]">
                {branding.publicArabicName}
              </p>
            )}

            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/84">
              {getClientPlanLabel(selectedPlan, branding.shortLabel, language)}
            </p>

            <p className="mt-2 text-[16px] text-[#22D3EE]">{clientName}</p>
          </div>

          <div className="rounded-[18px] border border-[#B7F532]/25 bg-black/25 px-4 py-3 text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/84">
              {t.price}
            </p>

            <p className="mt-1 text-[22px] font-black text-[#B7F532]">
              {formatPriceForLanguage(branding.price, language)}
            </p>

            <p className="mt-2 rounded-full border border-[#22D3EE]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
              {branding.badge}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[20px] border border-[#22D3EE]/20 bg-[#06111E] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
            {t.coachNumbers}
          </p>

          <h2 className="mt-2 text-[24px] font-black leading-tight text-white">
            {t.systemLine}
          </h2>

          <p className="mt-2 text-[14px] font-bold leading-7 text-[#B7F532]">
            {t.supportLine}
          </p>

          <p className="mt-2 text-[12px] leading-6 text-white/70">
            {t.explanation}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] border border-[#22D3EE]/20 bg-[#06111E] p-4">
            <h2 className="text-[20px] font-black text-[#22D3EE]">
              {t.systemOverview}
            </h2>

            <p className="mt-2 text-[14px] leading-7 text-white/75">
              {getClientPlanDescription(
                selectedPlan,
                branding.description,
                language,
              )}
            </p>

            <p className="mt-2 text-[13px] font-bold text-[#B7F532]">
              {getClientPlanLabel(selectedPlan, branding.shortLabel, language)}
            </p>

            <p className="mt-2 text-[12px] leading-6 text-white/84">
              {t.flavorProfile}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-4">
            <h2 className="text-[20px] font-black text-white">
              {t.whatYouGet}
            </h2>

            <p className="mt-1 text-[13px] font-black text-[#B7F532]">
              {t.whatYouGetSub}
            </p>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {getWhatYouGetItems(language).map((item) => (
                <div
                  key={item}
                  className="rounded-[12px] border border-white/16 bg-black/20 px-3 py-2 text-[10px] font-black text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-4">
          <h2 className="text-[20px] font-black text-white">{t.prepTitle}</h2>

          <p className="mt-2 text-[12px] leading-6 text-white/70">
            {t.prepBody}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {getBatchCards(language).map(([title, days, note]) => (
              <div
                key={title}
                className="rounded-[16px] border border-white/16 bg-black/20 p-3"
              >
                <p className="text-[11px] font-black text-[#22D3EE]">{title}</p>

                <p className="mt-1 text-[16px] font-black text-[#B7F532]">
                  {days}
                </p>

                <p className="mt-2 text-[11px] leading-5 text-white/82">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping list moved near the beginning so the client knows what to buy first. */}
      <section
        className="break-before-page rounded-[20px] border border-[#22D3EE]/15 bg-[#07111F] p-4"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-black text-white">
              {t.shoppingTitle}
            </h2>

            <p className="mt-1 text-[14px] font-black text-[#B7F532]">
              {t.shoppingSubtitle}
            </p>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#22D3EE]">
            {t.shoppingBadge}
          </p>
        </div>

        <p className="mt-2 text-[12px] leading-6 text-white/70">
          {t.shoppingBody}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {Object.entries(groceryGroups).map(([category, items]) => (
            <div
              key={getCategoryLabel(category, language)}
              className="break-inside-avoid rounded-[16px] border border-white/16 bg-black/20 p-4"
              style={{
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[#B7F532]">
                {getCategoryLabel(category, language)}
              </p>

              <div className="mt-2 space-y-1.5">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={`${getShoppingIngredientName(item.name, language)}-${index}`}
                      className="flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="text-[11px] leading-5 text-white/78">
                        {getShoppingIngredientName(item.name, language)}
                      </span>

                      <span className="max-w-[48%] text-left text-[11px] font-black leading-5 text-[#22D3EE]">
                        {getShoppingAmount(item, language)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-[11px] text-white/84">{t.noItems}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
          {t.startGuide}
        </p>

        <h2 className="mt-2 text-[34px] font-black leading-tight text-white">
          {t.howToUse}
          <span className="block text-[#B7F532]">{t.yourSystem}</span>
        </h2>

        <p className="mt-2 text-[20px] font-black text-[#D8C56A]">
          {t.howToUseArabic}
        </p>

        <p className="mt-4 max-w-[620px] text-[14px] leading-7 text-white/86">
          {t.startGuideBody}
        </p>

        <div className="mt-5 rounded-[22px] border border-[#B7F532]/25 bg-[#B7F532]/[0.06] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
            {language === "ar"
              ? "ابدأ من هنا اليوم"
              : language === "bg"
                ? "Започни оттук днес"
                : "Start here today"}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {getQuickStartActions(language).map((action, index) => (
              <div
                key={action}
                className="rounded-[14px] border border-white/16 bg-black/25 px-3 py-2"
              >
                <p className="text-[10px] font-black text-[#22D3EE]">
                  {index + 1}
                </p>
                <p className="mt-1 text-[11px] font-bold leading-5 text-white/70">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          {getStartGuideSteps(language).map(([number, title, body]) => (
            <div
              key={number}
              className="grid grid-cols-[44px_1fr] gap-2 rounded-[16px] border border-white/16 bg-black/25 p-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22D3EE] text-[13px] font-black text-black">
                {number}
              </div>

              <div>
                <p className="text-[14px] font-black text-white">{title}</p>

                <p className="mt-1 text-[12px] leading-6 text-white/80">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
            {t.simpleRule}
          </p>

          <h3 className="mt-2 text-[22px] font-black text-white">
            {t.simpleRuleTitle}
          </h3>

          <p className="mt-2 text-[13px] leading-7 text-white/82">
            {t.simpleRuleBody}
          </p>
        </div>
      </section>

      <VisualMealExperienceV21
        foodContainers={foodContainers}
        language={language}
        getDayDisplay={getDayDisplay}
        getRoleDisplay={getRoleDisplay}
      />

      {/* 21-meal overview page hidden in Quick Client PDF to keep the file shorter. */}

      <section
        className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
              {language === "ar"
                ? "تحضير القواعد الأساسية"
                : language === "bg"
                  ? "Седмична подготовка на протеина"
                  : "Weekly Protein Prep"}
            </p>

            <h2 className="mt-2 max-w-[590px] text-[30px] font-black leading-tight text-white">
              {language === "ar"
                ? "الكميات والطريقة قبل الطبخ"
                : language === "bg"
                  ? "Количества и метод преди готвене"
                  : "Quantities and method before cooking"}
            </h2>

            <p className="mt-3 max-w-[630px] text-[12px] font-bold leading-6 text-white/74">
              {language === "ar"
                ? "هذه الصفحة توضّح كمية بروتين الأسبوع، التتبيلة، الناتج بعد الخلط، وطريقة التقسيم على مرحلتين."
                : language === "bg"
                  ? "Тази страница показва протеина за седмицата, овкусяването, готовата смес и разделянето на два етапа."
                  : "This page shows the weekly protein amount, seasoning, expected yield, and how to split it into two cooking batches."}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.05] px-4 py-3 text-center">
            <p className="text-[18px] font-black text-[#B7F532]">
              {language === "ar"
                ? "خطة التنفيذ"
                : language === "bg"
                  ? "План за изпълнение"
                  : "Prep Plan"}
            </p>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/86">
              {language === "ar"
                ? "تبّل · اقسم · اطبخ"
                : language === "bg"
                  ? "овкуси · раздели · готви"
                  : "Season · Split · Cook"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-3">
          <p className="text-[13px] font-black leading-6 text-[#D8C56A]">
            {language === "ar"
              ? "القاعدة: لا تطبخ 21 وجبة من الصفر. حضّر القواعد الأساسية، اقسمها، ثم ركّب وجباتك حسب الجدول."
              : language === "bg"
                ? "Правило: не готвиш 21 ястия от нулата. Подготви основите, раздели ги и сглоби кутиите според плана."
                : "Rule: do not cook 21 meals from scratch. Prep the base components, portion them, then assemble meals from the schedule."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {[engineSop.beef, engineSop.chicken].map((engine) => (
            <div
              key={engine.title}
              className="rounded-[18px] border border-[#22D3EE]/15 bg-black/25 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-black text-[#22D3EE]">
                    {engine.title}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-white/84">
                    {engine.subtitle}
                  </p>
                </div>

                <div className="rounded-[12px] border border-[#B7F532]/20 bg-[#B7F532]/[0.06] px-3 py-2 text-center">
                  <p className="text-[13px] font-black text-[#B7F532]">
                    {formatSopWeight(engine.totalProtein, language)}
                  </p>
                  <p className="text-[8px] font-black text-white/80">
                    {language === "ar"
                      ? "بروتين نيء"
                      : language === "bg"
                        ? "сурово количество"
                        : "raw amount"}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {engine.recipeItems.map((item) => (
                  <div
                    key={`${engine.title}-${item.name}`}
                    className="flex items-center justify-between rounded-[10px] border border-white/16 bg-white/[0.03] px-2 py-1.5"
                  >
                    <span className="text-[9px] font-bold text-white/86">
                      {getDisplayIngredientName(item.name, language)}
                    </span>
                    <span className="text-[9px] font-black text-[#D8C56A]">
                      {formatSopWeight(item.grams, language)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <div className="rounded-[10px] border border-[#B7F532]/15 bg-[#B7F532]/[0.04] p-2 text-center">
                  <p className="text-[8px] font-black text-white/80">
                    {language === "ar"
                      ? "الناتج بعد الخلط"
                      : language === "bg"
                        ? "очакван добив"
                        : "expected yield"}
                  </p>
                  <p className="mt-1 text-[11px] font-black text-[#B7F532]">
                    {formatSopWeight(engine.readyMix, language)}
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#22D3EE]/15 bg-[#22D3EE]/[0.04] p-2 text-center">
                  <p className="text-[8px] font-black text-white/80">
                    {language === "ar"
                      ? "الأيام 1–3"
                      : language === "bg"
                        ? "Дни 1–3"
                        : "Days 1–3"}
                  </p>
                  <p className="mt-1 text-[11px] font-black text-[#22D3EE]">
                    {formatSopWeight(engine.batch1, language)}
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#D8C56A]/15 bg-[#D8C56A]/[0.04] p-2 text-center">
                  <p className="text-[8px] font-black text-white/80">
                    {language === "ar"
                      ? "الأيام 4–6"
                      : language === "bg"
                        ? "Дни 4–6"
                        : "Days 4–6"}
                  </p>
                  <p className="mt-1 text-[11px] font-black text-[#D8C56A]">
                    {formatSopWeight(engine.batch2, language)}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-[12px] border border-white/16 bg-white/[0.03] p-2">
                <p className="text-[9px] font-black text-[#B7F532]">
                  {language === "ar"
                    ? "توزيع الوجبات حسب خطتك"
                    : language === "bg"
                      ? "порции по ястия"
                      : "meal portions"}
                </p>

                <div className="mt-1 grid grid-cols-2 gap-1">
                  {engine.distribution.slice(0, 6).map((item) => (
                    <div
                      key={`${engine.title}-${item.day}-${item.title}`}
                      className="rounded-[8px] bg-black/25 px-2 py-1"
                    >
                      <p className="truncate text-[8px] font-bold text-white/78">
                        {getDayDisplay(item.day, language)} · {item.title}
                      </p>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-[8px] font-black text-[#22D3EE]">
                          {getMixedPortionLabels(language).raw}: {formatSopWeight(item.grams, language)}
                        </p>
                        <p className="text-[8px] font-black text-[#B7F532]">
                          {getMixedPortionLabels(language).mixed}: {formatSopWeight(item.mixedGrams ?? item.grams, language)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-[8px] font-bold leading-4 text-white/55">
                  {getMixedPortionLabels(language).note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-[16px] border border-[#22D3EE]/15 bg-[#22D3EE]/[0.04] p-3">
          <p className="text-[11px] font-black text-[#22D3EE]">
            {language === "ar"
              ? "طريقة حفظ بروتين اللحمة والفراخ"
              : language === "bg"
                ? "Съхранение на телешко и пилешко"
                : "Beef & chicken storage workflow"}
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2 text-[8.5px] font-bold leading-5 text-white/74">
            <p>
              {language === "ar"
                ? "1. تبّل الكمية كلها مرة واحدة."
                : language === "bg"
                  ? "1. Овкуси цялото количество веднъж."
                  : "1. Season the full amount once."}
            </p>
            <p>
              {language === "ar"
                ? "2. اطبخ جزء الأيام 1–3 أو خزّنه للطبخ القريب."
                : language === "bg"
                  ? "2. Сготви или охлади частта за дни 1–3."
                  : "2. Cook or chill the days 1–3 portion."}
            </p>
            <p>
              {language === "ar"
                ? "3. جزء الأيام 4–6 يدخل الفريزر فورًا."
                : language === "bg"
                  ? "3. Замрази частта за дни 4–6 веднага."
                  : "3. Freeze the days 4–6 portion immediately."}
            </p>
            <p className="text-[#D8C56A]">
              {language === "ar"
                ? "4. قبل التحضير الثاني، انقله للثلاجة."
                : language === "bg"
                  ? "4. Преди втория етап го премести в хладилника."
                  : "4. Before the second prep, thaw in the fridge."}
            </p>
          </div>
        </div>
      </section>

      <section
        className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-black tracking-[0.14em] text-[#22D3EE]">
              {getSopLabel("supportTitle", language)}
            </p>

            <h2 className="mt-2 max-w-[620px] text-[27px] font-black leading-tight text-white">
              {getSopLabel("supportSubtitle", language)}
            </h2>
          </div>

          <div className="rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.07] px-4 py-3 text-center">
            <p className="text-[20px] font-black text-[#B7F532]">4</p>
            <p className="text-[10px] font-black text-white/70">
              {language === "ar"
                ? "قواعد سهلة"
                : language === "bg"
                  ? "лесни правила"
                  : "easy rules"}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-[18px] border border-[#D8C56A]/25 bg-[#D8C56A]/[0.07] p-4">
          <p className="text-[15px] font-black leading-7 text-[#D8C56A]">
            {getSopLabel("workflowBody", language)}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] p-3">
            <p className="text-[16px] font-black text-[#22D3EE]">
              {getSopLabel("quickProtein", language)}
            </p>
            <p className="mt-2 text-[11.5px] font-bold leading-5 text-white/82">
              {getPrepCardRule("quickProtein", language)}
            </p>
            <div className="mt-3 grid gap-2">
              {engineSop.quickProteins.slice(0, 4).map((item) => (
                <div
                  key={`${item.name}-${item.total}`}
                  className="rounded-[10px] border border-white/16 bg-black/20 px-3 py-2 text-[10.5px] font-black leading-5 text-white/90"
                >
                  {formatPrepListItem(item, language)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-black leading-5 text-[#B7F532]">
              {getPrepCardFooter("quickProtein", language)}
            </p>
          </div>

          <div className="rounded-[18px] border border-[#B7F532]/25 bg-[#B7F532]/[0.06] p-3">
            <p className="text-[16px] font-black text-[#B7F532]">
              {getSopLabel("carbs", language)}
            </p>
            <p className="mt-2 text-[11.5px] font-bold leading-5 text-white/82">
              {getPrepCardRule("carbs", language)}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {engineSop.carbPrep.slice(0, 4).map((item) => (
                <div
                  key={`${item.name}-${item.total}`}
                  className="rounded-[10px] border border-white/16 bg-black/20 px-3 py-2 text-[10.5px] font-black leading-5 text-white/90"
                >
                  {formatPrepListItem(item, language)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-black leading-5 text-[#D8C56A]">
              {getPrepCardFooter("carbs", language)}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-[#D8C56A]/25 bg-[#D8C56A]/[0.06] p-3">
            <p className="text-[16px] font-black text-[#D8C56A]">
              {getSopLabel("sauces", language)}
            </p>
            <p className="mt-2 text-[11.5px] font-bold leading-5 text-white/82">
              {getPrepCardRule("sauces", language)}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {engineSop.saucePrep.slice(0, 4).map((item) => (
                <div
                  key={`${item.name}-${item.total}`}
                  className="rounded-[10px] border border-white/16 bg-black/20 px-3 py-2 text-[10.5px] font-black leading-5 text-white/90"
                >
                  {formatPrepListItem(item, language)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-black leading-5 text-[#B7F532]">
              {getPrepCardFooter("sauces", language)}
            </p>
          </div>

          <div className="rounded-[18px] border border-white/15 bg-white/[0.05] p-3">
            <p className="text-[16px] font-black text-white">
              {getSopLabel("vegetables", language)}
            </p>
            <p className="mt-2 text-[11.5px] font-bold leading-5 text-white/82">
              {getPrepCardRule("vegetables", language)}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {engineSop.vegetablePrep.slice(0, 4).map((item) => (
                <div
                  key={`${item.name}-${item.total}`}
                  className="rounded-[10px] border border-white/16 bg-black/20 px-3 py-2 text-[10.5px] font-black leading-5 text-white/90"
                >
                  {formatPrepListItem(item, language)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-black leading-5 text-[#22D3EE]">
              {getPrepCardFooter("vegetables", language)}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] p-4">
          <p className="text-[14px] font-black leading-7 text-[#22D3EE]">
            {language === "ar"
              ? "الخطوة التالية بسيطة: اطبخ، افتح خريطة تجهيز العلب، ووزّع كل علبة بالميزان. لا تحتاج تحفظ كل الأرقام من هذه الصفحة."
              : language === "bg"
                ? "Следващата стъпка е проста: сготви, отвори картата за разпределяне и раздели всяка кутия с кантар. Не е нужно да помниш всички числа от тази страница."
                : "Next step is simple: cook, open the portion map, and fill each container with a scale. You do not need to memorize all numbers from this page."}
          </p>
        </div>
      </section>

      <section
        className="break-before-page rounded-[22px] border border-[#B7F532]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        {(() => {
          const workflow = getNinetyMinutePrepWorkflowText(language);

          return (
            <>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#B7F532]">
                    {workflow.badge}
                  </p>

                  <h2 className="mt-2 max-w-[640px] text-[32px] font-black leading-tight text-white">
                    {workflow.title}
                  </h2>

                  <p className="mt-3 max-w-[700px] text-[13px] font-bold leading-7 text-white/74">
                    {workflow.subtitle}
                  </p>
                </div>

                <div className="rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.06] px-4 py-3 text-center">
                  <p className="text-[30px] font-black text-[#B7F532]">90</p>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/74">
                    MIN PREP
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[0.62fr_0.38fr] gap-4">
                <div className="rounded-[20px] border border-white/16 bg-black/25 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
                      {workflow.timelineLabel}
                    </p>
                    <p className="rounded-full border border-[#D8C56A]/20 bg-[#D8C56A]/[0.06] px-3 py-1 text-[9px] font-black text-[#D8C56A]">
                      {workflow.batchLabel}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {workflow.steps.map(([time, title, body]) => (
                      <div
                        key={`${time}-${title}`}
                        className="rounded-[14px] border border-white/16 bg-white/[0.035] p-3"
                      >
                        <p className="text-[10px] font-black text-[#B7F532]">
                          {time}
                        </p>
                        <p className="mt-1 text-[12px] font-black leading-5 text-white">
                          {title}
                        </p>
                        <p className="mt-1 text-[9.5px] font-bold leading-5 text-white/78">
                          {body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-[20px] border border-[#22D3EE]/20 bg-[#22D3EE]/[0.055] p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#22D3EE]">
                      Protein Engine
                    </p>
                    <p className="mt-2 text-[12px] font-bold leading-6 text-white/70">
                      {language === "ar"
                        ? "لحمة الأسبوع + فراخ الأسبوع. تبّل الكمية كلها، ثم اقسمها قبل الطبخ."
                        : language === "bg"
                          ? "Телешко + пилешко за седмицата. Овкуси всичко, после раздели преди готвене."
                          : "Weekly beef + weekly chicken. Season all, then split before cooking."}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.055] p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#D8C56A]">
                      Carb + Sauce + Fresh
                    </p>
                    <p className="mt-2 text-[12px] font-bold leading-6 text-white/70">
                      {language === "ar"
                        ? "اطبخ كارب المرحلة فقط، حضّر صوصات G7 الأساسية، وخلّي الخضار منفصل."
                        : language === "bg"
                          ? "Сготви само въглехидратите за batch-а, подготви G7 сосовете и дръж зеленчуците отделно."
                          : "Cook only this batch carbs, make the core G7 sauces, and keep vegetables separate."}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.055] p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#B7F532]">
                      Portion Engine
                    </p>
                    <p className="mt-2 text-[12px] font-bold leading-6 text-white/70">
                      {workflow.promise}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.06] p-4 text-center">
                <p className="text-[14px] font-black leading-7 text-[#B7F532]">
                  {workflow.footer}
                </p>
              </div>
            </>
          );
        })()}
      </section>

      <section
        className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        {(() => {
          const rawCooked = getRawToCookedSystemText(language);

          return (
            <>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
                    {rawCooked.badge}
                  </p>

                  <h2 className="mt-2 max-w-[610px] text-[32px] font-black leading-tight text-white">
                    {rawCooked.title}
                  </h2>

                  <p className="mt-3 max-w-[670px] text-[13px] font-bold leading-7 text-white/74">
                    {rawCooked.subtitle}
                  </p>
                </div>

                <div className="rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.05] px-4 py-3 text-center">
                  <p className="text-[24px] font-black text-[#B7F532]">G7</p>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/74">
                    PORTION ENGINE
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {[
                  [rawCooked.rawTitle, rawCooked.rawBody, "#22D3EE"],
                  [rawCooked.prepTitle, rawCooked.prepBody, "#B7F532"],
                  [rawCooked.cookTitle, rawCooked.cookBody, "#D8C56A"],
                  [rawCooked.portionTitle, rawCooked.portionBody, "#B7F532"],
                ].map(([title, body, color]) => (
                  <div
                    key={title}
                    className="rounded-[18px] border border-white/16 bg-black/25 p-4"
                  >
                    <p
                      className="text-[13px] font-black leading-5"
                      style={{ color }}
                    >
                      {title}
                    </p>
                    <p className="mt-2 text-[10px] font-bold leading-5 text-white/84">
                      {body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[20px] border border-[#B7F532]/20 bg-[#B7F532]/[0.05] p-4 text-center">
                <p className="text-[16px] font-black leading-7 text-[#B7F532]">
                  {rawCooked.formula}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[18px] border border-[#22D3EE]/20 bg-[#22D3EE]/[0.05] p-4">
                  <p className="text-[12px] font-black text-[#22D3EE]">
                    {rawCooked.chickenExample}
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-4">
                  <p className="text-[12px] font-black text-[#D8C56A]">
                    {rawCooked.riceExample}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[18px] border border-white/16 bg-white/[0.035] p-4">
                <p className="text-[13px] font-black text-white">
                  {rawCooked.resultTitle}
                </p>
                <p className="mt-2 text-[12px] font-bold leading-6 text-white/86">
                  {rawCooked.resultBody}
                </p>
              </div>
            </>
          );
        })()}
      </section>

      <BulkCookingReportPage engineSop={engineSop} language={language} />

      <section
        className="break-before-page rounded-[22px] border border-[#22D3EE]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22D3EE]">
              {language === "ar"
                ? "خريطة تجهيز علب المرحلة الأولى"
                : language === "bg"
                  ? "Карта за разпределяне · Етап 1"
                  : "Batch 1 Portion Map"}
            </p>

            <h2 className="mt-2 max-w-[610px] text-[30px] font-black leading-tight text-white">
              {language === "ar"
                ? "الأيام 1–3 · وزّع أول 9 وجبات"
                : language === "bg"
                  ? "Дни 1–3 · Разпредели първите 9 кутии"
                  : "Days 1–3 · Portion the first 9 meals"}
            </h2>

            <p className="mt-3 max-w-[650px] text-[12px] font-bold leading-6 text-white/74">
              {language === "ar"
                ? "بعد طبخ بروتين وكارب المرحلة الأولى، افتح هذه الصفحة أثناء تجهيز العلب. كل كارت يوضح البروتين والكارب والخضار والصوص/الدهون المطلوب لكل علبة."
                : language === "bg"
                  ? "След като сготвиш протеина и въглехидратите за етап 1, използвай тази страница при сглобяване. Всяка карта показва протеин, въглехидрати, зеленчуци и сос/мазнини за една кутия."
                  : "After cooking Batch 1 protein and carbs, use this page while assembling. Each card shows the protein, carb, vegetables, and sauce/fat for one container."}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.05] px-4 py-3 text-center">
            <p className="text-[26px] font-black text-[#22D3EE]">9</p>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/74">
              {language === "ar"
                ? "علب"
                : language === "bg"
                  ? "кутии"
                  : "Containers"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-3">
          <p className="text-[12px] font-black leading-6 text-[#D8C56A]">
            {language === "ar"
              ? "طريقة الاستخدام: لا تعتمد على العين. استخدم ميزان المطبخ. الأرقام الآن واضحة: قبل الطبخ للشراء والتحضير، ووقت التوزيع للوزن المطبوخ داخل العلبة. الوحدات الجاهزة مثل علبة تونة أو شريحة عيش تُستخدم كما هي."
              : language === "bg"
                ? "Как да използваш: не мери на око. Използвай кухненски кантар. Протеинът и въглехидратите са като тегло преди готвене; след готвене раздели готовото количество по същия брой кутии. Готови единици като тон или филия се използват както са."
                : "How to use: do not eyeball portions. Use a kitchen scale. The map now shows before-cooking weight for prep and cooked portion weight for the container. Ready units like tuna cans or bread slices are used as written."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {portionSummary.batch1.map((item, index) => (
            <div
              key={`batch1-${item.day}-${item.title}`}
              className="rounded-[12px] border border-[#22D3EE]/15 bg-black/25 p-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[8px] font-black text-[#22D3EE]">
                  {index + 1}. {getDayDisplay(item.day, language)} ·{" "}
                  {getRoleDisplay(item.role, language)}
                </p>
                <p className="text-[7px] font-black text-[#D8C56A]">
                  {language === "ar"
                    ? "علبة"
                    : language === "bg"
                      ? "кутия"
                      : "box"}
                </p>
              </div>

              <p className="mt-1 min-h-[24px] text-[9px] font-black leading-4 text-white">
                {item.title}
              </p>

              <div className="mt-2 grid gap-1">
                <div className="rounded-[8px] bg-[#22D3EE]/[0.06] px-2 py-1">
                  <p className="text-[7px] font-black text-[#22D3EE]">
                    {language === "ar"
                      ? "البروتين"
                      : language === "bg"
                        ? "Протеин"
                        : "Protein"}
                  </p>
                  <p className="whitespace-pre-line text-[7.5px] font-bold leading-4 text-white/72">
                    {item.protein}
                  </p>
                </div>

                <div className="rounded-[8px] bg-[#B7F532]/[0.06] px-2 py-1">
                  <p className="text-[7px] font-black text-[#B7F532]">
                    {language === "ar"
                      ? "الكارب"
                      : language === "bg"
                        ? "Въглехидрати"
                        : "Carb"}
                  </p>
                  <p className="whitespace-pre-line text-[7.5px] font-bold leading-4 text-white/72">
                    {item.carbs}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="rounded-[8px] bg-[#D8C56A]/[0.06] px-2 py-1">
                    <p className="text-[7px] font-black text-[#D8C56A]">
                      {language === "ar"
                        ? "الخضار"
                        : language === "bg"
                          ? "Зеленчуци"
                          : "Veg"}
                    </p>
                    <p className="text-[7px] font-bold leading-3 text-white/86">
                      {item.vegetables}
                    </p>
                  </div>

                  <div className="rounded-[8px] bg-[#D8C56A]/[0.06] px-2 py-1">
                    <p className="text-[7px] font-black text-[#D8C56A]">
                      {language === "ar"
                        ? "الصوص/الدهون"
                        : language === "bg"
                          ? "Сос/мазнини"
                          : "Sauce/Fat"}
                    </p>
                    <p className="text-[7px] font-bold leading-3 text-white/86">
                      {item.sauces}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[18px] border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-3">
          <p className="text-[11px] font-black leading-5 text-[#B7F532]">
            {language === "ar"
              ? "بعد الانتهاء: خزّن علب الأيام 1–3 في الثلاجة، وافصل الصوص عند الحاجة. استخدم زيت الزيتون أو بخاخ الطبخ للوجبات المطبوخة فقط حسب المكتوب، وأي دهون في الشوفان أو الشيك تُعامل كدهون محسوبة حسب الخطة. بروتين الأيام 4–6 يبقى في الفريزر حتى التحضير الثاني."
              : language === "bg"
                ? "След сглобяване: съхранявай кутиите за дни 1–3 в хладилник и отделяй сосовете при нужда. Използвай зехтин или спрей за готвене само за готвени ястия според написаното; при овес/шейк мазнината е планиран източник според плана. Протеинът за дни 4–6 остава във фризера до втората подготовка."
                : "After assembly: store days 1–3 containers chilled and keep sauces separate when needed. Use olive oil or cooking spray only for cooked meals as written; for oats or shakes, treat it as a planned healthy fat option. Days 4–6 protein stays frozen until the second prep."}
          </p>
        </div>
      </section>

      <section
        className="break-before-page rounded-[22px] border border-[#B7F532]/15 bg-[#07111F] p-5"
        style={{
          pageBreakBefore: "always",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#B7F532]">
              {language === "ar"
                ? "خريطة تجهيز علب المرحلة الثانية"
                : language === "bg"
                  ? "Карта за разпределяне · Етап 2"
                  : "Batch 2 Portion Map"}
            </p>

            <h2 className="mt-2 max-w-[610px] text-[30px] font-black leading-tight text-white">
              {language === "ar"
                ? "الأيام 4–6 · بعد فك البروتين من الفريزر"
                : language === "bg"
                  ? "Дни 4–6 · след размразяване в хладилника"
                  : "Days 4–6 · After thawing the frozen protein"}
            </h2>

            <p className="mt-3 max-w-[650px] text-[12px] font-bold leading-6 text-white/74">
              {language === "ar"
                ? "قبل التحضير الثاني، انقل بروتين المرحلة الثانية من الفريزر إلى الثلاجة. بعد الطبخ، استخدم هذه الخريطة لتوزيع 9 علب جديدة."
                : language === "bg"
                  ? "Преди втория етап премести замразения протеин в хладилника. След готвене използвай тази карта, за да сглобиш следващите 9 кутии."
                  : "Before Batch 2, move the frozen protein to the fridge. After cooking, use this map to assemble the next 9 containers."}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#B7F532]/25 bg-[#B7F532]/[0.05] px-4 py-3 text-center">
            <p className="text-[26px] font-black text-[#B7F532]">9</p>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/74">
              {language === "ar"
                ? "علب"
                : language === "bg"
                  ? "кутии"
                  : "Containers"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.05] p-3">
          <p className="text-[12px] font-black leading-6 text-[#D8C56A]">
            {language === "ar"
              ? "مهم: لا تفك البروتين على الرخامة. انقله من الفريزر إلى الثلاجة قبل التحضير الثاني. اتبع نفس القاعدة: وزن نيء للشراء والتحضير، ووزن مطبوخ للتوزيع داخل العلب."
              : language === "bg"
                ? "Важно: не размразявай протеина на плота. Премести го от фризера в хладилника преди втория етап. Протеинът и въглехидратите са преди готвене; след готвене раздели готовото количество с кантар."
                : "Important: do not thaw protein on the counter. Move it from freezer to fridge before Batch 2. Follow the same rule: raw weight for buying and prep, cooked weight for container portioning."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {portionSummary.batch2.map((item, index) => (
            <div
              key={`batch2-${item.day}-${item.title}`}
              className="rounded-[12px] border border-[#B7F532]/15 bg-black/25 p-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[8px] font-black text-[#B7F532]">
                  {index + 1}. {getDayDisplay(item.day, language)} ·{" "}
                  {getRoleDisplay(item.role, language)}
                </p>
                <p className="text-[7px] font-black text-[#D8C56A]">
                  {language === "ar"
                    ? "علبة"
                    : language === "bg"
                      ? "кутия"
                      : "box"}
                </p>
              </div>

              <p className="mt-1 min-h-[24px] text-[9px] font-black leading-4 text-white">
                {item.title}
              </p>

              <div className="mt-2 grid gap-1">
                <div className="rounded-[8px] bg-[#22D3EE]/[0.06] px-2 py-1">
                  <p className="text-[7px] font-black text-[#22D3EE]">
                    {language === "ar"
                      ? "البروتين"
                      : language === "bg"
                        ? "Протеин"
                        : "Protein"}
                  </p>
                  <p className="whitespace-pre-line text-[7.5px] font-bold leading-4 text-white/72">
                    {item.protein}
                  </p>
                </div>

                <div className="rounded-[8px] bg-[#B7F532]/[0.06] px-2 py-1">
                  <p className="text-[7px] font-black text-[#B7F532]">
                    {language === "ar"
                      ? "الكارب"
                      : language === "bg"
                        ? "Въглехидрати"
                        : "Carb"}
                  </p>
                  <p className="whitespace-pre-line text-[7.5px] font-bold leading-4 text-white/72">
                    {item.carbs}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="rounded-[8px] bg-[#D8C56A]/[0.06] px-2 py-1">
                    <p className="text-[7px] font-black text-[#D8C56A]">
                      {language === "ar"
                        ? "الخضار"
                        : language === "bg"
                          ? "Зеленчуци"
                          : "Veg"}
                    </p>
                    <p className="text-[7px] font-bold leading-3 text-white/86">
                      {item.vegetables}
                    </p>
                  </div>

                  <div className="rounded-[8px] bg-[#D8C56A]/[0.06] px-2 py-1">
                    <p className="text-[7px] font-black text-[#D8C56A]">
                      {language === "ar"
                        ? "الصوص/الدهون"
                        : language === "bg"
                          ? "Сос/мазнини"
                          : "Sauce/Fat"}
                    </p>
                    <p className="text-[7px] font-bold leading-3 text-white/86">
                      {item.sauces}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[18px] border border-[#22D3EE]/15 bg-[#22D3EE]/[0.04] p-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black text-[#22D3EE]">
                {language === "ar"
                  ? "اليوم 7 · تحضير أخف"
                  : "Day 7 · lighter prep"}
              </p>
              <p className="mt-1 text-[10px] leading-5 text-white/78">
                {language === "ar"
                  ? "اليوم السابع لا يحتاج باتش كبير. استخدم نفس منطق الميزان، لكن حضّر الوجبات بشكل أخف حسب وقتك."
                  : "Day 7 does not need a large batch. Use the same scale logic, but keep the prep lighter and flexible."}
              </p>
            </div>

            <div className="grid min-w-[330px] grid-cols-3 gap-1.5">
              {portionSummary.day7.map((item) => (
                <div
                  key={`day7-${item.title}`}
                  className="rounded-[9px] border border-white/16 bg-black/25 p-2"
                >
                  <p className="text-[7px] font-black leading-3 text-white/70">
                    {getRoleDisplay(item.role, language)} · {item.title}
                  </p>
                  <p className="mt-1 text-[7px] font-bold leading-3 text-[#B7F532]">
                    {item.protein}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Client PDF mode:
          Long per-meal recipe detail pages are intentionally hidden.
          The client uses the Bulk Cooking Report + Portion Maps for a shorter, easier PDF.
      */}

      <section className="mt-4 break-inside-avoid rounded-[20px] border border-[#D8C56A]/20 bg-[#D8C56A]/[0.04] p-4">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-[22px] font-black text-white">
              {t.estimatedCost}
            </h2>

            <p className="mt-1 text-[14px] font-black text-[#B7F532]">
              {t.estimatedCostSubtitle}
            </p>

            <p className="mt-2 text-[12px] leading-6 text-white/70">
              {t.estimatedCostBody}
            </p>

            {estimatedMealCost > 0 && (
              <p className="mt-3 text-[13px] font-bold leading-6 text-[#D8C56A]">
                {t.mealCostLine(estimatedMealCost)}
              </p>
            )}
          </div>

          <div className="rounded-[18px] border border-[#B7F532]/25 bg-black/25 px-5 py-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/84">
              {t.amountApprox}
            </p>

            <p className="mt-1 text-[26px] font-black text-[#B7F532]">
              {estimatedTotal > 0 ? `${estimatedTotal} EGP` : t.manualCost}
            </p>

            {estimatedMealCost > 0 && (
              <p className="mt-2 rounded-full border border-[#22D3EE]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#22D3EE]">
                ~ {estimatedMealCost} EGP / {t.perMeal}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 border-t border-[#22D3EE]/20 pt-3">
          <div className="flex items-center justify-between gap-4 rounded-[16px] border border-white/16 bg-black/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/g7-logo-clean.png"
                alt="G7"
                className="h-[30px] w-auto object-contain opacity-90"
              />

              <div>
                <p className="text-[10px] font-black text-white/70">
                  {t.footerSystem}
                </p>

                <p className="mt-1 text-[9px] text-white/80">
                  {t.footerPromise}
                </p>
              </div>
            </div>

            <p
              dir="ltr"
              className="whitespace-nowrap text-[12px] font-black text-[#B7F532]"
            >
              +20 112 844 2058
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/25 p-2">
      <p className="text-[9px] text-white/80">{label}</p>
      <p className="font-black text-white">{value}</p>
    </div>
  );
}

function MacroCompare({
  label,
  actual,
  target,
  language = "en",
}: {
  label: string;
  actual: number;
  target: number;
  language?: PdfLanguage;
}) {
  const diff = actual - target;
  const isClose = Math.abs(diff) <= 5;
  const macroText = getMacroUiText(language);

  return (
    <div className="rounded-xl border border-[#22D3EE]/10 bg-[#06111E] p-2">
      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#22D3EE]">
        {label}
      </p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <div>
          <p className="text-[8px] text-white/84">{macroText.actual}</p>
          <p className="text-[13px] font-black text-white">
            {formatGrams(actual, language)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[8px] text-white/84">{macroText.coachTarget}</p>
          <p className="text-[13px] font-black text-[#B7F532]">
            {formatGrams(target, language)}
          </p>
        </div>
      </div>

      <p
        className={`mt-1 text-[9px] font-bold ${
          isClose ? "text-[#B7F532]" : "text-[#D8C56A]"
        }`}
      >
        {isClose ? macroText.onTarget : formatMacroDelta(diff, language)}
      </p>
    </div>
  );
}
