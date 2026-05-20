type Goal = "keto" | "balance";

const proteins = ["Chicken", "Fish", "Eggs"];
const carbsKeto = ["Avocado", "Nuts"];
const carbsBalance = ["Rice", "Potato", "Oats"];
const sauces = ["Tomato Sauce", "Soy Sauce", "Pesto"];

function random(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildMeal(goal: Goal, used: Set<string>) {
  let protein = random(proteins);

  let carbs =
    goal === "keto"
      ? random(carbsKeto)
      : random(carbsBalance);

  let sauce = random(sauces);

  let title = `${protein} Bowl`;
  let key = `${protein}-${carbs}-${sauce}`;

  // منع التكرار
  if (used.has(key)) return null;

  used.add(key);

  return {
    title,
    description: `${protein} with ${carbs} finished with ${sauce}`,
  };
}

export function generatePlan(goal: Goal) {
  const used = new Set<string>();
  const recipes = [];

  while (recipes.length < 3) {
    const meal = buildMeal(goal, used);
    if (meal) recipes.push(meal);
  }

  return { recipes };
}