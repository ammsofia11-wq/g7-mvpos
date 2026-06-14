# G7 Kitchen OS — Full Project Master Audit V2 Deep Review

## 0. Why this V2 exists

This file corrects and extends the previous audit.

The previous audit correctly described the Runtime Cockpit Phase 2 state, but it did not give enough weight to an older and very important part of the project: the real worker workflow system.

The project already contains several worker, production, stage, employee, workforce, and dish-flow layers. The correct conclusion is not: "we need to create worker workflow from zero." The correct conclusion is:

**Worker Workflow already exists in fragments. The next serious product step is to unify it into one Worker Workflow Engine and connect it to the Runtime Cockpit.**

---

## 1. Core product idea from the beginning

G7 Kitchen OS is not only a dashboard and not only a meal-plan system.

The deeper idea is a central kitchen operating system that understands:

- The recipe.
- The batch.
- The dish components.
- The production stages.
- The worker assigned to each movement.
- The station capacity.
- The chef approval flow.
- The QA/block/release flow.
- Packaging and dispatch readiness.
- Inventory and procurement pressure.
- Worker performance and delay reasons.

The product should eventually answer operational questions like:

- Who entered the kitchen today?
- Which station did each employee join?
- Which dish or component is each worker responsible for?
- Is one worker owning the whole dish, or are multiple workers sharing it?
- Which component is blocking the dish?
- Who handed the batch to the next stage?
- Did the Head Chef release it?
- Did packaging start at the right time?
- Which worker needed support?
- Which station creates repeated bottlenecks?

This is the difference between a normal kitchen dashboard and a real kitchen operating system.

---

## 2. Current global project map

The uploaded source contains these main groups:

| Area | Approx. files | Role |
|---|---:|---|
| `app/(app)` pages | 14 | Main app routes: dashboard, kitchen, workforce, approval, inventory, employees, staff, etc. |
| `app/ai` | 29 | AI/product engines, production stores, workforce stores, meal/grocery/plans logic. |
| `app/components/kitchen` | 35+ | Kitchen OS UI, runtime cockpit, worker board, production flow, timeline, workforce map. |
| `app/components/system/runtime` | 9+ | Separate global runtime system: batches, signals, mutations, workforce sync, action engine. |
| `app/components/g7` | 20+ | Gym/PDF/meal-plan product layer. Separate from Kitchen OS. |
| `app/data` | 7 | Meal/ingredient/production/yield data. |
| `lib` | 9 | Supabase, pricing, memory, billing, stores, orchestration. |
| `app/join`, `admin-generate`, `pdf-preview` | Several | Gym/PDF/Join funnel product. |

Important separation:

- **Kitchen OS** should remain separate from the **Gym/PDF/Join funnel**.
- The project currently has both systems in the same repo.
- That is okay, but documentation and folder boundaries must stay clear.

---

## 3. Page-by-page audit

### `/`

File: `app/page.tsx`

Role: Main landing page for the whole G7 umbrella.

Current message:

- G7 Culinary Intelligence.
- Chef-Based Nutrition OS.
- "اختار النظام اللي شبهك".
- Links to `/dashboard` and `/generate`.
- Mentions AI Chef, Weekly OS, Kitchen OS, Inventory OS.

Assessment:

- Good umbrella landing page.
- Not Kitchen OS-specific.
- Later, a separate Kitchen OS landing page may be needed if selling the kitchen system as a SaaS product.

---

### `/dashboard`

File: `app/(app)/dashboard/page.tsx`

Role: Main system overview.

Assessment:

- Should act as an owner/manager overview.
- Should not become a duplicate of `/kitchen`.
- Good place for global runtime risk, navigation, and account/profile level entry.

Risk:

- It may mix business/user dashboard with Kitchen OS runtime overview.

Recommendation:

- Keep it as the high-level command entry point.
- Runtime detail should live in `/kitchen`.

