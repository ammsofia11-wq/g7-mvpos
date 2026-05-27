import { PlanKey } from "./plans"

export type MealRole = "BREAKFAST" | "LUNCH" | "DINNER"

export type MealPurpose =
  | "ENERGY"
  | "ACTIVE"
  | "RECOVERY"
  | "SATIETY"
  | "PRE_WORKOUT"
  | "POST_WORKOUT"

export type ProteinCore =
  | "eggs"
  | "oats"
  | "protein_shake"
  | "chicken"
  | "lean_beef"
  | "tuna"
  | "fish"

export type CarbCore =
  | "bread"
  | "rice"
  | "pasta"
  | "potato"
  | "sweet_potato"
  | "oats"
  | "wrap"

export type MasterMeal = {
  id: string
  day: number
  role: MealRole
  purpose: MealPurpose
  icon: string
  title: string
  subtitle: string
  mood: string
  whyThisMealExists: string
  bestTime: string
  storageTip: string
  reheatMethod: string
  chefNote: string
  proteinCore: ProteinCore
  carbCore: CarbCore

  proteinCookedWeight: number
  carbCookedWeight: number

  baseProteinCooked: number
  baseCarbCooked: number
  maxFat: number

  imagePrompt: string
  raw: [string, string][]
  cooked: [string, string][]
  steps: {
    title: string
    body: string
  }[]
}

