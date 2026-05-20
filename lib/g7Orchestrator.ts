import { G7_STORES } from "./g7Stores";

export function g7Orchestrator(input: any) {
  const country = input.country || "Egypt";
  const storeName = input.store || "LocalMarket";
  const budget = input.budget || 60;
  const goal = input.goal || "balanced";

  const userPrices = input.prices || null;

  const stores = G7_STORES[country] || G7_STORES["Egypt"];
  const store = stores[storeName] || Object.values(stores)[0];

  // 🧠 PRIORITY: USER PRICES > STORE PRICES
  const pricing = {
    chicken: userPrices?.chicken ?? store.chicken,
    rice: userPrices?.rice ?? store.rice,
    vegetables: userPrices?.vegetables ?? store.vegetables,
    currency: userPrices?.currency ?? store.currency,
  };

  const profiles: any = {
    weight_loss: { protein: 1.2, carbs: 0.7, calories: 1500 },
    muscle_gain: { protein: 1.5, carbs: 1.3, calories: 2200 },
    balanced: { protein: 1, carbs: 1, calories: 1800 },
  };

  const profile = profiles[goal] || profiles.balanced;

  const cuisines = ["MEDITERRANEAN", "MEXICAN", "ASIAN", "INDIAN"];

  function getGrams(item: string) {
    return parseInt(item.match(/(\d+)/)?.[0] || "100");
  }

  function calc(item: string, grams: number) {
    let price = pricing.vegetables;

    if (item.toLowerCase().includes("chicken")) price = pricing.chicken;
    if (item.toLowerCase().includes("rice")) price = pricing.rice;

    return (grams / 1000) * price;
  }

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
  const dailyPlan: any = {};

  mealTypes.forEach((type, i) => {
    const cuisine = cuisines[i % cuisines.length];

    let base: any[] = [];

    if (type === "breakfast") base = ["Chicken 120g", "Vegetables 100g"];
    if (type === "lunch") base = ["Chicken 160g", "Rice 120g", "Vegetables 100g"];
    if (type === "dinner") base = ["Chicken 140g", "Vegetables 150g"];
    if (type === "snack") base = ["Vegetables 100g"];

    const items = base.map((item) => {
      let grams = getGrams(item);

      if (item.includes("Chicken")) grams *= profile.protein;
      if (item.includes("Rice")) grams *= profile.carbs;

      return item.replace(/\d+g/, `${Math.floor(grams)}g`);
    });

    const caloriesMap: any = {
      breakfast: 400,
      lunch: 600,
      dinner: 500,
      snack: 300,
    };

    dailyPlan[type] = {
      meal: `${cuisine} ${type.toUpperCase()} Bowl`,
      calories: caloriesMap[type],
      items,
      cost: 0,
    };
  });

  let totalCost = 0;

  Object.values(dailyPlan).forEach((meal: any) => {
    let mealCost = 0;

    meal.items.forEach((item: string) => {
      const grams = getGrams(item);
      mealCost += calc(item, grams);
    });

    meal.cost = parseFloat(mealCost.toFixed(2));
    totalCost += meal.cost;
  });

  // 🧠 Budget control
  if (totalCost > budget) {
    const factor = budget / totalCost;

    Object.values(dailyPlan).forEach((meal: any) => {
      meal.items = meal.items.map((item: string) => {
        const grams = getGrams(item);
        const newGrams = Math.max(70, Math.floor(grams * factor));
        return item.replace(/\d+g/, `${newGrams}g`);
      });
    });

    totalCost = 0;

    Object.values(dailyPlan).forEach((meal: any) => {
      let mealCost = 0;

      meal.items.forEach((item: string) => {
        const grams = getGrams(item);
        mealCost += calc(item, grams);
      });

      meal.cost = parseFloat(mealCost.toFixed(2));
      totalCost += mealCost;
    });
  }

  const grocery: any = {};

  Object.values(dailyPlan).forEach((meal: any) => {
    meal.items.forEach((item: string) => {
      const name = item.replace(/\d+g/, "").trim();
      const grams = getGrams(item);
      grocery[name] = (grocery[name] || 0) + grams;
    });
  });

  return {
    message: "G7 User Pricing Engine 💰",

    summary: {
      currency: pricing.currency,
      totalCost: parseFloat(totalCost.toFixed(2)),
      budget,
    },

    dailyPlan,
    groceryList: Object.entries(grocery).map(
      ([k, v]) => `${k} ${v}g`
    ),
  };
}