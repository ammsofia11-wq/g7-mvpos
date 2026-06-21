"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type IntakeMethod = {
  label: string;
  source: string;
  status: "Captured" | "Needs Interview" | "Verify Live";
  note: string;
};

type ProductIngredient = {
  name: string;
  unit: string;
  qty: string;
  module: string;
  station: string;
  note?: string;
};

type CulinaryModule = {
  name: string;
  type: string;
  station: string;
  owner: string;
  status: "Ready" | "TBD Live" | "Verify";
  summary: string;
};

type ProductBuild = {
  id: string;
  number: string;
  name: string;
  daypart: string;
  intakeSource: string;
  category: string;
  targetBatch: string;
  servingCondition: string;
  packagingStyle: string;
  sourceStatus: "SOP captured" | "Photo captured" | "Chef interview required";
  modules: CulinaryModule[];
  ingredients: ProductIngredient[];
  prepNotes: string[];
  cookingNotes: string[];
  packagingSteps: string[];
  qaChecks: string[];
  missingData: string[];
};

type ModuleTask = {
  step: string;
  station: string;
  task: string;
  worker: string;
  output: string;
  approval: string;
};

const intakeMethods: IntakeMethod[] = [
  {
    label: "Written Recipe / SOP",
    source: "DOCX recipe files",
    status: "Captured",
    note: "G7 converts existing client documents into Product Builds, Culinary Modules, Build Cards, and Module Tasks.",
  },
  {
    label: "Chef Interview",
    source: "Verbal / head knowledge",
    status: "Needs Interview",
    note: "Used when recipe details are in the chef's head, not written cleanly yet.",
  },
  {
    label: "Photo / Handwritten Sheet",
    source: "Tomato sauce batch image",
    status: "Verify Live",
    note: "G7 captures handwritten data, marks unclear values as TBD, and verifies during pilot production.",
  },
  {
    label: "Live Kitchen Observation",
    source: "Pilot run measurement",
    status: "Verify Live",
    note: "Raw weight, cooked yield, packed output, temperature, timing, and waste are measured during the paid pilot.",
  },
];