---

### `/kitchen`

File: `app/(app)/kitchen/page.tsx`

Role: Main Kitchen Runtime Cockpit.

Imports include:

- `WorkerBoard`
- `VoiceAssistant`
- `StaffTimeline`
- `ProductionFlow`
- `KitchenAlerts`
- `ApprovalQueue`
- `ApprovedProduction`
- `KitchenStats`
- `RuntimeFocusModes`
- `RuntimeCommandBar`
- `RealtimeRuntimeEngine`
- `RuntimeActionCenter`
- `RuntimeAlertsFeed`
- `RuntimeCockpitTabs`
- `RuntimeProvider`

Assessment:

This is the strongest page in the Kitchen OS product. It now contains both cockpit-level intelligence and early operator-level execution.

Current strengths:

- Runtime cockpit is visually strong.
- Live decisions are generated from runtime stages.
- Alerts are stage-specific.
- KitchenAlerts no longer uses static Butter Chicken/Marinara demo data.
- Operator Action Panel exists.
- Production/worker components from the older workflow still exist in the same page.

Current issue:

The page contains too many layers at once:

1. Runtime Cockpit.
2. Production Flow.
3. Worker Board.
4. Staff Timeline.
5. Approval Queue.
6. AI Alerts.
7. Operator Action Panel.
8. Intelligence tabs.

This is powerful, but it risks becoming too heavy for actual kitchen use.

Recommendation:

- Keep `/kitchen` as manager/head-chef cockpit.
- Create separate simplified worker/station screens later:
  - `/kitchen/operator`
  - `/kitchen/station/prep`
  - `/kitchen/station/hot-kitchen`
  - `/kitchen/station/qc`
  - `/kitchen/station/packaging`
  - `/kitchen/station/dispatch`

---

### `/workforce`

File: `app/(app)/workforce/page.tsx`

Role: Workforce operations layer.

Imports include:

- `AIRuntimeSupervisor`
- `AIKitchenOrchestrator`
- `ProductionTimeline`
- `WorkforceMap`
- `RuntimeEscalationFeed`
- `RuntimeWorkforcePressurePanel`
- System runtime functions.

Assessment:

This is not just a worker list. It already has runtime workforce pressure concepts and escalation support.

Current strength:

- Good place to connect support requests.
- WorkforceMap has station pressure logic.
- AIRuntimeSupervisor and AIKitchenOrchestrator attempt to sync runtime, production, and workforce.

Current gap:

- `Call Support` from `RuntimeActionCenter` does not yet create a real workforce request here.

Recommendation:

- This page should become the main destination for support movement:
  - Support requested from Packaging.
  - Worker available from Prep.
  - Sous Chef approves move.
  - WorkforceMap updates station coverage.

---

### `/approval`

File: `app/(app)/approval/page.tsx`

Role: Chef/QA approval and gate control.

Assessment:

The page should own:

- QA hold.
- Head Chef check.
- Batch release.
- Packaging release approval.
- Rejected/rework status.

Current gap:

- QC decisions from `/kitchen` do not yet create real approval events here.

Recommendation:

- Connect `ESCALATE_TO_HEAD_CHEF` and `RELEASE_NEXT_STAGE` to approval events.

---

### `/inventory`

File: `app/(app)/inventory/page.tsx`

Role: Inventory/procurement runtime.

Assessment:

Good for stock and procurement visibility.

Current gap:

- Inventory signals are not yet fully connected to production stage blockers.

Recommendation:

- `CHECK_INVENTORY` should create a storekeeper task.
- Production shortage should become either:
  - prep action,
  - procurement action,
  - or recipe substitution request.

---

### `/employees`

File: `app/(app)/employees/page.tsx`

Role: Existing employee runtime page.

This page is extremely important for Worker Workflow.

It imports:

- `RuntimeDish`
- `CENTRAL_KITCHEN_WORKFORCE`
- `calculateRuntimeProgress`
- `finishStage`
- `getEmployeeActiveStages`
- `startStage`
- workforce runtime store
- production runtime store
- production timeline store

This means the page already has the idea of:

- employee selection,
- employee active stages,
- starting a stage,
- finishing a stage,
- tracking timeline events,
- employee status,
- worker task load.

Assessment:

This page is one of the clearest proofs that Worker Workflow already exists in the project.

Current strength:

- It sees production through the employee.
- It can show what a worker is doing.
- It uses production runtime stores.

Current gap:

- It is not unified with the newer Runtime Cockpit action model.
- It uses the `app/ai` runtime-store layer, while `/kitchen` now uses `app/components/kitchen/runtime-context.tsx` and `runtime-store.ts`.

Recommendation:

- Do not delete this page.
- Treat it as the prototype for a future employee/operator screen.
- Merge its logic into the new unified Worker Workflow Engine.

---

### `/staff`

File: `app/(app)/staff/page.tsx`

Role: Older staff task execution page.

It uses `g7-production-engine.ts` and has a status flow:

- `ASSIGNED`
- `INGREDIENT_COLLECTION`
- `PREP_STARTED`
- `COOKING`
- `READY`
- `HEAD_CHEF_CHECK`
- `APPROVED`
- `STORED`
- `PACKAGING_READY`

Assessment:

This is another important older worker-flow prototype.

It captures a very practical movement from assigned task to ingredient collection to prep/cooking to chef check to storage/packaging.

Current strength:

- It resembles the exact "movement by movement" workflow the user described.
- It includes chef approval and storage/packaging readiness.

Current gap:

- It is built on a separate `g7-production-engine.ts` model.
- It is not connected to the newer Runtime Cockpit decision engine.

Recommendation:

- Do not ignore it.
- Use it as a source for the future Worker Task Lifecycle.

---

### `/recipe-studio`

File: `app/(app)/recipe-studio/page.tsx`

Role: Recipe design/documentation layer.

Assessment:

Should eventually feed Kitchen OS by defining:

- recipe components,
- SOPs,
- yields,
- QC points,
- packaging rules,
- stage templates.

Current gap:

- Not yet generating runtime tasks directly.

Recommendation:

- Connect recipes to `RuntimeDish` and `ProductionStage` later.

---

### `/ichef`

File: `app/(app)/ichef/page.tsx`

Role: AI Chef documentation/intelligence.

Assessment:

Good as chef guidance and recipe intelligence.

Recommendation:

- Keep separate from live worker runtime.
- Use it later to generate SOP help for worker screens.

---

### `/generate`, `/plans`, `/weekly`, `/admin-generate`, `/join`, `/pdf-preview`

Role: Gym/PDF/Join/nutrition product layer.

Assessment:

This is a separate product stream from Kitchen OS.

Recommendation:

- Keep it in the same repo for now if needed.
- Do not let these flows pollute Kitchen OS architecture.

---

## 4. Existing Worker Workflow System — the part that must not be missed

The project already contains a meaningful worker workflow system, but it is fragmented.

### 4.1 `kitchen-runtime-data.ts`

This is one of the most important files for the worker workflow.

It defines:

- `WorkerStatus`
- `ProductionStageType`
- `StageRuntimeStatus`
- `BatchRuntimeStatus`
- `StageWorker`
- `KitchenRuntimeWorker`
- `ProductionStage`
- `RuntimeDish`
- `KitchenRuntimeSummary`
- `DishRuntimeInsight`

Key production stages:

- `COLLECT`
- `PREP`
- `COOK`
- `COOLING`
- `STORAGE`
- `PLATING`
- `PACKAGING`
- `QC`
- `DISPATCH`

This is exactly the kind of structure needed for real kitchen workflow.

Most important model:

```ts
export type ProductionStage = {
  id: string
  stage: ProductionStageType
  status: StageRuntimeStatus
  startedAt?: string
  completedAt?: string
  workers: StageWorker[]
}
```

This means one stage can have multiple workers.

And:

```ts
export type RuntimeDish = {
  id: string
  recipe: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  batchStatus: BatchRuntimeStatus
  progress: number
  portions: number
  stages: ProductionStage[]
}
```

This means one dish can be broken into many stages, and every stage can have assigned workers.

This directly supports the user's real-world point:

- one employee can own a whole dish,
- multiple employees can share one dish,
- one employee can execute one component across many dishes.

Assessment:

This file is a core foundation for real worker workflow and should be protected.

---

### 4.2 `WorkerBoard.tsx`

This is the main existing UI for dish-stage-worker execution.

It contains logic for:

- `startProductionStage`
- `finishProductionStage`
- `assignWorkerToStage`
- `removeWorkerFromStage`
- stage status styling
- dish progress
- runtime stage mapping

Assessment:

This is a real worker distribution prototype.

It is not just visual. It can:

- assign workers,
- start stages,
- finish stages,
- show dish progress,
- show current stage.

Current gap:

- It uses local React state and dish data separately from the newer `RuntimeActionCenter` action panel.
- It needs to become connected to the same unified runtime event system.

Recommendation:

- This file should become the basis for a future `WorkerWorkflowBoard` or `DishExecutionBoard`.
- Do not rebuild from zero.

---

### 4.3 `app/ai/runtime-engine.ts`

This file contains worker/dish runtime functions:

- `calculateRuntimeProgress`
- `isEmployeeAssignedToStage`
- `assignEmployeeToStage`
- `removeEmployeeFromStage`
- `getEmployeeActiveStages`
- `getEmployeeRunningStages`
- `getEmployeeWaitingStages`
- `startStage`
- `finishStage`

Assessment:

This is another major proof that employee-stage workflow already exists.

It understands:

- employee assigned to stage,
- active stages,
- waiting stages,
- running stages,
- start/finish stage.

Current gap:

- It sits in `app/ai`, separate from the new `app/components/kitchen/runtime-store.ts`.

Recommendation:

- Its functions should be merged or wrapped into a unified Worker Workflow Engine.

---

### 4.4 `production-runtime-store.ts`

This file persists production runtime dishes in browser storage.

Functions:

- `getProductionRuntimeDishes`
- `saveProductionRuntimeDishes`
- `resetProductionRuntimeDishes`

Assessment:

This is local persistence for the older production workflow.

Current gap:

- Separate from newer `RuntimeProvider`.

Recommendation:

- Future system should have one source of truth.

---

### 4.5 `production-timeline-store.ts`

This file stores production timeline events.

It defines:

- `ProductionTimelineEvent`
- `getProductionTimelineEvents`
- `saveProductionTimelineEvents`
- `addProductionTimelineEvent`
- `resetProductionTimelineEvents`

Assessment:

This is the beginning of real action history.

This is very important because Phase 2B/2C needs a Runtime Event Log.

Recommendation:

- Do not create a brand-new event log without checking this file.
- Either reuse this concept or upgrade it into a unified `RuntimeEventLog`.

---

### 4.6 `workforce-runtime-store.ts`

This file stores worker runtime statuses.

It defines:

- `WorkforceStatus`
- `WorkforceRuntimeEmployee`
- default workforce runtime state,
- `getWorkforceRuntimeState`,
- `saveWorkforceRuntimeState`,
- `getEmployeeRuntimeStatus`,
- `updateEmployeeRuntimeStatus`,
- `resetWorkforceRuntimeState`.

Assessment:

This is the beginning of real worker availability state.

Current gap:

- Not connected directly to `Call Support` from the current Operator Action Panel.

Recommendation:

- Use it in Phase 2B/3 as the source for worker availability until a database exists.

---

### 4.7 `kitchen-workforce-data.ts`

