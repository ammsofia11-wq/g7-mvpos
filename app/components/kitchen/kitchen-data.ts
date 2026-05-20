export type WorkerStatus = "BUSY" | "AVAILABLE" | "BREAK" | "OFFLINE"

export type WorkerAction =
  | "START_TASK"
  | "COLLECT_INGREDIENTS"
  | "START_COOKING"
  | "MARK_READY"
  | "SEND_STORAGE"
  | "PACKAGING_READY"
  | "TAKE_BREAK"
  | "BACK_ONLINE"

export type ProductionStageStatus =
  | "WAITING"
  | "READY"
  | "ACTIVE"
  | "COMPLETED"
  | "BLOCKED"

export type ProductionStageName =
  | "COLLECT"
  | "PREP"
  | "COOK"
  | "COOLING"
  | "QC"
  | "PLATING"
  | "PACKAGING"
  | "DISPATCH"

export type ProductionTeam =
  | "Preparation Team"
  | "Breakfast Team"
  | "Lunch & Dinner Team"
  | "Cold Section Team"
  | "Salads Team"
  | "Bakery Team"
  | "Pastry Section"
  | "Packaging Team"
  | "Cleaning Team"
  | "Food Safety"

export type StagePosition = {
  id: string
  name: string
  team: ProductionTeam
}

export type ProductionStage = {
  id: string
  name: ProductionStageName
  label: string
  team: ProductionTeam
  status: ProductionStageStatus
  estimatedMinutes: number
  startedAt?: string
  completedAt?: string
  positions: StagePosition[]
}

export type ProductionWorkflow = {
  id: string
  dishName: string
  category:
    | "HOT_MEAL"
    | "COLD_MEAL"
    | "SALAD"
    | "BAKERY"
    | "PASTRY"
    | "DIET_MEAL"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  portions: number
  progress: number
  currentStage: ProductionStageName
  status: "QUEUED" | "IN_PROGRESS" | "READY_FOR_QC" | "COMPLETED" | "ON_HOLD"
  stages: ProductionStage[]
}

export type KitchenWorker = {
  id: string
  name: string
  station: string
  status: WorkerStatus
  task: string
  progress: number
  speed: number
  accuracy: number
  completed: number
  lastAction?: string
  updatedAt?: string
}

export const WORKERS: KitchenWorker[] = [
  {
    id: "POS-030",
    name: "Hot Kitchen Team Lead",
    station: "Lunch & Dinner Team",
    status: "BUSY",
    task: "Rosemary Chicken Bowl",
    progress: 82,
    speed: 94,
    accuracy: 98,
    completed: 34,
    lastAction: "Cooking in progress",
    updatedAt: "Live",
  },
  {
    id: "POS-070",
    name: "Packaging Team Lead",
    station: "Packaging Team",
    status: "AVAILABLE",
    task: "Packaging Queue",
    progress: 46,
    speed: 88,
    accuracy: 95,
    completed: 27,
    lastAction: "Ready for next batch",
    updatedAt: "Live",
  },
  {
    id: "POS-002",
    name: "Food Safety Officer",
    station: "Food Safety",
    status: "BUSY",
    task: "QC Keto Salmon Meal",
    progress: 67,
    speed: 91,
    accuracy: 99,
    completed: 19,
    lastAction: "Quality check active",
    updatedAt: "Live",
  },
  {
    id: "POS-010",
    name: "Preparation Team Lead",
    station: "Preparation Team",
    status: "BREAK",
    task: "Ingredient Prep Queue",
    progress: 14,
    speed: 72,
    accuracy: 90,
    completed: 11,
    lastAction: "Position on break",
    updatedAt: "Live",
  },
]