const productBuilds: ProductBuild[] = [
  {
    id: "breakfast-club-sandwich",
    number: "01",
    name: "Club Sandwich",
    daypart: "Breakfast Product Build",
    intakeSource: "Existing DOCX recipe / SOP",
    category: "Breakfast / sandwich meal",
    targetBatch: "100 portions pilot target",
    servingCondition: "Chilled / ready-to-eat",
    packagingStyle: "Meal container with label and QA release",
    sourceStatus: "SOP captured",
    modules: [
      {
        name: "Chicken Mortadella / Chicken Filling",
        type: "Protein Module",
        station: "Butchery - Cold Prep - Cooking",
        owner: "Executive Chef",
        status: "Verify",
        summary: "Chicken breast base with seasoning and inclusion ingredients; final portion size must be confirmed during pilot.",
      },
      {
        name: "Whole Grain Toast",
        type: "Carb Module",
        station: "Bakery / Store",
        owner: "Storekeeper",
        status: "Ready",
        summary: "Approved bread item or in-house bread issue according to client selection.",
      },
      {
        name: "Mustard Mayo",
        type: "Sauce Module",
        station: "Cold Prep",
        owner: "Cold Prep Worker",
        status: "Ready",
        summary: "Yellow mustard and mayonnaise portioned as the sandwich sauce layer.",
      },
      {
        name: "Lettuce / Tomato / Cheese / Egg",
        type: "Garnish Module",
        station: "Cold Prep",
        owner: "Cold Prep Worker",
        status: "Verify",
        summary: "Cold sandwich garnish layers must be weighed and visually approved.",
      },
      {
        name: "Sandwich Pack",
        type: "Packaging Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "TBD Live",
        summary: "Packaging style requires final client confirmation: wrap, box, label, and holding rule.",
      },
    ],
    ingredients: [
      { name: "Chicken breast", unit: "g", qty: "30 / 30 / 40", module: "Protein Module", station: "Butchery", note: "S/M/L source quantities" },
      { name: "Green olives", unit: "g", qty: "2 / 4 / 5", module: "Protein Module", station: "Cold Prep" },
      { name: "Walnuts", unit: "g", qty: "1 / 2 / 5", module: "Protein Module", station: "Cold Prep" },
      { name: "Lettuce", unit: "g", qty: "20 / 20 / 25", module: "Garnish Module", station: "Cold Prep" },
      { name: "Mozzarella", unit: "g", qty: "10 / 15 / 20", module: "Garnish Module", station: "Cold Prep" },
      { name: "Eggs", unit: "g", qty: "30 / 60 / 60", module: "Protein Module", station: "Cold Prep" },
      { name: "Whole grain toast", unit: "g", qty: "60", module: "Carb Module", station: "Bakery / Store" },
      { name: "Tomato slice", unit: "g", qty: "15", module: "Garnish Module", station: "Cold Prep" },
      { name: "Yellow mustard", unit: "g", qty: "2.5", module: "Sauce Module", station: "Cold Prep" },
      { name: "Mayonnaise", unit: "g", qty: "5 / 5 / 7", module: "Sauce Module", station: "Cold Prep" },
    ],
    prepNotes: [
      "Wash and sanitize produce before cold prep.",
      "Portion all ingredients before production starts.",
      "Client confirms final sandwich layering and cut style during pilot.",
    ],
    cookingNotes: [
      "Cook any chicken component to a safe internal temperature before chilling.",
      "Hold finished chilled product at  5C.",
    ],
    packagingSteps: [
      "Prepare sandwich container or wrap.",
      "Place Carb Module.",
      "Add Protein Module.",
      "Add Sauce Module.",
      "Add Garnish Module.",
      "Close, label, and move to QA release.",
    ],
    qaChecks: ["Weight check", "Layer visibility", "Cold holding  5C", "Label and date check"],
    missingData: ["Final packaging format", "Final product photo", "Shelf life confirmation", "Packed output weight"],
  },
  {
    id: "lunch-green-thai-chicken",
    number: "02",
    name: "Green Thai Chicken Curry with Basmati Rice",
    daypart: "Lunch Product Build",
    intakeSource: "Existing DOCX recipe / SOP",
    category: "Lunch meal",
    targetBatch: "100 portions pilot target",
    servingCondition: "Chilled meal, reheatable",
    packagingStyle: "2-compartment plastic box size 28 with yogurt sauce side",
    sourceStatus: "SOP captured",
    modules: [
      {
        name: "Green Thai Chicken",
        type: "Protein Module",
        station: "Butchery - Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Ready",
        summary: "Chicken breast marinated with green Thai paste, cooked to 74C.",
      },
      {
        name: "Basmati Rice",
        type: "Carb Module",
        station: "Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Ready",
        summary: "Rice cooked with chicken stock and green Thai sauce.",
      },
      {
        name: "Yogurt Sauce",
        type: "Sauce Module",
        station: "Cold Prep",
        owner: "Cold Prep Worker",
        status: "Ready",
        summary: "Yogurt with cucumber, mint, garlic, lemon juice, and salt.",
      },
      {
        name: "Lemon / Herbs",
        type: "Garnish Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "Verify",
        summary: "Final garnish to match approved product photo.",
      },
      {
        name: "2-Compartment Box",
        type: "Packaging Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "Ready",
        summary: "Cool below 5C, portion into box, seal, label, and release.",
      },
    ],
    ingredients: [
      { name: "Chicken breast", unit: "g", qty: "120 / 150 / 180", module: "Protein Module", station: "Butchery" },
      { name: "Coriander leaves", unit: "g", qty: "8", module: "Sauce Module", station: "Cold Prep" },
      { name: "Lemon grass", unit: "g", qty: "3", module: "Sauce Module", station: "Cold Prep" },
      { name: "Ginger", unit: "g", qty: "3", module: "Sauce Module", station: "Cold Prep" },
      { name: "Red onion", unit: "g", qty: "10", module: "Sauce Module", station: "Vegetable Prep" },
      { name: "Garlic", unit: "g", qty: "2", module: "Sauce Module", station: "Cold Prep" },
      { name: "Curry leaves", unit: "g", qty: "0.2", module: "Sauce Module", station: "Cold Prep" },
      { name: "Olive oil", unit: "g", qty: "10 / 13 / 16", module: "Protein Module", station: "Hot Kitchen" },
      { name: "Basmati rice", unit: "g", qty: "40 / 50 / 60", module: "Carb Module", station: "Hot Kitchen" },
      { name: "Chicken stock", unit: "g", qty: "100 / 120 / 150", module: "Carb Module", station: "Hot Kitchen" },
      { name: "Yogurt sauce", unit: "g", qty: "35", module: "Sauce Module", station: "Cold Prep" },
    ],
    prepNotes: [
      "Blend red onion, coriander, curry leaves, garlic, ginger, lemon grass, salt, and water.",
      "Marinate chicken with green Thai marinade for 15-30 minutes chilled.",
    ],
    cookingNotes: [
      "Cook chicken in oven roasted mode to 74C.",
      "Cook rice with chicken stock mixed with green Thai sauce.",
    ],
    packagingSteps: [
      "Cool meal components to below 5C before packaging.",
      "Place rice in the Carb Module side of the container.",
      "Place chicken in Protein Module side.",
      "Pack yogurt sauce as side sauce.",
      "Add garnish according to approved photo.",
      "Seal, label, and move to QA release.",
    ],
    qaChecks: ["Chicken core temperature 74C", "Finished product  5C", "2-compartment placement", "Label check"],
    missingData: ["Actual cooked chicken yield", "Final packed weight", "Garnish standard photo", "Shelf life approval"],
  },
  {
    id: "dinner-qatari-pasta-machboos",
    number: "03",
    name: "Qatari Pasta Chicken Machboos",
    daypart: "Dinner Product Build",
    intakeSource: "Existing DOCX recipe / SOP",
    category: "Dinner meal",
    targetBatch: "100 portions pilot target",
    servingCondition: "Chilled meal, reheatable",
    packagingStyle: "Meal bowl or 2-compartment box with QA label",
    sourceStatus: "SOP captured",
    modules: [
      {
        name: "Machboos Chicken",
        type: "Protein Module",
        station: "Butchery - Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Ready",
        summary: "Chicken cubes cooked in machboos base with onion, tomato, vegetables, spices, and loomi.",
      },
      {
        name: "Fried Macaroni Pasta",
        type: "Carb Module",
        station: "Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Ready",
        summary: "Macaroni fried to golden color, then cooked al dente with machboos mix.",
      },
      {
        name: "Tomato Spice Base",
        type: "Sauce Module",
        station: "Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Verify",
        summary: "Tomato, onion, garlic, ginger, loomi, and spice base; may link later to Tomato Sauce Batch.",
      },
      {
        name: "Fresh Coriander",
        type: "Garnish Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "Ready",
        summary: "Added at the final stage before shutdown and visual check.",
      },
      {
        name: "Dinner Meal Pack",
        type: "Packaging Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "TBD Live",
        summary: "Final bowl/box style and appearance standard to be confirmed in pilot.",
      },
    ],
    ingredients: [
      { name: "Chicken breast", unit: "g", qty: "120 / 150 / 180", module: "Protein Module", station: "Butchery" },
      { name: "Macaroni pasta", unit: "g", qty: "50 / 60 / 75", module: "Carb Module", station: "Hot Kitchen" },
      { name: "Red onion", unit: "g", qty: "60", module: "Sauce Module", station: "Vegetable Prep" },
      { name: "Peeled tomato", unit: "g", qty: "15", module: "Sauce Module", station: "Hot Kitchen" },
      { name: "Green bell pepper", unit: "g", qty: "10", module: "Garnish Module", station: "Vegetable Prep" },
      { name: "Green chili", unit: "g", qty: "1", module: "Sauce Module", station: "Hot Kitchen" },
      { name: "Potato", unit: "g", qty: "10", module: "Carb Module", station: "Vegetable Prep" },
      { name: "Carrots", unit: "g", qty: "10", module: "Garnish Module", station: "Vegetable Prep" },
      { name: "Loomi black dried loomi", unit: "g", qty: "0.5", module: "Sauce Module", station: "Hot Kitchen" },
      { name: "Fresh coriander", unit: "g", qty: "2", module: "Garnish Module", station: "Packaging" },
    ],
    prepNotes: [
      "Cut chicken breast into medium cubes.",
      "Slice onions, dice bell pepper and chilies, cut potatoes and carrots.",
      "Measure all spices before cooking.",
    ],
    cookingNotes: [
      "Cook onion base, aromatics, vegetables, loomi, tomatoes, and chicken.",
      "Fry macaroni to golden color, strain extra oil, then combine and cook al dente.",
    ],
    packagingSteps: [
      "Cool product below 5C before packaging.",
      "Portion pasta and chicken according to approved build.",
      "Add garnish if required.",
      "Seal, label, and send to QA release.",
    ],
    qaChecks: ["Chicken cooked safely", "Pasta texture al dente", "Color and aroma check", "Final weight check"],
    missingData: ["Actual cooking loss", "Final bowl weight", "Packaging image standard", "Shelf life approval"],
  },
  {
    id: "dessert-rice-pudding",
    number: "04",
    name: "Rice Pudding",
    daypart: "Dessert Product Build",
    intakeSource: "Chef verbal intake / recipe still required",
    category: "Dessert",
    targetBatch: "TBD by chef interview",
    servingCondition: "Chilled dessert",
    packagingStyle: "Dessert cup / seal / label / cold QA release",
    sourceStatus: "Chef interview required",
    modules: [
      {
        name: "Rice Milk Base",
        type: "Carb Module",
        station: "Hot Kitchen",
        owner: "Pastry / Hot Kitchen Worker",
        status: "TBD Live",
        summary: "Rice, milk, sweetener/sugar, and starch/thickener structure to be captured from chef interview.",
      },
      {
        name: "Cream / Flavor Base",
        type: "Sauce Module",
        station: "Pastry / Hot Kitchen",
        owner: "Pastry Worker",
        status: "TBD Live",
        summary: "Flavor, sweetness, and texture standard must be approved by chef.",
      },
      {
        name: "Cinnamon / Nuts / Garnish",
        type: "Garnish Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "TBD Live",
        summary: "Final garnish depends on client allergen and cost decision.",
      },
      {
        name: "Dessert Cup Pack",
        type: "Packaging Module",
        station: "Packaging",
        owner: "Packaging Worker",
        status: "TBD Live",
        summary: "Cup size, seal, label, shelf life, and cold holding must be defined.",
      },
    ],
    ingredients: [
      { name: "Rice", unit: "g", qty: "TBD", module: "Carb Module", station: "Hot Kitchen", note: "Chef interview required" },
      { name: "Milk", unit: "g", qty: "TBD", module: "Sauce Module", station: "Hot Kitchen", note: "Chef interview required" },
      { name: "Sugar / sweetener", unit: "g", qty: "TBD", module: "Sauce Module", station: "Hot Kitchen", note: "Client formula required" },
      { name: "Vanilla / flavor", unit: "g", qty: "TBD", module: "Sauce Module", station: "Hot Kitchen" },
      { name: "Cinnamon / nuts", unit: "g", qty: "TBD", module: "Garnish Module", station: "Packaging", note: "Allergen decision" },
    ],
    prepNotes: [
      "Run chef interview to capture formula, cooking texture, and target cup size.",
      "Define allergen rule for dairy and nuts.",
    ],
    cookingNotes: [
      "Cook rice pudding base to approved thickness.",
      "Blast chill to  5C before packaging.",
    ],
    packagingSteps: [
      "Place dessert cup on scale.",
      "Portion rice pudding to target weight.",
      "Add approved garnish.",
      "Seal cup and apply label.",
      "Move to cold QA release.",
    ],
    qaChecks: ["Texture check", "Sweetness approval", "Cup weight", "Cold holding  5C", "Allergen label"],
    missingData: ["Full recipe", "Target cup weight", "Shelf life", "Allergen decision", "Final garnish"],
  },
  {
    id: "batch-tomato-sauce",
    number: "05",
    name: "Tomato Sauce Batch",
    daypart: "Batch / Sauce Module Build",
    intakeSource: "Handwritten photo intake",
    category: "Batch sauce / reusable Sauce Module",
    targetBatch: "45 kg net yield from handwritten sheet",
    servingCondition: "Cooked sauce, chilled for production use",
    packagingStyle: "Batch container / label / storage / issue to production",
    sourceStatus: "Photo captured",
    modules: [
      {
        name: "Tomato Sauce Base",
        type: "Sauce Module",
        station: "Hot Kitchen",
        owner: "Hot Kitchen Worker",
        status: "Verify",
        summary: "Handwritten batch sheet captured; unclear quantities must be confirmed before pilot production.",
      },
      {
        name: "Aromatics",
        type: "Garnish Module",
        station: "Vegetable Prep - Hot Kitchen",
        owner: "Vegetable Prep Worker",
        status: "Verify",
        summary: "Onion, garlic, dry herbs, sugar, salt, and olive oil require verified weights.",
      },
      {
        name: "Batch Storage Pack",
        type: "Packaging Module",
        station: "Packaging / Store",
        owner: "Storekeeper",
        status: "TBD Live",
        summary: "Define batch container, label, production date, expiry, storage temperature, and issue rule.",
      },
    ],
    ingredients: [
      { name: "Tomato sauce", unit: "kg", qty: "42", module: "Sauce Module", station: "Hot Kitchen", note: "From photo, verify" },
      { name: "Brown onion", unit: "kg", qty: "4", module: "Garnish Module", station: "Vegetable Prep", note: "From photo, verify" },
      { name: "Peeled garlic", unit: "g", qty: "420", module: "Garnish Module", station: "Vegetable Prep", note: "From photo, verify" },
      { name: "Dry basil", unit: "g", qty: "TBD verify", module: "Sauce Module", station: "Hot Kitchen", note: "Handwriting unclear" },
      { name: "Dry oregano", unit: "g", qty: "TBD verify", module: "Sauce Module", station: "Hot Kitchen", note: "Handwriting unclear" },
      { name: "Sugar", unit: "g", qty: "TBD verify", module: "Sauce Module", station: "Hot Kitchen", note: "Handwriting unclear" },
      { name: "Salt", unit: "g", qty: "TBD verify", module: "Sauce Module", station: "Hot Kitchen", note: "Handwriting unclear" },
      { name: "Olive oil", unit: "kg", qty: "TBD verify", module: "Sauce Module", station: "Hot Kitchen", note: "Handwriting unclear" },
    ],
    prepNotes: [
      "Use photo intake as first source, then confirm all handwritten weights with chef.",
      "Define whether this sauce is a reusable G7 Sauce Module for pasta, machboos, and other meals.",
    ],
    cookingNotes: [
      "Cooking method, time, target thickness, and final Brix/texture standard need chef confirmation.",
      "Record final cooked net weight and variance against 45 kg target.",
    ],
    packagingSteps: [
      "Cool sauce safely after cooking.",
      "Transfer to approved batch containers.",
      "Label with batch name, date, yield, expiry, and owner.",
      "Move to chilled storage or issue to production.",
    ],
    qaChecks: ["Weight/yield check", "Texture check", "Salt/acidity taste check", "Batch label", "Storage temperature"],
    missingData: ["Full cooking method", "Unclear handwritten quantities", "Shelf life", "Storage temperature", "Issue unit"],
  },
];

