export const REAL_PILOT_STORAGE_KEY = "g7-real-pilot-core-v1";

export type RealPilotMode = "head-chef" | "inventory" | "worker";

export type PilotBatchStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DISPATCHED"
  | "IN_PROGRESS"
  | "READY_FOR_FINAL_QA"
  | "RELEASED";

export type PilotTaskStatus =
  | "LOCKED"
  | "READY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "HOLD"
  | "REWORK";

export type PilotTaskId =
  | "store_issue"
  | "butchery"
  | "prep_marinade"
  | "cook_chicken"
  | "cook_sauce"
  | "cook_rice"
  | "qa_modules"
  | "cooling"
  | "fridge_location"
  | "packaging"
  | "final_qa"
  | "head_chef_signoff";

export type PilotInventoryItemId =
  | "chicken_breast"
  | "basmati_rice"
  | "butter_chicken_sauce"
  | "box_28"
  | "labels";

export type PilotOutputValue = string | number | boolean;

export type PilotEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type PilotInventoryItem = {
  id: PilotInventoryItemId;
  name: string;
  plannedQty: number;
  unit: string;
  actualQty?: number;
  status: "PENDING" | "ISSUED" | "TROLLEY_READY";
  note?: string;
};

export type PilotOutputField = {
  key: string;
  label: string;
  type: "number" | "text";
  unit?: string;
  required?: boolean;
  placeholder?: string;
};

export type PilotTask = {
  id: PilotTaskId;
  order: number;
  title: string;
  role: string;
  station: string;
  module: string;
  status: PilotTaskStatus;
  dependsOn: PilotTaskId[];
  instructions: string[];
  outputs: Record<string, PilotOutputValue>;
  gateType?: "QA" | "COOLING" | "FINAL_QA" | "SIGN_OFF";
};

export type PilotProductSpec = {
  productName: string;
  productCode: string;
  batchId: string;
  meals: number;
  rawChickenPerMealG: number;
  rawChickenTotalKg: number;
  chickenCookingLossPercent: number;
  expectedCookedChickenPerMealG: number;
  expectedCookedChickenTotalKg: number;
  saucePerMealG: number;
  sauceBatchKg: number;
  cookedRicePerMealG: number;
  cookedRiceTargetKg: number;
  riceYieldCookedPerRawKg: number;
  rawRiceIssueKg: number;
  packaging: string;
  appearanceRule: string;
};

export type PilotState = {
  version: number;
  createdAt: string;
  updatedAt: string;
  product: PilotProductSpec;
  batch: {
    id: string;
    status: PilotBatchStatus;
    createdBy: string;
    activatedAt?: string;
    dispatchedAt?: string;
    releasedAt?: string;
  };
  inventory: PilotInventoryItem[];
  tasks: PilotTask[];
  events: PilotEvent[];
};

export const Q_DIET_BUTTER_CHICKEN_SPEC: PilotProductSpec = {
  productName: "Q Diet — Butter Chicken with Basmati Rice",
  productCode: "QD-BC",
  batchId: "QD-BC-100",
  meals: 100,
  rawChickenPerMealG: 150,
  rawChickenTotalKg: 15,
  chickenCookingLossPercent: 45,
  expectedCookedChickenPerMealG: 82.5,
  expectedCookedChickenTotalKg: 8.25,
  saucePerMealG: 80,
  sauceBatchKg: 8,
  cookedRicePerMealG: 120,
  cookedRiceTargetKg: 12,
  riceYieldCookedPerRawKg: 2.8,
  rawRiceIssueKg: 4.5,
  packaging: "2 compartment box size 28",
  appearanceRule: "No sauce pooling; sauce controlled on chicken.",
};

