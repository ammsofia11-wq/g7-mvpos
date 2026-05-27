export type PrepSystem = {
  id: string
  title: string
  subtitle: string
  rawBase: string
  yieldNote: string
  coreIdea: string
  homeSop: string[]
  centralKitchenSop: string[]
  weeklyApplications: string[]
}

export const G7_PREP_SYSTEMS: PrepSystem[] = [
  {
    id: "beef-base",
    title: "Beef Kofta Base System",
    subtitle: "One beef base. Multiple dishes.",
    rawBase: "1600g lean minced beef raw weight",
    yieldNote:
      "All weights are calculated before cooking. Beef loses weight during cooking depending on fat level and cooking method.",
    coreIdea:
      "Season one full batch of minced beef, then transform it across the week using different shapes, sauces, carbs, and cooking methods.",
    homeSop: [
      "ضع اللحم المفروم في بولة كبيرة.",
      "أضف بصل أحمر مفروم، طماطم مبشورة، فلفل رومي أخضر، ملح، فلفل أسود، وسبع بهارات.",
      "اخلط اللحم جيدًا بدون عجن زائد حتى يظل طريًا بعد التسوية.",
      "قسّم الخليط إلى حصص حسب أيام الأسبوع قبل الطبخ.",
      "كل حصة تأخذ شكل مختلف: كفتة، كرات، حواوشي، ستير فراي، أو بولونيز.",
      "استخدم ميزان المطبخ قبل التسوية لضبط الجرامات المطلوبة لكل خطة.",
    ],
    centralKitchenSop: [
      "استلم اللحم كوزن خام وسجّل الوزن قبل التتبيل.",
      "حضّر تتبيلة موحدة للدفعة بالكامل لضمان ثبات الطعم.",
      "قسّم الخليط إلى batches صغيرة حسب نوع الطبق.",
      "شكّل كل batch حسب الاستخدام: kofta fingers, meatballs, patties, loose mince.",
      "سجّل yield بعد التسوية لمراجعة الفاقد وتحسين cost control.",
      "برّد البروتين جزئيًا قبل التعبئة للحفاظ على texture وسلامة التخزين.",
    ],
    weeklyApplications: [
      "Day 1: Kofta with spiced basmati rice + light yogurt sauce.",
      "Day 2: Meatballs with whole wheat penne + tomato sauce.",
      "Day 3: Hawawshi fit with baladi bread + side salad.",
      "Day 4: Swedish-style meatballs with mashed potato.",
      "Day 5: Kofta stir-fry with vegetables + jasmine rice.",
      "Day 6: Pink bolognese-style beef pasta.",
      "Day 7: Light beef recovery bowl.",
    ],
  },
  {
    id: "chicken-base",
    title: "Chicken Breast Base System",
    subtitle: "Clean protein. Multiple flavor directions.",
    rawBase: "1600g chicken breast raw weight",
    yieldNote:
      "Chicken breast is weighed raw. After cooking it may lose around 25%–35% depending on heat, pan, oven, and moisture control.",
    coreIdea:
      "Cook chicken as a clean base, then rotate sauces and carbs so the client does not feel they are eating the same meal every day.",
    homeSop: [
      "قطّع صدور الفراخ إلى مكعبات أو شرائح حسب الطبق.",
      "قسّم الكمية إلى 3 اتجاهات: plain base, fajita base, kofta/meatball style.",
      "تبّل جزء بالفاهيتا، جزء بتتبيلة كفتة خفيفة، وجزء اتركه plain لاستخدامه مع الصوصات.",
      "سوّي الفراخ على نار متوسطة حتى تظل طرية ولا تنشف.",
      "بعد التسوية، اتركها تهدأ ثم قسّمها في علب حسب اليوم.",
      "غيّر الطعم بالصوص وليس بتغيير البروتين كل مرة.",
    ],
    centralKitchenSop: [
      "قسّم الدجاج الخام حسب production plan قبل التسوية.",
      "اطبخ plain chicken base أولًا لاستخدامه في pasta, rice bowl, burger, and pink sauce.",
      "اطبخ fajita batch منفصل للخضار والبطاطس.",
      "حافظ على internal moisture بتجنب overcooking.",
      "سجّل raw weight and cooked yield لكل batch.",
      "ركّب الوجبات بعد cooling phase للحفاظ على safety and texture.",
    ],
    weeklyApplications: [
      "Chicken kofta rice bowl.",
      "Chicken meatballs penne pasta.",
      "Chicken quesadilla fit.",
      "Chicken pink sauce pasta.",
      "Chicken burger fit.",
      "Chicken fajita sweet potato.",
    ],
  },
  {
    id: "fish-tuna-base",
    title: "Fish & Tuna Light Protein System",
    subtitle: "Lighter protein for recovery and fresh reset days.",
    rawBase: "500g fish fillet raw weight + tuna in water cans",
    yieldNote:
      "Fish is weighed raw before cooking. Tuna cans should be drained before portioning unless the plan says otherwise.",
    coreIdea:
      "Use fish and tuna as lighter protein tools for digestion, recovery, and lower-fat days.",
    homeSop: [
      "تبّل السمك بليمون، ثوم، فلفل أسود، ملح خفيف، وأعشاب.",
      "سوّي السمك في الفرن أو air fryer أو جريل حسب المتاح.",
      "صفّي التونة من الماء قبل وزنها.",
      "استخدم التونة مع صوص طماطم أو راب أو رز حسب اليوم.",
      "لا تطبخ التونة وقت طويل؛ فقط سخّنها مع الصوص للحفاظ على texture.",
    ],
    centralKitchenSop: [
      "قسّم السمك raw portions قبل التسوية.",
      "استخدم marinade خفيف للحفاظ على fresh profile.",
      "اطبخ السمك close to dispatch أو خزّنه بحذر لأنه حساس.",
      "صفّي التونة وسجّل drained weight.",
      "ركّب tuna meals cold أو warm حسب نوع الطبق.",
    ],
    weeklyApplications: [
      "Tuna pasta light.",
      "Tuna protein wrap.",
      "Tuna tomato sauce with basmati rice.",
      "Oven baked fish lemon herb with roasted potato.",
    ],
  },
]

