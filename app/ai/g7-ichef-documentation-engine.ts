export type IChefDocumentType =
  | "SOP"
  | "PRODUCTION_CARD"
  | "TRAINING_CARD"
  | "QUALITY_CHECKLIST"
  | "BATCH_REPORT"
  | "INCIDENT_LOG"

export type IChefDocumentStatus =
  | "DRAFT"
  | "READY_FOR_REVIEW"
  | "APPROVED"
  | "ARCHIVED"

export type IChefDocument = {
  id: string
  type: IChefDocumentType
  title: string
  linkedRecipe: string
  createdBy: string
  status: IChefDocumentStatus
  version: string
  lastUpdated: string
  summary: string
  sections: {
    title: string
    content: string[]
  }[]
}

export const ICHEF_DOCUMENTS: IChefDocument[] = [
  {
    id: "DOC-001",
    type: "SOP",
    title: "Chicken Shawarma Production SOP",
    linkedRecipe: "Chicken Shawarma",
    createdBy: "I-Chef Engine",
    status: "READY_FOR_REVIEW",
    version: "v1.0",
    lastUpdated: "Today",
    summary:
      "Standard operating procedure for batch preparation, cooking, holding, portioning and final quality approval.",
    sections: [
      {
        title: "Preparation",
        content: [
          "Check raw chicken temperature before preparation.",
          "Confirm marinade batch weight and seasoning balance.",
          "Prepare trays according to production quantity.",
        ],
      },
      {
        title: "Cooking",
        content: [
          "Cook until internal temperature reaches safe standard.",
          "Record cooking time and batch reference.",
          "Hold cooked product in approved hot holding conditions.",
        ],
      },
      {
        title: "Quality Check",
        content: [
          "Head Chef checks taste, texture and aroma.",
          "Verify portion size and presentation.",
          "Approve before storage or packaging.",
        ],
      },
    ],
  },
  {
    id: "DOC-002",
    type: "QUALITY_CHECKLIST",
    title: "Head Chef Batch Approval Checklist",
    linkedRecipe: "All Production Batches",
    createdBy: "Quality OS",
    status: "READY_FOR_REVIEW",
    version: "v1.0",
    lastUpdated: "Today",
    summary:
      "Quality checklist used before production batches are approved and released to storage or packaging.",
    sections: [
      {
        title: "Sensory Review",
        content: [
          "Taste profile matches approved recipe.",
          "Texture is correct for the product type.",
          "Aroma is clean and fresh.",
        ],
      },
      {
        title: "Operational Review",
        content: [
          "Batch quantity matches production plan.",
          "Portioning matches recipe standard.",
          "Storage label and timing are correct.",
        ],
      },
    ],
  },
  {
    id: "DOC-003",
    type: "TRAINING_CARD",
    title: "Kitchen Worker Shawarma Training Card",
    linkedRecipe: "Chicken Shawarma",
    createdBy: "Training OS",
    status: "DRAFT",
    version: "v0.1",
    lastUpdated: "Today",
    summary:
      "Simple worker-facing training document explaining key execution steps for consistent production.",
    sections: [
      {
        title: "Worker Instructions",
        content: [
          "Follow the assigned station task only.",
          "Do not change seasoning or portion size without chef approval.",
          "Update task status after each production stage.",
        ],
      },
    ],
  },
]

export function approveIChefDocument(documentId: string) {
  const document = ICHEF_DOCUMENTS.find((item) => item.id === documentId)

  if (!document) return null

  document.status = "APPROVED"
  document.lastUpdated = new Date().toLocaleString()

  return document
}

export function generateIChefDocumentFromApproval({
  title,
  recipe,
  createdBy,
}: {
  title: string
  recipe: string
  createdBy: string
}): IChefDocument {
  const newDocument: IChefDocument = {
    id: `DOC-${ICHEF_DOCUMENTS.length + 1}`.padStart(7, "0"),
    type: "SOP",
    title,
    linkedRecipe: recipe,
    createdBy,
    status: "READY_FOR_REVIEW",
    version: "v1.0",
    lastUpdated: new Date().toLocaleString(),
    summary:
      "Auto-generated I-Chef documentation created from an approved kitchen operation request.",
    sections: [
      {
        title: "Execution Standard",
        content: [
          "Follow approved recipe version.",
          "Confirm batch quantity before production.",
          "Record production timing and responsible worker.",
        ],
      },
      {
        title: "Quality Approval",
        content: [
          "Head Chef must approve taste, texture and portioning.",
          "Document any correction before release.",
          "Only approved batches can move to storage or packaging.",
        ],
      },
    ],
  }

  ICHEF_DOCUMENTS.unshift(newDocument)

  return newDocument
}