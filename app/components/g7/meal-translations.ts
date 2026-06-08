export type MealTranslationLanguage = "ar" | "en" | "bg"

export type MealTextTranslation = {
  title: string
  subtitle: string
  whyThisMealExists: string
  bestTime: string
  storageTip: string
  reheatMethod: string
  chefNote: string
  raw?: Record<string, string>
  cooked?: Record<string, string>
  steps: {
    title: string
    body: string
  }[]
}

type MealTranslationMap = Record<string, MealTextTranslation>

const EN_COMMON_INGREDIENTS: Record<string, string> = {
  "Whole Eggs": "Whole eggs",
  "Whole Egg": "Whole egg",
  "Egg Whites": "Egg whites",
  "Whole Wheat Bread": "Whole wheat bread",
  "Tomato & Cucumber": "Tomato and cucumber",
  "Tomato Sauce": "Tomato sauce",
  Tomato: "Tomato",
  Cucumber: "Cucumber",
  "Chicken Breast Raw": "Raw chicken breast",
  "Chicken Breast Core Raw": "Raw chicken breast",
  "Lean Minced Beef Raw": "Raw lean minced beef",
  "Lean Beef Core Raw": "Raw lean beef",
  "Basmati Rice Raw": "Raw basmati rice",
  "Whole Wheat Penne Raw": "Raw whole wheat penne",
  "Pasta Raw": "Raw pasta",
  Pasta: "Pasta",
  "Cooked Pasta": "Cooked pasta",
  "Cooked Penne Pasta": "Cooked penne pasta",
  "Cooked Rice": "Cooked rice",
  "Cooked Basmati Rice": "Cooked basmati rice",
  "Cucumber Yogurt Sauce": "Cucumber yogurt sauce",
  "Light Tahini Sauce": "Light tahini sauce",
  "Yogurt Sauce": "Yogurt sauce",
  "Light Pink Sauce": "Light pink sauce",
  "Light Burger Sauce": "Light burger sauce",
  "Green Salad": "Green salad",
  "Green Pepper": "Green pepper",
  "Green Pepper & Coriander": "Green pepper and coriander",
  "Mushroom or Pepper": "Mushroom or pepper",
  "Mushroom & Pepper": "Mushroom and pepper",
  Parsley: "Parsley",
  Pickles: "Pickles",
  "Oats": "Oats",
  "Whey Protein": "Whey protein",
  Banana: "Banana",
  Cinnamon: "Cinnamon",
  "Cocoa Powder": "Cocoa powder",
  "Potato Raw": "Raw potato",
  "Sweet Potato Raw": "Raw sweet potato",
  "Bell Pepper": "Bell pepper",
  "Whole Wheat Tortilla": "Whole wheat tortilla",
  "Light Mozzarella": "Light mozzarella",
  "Baladi Bread": "Baladi bread",
  "Water or Low-Fat Milk": "Water or low-fat milk",
  "Tuna in Water": "Tuna in water",
  "Brown Burger Bun": "Brown burger bun",
  "Lettuce & Tomato": "Lettuce and tomato",
  "Fish Fillet Raw": "Raw fish fillet",
  "Lemon Herb Sauce": "Lemon herb sauce",
  "Cooked Fish Fillet": "Cooked fish fillet",
  "Cooked Potato": "Cooked potato",
  "Cooked Sweet Potato": "Cooked sweet potato",
  "Cooked Chicken": "Cooked chicken",
  "Cooked Chicken Kofta": "Cooked chicken kofta",
  "Cooked Beef Kofta": "Cooked beef kofta",
  "Cooked Chicken Meatballs": "Cooked chicken meatballs",
  "Cooked Beef Meatballs": "Cooked beef meatballs",
  "Chicken Quesadilla": "Chicken quesadilla",
  "Lean Hawawshi": "Lean hawawshi",
  "Protein Shake": "Protein shake",
  "Cooked Tuna Pasta": "Cooked tuna pasta",
  "Egg Breakfast": "Egg breakfast",
  "Protein Oats": "Protein oats",
  "Eggs & Potato": "Eggs and potato",
  "Egg White Omelette": "Egg white omelette",
  "Chicken Burger": "Chicken burger",
  "Chocolate Recovery Oats": "Chocolate recovery oats",
}

const BG_COMMON_INGREDIENTS: Record<string, string> = {
  "Whole Eggs": "Цели яйца",
  "Whole Egg": "Цяло яйце",
  "Egg Whites": "Белтъци",
  "Whole Wheat Bread": "Пълнозърнест хляб",
  "Tomato & Cucumber": "Домат и краставица",
  "Tomato Sauce": "Доматен сос",
  Tomato: "Домат",
  Cucumber: "Краставица",
  "Chicken Breast Raw": "Сурови пилешки гърди",
  "Chicken Breast Core Raw": "Сурови пилешки гърди",
  "Lean Minced Beef Raw": "Сурова постна телешка кайма",
  "Lean Beef Core Raw": "Сурово постно телешко",
  "Basmati Rice Raw": "Суров ориз басмати",
  "Whole Wheat Penne Raw": "Сурова пълнозърнеста паста пене",
  "Pasta Raw": "Сурова паста",
  Pasta: "Паста",
  "Cooked Pasta": "Сготвена паста",
  "Cooked Penne Pasta": "Сготвена паста пене",
  "Cooked Rice": "Сготвен ориз",
  "Cooked Basmati Rice": "Сготвен ориз басмати",
  "Cucumber Yogurt Sauce": "Йогурт сос с краставица",
  "Light Tahini Sauce": "Лек таханов сос",
  "Yogurt Sauce": "Йогурт сос",
  "Light Pink Sauce": "Лек розов сос",
  "Light Burger Sauce": "Лек бургер сос",
  "Green Salad": "Зелена салата",
  "Green Pepper": "Зелена чушка",
  "Green Pepper & Coriander": "Зелена чушка и кориандър",
  "Mushroom or Pepper": "Гъби или чушка",
  "Mushroom & Pepper": "Гъби и чушка",
  Parsley: "Магданоз",
  Pickles: "Кисели краставички",
  Oats: "Овесени ядки",
  "Whey Protein": "Суроватъчен протеин",
  Banana: "Банан",
  Cinnamon: "Канела",
  "Cocoa Powder": "Какао на прах",
  "Potato Raw": "Суров картоф",
  "Sweet Potato Raw": "Суров сладък картоф",
  "Bell Pepper": "Чушка",
  "Whole Wheat Tortilla": "Пълнозърнеста тортила",
  "Light Mozzarella": "Лека моцарела",
  "Baladi Bread": "Балади хляб",
  "Water or Low-Fat Milk": "Вода или нискомаслено мляко",
  "Tuna in Water": "Риба тон във вода",
  "Brown Burger Bun": "Пълнозърнеста бургер питка",
  "Lettuce & Tomato": "Маруля и домат",
  "Fish Fillet Raw": "Сурово рибно филе",
  "Lemon Herb Sauce": "Лимонов сос с билки",
  "Cooked Fish Fillet": "Сготвено рибно филе",
  "Cooked Potato": "Сготвен картоф",
  "Cooked Sweet Potato": "Сготвен сладък картоф",
  "Cooked Chicken": "Сготвено пилешко",
  "Cooked Chicken Kofta": "Сготвена пилешка кофта",
  "Cooked Beef Kofta": "Сготвена телешка кофта",
  "Cooked Chicken Meatballs": "Сготвени пилешки кюфтенца",
  "Cooked Beef Meatballs": "Сготвени телешки кюфтенца",
  "Chicken Quesadilla": "Пилешка кесадия",
  "Lean Hawawshi": "Лек египетски хауаши",
  "Protein Shake": "Протеинов шейк",
  "Cooked Tuna Pasta": "Сготвена паста с риба тон",
  "Egg Breakfast": "Яйчена закуска",
  "Protein Oats": "Протеинови овесени ядки",
  "Eggs & Potato": "Яйца с картоф",
  "Egg White Omelette": "Омлет от белтъци",
  "Chicken Burger": "Пилешки бургер",
  "Chocolate Recovery Oats": "Шоколадови овесени ядки за възстановяване",
}