function statusClass(status: string) {
  if (status === "Ready" || status === "Captured" || status === "SOP captured") {
    return "border-[#CCFF33]/30 bg-[#CCFF33]/10 text-[#CCFF33]";
  }

  if (status === "Verify" || status === "Verify Live" || status === "Photo captured") {
    return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  }

  return "border-cyan-300/30 bg-cyan-300/10 text-cyan-100";
}

function buildTasks(product: ProductBuild): ModuleTask[] {
  const stations = new Set(product.modules.map((moduleItem) => moduleItem.station));

  return [
    {
      step: "01",
      station: "Store",
      task: `Prepare issue list for ${product.name}`,
      worker: "Storekeeper 01",
      output: "Ingredients, packaging materials, labels, and TBD live items prepared for the pilot run.",
      approval: "Store issue confirmation",
    },
    {
      step: "02",
      station: Array.from(stations).join(" / ").slice(0, 90) || "Production",
      task: "Execute G7 Culinary Modules",
      worker: "Assigned station workers",
      output: "Protein, Carb, Sauce, Garnish, and Packaging Module work completed according to the Product Build.",
      approval: "Production manager handoff",
    },
    {
      step: "03",
      station: "Packaging",
      task: "Complete Packaging Module Build Card",
      worker: "Packaging Worker 01",
      output: "Final packed product follows the Build Card sequence, visual standard, label rule, and portion target.",
      approval: "Packaging supervisor check",
    },
    {
      step: "04",
      station: "QA",
      task: "Final QA release gate",
      worker: "QA User",
      output: "Weight, appearance, label, temperature, and release decision recorded.",
      approval: "Approve / Hold / Reject",
    },
  ];
}

