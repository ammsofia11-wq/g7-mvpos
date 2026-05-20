export type ApprovalDecision = "PENDING" | "APPROVED" | "REJECTED"

export type ApprovalType =
  | "RECIPE_UPDATE"
  | "PROCUREMENT"
  | "SOP_DOCUMENTATION"
  | "COST_CHANGE"
  | "STAFF_REQUEST"

export type ApprovalPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type ApprovalRequest = {
  id: string
  type: ApprovalType
  title: string
  requestedBy: string
  priority: ApprovalPriority
  status: ApprovalDecision
  aiRecommendation: string
  impact: string
}

export const APPROVAL_REQUESTS: ApprovalRequest[] = [
  {
    id: "REQ-001",
    type: "RECIPE_UPDATE",
    title: "Update Chicken Shawarma SOP",
    requestedBy: "Sous Chef",
    priority: "HIGH",
    status: "PENDING",
    aiRecommendation:
      "Approve after checking yield, seasoning balance, allergen notes, and production consistency.",
    impact:
      "Affects production SOP, staff training, recipe version history, and quality control.",
  },
  {
    id: "REQ-002",
    type: "PROCUREMENT",
    title: "Generate AI Procurement Sheet",
    requestedBy: "Kitchen OS",
    priority: "URGENT",
    status: "PENDING",
    aiRecommendation:
      "Approve only if stock gap, weekly usage, supplier price, and required order quantity are verified.",
    impact:
      "Affects purchasing, supplier planning, food cost, and next production cycle.",
  },
  {
    id: "REQ-003",
    type: "SOP_DOCUMENTATION",
    title: "Create I-Chef Batch Documentation",
    requestedBy: "I-Chef Engine",
    priority: "MEDIUM",
    status: "PENDING",
    aiRecommendation:
      "Approve documentation generation for training, audit trail, SOP control, and chef review.",
    impact:
      "Creates SOP, production card, quality checklist, batch notes, and staff training material.",
  },
]