export const G7_SAUCE_MATRIX = [
  {
    name: "Light Yogurt Sauce",
    worksWith: ["beef", "chicken", "fish"],
    note: "مناسب للكفتة، الرز، والوجبات الخفيفة. يمكن استبداله بطحينة خفيفة في GF/DF حسب الخطة.",
  },
  {
    name: "Tomato Red Sauce",
    worksWith: ["beef", "chicken", "tuna"],
    note: "قاعدة ممتازة للمكرونة، كرات اللحم، والتونة.",
  },
  {
    name: "Pink Light Sauce",
    worksWith: ["chicken", "beef", "tuna"],
    note: "يعطي إحساس comfort food بدون تحويل الخطة لأكل تقيل.",
  },
  {
    name: "Chimichurri Smart Marinade",
    worksWith: ["beef", "chicken", "fish", "eggs", "vegan protein"],
    note: "فلفل ألوان، ثوم، ملح بحري أو pink salt، خل أبيض، نعناع أو أعشاب طازة.",
  },
  {
    name: "Fajita Sauce",
    worksWith: ["chicken", "beef", "fish"],
    note: "ممتاز مع البطاطس، الرز، والخضار المشوح.",
  },
  {
    name: "Butter-Style Flavor Sauce",
    worksWith: ["chicken", "beef", "fish", "eggs", "chickpeas", "ful medames"],
    note: "نفس فكرة butter chicken flavor لكن ممكن تتغير حسب البروتين: فراخ، لحمة، سمك، بيض، حمص، أو فول.",
  },
]

export const G7_YIELD_EDUCATION = [
  "كل الأوزان في الشراء والتحضير تكون قبل الطبخ unless stated otherwise.",
  "البروتين يقل بعد التسوية بسبب فقدان الماء والدهون.",
  "الرز والمكرونة وزنهم قبل الطبخ، وبعد الطبخ يزيد الوزن بسبب امتصاص الماء.",
  "البطاطس ممكن تفقد وزن بعد التقشير أو الشوي.",
  "استخدم الميزان قبل الطبخ لضبط الخطة، ثم قسّم الناتج بعد الطبخ حسب العلب.",
  "الفكرة ليست طبخ 21 وصفة منفصلة؛ الفكرة هي batch protein + carb rotation + sauce matrix.",
]