const EN_MEAL_TRANSLATIONS: MealTranslationMap = {
  "day-1-egg-power-breakfast": {
    title: "Morning Power Eggs",
    subtitle: "A high-protein breakfast to start the day with steady energy.",
    whyThisMealExists:
      "A simple high-protein breakfast that gives you stable morning energy without feeling heavy.",
    bestTime: "Morning, or before a long workday.",
    storageTip:
      "Best cooked fresh, but you can prepare the vegetables and bread in advance.",
    reheatMethod:
      "Reheat the eggs gently on low heat or in the microwave for 30–45 seconds.",
    chefNote:
      "Keep the heat medium and the eggs soft. Dry eggs make consistency harder.",
    steps: [
      {
        title: "Prepare the eggs",
        body: "Heat a non-stick pan for one minute, then cook the eggs and egg whites over medium heat for 3–4 minutes with only salt and pepper. Keep the texture soft, not dry.",
      },
      {
        title: "Serve the meal",
        body: "Serve the eggs with whole wheat bread and fresh vegetables. If you are in a hurry, prepare the vegetables the night before and cook the eggs fresh.",
      },
    ],
  },

  "day-1-chicken-kofta-basmati-rice": {
    title: "Street Grill Chicken Kofta Bowl",
    subtitle: "A high-protein lunch built for energy and consistency.",
    whyThisMealExists:
      "A foundational high-satiety meal that combines clean protein with stable carbs for energy and adherence.",
    bestTime: "Lunch or post-workout.",
    storageTip:
      "Store the kofta and rice in one container, and keep the sauce separate for up to 3 days.",
    reheatMethod:
      "Reheat the kofta and rice gently on low heat or in the microwave with a small splash of water.",
    chefNote:
      "For a stronger grilled flavor, brown the kofta one extra minute per side without drying it out.",
    steps: [
      {
        title: "Season the chicken",
        body: "Mix the minced chicken with paprika, garlic, onion, oregano, pepper, and salt. Portion the mixture from the start so every meal box stays accurate.",
      },
      {
        title: "Cook the kofta",
        body: "Heat the pan for two minutes, shape the kofta, and cook for 4–5 minutes per side over medium heat. Aim for golden color outside and a juicy texture inside.",
      },
      {
        title: "Portion the meals",
        body: "Divide the rice and kofta into 3-day containers. Keep the cucumber yogurt sauce separate and add it when eating so the flavor and texture stay fresh.",
      },
    ],
  },

  "day-1-beef-kofta-rice-plate": {
    title: "Egyptian Beef Power Plate",
    subtitle: "A high-protein, lower-fat recovery dinner.",
    whyThisMealExists:
      "A satisfying kofta-style dinner that helps you close the day with strong protein without pushing fats too high.",
    bestTime: "Dinner, or a recovery meal after a late workout.",
    storageTip:
      "Keep the tahini sauce separate and add it when eating so the meal stays fresh.",
    reheatMethod:
      "Reheat the kofta and rice slowly. Gentle heat keeps the beef tender.",
    chefNote:
      "Do not press the meat too much while shaping. That is the secret to tender kofta after storage.",
    steps: [
      {
        title: "Season the beef",
        body: "Mix the lean beef with finely chopped onion, green pepper, spices, salt, and pepper. Mix lightly without pressing so the kofta stays tender after storage.",
      },
      {
        title: "Cook the kofta",
        body: "Heat the pan well, shape the kofta, and cook for 4–5 minutes per side. Do not flip too much; let it build color first.",
      },
      {
        title: "Portion and store",
        body: "Divide the kofta and rice into 3-day containers. Keep the tahini sauce separate and reheat the meal gently with a small splash of water.",
      },
    ],
  },

  "day-2-protein-oats": {
    title: "Creamy Muscle Oats",
    subtitle: "A fast breakfast for energy before an active day.",
    whyThisMealExists:
      "A fast breakfast that gives you clean carbs and high protein without complicated prep.",
    bestTime: "Morning, or two hours before training.",
    storageTip:
      "Can be prepared overnight as cold overnight oats.",
    reheatMethod:
      "If reheating, add a splash of water or low-fat milk and stir.",
    chefNote:
      "Do not add whey over direct heat. Turn the heat off first so the texture stays smooth.",
    steps: [
      {
        title: "Cook the oats",
        body: "Cook the oats over low heat for 4–5 minutes while stirring. Add a little water if the texture thickens too quickly so it stays creamy.",
      },
      {
        title: "Add the protein",
        body: "Turn off the heat, wait 30 seconds, then add the protein gradually while stirring quickly. This keeps the texture smooth without clumps.",
      },
    ],
  },

  "day-2-chicken-meatballs-penne": {
    title: "Italian Chicken Meatball Pasta",
    subtitle: "An active lunch with a light Italian flavor.",
    whyThisMealExists:
      "A calculated pasta meal that gives a comfort-food feeling with high protein and controlled calories.",
    bestTime: "Lunch or after a strong workout.",
    storageTip:
      "Keep the sauce covering the chicken meatballs so they stay tender for up to 3 days.",
    reheatMethod:
      "Reheat covered with a small spoon of water so the pasta does not dry out.",
    chefNote:
      "Small chicken meatballs are better for meal prep because they reheat quickly and stay juicy.",
    steps: [
      {
        title: "Shape the chicken meatballs",
        body: "Divide the chicken mixture into small equal balls. Similar size helps them cook quickly and reheat well across 3 days.",
      },
      {
        title: "Cook them in sauce",
        body: "Heat the tomato sauce, add the chicken meatballs, and simmer for 8–10 minutes over low heat. The sauce protects tenderness during storage.",
      },
      {
        title: "Portion the meals",
        body: "Divide the pasta and chicken meatballs into 3-day containers. Keep the protein covered with sauce so it stays soft when reheated.",
      },
    ],
  },

  "day-2-beef-meatballs-penne": {
    title: "Recovery Kofta Pasta",
    subtitle: "A satisfying and structured recovery dinner.",
    whyThisMealExists:
      "A recovery dinner with kofta and pasta comfort while staying inside the system.",
    bestTime: "Dinner or after a demanding day.",
    storageTip:
      "Store the pasta with sauce, and add parsley only when serving.",
    reheatMethod:
      "Reheat on low heat or in the microwave, stirring halfway through.",
    chefNote:
      "The sauce is what keeps the beef tender. Do not let the meal become dry.",
    steps: [
      {
        title: "Shape the kofta meatballs",
        body: "Shape medium meatballs gently without pressing. Too much pressure makes the kofta dry after reheating.",
      },
      {
        title: "Cook them in sauce",
        body: "Cook the kofta meatballs inside the tomato sauce for 8–10 minutes over medium heat. Keep sauce around them so they do not dry out.",
      },
      {
        title: "Portion and store",
        body: "Divide the pasta and kofta into containers, and add parsley when eating. For the third day, reheat with a small spoon of water.",
      },
    ],
  },

  "day-3-eggs-potato": {
    title: "Street Style Eggs & Potato",
    subtitle: "A filling breakfast for a long day.",
    whyThisMealExists:
      "A high-satiety breakfast for long days, combining quick protein with comforting potato carbs.",
    bestTime: "Morning or before a long outing.",
    storageTip:
      "The potatoes can be prepared in advance, but the eggs are best cooked fresh.",
    reheatMethod:
      "Reheat the potatoes in an air fryer or pan to bring back crispness.",
    chefNote:
      "Brown the potatoes well. Golden color makes a big difference in flavor satisfaction.",
    steps: [
      {
        title: "Brown the potatoes",
        body: "Cut the potatoes into cubes, season with salt and pepper, and brown them in an air fryer or non-stick pan until golden.",
      },
      {
        title: "Cook the eggs",
        body: "Cook the eggs and egg whites with the peppers over medium heat for 3–4 minutes. Stir gently and keep the texture soft.",
      },
    ],
  },

  "day-3-chicken-quesadilla": {
    title: "Chicken Quesadilla Street Fit",
    subtitle: "An active lunch with a Mexican-style flavor.",
    whyThisMealExists:
      "A smart street-food style meal that helps you stay psychologically consistent without feeling deprived.",
    bestTime: "Lunch or an outside-the-house meal.",
    storageTip:
      "Store the filling separately and wrap the tortilla when eating for the best texture.",
    reheatMethod:
      "Toast it on a dry pan for one minute per side.",
    chefNote:
      "Light toasting gives a restaurant feel without adding extra fat.",
    steps: [
      {
        title: "Prepare the chicken filling",
        body: "Cook the chicken mixture in a non-stick pan for 6–8 minutes until cooked and easy to shred. Let it cool for one minute before filling.",
      },
      {
        title: "Toast the quesadilla",
        body: "Place the filling inside the tortilla, fold it, and toast for one minute per side on a dry pan. If prepping ahead, store the filling separately and wrap when eating.",
      },
    ],
  },

  "day-3-lean-hawawshi": {
    title: "Lean Egyptian Hawawshi",
    subtitle: "A familiar Egyptian-style recovery dinner.",
    whyThisMealExists:
      "A smart version of hawawshi that satisfies the craving for familiar Egyptian food inside a calculated system.",
    bestTime: "Dinner or a weekend-control meal.",
    storageTip:
      "Let it cool, then store it wrapped. Re-toast before eating for best texture.",
    reheatMethod:
      "Use an air fryer or oven for 3–5 minutes to bring back crispness.",
    chefNote:
      "Let it rest for one minute before cutting so the juices stay inside.",
    steps: [
      {
        title: "Fill the bread",
        body: "Spread the beef mixture inside the baladi bread in an even layer. Keep the middle slightly thinner so it cooks evenly without raw spots.",
      },
      {
        title: "Toast the hawawshi",
        body: "Bake it in the oven or air fryer for 8–12 minutes until the bread is toasted and the beef is cooked. Let it rest for one minute before cutting.",
      },
    ],
  },

  "day-4-protein-shake": {
    title: "Fast Fuel Protein Shake",
    subtitle: "A fast and light breakfast.",
    whyThisMealExists:
      "A very fast breakfast for busy days with clear protein and light energy without cooking.",
    bestTime: "Fast mornings or after training.",
    storageTip:
      "Best consumed immediately. If stored, keep it cold and sealed.",
    reheatMethod: "Do not reheat. Serve cold.",
    chefNote:
      "Start with the liquid, then the powder, then the oats so the blend becomes smoother.",
    steps: [
      {
        title: "Blend the shake",
        body: "Add the liquid first, then the protein, oats, and banana. Blend until smooth. Drink immediately or store cold in a sealed bottle.",
      },
    ],
  },

  "day-4-chicken-pink-pasta": {
    title: "Creamy Pink Chicken Pasta",
    subtitle: "An active lunch with a light pink sauce.",
    whyThisMealExists:
      "A calculated creamy pasta meal that gives a premium feeling without heavy fats.",
    bestTime: "Lunch or post-workout.",
    storageTip:
      "Keep the sauce slightly moist before storage so the pasta does not dry out.",
    reheatMethod:
      "Reheat with a splash of water or an extra spoon of sauce.",
    chefNote:
      "Creamy texture matters more than sauce quantity. Coat the pasta without drowning it.",
    steps: [
      {
        title: "Cook the chicken",
        body: "Cook the chicken mixture over medium heat for 6–8 minutes and break it up with a spoon like bolognese. Do not let it dry out.",
      },
      {
        title: "Coat the pasta",
        body: "Toss the pasta with the chicken and sauce until coated. If storing for 3 days, keep it slightly moist so reheating is better.",
      },
    ],
  },

  "day-4-tuna-pasta-light": {
    title: "Mediterranean Tuna Pasta",
    subtitle: "A light recovery dinner that is easy to prepare.",
    whyThisMealExists:
      "A simple tuna meal for recovery when you need high protein and light prep.",
    bestTime: "Dinner or a light meal after a long day.",
    storageTip:
      "Let it cool before closing the container so steam does not soften the meal too much.",
    reheatMethod:
      "Reheat on very low heat. Tuna dries out quickly.",
    chefNote:
      "Keep the sauce moist. That is the difference between dry tuna and an enjoyable meal.",
    steps: [
      {
        title: "Warm the tuna sauce",
        body: "Drain the tuna, warm the tomato sauce, then add the tuna over low heat for only 2–3 minutes. Tuna dries out quickly.",
      },
      {
        title: "Mix and serve",
        body: "Toss the tuna with the pasta. For storage, let it cool before closing the container so steam does not soften the meal.",
      },
    ],
  },

  "day-5-egg-white-omelette": {
    title: "Lean Morning Omelette",
    subtitle: "A high-protein, lower-fat breakfast.",
    whyThisMealExists:
      "A high-protein, lower-fat breakfast designed for satiety without extra calories.",
    bestTime: "Morning or appetite-control days.",
    storageTip:
      "The omelette is best fresh, but the vegetables can be prepared in advance.",
    reheatMethod:
      "Microwave for only 20–30 seconds so it does not dry out.",
    chefNote:
      "Remove the omelette before it becomes fully dry. Residual heat will finish it.",
    steps: [
      {
        title: "Cook the omelette",
        body: "Cook the egg whites with one whole egg and vegetables over medium heat. Remove it while still soft; residual heat will finish the cooking.",
      },
    ],
  },

  "day-5-chicken-burger": {
    title: "Lean Smash Chicken Burger",
    subtitle: "An active lunch that satisfies cravings without breaking the system.",
    whyThisMealExists:
      "A calculated burger that satisfies the fast-food craving without breaking the plan.",
    bestTime: "Lunch or a cravings-control day.",
    storageTip:
      "Store the bun and sauce separately, and keep the protein on its own.",
    reheatMethod:
      "Reheat the patty on a pan and assemble the burger when eating.",
    chefNote:
      "Toasting the bun for 30 seconds upgrades the meal experience a lot.",
    steps: [
      {
        title: "Shape the patty",
        body: "Shape the chicken patty with an even thickness. Make it slightly thinner in the center so it cooks quickly without drying out.",
      },
      {
        title: "Assemble the burger",
        body: "Reheat the patty, toast the bun for 30 seconds, then add lettuce, tomato, and sauce. For storage, keep the bun and sauce separate.",
      },
    ],
  },

  "day-5-beef-kofta-yogurt-rice": {
    title: "Recovery Beef Kofta Bowl",
    subtitle: "A satisfying recovery dinner that is easy to prepare.",
    whyThisMealExists:
      "A filling recovery meal with kofta flavor and a light yogurt sauce that supports consistency.",
    bestTime: "Dinner or after resistance training.",
    storageTip:
      "Always keep the sauce separate and add it when eating to preserve flavor.",
    reheatMethod:
      "Reheat the kofta and rice, then add the sauce cold.",
    chefNote:
      "The contrast between hot kofta and cold yogurt sauce gives a premium feeling.",
    steps: [
      {
        title: "Cook the kofta",
        body: "Cook the kofta over medium heat for 4–5 minutes per side. Let it rest for one minute before portioning so the juices stay inside.",
      },
      {
        title: "Portion with sauce",
        body: "Divide the rice and kofta into containers, and keep the yogurt sauce separate. Add the cold sauce when eating so the meal feels fresh.",
      },
    ],
  },

  "day-6-chocolate-protein-oats": {
    title: "Chocolate Recovery Oats",
    subtitle: "A sweet breakfast with controlled calories.",
    whyThisMealExists:
      "A dessert-style breakfast that helps control cravings while keeping protein high and carbs calculated.",
    bestTime: "Morning or two hours before training.",
    storageTip:
      "Can be prepared overnight in the fridge. Add a little water before eating.",
    reheatMethod:
      "Warm gently with constant stirring if you prefer it hot.",
    chefNote:
      "Cocoa with cinnamon gives a dessert feeling without high calories.",
    steps: [
      {
        title: "Cook the oats",
        body: "Cook the oats over low heat for 4–5 minutes while stirring. Add a little water if the texture thickens too quickly so it stays creamy.",
      },
      {
        title: "Add chocolate and protein",
        body: "Turn off the heat, add the protein and cocoa gradually, and stir until smooth. A pinch of cinnamon gives a dessert-style feeling.",
      },
    ],
  },

  "day-6-chicken-fajita-sweet-potato": {
    title: "Smoky Chicken Fajita Bowl",
    subtitle: "An active lunch with fajita flavor and sweet potato.",
    whyThisMealExists:
      "A high-flavor fajita meal with steady carbs for energy and performance stability.",
    bestTime: "Lunch or post-workout.",
    storageTip:
      "Store the chicken and vegetables together, with the sweet potato beside them in the same container.",
    reheatMethod:
      "A hot pan or air fryer is best to bring back the fajita aroma.",
    chefNote:
      "Relatively high heat is the secret to fajita flavor without extra fat.",
    steps: [
      {
        title: "Cook the fajita chicken",
        body: "Cook the chicken with peppers and fajita spices on medium-high heat until it gets color and aroma. Do not overcrowd the pan.",
      },
      {
        title: "Prepare the sweet potato",
        body: "Roast or air-fry the sweet potato until soft inside and lightly browned outside. Portion it beside the fajita chicken.",
      },
    ],
  },

  "day-6-tuna-wrap": {
    title: "High Protein Tuna Melt Wrap",
    subtitle: "A light, high-protein recovery dinner.",
    whyThisMealExists:
      "A fast tuna wrap that gives strong protein with a light street-food feeling.",
    bestTime: "Dinner or a quick meal after a busy day.",
    storageTip:
      "Store the tuna filling separately and wrap it when eating for the best texture.",
    reheatMethod:
      "Toast the wrap on a dry pan for one minute per side.",
    chefNote:
      "Do not overheat the tuna. Toast the wrap, not the filling.",
    steps: [
      {
        title: "Prepare the tuna filling",
        body: "Drain the tuna well and mix it with the light sauce, vegetables, and seasoning. Keep the filling moist but not watery.",
      },
      {
        title: "Toast the wrap",
        body: "Place the filling inside the tortilla and toast it on a dry pan for one minute per side. If prepping ahead, keep the filling separate.",
      },
    ],
  },

  "day-7-shakshuka-eggs": {
    title: "Cairo Shakshuka Power Eggs",
    subtitle: "A filling Egyptian-style high-protein breakfast.",
    whyThisMealExists:
      "A familiar Egyptian breakfast upgraded with higher protein and controlled energy.",
    bestTime: "Weekend morning or a relaxed breakfast.",
    storageTip:
      "The tomato base can be prepared in advance. Add the eggs fresh.",
    reheatMethod:
      "Warm the tomato base first, then add the eggs or reheat gently.",
    chefNote:
      "Let the tomato base thicken before adding eggs. That is what gives depth of flavor.",
    steps: [
      {
        title: "Cook the tomato base",
        body: "Cook the tomato, pepper, and spices until the sauce thickens and smells rich. This gives the shakshuka its real flavor.",
      },
      {
        title: "Add the eggs",
        body: "Add the eggs and egg whites, cover the pan, and cook gently until the eggs are set but still soft.",
      },
    ],
  },

  "day-7-tuna-tomato-rice": {
    title: "Tuna Tomato Rice Reset",
    subtitle: "A light, practical, high-protein lunch.",
    whyThisMealExists:
      "A simple reset meal for the end of the week with high protein, easy carbs, and quick prep.",
    bestTime: "Lunch, especially on a busy or lighter day.",
    storageTip:
      "Keep it moist with tomato sauce so the tuna does not become dry.",
    reheatMethod:
      "Reheat gently and avoid overheating the tuna.",
    chefNote:
      "A little lemon or parsley at the end makes the tuna feel fresher.",
    steps: [
      {
        title: "Prepare the tuna tomato mix",
        body: "Drain the tuna and mix it with warm tomato sauce and herbs. Keep the heat low so the tuna stays soft.",
      },
      {
        title: "Assemble with rice",
        body: "Portion the rice and tuna tomato mix together. Keep the meal slightly moist for better reheating.",
      },
    ],
  },

  "day-7-fish-lemon-herb-potato": {
    title: "Lemon Herb Fish Reset Plate",
    subtitle: "A light recovery dinner for the end of the week.",
    whyThisMealExists:
      "A clean fish dinner that helps finish the week light, fresh, and controlled.",
    bestTime: "Dinner or a lighter end-of-week meal.",
    storageTip:
      "Fish is best fresh. If stored, keep it sealed and eat it within 24–48 hours.",
    reheatMethod:
      "Reheat gently in the oven or air fryer. Avoid high microwave heat.",
    chefNote:
      "Lemon and herbs should stay bright. Add a fresh squeeze after reheating.",
    steps: [
      {
        title: "Season the fish",
        body: "Season the fish with lemon, herbs, salt, pepper, and a light spray of oil if needed. Keep the seasoning clean and fresh.",
      },
      {
        title: "Cook and portion",
        body: "Bake or air-fry the fish until just cooked, then portion it with potatoes. Do not overcook; fish dries quickly.",
      },
    ],
  },
}

