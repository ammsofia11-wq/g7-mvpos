export type WorkerStatus = "BUSY" | "AVAILABLE" | "BREAK" | "OFFLINE"

export type ProductionStageType =
  | "COLLECT"
  | "PREP"
  | "COOK"
  | "COOLING"
  | "STORAGE"
  | "PLATING"
  | "PACKAGING"
  | "QC"

export type StageRuntimeStatus = "WAITING" | "ACTIVE" | "COMPLETED"

export type BatchRuntimeStatus =
  | "IN_PROGRESS"
  | "READY_FOR_QC"
  | "COMPLETED"
  | "ON_HOLD"

export type StageWorker = {
  id: string
  name: string
}

export type KitchenRuntimeWorker = StageWorker & {
  status: WorkerStatus
  station: string
  runtimeRole:
    | "CHEF"
    | "PREP"
    | "QC"
    | "PACKAGING"
    | "STORAGE"
    | "LEADERSHIP"
}

export type ProductionStage = {
  id: string
  stage: ProductionStageType
  status: StageRuntimeStatus
  startedAt?: string
  completedAt?: string
  workers: StageWorker[]
}

export type RuntimeDish = {
  id: string
  recipe: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  batchStatus: BatchRuntimeStatus
  progress: number
  portions: number
  stages: ProductionStage[]
}

export const RUNTIME_WORKERS: KitchenRuntimeWorker[] = [
  {
    id: "POS-001",
    name: "Culinary Operations Director",
    status: "AVAILABLE",
    station: "Executive Leadership",
    runtimeRole: "LEADERSHIP",
  },

  {
    id: "POS-002",
    name: "Food Safety Officer",
    status: "AVAILABLE",
    station: "Food Safety",
    runtimeRole: "QC",
  },

  {
    id: "POS-010",
    name: "Preparation Team Lead",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },

  {
    id: "POS-011",
    name: "Vegetable Preparation Position",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },

  {
    id: "POS-012",
    name: "Butchery Position",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },

  {
    id: "POS-013",
    name: "Preparation Position 1",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },

  {
    id: "POS-014",
    name: "Preparation Position 2",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },

  {
    id: "POS-020",
    name: "Breakfast Team Lead",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-021",
    name: "Breakfast Cook Position 1",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-022",
    name: "Breakfast Cook Position 2",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-030",
    name: "Hot Kitchen Team Lead",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-031",
    name: "Hot Kitchen Cook Position 1",
    status: "BUSY",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-032",
    name: "Hot Kitchen Cook Position 2",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-033",
    name: "Hot Kitchen Cook Position 3",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-040",
    name: "Cold Section Lead",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-041",
    name: "Cold Section Cook Position 1",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-042",
    name: "Cold Section Cook Position 2",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-043",
    name: "Cold Section Cook Position 3",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-050",
    name: "Salads Team Lead",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-051",
    name: "Salad Production Position 1",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-052",
    name: "Salad Production Position 2",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-053",
    name: "Salad Production Position 3",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-060",
    name: "Bakery Team Lead",
    status: "AVAILABLE",
    station: "Bakery Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-061",
    name: "Bread Maker Position",
    status: "AVAILABLE",
    station: "Bakery Team",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-065",
    name: "Pastry Chef Lead",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-066",
    name: "Pastry Production Position 1",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-067",
    name: "Pastry Production Position 2",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },

  {
    id: "POS-070",
    name: "Packaging Team Lead",
    status: "BUSY",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },

  {
    id: "POS-071",
    name: "Packaging Operator Position 1",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },

  {
    id: "POS-072",
    name: "Packaging Operator Position 2",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },

  {
    id: "POS-073",
    name: "Packaging Operator Position 3",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },

  {
    id: "POS-090",
    name: "Cleaning Team Lead",
    status: "AVAILABLE",
    station: "Cleaning Team",
    runtimeRole: "QC",
  },

  {
    id: "POS-091",
    name: "Cleaning Operator Position 1",
    status: "AVAILABLE",
    station: "Cleaning Team",
    runtimeRole: "QC",
  },
]