This file defines central kitchen workforce structure.

It includes:

- workforce sections,
- employees,
- roles,
- stations,
- shifts,
- capacity,
- station worker lists.

Sections include:

- Leadership
- Quality Control
- Production
- Packaging
- Cleaning
- Support

Assessment:

This is important for real staff distribution.

Recommendation:

- Use it to map worker workflow from clock-in to station assignment.
- Add missing states later: clocked in, uniform checked, hygiene checked, station accepted, task started, task completed.

---

## 5. The older Staff Flow that matches the user's operational idea

The `/staff` page and `g7-production-engine.ts` include a very practical task lifecycle.

### Existing status flow

- `ASSIGNED`
- `INGREDIENT_COLLECTION`
- `PREP_STARTED`
- `COOKING`
- `READY`
- `HEAD_CHEF_CHECK`
- `APPROVED`
- `STORED`
- `PACKAGING_READY`

This is very close to the user's described worker movement:

1. Worker receives task.
2. Collect ingredients.
3. Start preparation.
4. Start cooking.
5. Mark ready.
6. Send to Head Chef check.
7. Approve.
8. Store.
9. Prepare packaging.

Assessment:

This should not be abandoned.

Recommendation:

Use it as the initial Worker Task Lifecycle vocabulary.

Potential upgraded lifecycle:

- `CLOCKED_IN`
- `HYGIENE_CHECKED`
- `BRIEFED`
- `STATION_ASSIGNED`
- `TASK_ASSIGNED`
- `INGREDIENT_COLLECTION`
- `PREP_STARTED`
- `COOKING_STARTED`
- `COOLING_STARTED`
- `QC_WAITING`
- `HEAD_CHEF_CHECK`
- `APPROVED`
- `STORED`
- `PACKAGING_READY`
- `PACKAGING_STARTED`
- `DISPATCH_READY`
- `CLEAN_DOWN`
- `CLOCKED_OUT`

---

## 6. Multi-worker dish execution model already exists

The project already supports this concept at the data-model level.

Because every `RuntimeDish` contains `stages`, and every `ProductionStage` contains `workers`, the system can support:

### Scenario A — One worker owns full dish

Example:

- Worker A collects ingredients.
- Worker A preps.
- Worker A cooks.
- Worker A moves to cooling/storage.

This can be represented by assigning the same worker to multiple stages.

### Scenario B — Multiple workers share one dish

Example:

- Worker A collects ingredients.
- Worker B preps chicken.
- Worker C cooks sauce.
- Worker D handles plating.
- Worker E packages.

This can be represented by assigning different workers to different stages.

### Scenario C — One worker owns one component across many dishes

Example:

- Sauce worker prepares Piri Piri sauce for several dishes.
- Carb worker cooks basmati rice for several dishes.
- Packaging worker packages all approved batches.

This requires an additional layer not fully implemented yet:

**Component-level tasks.**

Current project supports dish stages, but it does not yet fully model reusable components across multiple dishes.

Recommended future type:

```ts
type ProductionComponent = {
  id: string
  name: string
  componentType: "PROTEIN" | "CARB" | "SAUCE" | "VEG" | "PACKAGING"
  usedByDishIds: string[]
  assignedWorkers: StageWorker[]
  status: RuntimeStatus
}
```

---

## 7. The biggest architecture issue

The project has multiple runtime systems working beside each other.

### Runtime system A — New Kitchen Cockpit runtime

Files:

- `app/components/kitchen/runtime-context.tsx`
- `app/components/kitchen/runtime-store.ts`
- `app/components/kitchen/runtime-engine-data.ts`
- `RuntimeActionCenter.tsx`
- `RuntimeAlertsFeed.tsx`
- `RuntimeCockpitTabs.tsx`

Purpose:

- Live stage risk.
- AI decisions.
- Cockpit alerts.
- Operator Action Panel.

### Runtime system B — Dish/worker production runtime