export const PRODUCTION_WORKFLOWS: ProductionWorkflow[] = [
  {
    id: "WF-1001",
    dishName: "Rosemary Chicken Bowl",
    category: "HOT_MEAL",
    priority: "HIGH",
    portions: 180,
    progress: 45,
    currentStage: "COOK",
    status: "IN_PROGRESS",
    stages: [
      {
        id: "WF-1001-S1",
        name: "COLLECT",
        label: "Ingredient Collection",
        team: "Preparation Team",
        status: "COMPLETED",
        estimatedMinutes: 12,
        startedAt: "07:00",
        completedAt: "07:12",
        positions: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
            team: "Preparation Team",
          },
          {
            id: "POS-012",
            name: "Butchery Position",
            team: "Preparation Team",
          },
        ],
      },
      {
        id: "WF-1001-S2",
        name: "PREP",
        label: "Preparation",
        team: "Preparation Team",
        status: "COMPLETED",
        estimatedMinutes: 25,
        startedAt: "07:12",
        completedAt: "07:37",
        positions: [
          {
            id: "POS-013",
            name: "Preparation Position 1",
            team: "Preparation Team",
          },
          {
            id: "POS-014",
            name: "Preparation Position 2",
            team: "Preparation Team",
          },
        ],
      },
      {
        id: "WF-1001-S3",
        name: "COOK",
        label: "Hot Kitchen Cooking",
        team: "Lunch & Dinner Team",
        status: "ACTIVE",
        estimatedMinutes: 35,
        startedAt: "07:38",
        positions: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
            team: "Lunch & Dinner Team",
          },
          {
            id: "POS-031",
            name: "Hot Kitchen Cook Position 1",
            team: "Lunch & Dinner Team",
          },
          {
            id: "POS-032",
            name: "Hot Kitchen Cook Position 2",
            team: "Lunch & Dinner Team",
          },
        ],
      },
      {
        id: "WF-1001-S4",
        name: "COOLING",
        label: "Cooling / Holding",
        team: "Cold Section Team",
        status: "WAITING",
        estimatedMinutes: 15,
        positions: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
            team: "Cold Section Team",
          },
        ],
      },
      {
        id: "WF-1001-S5",
        name: "QC",
        label: "Food Safety QC",
        team: "Food Safety",
        status: "WAITING",
        estimatedMinutes: 8,
        positions: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
            team: "Food Safety",
          },
        ],
      },
      {
        id: "WF-1001-S6",
        name: "PACKAGING",
        label: "Packaging",
        team: "Packaging Team",
        status: "WAITING",
        estimatedMinutes: 18,
        positions: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
            team: "Packaging Team",
          },
          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
            team: "Packaging Team",
          },
        ],
      },
      {
        id: "WF-1001-S7",
        name: "DISPATCH",
        label: "Dispatch Ready",
        team: "Packaging Team",
        status: "WAITING",
        estimatedMinutes: 5,
        positions: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
            team: "Packaging Team",
          },
        ],
      },
    ],
  },
  {
    id: "WF-1002",
    dishName: "Keto Salmon Meal",
    category: "DIET_MEAL",
    priority: "URGENT",
    portions: 120,
    progress: 70,
    currentStage: "COOLING",
    status: "IN_PROGRESS",
    stages: [
      {
        id: "WF-1002-S1",
        name: "COLLECT",
        label: "Ingredient Collection",
        team: "Preparation Team",
        status: "COMPLETED",
        estimatedMinutes: 10,
        startedAt: "06:50",
        completedAt: "07:00",
        positions: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
            team: "Preparation Team",
          },
        ],
      },
      {
        id: "WF-1002-S2",
        name: "PREP",
        label: "Protein Preparation",
        team: "Preparation Team",
        status: "COMPLETED",
        estimatedMinutes: 18,
        startedAt: "07:00",
        completedAt: "07:18",
        positions: [
          {
            id: "POS-012",
            name: "Butchery Position",
            team: "Preparation Team",
          },
          {
            id: "POS-013",
            name: "Preparation Position 1",
            team: "Preparation Team",
          },
        ],
      },
      {
        id: "WF-1002-S3",
        name: "COOK",
        label: "Hot Kitchen Cooking",
        team: "Lunch & Dinner Team",
        status: "COMPLETED",
        estimatedMinutes: 28,
        startedAt: "07:18",
        completedAt: "07:46",
        positions: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
            team: "Lunch & Dinner Team",
          },
          {
            id: "POS-033",
            name: "Hot Kitchen Cook Position 3",
            team: "Lunch & Dinner Team",
          },
        ],
      },
      {
        id: "WF-1002-S4",
        name: "COOLING",
        label: "Cooling",
        team: "Cold Section Team",
        status: "ACTIVE",
        estimatedMinutes: 15,
        startedAt: "07:47",
        positions: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
            team: "Cold Section Team",
          },
          {
            id: "POS-041",
            name: "Cold Section Cook Position 1",
            team: "Cold Section Team",
          },
        ],
      },
      {
        id: "WF-1002-S5",
        name: "QC",
        label: "Diet QC",
        team: "Food Safety",
        status: "WAITING",
        estimatedMinutes: 8,
        positions: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
            team: "Food Safety",
          },
        ],
      },
      {
        id: "WF-1002-S6",
        name: "PACKAGING",
        label: "Packaging",
        team: "Packaging Team",
        status: "WAITING",
        estimatedMinutes: 15,
        positions: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
            team: "Packaging Team",
          },
          {
            id: "POS-072",
            name: "Packaging Operator Position 2",
            team: "Packaging Team",
          },
        ],
      },
    ],
  },
  {
    id: "WF-1003",
    dishName: "Greek Salad Performance Meal",
    category: "SALAD",
    priority: "MEDIUM",
    portions: 95,
    progress: 50,
    currentStage: "PLATING",
    status: "IN_PROGRESS",
    stages: [
      {
        id: "WF-1003-S1",
        name: "COLLECT",
        label: "Ingredient Collection",
        team: "Preparation Team",
        status: "COMPLETED",
        estimatedMinutes: 8,
        startedAt: "08:00",
        completedAt: "08:08",
        positions: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
            team: "Preparation Team",
          },
        ],
      },
      {
        id: "WF-1003-S2",
        name: "PREP",
        label: "Cold Prep",
        team: "Cold Section Team",
        status: "COMPLETED",
        estimatedMinutes: 18,
        startedAt: "08:08",
        completedAt: "08:26",
        positions: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
            team: "Cold Section Team",
          },
          {
            id: "POS-042",
            name: "Cold Section Cook Position 2",
            team: "Cold Section Team",
          },
        ],
      },
      {
        id: "WF-1003-S3",
        name: "PLATING",
        label: "Salad Assembly",
        team: "Salads Team",
        status: "ACTIVE",
        estimatedMinutes: 15,
        startedAt: "08:27",
        positions: [
          {
            id: "POS-050",
            name: "Salads Team Lead",
            team: "Salads Team",
          },
          {
            id: "POS-051",
            name: "Salad Production Position 1",
            team: "Salads Team",
          },
          {
            id: "POS-052",
            name: "Salad Production Position 2",
            team: "Salads Team",
          },
        ],
      },
      {
        id: "WF-1003-S4",
        name: "QC",
        label: "Cold Meal QC",
        team: "Food Safety",
        status: "WAITING",
        estimatedMinutes: 7,
        positions: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
            team: "Food Safety",
          },
        ],
      },
      {
        id: "WF-1003-S5",
        name: "PACKAGING",
        label: "Packaging",
        team: "Packaging Team",
        status: "WAITING",
        estimatedMinutes: 12,
        positions: [
          {
            id: "POS-073",
            name: "Packaging Operator Position 3",
            team: "Packaging Team",
          },
        ],
      },
    ],
  },
  {
    id: "WF-1004",
    dishName: "Pastry Protein Muffin",
    category: "PASTRY",
    priority: "LOW",
    portions: 90,
    progress: 40,
    currentStage: "COOK",
    status: "IN_PROGRESS",
    stages: [
      {
        id: "WF-1004-S1",
        name: "PREP",
        label: "Pastry Prep",
        team: "Pastry Section",
        status: "COMPLETED",
        estimatedMinutes: 25,
        startedAt: "08:00",
        completedAt: "08:25",
        positions: [
          {
            id: "POS-065",
            name: "Pastry Chef Lead",
            team: "Pastry Section",
          },
          {
            id: "POS-066",
            name: "Pastry Production Position 1",
            team: "Pastry Section",
          },
        ],
      },
      {
        id: "WF-1004-S2",
        name: "COOK",
        label: "Baking",
        team: "Bakery Team",
        status: "ACTIVE",
        estimatedMinutes: 30,
        startedAt: "08:26",
        positions: [
          {
            id: "POS-060",
            name: "Bakery Team Lead",
            team: "Bakery Team",
          },
          {
            id: "POS-061",
            name: "Bread Maker Position",
            team: "Bakery Team",
          },
          {
            id: "POS-067",
            name: "Pastry Production Position 2",
            team: "Pastry Section",
          },
        ],
      },
      {
        id: "WF-1004-S3",
        name: "QC",
        label: "Pastry QC",
        team: "Food Safety",
        status: "WAITING",
        estimatedMinutes: 6,
        positions: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
            team: "Food Safety",
          },
        ],
      },
      {
        id: "WF-1004-S4",
        name: "PACKAGING",
        label: "Packaging",
        team: "Packaging Team",
        status: "WAITING",
        estimatedMinutes: 10,
        positions: [
          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
            team: "Packaging Team",
          },
        ],
      },
    ],
  },
]