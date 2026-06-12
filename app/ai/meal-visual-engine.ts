export type MealVisualMood =
  | "premium-comfort"
  | "clean-athlete"
  | "egyptian-grill"
  | "meal-prep-classic"
  | "burger-style"
  | "seafood-clean"
  | "breakfast-power"
  | "oats-power"
  | "street-fit"
  | "shake-fast"
  | "wrap-style"

export type MealVisualLanguage = "ar" | "en" | "bg"

export type MealVisualIdentity = {
  mealId: string
  visualTitle: string
  pleasureLine: string
  proteinLabel: string
  carbLabel: string
  sauceLabel: string
  vegLabel: string
  chefNote: string
  prepNote: string
  visualMood: MealVisualMood
}

type LocalizedMealVisualIdentity = {
  mealId: string
  visualMood: MealVisualMood
  en: Omit<MealVisualIdentity, "mealId" | "visualMood">
  ar: Omit<MealVisualIdentity, "mealId" | "visualMood">
  bg: Omit<MealVisualIdentity, "mealId" | "visualMood">
}

const localizedMealVisualIdentities: LocalizedMealVisualIdentity[] = [
  {
    mealId: "morning-power-eggs",
    visualMood: "breakfast-power",
    en: {
      visualTitle: "Morning Power Eggs",
      pleasureLine:
        "A simple high-protein breakfast with eggs, cottage cheese, bread, and fresh vegetables.",
      proteinLabel: "Whole eggs + cottage cheese",
      carbLabel: "Whole wheat bread",
      sauceLabel: "No sauce needed",
      vegLabel: "Tomato & cucumber",
      chefNote: "A clean start that feels familiar, filling, and easy to repeat.",
      prepNote:
        "Cook the eggs, portion the cottage cheese, and serve with bread and fresh vegetables.",
    },
    ar: {
      visualTitle: "بيض صباحي عالي البروتين",
      pleasureLine:
        "فطار بسيط ومشبع يجمع البيض، الجبنة القريش، العيش، والخضار الطازة.",
      proteinLabel: "بيض كامل + جبنة قريش",
      carbLabel: "عيش حبوب كاملة",
      sauceLabel: "بدون صوص",
      vegLabel: "طماطم وخيار",
      chefNote: "بداية نظيفة ومألوفة تساعدك تلتزم من أول اليوم.",
      prepNote:
        "اطبخ البيض، جهّز الجبنة القريش، وقدّمهم مع العيش والخضار الطازة.",
    },
    bg: {
      visualTitle: "Сутрешни силови яйца",
      pleasureLine:
        "Лесна протеинова закуска с яйца, котидж сирене, хляб и свежи зеленчуци.",
      proteinLabel: "Яйца + котидж сирене",
      carbLabel: "Пълнозърнест хляб",
      sauceLabel: "Без сос",
      vegLabel: "Домат и краставица",
      chefNote: "Чист старт, който е лесен, засищащ и повторяем.",
      prepNote:
        "Сготви яйцата, добави котидж сирене и сервирай с хляб и зеленчуци.",
    },
  },
  {
    mealId: "street-grill-chicken-kofta-bowl",
    visualMood: "egyptian-grill",
    en: {
      visualTitle: "Street Grill Chicken Kofta Bowl",
      pleasureLine:
        "Seasoned chicken kofta with basmati rice, green salad, and cool yogurt sauce.",
      proteinLabel: "Chicken kofta",
      carbLabel: "Basmati rice",
      sauceLabel: "Cucumber yogurt sauce",
      vegLabel: "Green salad",
      chefNote: "Street-grill flavor built inside a controlled athlete bowl.",
      prepNote:
        "Shape the chicken mix, grill or pan-sear it, then portion with rice, salad, and sauce.",
    },
    ar: {
      visualTitle: "كفتة فراخ جريل مع أرز",
      pleasureLine:
        "كفتة فراخ متبلة بطابع جريل مع أرز بسمتي، سلطة خضراء، وصوص زبادي بالخيار.",
      proteinLabel: "كفتة فراخ",
      carbLabel: "أرز بسمتي",
      sauceLabel: "صوص زبادي بالخيار",
      vegLabel: "سلطة خضراء",
      chefNote: "إحساس أكل جريل حقيقي لكن داخل نظام محسوب.",
      prepNote:
        "شكّل خليط الفراخ، اشويه أو شوّحه، ثم وزّعه مع الأرز والسلطة والصوص.",
    },
    bg: {
      visualTitle: "Пилешка кофта с ориз",
      pleasureLine:
        "Овкусена пилешка кофта с ориз басмати, салата и свеж йогурт сос.",
      proteinLabel: "Пилешка кофта",
      carbLabel: "Ориз басмати",
      sauceLabel: "Йогурт сос с краставица",
      vegLabel: "Зелена салата",
      chefNote: "Грил вкус в контролирана фитнес чиния.",
      prepNote:
        "Оформи пилешката смес, сготви я и разпредели с ориз, салата и сос.",
    },
  },
  {
    mealId: "egyptian-beef-power-plate",
    visualMood: "egyptian-grill",
    en: {
      visualTitle: "Egyptian Beef Power Plate",
      pleasureLine:
        "Lean beef kofta with fluffy basmati rice, green salad, and light tahini sauce.",
      proteinLabel: "Lean beef kofta",
      carbLabel: "Basmati rice",
      sauceLabel: "Light tahini sauce",
      vegLabel: "Green salad",
      chefNote: "A real Egyptian plate experience with controlled portions.",
      prepNote:
        "Shape the beef mix into kofta, cook it, then serve with rice, salad, and tahini.",
    },
    ar: {
      visualTitle: "طبق كفتة لحمة",
      pleasureLine:
        "كفتة لحمة قليلة الدهون مع أرز بسمتي، سلطة خضراء، ولمسة طحينة لايت.",
      proteinLabel: "كفتة لحمة قليلة الدهون",
      carbLabel: "أرز بسمتي",
      sauceLabel: "صوص طحينة لايت",
      vegLabel: "سلطة خضراء",
      chefNote: "طبق مصري حقيقي بإحساس مشبع وكميات محسوبة.",
      prepNote:
        "شكّل خليط اللحمة كفتة، اطبخه، ثم وزّعه مع الأرز والسلطة والطحينة.",
    },
    bg: {
      visualTitle: "Египетска телешка чиния",
      pleasureLine:
        "Постна телешка кофта с ориз басмати, салата и лек таханов сос.",
      proteinLabel: "Постна телешка кофта",
      carbLabel: "Ориз басмати",
      sauceLabel: "Лек таханов сос",
      vegLabel: "Зелена салата",
      chefNote: "Истинско ястие с контролирани количества.",
      prepNote:
        "Оформи телешката смес, сготви я и сервирай с ориз, салата и тахан.",
    },
  },
  {
    mealId: "creamy-muscle-oats",
    visualMood: "oats-power",
    en: {
      visualTitle: "Creamy Muscle Oats",
      pleasureLine:
        "Creamy oats with cottage cheese and banana for a practical high-protein breakfast.",
      proteinLabel: "Cottage cheese",
      carbLabel: "Oats + banana",
      sauceLabel: "Cinnamon finish",
      vegLabel: "No vegetables",
      chefNote: "Sweet, simple, and useful when you need a fast breakfast.",
      prepNote:
        "Mix oats with cottage cheese, add banana, and finish with cinnamon.",
    },
    ar: {
      visualTitle: "شوفان بروتين كريمي",
      pleasureLine:
        "شوفان كريمي مع جبنة قريش وموز لفطار سريع عالي البروتين.",
      proteinLabel: "جبنة قريش",
      carbLabel: "شوفان + موز",
      sauceLabel: "لمسة قرفة",
      vegLabel: "بدون خضار",
      chefNote: "وجبة حلوة وبسيطة وسريعة من غير كسر النظام.",
      prepNote:
        "اخلط الشوفان مع الجبنة القريش، أضف الموز، وأنهِها بالقرفة.",
    },
    bg: {
      visualTitle: "Кремообразен протеинов овес",
      pleasureLine:
        "Овес с котидж сирене и банан за бърза протеинова закуска.",
      proteinLabel: "Котидж сирене",
      carbLabel: "Овес + банан",
      sauceLabel: "Канела",
      vegLabel: "Без зеленчуци",
      chefNote: "Сладка, лесна и практична закуска.",
      prepNote:
        "Смеси овеса с котидж сирене, добави банан и завърши с канела.",
    },
  },
  {
    mealId: "italian-chicken-meatball-pasta",
    visualMood: "premium-comfort",
    en: {
      visualTitle: "Italian Chicken Meatball Pasta",
      pleasureLine:
        "Chicken meatballs with whole wheat penne, tomato sauce, and green pepper.",
      proteinLabel: "Chicken meatballs",
      carbLabel: "Whole wheat penne",
      sauceLabel: "G7 tomato sauce",
      vegLabel: "Green pepper",
      chefNote: "Pasta comfort with a lighter chicken-based structure.",
      prepNote:
        "Cook the penne, warm the tomato sauce, and fold in the chicken meatballs.",
    },
    ar: {
      visualTitle: "باستا كرات الفراخ الإيطالية",
      pleasureLine:
        "كرات فراخ متبلة مع مكرونة بيني حبوب كاملة، صوص طماطم، وفلفل أخضر.",
      proteinLabel: "كرات فراخ",
      carbLabel: "مكرونة بيني حبوب كاملة",
      sauceLabel: "صوص طماطم G7",
      vegLabel: "فلفل أخضر",
      chefNote: "إحساس باستا مريح لكن ببروتين أخف وكميات محسوبة.",
      prepNote:
        "اطبخ البيني، سخّن صوص الطماطم، ثم اخلط معه كرات الفراخ.",
    },
    bg: {
      visualTitle: "Италианска пилешка паста",
      pleasureLine:
        "Пилешки кюфтенца с пълнозърнеста пене паста, доматен сос и чушка.",
      proteinLabel: "Пилешки кюфтенца",
      carbLabel: "Пълнозърнеста пене паста",
      sauceLabel: "G7 доматен сос",
      vegLabel: "Зелена чушка",
      chefNote: "Комфортна паста с по-лека пилешка структура.",
      prepNote:
        "Сготви пастата, загрей соса и добави пилешките кюфтенца.",
    },
  },
  {
    mealId: "recovery-kofta-pasta",
    visualMood: "premium-comfort",
    en: {
      visualTitle: "Recovery Kofta Pasta",
      pleasureLine:
        "Lean beef kofta folded into whole wheat penne with tomato sauce and parsley.",
      proteinLabel: "Lean beef kofta",
      carbLabel: "Whole wheat penne",
      sauceLabel: "G7 tomato sauce",
      vegLabel: "Parsley",
      chefNote: "Comfort-food feeling with a recovery meal structure.",
      prepNote:
        "Cook the penne, warm the sauce, add the cooked kofta, and finish with parsley.",
    },
    ar: {
      visualTitle: "باستا كفتة للريكافري",
      pleasureLine:
        "كفتة لحمة قليلة الدهون داخل مكرونة بيني حبوب كاملة مع صوص طماطم وبقدونس.",
      proteinLabel: "كفتة لحمة قليلة الدهون",
      carbLabel: "مكرونة بيني حبوب كاملة",
      sauceLabel: "صوص طماطم G7",
      vegLabel: "بقدونس",
      chefNote: "إحساس comfort food لكن معمول كوجبة ريكافري محسوبة.",
      prepNote:
        "اطبخ البيني، سخّن الصوص، أضف الكفتة المطبوخة، وأنهِها بالبقدونس.",
    },
    bg: {
      visualTitle: "Паста с телешка кофта",
      pleasureLine:
        "Постна телешка кофта с пене паста, доматен сос и магданоз.",
      proteinLabel: "Телешка кофта",
      carbLabel: "Пълнозърнеста пене паста",
      sauceLabel: "G7 доматен сос",
      vegLabel: "Магданоз",
      chefNote: "Комфортна паста в recovery структура.",
      prepNote:
        "Сготви пастата, загрей соса, добави кофтата и завърши с магданоз.",
    },
  },
  {
    mealId: "street-style-eggs-potato",
    visualMood: "street-fit",
    en: {
      visualTitle: "Street Style Eggs & Potato",
      pleasureLine:
        "Eggs with cooked potato and bell pepper for a familiar street-food feeling.",
      proteinLabel: "Whole eggs + cottage cheese",
      carbLabel: "Potato",
      sauceLabel: "No sauce needed",
      vegLabel: "Bell pepper",
      chefNote: "Simple, familiar, and built to feel like real breakfast food.",
      prepNote:
        "Cook the eggs, portion the potato, and add bell pepper on the side.",
    },
    ar: {
      visualTitle: "بيض وبطاطس بطابع ستريت",
      pleasureLine:
        "بيض وبطاطس مع فلفل رومي بإحساس أكل بسيط ومألوف.",
      proteinLabel: "بيض كامل + جبنة قريش",
      carbLabel: "بطاطس",
      sauceLabel: "بدون صوص",
      vegLabel: "فلفل رومي",
      chefNote: "فطار شبه أكل الشارع لكن داخل نظام محسوب.",
      prepNote:
        "اطبخ البيض، وزّع البطاطس المطبوخة، وأضف الفلفل الرومي.",
    },
    bg: {
      visualTitle: "Яйца с картофи",
      pleasureLine:
        "Яйца с картофи и чушка за познат street-food вкус.",
      proteinLabel: "Яйца + котидж сирене",
      carbLabel: "Картофи",
      sauceLabel: "Без сос",
      vegLabel: "Чушка",
      chefNote: "Позната закуска с контролирани количества.",
      prepNote:
        "Сготви яйцата, добави картофите и сервирай с чушка.",
    },
  },
  {
    mealId: "chicken-quesadilla-street-fit",
    visualMood: "wrap-style",
    en: {
      visualTitle: "Chicken Quesadilla Street Fit",
      pleasureLine:
        "Seasoned chicken folded into tortilla with pepper, coriander, and a light street-fit feel.",
      proteinLabel: "Seasoned chicken",
      carbLabel: "Whole wheat tortilla",
      sauceLabel: "Optional G7 sauce",
      vegLabel: "Green pepper & coriander",
      chefNote: "Street-food satisfaction without leaving the G7 system.",
      prepNote:
        "Fill the tortilla with chicken and vegetables, fold, then toast lightly.",
    },
    ar: {
      visualTitle: "كاساديا فراخ لايت",
      pleasureLine:
        "فراخ متبلة داخل تورتيلا حبوب كاملة مع فلفل وكزبرة بطابع ستريت لايت.",
      proteinLabel: "فراخ متبلة",
      carbLabel: "تورتيلا حبوب كاملة",
      sauceLabel: "صوص G7 اختياري",
      vegLabel: "فلفل أخضر وكزبرة",
      chefNote: "إحساس كاساديا ممتع من غير ما تخرج من النظام.",
      prepNote:
        "احشي التورتيلا بالفراخ والخضار، اقفلها، وحمّرها خفيف.",
    },
    bg: {
      visualTitle: "Фит пилешка кесадия",
      pleasureLine:
        "Пилешко в тортила с чушка и кориандър в street-fit стил.",
      proteinLabel: "Овкусено пилешко",
      carbLabel: "Пълнозърнеста тортила",
      sauceLabel: "Опционален G7 сос",
      vegLabel: "Чушка и кориандър",
      chefNote: "Street-food усещане без излизане от системата.",
      prepNote:
        "Напълни тортилата, сгъни я и я запечи леко.",
    },
  },
  {
    mealId: "lean-egyptian-hawawshi",
    visualMood: "egyptian-grill",
    en: {
      visualTitle: "Lean Egyptian Hawawshi",
      pleasureLine:
        "Lean beef mix inside baladi bread with green salad for a lighter hawawshi experience.",
      proteinLabel: "Lean beef mix",
      carbLabel: "Baladi bread",
      sauceLabel: "No sauce needed",
      vegLabel: "Green salad",
      chefNote: "A street classic rebuilt as a controlled G7 meal.",
      prepNote:
        "Fill the bread with the beef mix, bake or toast, then serve with salad.",
    },
    ar: {
      visualTitle: "حواوشي مصري لايت",
      pleasureLine:
        "خليط لحمة قليل الدهون داخل عيش بلدي مع سلطة خضراء لإحساس حواوشي أخف.",
      proteinLabel: "خليط لحمة قليل الدهون",
      carbLabel: "عيش بلدي",
      sauceLabel: "بدون صوص",
      vegLabel: "سلطة خضراء",
      chefNote: "أكلة شارع مصرية معمولة بنظام وكميات محسوبة.",
      prepNote:
        "احشي العيش بخليط اللحمة، ادخله الفرن أو حمّره، وقدّمه مع السلطة.",
    },
    bg: {
      visualTitle: "Лек египетски хауаши",
      pleasureLine:
        "Постна телешка смес в балади хляб със салата.",
      proteinLabel: "Постна телешка смес",
      carbLabel: "Балади хляб",
      sauceLabel: "Без сос",
      vegLabel: "Зелена салата",
      chefNote: "Улична класика, преработена като G7 meal.",
      prepNote:
        "Напълни хляба със сместа, запечи и сервирай със салата.",
    },
  },
  {
    mealId: "fast-fuel-protein-shake",
    visualMood: "shake-fast",
    en: {
      visualTitle: "Fast Fuel Protein Shake",
      pleasureLine:
        "A quick cottage-cheese shake style meal with oats and banana for easy fuel.",
      proteinLabel: "Cottage cheese",
      carbLabel: "Oats + banana",
      sauceLabel: "Water or low-fat milk",
      vegLabel: "No vegetables",
      chefNote: "Fast fuel for busy days without losing the structure.",
      prepNote:
        "Blend or mix cottage cheese with oats, banana, and water or low-fat milk.",
    },
    ar: {
      visualTitle: "شيك بروتين سريع",
      pleasureLine:
        "وجبة سريعة بطابع شيك من الجبنة القريش، الشوفان، والموز.",
      proteinLabel: "جبنة قريش",
      carbLabel: "شوفان + موز",
      sauceLabel: "ماء أو لبن قليل الدسم",
      vegLabel: "بدون خضار",
      chefNote: "حل سريع للأيام المشغولة من غير ما تكسر النظام.",
      prepNote:
        "اخلط الجبنة القريش مع الشوفان والموز وماء أو لبن قليل الدسم.",
    },
    bg: {
      visualTitle: "Бърз протеинов шейк",
      pleasureLine:
        "Бърза шейк-style храна с котидж сирене, овес и банан.",
      proteinLabel: "Котидж сирене",
      carbLabel: "Овес + банан",
      sauceLabel: "Вода или нискомаслено мляко",
      vegLabel: "Без зеленчуци",
      chefNote: "Бързо гориво за натоварени дни.",
      prepNote:
        "Смеси котидж сирене, овес, банан и вода или нискомаслено мляко.",
    },
  },
  {
    mealId: "creamy-pink-chicken-pasta",
    visualMood: "premium-comfort",
    en: {
      visualTitle: "Creamy Pink Chicken Pasta",
      pleasureLine:
        "Chicken pasta with a light pink G7 sauce made from tomato and yogurt.",
      proteinLabel: "Seasoned chicken",
      carbLabel: "Pasta",
      sauceLabel: "G7 pink sauce",
      vegLabel: "Mushroom & pepper",
      chefNote: "Creamy feeling without depending on heavy cream.",
      prepNote:
        "Warm the pink sauce, add cooked pasta and chicken, then finish with vegetables.",
    },
    ar: {
      visualTitle: "باستا فراخ بالصوص البينك",
      pleasureLine:
        "باستا فراخ بصوص بينك G7 من الطماطم والزبادي مع مشروم وفلفل.",
      proteinLabel: "فراخ متبلة",
      carbLabel: "مكرونة",
      sauceLabel: "صوص بينك G7",
      vegLabel: "مشروم وفلفل",
      chefNote: "إحساس كريمي من غير صوص تقيل أو عشوائية.",
      prepNote:
        "سخّن الصوص البينك، أضف المكرونة والفراخ، وأنهِها بالخضار.",
    },
    bg: {
      visualTitle: "Кремообразна розова паста с пиле",
      pleasureLine:
        "Пилешка паста с лек розов G7 сос от домат и йогурт.",
      proteinLabel: "Овкусено пиле",
      carbLabel: "Паста",
      sauceLabel: "G7 розов сос",
      vegLabel: "Гъби и чушка",
      chefNote: "Кремообразно усещане без тежка сметана.",
      prepNote:
        "Загрей соса, добави паста и пиле, после зеленчуците.",
    },
  },
  {
    mealId: "mediterranean-tuna-pasta",
    visualMood: "seafood-clean",
    en: {
      visualTitle: "Mediterranean Tuna Pasta",
      pleasureLine:
        "Tuna with whole wheat penne, tomato sauce, and parsley for a clean Mediterranean plate.",
      proteinLabel: "Tuna in water",
      carbLabel: "Whole wheat penne",
      sauceLabel: "G7 tomato sauce",
      vegLabel: "Parsley",
      chefNote: "A simple seafood pasta that keeps the week varied.",
      prepNote:
        "Flake the tuna, warm the tomato sauce, and fold into cooked penne with parsley.",
    },
    ar: {
      visualTitle: "باستا تونة متوسطية",
      pleasureLine:
        "تونة بالماء مع مكرونة بيني، صوص طماطم، وبقدونس بطابع متوسطي خفيف.",
      proteinLabel: "تونة بالماء",
      carbLabel: "مكرونة بيني حبوب كاملة",
      sauceLabel: "صوص طماطم G7",
      vegLabel: "بقدونس",
      chefNote: "باستا سمكية بسيطة تكسر ملل الأسبوع.",
      prepNote:
        "فتّت التونة، سخّن صوص الطماطم، واخلطهم مع البيني والبقدونس.",
    },
    bg: {
      visualTitle: "Средиземноморска паста с риба тон",
      pleasureLine:
        "Риба тон с пене паста, доматен сос и магданоз.",
      proteinLabel: "Риба тон във вода",
      carbLabel: "Пълнозърнеста пене паста",
      sauceLabel: "G7 доматен сос",
      vegLabel: "Магданоз",
      chefNote: "Лесна seafood паста за разнообразие.",
      prepNote:
        "Добави рибата тон към пастата, соса и магданоза.",
    },
  },
  {
    mealId: "lean-morning-omelette",
    visualMood: "breakfast-power",
    en: {
      visualTitle: "Lean Morning Omelette",
      pleasureLine:
        "A light omelette with cottage cheese, bread, mushroom, and pepper.",
      proteinLabel: "Cottage cheese + whole egg",
      carbLabel: "Whole wheat bread",
      sauceLabel: "No sauce needed",
      vegLabel: "Mushroom & pepper",
      chefNote: "A breakfast that feels cooked, warm, and controlled.",
      prepNote:
        "Cook the omelette, add cottage cheese, and serve with bread and vegetables.",
    },
    ar: {
      visualTitle: "أومليت صباحي لايت",
      pleasureLine:
        "أومليت خفيف مع جبنة قريش، عيش حبوب كاملة، مشروم وفلفل.",
      proteinLabel: "جبنة قريش + بيضة كاملة",
      carbLabel: "عيش حبوب كاملة",
      sauceLabel: "بدون صوص",
      vegLabel: "مشروم وفلفل",
      chefNote: "فطار دافئ ومطبوخ لكن بكميات واضحة.",
      prepNote:
        "اطبخ الأومليت، أضف الجبنة القريش، وقدّمه مع العيش والخضار.",
    },
    bg: {
      visualTitle: "Лек сутрешен омлет",
      pleasureLine:
        "Лек омлет с котидж сирене, хляб, гъби и чушка.",
      proteinLabel: "Котидж сирене + яйце",
      carbLabel: "Пълнозърнест хляб",
      sauceLabel: "Без сос",
      vegLabel: "Гъби и чушка",
      chefNote: "Топла закуска с ясни количества.",
      prepNote:
        "Сготви омлета, добави котидж сирене и сервирай с хляб и зеленчуци.",
    },
  },
  {
    mealId: "lean-smash-chicken-burger",
    visualMood: "burger-style",
    en: {
      visualTitle: "Lean Smash Chicken Burger",
      pleasureLine:
        "A lean chicken burger with brown bun, lettuce, tomato, and light G7 burger sauce.",
      proteinLabel: "Chicken burger patty",
      carbLabel: "Brown burger bun",
      sauceLabel: "Light G7 burger sauce",
      vegLabel: "Lettuce & tomato",
      chefNote: "Burger feeling while staying inside the meal-prep system.",
      prepNote:
        "Sear the chicken patty, warm the bun, add vegetables, and finish with sauce.",
    },
    ar: {
      visualTitle: "برجر فراخ لايت",
      pleasureLine:
        "برجر فراخ لايت مع عيش برجر بني، خس، طماطم، وصوص برجر G7.",
      proteinLabel: "برجر فراخ",
      carbLabel: "عيش برجر بني",
      sauceLabel: "صوص برجر G7 لايت",
      vegLabel: "خس وطماطم",
      chefNote: "إحساس برجر حقيقي لكن داخل نظام meal prep.",
      prepNote:
        "شوّح برجر الفراخ، سخّن العيش، أضف الخضار والصوص.",
    },
    bg: {
      visualTitle: "Лек пилешки бургер",
      pleasureLine:
        "Пилешки бургер с кафява питка, салата, домат и лек G7 сос.",
      proteinLabel: "Пилешки бургер",
      carbLabel: "Кафява бургер питка",
      sauceLabel: "Лек G7 бургер сос",
      vegLabel: "Салата и домат",
      chefNote: "Бургер усещане в meal-prep система.",
      prepNote:
        "Сготви бургера, загрей питката и добави зеленчуци и сос.",
    },
  },
  {
    mealId: "recovery-beef-kofta-bowl",
    visualMood: "egyptian-grill",
    en: {
      visualTitle: "Recovery Beef Kofta Bowl",
      pleasureLine:
        "Lean beef kofta with basmati rice, salad, and G7 yogurt sauce.",
      proteinLabel: "Lean beef kofta",
      carbLabel: "Basmati rice",
      sauceLabel: "G7 yogurt sauce",
      vegLabel: "Green salad",
      chefNote: "A recovery bowl with familiar grill flavor.",
      prepNote:
        "Cook the kofta, portion with rice and salad, then finish with yogurt sauce.",
    },
    ar: {
      visualTitle: "كفتة لحمة للريكافري",
      pleasureLine:
        "كفتة لحمة قليلة الدهون مع أرز بسمتي، سلطة، وصوص زبادي G7.",
      proteinLabel: "كفتة لحمة قليلة الدهون",
      carbLabel: "أرز بسمتي",
      sauceLabel: "صوص زبادي G7",
      vegLabel: "سلطة خضراء",
      chefNote: "وجبة ريكافري بطعم جريل مألوف ومشبع.",
      prepNote:
        "اطبخ الكفتة، وزّعها مع الأرز والسلطة، وأنهِها بصوص الزبادي.",
    },
    bg: {
      visualTitle: "Телешка кофта за възстановяване",
      pleasureLine:
        "Постна телешка кофта с ориз басмати, салата и G7 йогурт сос.",
      proteinLabel: "Телешка кофта",
      carbLabel: "Ориз басмати",
      sauceLabel: "G7 йогурт сос",
      vegLabel: "Зелена салата",
      chefNote: "Recovery bowl с познат грил вкус.",
      prepNote:
        "Сготви кофтата, разпредели с ориз и салата, добави сос.",
    },
  },
  {
    mealId: "chocolate-recovery-oats",
    visualMood: "oats-power",
    en: {
      visualTitle: "Chocolate Recovery Oats",
      pleasureLine:
        "Chocolate-style oats with cottage cheese, banana, and cocoa for a controlled sweet meal.",
      proteinLabel: "Cottage cheese",
      carbLabel: "Oats + banana",
      sauceLabel: "Cocoa powder",
      vegLabel: "No vegetables",
      chefNote: "A sweet recovery option that still follows the plan.",
      prepNote:
        "Mix oats, cottage cheese, banana, and cocoa until creamy.",
    },
    ar: {
      visualTitle: "شوفان شوكولاتة بالبروتين",
      pleasureLine:
        "شوفان بطابع شوكولاتة مع جبنة قريش، موز، وكاكاو بودرة.",
      proteinLabel: "جبنة قريش",
      carbLabel: "شوفان + موز",
      sauceLabel: "كاكاو بودرة",
      vegLabel: "بدون خضار",
      chefNote: "اختيار حلو للريكافري من غير خروج عن الخطة.",
      prepNote:
        "اخلط الشوفان مع الجبنة القريش والموز والكاكاو حتى يصبح كريمي.",
    },
    bg: {
      visualTitle: "Шоколадов протеинов овес",
      pleasureLine:
        "Шоколадов овес с котидж сирене, банан и какао.",
      proteinLabel: "Котидж сирене",
      carbLabel: "Овес + банан",
      sauceLabel: "Какао",
      vegLabel: "Без зеленчуци",
      chefNote: "Сладка recovery опция, която остава в плана.",
      prepNote:
        "Смеси овес, котидж сирене, банан и какао до кремообразност.",
    },
  },
  {
    mealId: "smoky-chicken-fajita-bowl",
    visualMood: "meal-prep-classic",
    en: {
      visualTitle: "Smoky Chicken Fajita Bowl",
      pleasureLine:
        "Smoky chicken with sweet potato, colored peppers, red onion, and a light G7 finish.",
      proteinLabel: "Smoky chicken",
      carbLabel: "Sweet potato",
      sauceLabel: "Pea guacamole or yogurt sauce",
      vegLabel: "Colored peppers & red onion",
      chefNote: "A colorful bowl that brings variety without breaking the system.",
      prepNote:
        "Cook the chicken, portion with sweet potato and vegetables, then add the sauce.",
    },
    ar: {
      visualTitle: "فاهيتا فراخ مدخنة",
      pleasureLine:
        "فراخ مدخنة مع بطاطا، فلفل ألوان، بصل أحمر، ولمسة صوص G7.",
      proteinLabel: "فراخ مدخنة",
      carbLabel: "بطاطا",
      sauceLabel: "جواكامولي بسلة أو صوص زبادي",
      vegLabel: "فلفل ألوان وبصل أحمر",
      chefNote: "طبق ملون وممتع يضيف تنويع من غير ما يكسر النظام.",
      prepNote:
        "اطبخ الفراخ، وزّعها مع البطاطا والخضار، ثم أضف الصوص.",
    },
    bg: {
      visualTitle: "Опушена пилешка фахита",
      pleasureLine:
        "Опушено пиле със сладък картоф, цветни чушки и червен лук.",
      proteinLabel: "Опушено пиле",
      carbLabel: "Сладък картоф",
      sauceLabel: "Грах гуакамоле или йогурт сос",
      vegLabel: "Цветни чушки и червен лук",
      chefNote: "Цветна купа с много вкус и ясна структура.",
      prepNote:
        "Сготви пилето, добави картоф и зеленчуци, после сос.",
    },
  },
  {
    mealId: "high-protein-tuna-melt-wrap",
    visualMood: "wrap-style",
    en: {
      visualTitle: "High Protein Tuna Melt Wrap",
      pleasureLine:
        "Tuna folded into whole wheat tortilla with lettuce and tomato for a fast high-protein wrap.",
      proteinLabel: "Tuna in water",
      carbLabel: "Whole wheat tortilla",
      sauceLabel: "Optional yogurt sauce",
      vegLabel: "Lettuce & tomato",
      chefNote: "A quick wrap that makes tuna feel like a real meal.",
      prepNote:
        "Flake the tuna, fill the tortilla with vegetables, and roll tightly.",
    },
    ar: {
      visualTitle: "راب تونة عالي البروتين",
      pleasureLine:
        "تونة بالماء داخل تورتيلا حبوب كاملة مع خس وطماطم لراب سريع عالي البروتين.",
      proteinLabel: "تونة بالماء",
      carbLabel: "تورتيلا حبوب كاملة",
      sauceLabel: "صوص زبادي اختياري",
      vegLabel: "خس وطماطم",
      chefNote: "طريقة سريعة تخلي التونة وجبة حقيقية مش اختيار ممل.",
      prepNote:
        "فتّت التونة، احشي التورتيلا بالخضار، ولفّها بإحكام.",
    },
    bg: {
      visualTitle: "Високопротеинов wrap с риба тон",
      pleasureLine:
        "Риба тон в пълнозърнеста тортила със салата и домат.",
      proteinLabel: "Риба тон във вода",
      carbLabel: "Пълнозърнеста тортила",
      sauceLabel: "Опционален йогурт сос",
      vegLabel: "Салата и домат",
      chefNote: "Бърз wrap, който прави рибата тон истинско ястие.",
      prepNote:
        "Намачкай рибата тон, добави зеленчуци и навий тортилата.",
    },
  },
  {
    mealId: "cairo-shakshuka-power-eggs",
    visualMood: "breakfast-power",
    en: {
      visualTitle: "Cairo Shakshuka Power Eggs",
      pleasureLine:
        "Eggs and cottage cheese with tomato-style shakshuka flavor for a lighter day-seven breakfast.",
      proteinLabel: "Whole eggs + cottage cheese",
      carbLabel: "No main carb",
      sauceLabel: "Tomato shakshuka base",
      vegLabel: "Tomato & pepper",
      chefNote: "A lighter final-day breakfast with real cooked flavor.",
      prepNote:
        "Cook the tomato base, add the eggs, then serve with cottage cheese.",
    },
    ar: {
      visualTitle: "شكشوكة بروتين",
      pleasureLine:
        "بيض وجبنة قريش بطابع شكشوكة طماطم لفطار أخف في اليوم السابع.",
      proteinLabel: "بيض كامل + جبنة قريش",
      carbLabel: "بدون كارب أساسي",
      sauceLabel: "قاعدة طماطم شكشوكة",
      vegLabel: "طماطم وفلفل",
      chefNote: "فطار خفيف في نهاية الأسبوع لكن بطعم مطبوخ حقيقي.",
      prepNote:
        "حضّر قاعدة الطماطم، أضف البيض، وقدّمها مع الجبنة القريش.",
    },
    bg: {
      visualTitle: "Шакшука протеин",
      pleasureLine:
        "Яйца и котидж сирене с доматена шакшука база.",
      proteinLabel: "Яйца + котидж сирене",
      carbLabel: "Без основен въглехидрат",
      sauceLabel: "Доматена база",
      vegLabel: "Домат и чушка",
      chefNote: "Лека закуска за финала на седмицата.",
      prepNote:
        "Сготви доматената база, добави яйцата и сервирай с котидж сирене.",
    },
  },
  {
    mealId: "tuna-tomato-rice-reset",
    visualMood: "seafood-clean",
    en: {
      visualTitle: "Tuna Tomato Rice Reset",
      pleasureLine:
        "Tuna with tomato flavor and rice for a simple light reset meal.",
      proteinLabel: "Tuna in water",
      carbLabel: "Basmati rice",
      sauceLabel: "Tomato sauce",
      vegLabel: "Light vegetables",
      chefNote: "A clean day-seven lunch that keeps the system easy.",
      prepNote:
        "Flake the tuna, warm the tomato sauce, and serve with rice.",
    },
    ar: {
      visualTitle: "تونة بالطماطم والأرز",
      pleasureLine:
        "تونة بالماء مع طماطم وأرز بسمتي كوجبة أخف وبسيطة في نهاية الأسبوع.",
      proteinLabel: "تونة بالماء",
      carbLabel: "أرز بسمتي",
      sauceLabel: "صوص طماطم",
      vegLabel: "خضار خفيف",
      chefNote: "غداء بسيط لليوم السابع يحافظ على النظام من غير مجهود كبير.",
      prepNote:
        "فتّت التونة، سخّن صوص الطماطم، وقدّمها مع الأرز.",
    },
    bg: {
      visualTitle: "Риба тон с домат и ориз",
      pleasureLine:
        "Риба тон с доматен вкус и ориз за лек reset обяд.",
      proteinLabel: "Риба тон във вода",
      carbLabel: "Ориз басмати",
      sauceLabel: "Доматен сос",
      vegLabel: "Леки зеленчуци",
      chefNote: "Лесен обяд за ден 7.",
      prepNote:
        "Добави рибата тон към доматения сос и сервирай с ориз.",
    },
  },
  {
    mealId: "lemon-herb-fish-reset-plate",
    visualMood: "seafood-clean",
    en: {
      visualTitle: "Lemon Herb Fish Reset Plate",
      pleasureLine:
        "White fish with lemon herbs for a clean, light end-of-week dinner.",
      proteinLabel: "White fish fillet",
      carbLabel: "Light or as planned",
      sauceLabel: "Lemon herb marinade",
      vegLabel: "Side vegetables",
      chefNote: "A clean seafood finish that keeps the week feeling fresh.",
      prepNote:
        "Bake or pan-sear the fish with lemon herbs and serve with the planned side.",
    },
    ar: {
      visualTitle: "سمك ليمون وأعشاب",
      pleasureLine:
        "فيليه سمك بليمون وأعشاب لعشاء خفيف ونظيف في نهاية الأسبوع.",
      proteinLabel: "فيليه سمك",
      carbLabel: "خفيف أو حسب الخطة",
      sauceLabel: "تتبيلة ليمون وأعشاب",
      vegLabel: "خضار جانبي",
      chefNote: "نهاية أسبوع أخف بطابع سمك نظيف ومنعش.",
      prepNote:
        "اطبخ السمك في الفرن أو الطاسة بتتبيلة الليمون والأعشاب وقدّمه مع الجانب المحدد.",
    },
    bg: {
      visualTitle: "Риба с лимон и билки",
      pleasureLine:
        "Бяла риба с лимон и билки за лек финал на седмицата.",
      proteinLabel: "Филе от бяла риба",
      carbLabel: "Леко или според плана",
      sauceLabel: "Лимон и билки",
      vegLabel: "Зеленчуци",
      chefNote: "Свеж seafood финал за седмицата.",
      prepNote:
        "Изпечи или запечи рибата с лимон и билки и сервирай със страната по плана.",
    },
  },
]