export const PILOT_OUTPUT_FIELDS: Record<PilotTaskId, PilotOutputField[]> = {
  store_issue: [
    {
      key: "actual_chicken_issue_kg",
      label: "Actual chicken issued",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "15",
    },
    {
      key: "actual_rice_issue_kg",
      label: "Actual raw basmati rice issued",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "4.5",
    },
    {
      key: "actual_boxes",
      label: "Boxes issued",
      type: "number",
      unit: "pcs",
      required: true,
      placeholder: "100",
    },
  ],
  butchery: [
    {
      key: "prepared_chicken_kg",
      label: "Prepared julienne chicken weight",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "15",
    },
    {
      key: "pan_label",
      label: "Pan label",
      type: "text",
      required: true,
      placeholder: "QD-BC-100 / Butchery / Chicken",
    },
  ],
  prep_marinade: [
    {
      key: "marinade_status",
      label: "Marinade status",
      type: "text",
      required: true,
      placeholder: "Tandoori marinade applied",
    },
    {
      key: "chilled_hold_temp_c",
      label: "Chilled hold temperature",
      type: "number",
      unit: "°C",
      required: true,
      placeholder: "4",
    },
  ],
  cook_chicken: [
    {
      key: "final_temp_c",
      label: "Chicken final core temperature",
      type: "number",
      unit: "°C",
      required: true,
      placeholder: "75",
    },
    {
      key: "cooked_chicken_kg",
      label: "Actual cooked chicken output",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "8.25",
    },
    {
      key: "photo_evidence",
      label: "Photo / evidence note",
      type: "text",
      required: true,
      placeholder: "Photo captured by cooking station",
    },
  ],
  cook_sauce: [
    {
      key: "sauce_final_kg",
      label: "Final sauce weight",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "8",
    },
  ],
  cook_rice: [
    {
      key: "cooked_rice_kg",
      label: "Cooked basmati rice output",
      type: "number",
      unit: "kg",
      required: true,
      placeholder: "12",
    },
  ],
  qa_modules: [
    {
      key: "qa_decision",
      label: "QA decision",
      type: "text",
      required: true,
      placeholder: "Approved / Hold / Rework",
    },
    {
      key: "qa_notes",
      label: "Taste, temp, texture notes",
      type: "text",
      required: true,
      placeholder: "Taste approved, texture controlled, temp safe",
    },
  ],
  cooling: [
    {
      key: "barcode_label",
      label: "Barcode / batch label",
      type: "text",
      required: true,
      placeholder: "QD-BC-100-COOLING",
    },
    {
      key: "entry_temp_c",
      label: "Cooling entry temperature",
      type: "number",
      unit: "°C",
      required: true,
      placeholder: "63",
    },
    {
      key: "exit_temp_c",
      label: "Cooling exit temperature",
      type: "number",
      unit: "°C",
      required: true,
      placeholder: "5",
    },
  ],
  fridge_location: [
    {
      key: "fridge_location",
      label: "Fridge / rack location",
      type: "text",
      required: true,
      placeholder: "Chiller 02 / Rack B / Shelf 3",
    },
  ],
  packaging: [
    {
      key: "packed_meals",
      label: "Packed meals",
      type: "number",
      unit: "meals",
      required: true,
      placeholder: "100",
    },
    {
      key: "rice_per_meal_g",
      label: "Rice per meal",
      type: "number",
      unit: "g",
      required: true,
      placeholder: "120",
    },
    {
      key: "chicken_per_meal_g",
      label: "Cooked chicken per meal",
      type: "number",
      unit: "g",
      required: true,
      placeholder: "82.5",
    },
    {
      key: "sauce_per_meal_g",
      label: "Sauce per meal",
      type: "number",
      unit: "g",
      required: true,
      placeholder: "80",
    },
  ],
  final_qa: [
    {
      key: "final_decision",
      label: "Final QA decision",
      type: "text",
      required: true,
      placeholder: "Released / Hold / Rework",
    },
    {
      key: "appearance_notes",
      label: "Appearance / label / weight notes",
      type: "text",
      required: true,
      placeholder: "No sauce pooling, label correct, weight approved",
    },
  ],
  head_chef_signoff: [
    {
      key: "signoff_name",
      label: "Head Chef sign-off",
      type: "text",
      required: true,
      placeholder: "Chef name / final sign-off",
    },
  ],
};