export const G7_MASTER_MEALS: MasterMeal[] = [
  {
    id: "day-1-egg-power-breakfast",
    day: 1,
    role: "BREAKFAST",
    purpose: "ENERGY",
    icon: "☀️",
    title: "Morning Power Eggs",
    subtitle: "فطار عالي البروتين يساعدك تبدأ اليوم بطاقة وثبات.",
    mood: "Fast Morning Fuel",
    whyThisMealExists:
      "فطار بسيط عالي البروتين يساعدك تبدأ اليوم بطاقة ثابتة من غير ثقل.",
    bestTime: "الصبح أو قبل يوم شغل طويل.",
    storageTip:
      "الأفضل يتعمل فريش، لكن تقدر تحضّر الخضار والعيش مسبقًا.",
    reheatMethod:
      "سخّن البيض على نار هادئة أو في الميكروويف 30–45 ثانية.",
    chefNote:
      "خلي النار متوسطة والبيض طري؛ البيض الناشف بيخلي الالتزام أصعب.",
    proteinCore: "eggs",
    carbCore: "bread",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 36,
    baseCarbCooked: 24,
    maxFat: 10,

    imagePrompt:
      "meal prep container breakfast eggs whole wheat bread tomato cucumber",
    raw: [
      ["Whole Eggs", "2 eggs"],
      ["Egg Whites", "150g"],
      ["Whole Wheat Bread", "1 slice"],
      ["Tomato & Cucumber", "150g"],
    ],
    cooked: [["Egg Breakfast", "1 serving"]],
    steps: [
      {
        title: "جهّز البيض",
        body: "سخّن طاسة non-stick دقيقة، ثم اطبخ البيض والبياض على نار متوسطة 3–4 دقائق بملح وفلفل فقط. خلي القوام طري مش ناشف.",
      },
      {
        title: "قدّم الوجبة",
        body: "قدّم البيض مع العيش الحبة الكاملة والخضار الطازة. لو مستعجل، جهّز الخضار من الليلة قبلها وخلي البيض فريش.",
      },
    ],
  },

  {
    id: "day-1-chicken-kofta-basmati-rice",
    day: 1,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Street Grill Chicken Kofta Bowl",
    subtitle: "وجبة غداء عالية البروتين للطاقة والالتزام.",
    mood: "Clean Start Performance",
    whyThisMealExists:
      "وجبة تأسيسية عالية الشبع تجمع بروتين نظيف وكارب ثابت للطاقة والالتزام.",
    bestTime: "الغداء أو بعد التمرين.",
    storageTip:
      "خزّن الكفتة والأرز في علبة، والصوص منفصل للحفاظ على القوام 3 أيام.",
    reheatMethod:
      "سخّن الكفتة والأرز على نار هادئة أو ميكروويف مع رشة ماء بسيطة.",
    chefNote:
      "لو عايز طعم أقوى، حمّر الكفتة دقيقة زيادة من كل جانب بدون ما تنشف.",
    proteinCore: "chicken",
    carbCore: "rice",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 65,
    baseCarbCooked: 42,
    maxFat: 8,

    imagePrompt:
      "black meal prep container chicken kofta basmati rice cucumber yogurt sauce",
    raw: [
      ["Chicken Breast Raw", "280g"],
      ["Basmati Rice Raw", "50g"],
      ["Cucumber Yogurt Sauce", "60g"],
      ["Green Salad", "100g"],
    ],
    cooked: [
      ["Cooked Chicken Kofta", "200g"],
      ["Cooked Basmati Rice", "150g"],
    ],
    steps: [
      {
        title: "تبّل الفراخ",
        body: "اخلط الفراخ المفرومة مع البابريكا، الثوم، البصل، الأوريجانو، الفلفل والملح. قسّم الخليط من البداية حسب عدد العلب عشان كل وجبة تبقى مظبوطة.",
      },
      {
        title: "اطبخ الكفتة",
        body: "سخّن الطاسة دقيقتين، شكّل الكفتة، واطبخها 4–5 دقائق لكل ناحية على نار متوسطة. الهدف لون ذهبي من بره وقوام طري من جوه.",
      },
      {
        title: "قسّم الوجبات",
        body: "قسّم الأرز والكفتة في علب 3 أيام. خلي صوص الزبادي بالخيار منفصل، وضيفه وقت الأكل عشان الطعم والقوام يفضلوا فريش.",
      },
    ],
  },

  {
    id: "day-1-beef-kofta-rice-plate",
    day: 1,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Egyptian Beef Power Plate",
    subtitle: "عشاء ريكافري عالي البروتين قليل الدهون.",
    mood: "Recovery Grill Comfort",
    whyThisMealExists:
      "عشاء مشبع بطابع كفتة مألوف يساعدك تقفل اليوم ببروتين قوي بدون دهون عالية.",
    bestTime: "العشاء أو وجبة ريكافري بعد تمرين متأخر.",
    storageTip:
      "خلي صوص الطحينة منفصل وأضفه وقت الأكل عشان الوجبة تفضل فريش.",
    reheatMethod:
      "سخّن الكفتة والأرز ببطء؛ الحرارة الهادية تحافظ على الطراوة.",
    chefNote:
      "ما تضغطش اللحم أثناء التشكيل؛ ده سر الكفتة الطرية بعد التخزين.",
    proteinCore: "lean_beef",
    carbCore: "rice",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 58,
    baseCarbCooked: 42,
    maxFat: 12,

    imagePrompt:
      "black meal prep container lean beef kofta basmati rice tahini sauce",
    raw: [
      ["Lean Minced Beef Raw", "280g"],
      ["Basmati Rice Raw", "50g"],
      ["Light Tahini Sauce", "35g"],
      ["Green Salad", "120g"],
    ],
    cooked: [
      ["Cooked Beef Kofta", "200g"],
      ["Cooked Basmati Rice", "150g"],
    ],
    steps: [
      {
        title: "تبّل اللحم",
        body: "اخلط اللحم قليل الدهون مع بصل ناعم، فلفل أخضر، بهارات، ملح وفلفل. قلّب بخفة من غير ضغط عشان الكفتة تفضل طرية بعد التخزين.",
      },
      {
        title: "اطبخ الكفتة",
        body: "سخّن الطاسة كويس، شكّل الكفتة، واطبخها 4–5 دقائق لكل ناحية. ما تقلبهاش كتير؛ سيبها تاخد لون الأول.",
      },
      {
        title: "قسّم وخزّن",
        body: "قسّم الكفتة والأرز في علب 3 أيام. خلي صوص الطحينة منفصل، وسخّن الوجبة على نار هادئة أو ميكروويف مع رشة ماء بسيطة.",
      },
    ],
  },

  {
    id: "day-2-protein-oats",
    day: 2,
    role: "BREAKFAST",
    purpose: "ENERGY",
    icon: "☀️",
    title: "Creamy Muscle Oats",
    subtitle: "فطار سريع للطاقة قبل يوم نشيط.",
    mood: "Creamy Energy Build",
    whyThisMealExists:
      "فطار سريع يديك طاقة وكارب نظيف مع بروتين عالي بدون تحضير معقد.",
    bestTime: "الصبح أو قبل التمرين بساعتين.",
    storageTip:
      "ينفع يتحضر من الليل كـ overnight oats لو هتاكله بارد.",
    reheatMethod:
      "لو سخنته، أضف رشة ماء أو لبن قليل الدسم وقلّب.",
    chefNote:
      "لا تضيف الواي على نار مباشرة؛ أطفئ النار الأول عشان القوام يفضل ناعم.",
    proteinCore: "oats",
    carbCore: "oats",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 34,
    baseCarbCooked: 55,
    maxFat: 8,

    imagePrompt: "protein oats meal prep cup banana cinnamon fitness breakfast",
    raw: [
      ["Oats", "70g"],
      ["Whey Protein", "1 scoop"],
      ["Banana", "80g"],
      ["Cinnamon", "2g"],
    ],
    cooked: [["Protein Oats", "1 serving"]],
    steps: [
      {
        title: "اطبخ الشوفان",
        body: "اطبخ الشوفان على نار هادئة 4–5 دقائق مع التقليب. زوّد ماء بسيط لو القوام تقل بسرعة عشان يفضل كريمي.",
      },
      {
        title: "ضيف البروتين",
        body: "اطفي النار، استنى 30 ثانية، ثم ضيف البروتين تدريجيًا مع التقليب السريع. كده القوام يفضل ناعم من غير تكتلات.",
      },
    ],
  },

  {
    id: "day-2-chicken-meatballs-penne",
    day: 2,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Italian Chicken Meatball Pasta",
    subtitle: "غداء أكتيف بطعم إيطالي خفيف.",
    mood: "Italian Training Fuel",
    whyThisMealExists:
      "وجبة باستا محسوبة تعطيك إحساس comfort food مع بروتين عالي وتحكم في السعرات.",
    bestTime: "الغداء أو بعد تمرين قوي.",
    storageTip:
      "خلي الصوص يغطي كرات الدجاج عشان تفضل طرية لحد 3 أيام.",
    reheatMethod:
      "سخّنها بغطاء مع ملعقة ماء صغيرة عشان الباستا ما تنشفش.",
    chefNote:
      "كرات الدجاج الصغيرة أفضل للـ meal prep لأنها تسخن بسرعة وتفضل juicy.",
    proteinCore: "chicken",
    carbCore: "pasta",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 65,
    baseCarbCooked: 47,
    maxFat: 8,

    imagePrompt:
      "black meal prep container chicken meatballs penne pasta tomato sauce",
    raw: [
      ["Chicken Breast Core Raw", "280g"],
      ["Whole Wheat Penne Raw", "63g"],
      ["Tomato Sauce", "120g"],
      ["Green Pepper", "80g"],
    ],
    cooked: [
      ["Cooked Chicken Meatballs", "200g"],
      ["Cooked Penne Pasta", "150g"],
    ],
    steps: [
      {
        title: "شكّل كرات الدجاج",
        body: "قسّم خليط الدجاج لكرات صغيرة متساوية. الحجم المتقارب يخليها تستوي بسرعة وتسخن بسهولة خلال 3 أيام.",
      },
      {
        title: "اطبخها في الصوص",
        body: "سخّن صوص الطماطم، ضيف كرات الدجاج، وسيبها 8–10 دقائق على نار هادئة. الصوص يحافظ على الطراوة أثناء التخزين.",
      },
      {
        title: "قسّم الوجبات",
        body: "قسّم الباستا وكرات الدجاج في علب 3 أيام. خلي الصوص يغطي البروتين عشان يفضل طري وقت التسخين.",
      },
    ],
  },

  {
    id: "day-2-beef-meatballs-penne",
    day: 2,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Recovery Kofta Pasta",
    subtitle: "عشاء ريكافري مشبع ومنظم.",
    mood: "Comfort Recovery Pasta",
    whyThisMealExists:
      "عشاء ريكافري مشبع بطابع كفتة وباستا بدون الخروج عن النظام.",
    bestTime: "العشاء أو بعد يوم مجهد.",
    storageTip:
      "خزّن الباستا مع الصوص، وخلي رشة البقدونس وقت التقديم.",
    reheatMethod:
      "سخّن على نار هادئة أو ميكروويف مع تقليب في المنتصف.",
    chefNote:
      "الصوص هو اللي يحافظ على طراوة اللحم؛ لا تخلي الوجبة ناشفة.",
    proteinCore: "lean_beef",
    carbCore: "pasta",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 58,
    baseCarbCooked: 47,
    maxFat: 12,

    imagePrompt:
      "black meal prep container lean beef meatballs penne pasta tomato sauce",
    raw: [
      ["Lean Beef Core Raw", "280g"],
      ["Whole Wheat Penne Raw", "63g"],
      ["Tomato Sauce", "120g"],
      ["Parsley", "20g"],
    ],
    cooked: [
      ["Cooked Beef Meatballs", "200g"],
      ["Cooked Penne Pasta", "150g"],
    ],
    steps: [
      {
        title: "شكّل كرات الكفتة",
        body: "شكّل كرات متوسطة بخفة من غير ضغط. الضغط الزيادة يخلي الكفتة ناشفة بعد التسخين.",
      },
      {
        title: "اطبخها في الصوص",
        body: "اطبخ كرات الكفتة داخل صوص الطماطم 8–10 دقائق على نار متوسطة. خلي الصوص موجود حواليها عشان ما تنشفش.",
      },
      {
        title: "قسّم وخزّن",
        body: "قسّم الباستا والكفتة في العلب، ورشة البقدونس تكون وقت الأكل. لو الوجبة لليوم الثالث، سخّنها مع ملعقة ماء صغيرة.",
      },
    ],
  },

  {
    id: "day-3-eggs-potato",
    day: 3,
    role: "BREAKFAST",
    purpose: "SATIETY",
    icon: "☀️",
    title: "Street Style Eggs & Potato",
    subtitle: "فطار مشبع ومناسب ليوم طويل.",
    mood: "High Satiety Morning",
    whyThisMealExists:
      "فطار مشبع مناسب ليوم طويل لأنه يجمع بروتين سريع وبطاطس مريحة للطاقة.",
    bestTime: "الصبح أو قبل مشوار طويل.",
    storageTip:
      "البطاطس ممكن تتحضر مسبقًا، والبيض الأفضل يتعمل فريش.",
    reheatMethod:
      "سخّن البطاطس في air fryer أو طاسة لاسترجاع القرمشة.",
    chefNote:
      "حمّر البطاطس كويس؛ اللون الذهبي يفرق جدًا في الإحساس بالطعم.",
    proteinCore: "eggs",
    carbCore: "potato",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 36,
    baseCarbCooked: 33,
    maxFat: 10,

    imagePrompt:
      "meal prep container eggs roasted potato peppers fitness breakfast",
    raw: [
      ["Whole Eggs", "2 eggs"],
      ["Egg Whites", "150g"],
      ["Potato Raw", "180g"],
      ["Bell Pepper", "80g"],
    ],
    cooked: [["Eggs & Potato", "1 serving"]],
    steps: [
      {
        title: "حمّر البطاطس",
        body: "قطّع البطاطس مكعبات، ورش ملح وفلفل، وحمّرها في air fryer أو طاسة non-stick لحد ما تاخد لون ذهبي.",
      },
      {
        title: "اطبخ البيض",
        body: "اطبخ البيض والبياض مع الفلفل على نار متوسطة 3–4 دقائق. قلّب بهدوء وخلي القوام طري.",
      },
    ],
  },

  {
    id: "day-3-chicken-quesadilla",
    day: 3,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Chicken Quesadilla Street Fit",
    subtitle: "غداء أكتيف بطابع مكسيكي.",
    mood: "Street-Fit Energy",
    whyThisMealExists:
      "وجبة street-food ذكية تساعدك تلتزم نفسيًا بدون ما تحس إنك محروم.",
    bestTime: "الغداء أو وجبة خارج البيت.",
    storageTip:
      "خزّن الحشو منفصل ولف التورتيلا وقت الأكل للحصول على أفضل قوام.",
    reheatMethod:
      "حمّرها على طاسة ناشفة دقيقة لكل جانب.",
    chefNote:
      "التحميص الخفيف هو سر الإحساس بالمطاعم بدون دهون زيادة.",
    proteinCore: "chicken",
    carbCore: "wrap",

    proteinCookedWeight: 200,
    carbCookedWeight: 2,

    baseProteinCooked: 65,
    baseCarbCooked: 54,
    maxFat: 11,

    imagePrompt:
      "black meal prep container chicken quesadilla coriander peppers light mozzarella",
    raw: [
      ["Chicken Breast Core Raw", "280g"],
      ["Whole Wheat Tortilla", "2 medium wraps"],
      ["Light Mozzarella", "25g"],
      ["Green Pepper & Coriander", "80g"],
    ],
    cooked: [["Chicken Quesadilla", "1 serving"]],
    steps: [
      {
        title: "جهّز حشو الفراخ",
        body: "اطبخ خليط الفراخ على طاسة non-stick 6–8 دقائق لحد ما يستوي ويتفتت بسهولة. سيبه يبرد دقيقة قبل الحشو.",
      },
      {
        title: "حمّر الكاساديا",
        body: "حط الحشو في التورتيلا، اقفلها، وحمّرها دقيقة لكل ناحية على طاسة ناشفة. لو بتحضّر مسبقًا، خزّن الحشو منفصل ولف وقت الأكل.",
      },
    ],
  },

  {
    id: "day-3-lean-hawawshi",
    day: 3,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Lean Egyptian Hawawshi",
    subtitle: "عشاء ريكافري بطابع مصري مألوف.",
    mood: "Egyptian Craving Control",
    whyThisMealExists:
      "نسخة ذكية من الحواوشي تشبع الرغبة في أكل مصري مألوف داخل نظام محسوب.",
    bestTime: "العشاء أو وجبة weekend control.",
    storageTip:
      "اتركه يبرد ثم خزّنه ملفوفًا، والأفضل إعادة تحميصه قبل الأكل.",
    reheatMethod:
      "Air fryer أو فرن 3–5 دقائق لاسترجاع القرمشة.",
    chefNote:
      "سيبه يهدى دقيقة قبل التقطيع عشان العصارة تفضل جوه.",
    proteinCore: "lean_beef",
    carbCore: "bread",

    proteinCookedWeight: 200,
    carbCookedWeight: 1,

    baseProteinCooked: 58,
    baseCarbCooked: 60,
    maxFat: 14,

    imagePrompt:
      "black meal prep container healthy lean beef hawawshi green salad",
    raw: [
      ["Lean Beef Core Raw", "280g"],
      ["Baladi Bread", "1 medium loaf"],
      ["Green Salad", "150g"],
      ["Pickles", "40g"],
    ],
    cooked: [["Lean Hawawshi", "1 serving"]],
    steps: [
      {
        title: "احشي العيش",
        body: "افرد خليط اللحم داخل العيش البلدي بطبقة متساوية. خليه أرفع في النص عشان يستوي كله من غير جزء نيّ.",
      },
      {
        title: "حمّر الحواوشي",
        body: "ادخله الفرن أو air fryer 8–12 دقيقة لحد ما العيش يتحمص واللحم يستوي. سيبه يهدى دقيقة قبل التقطيع.",
      },
    ],
  },

  {
    id: "day-4-protein-shake",
    day: 4,
    role: "BREAKFAST",
    purpose: "ENERGY",
    icon: "☀️",
    title: "Fast Fuel Protein Shake",
    subtitle: "فطار سريع وخفيف.",
    mood: "Light Fast Reset",
    whyThisMealExists:
      "فطار سريع جدًا للأيام المشغولة بدون طبخ مع بروتين واضح وطاقة خفيفة.",
    bestTime: "الصبح السريع أو بعد التمرين.",
    storageTip:
      "الأفضل يشرب فورًا، ولو هتخزنه خليه بارد ومغلق.",
    reheatMethod:
      "لا يعاد تسخينه؛ يقدم بارد.",
    chefNote:
      "ابدأ بالسائل ثم البودرة ثم الشوفان عشان الخلط يبقى أنعم.",
    proteinCore: "protein_shake",
    carbCore: "oats",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 31,
    baseCarbCooked: 34,
    maxFat: 6,

    imagePrompt: "protein shake oats banana fitness breakfast",
    raw: [
      ["Whey Protein", "1 scoop"],
      ["Oats", "40g"],
      ["Banana", "60g"],
      ["Water or Low-Fat Milk", "as needed"],
    ],
    cooked: [["Protein Shake", "1 serving"]],
    steps: [
      {
        title: "اخلط الشيك",
        body: "حط السائل الأول، ثم البروتين، ثم الشوفان والموز. اخلط لحد قوام ناعم. اشربه فورًا أو احفظه بارد في زجاجة محكمة.",
      },
    ],
  },

  {
    id: "day-4-chicken-pink-pasta",
    day: 4,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Creamy Pink Chicken Pasta",
    subtitle: "غداء أكتيف بصوص بينك خفيف.",
    mood: "Creamy Active Comfort",
    whyThisMealExists:
      "باستا كريمية محسوبة تعطي إحساس وجبة premium بدون دهون ثقيلة.",
    bestTime: "الغداء أو بعد التمرين.",
    storageTip:
      "خلي الصوص رطب قليلًا قبل التخزين عشان الباستا ما تنشفش.",
    reheatMethod:
      "سخّن مع رشة ماء أو ملعقة صوص إضافية.",
    chefNote:
      "القوام الكريمي أهم من كمية الصوص؛ غلّف الباستا فقط بدون إغراق.",
    proteinCore: "chicken",
    carbCore: "pasta",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 65,
    baseCarbCooked: 47,
    maxFat: 10,

    imagePrompt: "black meal prep container chicken pink sauce pasta",
    raw: [
      ["Chicken Breast Core Raw", "280g"],
      ["Pasta Raw", "63g"],
      ["Light Pink Sauce", "100g"],
      ["Mushroom or Pepper", "100g"],
    ],
    cooked: [
      ["Cooked Chicken", "200g"],
      ["Cooked Pasta", "150g"],
    ],
    steps: [
      {
        title: "اطبخ الفراخ",
        body: "اطبخ خليط الفراخ على نار متوسطة 6–8 دقائق وفتته بالمعلقة زي بولونيز. متسيبوش ينشف.",
      },
      {
        title: "قلّب الباستا",
        body: "قلّب الباستا مع الفراخ والصوص لحد ما تتغلف. لو هتخزن 3 أيام، خليها رطبة شوية عشان التسخين يبقى أفضل.",
      },
    ],
  },

  {
    id: "day-4-tuna-pasta-light",
    day: 4,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Mediterranean Tuna Pasta",
    subtitle: "عشاء ريكافري خفيف وسهل التحضير.",
    mood: "Light Recovery Pasta",
    whyThisMealExists:
      "وجبة تونة سهلة وسريعة للريكافري عندما تحتاج بروتين عالي وتحضير خفيف.",
    bestTime: "العشاء أو وجبة خفيفة بعد يوم طويل.",
    storageTip:
      "اتركها تبرد قبل غلق العلبة حتى لا يتكثف البخار.",
    reheatMethod:
      "سخّن على نار هادئة جدًا؛ التونة تنشف بسرعة.",
    chefNote:
      "حافظ على الصوص رطب؛ ده الفرق بين تونة ناشفة ووجبة لطيفة.",
    proteinCore: "tuna",
    carbCore: "pasta",

    proteinCookedWeight: 180,
    carbCookedWeight: 150,

    baseProteinCooked: 50,
    baseCarbCooked: 47,
    maxFat: 6,

    imagePrompt:
      "black meal prep container tuna pasta tomato basil fitness meal",
    raw: [
      ["Tuna in Water", "2 cans"],
      ["Whole Wheat Penne Raw", "63g"],
      ["Tomato Sauce", "100g"],
      ["Parsley", "20g"],
    ],
    cooked: [
      ["Cooked Tuna Pasta", "180g"],
      ["Cooked Penne Pasta", "150g"],
    ],
    steps: [
      {
        title: "سخّن صوص التونة",
        body: "صفّي التونة، سخّن صوص الطماطم، ثم ضيف التونة على نار هادئة 2–3 دقائق فقط. التونة بتنشف بسرعة.",
      },
      {
        title: "قلّب وقدّم",
        body: "قلّب التونة مع الباستا. للتخزين، سيبها تبرد قبل غلق العلبة عشان البخار ما يطرّيش الوجبة.",
      },
    ],
  },

  {
    id: "day-5-egg-white-omelette",
    day: 5,
    role: "BREAKFAST",
    purpose: "SATIETY",
    icon: "☀️",
    title: "Lean Morning Omelette",
    subtitle: "فطار عالي البروتين قليل الدهون.",
    mood: "Lean Morning Control",
    whyThisMealExists:
      "فطار عالي البروتين قليل الدهون مصمم للشبع بدون سعرات زائدة.",
    bestTime: "الصبح أو أيام التحكم في الشهية.",
    storageTip:
      "الأومليت يفضل فريش، والخضار يمكن تحضيره مسبقًا.",
    reheatMethod:
      "ميكروويف 20–30 ثانية فقط حتى لا ينشف.",
    chefNote:
      "ارفع الأومليت قبل ما ينشف تمامًا؛ الحرارة المتبقية تكمل التسوية.",
    proteinCore: "eggs",
    carbCore: "bread",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 35,
    baseCarbCooked: 23,
    maxFat: 7,

    imagePrompt:
      "meal prep container egg white omelette whole wheat bread",
    raw: [
      ["Egg Whites", "220g"],
      ["Whole Egg", "1 egg"],
      ["Whole Wheat Bread", "1 slice"],
      ["Mushroom & Pepper", "120g"],
    ],
    cooked: [["Egg White Omelette", "1 serving"]],
    steps: [
      {
        title: "اطبخ الأومليت",
        body: "اطبخ البياض مع بيضة كاملة والخضار على نار متوسطة. ارفعها وهي لسه طرية؛ الحرارة المتبقية تكمل التسوية.",
      },
    ],
  },

  {
    id: "day-5-chicken-burger",
    day: 5,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Lean Smash Chicken Burger",
    subtitle: "غداء أكتيف يشبع الرغبة بدون خروج عن النظام.",
    mood: "Gym Comfort Burger",
    whyThisMealExists:
      "برجر محسوب يشبع الرغبة في fast food بدون كسر النظام.",
    bestTime: "الغداء أو يوم cravings-control.",
    storageTip:
      "خزّن الخبز والصوص منفصلين، والبروتين لوحده.",
    reheatMethod:
      "سخّن الباتي على طاسة، واجمع البرجر وقت الأكل.",
    chefNote:
      "تحميص الخبز 30 ثانية يرفع الإحساس بالوجبة جدًا.",
    proteinCore: "chicken",
    carbCore: "bread",

    proteinCookedWeight: 200,
    carbCookedWeight: 1,

    baseProteinCooked: 65,
    baseCarbCooked: 48,
    maxFat: 11,

    imagePrompt:
      "black meal prep container healthy chicken burger brown bun lettuce tomato",
    raw: [
      ["Chicken Breast Core Raw", "280g"],
      ["Brown Burger Bun", "1 bun"],
      ["Light Burger Sauce", "35g"],
      ["Lettuce & Tomato", "120g"],
    ],
    cooked: [["Chicken Burger", "1 serving"]],
    steps: [
      {
        title: "شكّل الباتي",
        body: "شكّل باتي فراخ متساوي السمك. اعمله أرفع شوية في النص عشان يستوي بسرعة ومن غير ما ينشف.",
      },
      {
        title: "ركّب البرجر",
        body: "سخّن الباتي، حمّر الخبز 30 ثانية، ثم حط الخس والطماطم والصوص. للتخزين، خلي الخبز والصوص منفصلين.",
      },
    ],
  },

  {
    id: "day-5-beef-kofta-yogurt-rice",
    day: 5,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Recovery Beef Kofta Bowl",
    subtitle: "عشاء ريكافري مشبع وسهل التحضير.",
    mood: "Balanced Recovery Bowl",
    whyThisMealExists:
      "وجبة ريكافري مشبعة بطعم كفتة وصوص زبادي خفيف يحافظ على الالتزام.",
    bestTime: "العشاء أو بعد تمرين مقاومة.",
    storageTip:
      "الصوص منفصل دائمًا؛ أضفه وقت الأكل للحفاظ على الطعم.",
    reheatMethod:
      "سخّن الكفتة والأرز ثم أضف الصوص باردًا.",
    chefNote:
      "التباين بين الكفتة الساخنة وصوص الزبادي البارد يعطي إحساس premium.",
    proteinCore: "lean_beef",
    carbCore: "rice",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 58,
    baseCarbCooked: 42,
    maxFat: 12,

    imagePrompt:
      "black meal prep container beef kofta rice yogurt sauce",
    raw: [
      ["Lean Beef Core Raw", "280g"],
      ["Basmati Rice Raw", "50g"],
      ["Yogurt Sauce", "60g"],
      ["Green Salad", "120g"],
    ],
    cooked: [
      ["Cooked Beef Kofta", "200g"],
      ["Cooked Rice", "150g"],
    ],
    steps: [
      {
        title: "اطبخ الكفتة",
        body: "اطبخ الكفتة على نار متوسطة 4–5 دقائق لكل ناحية. سيبها ترتاح دقيقة قبل التقسيم عشان العصارة تفضل جوه.",
      },
      {
        title: "قسّم مع الصوص",
        body: "قسّم الأرز والكفتة في العلب، وخلي صوص الزبادي منفصل. أضف الصوص بارد وقت الأكل عشان الوجبة تحسها fresh.",
      },
    ],
  },

  {
    id: "day-6-chocolate-protein-oats",
    day: 6,
    role: "BREAKFAST",
    purpose: "ENERGY",
    icon: "☀️",
    title: "Chocolate Recovery Oats",
    subtitle: "فطار حلو ومتحكم في السعرات.",
    mood: "Sweet Controlled Fuel",
    whyThisMealExists:
      "فطار بطابع حلو يساعدك تقاوم cravings مع بروتين عالي وكارب محسوب.",
    bestTime: "الصبح أو قبل التمرين بساعتين.",
    storageTip:
      "ينفع overnight في الثلاجة، ويُضاف ماء بسيط قبل الأكل.",
    reheatMethod:
      "سخّن بهدوء مع تقليب مستمر لو عايزه دافئ.",
    chefNote:
      "الكاكاو مع القرفة يدي إحساس dessert بدون سعرات عالية.",
    proteinCore: "oats",
    carbCore: "oats",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 34,
    baseCarbCooked: 55,
    maxFat: 8,

    imagePrompt:
      "chocolate protein oats fitness breakfast meal prep cup",
    raw: [
      ["Oats", "70g"],
      ["Whey Protein", "1 scoop"],
      ["Cocoa Powder", "8g"],
      ["Banana", "80g"],
    ],
    cooked: [["Chocolate Recovery Oats", "1 serving"]],
    steps: [
      {
        title: "اطبخ الشوفان",
        body: "اطبخ الشوفان على نار هادئة 4–5 دقائق مع التقليب. زوّد ماء بسيط لو القوام تقل بسرعة عشان يفضل كريمي.",
      },
      {
        title: "ضيف الشوكولاتة والبروتين",
        body: "اطفي النار، ضيف البروتين والكاكاو تدريجيًا، وقلّب لحد قوام ناعم. رشة قرفة تدي إحساس dessert.",
      },
    ],
  },

  {
    id: "day-6-chicken-fajita-sweet-potato",
    day: 6,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Smoky Chicken Fajita Bowl",
    subtitle: "غداء أكتيف بطعم فاهيتا وبطاطا حلوة.",
    mood: "Performance Push",
    whyThisMealExists:
      "وجبة فاهيتا عالية النكهة مع كارب هادئ للطاقة وثبات الأداء.",
    bestTime: "الغداء أو بعد التمرين.",
    storageTip:
      "خزّن الدجاج والخضار معًا والبطاطا بجانبهم في نفس العلبة.",
    reheatMethod:
      "طاسة ساخنة أو air fryer أفضل لاسترجاع ريحة الفاهيتا.",
    chefNote:
      "النار العالية نسبيًا هي سر طعم الفاهيتا الحقيقي.",
    proteinCore: "chicken",
    carbCore: "sweet_potato",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 65,
    baseCarbCooked: 38,
    maxFat: 8,

    imagePrompt:
      "black meal prep container chicken fajita sweet potato peppers red onion",
    raw: [
      ["Chicken Breast Core Raw", "280g"],
      ["Sweet Potato Raw", "180g"],
      ["Colored Peppers & Red Onion", "180g"],
      ["Fajita Sauce", "35g"],
    ],
    cooked: [
      ["Cooked Chicken Fajita", "200g"],
      ["Cooked Sweet Potato", "150g"],
    ],
    steps: [
      {
        title: "شوّح الفاهيتا",
        body: "سخّن الطاسة كويس، ثم شوّح الدجاج مع الفلفل والبصل على نار عالية 5–7 دقائق عشان تاخد ريحة الجريل.",
      },
      {
        title: "قسّم وخزّن",
        body: "قسّم الدجاج والخضار مع البطاطا في العلب. لو عايز أفضل قوام، سخّنها على طاسة أو air fryer بدل الميكروويف.",
      },
    ],
  },

  {
    id: "day-6-tuna-wrap",
    day: 6,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "High Protein Tuna Melt Wrap",
    subtitle: "عشاء ريكافري خفيف عالي البروتين.",
    mood: "Light Recovery Wrap",
    whyThisMealExists:
      "عشاء سريع عالي البروتين ومناسب لما تحتاج وجبة خفيفة بدون طبخ كبير.",
    bestTime: "العشاء أو وجبة أثناء الحركة.",
    storageTip:
      "خزّن الحشو منفصل ولف وقت الأكل حتى لا تطرى التورتيلا.",
    reheatMethod:
      "تحمير خفيف على طاسة، أو يقدم بارد حسب الرغبة.",
    chefNote:
      "رطوبة الحشو مهمة؛ الزبادي يمنع التونة من الجفاف.",
    proteinCore: "tuna",
    carbCore: "wrap",

    proteinCookedWeight: 180,
    carbCookedWeight: 2,

    baseProteinCooked: 50,
    baseCarbCooked: 54,
    maxFat: 7,

    imagePrompt: "black meal prep container tuna wrap fitness style",
    raw: [
      ["Tuna in Water", "2 cans"],
      ["Whole Wheat Tortilla", "2 medium wraps"],
      ["Lettuce & Tomato", "120g"],
      ["Light Yogurt Sauce", "60g"],
    ],
    cooked: [["Tuna Wrap", "2 wraps"]],
    steps: [
      {
        title: "جهّز حشو التونة",
        body: "اخلط التونة المصفّاة مع الزبادي والخضار. خلي الحشو رطب خفيف عشان التورتيلا ما تبقاش ناشفة.",
      },
      {
        title: "لفّ وحمّر",
        body: "لف التورتيلا بإحكام وحمّرها دقيقة لكل ناحية. لو الوجبة لليوم التاني أو التالت، خزّن الحشو منفصل ولف وقت الأكل.",
      },
    ],
  },

  {
    id: "day-7-shakshuka-eggs",
    day: 7,
    role: "BREAKFAST",
    purpose: "SATIETY",
    icon: "☀️",
    title: "Cairo Shakshuka Power Eggs",
    subtitle: "فطار مصري مشبع وعالي البروتين.",
    mood: "Light Egyptian Reset",
    whyThisMealExists:
      "فطار مألوف ومشبع يساعدك تنهي الأسبوع بأكل حقيقي بدون تعقيد.",
    bestTime: "صباح اليوم السابع أو يوم راحة.",
    storageTip:
      "الصوص ممكن يتحضر مسبقًا، والبيض يضاف وقت الأكل.",
    reheatMethod:
      "سخّن الصوص ثم أضف البيض فريش.",
    chefNote:
      "كمون بسيط وفلفل يرفعوا إحساس الشكشوكة من غير سعرات.",
    proteinCore: "eggs",
    carbCore: "bread",

    proteinCookedWeight: 1,
    carbCookedWeight: 1,

    baseProteinCooked: 36,
    baseCarbCooked: 24,
    maxFat: 10,

    imagePrompt:
      "meal prep container shakshuka eggs whole wheat bread",
    raw: [
      ["Whole Eggs", "2 eggs"],
      ["Egg Whites", "150g"],
      ["Tomato Sauce", "120g"],
      ["Whole Wheat Bread", "1 slice"],
    ],
    cooked: [["Shakshuka Eggs", "1 serving"]],
    steps: [
      {
        title: "سخّن قاعدة الطماطم",
        body: "سخّن صوص الطماطم مع فلفل وكمون 3–4 دقائق لحد ما يتقل وتظهر ريحة الشكشوكة.",
      },
      {
        title: "سوّي البيض",
        body: "ضيف البيض والبياض على الصوص، غطّي الطاسة دقيقتين، وسيبه على نار هادئة لحد القوام اللي تحبه.",
      },
    ],
  },

  {
    id: "day-7-tuna-tomato-rice",
    day: 7,
    role: "LUNCH",
    purpose: "ACTIVE",
    icon: "⚡",
    title: "Tuna Tomato Rice Reset",
    subtitle: "غداء خفيف وعملي عالي البروتين.",
    mood: "Fresh Practical Lunch",
    whyThisMealExists:
      "غداء عملي وخفيف يجمع بروتين سريع وكارب ثابت ليوم reset.",
    bestTime: "الغداء أو وجبة سريعة قبل الخروج.",
    storageTip:
      "افصل الأرز عن صوص التونة لو هتاكلها بعد يومين.",
    reheatMethod:
      "سخّن الصوص والتونة بهدوء، والأرز منفصل مع رشة ماء.",
    chefNote:
      "الفلفل الأخضر يخلي التونة fresher ويكسر طعم العلبة.",
    proteinCore: "tuna",
    carbCore: "rice",

    proteinCookedWeight: 180,
    carbCookedWeight: 150,

    baseProteinCooked: 50,
    baseCarbCooked: 42,
    maxFat: 6,

    imagePrompt:
      "black meal prep container tuna tomato sauce basmati rice",
    raw: [
      ["Tuna in Water", "2 cans"],
      ["Basmati Rice Raw", "50g"],
      ["Tomato Sauce", "120g"],
      ["Green Pepper", "80g"],
    ],
    cooked: [
      ["Tuna Tomato Sauce", "180g"],
      ["Cooked Rice", "150g"],
    ],
    steps: [
      {
        title: "سخّن التونة بالطماطم",
        body: "صفّي التونة وسخّنها مع صوص الطماطم والفلفل على نار هادئة 2–3 دقائق. خليك محافظ على الصوص رطب.",
      },
      {
        title: "قدّم مع الأرز",
        body: "قدّم التونة فوق الأرز. لو هتخزنها، افصل الأرز عن الصوص خصوصًا لو الوجبة لليوم التاني.",
      },
    ],
  },

  {
    id: "day-7-fish-lemon-herb-potato",
    day: 7,
    role: "DINNER",
    purpose: "RECOVERY",
    icon: "🌙",
    title: "Lemon Herb Fish Reset Plate",
    subtitle: "عشاء ريكافري خفيف ومناسب لنهاية الأسبوع.",
    mood: "Clean Light Finish",
    whyThisMealExists:
      "عشاء خفيف ونظيف ينهي الأسبوع ببروتين سهل الهضم وطعم ليمون منعش.",
    bestTime: "العشاء أو يوم الراحة.",
    storageTip:
      "السمك يفضل يؤكل خلال 24–48 ساعة، والبطاطس منفصلة أفضل.",
    reheatMethod:
      "فرن أو air fryer بحرارة هادئة؛ لا تسخنه زيادة حتى لا ينشف.",
    chefNote:
      "الليمون الكثير يغير قوام السمك؛ التتبيل القصير أفضل.",
    proteinCore: "fish",
    carbCore: "potato",

    proteinCookedWeight: 200,
    carbCookedWeight: 150,

    baseProteinCooked: 52,
    baseCarbCooked: 33,
    maxFat: 7,

    imagePrompt:
      "black meal prep container oven baked fish lemon herb roasted potato",
    raw: [
      ["Fish Fillet Raw", "240g"],
      ["Potato Raw", "180g"],
      ["Lemon Herb Marinade", "35g"],
      ["Green Salad", "100g"],
    ],
    cooked: [
      ["Cooked Fish", "200g"],
      ["Roasted Potato", "150g"],
    ],
    steps: [
      {
        title: "تبّل السمك",
        body: "تبّل السمك بليمون وأعشاب وثوم وملح. سيبه 10 دقائق فقط؛ الليمون الكثير يغير قوام السمك.",
      },
      {
        title: "سوّي السمك",
        body: "ادخل السمك والبطاطس الفرن لحد النضج. طلّع السمك وهو لسه طري، وسخّنه لاحقًا بحرارة هادئة فقط.",
      },
    ],
  }
]