const pilotDeliverables = [
  "5 Product Builds captured from real client sources",
  "G7 Culinary Modules structured by product",
  "Packaging Module Build Cards prepared for worker execution",
  "Module Tasks generated for Store, Production, Packaging, and QA",
  "QA Release Gates mapped for each Product Build",
  "Missing measurements marked as TBD Live instead of guessed",
  "Pilot Result Summary ready for client sign-off",
];

const commercialCloseItems = [
  "Pilot fee: 150,000 EGP Founder Launch Pricing",
  "Scope: 5 Product Builds for one client workspace",
  "Output: pilot-ready production structure, not a generic demo screen",
  "Credit rule: agreed pilot credit can be deducted from the full rollout setup if signed within 30 days",
];

const rolloutPhases = [
  {
    phase: "Phase 1",
    title: "Production Core Go-Live",
    timing: "45-60 days",
    scope: "Product Builds, Culinary Modules, Build Cards, Module Tasks, Worker Tasks, QA Release, and production dashboard for the approved pilot scope.",
  },
  {
    phase: "Phase 2",
    title: "Inventory & Purchasing Core",
    timing: "60-90 days",
    scope: "Ingredients, yields, approved supplier rules, issue lists, stock movement, batch traceability, and live measurement records.",
  },
  {
    phase: "Phase 3",
    title: "Reporting / Dispatch / Expansion",
    timing: "90+ days",
    scope: "Management reports, dispatch handoff, multi-user operating rules, and integration roadmap by priority.",
  },
];