export function createInitialPilotState(): PilotState {
  const now = new Date().toISOString();

  return {
    version: 1,
    createdAt: now,
    updatedAt: now,
    product: Q_DIET_BUTTER_CHICKEN_SPEC,
    batch: {
      id: Q_DIET_BUTTER_CHICKEN_SPEC.batchId,
      status: "DRAFT",
      createdBy: "Head Chef",
    },
    inventory: [
      {
        id: "chicken_breast",
        name: "Chicken breast",
        plannedQty: 15,
        unit: "kg",
        status: "PENDING",
      },
      {
        id: "basmati_rice",
        name: "Raw basmati rice",
        plannedQty: 4.5,
        unit: "kg",
        status: "PENDING",
      },
      {
        id: "butter_chicken_sauce",
        name: "Butter chicken sauce target",
        plannedQty: 8,
        unit: "kg",
        status: "PENDING",
      },
      {
        id: "box_28",
        name: "2 compartment box size 28",
        plannedQty: 100,
        unit: "pcs",
        status: "PENDING",
      },
      {
        id: "labels",
        name: "Batch labels / barcode labels",
        plannedQty: 100,
        unit: "pcs",
        status: "PENDING",
      },
    ],
    tasks: createPilotTasks(),
    events: [
      {
        id: createId(),
        at: now,
        actor: "System",
        action: "Pilot workspace seeded",
        detail: "Q Diet Butter Chicken 100-meal pilot workspace is ready.",
      },
    ],
  };
}

export function createPilotTasks(): PilotTask[] {
  const task = (
    input: Omit<PilotTask, "outputs" | "status"> & {
      status?: PilotTaskStatus;
    },
  ): PilotTask => ({
    ...input,
    status: input.status ?? "LOCKED",
    outputs: {},
  });

  return [
    task({
      id: "store_issue",
      order: 1,
      title: "Issue ingredients and prepare trolley",
      role: "Storekeeper",
      station: "Inventory",
      module: "Store Issue",
      dependsOn: [],
      instructions: [
        "Issue 15kg chicken breast.",
        "Issue 4.5kg raw basmati rice.",
        "Prepare 100 boxes size 28 and batch labels.",
        "Confirm trolley ready before station work starts.",
      ],
    }),
    task({
      id: "butchery",
      order: 2,
      title: "Trim chicken breast and cut julienne",
      role: "Butchery",
      station: "Butchery",
      module: "Protein Module",
      dependsOn: ["store_issue"],
      instructions: [
        "Receive issued chicken breast.",
        "Trim and clean chicken breast.",
        "Cut julienne.",
        "Weigh 15kg prepared chicken.",
        "Label pan with batch ID.",
      ],
    }),
    task({
      id: "prep_marinade",
      order: 3,
      title: "Tandoori marinade and chilled hold",
      role: "Prep",
      station: "Prep",
      module: "Protein Module",
      dependsOn: ["butchery"],
      instructions: [
        "Receive julienne chicken from Butchery.",
        "Apply tandoori marinade.",
        "Label pan.",
        "Move to chilled hold.",
      ],
    }),
    task({
      id: "cook_chicken",
      order: 4,
      title: "Cook marinated chicken",
      role: "Cooking",
      station: "Hot Kitchen",
      module: "Protein Module",
      dependsOn: ["prep_marinade"],
      instructions: [
        "Cook marinated chicken.",
        "Record final core temperature.",
        "Capture photo evidence.",
        "Record final cooked chicken weight.",
      ],
    }),
    task({
      id: "cook_sauce",
      order: 5,
      title: "Cook butter chicken sauce",
      role: "Sauce Cook",
      station: "Sauce Station",
      module: "Sauce Module",
      dependsOn: ["store_issue"],
      instructions: [
        "Cook butter chicken sauce.",
        "Target final sauce weight is 8kg.",
        "Record final sauce weight.",
      ],
    }),
    task({
      id: "cook_rice",
      order: 6,
      title: "Cook basmati rice",
      role: "Rice Cook",
      station: "Rice Station",
      module: "Carb Module",
      dependsOn: ["store_issue"],
      instructions: [
        "Cook 4.5kg raw basmati rice.",
        "Target cooked rice output is 12kg.",
        "Record cooked output.",
      ],
    }),
    task({
      id: "qa_modules",
      order: 7,
      title: "QA gate for chicken, sauce, and rice",
      role: "QA",
      station: "QA Gate",
      module: "QA Module",
      dependsOn: ["cook_chicken", "cook_sauce", "cook_rice"],
      gateType: "QA",
      instructions: [
        "Taste chicken, sauce, and rice.",
        "Check temperature and texture.",
        "Approve, hold, or request rework.",
      ],
    }),
    task({
      id: "cooling",
      order: 8,
      title: "Cooling gate and batch label",
      role: "Cooling",
      station: "Cooling",
      module: "Cooling Gate",
      dependsOn: ["qa_modules"],
      gateType: "COOLING",
      instructions: [
        "Apply barcode / batch label.",
        "Record cooling entry temperature.",
        "Record cooling exit temperature.",
        "Do not move forward until cooling is complete.",
      ],
    }),
    task({
      id: "fridge_location",
      order: 9,
      title: "Assign fridge location",
      role: "Storekeeper",
      station: "Cold Storage",
      module: "Storage Module",
      dependsOn: ["cooling"],
      instructions: [
        "Assign fridge / rack / shelf location.",
        "Confirm batch can be called off for packaging.",
      ],
    }),
    task({
      id: "packaging",
      order: 10,
      title: "Portion, seal, and label meals",
      role: "Packaging",
      station: "Packaging",
      module: "Packaging Module",
      dependsOn: ["fridge_location"],
      instructions: [
        "Open standard photos.",
        "Portion 120g cooked rice.",
        "Portion cooked chicken and controlled sauce.",
        "No sauce pooling.",
        "Seal and label each meal.",
      ],
    }),
    task({
      id: "final_qa",
      order: 11,
      title: "Final QA release",
      role: "QA",
      station: "Final QA",
      module: "Final QA",
      dependsOn: ["packaging"],
      gateType: "FINAL_QA",
      instructions: [
        "Check appearance.",
        "Check weight.",
        "Check label.",
        "Release, hold, or request rework.",
      ],
    }),
    task({
      id: "head_chef_signoff",
      order: 12,
      title: "Pilot run final sign-off",
      role: "Head Chef",
      station: "Production Control",
      module: "Sign-Off",
      dependsOn: ["final_qa"],
      gateType: "SIGN_OFF",
      instructions: [
        "Review pilot run report.",
        "Confirm final release.",
        "Sign off the controlled pilot run.",
      ],
    }),
  ];
}