export function getMasterMeals() {
  return G7_MASTER_MEALS
}

export function getMasterMealsByDay(day: number) {
  return G7_MASTER_MEALS.filter((meal) => meal.day === day)
}

export function getMealPurposeLabel(purpose: MealPurpose) {
  const labels: Record<MealPurpose, string> = {
    ENERGY: "ENERGY",
    ACTIVE: "ACTIVE",
    RECOVERY: "RECOVERY",
    SATIETY: "SATIETY",
    PRE_WORKOUT: "PRE-WORKOUT",
    POST_WORKOUT: "POST-WORKOUT",
  }

  return labels[purpose]
}

export function getPlanScaling(planId: PlanKey) {
  if (planId === "shredding") {
    return {
      kcalMultiplier: 0.86,
      proteinMultiplier: 1,
      carbMultiplier: 0.78,
      fatMultiplier: 0.75,
      label: "Shredding",
    }
  }

  if (planId === "mass_gainer") {
    return {
      kcalMultiplier: 1.35,
      proteinMultiplier: 1.12,
      carbMultiplier: 1.45,
      fatMultiplier: 1,
      label: "Mass Gainer",
    }
  }

  if (planId === "budget_athlete") {
    return {
      kcalMultiplier: 1.05,
      proteinMultiplier: 0.95,
      carbMultiplier: 1.08,
      fatMultiplier: 0.85,
      label: "Budget Athlete",
    }
  }

  if (planId === "premium_chef") {
    return {
      kcalMultiplier: 1.15,
      proteinMultiplier: 1.08,
      carbMultiplier: 1.15,
      fatMultiplier: 0.9,
      label: "Premium Chef",
    }
  }

  return {
    kcalMultiplier: 1,
    proteinMultiplier: 1,
    carbMultiplier: 1,
    fatMultiplier: 0.85,
    label: "Lean Bulk",
  }
}