export default function PilotIntakePage() {
  const [clientName, setClientName] = useState("Salem's diet");
  const [kitchenName, setKitchenName] = useState("Main Central Kitchen");
  const [batchQuantity, setBatchQuantity] = useState(100);
  const [selectedProductId, setSelectedProductId] = useState(productBuilds[0].id);
  const [selectedMethod, setSelectedMethod] = useState(intakeMethods[0].label);

  const selectedProduct = useMemo(
    () => productBuilds.find((product) => product.id === selectedProductId) ?? productBuilds[0],
    [selectedProductId],
  );

  const selectedTasks = useMemo(() => buildTasks(selectedProduct), [selectedProduct]);

  const readyCount = selectedProduct.modules.filter((moduleItem) => moduleItem.status === "Ready").length;
  const verifyCount = selectedProduct.modules.filter((moduleItem) => moduleItem.status === "Verify").length;
  const tbdCount = selectedProduct.modules.filter((moduleItem) => moduleItem.status === "TBD Live").length;

  return (
    <main className="min-h-screen bg-[#06111F] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-[-160px] top-[-160px] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#CCFF33]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-4 pb-10 sm:px-5 lg:px-7">
        <header className="rounded-[34px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <Link
              href="/pilot-onboarding"
              className="rounded-full border border-white/15 px-4 py-2 transition hover:border-[#CCFF33]/40 hover:text-[#CCFF33]"
            >
              Back to Client Workspace
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/demo-close"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                Demo Close
              </Link>

              <Link
                href="/production-tasks"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                Production Tasks
              </Link>

              <Link
                href="/worker-task"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-emerald-300/40 hover:text-emerald-200"
              >
                Worker Task
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 xl:grid-cols-[1fr_430px]">
            <div>
              <div className="inline-flex rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                G7 5-Product Pilot Intake
              </div>

              <h1 className="mt-5 max-w-5xl text-[42px] font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-[62px] lg:text-[76px]">
                Turn Salem&apos;s diet recipes into Product Builds.
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-[17px]">
                This intake accepts written SOPs, chef interviews, photos, handwritten sheets, and live kitchen observation. G7 structures each item into Culinary Modules, Packaging Module Build Cards, Module Tasks, QA release gates, and pilot-ready missing-data checks.
              </p>
            </div>

            <aside className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                Paid Pilot Package
              </p>

              <h2 className="mt-3 text-[32px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                G7 5-Product Pilot Implementation.
              </h2>

              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Client
                  </p>
                  <p className="mt-1 text-[26px] font-black text-white">
                    {clientName}
                  </p>
                </div>

                <div className="rounded-[22px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                    Pilot Output
                  </p>
                  <p className="mt-1 text-[18px] font-black leading-tight text-white">
                    5 Product Builds - Modules - Build Cards - Module Tasks - QA
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Step 1 - Client Workspace
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Pilot setup details.
            </h2>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Client Name
                </span>
                <input
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Kitchen Name
                </span>
                <input
                  value={kitchenName}
                  onChange={(event) => setKitchenName(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Pilot Batch Quantity
                </span>
                <input
                  type="number"
                  min={1}
                  value={batchQuantity}
                  onChange={(event) => setBatchQuantity(Math.max(1, Number(event.target.value) || 1))}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-cyan-300/50"
                />
              </label>

              <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Tenant Summary
                </p>
                <div className="mt-3 grid gap-2 text-[13px] font-bold leading-6 text-slate-200">
                  <p>Client: {clientName}</p>
                  <p>Kitchen: {kitchenName}</p>
                  <p>Package: 5 Product Builds</p>
                  <p>Currency: EGP</p>
                  <p>Timezone: Africa/Cairo</p>
                  <p>Units: g / kg / portion / piece</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Step 2 - Intake Method
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              G7 captures recipes even when they are not perfectly written.
            </h2>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {intakeMethods.map((method) => (
                <button
                  key={method.label}
                  type="button"
                  onClick={() => setSelectedMethod(method.label)}
                  className={`rounded-[24px] border p-4 text-left transition ${
                    selectedMethod === method.label
                      ? "border-[#CCFF33]/40 bg-[#CCFF33]/10"
                      : "border-white/10 bg-black/20 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[18px] font-black leading-none tracking-[-0.035em] text-white">
                        {method.label}
                      </h3>
                      <p className="mt-2 text-[12px] font-bold leading-5 text-cyan-100">
                        {method.source}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${statusClass(method.status)}`}>
                      {method.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] font-bold leading-5 text-slate-300">
                    {method.note}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Step 3 - 5 Product Build Scope
              </p>
              <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
                Select a product to structure into modules.
              </h2>
            </div>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-100">
              Paid Pilot Scope
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {productBuilds.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProductId(product.id)}
                className={`rounded-[26px] border p-4 text-left transition ${
                  selectedProductId === product.id
                    ? "border-[#CCFF33]/45 bg-[#CCFF33]/10 shadow-[0_0_35px_rgba(204,255,51,0.08)]"
                    : "border-white/10 bg-black/20 hover:border-cyan-300/35"
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-sm font-black text-[#CCFF33]">
                    {product.number}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${statusClass(product.sourceStatus)}`}>
                    {product.sourceStatus}
                  </span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                  {product.daypart}
                </p>
                <h3 className="mt-3 text-[20px] font-black leading-none tracking-[-0.04em] text-white">
                  {product.name}
                </h3>
                <p className="mt-3 text-[12px] font-bold leading-5 text-slate-300">
                  {product.intakeSource}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
              Selected Product Build
            </p>
            <h2 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.055em] text-white">
              {selectedProduct.name}
            </h2>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Category</p>
                <p className="mt-1 text-sm font-black text-white">{selectedProduct.category}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Serving Condition</p>
                <p className="mt-1 text-sm font-black text-white">{selectedProduct.servingCondition}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Packaging Style</p>
                <p className="mt-1 text-sm font-black text-white">{selectedProduct.packagingStyle}</p>
              </div>
              <div className="rounded-[22px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">Module Readiness</p>
                <p className="mt-1 text-sm font-black text-white">
                  Ready: {readyCount} / Verify: {verifyCount} / TBD Live: {tbdCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Step 4 - G7 Culinary Modules
            </p>
            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Product structure before production.
            </h2>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {selectedProduct.modules.map((moduleItem) => (
                <article key={`${selectedProduct.id}-${moduleItem.name}`} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">{moduleItem.type}</p>
                      <h3 className="mt-2 text-[20px] font-black leading-none tracking-[-0.04em] text-white">{moduleItem.name}</h3>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${statusClass(moduleItem.status)}`}>
                      {moduleItem.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] font-bold leading-5 text-slate-300">{moduleItem.summary}</p>
                  <div className="mt-4 grid gap-2 text-[11px] font-bold leading-5 text-slate-400">
                    <p>Station: {moduleItem.station}</p>
                    <p>Owner: {moduleItem.owner}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
            Step 5 - Product Intake Template
          </p>
          <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
            Ingredients and source data captured for {selectedProduct.name}.
          </h2>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
            <div className="grid grid-cols-[1.15fr_0.55fr_0.75fr_0.9fr_0.9fr_1fr] gap-0 bg-white/[0.06] px-4 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
              <span>Ingredient</span>
              <span>Unit</span>
              <span>Qty</span>
              <span>Module</span>
              <span>Station</span>
              <span>Note</span>
            </div>

            <div className="divide-y divide-white/10">
              {selectedProduct.ingredients.map((ingredient) => (
                <div key={`${selectedProduct.id}-${ingredient.name}-${ingredient.qty}`} className="grid grid-cols-[1.15fr_0.55fr_0.75fr_0.9fr_0.9fr_1fr] gap-0 px-4 py-3 text-[12px] font-bold leading-5 text-slate-200">
                  <span className="text-white">{ingredient.name}</span>
                  <span>{ingredient.unit}</span>
                  <span>{ingredient.qty}</span>
                  <span className="text-cyan-100">{ingredient.module}</span>
                  <span className="text-slate-300">{ingredient.station}</span>
                  <span className="text-slate-400">{ingredient.note ?? "Captured"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Prep / Cooking Notes
            </p>
            <h2 className="mt-3 text-[28px] font-black leading-none tracking-[-0.05em] text-white">
              Method captured.
            </h2>
            <div className="mt-5 grid gap-3">
              {[...selectedProduct.prepNotes, ...selectedProduct.cookingNotes].map((note) => (
                <p key={note} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-[12px] font-bold leading-5 text-slate-300">
                  {note}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Packaging Module Build Card
            </p>
            <h2 className="mt-3 text-[28px] font-black leading-none tracking-[-0.05em] text-white">
              Worker-facing build sequence.
            </h2>
            <div className="mt-5 grid gap-3">
              {selectedProduct.packagingSteps.map((step, index) => (
                <div key={`${selectedProduct.id}-packaging-${step}`} className="grid grid-cols-[46px_1fr] gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-sm font-black text-[#CCFF33]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[12px] font-bold leading-5 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-amber-300/20 bg-amber-300/10 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-100">
              QA Release Gate
            </p>
            <h2 className="mt-3 text-[28px] font-black leading-none tracking-[-0.05em] text-white">
              What QA must check.
            </h2>
            <div className="mt-5 grid gap-3">
              {selectedProduct.qaChecks.map((check) => (
                <p key={`${selectedProduct.id}-qa-${check}`} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-[12px] font-bold leading-5 text-slate-200">
                  {check}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Step 6 - Generated Module Tasks
          </p>
          <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
            G7 turns the selected Product Build into station tasks.
          </h2>

          <div className="mt-6 grid gap-3">
            {selectedTasks.map((task) => (
              <article key={`${selectedProduct.id}-${task.step}`} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                <div className="grid gap-4 lg:grid-cols-[80px_190px_1fr_220px] lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[18px] font-black text-[#CCFF33]">
                    {task.step}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Station</p>
                    <p className="mt-2 text-[16px] font-black text-white">{task.station}</p>
                  </div>

                  <div>
                    <h3 className="text-[22px] font-black leading-none tracking-[-0.04em] text-white">{task.task}</h3>
                    <p className="mt-3 text-[13px] font-bold leading-6 text-slate-300">{task.output}</p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Worker</p>
                    <p className="mt-2 text-sm font-black text-white">{task.worker}</p>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Approval</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-[#CCFF33]">{task.approval}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-amber-300/20 bg-amber-300/10 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-100">
              Missing Data / TBD Live
            </p>
            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Nothing is guessed. G7 marks what must be measured.
            </h2>
            <div className="mt-6 grid gap-3">
              {selectedProduct.missingData.map((item) => (
                <p key={`${selectedProduct.id}-missing-${item}`} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-[12px] font-bold leading-5 text-slate-200">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Pilot Result & Client Sign-Off
            </p>
            <h2 className="mt-3 text-[34px] font-black leading-none tracking-[-0.055em] text-white">
              Salem&apos;s diet now has a paid pilot output, not a throwaway demo.
            </h2>
            <p className="mt-4 text-sm font-bold leading-7 text-slate-200">
              This result explains what the client receives after the 5-product pilot and prepares the next commercial conversation: continue into Production Core Go-Live or keep the pilot scope only.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {pilotDeliverables.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CCFF33]/35 bg-[#CCFF33]/10 text-xs font-black text-[#CCFF33]">"</span>
                  <p className="text-sm font-bold text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5 sm:p-6">
          <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                Commercial Close After Pilot
              </p>
              <h2 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                If the client is impressed, this becomes the first part of full G7 rollout.
              </h2>
              <p className="mt-4 text-sm font-bold leading-7 text-slate-300">
                The correct owner response is not "take the demo and use it." The correct response is: the pilot has proven value, so the approved Product Builds, Build Cards, Module Tasks, and QA Gates move into a phased Production Core rollout.
              </p>

              <div className="mt-6 grid gap-3">
                {commercialCloseItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-[13px] font-black leading-6 text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {rolloutPhases.map((phase) => (
                <article key={phase.phase} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                      {phase.phase}
                    </span>
                    <span className="rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
                      {phase.timing}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[24px] font-black leading-none tracking-[-0.045em] text-white">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-bold leading-6 text-slate-300">
                    {phase.scope}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Next Decision
              </p>
              <h2 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                Approve pilot result, then choose Production Core Go-Live.
              </h2>
              <p className="mt-4 max-w-4xl text-sm font-bold leading-7 text-slate-200">
                This page now closes the client journey: G7 captured real client data, structured five Product Builds, prepared execution cards, surfaced live-measurement gaps, and created a clear path from pilot to rollout without promising an unfinished enterprise platform as a finished product.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/client-activation" className="rounded-full border border-amber-300/40 bg-amber-300/15 px-6 py-3 text-center text-sm font-black text-amber-50 transition hover:border-amber-200/70 hover:bg-amber-300/25">
                Activate Client Workspace
              </Link>
              <Link href="/production-tasks" className="rounded-full border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-3 text-center text-sm font-black text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]">
                View Production Tasks
              </Link>
              <Link href="/worker-task" className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-black text-white transition hover:border-white">
                View Worker Task
              </Link>
              <Link href="/pilot-onboarding" className="rounded-full border border-cyan-300/30 px-6 py-3 text-center text-sm font-black text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10">
                Back to Client Workspace
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