export const mealVisualIdentities: MealVisualIdentity[] =
  localizedMealVisualIdentities.map((meal) => ({
    mealId: meal.mealId,
    visualMood: meal.visualMood,
    ...meal.en,
  }))

function normalizeTitle(value?: string) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim()
}

function toMealVisualIdentity(
  meal: LocalizedMealVisualIdentity,
  language: MealVisualLanguage,
): MealVisualIdentity {
  return {
    mealId: meal.mealId,
    visualMood: meal.visualMood,
    ...meal[language],
  }
}

export function getMealVisualIdentity(
  mealId?: string,
  language: MealVisualLanguage = "en",
): MealVisualIdentity {
  const fallback = localizedMealVisualIdentities[0]

  if (!mealId) {
    return toMealVisualIdentity(fallback, language)
  }

  const found =
    localizedMealVisualIdentities.find((meal) => meal.mealId === mealId) ||
    fallback

  return toMealVisualIdentity(found, language)
}

export function getMealVisualIdentityByTitle(
  title?: string,
  language: MealVisualLanguage = "en",
): MealVisualIdentity {
  const normalizedTitle = normalizeTitle(title)

  if (!normalizedTitle) {
    return getMealVisualIdentity("morning-power-eggs", language)
  }

  const exactTitleMap: Record<string, string> = {
    "morning power eggs": "morning-power-eggs",
    "street grill chicken kofta bowl": "street-grill-chicken-kofta-bowl",
    "egyptian beef power plate": "egyptian-beef-power-plate",
    "creamy muscle oats": "creamy-muscle-oats",
    "italian chicken meatball pasta": "italian-chicken-meatball-pasta",
    "recovery kofta pasta": "recovery-kofta-pasta",
    "street style eggs and potato": "street-style-eggs-potato",
    "chicken quesadilla street fit": "chicken-quesadilla-street-fit",
    "lean egyptian hawawshi": "lean-egyptian-hawawshi",
    "fast fuel protein shake": "fast-fuel-protein-shake",
    "creamy pink chicken pasta": "creamy-pink-chicken-pasta",
    "mediterranean tuna pasta": "mediterranean-tuna-pasta",
    "lean morning omelette": "lean-morning-omelette",
    "lean smash chicken burger": "lean-smash-chicken-burger",
    "recovery beef kofta bowl": "recovery-beef-kofta-bowl",
    "chocolate recovery oats": "chocolate-recovery-oats",
    "smoky chicken fajita bowl": "smoky-chicken-fajita-bowl",
    "high protein tuna melt wrap": "high-protein-tuna-melt-wrap",
    "cairo shakshuka power eggs": "cairo-shakshuka-power-eggs",
    "tuna tomato rice reset": "tuna-tomato-rice-reset",
    "lemon herb fish reset plate": "lemon-herb-fish-reset-plate",
  }

  const exactMealId = exactTitleMap[normalizedTitle]

  if (exactMealId) {
    return getMealVisualIdentity(exactMealId, language)
  }

  if (
    normalizedTitle.includes("morning power") ||
    normalizedTitle.includes("بيض صباحي") ||
    normalizedTitle.includes("сутрешни")
  ) {
    return getMealVisualIdentity("morning-power-eggs", language)
  }

  if (
    normalizedTitle.includes("street grill chicken") ||
    normalizedTitle.includes("chicken kofta") ||
    normalizedTitle.includes("كفتة فراخ") ||
    normalizedTitle.includes("пилешка кофта")
  ) {
    return getMealVisualIdentity("street-grill-chicken-kofta-bowl", language)
  }

  if (
    normalizedTitle.includes("egyptian beef") ||
    normalizedTitle.includes("طبق كفتة") ||
    normalizedTitle.includes("телешка силова")
  ) {
    return getMealVisualIdentity("egyptian-beef-power-plate", language)
  }

  if (
    normalizedTitle.includes("creamy muscle oats") ||
    normalizedTitle.includes("شوفان بروتين كريمي") ||
    normalizedTitle.includes("протеинов овес")
  ) {
    return getMealVisualIdentity("creamy-muscle-oats", language)
  }

  if (
    normalizedTitle.includes("italian chicken") ||
    normalizedTitle.includes("chicken meatball pasta") ||
    normalizedTitle.includes("باستا كرات الفراخ") ||
    normalizedTitle.includes("пилешка паста")
  ) {
    return getMealVisualIdentity("italian-chicken-meatball-pasta", language)
  }

  if (
    normalizedTitle.includes("recovery kofta pasta") ||
    normalizedTitle.includes("باستا كفتة") ||
    normalizedTitle.includes("паста с телешка")
  ) {
    return getMealVisualIdentity("recovery-kofta-pasta", language)
  }

  if (
    normalizedTitle.includes("eggs and potato") ||
    normalizedTitle.includes("eggs potato") ||
    normalizedTitle.includes("بيض وبطاطس") ||
    normalizedTitle.includes("яйца с картофи")
  ) {
    return getMealVisualIdentity("street-style-eggs-potato", language)
  }

  if (
    normalizedTitle.includes("quesadilla") ||
    normalizedTitle.includes("كاساديا") ||
    normalizedTitle.includes("кесадия")
  ) {
    return getMealVisualIdentity("chicken-quesadilla-street-fit", language)
  }

  if (
    normalizedTitle.includes("hawawshi") ||
    normalizedTitle.includes("حواوشي") ||
    normalizedTitle.includes("хауаши")
  ) {
    return getMealVisualIdentity("lean-egyptian-hawawshi", language)
  }

  if (
    normalizedTitle.includes("protein shake") ||
    normalizedTitle.includes("شيك بروتين") ||
    normalizedTitle.includes("шейк")
  ) {
    return getMealVisualIdentity("fast-fuel-protein-shake", language)
  }

  if (
    normalizedTitle.includes("pink chicken pasta") ||
    normalizedTitle.includes("creamy pink") ||
    normalizedTitle.includes("باستا فراخ بالصوص البينك") ||
    normalizedTitle.includes("розова паста")
  ) {
    return getMealVisualIdentity("creamy-pink-chicken-pasta", language)
  }

  if (
    normalizedTitle.includes("tuna pasta") ||
    normalizedTitle.includes("mediterranean tuna") ||
    normalizedTitle.includes("باستا تونة") ||
    normalizedTitle.includes("паста с риба тон")
  ) {
    return getMealVisualIdentity("mediterranean-tuna-pasta", language)
  }

  if (
    normalizedTitle.includes("omelette") ||
    normalizedTitle.includes("omelet") ||
    normalizedTitle.includes("أومليت") ||
    normalizedTitle.includes("омлет")
  ) {
    return getMealVisualIdentity("lean-morning-omelette", language)
  }

  if (
    normalizedTitle.includes("burger") ||
    normalizedTitle.includes("برجر") ||
    normalizedTitle.includes("бургер")
  ) {
    return getMealVisualIdentity("lean-smash-chicken-burger", language)
  }

  if (
    normalizedTitle.includes("recovery beef kofta") ||
    normalizedTitle.includes("كفتة لحمة للريكافري") ||
    normalizedTitle.includes("възстановяваща телешка")
  ) {
    return getMealVisualIdentity("recovery-beef-kofta-bowl", language)
  }

  if (
    normalizedTitle.includes("chocolate recovery oats") ||
    normalizedTitle.includes("شوفان شوكولاتة") ||
    normalizedTitle.includes("шоколадов")
  ) {
    return getMealVisualIdentity("chocolate-recovery-oats", language)
  }

  if (
    normalizedTitle.includes("fajita") ||
    normalizedTitle.includes("فاهيتا") ||
    normalizedTitle.includes("фахита")
  ) {
    return getMealVisualIdentity("smoky-chicken-fajita-bowl", language)
  }

  if (
    normalizedTitle.includes("tuna melt wrap") ||
    normalizedTitle.includes("tuna wrap") ||
    normalizedTitle.includes("راب تونة") ||
    normalizedTitle.includes("wrap с риба тон")
  ) {
    return getMealVisualIdentity("high-protein-tuna-melt-wrap", language)
  }

  if (
    normalizedTitle.includes("shakshuka") ||
    normalizedTitle.includes("شكشوكة") ||
    normalizedTitle.includes("шакшука")
  ) {
    return getMealVisualIdentity("cairo-shakshuka-power-eggs", language)
  }

  if (
    normalizedTitle.includes("tuna tomato rice") ||
    normalizedTitle.includes("تونة بالطماطم") ||
    normalizedTitle.includes("риба тон с домат")
  ) {
    return getMealVisualIdentity("tuna-tomato-rice-reset", language)
  }

  if (
    normalizedTitle.includes("fish") ||
    normalizedTitle.includes("tilapia") ||
    normalizedTitle.includes("سمك") ||
    normalizedTitle.includes("риба")
  ) {
    return getMealVisualIdentity("lemon-herb-fish-reset-plate", language)
  }

  return getMealVisualIdentity("morning-power-eggs", language)
}