export function loadPilotState(): PilotState {
  if (typeof window === "undefined") {
    return createInitialPilotState();
  }

  const raw = window.localStorage.getItem(REAL_PILOT_STORAGE_KEY);

  if (!raw) {
    const initial = createInitialPilotState();
    savePilotState(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as PilotState;
    return refreshPilotState(parsed);
  } catch {
    const initial = createInitialPilotState();
    savePilotState(initial);
    return initial;
  }
}

export function savePilotState(state: PilotState): PilotState {
  const refreshed = refreshPilotState({
    ...state,
    updatedAt: new Date().toISOString(),
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      REAL_PILOT_STORAGE_KEY,
      JSON.stringify(refreshed),
    );
  }

  return refreshed;
}

export function resetPilotState(): PilotState {
  const initial = createInitialPilotState();
  savePilotState(initial);
  return initial;
}

export function activatePilotBatch(state: PilotState): PilotState {
  if (state.batch.status !== "DRAFT") {
    return state;
  }

  return savePilotState(
    addEvent(
      {
        ...state,
        batch: {
          ...state.batch,
          status: "ACTIVE",
          activatedAt: new Date().toISOString(),
        },
      },
      "Head Chef",
      "Batch activated",
      "QD-BC-100 activated for 100 meals.",
    ),
  );
}

export function masterDispatchPilot(state: PilotState): PilotState {
  if (state.batch.status !== "ACTIVE") {
    return state;
  }

  return savePilotState(
    addEvent(
      refreshPilotState({
        ...state,
        batch: {
          ...state.batch,
          status: "DISPATCHED",
          dispatchedAt: new Date().toISOString(),
        },
      }),
      "Head Chef",
      "Master dispatch released",
      "All role-based pilot tasks released once through the dependency graph.",
    ),
  );
}

export function updateInventoryItem(
  state: PilotState,
  itemId: PilotInventoryItemId,
  actualQty: number,
): PilotState {
  const inventory = state.inventory.map((item) =>
    item.id === itemId
      ? {
          ...item,
          actualQty,
          status: "ISSUED" as const,
        }
      : item,
  );

  return savePilotState(
    addEvent(
      {
        ...state,
        inventory,
      },
      "Storekeeper",
      "Inventory issued",
      `${itemId} issued with actual quantity ${actualQty}.`,
    ),
  );
}

export function markTrolleyReady(state: PilotState): PilotState {
  const inventory = state.inventory.map((item) => ({
    ...item,
    status: "TROLLEY_READY" as const,
    actualQty: item.actualQty ?? item.plannedQty,
  }));

  let next: PilotState = {
    ...state,
    inventory,
  };

  next = updateTaskOutput(
    next,
    "store_issue",
    "actual_chicken_issue_kg",
    getInventoryActual(next, "chicken_breast"),
  );

  next = updateTaskOutput(
    next,
    "store_issue",
    "actual_rice_issue_kg",
    getInventoryActual(next, "basmati_rice"),
  );

  next = updateTaskOutput(
    next,
    "store_issue",
    "actual_boxes",
    getInventoryActual(next, "box_28"),
  );

  next = completePilotTask(next, "store_issue", "Storekeeper", false);

  return savePilotState(
    addEvent(
      next,
      "Storekeeper",
      "Trolley ready",
      "Pilot issue trolley is ready for station execution.",
    ),
  );
}

export function startPilotTask(
  state: PilotState,
  taskId: PilotTaskId,
  actor = "Worker",
): PilotState {
  const task = getPilotTask(state, taskId);

  if (!task || task.status !== "READY") {
    return state;
  }

  return savePilotState(
    addEvent(
      {
        ...state,
        batch: {
          ...state.batch,
          status:
            state.batch.status === "DISPATCHED"
              ? "IN_PROGRESS"
              : state.batch.status,
        },
        tasks: state.tasks.map((item) =>
          item.id === taskId ? { ...item, status: "IN_PROGRESS" } : item,
        ),
      },
      actor,
      "Task started",
      task.title,
    ),
  );
}

export function updateTaskOutput(
  state: PilotState,
  taskId: PilotTaskId,
  key: string,
  value: PilotOutputValue,
): PilotState {
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            outputs: {
              ...task.outputs,
              [key]: value,
            },
          }
        : task,
    ),
  };
}

