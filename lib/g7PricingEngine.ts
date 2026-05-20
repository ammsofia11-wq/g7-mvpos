export function g7PricingEngine(input: any) {
  const country = input.country || "Global";

  // fake but structured pricing model (MVP)
  const priceMap: any = {
    Egypt: {
      chicken: 120,
      rice: 30,
      vegetables: 25,
      spices: 10,
    },
    USA: {
      chicken: 4,
      rice: 2,
      vegetables: 3,
      spices: 1,
    },
    Global: {
      chicken: 3,
      rice: 1,
      vegetables: 2,
      spices: 1,
    },
  };

  const prices = priceMap[country] || priceMap.Global;

  const items = input.groceryList || [];

  let total = 0;

  const breakdown = items.map((item: string) => {
    let cost = 0;

    if (item.toLowerCase().includes("chicken")) cost = prices.chicken;
    else if (item.toLowerCase().includes("rice")) cost = prices.rice;
    else if (item.toLowerCase().includes("vegetable")) cost = prices.vegetables;
    else cost = prices.spices;

    total += cost;

    return {
      item,
      cost,
      currency: country === "Egypt" ? "EGP" : "USD",
    };
  });

  return {
    country,
    breakdown,
    total,
  };
}