export const RUNTIME_DISHES: RuntimeDish[] = [
  {
    id: "D-1001",
    recipe: "Rosemary Chicken Bowl",
    priority: "HIGH",
    batchStatus: "IN_PROGRESS",
    progress: 58,
    portions: 180,

    stages: [
      {
        id: "S-1",
        stage: "COLLECT",
        status: "COMPLETED",
        startedAt: "07:00",
        completedAt: "07:12",

        workers: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
          },

          {
            id: "POS-012",
            name: "Butchery Position",
          },
        ],
      },

      {
        id: "S-2",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "07:12",
        completedAt: "07:35",

        workers: [
          {
            id: "POS-013",
            name: "Preparation Position 1",
          },

          {
            id: "POS-014",
            name: "Preparation Position 2",
          },
        ],
      },

      {
        id: "S-3",
        stage: "COOK",
        status: "ACTIVE",
        startedAt: "07:36",

        workers: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
          },

          {
            id: "POS-031",
            name: "Hot Kitchen Cook Position 1",
          },

          {
            id: "POS-032",
            name: "Hot Kitchen Cook Position 2",
          },
        ],
      },

      {
        id: "S-4",
        stage: "COOLING",
        status: "WAITING",

        workers: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
          },
        ],
      },

      {
        id: "S-5",
        stage: "QC",
        status: "WAITING",

        workers: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
          },
        ],
      },

      {
        id: "S-6",
        stage: "PLATING",
        status: "WAITING",

        workers: [
          {
            id: "POS-050",
            name: "Salads Team Lead",
          },

          {
            id: "POS-051",
            name: "Salad Production Position 1",
          },
        ],
      },

      {
        id: "S-7",
        stage: "PACKAGING",
        status: "WAITING",

        workers: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
          },

          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
          },

          {
            id: "POS-072",
            name: "Packaging Operator Position 2",
          },
        ],
      },
    ],
  },

  {
    id: "D-1002",
    recipe: "Keto Salmon Meal",
    priority: "URGENT",
    batchStatus: "IN_PROGRESS",
    progress: 82,
    portions: 120,

    stages: [
      {
        id: "S-8",
        stage: "COLLECT",
        status: "COMPLETED",
        startedAt: "06:50",
        completedAt: "07:02",

        workers: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
          },
        ],
      },

      {
        id: "S-9",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "07:02",
        completedAt: "07:20",

        workers: [
          {
            id: "POS-012",
            name: "Butchery Position",
          },

          {
            id: "POS-013",
            name: "Preparation Position 1",
          },
        ],
      },

      {
        id: "S-10",
        stage: "COOK",
        status: "COMPLETED",
        startedAt: "07:20",
        completedAt: "07:48",

        workers: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
          },

          {
            id: "POS-031",
            name: "Hot Kitchen Cook Position 1",
          },
        ],
      },

      {
        id: "S-11",
        stage: "COOLING",
        status: "ACTIVE",
        startedAt: "07:49",

        workers: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
          },

          {
            id: "POS-041",
            name: "Cold Section Cook Position 1",
          },
        ],
      },

      {
        id: "S-12",
        stage: "QC",
        status: "WAITING",

        workers: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
          },
        ],
      },

      {
        id: "S-13",
        stage: "PLATING",
        status: "WAITING",

        workers: [
          {
            id: "POS-050",
            name: "Salads Team Lead",
          },

          {
            id: "POS-052",
            name: "Salad Production Position 2",
          },
        ],
      },

      {
        id: "S-14",
        stage: "PACKAGING",
        status: "WAITING",

        workers: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
          },

          {
            id: "POS-073",
            name: "Packaging Operator Position 3",
          },
        ],
      },
    ],
  },

  {
    id: "D-1003",
    recipe: "Pastry Protein Muffin",
    priority: "MEDIUM",
    batchStatus: "IN_PROGRESS",
    progress: 44,
    portions: 90,

    stages: [
      {
        id: "S-15",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "08:00",
        completedAt: "08:20",

        workers: [
          {
            id: "POS-065",
            name: "Pastry Chef Lead",
          },

          {
            id: "POS-066",
            name: "Pastry Production Position 1",
          },
        ],
      },

      {
        id: "S-16",
        stage: "COOK",
        status: "ACTIVE",
        startedAt: "08:21",

        workers: [
          {
            id: "POS-060",
            name: "Bakery Team Lead",
          },

          {
            id: "POS-061",
            name: "Bread Maker Position",
          },

          {
            id: "POS-067",
            name: "Pastry Production Position 2",
          },
        ],
      },

      {
        id: "S-17",
        stage: "PACKAGING",
        status: "WAITING",

        workers: [
          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
          },
        ],
      },
    ],
  },
]