export function saveTaskOutput(
  state: PilotState,
  taskId: PilotTaskId,
  key: string,
  value: PilotOutputValue,
): PilotState {
  const task = getPilotTask(state, taskId);

  return savePilotState(
    addEvent(
      updateTaskOutput(state, taskId, key, value),
      task?.role ?? "Worker",
      "Output recorded",
      `${task?.title ?? taskId}: ${key} = ${String(value)}`,
    ),
  );
}

export function completePilotTask(
  state: PilotState,
  taskId: PilotTaskId,
  actor = "Worker",
  persist = true,
): PilotState {
  const task = getPilotTask(state, taskId);

  if (!task || task.status === "LOCKED") {
    return state;
  }

  if (!isTaskCompleteAllowed(task)) {
    return state;
  }

  const nextStatus: PilotBatchStatus =
    taskId === "head_chef_signoff"
      ? "RELEASED"
      : taskId === "final_qa"
        ? "READY_FOR_FINAL_QA"
        : state.batch.status;

  const next = addEvent(
    refreshPilotState({
      ...state,
      batch: {
        ...state.batch,
        status: nextStatus,
        releasedAt:
          taskId === "head_chef_signoff"
            ? new Date().toISOString()
            : state.batch.releasedAt,
      },
      tasks: state.tasks.map((item) =>
        item.id === taskId ? { ...item, status: "COMPLETED" } : item,
      ),
    }),
    actor,
    "Task completed",
    task.title,
  );

  return persist ? savePilotState(next) : next;
}

export function holdPilotTask(
  state: PilotState,
  taskId: PilotTaskId,
  actor = "QA",
): PilotState {
  const task = getPilotTask(state, taskId);

  if (!task || task.status === "LOCKED") {
    return state;
  }

  return savePilotState(
    addEvent(
      {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === taskId ? { ...item, status: "HOLD" } : item,
        ),
      },
      actor,
      "Task held",
      task.title,
    ),
  );
}

export function reopenPilotTask(
  state: PilotState,
  taskId: PilotTaskId,
  actor = "Head Chef",
): PilotState {
  const task = getPilotTask(state, taskId);

  if (!task || task.status === "LOCKED") {
    return state;
  }

  return savePilotState(
    addEvent(
      refreshPilotState({
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === taskId ? { ...item, status: "READY" } : item,
        ),
      }),
      actor,
      "Task reopened",
      task.title,
    ),
  );
}