Files:

- `kitchen-runtime-data.ts`
- `WorkerBoard.tsx`
- `ProductionFlow.tsx`
- `ProductionTimeline.tsx`
- `StaffTimeline.tsx`
- `app/ai/runtime-engine.ts`
- `production-runtime-store.ts`
- `production-timeline-store.ts`
- `workforce-runtime-store.ts`

Purpose:

- Runtime dishes.
- Production stages.
- Worker assignment.
- Start/finish stages.
- Employee active tasks.
- Production timeline.

### Runtime system C — Global/system runtime

Files:

- `app/components/system/runtime/runtime-types.ts`
- `runtime-store.ts`
- `runtime-actions.ts`
- `runtime-mutations.ts`
- `runtime-action-engine.ts`
- `runtime-workforce-sync.ts`
- `runtime-workforce-pressure.ts`
- `RuntimeEscalationFeed.tsx`
- `RuntimeWorkforcePressurePanel.tsx`

Purpose:

- Global runtime batches.
- System-level signals.
- Mutations.
- Workforce escalation.
- Cross-system risk.

### Runtime system D — Old staff production engine

Files:

- `g7-production-engine.ts`
- `/staff/page.tsx`

Purpose:

- ProductionTask lifecycle.
- Head Chef check.
- Approved tasks.
- Urgent production tasks.

### Risk

These systems overlap.

If development continues without unification, the project may end up with:

- one button changing `RuntimeProvider`,
- another changing `production-runtime-store`,
- another changing global system runtime,
- and `/staff` changing `g7-production-engine`.

That would create confusing product behavior.

### Decision

Before adding more features, create a unified runtime event model.

---

## 8. Recommended unified architecture

The future should be:

### One event language

Every operational action should become a `KitchenRuntimeEvent`.

```ts
type KitchenRuntimeEvent = {
  id: string
  type:
    | "CLOCK_IN"
    | "HYGIENE_CHECK"
    | "STATION_ASSIGNED"
    | "TASK_ASSIGNED"
    | "STAGE_STARTED"
    | "STAGE_COMPLETED"
    | "SUPPORT_REQUESTED"
    | "SUPPORT_ASSIGNED"
    | "QC_REQUESTED"
    | "CHEF_APPROVED"
    | "BATCH_HELD"
    | "BATCH_RELEASED"
    | "PACKAGING_STARTED"
    | "DISPATCH_READY"
    | "CLOCK_OUT"
  employeeId?: string
  employeeName?: string
  dishId?: string
  stageId?: string
  stationId?: string
  componentId?: string
  createdAt: string
  note?: string
}
```

### One runtime source of truth

All pages should read from one coherent runtime model:

- Cockpit.
- Worker board.
- Employees page.
- Workforce page.
- Approval page.
- Inventory page.
- Staff/operator page.

### One action flow

Example:

1. `/kitchen` shows Packaging pressure.
2. Operator clicks `Call Support`.
3. Event created: `SUPPORT_REQUESTED`.
4. `/workforce` shows support request.
5. Supervisor assigns worker.
6. Event created: `SUPPORT_ASSIGNED`.
7. Worker screen updates.
8. Runtime Cockpit pressure reduces if output improves.

---

## 9. Worker journey from entry to exit — target model

This is the model the project should move toward.

### Entry phase

- Employee clocks in.
- Uniform check.
- Hygiene check.
- Hand wash confirmed.
- Supervisor confirms readiness.
- Employee becomes available.

### Briefing phase

- Daily production plan reviewed.
- Station pressure reviewed.
- Worker receives station assignment.
- Worker receives tasks or dish components.

### Execution phase

- Ingredient collection.
- Prep.
- Cooking.
- Cooling.
- Storage.
- Plating.
- Packaging.
- QC.
- Dispatch.

### Handoff phase

Every handoff should record:

- from employee,
- to employee or station,
- dish/component,
- quantity,
- time,
- issue or clean handoff.

### End phase

- Task completion.
- Clean down.
- Supervisor check.
- Clock out.
- Worker performance summary.

---

## 10. File-by-file kitchen runtime classification

### Keep and strengthen

- `kitchen-runtime-data.ts` — dish/stage/worker foundation.
- `WorkerBoard.tsx` — worker assignment and stage action prototype.
- `runtime-engine-data.ts` — cockpit decision engine.
- `RuntimeActionCenter.tsx` — bridge from AI decision to operator action.
- `RuntimeAlertsFeed.tsx` — runtime alert stream.
- `KitchenAlerts.tsx` — live side alerts.
- `ProductionTimeline.tsx` — production history/flow visualization.
- `StaffTimeline.tsx` — staff synchronization view.
- `WorkforceMap.tsx` — station pressure and worker availability.
- `kitchen-workforce-data.ts` — role/station/employee base.
- `app/ai/runtime-engine.ts` — employee-stage assignment logic.
- `production-timeline-store.ts` — early event log concept.
- `workforce-runtime-store.ts` — worker status persistence.

### Use carefully / merge later

- `g7-production-engine.ts` — useful old staff flow but separate model.
- `/staff/page.tsx` — practical but old execution flow.
- `app/components/system/runtime/*` — powerful global runtime but overlaps with kitchen runtime.
- `production-runtime-store.ts` — useful but needs merging with RuntimeProvider.

### Keep separate from Kitchen OS

- `app/components/g7/*`
- `app/join/*`
- `admin-generate`
- `pdf-preview`
- `weekly`, `plans`, `generate`

These belong to the Gym/PDF/Nutrition funnel.

---

## 11. Correct next roadmap after this V2 audit

### Step 1 — Create Worker Workflow Existing System Audit

This V2 file can act as that audit, but a shorter focused file can also be created:

`G7_KITCHEN_OS_WORKER_WORKFLOW_EXISTING_SYSTEM_AUDIT.md`

Purpose:

- Protect the old worker workflow work.
- Document what already exists.
- Prevent rebuilding from zero.

### Step 2 — Create unified event types

Add a new file later:

`app/components/kitchen/kitchen-runtime-events.ts`

Purpose:

- One event language for all actions.

### Step 3 — Upgrade `runtime-context.tsx`

Add functions:

- `markStageReady(stageId)`
- `callStageSupport(stageId)`
- `escalateStage(stageId)`
- `holdStage(stageId)`
- `addRuntimeEvent(event)`

### Step 4 — Connect `RuntimeActionCenter.tsx`

Buttons should create events instead of only local UI state.

### Step 5 — Connect Workforce

`Call Support` should surface inside `/workforce`.

### Step 6 — Connect Approval

QC and Chef release should surface inside `/approval`.

### Step 7 — Build simplified operator page

Do not overload `/kitchen` for workers.

Create:

- `/kitchen/operator`

or station screens:

- `/kitchen/station/prep`
- `/kitchen/station/hot-kitchen`
- `/kitchen/station/qc`
- `/kitchen/station/packaging`

---

## 12. Final judgment

The user was correct.

A full project audit must not only evaluate the latest Runtime Cockpit. It must include the older worker workflow, production task, employee runtime, staff flow, and dish-stage-worker systems.

The correct current product diagnosis is:

**G7 Kitchen OS has a strong Runtime Cockpit and a partially built Worker Workflow system. The Worker Workflow is not missing; it is fragmented. The next product step is unification.**

Current real maturity:

- Runtime Cockpit: 70–75%
- Worker Workflow concept: 70%
- Worker Workflow implementation: 45–55%
- Unified runtime architecture: 30%
- Real event persistence: 25%
- Database-backed MVP: 10–20%

Main next move:

**Stop adding new UI until the existing worker workflow layers are unified into one runtime event system.**