const BG_MEAL_TRANSLATIONS: MealTranslationMap = {
  "day-1-egg-power-breakfast": {
    title: "Сутрешни силови яйца",
    subtitle: "Високопротеинова закуска за стабилна енергия в началото на деня.",
    whyThisMealExists:
      "Проста високопротеинова закуска, която дава стабилна енергия сутрин без тежест.",
    bestTime: "Сутрин или преди дълъг работен ден.",
    storageTip:
      "Най-добре е да се приготви прясна, но зеленчуците и хлябът могат да се подготвят предварително.",
    reheatMethod:
      "Затопли яйцата внимателно на слаб огън или в микровълнова за 30–45 секунди.",
    chefNote:
      "Дръж огъня среден и яйцата меки. Сухите яйца правят режима по-труден.",
    steps: [
      {
        title: "Подготви яйцата",
        body: "Загрей незалепващ тиган за една минута, след това сготви яйцата и белтъците на среден огън за 3–4 минути само със сол и пипер. Текстурата трябва да остане мека, не суха.",
      },
      {
        title: "Сервирай ястието",
        body: "Сервирай яйцата с пълнозърнест хляб и свежи зеленчуци. Ако бързаш, подготви зеленчуците от вечерта и сготви яйцата прясно.",
      },
    ],
  },

  "day-1-chicken-kofta-basmati-rice": {
    title: "Пилешка кофта с ориз басмати",
    subtitle: "Високопротеинов обяд за енергия и постоянство.",
    whyThisMealExists:
      "Основно засищащо ястие, което комбинира чист протеин със стабилни въглехидрати за енергия и придържане към режима.",
    bestTime: "Обяд или след тренировка.",
    storageTip:
      "Съхранявай кофтата и ориза в една кутия, а соса отделно до 3 дни.",
    reheatMethod:
      "Затопли кофтата и ориза внимателно на слаб огън или в микровълнова с малко вода.",
    chefNote:
      "За по-силен грил вкус запечи кофтата още една минута от всяка страна, без да я изсушаваш.",
    steps: [
      {
        title: "Овкуси пилешкото",
        body: "Смеси мляното пилешко с червен пипер, чесън, лук, риган, пипер и сол. Раздели сместа от самото начало, за да остане всяка кутия точна.",
      },
      {
        title: "Сготви кофтата",
        body: "Загрей тигана за две минути, оформи кофтата и готви 4–5 минути от всяка страна на среден огън. Целта е златист цвят отвън и сочна текстура отвътре.",
      },
      {
        title: "Раздели порциите",
        body: "Раздели ориза и кофтата в кутии за 3 дни. Дръж йогурт соса с краставица отделно и го добави при хранене, за да останат вкусът и текстурата свежи.",
      },
    ],
  },

  "day-1-beef-kofta-rice-plate": {
    title: "Египетска телешка силова чиния",
    subtitle: "Високопротеинова вечеря за възстановяване с по-ниско съдържание на мазнини.",
    whyThisMealExists:
      "Засищащо ястие в стил кофта, което помага да завършиш деня със силен протеин без твърде много мазнини.",
    bestTime: "Вечеря или възстановяващо ястие след късна тренировка.",
    storageTip:
      "Дръж тахановия сос отделно и го добави при хранене, за да остане ястието свежо.",
    reheatMethod:
      "Затопли кофтата и ориза бавно. Нежната топлина запазва телешкото крехко.",
    chefNote:
      "Не притискай месото твърде много при оформяне. Това е тайната за крехка кофта след съхранение.",
    steps: [
      {
        title: "Овкуси телешкото",
        body: "Смеси постното телешко с фино нарязан лук, зелена чушка, подправки, сол и пипер. Разбъркай леко без притискане, за да остане кофтата крехка след съхранение.",
      },
      {
        title: "Сготви кофтата",
        body: "Загрей тигана добре, оформи кофтата и готви 4–5 минути от всяка страна. Не обръщай прекалено често; остави я първо да получи цвят.",
      },
      {
        title: "Раздели и съхрани",
        body: "Раздели кофтата и ориза в кутии за 3 дни. Дръж тахановия сос отделно и затопляй ястието внимателно с малко вода.",
      },
    ],
  },

  "day-2-protein-oats": {
    title: "Кремообразни протеинови овесени ядки",
    subtitle: "Бърза закуска за енергия преди активен ден.",
    whyThisMealExists:
      "Бърза закуска с чисти въглехидрати и висок протеин без сложна подготовка.",
    bestTime: "Сутрин или два часа преди тренировка.",
    storageTip:
      "Може да се приготви от вечерта като студени overnight oats.",
    reheatMethod:
      "Ако затопляш, добави малко вода или нискомаслено мляко и разбъркай.",
    chefNote:
      "Не добавяй протеина върху директен огън. Първо изключи котлона, за да остане текстурата гладка.",
    steps: [
      {
        title: "Сготви овеса",
        body: "Готви овесените ядки на слаб огън 4–5 минути с разбъркване. Добави малко вода, ако сместа се сгъсти твърде бързо, за да остане кремообразна.",
      },
      {
        title: "Добави протеина",
        body: "Изключи котлона, изчакай 30 секунди, след това добавяй протеина постепенно с бързо разбъркване. Така текстурата остава гладка без бучки.",
      },
    ],
  },

  "day-2-chicken-meatballs-penne": {
    title: "Италианска паста с пилешки кюфтенца",
    subtitle: "Активен обяд с лек италиански вкус.",
    whyThisMealExists:
      "Изчислено паста ястие, което дава усещане за comfort food с висок протеин и контролирани калории.",
    bestTime: "Обяд или след силна тренировка.",
    storageTip:
      "Дръж соса около пилешките кюфтенца, за да останат крехки до 3 дни.",
    reheatMethod:
      "Затопли покрито с малка лъжица вода, за да не изсъхне пастата.",
    chefNote:
      "Малките пилешки кюфтенца са по-добри за meal prep, защото се затоплят бързо и остават сочни.",
    steps: [
      {
        title: "Оформи пилешките кюфтенца",
        body: "Раздели пилешката смес на малки равни топки. Еднаквият размер помага да се сготвят бързо и да се затоплят лесно през следващите 3 дни.",
      },
      {
        title: "Сготви ги в сос",
        body: "Загрей доматения сос, добави пилешките кюфтенца и остави да къкрят 8–10 минути на слаб огън. Сосът запазва крехкостта при съхранение.",
      },
      {
        title: "Раздели порциите",
        body: "Раздели пастата и пилешките кюфтенца в кутии за 3 дни. Дръж протеина покрит със сос, за да остане мек при затопляне.",
      },
    ],
  },

  "day-2-beef-meatballs-penne": {
    title: "Възстановяваща паста с телешка кофта",
    subtitle: "Засищаща и структурирана вечеря за възстановяване.",
    whyThisMealExists:
      "Вечеря за възстановяване с вкус на кофта и паста, без излизане от системата.",
    bestTime: "Вечеря или след натоварен ден.",
    storageTip:
      "Съхранявай пастата със сос, а магданоза добави при сервиране.",
    reheatMethod:
      "Затопли на слаб огън или в микровълнова, като разбъркаш по средата.",
    chefNote:
      "Сосът пази телешкото крехко. Не оставяй ястието сухо.",
    steps: [
      {
        title: "Оформи кюфтенцата",
        body: "Оформи средни кюфтенца леко, без притискане. Прекаленото притискане прави кофтата суха след затопляне.",
      },
      {
        title: "Сготви ги в сос",
        body: "Готви телешките кюфтенца в доматения сос 8–10 минути на среден огън. Дръж сос около тях, за да не изсъхнат.",
      },
      {
        title: "Раздели и съхрани",
        body: "Раздели пастата и кофтата в кутии, а магданоза добави при хранене. За третия ден затопли с малка лъжица вода.",
      },
    ],
  },

  "day-3-eggs-potato": {
    title: "Яйца с картоф в street стил",
    subtitle: "Засищаща закуска за дълъг ден.",
    whyThisMealExists:
      "Засищаща закуска за дълги дни, която комбинира бърз протеин с комфортни картофени въглехидрати.",
    bestTime: "Сутрин или преди дълго излизане.",
    storageTip:
      "Картофите могат да се подготвят предварително, но яйцата са най-добри прясно сготвени.",
    reheatMethod:
      "Затопли картофите в air fryer или тиган, за да върнеш хрупкавостта.",
    chefNote:
      "Запечи картофите добре. Златистият цвят прави голяма разлика във вкуса.",
    steps: [
      {
        title: "Запечи картофите",
        body: "Нарежи картофите на кубчета, овкуси със сол и пипер и ги запечи в air fryer или незалепващ тиган до златисто.",
      },
      {
        title: "Сготви яйцата",
        body: "Сготви яйцата и белтъците с чушките на среден огън за 3–4 минути. Разбърквай нежно и остави текстурата мека.",
      },
    ],
  },

  "day-3-chicken-quesadilla": {
    title: "Фит пилешка кесадия",
    subtitle: "Активен обяд с мексикански стил.",
    whyThisMealExists:
      "Умно street-food ястие, което помага психологически да се придържаш към режима без чувство за лишение.",
    bestTime: "Обяд или храна извън дома.",
    storageTip:
      "Съхранявай плънката отделно и завий тортилата при хранене за най-добра текстура.",
    reheatMethod:
      "Запечи на сух тиган по една минута от всяка страна.",
    chefNote:
      "Лекото запичане дава ресторантско усещане без допълнителни мазнини.",
    steps: [
      {
        title: "Подготви пилешката плънка",
        body: "Сготви пилешката смес в незалепващ тиган 6–8 минути, докато се сготви и се раздробява лесно. Остави да изстине една минута преди пълнене.",
      },
      {
        title: "Запечи кесадията",
        body: "Сложи плънката в тортилата, сгъни я и запечи по една минута от всяка страна на сух тиган. Ако подготвяш предварително, дръж плънката отделно и завий при хранене.",
      },
    ],
  },

  "day-3-lean-hawawshi": {
    title: "Лек египетски хауаши",
    subtitle: "Вечеря за възстановяване с познат египетски вкус.",
    whyThisMealExists:
      "Умна версия на хауаши, която задоволява желанието за позната египетска храна в рамките на изчислена система.",
    bestTime: "Вечеря или контролирано weekend ястие.",
    storageTip:
      "Остави да изстине, след това съхранявай увито. Най-добре е да се запече отново преди хранене.",
    reheatMethod:
      "Air fryer или фурна за 3–5 минути, за да се върне хрупкавостта.",
    chefNote:
      "Остави го да почине една минута преди рязане, за да останат соковете вътре.",
    steps: [
      {
        title: "Напълни хляба",
        body: "Разпредели телешката смес в балади хляба на равен слой. Направи средата малко по-тънка, за да се сготви равномерно без сурови части.",
      },
      {
        title: "Запечи хауаши",
        body: "Сложи го във фурна или air fryer за 8–12 минути, докато хлябът се запече и месото се сготви. Остави да почине една минута преди рязане.",
      },
    ],
  },

  "day-4-protein-shake": {
    title: "Бърз протеинов шейк",
    subtitle: "Бърза и лека закуска.",
    whyThisMealExists:
      "Много бърза закуска за натоварени дни с ясен протеин и лека енергия без готвене.",
    bestTime: "Бърза сутрин или след тренировка.",
    storageTip:
      "Най-добре се пие веднага. Ако го съхраняваш, дръж го студен и затворен.",
    reheatMethod: "Не се затопля. Сервира се студен.",
    chefNote:
      "Започни с течността, после праха, после овеса, за да стане сместа по-гладка.",
    steps: [
      {
        title: "Блендирай шейка",
        body: "Добави първо течността, после протеина, овеса и банана. Блендирай до гладка текстура. Изпий веднага или съхранявай студено в затворена бутилка.",
      },
    ],
  },

  "day-4-chicken-pink-pasta": {
    title: "Кремообразна розова паста с пилешко",
    subtitle: "Активен обяд с лек розов сос.",
    whyThisMealExists:
      "Изчислена кремообразна паста, която дава premium усещане без тежки мазнини.",
    bestTime: "Обяд или след тренировка.",
    storageTip:
      "Остави соса леко влажен преди съхранение, за да не изсъхне пастата.",
    reheatMethod:
      "Затопли с малко вода или допълнителна лъжица сос.",
    chefNote:
      "Кремообразната текстура е по-важна от количеството сос. Покрий пастата, без да я удавяш.",
    steps: [
      {
        title: "Сготви пилешкото",
        body: "Готви пилешката смес на среден огън 6–8 минути и я раздроби с лъжица като болонезе. Не я оставяй да изсъхне.",
      },
      {
        title: "Овъргаляй пастата",
        body: "Разбъркай пастата с пилешкото и соса, докато се покрие. Ако ще съхраняваш 3 дни, остави я леко влажна за по-добро затопляне.",
      },
    ],
  },

  "day-4-tuna-pasta-light": {
    title: "Средиземноморска паста с риба тон",
    subtitle: "Лека вечеря за възстановяване, лесна за приготвяне.",
    whyThisMealExists:
      "Лесно ястие с риба тон за възстановяване, когато имаш нужда от висок протеин и лека подготовка.",
    bestTime: "Вечеря или лека храна след дълъг ден.",
    storageTip:
      "Остави да изстине преди затваряне на кутията, за да не омекне прекалено от парата.",
    reheatMethod:
      "Затопли на много слаб огън. Рибата тон изсъхва бързо.",
    chefNote:
      "Дръж соса влажен. Това е разликата между суха риба тон и приятно ястие.",
    steps: [
      {
        title: "Затопли соса с риба тон",
        body: "Отцеди рибата тон, затопли доматения сос и добави рибата тон на слаб огън само за 2–3 минути. Рибата тон изсъхва бързо.",
      },
      {
        title: "Разбъркай и сервирай",
        body: "Разбъркай рибата тон с пастата. За съхранение остави да изстине преди затваряне, за да не омекне от парата.",
      },
    ],
  },

  "day-5-egg-white-omelette": {
    title: "Лек сутрешен омлет",
    subtitle: "Високопротеинова закуска с по-ниско съдържание на мазнини.",
    whyThisMealExists:
      "Високопротеинова закуска с по-ниски мазнини, създадена за ситост без излишни калории.",
    bestTime: "Сутрин или в дни за контрол на апетита.",
    storageTip:
      "Омлетът е най-добър пресен, но зеленчуците могат да се подготвят предварително.",
    reheatMethod:
      "Микровълнова само 20–30 секунди, за да не изсъхне.",
    chefNote:
      "Махни омлета преди да стане напълно сух. Остатъчната топлина ще го довърши.",
    steps: [
      {
        title: "Сготви омлета",
        body: "Сготви белтъците с едно цяло яйце и зеленчуците на среден огън. Махни го, докато е още мек; остатъчната топлина ще довърши готвенето.",
      },
    ],
  },

  "day-5-chicken-burger": {
    title: "Лек пилешки smash бургер",
    subtitle: "Активен обяд, който задоволява craving без да нарушава системата.",
    whyThisMealExists:
      "Изчислен бургер, който задоволява fast-food желанието без да нарушава плана.",
    bestTime: "Обяд или ден за контрол на cravings.",
    storageTip:
      "Съхранявай питката и соса отделно, а протеина самостоятелно.",
    reheatMethod:
      "Затопли кюфтето на тиган и сглоби бургера при хранене.",
    chefNote:
      "Запичането на питката за 30 секунди много повишава усещането за ястието.",
    steps: [
      {
        title: "Оформи кюфтето",
        body: "Оформи пилешкото кюфте с равна дебелина. Направи го малко по-тънко в средата, за да се сготви бързо без да изсъхне.",
      },
      {
        title: "Сглоби бургера",
        body: "Затопли кюфтето, запечи питката за 30 секунди, след това добави маруля, домат и сос. За съхранение дръж питката и соса отделно.",
      },
    ],
  },

  "day-5-beef-kofta-yogurt-rice": {
    title: "Възстановяваща телешка кофта купа",
    subtitle: "Засищаща вечеря за възстановяване, лесна за приготвяне.",
    whyThisMealExists:
      "Засищащо възстановяващо ястие с вкус на кофта и лек йогурт сос, което поддържа постоянството.",
    bestTime: "Вечеря или след силова тренировка.",
    storageTip:
      "Винаги дръж соса отделно и го добави при хранене, за да запазиш вкуса.",
    reheatMethod:
      "Затопли кофтата и ориза, след това добави студения сос.",
    chefNote:
      "Контрастът между гореща кофта и студен йогурт сос дава premium усещане.",
    steps: [
      {
        title: "Сготви кофтата",
        body: "Готви кофтата на среден огън 4–5 минути от всяка страна. Остави я да почине една минута преди разделяне, за да останат соковете вътре.",
      },
      {
        title: "Раздели със соса",
        body: "Раздели ориза и кофтата в кутии и дръж йогурт соса отделно. Добави студения сос при хранене, за да се усеща ястието свежо.",
      },
    ],
  },

  "day-6-chocolate-protein-oats": {
    title: "Шоколадови овесени ядки за възстановяване",
    subtitle: "Сладка закуска с контролирани калории.",
    whyThisMealExists:
      "Закуска в dessert стил, която помага да контролираш cravings, докато протеинът остава висок и въглехидратите изчислени.",
    bestTime: "Сутрин или два часа преди тренировка.",
    storageTip:
      "Може да се приготви overnight в хладилник. Добави малко вода преди хранене.",
    reheatMethod:
      "Затопли внимателно с постоянно разбъркване, ако я предпочиташ топла.",
    chefNote:
      "Какаото с канела дава dessert усещане без високи калории.",
    steps: [
      {
        title: "Сготви овеса",
        body: "Готви овесените ядки на слаб огън 4–5 минути с разбъркване. Добави малко вода, ако сместа се сгъсти твърде бързо, за да остане кремообразна.",
      },
      {
        title: "Добави шоколад и протеин",
        body: "Изключи котлона, добави протеина и какаото постепенно и разбъркай до гладка текстура. Щипка канела дава dessert усещане.",
      },
    ],
  },

  "day-6-chicken-fajita-sweet-potato": {
    title: "Опушена пилешка фахита купа",
    subtitle: "Активен обяд с вкус на фахита и сладък картоф.",
    whyThisMealExists:
      "Ароматно фахита ястие със стабилни въглехидрати за енергия и постоянна продуктивност.",
    bestTime: "Обяд или след тренировка.",
    storageTip:
      "Съхранявай пилешкото и зеленчуците заедно, а сладкия картоф до тях в същата кутия.",
    reheatMethod:
      "Горещ тиган или air fryer е най-добър за връщане на аромата на фахита.",
    chefNote:
      "Относително силният огън е тайната за фахита вкус без допълнителни мазнини.",
    steps: [
      {
        title: "Сготви пилешката фахита",
        body: "Готви пилешкото с чушки и фахита подправки на средно силен огън, докато получи цвят и аромат. Не препълвай тигана.",
      },
      {
        title: "Подготви сладкия картоф",
        body: "Изпечи или приготви в air fryer сладкия картоф, докато стане мек отвътре и леко златист отвън. Раздели го до пилешката фахита.",
      },
    ],
  },

  "day-6-tuna-wrap": {
    title: "Високопротеинов wrap с риба тон",
    subtitle: "Лека високопротеинова вечеря за възстановяване.",
    whyThisMealExists:
      "Бърз wrap с риба тон, който дава силен протеин с леко street-food усещане.",
    bestTime: "Вечеря или бърза храна след натоварен ден.",
    storageTip:
      "Съхранявай плънката с риба тон отделно и завий при хранене за най-добра текстура.",
    reheatMethod:
      "Запечи wrap-а на сух тиган по една минута от всяка страна.",
    chefNote:
      "Не прегрявай рибата тон. Запечи wrap-а, не плънката.",
    steps: [
      {
        title: "Подготви плънката",
        body: "Отцеди добре рибата тон и я смеси с лекия сос, зеленчуците и подправките. Дръж плънката влажна, но не водниста.",
      },
      {
        title: "Запечи wrap-а",
        body: "Сложи плънката в тортилата и запечи на сух тиган по една минута от всяка страна. Ако подготвяш предварително, дръж плънката отделно.",
      },
    ],
  },

  "day-7-shakshuka-eggs": {
    title: "Кайро шакшука с яйца",
    subtitle: "Засищаща египетска високопротеинова закуска.",
    whyThisMealExists:
      "Позната египетска закуска, подобрена с повече протеин и контролирана енергия.",
    bestTime: "Уикенд сутрин или спокойна закуска.",
    storageTip:
      "Доматената база може да се подготви предварително. Добави яйцата прясно.",
    reheatMethod:
      "Затопли първо доматената база, след това добави яйцата или затопли внимателно.",
    chefNote:
      "Остави доматената база да се сгъсти преди яйцата. Това дава дълбочина на вкуса.",
    steps: [
      {
        title: "Сготви доматената база",
        body: "Готви домата, чушката и подправките, докато сосът се сгъсти и стане ароматен. Това дава истинския вкус на шакшука.",
      },
      {
        title: "Добави яйцата",
        body: "Добави яйцата и белтъците, покрий тигана и готви внимателно, докато яйцата стегнат, но останат меки.",
      },
    ],
  },

  "day-7-tuna-tomato-rice": {
    title: "Ориз с риба тон и домати",
    subtitle: "Лек, практичен, високопротеинов обяд.",
    whyThisMealExists:
      "Просто reset ястие за края на седмицата с висок протеин, лесни въглехидрати и бърза подготовка.",
    bestTime: "Обяд, особено в натоварен или по-лек ден.",
    storageTip:
      "Дръж ястието влажно с доматен сос, за да не стане рибата тон суха.",
    reheatMethod:
      "Затопли внимателно и избягвай прегряване на рибата тон.",
    chefNote:
      "Малко лимон или магданоз накрая прави рибата тон по-свежа.",
    steps: [
      {
        title: "Подготви рибата тон с домати",
        body: "Отцеди рибата тон и я смеси с топъл доматен сос и билки. Дръж огъня слаб, за да остане рибата мека.",
      },
      {
        title: "Сглоби с ориза",
        body: "Раздели ориза и сместа с риба тон и домати заедно. Дръж ястието леко влажно за по-добро затопляне.",
      },
    ],
  },

  "day-7-fish-lemon-herb-potato": {
    title: "Риба с лимон, билки и картофи",
    subtitle: "Лека вечеря за възстановяване в края на седмицата.",
    whyThisMealExists:
      "Чиста рибна вечеря, която помага да завършиш седмицата леко, свежо и контролирано.",
    bestTime: "Вечеря или по-леко ястие в края на седмицата.",
    storageTip:
      "Рибата е най-добра прясна. Ако се съхранява, дръж я затворена и я изяж в рамките на 24–48 часа.",
    reheatMethod:
      "Затопли внимателно във фурна или air fryer. Избягвай силна микровълнова топлина.",
    chefNote:
      "Лимонът и билките трябва да останат свежи. Добави пресен лимон след затопляне.",
    steps: [
      {
        title: "Овкуси рибата",
        body: "Овкуси рибата с лимон, билки, сол, пипер и леко напръскване с мазнина, ако е нужно. Дръж вкуса чист и свеж.",
      },
      {
        title: "Сготви и раздели",
        body: "Изпечи или приготви в air fryer рибата само докато се сготви, след това я раздели с картофите. Не я препичай; рибата изсъхва бързо.",
      },
    ],
  },
}