export function refreshPilotState(state: PilotState): PilotState {
  const completed = new Set(
    state.tasks
      .filter((task) => task.status === "COMPLETED")
      .map((task) => task.id),
  );

  const canUnlock =
    state.batch.status === "DISPATCHED" ||
    state.batch.status === "IN_PROGRESS" ||
    state.batch.status === "READY_FOR_FINAL_QA" ||
    state.batch.status === "RELEASED";

  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (
        task.status === "COMPLETED" ||
        task.status === "IN_PROGRESS" ||
        task.status === "HOLD" ||
        task.status === "REWORK"
      ) {
        return task;
      }

      if (
        canUnlock &&
        task.dependsOn.every((dependency) => completed.has(dependency))
      ) {
        return {
          ...task,
          status: "READY",
        };
      }

      return {
        ...task,
        status: "LOCKED",
      };
    }),
  };
}

export function getPilotTask(
  state: PilotState,
  taskId: PilotTaskId,
): PilotTask | undefined {
  return state.tasks.find((task) => task.id === taskId);
}

export function getPilotProgress(state: PilotState): number {
  const completed = state.tasks.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  return Math.round((completed / state.tasks.length) * 100);
}

export function getPilotReport(state: PilotState) {
  const product = state.product;

  const actualChickenIssued = numberOutput(
    state,
    "store_issue",
    "actual_chicken_issue_kg",
  );

  const preparedChicken = numberOutput(
    state,
    "butchery",
    "prepared_chicken_kg",
  );

  const cookedChicken = numberOutput(
    state,
    "cook_chicken",
    "cooked_chicken_kg",
  );

  const sauceFinal = numberOutput(state, "cook_sauce", "sauce_final_kg");
  const cookedRice = numberOutput(state, "cook_rice", "cooked_rice_kg");
  const packedMeals = numberOutput(state, "packaging", "packed_meals");

  const safeRiceOutputFromIssue =
    product.rawRiceIssueKg * product.riceYieldCookedPerRawKg;

  return {
    progress: getPilotProgress(state),
    plannedMeals: product.meals,
    actualChickenIssued,
    preparedChicken,
    cookedChicken,
    expectedCookedChicken: product.expectedCookedChickenTotalKg,
    chickenVarianceKg:
      cookedChicken === null
        ? null
        : round(cookedChicken - product.expectedCookedChickenTotalKg),
    sauceFinal,
    sauceTarget: product.sauceBatchKg,
    sauceVarianceKg:
      sauceFinal === null ? null : round(sauceFinal - product.sauceBatchKg),
    cookedRice,
    cookedRiceTarget: product.cookedRiceTargetKg,
    safeRiceOutputFromIssue: round(safeRiceOutputFromIssue),
    riceVarianceKg:
      cookedRice === null
        ? null
        : round(cookedRice - product.cookedRiceTargetKg),
    packedMeals,
    packagingVariance:
      packedMeals === null ? null : packedMeals - product.meals,
    qaDecision: textOutput(state, "qa_modules", "qa_decision"),
    finalDecision: textOutput(state, "final_qa", "final_decision"),
    fridgeLocation: textOutput(state, "fridge_location", "fridge_location"),
  };
}

export function isTaskCompleteAllowed(task: PilotTask): boolean {
  const fields = PILOT_OUTPUT_FIELDS[task.id] ?? [];
  const requiredFields = fields.filter((field) => field.required);

  return requiredFields.every((field) => {
    const value = task.outputs[field.key];

    if (value === undefined || value === null) {
      return false;
    }

    return String(value).trim().length > 0;
  });
}

function numberOutput(
  state: PilotState,
  taskId: PilotTaskId,
  key: string,
): number | null {
  const value = getPilotTask(state, taskId)?.outputs[key];

  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function textOutput(
  state: PilotState,
  taskId: PilotTaskId,
  key: string,
): string | null {
  const value = getPilotTask(state, taskId)?.outputs[key];

  if (value === undefined || value === null || value === "") {
    return null;
  }

  return String(value);
}

function getInventoryActual(
  state: PilotState,
  itemId: PilotInventoryItemId,
): number {
  const item = state.inventory.find((entry) => entry.id === itemId);
  return item?.actualQty ?? item?.plannedQty ?? 0;
}

function addEvent(
  state: PilotState,
  actor: string,
  action: string,
  detail: string,
): PilotState {
  return {
    ...state,
    updatedAt: new Date().toISOString(),
    events: [
      {
        id: createId(),
        at: new Date().toISOString(),
        actor,
        action,
        detail,
      },
      ...state.events,
    ].slice(0, 40),
  };
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}