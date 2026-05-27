export type MealIntelligenceNote = {
  mealId: string

  flavorBase: string
  mealFeeling:
    | "performance"
    | "comfort"
    | "street_food_fit"
    | "fresh"
    | "recovery"
    | "light"

  yieldNote: string

  shoppingNote: string

  storageNote: string

  reheatNote: string

  bestReheat:
    | "microwave"
    | "pan"
    | "air_fryer"
    | "oven"

  textureAfterStorage:
    | "excellent"
    | "good"
    | "best_same_day"

  chefTips: string[]

  batchCookingNotes: string[]
}

export const G7_MEAL_INTELLIGENCE_NOTES: MealIntelligenceNote[] = [
  {
    mealId: "day-1-chicken-kofta-basmati-rice",

    flavorBase: "G7 Chicken Spice Base",

    mealFeeling: "performance",

    yieldNote:
      "وزن الدجاج يتم قبل الطبخ. بعد التسوية قد يفقد 25–35% من الوزن حسب الحرارة وطريقة الطبخ.",

    shoppingNote:
      "يفضل شراء صدور الفراخ كاملة وتقسيمها batch للأسبوع لتقليل التكلفة.",

    storageNote:
      "يُحفظ الأرز منفصل عن الصوص للحفاظ على texture أفضل أثناء التخزين.",

    reheatNote:
      "أفضل إعادة تسخين تكون في طاسة أو microwave مع نقطة ماء بسيطة على الأرز.",

    bestReheat: "pan",

    textureAfterStorage: "excellent",

    chefTips: [
      "لا تبالغ في خلط الدجاج المفروم حتى لا يصبح ناشف.",
      "استخدم جريل أو طاسة سخنة لإعطاء لون بدون دهون إضافية.",
      "أضف الصوص وقت التقديم وليس أثناء التخزين.",
    ],

    batchCookingNotes: [
      "حضّر كمية الدجاج بالكامل مرة واحدة.",
      "قسّم الكفتة قبل التسوية حسب الجرامات المطلوبة.",
      "اطبخ الأرز batch منفصل لـ 3 أيام.",
    ],
  },

  {
    mealId: "day-1-beef-kofta-rice-plate",

    flavorBase: "Beef Kofta Base",

    mealFeeling: "recovery",

    yieldNote:
      "اللحم المفروم قليل الدهون يفقد جزء من الوزن بعد التسوية بسبب خروج السوائل.",

    shoppingNote:
      "استخدم نسبة دهون قليلة للحفاظ على الماكروز وتقليل الانكماش.",

    storageNote:
      "يفضل تخزين الكفتة بعد تبريدها الجزئي للحفاظ على القوام.",

    reheatNote:
      "أفضل إعادة تسخين للكفتة تكون على طاسة ساخنة أو air fryer.",

    bestReheat: "air_fryer",

    textureAfterStorage: "excellent",

    chefTips: [
      "البصل المبشور يعطي عصارة للكفتة.",
      "لا تضغط الكفتة أثناء التسوية حتى لا تفقد العصارة.",
      "استخدم بهارات دافئة مثل الحبهان والقرفة بنسبة خفيفة.",
    ],

    batchCookingNotes: [
      "استخدم نفس beef base لأكثر من طبق خلال الأسبوع.",
      "غيّر الشكل والصوص بدل تغيير البروتين بالكامل.",
    ],
  },

  {
    mealId: "day-3-lean-hawawshi",

    flavorBase: "Beef Kofta Base",

    mealFeeling: "street_food_fit",

    yieldNote:
      "العيش البلدي قد يفقد جزء من القرمشة بعد التخزين الطويل.",

    shoppingNote:
      "اختيار عيش حبة كاملة جيد يفرق جدًا في النتيجة النهائية.",

    storageNote:
      "يفضل استهلاك الحواوشي خلال 24 ساعة للحصول على أفضل texture.",

    reheatNote:
      "أفضل إعادة تسخين تكون داخل air fryer أو فرن.",

    bestReheat: "air_fryer",

    textureAfterStorage: "best_same_day",

    chefTips: [
      "افرد اللحم بطبقة رفيعة داخل العيش للحصول على قرمشة أفضل.",
      "يمكن إضافة شطة أو فلفل حار حسب رغبة العميل.",
    ],

    batchCookingNotes: [
      "يمكن تجهيز الحواوشي قبل التسوية وتخزينه raw.",
      "يُفضل خبزه fresh وقت التقديم لو متاح.",
    ],
  },

  {
    mealId: "day-4-tuna-pasta-light",

    flavorBase: "Light Tuna Tomato Base",

    mealFeeling: "light",

    yieldNote:
      "يجب تصفية التونة جيدًا قبل الوزن للحصول على الماكروز الصحيحة.",

    shoppingNote:
      "التونة بالماء خيار اقتصادي ممتاز لأيام الريكافري.",

    storageNote:
      "يفضل حفظ التونة في علبة مغلقة جيدًا وعدم تركها مكشوفة.",

    reheatNote:
      "تسخين خفيف فقط حتى لا تصبح التونة جافة.",

    bestReheat: "microwave",

    textureAfterStorage: "good",

    chefTips: [
      "إضافة بقدونس طازج ترفع الطعم بشكل واضح.",
      "لا تطبخ التونة فترة طويلة.",
    ],

    batchCookingNotes: [
      "يمكن تجهيز صوص الطماطم batch منفصل.",
      "أضف التونة في آخر مرحلة.",
    ],
  },

  {
    mealId: "day-7-fish-lemon-herb-potato",

    flavorBase: "Lemon Herb Fish Base",

    mealFeeling: "fresh",

    yieldNote:
      "السمك يفقد جزء من الوزن أثناء الخبز حسب نوع الفيليه.",

    shoppingNote:
      "البلطي أو الفيليه الأبيض خيار ممتاز اقتصاديًا للسوق المصري.",

    storageNote:
      "السمك أفضل جودة عند استهلاكه fresh أو خلال 24 ساعة.",

    reheatNote:
      "أفضل إعادة تسخين تكون داخل oven أو air fryer.",

    bestReheat: "oven",

    textureAfterStorage: "good",

    chefTips: [
      "الليمون والأعشاب يخففوا أي زفارة.",
      "لا تبالغ في وقت التسوية حتى لا ينشف السمك.",
    ],

    batchCookingNotes: [
      "يفضل تجهيز التتبيلة مسبقًا.",
      "اطبخ السمك أقرب لوقت التقديم مقارنة بالفراخ أو اللحمة.",
    ],
  },
]

export function getMealIntelligenceNote(mealId: string) {
  return G7_MEAL_INTELLIGENCE_NOTES.find(
    (note) => note.mealId === mealId
  )
}