export const MEAL_TRANSLATIONS: Record<
  Exclude<MealTranslationLanguage, "ar">,
  MealTranslationMap
> = {
  en: EN_MEAL_TRANSLATIONS,
  bg: BG_MEAL_TRANSLATIONS,
}

export function getMealTranslation(
  mealId: string,
  language: MealTranslationLanguage
): MealTextTranslation | null {
  if (language === "ar") return null

  return MEAL_TRANSLATIONS[language]?.[mealId] ?? null
}

export function translateIngredientName(
  ingredientName: string,
  language: MealTranslationLanguage,
  mealId?: string,
  ingredientType?: "raw" | "cooked"
) {
  if (language === "ar") return ingredientName

  const mealTranslation = mealId ? getMealTranslation(mealId, language) : null

  if (ingredientType === "raw") {
    const translatedRaw = mealTranslation?.raw?.[ingredientName]
    if (translatedRaw) return translatedRaw
  }

  if (ingredientType === "cooked") {
    const translatedCooked = mealTranslation?.cooked?.[ingredientName]
    if (translatedCooked) return translatedCooked
  }

  if (language === "en") {
    return EN_COMMON_INGREDIENTS[ingredientName] ?? ingredientName
  }

  return BG_COMMON_INGREDIENTS[ingredientName] ?? ingredientName
}

export function translateMealTitle(
  mealId: string,
  originalTitle: string,
  language: MealTranslationLanguage
) {
  return getMealTranslation(mealId, language)?.title ?? originalTitle
}

export function translateMealSubtitle(
  mealId: string,
  originalSubtitle: string,
  language: MealTranslationLanguage
) {
  return getMealTranslation(mealId, language)?.subtitle ?? originalSubtitle
}

export function translateMealInfo(
  mealId: string,
  field:
    | "whyThisMealExists"
    | "bestTime"
    | "storageTip"
    | "reheatMethod"
    | "chefNote",
  originalValue: string,
  language: MealTranslationLanguage
) {
  return getMealTranslation(mealId, language)?.[field] ?? originalValue
}

export function translateMealStep(
  mealId: string,
  stepIndex: number,
  originalStep: {
    title: string
    body: string
  },
  language: MealTranslationLanguage
) {
  const translatedStep = getMealTranslation(mealId, language)?.steps?.[stepIndex]

  return {
    title: translatedStep?.title ?? originalStep.title,
    body: translatedStep?.body ?? originalStep.body,
  }
}