# G7 Kitchen OS — Full Project Master Audit

**Scope:** full source snapshot supplied as zip. Reviewed root project structure, routes, Kitchen OS pages, runtime engines, state stores, data layers, API routes, global UI, and current Phase 2 audit.

**Snapshot size:** 199 text files reviewed. Largest files include `app/data/g7-master-ingredients.ts` (15099 lines), `app/components/g7/PdfBooklet.tsx` (5376 lines), `app/components/kitchen/kitchen-runtime-data.ts` (1026 lines), `runtime-engine-data.ts` (675 lines), and the main dashboard/inventory/kitchen pages.

## Executive Judgment

The project is no longer just a nutrition PDF app. It now contains two large product layers under one G7 umbrella: **G7 Nutrition/PDF/Join funnel** and **G7 Kitchen OS**. The Kitchen OS layer is an advanced operational prototype: it has a runtime cockpit, staged production logic, dish-stage data, workforce maps, approval/runtime signals, localStorage-based runtime stores, and the first Operator Action Panel. It is not yet a production MVP because actions are not unified into one persistent event model and backend/database storage is not yet wired into the Kitchen runtime.

**Current Kitchen OS maturity:** visual/product concept 85%, runtime cockpit 70%, runtime decision engine 65%, operator workflow 35–40%, cross-page workflow integration 30%, backend persistence 10–20%.

## Product History / Original Idea Reconstruction

The Kitchen OS idea started from central-kitchen reality: not “make a dashboard,” but make a system that understands the exact movements of chefs, prep teams, QC, packaging, dispatch, storekeepers, purchasing, and approval. The intended product is a Chef-Based Central Kitchen Runtime OS: recipe/SOP -> batch production -> stage runtime -> worker action -> approval/QA -> packaging/dispatch -> inventory/workforce feedback.

The current source still carries this history: nutrition/PDF components remain under `app/components/g7` and `app/ai`, while the Kitchen OS runtime has grown under `app/components/kitchen` plus `app/components/system/runtime`. This is good for product memory, but it creates architecture duplication that must be cleaned before a real MVP.

## Project Map

- **app/(app) pages** — 14 file(s)
- **app/admin-generate** — 1 file(s)
- **app/ai engines** — 29 file(s)
- **app/api** — 7 file(s)
- **app/components/ApprovalCard.tsx** — 1 file(s)
- **app/components/Button.tsx** — 1 file(s)
- **app/components/FlavorSelector.tsx** — 1 file(s)
- **app/components/IChefDocumentViewer.tsx** — 1 file(s)
- **app/components/KitchenExecutionPanel.tsx** — 1 file(s)
- **app/components/MealCard.tsx** — 1 file(s)
- **app/components/WeeklyPlan.tsx** — 1 file(s)
- **app/components/g7** — 23 file(s)
- **app/components/kitchen** — 40 file(s)
- **app/components/recipe-cards** — 5 file(s)
- **app/components/system** — 17 file(s)
- **app/components/ui** — 2 file(s)
- **app/data** — 7 file(s)
- **app/design** — 1 file(s)
- **app/globals.css** — 1 file(s)
- **app/goal** — 1 file(s)
- **app/history** — 1 file(s)
- **app/join** — 4 file(s)
- **app/layout.tsx** — 1 file(s)
- **app/login** — 1 file(s)
- **app/page.tsx** — 1 file(s)
- **app/pdf-preview** — 1 file(s)
- **app/ui** — 5 file(s)
- **lib** — 9 file(s)
- **public** — 5 file(s)
- **root/config/docs** — 16 file(s)

## Route Audit

| Route | File | Lines | Role / Evaluation |
|---|---|---:|---|
| `/` | `app/page.tsx` | 149 | Umbrella G7 landing page: nutrition + AI Chef + Kitchen OS entry. |
| `/admin-generate` | `app/admin-generate/page.tsx` | 512 | Admin PDF generation page for G7 plans. |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | 653 | Account/system overview; mixes client profile, plan cards, Supabase profile, navigation. |
| `/employees` | `app/(app)/employees/page.tsx` | 462 | Employee-specific worker runtime screen via employeeId; stage start/finish flow. |
| `/generate` | `app/(app)/generate/page.tsx` | 3 | Re-export/shortcut to root generate module or placeholder. |
| `/goal` | `app/goal/page.tsx` | 162 | Goal selection funnel. |
| `/history` | `app/history/page.tsx` | 55 | Supabase meal history view. |
| `/ichef` | `app/(app)/ichef/page.tsx` | 399 | Recipe intelligence/documentation workspace; formula and chef assistant layer. |
| `/inventory` | `app/(app)/inventory/page.tsx` | 648 | Inventory/procurement runtime; supplier/stock/order pressure. |
| `/join` | `app/join/page.tsx` | 1192 | Customer join/QR sales funnel and coach number engine. |
| `/kitchen` | `app/(app)/kitchen/page.tsx` | 354 | Main Kitchen OS runtime cockpit; sections for overview/runtime/alerts/workforce/production/assistant. |
| `/login` | `app/login/page.tsx` | 219 | Supabase auth UI. |
| `/pdf-preview` | `app/pdf-preview/page.tsx` | 19 | Placeholder PDF preview note. |
| `/plans` | `app/(app)/plans/page.tsx` | 129 | Saved G7 systems library. |
| `/recipe-studio` | `app/(app)/recipe-studio/page.tsx` | 333 | Recipe/SOP studio; dish creation, components, cooking/plating documentation. |
| `/roval` | `app/(app)/approval/page.tsx` | 487 | Route exists; needs manual role confirmation. |
| `/settings` | `app/(app)/settings/page.tsx` | 21 | Placeholder settings panel. |
| `/staff` | `app/(app)/staff/page.tsx` | 502 | Staff/worker task execution route; operational steps/status flow. |
| `/weekly` | `app/(app)/weekly/page.tsx` | 226 | Legacy weekly nutrition OS generator. |
| `/workforce` | `app/(app)/workforce/page.tsx` | 380 | Workforce operations runtime; orchestrator/supervisor/timeline/pressure panels. |

## Kitchen OS Core Architecture

### Current runtime layers

1. **Workspace shell:** `app/(app)/layout.tsx` gives the sidebar/navigation and frames Kitchen OS with Approval, Workforce, Inventory, AI Chef, etc.

2. **Main cockpit route:** `app/(app)/kitchen/page.tsx` wraps the page in `RuntimeProvider`, stores workspace/focus mode in localStorage, and switches between overview, runtime, alerts, workforce, production, and assistant sections.

3. **Stage runtime engine:** `app/components/kitchen/runtime-engine-data.ts` calculates progress, time pressure, gap, risk, recommended actions, decision title/body, and current focus.

4. **Runtime state provider:** `runtime-context.tsx` + `runtime-store.ts` manage live stages and dispatch periodic sync/output actions. This is the closest thing to the new cockpit state engine.

5. **Dish/batch production model:** `kitchen-runtime-data.ts` defines workers, dishes, stages, progress, runtime risk, and conversion from dishes to runtime stages. This is the older but still valuable production model.

6. **Prep/production localStorage stores:** `app/ai/production-runtime-store.ts`, `production-timeline-store.ts`, and `workforce-runtime-store.ts` persist dish/workforce/timeline simulation state in the browser.

7. **Global system runtime:** `app/components/system/runtime/*` models cross-system batches/signals for kitchen/workforce/approval/inventory, but it is mostly a static singleton and separate from the newer `useRuntime()` store.


### Important current issue: multiple runtime truths

The project currently has several runtime models that overlap. This is the biggest architecture risk.

| Runtime source | Role | Risk | Recommendation |
|---|---|---|---|
| `app/components/kitchen/runtime-store.ts` | New cockpit live stage state | Good, but not yet event-driven | Make this the canonical cockpit stage store. |
| `app/components/kitchen/kitchen-runtime-data.ts` | Dish/batch/stage model | Valuable but parallel to `runtime-store` | Keep as production domain model and feed canonical store. |
| `app/components/system/runtime/runtime-store.ts` | Cross-system global signals | Static singleton, separate from cockpit state | Convert to derived view or event sink. |
| `app/ai/production-runtime-store.ts` | Browser-persisted production dishes | Works for prototype | Integrate with canonical runtime events. |
| `app/ai/production-timeline-store.ts` | Browser-persisted timeline events | Useful | Merge into unified runtime event log. |
| `app/ai/workforce-runtime-store.ts` | Browser-persisted workforce statuses | Useful | Connect to Call Support and station assignment. |

## Kitchen OS File-by-File Audit

| File | Lines | Current Role | Status / Notes |
|---|---:|---|---|
| `app/components/kitchen/AIKitchenOrchestrator.tsx` | 237 | Workforce page AI coordination component. | imported 1x |
| `app/components/kitchen/AIRuntimeSupervisor.tsx` | 349 | Workforce page supervisor component. | imported 1x |
| `app/components/kitchen/AdaptiveRuntimeLayoutEngine.tsx` | 235 | Dynamic layout/intelligence visualization. | imported 1x |
| `app/components/kitchen/ApprovalQueue.tsx` | 79 | Kitchen production/approval queue component. | imported 1x |
| `app/components/kitchen/ApprovedProduction.tsx` | 73 | Approved/released production view. | imported 3x |
| `app/components/kitchen/KitchenAlerts.tsx` | 113 | Side alert panel now powered by runtime decisions, not old Butter/Marinara static alerts. | imported 1x |
| `app/components/kitchen/KitchenSectionSidebar.tsx` | 43 | Appears unused in current import graph. | not imported in current graph |
| `app/components/kitchen/KitchenStats.tsx` | 77 | Kitchen stat card group based on older kitchen data. | imported 2x |
| `app/components/kitchen/ProductionFlow.tsx` | 270 | Dish runtime flow summary and active batch insights. | imported 1x |
| `app/components/kitchen/ProductionTimeline.tsx` | 402 | Production/worker timeline view; localStorage-backed via timeline store. | imported 1x |
| `app/components/kitchen/RealtimeRuntimeEngine.tsx` | 486 | Detailed runtime stage board; supports action buttons/output increments. | imported 2x |
| `app/components/kitchen/RuntimeActionCenter.tsx` | 612 | AI action cards and first Operator Action Panel with mobile-style actions. | imported 1x; large |
| `app/components/kitchen/RuntimeAlertsFeed.tsx` | 264 | Detailed alert feed driven by runtime decisions and stage AI notes. | imported 2x |
| `app/components/kitchen/RuntimeCauseEffectEngine.tsx` | 346 | Cause/effect flow reasoning layer. | imported 1x |
| `app/components/kitchen/RuntimeCockpitTabs.tsx` | 286 | Intelligence drawer tabs: adaptive/decisions/memory/cause/intervention. | imported 3x |
| `app/components/kitchen/RuntimeCommandBar.tsx` | 404 | Search/command bar for current runtime action and workspace jumps. | imported 1x |
| `app/components/kitchen/RuntimeDecisionTimeline.tsx` | 260 | Decision timeline/log visualization. | imported 1x |
| `app/components/kitchen/RuntimeFocusModes.tsx` | 203 | Switches overview between execution/analysis/workforce/command modes. | imported 1x |
| `app/components/kitchen/RuntimeInterventionPlanner.tsx` | 294 | Planner view for owner/action/ETA/impact. | imported 1x |
| `app/components/kitchen/RuntimeMemoryGraph.tsx` | 364 | Operational memory/pattern visualization. | imported 1x |
| `app/components/kitchen/StaffTimeline.tsx` | 182 | Assistant/staff timeline view. | imported 1x |
| `app/components/kitchen/VoiceAssistant.tsx` | 87 | Assistant panel. | imported 1x |
| `app/components/kitchen/WorkerBoard.tsx` | 625 | Interactive worker/dish stage board; start/finish logic around stages. | imported 1x; large |
| `app/components/kitchen/WorkerCard.tsx` | 99 | Worker card component; currently imported only by unused/legacy paths. | not imported in current graph |
| `app/components/kitchen/WorkforceMap.tsx` | 537 | Workforce/station map and pressure view. | imported 2x; large |
| `app/components/kitchen/dynamic-runtime-zones.ts` | 87 | Generates dynamic runtime zones based on pressure. | imported 1x |
| `app/components/kitchen/kitchen-data.ts` | 621 | Kitchen support/data/layout file. | imported 2x; large |
| `app/components/kitchen/kitchen-runtime-data.ts` | 1026 | Dish/stage/worker production domain model; large and important. | imported 11x; large |
| `app/components/kitchen/kitchen-workforce-data.ts` | 592 | Kitchen support/data/layout file. | imported 4x; large |
| `app/components/kitchen/layouts/AnalysisRuntimeLayout.tsx` | 14 | Kitchen support/data/layout file. | imported 1x |
| `app/components/kitchen/layouts/CommandRuntimeLayout.tsx` | 18 | Kitchen support/data/layout file. | imported 1x |
| `app/components/kitchen/layouts/ExecutionRuntimeLayout.tsx` | 18 | Kitchen support/data/layout file. | imported 1x |
| `app/components/kitchen/layouts/WorkforceRuntimeLayout.tsx` | 95 | Kitchen support/data/layout file. | imported 1x |
| `app/components/kitchen/runtime-attention.ts` | 95 | Attention signal helper for UI emphasis. | imported 1x |
| `app/components/kitchen/runtime-context.tsx` | 83 | React context provider for current runtime snapshot and dispatch. | imported 15x |
| `app/components/kitchen/runtime-decision-log.ts` | 96 | Decision log generator; appears unused in current import graph. | not imported in current graph |
| `app/components/kitchen/runtime-engine-data.ts` | 675 | Main stage risk/action/decision engine. | imported 19x; large |
| `app/components/kitchen/runtime-memory.ts` | 118 | Memory/pattern summary helper. | imported 1x |
| `app/components/kitchen/runtime-mood.ts` | 78 | Runtime hero mood/wording helper. | imported 1x |
| `app/components/kitchen/runtime-store.ts` | 258 | Reducer/state for live runtime stages; needs event-driven actions next. | imported 1x |

## Cross-System Runtime Audit

The `app/components/system/runtime` folder is the older/global runtime layer. It contains useful concepts: systems, batches, signals, mutations, action execution, escalation feed, and workforce pressure. However, it currently behaves like a separate runtime universe from the new `useRuntime()` cockpit state.

| File | Lines | Notes |
|---|---:|---|
| `app/components/system/runtime/RuntimeEscalationFeed.tsx` | 100 | runtime |
| `app/components/system/runtime/RuntimeWorkforcePressurePanel.tsx` | 101 | runtime |
| `app/components/system/runtime/runtime-action-engine.ts` | 124 | runtime |
| `app/components/system/runtime/runtime-actions.ts` | 135 | runtime |
| `app/components/system/runtime/runtime-mutations.ts` | 179 | runtime |
| `app/components/system/runtime/runtime-store.ts` | 126 | runtime |
| `app/components/system/runtime/runtime-types.ts` | 64 | runtime |
| `app/components/system/runtime/runtime-workforce-pressure.ts` | 95 | runtime |
| `app/components/system/runtime/runtime-workforce-sync.ts` | 71 | runtime |

## AI / Nutrition / G7 Engine Audit

The `app/ai` folder is mixed: some files belong to nutrition/gym/PDF intelligence, some belong to Kitchen OS production runtime, and some are generic AI/predictive placeholders. This is acceptable for prototype history but should be separated into product domains before commercial MVP.

| File | Lines | Domain | Notes |
|---|---:|---|---|
| `app/ai/g7-adaptive.ts` | 78 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-autonomous-engine.ts` | 29 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-decision-engine.ts` | 57 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-engine.ts` | 157 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-evolution-engine.ts` | 78 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-flavors.ts` | 44 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-food-db.ts` | 91 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-grocery.ts` | 42 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-guard.ts` | 34 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-ichef-documentation-engine.ts` | 178 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-inventory-engine.ts` | 298 | Kitchen OS / runtime support | logic/data engine |
| `app/ai/g7-learning-engine.ts` | 49 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-meal-engine.ts` | 423 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-nutrition-identity.ts` | 33 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-personality.ts` | 60 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-plans.ts` | 18 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/g7-predictive-engine.ts` | 37 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-predictor.ts` | 31 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-production-engine.ts` | 244 | Kitchen OS / runtime support | logic/data engine |
| `app/ai/g7-recipe-system.ts` | 133 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-system.ts` | 54 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-types.ts` | 32 | Nutrition/G7 AI | logic/data engine |
| `app/ai/g7-weekly-system.ts` | 125 | Nutrition/PDF/Gym system | logic/data engine |
| `app/ai/ingredient-db.ts` | 344 | Nutrition/G7 AI | logic/data engine |
| `app/ai/meal-visual-engine.ts` | 1140 | Nutrition/PDF/Gym system | large |
| `app/ai/production-runtime-store.ts` | 46 | Kitchen OS / runtime support | browser localStorage |
| `app/ai/production-timeline-store.ts` | 65 | Kitchen OS / runtime support | browser localStorage |
| `app/ai/runtime-engine.ts` | 203 | Kitchen OS / runtime support | logic/data engine |
| `app/ai/workforce-runtime-store.ts` | 107 | Kitchen OS / runtime support | browser localStorage |

## G7 Nutrition / PDF / Join Layer Audit

This layer is still in the same project and is valuable, but it is a separate product layer from Kitchen OS. It includes join funnel, plan selection, macro engines, master meals, PDF booklet generation, visual meal experience, and admin generation. Keep it separate conceptually.

| File | Lines | Notes |
|---|---:|---|
| `app/admin-generate/page.tsx` | 512 | route/page, large file |
| `app/components/g7/JoinHero.tsx` | 38 | support/data/ui |
| `app/components/g7/JoinPlans.tsx` | 290 | support/data/ui |
| `app/components/g7/MacroCard.tsx` | 21 | support/data/ui |
| `app/components/g7/MealVisualCardV2.tsx` | 283 | support/data/ui |
| `app/components/g7/PdfBooklet.tsx` | 5376 | large file |
| `app/components/g7/RecipePage.tsx` | 0 | support/data/ui |
| `app/components/g7/SectionTitle.tsx` | 23 | support/data/ui |
| `app/components/g7/VisualMealExperienceV21.tsx` | 242 | support/data/ui |
| `app/components/g7/grocery.ts` | 83 | support/data/ui |
| `app/components/g7/ingredient-normalizer.ts` | 402 | support/data/ui |
| `app/components/g7/macro-adjustment-engine.ts` | 264 | support/data/ui |
| `app/components/g7/macro-distribution.ts` | 183 | support/data/ui |
| `app/components/g7/macro-gap-engine.ts` | 44 | support/data/ui |
| `app/components/g7/macro-matrix.ts` | 321 | support/data/ui |
| `app/components/g7/master-meals.ts` | 1198 | large file |
| `app/components/g7/meal-intelligence-notes.ts` | 216 | support/data/ui |
| `app/components/g7/meal-translations.ts` | 1276 | large file |
| `app/components/g7/meals.ts` | 697 | large file |
| `app/components/g7/nutrition-calculator.ts` | 424 | support/data/ui |
| `app/components/g7/plan-branding.ts` | 114 | support/data/ui |
| `app/components/g7/plans.ts` | 176 | support/data/ui |
| `app/components/g7/portion-matrix.ts` | 446 | support/data/ui |
| `app/components/g7/portion-scaler.ts` | 299 | support/data/ui |
| `app/data/g7-base-meals.ts` | 824 | large file |
| `app/data/g7-flavor-profiles.ts` | 203 | support/data/ui |
| `app/data/g7-master-ingredients.ts` | 15099 | large file |
| `app/data/g7-plan-modifiers.ts` | 355 | support/data/ui |
| `app/data/g7-production.ts` | 211 | support/data/ui |
| `app/data/g7-weekly-assembly-rules.ts` | 405 | support/data/ui |
| `app/data/g7-yield-system.ts` | 285 | support/data/ui |
| `app/join/flavor-systems.ts` | 202 | support/data/ui |
| `app/join/meal-intelligence.ts` | 298 | support/data/ui |
| `app/join/page.tsx` | 1192 | route/page, large file |
| `app/join/prep-systems.ts` | 155 | support/data/ui |

## API / Backend Audit

Current backend is minimal and mostly Supabase auth/profile. Kitchen OS has no server API for runtime events yet.

| File | Lines | Notes |
|---|---:|---|
| `app/api/` | 0 | support/data/ui |
| `app/api/auth/` | 0 | support/data/ui |
| `app/api/auth/otp/route.ts.txt` | 10 | support/data/ui |
| `app/api/get-profile/route.ts` | 22 | Supabase |
| `app/api/login/route.ts` | 35 | Supabase |
| `app/api/save-profile/route.ts` | 29 | Supabase |
| `app/api/test/route.ts` | 16 | support/data/ui |
| `lib/approval-data.ts` | 60 | support/data/ui |
| `lib/g7-billing.ts` | 10 | support/data/ui |
| `lib/g7-memory.ts` | 66 | browser/localStorage |
| `lib/g7/mealEngine.ts` | 46 | support/data/ui |
| `lib/g7Orchestrator.ts` | 147 | support/data/ui |
| `lib/g7PricingEngine.ts` | 54 | support/data/ui |
| `lib/g7Stores.ts` | 31 | support/data/ui |
| `lib/supabase.ts` | 6 | Supabase |
| `lib/supabaseClient.ts` | 6 | Supabase |

Backend notes:
- `app/api/auth/otp/route.ts.txt` is not an active Next route because it ends with `.txt`. If intended, rename to `route.ts`.
- `login`, `get-profile`, `save-profile`, and `history` use Supabase; Kitchen OS runtime does not yet use Supabase.
- `proxy.ts` currently just `NextResponse.next()`, so it is a placeholder middleware/proxy.


## UI / Design Audit

Global styling is strong and consistent around dark/cyan/gold G7 visual identity. Kitchen OS has evolved a lime/alert-specific identity in components. There are multiple UI token files and systems. Consolidation is needed later.

| File | Lines | Notes |
|---|---:|---|
| `app/components/system/RuntimeBadge.tsx` | 27 | runtime |
| `app/components/system/RuntimeDock.tsx` | 60 | runtime |
| `app/components/system/RuntimeHero.tsx` | 106 | runtime |
| `app/components/system/RuntimePanel.tsx` | 33 | runtime |
| `app/components/system/RuntimeSectionHeader.tsx` | 57 | runtime |
| `app/components/system/RuntimeStatCard.tsx` | 41 | runtime |
| `app/components/system/RuntimeSwitcher.tsx` | 108 | runtime |
| `app/components/system/RuntimeWorkspaceNav.tsx` | 62 | runtime |
| `app/components/system/runtime/RuntimeEscalationFeed.tsx` | 100 | runtime |
| `app/components/system/runtime/RuntimeWorkforcePressurePanel.tsx` | 101 | runtime |
| `app/components/system/runtime/runtime-action-engine.ts` | 124 | runtime |
| `app/components/system/runtime/runtime-actions.ts` | 135 | runtime |
| `app/components/system/runtime/runtime-mutations.ts` | 179 | runtime |
| `app/components/system/runtime/runtime-store.ts` | 126 | runtime |
| `app/components/system/runtime/runtime-types.ts` | 64 | runtime |
| `app/components/system/runtime/runtime-workforce-pressure.ts` | 95 | runtime |
| `app/components/system/runtime/runtime-workforce-sync.ts` | 71 | runtime |
| `app/components/ui/G7Button.tsx` | 24 | support/data/ui |
| `app/components/ui/G7Card.tsx` | 28 | support/data/ui |
| `app/design/tokens.ts` | 54 | support/data/ui |
| `app/globals.css` | 504 | large file |
| `app/layout.tsx` | 26 | support/data/ui |
| `app/page.tsx` | 149 | route/page |
| `app/ui/g7-design-system.ts` | 33 | support/data/ui |
| `app/ui/g7-style.ts` | 47 | support/data/ui |
| `app/ui/g7-theme.ts` | 28 | support/data/ui |
| `app/ui/g7-ui-tokens.ts` | 29 | support/data/ui |
| `app/ui/g7-ui.ts` | 58 | support/data/ui |

## LocalStorage / Browser State Inventory

| File | Keys / State | Purpose |
|---|---|---|
| `app/(app)/kitchen/page.tsx` | `dynamic/constant key` | persists active kitchen section/focus mode |
| `app/(app)/plans/page.tsx` | `g7-saved` | saved plan library |
| `app/ai/production-runtime-store.ts` | `STORAGE_KEY, g7-production-runtime-dishes` | persists production dish runtime |
| `app/ai/production-timeline-store.ts` | `STORAGE_KEY, g7-production-timeline-events` | persists worker timeline events |
| `app/ai/workforce-runtime-store.ts` | `STORAGE_KEY, g7-workforce-runtime-state` | persists workforce runtime status |
| `app/goal/page.tsx` | `g7_goal` | goal selection |
| `lib/g7-memory.ts` | `dynamic/constant key` | browser persistence / prototype runtime state |

## Old Prep / Shortage Workflow Status

The prep/shortage work shown in old screenshots is still represented in the project. The strongest evidence is the presence of `ProductionFlow.tsx`, `ProductionTimeline.tsx`, `kitchen-runtime-data.ts`, `app/ai/production-runtime-store.ts`, and the current `/kitchen` production section that renders `WorkerBoard`, `KitchenAlerts`, `ApprovalQueue`, `ProductionFlow`, and `ApprovedProduction`. However, it is not fully unified with the new Runtime Action Center. It is currently a parallel production workflow.

Recommended next move: do not rebuild it. Connect it to the new canonical runtime events so prep shortage -> prep action -> worker started -> completed -> stock updated -> production release all become first-class events.


## Main Duplication / Architecture Risks

1. **Multiple runtime stores:** new cockpit state, dish runtime data, global system runtime, production localStorage, timeline localStorage, workforce localStorage. This will become confusing unless unified.

2. **Nutrition and Kitchen OS mixed in same folders:** not fatal, but must be documented and separated conceptually.

3. **Large monolithic files:** `g7-master-ingredients.ts`, `PdfBooklet.tsx`, `master-meals.ts`, `join/page.tsx`, and kitchen runtime data are large. They are workable now, but future changes will be risky.

4. **Static singleton mutation:** `GLOBAL_RUNTIME_STATE` is mutated in memory; useful for prototype but not reliable for real multi-user runtime.

5. **Operator actions not persisted:** current Operator Action Panel UI should become runtime events.

6. **Potential unused files:** `KitchenSectionSidebar.tsx`, `WorkerCard.tsx`, and `runtime-decision-log.ts` appear not imported in the current graph. They may be legacy or planned. Decide whether to reconnect or archive.

7. **README is still default Next.js:** project needs a real README documenting Kitchen OS and product layers.

8. **Root layout minor cleanup:** `app/layout.tsx` has `<html lang="en"data-scroll-behavior="smooth">`; add a space for cleanliness.

9. **Duplicate PostCSS config files:** both `postcss.config.js` and `postcss.config.mjs` exist. Keep one convention after confirming build.


## What Is Strong

- Product vision is distinctive: central kitchen runtime, not just dashboard.

- `/kitchen` has a real cockpit structure with sections/focus modes.

- Stage-specific runtime decision logic is now much stronger.

- The first Operator Action Panel exists.

- Workforce, approval, inventory, recipe, and staff concepts all exist in code.

- Browser-based stores make the prototype feel interactive without needing backend yet.

- Navigation shell is strong and mobile dock exists.


## What Is Weak / Missing

- No canonical event log yet.

- No DB-backed runtime.

- Operator buttons do not update global runtime state.

- Workforce support requests are not connected end-to-end.

- Approval queue is not triggered by QC/operator actions.

- Inventory shortages/prep actions are not unified with runtime actions.

- Worker mobile screen is not yet separated enough from cockpit.

- Roles and actual users are still simulated.


## Recommended Master Roadmap

### Phase A — Freeze product layers

- Keep Kitchen OS separate from Gym/PDF/Join in decisions.
- Document that this repo has two products: G7 Nutrition System and G7 Kitchen OS.

### Phase B — Create canonical runtime event model

Create `RuntimeEvent` with: id, type, stageId, dishId, source, target, owner, actor, status, note, createdAt. All actions must write an event.

### Phase C — Connect Operator Action Panel buttons

- Mark Ready -> stage ready event/update.
- Call Support -> workforce support request.
- Escalate -> approval/management escalation.
- Hold -> stage hold/block event.

### Phase D — Merge prep/shortage flow into runtime events

The prep shortage workflow should not be a separate universe. Make shortage conversion, prep started, prep completed, stock updated, production released into events.

### Phase E — Connect pages

- `/workforce` consumes support events.
- `/approval` consumes QC/escalation/release events.
- `/inventory` consumes shortage/check-inventory events.
- `/employees` and `/staff` consume assigned worker tasks.

### Phase F — Worker mobile route

Create station/worker-first route with only the task, steps, and big buttons. Cockpit remains for chef/manager.

### Phase G — Backend persistence

After events work locally, move runtime events and state to Supabase tables.


## Full File Inventory

### app/(app) pages

| File | Lines | Notes |
|---|---:|---|
| `app/(app)/approval/page.tsx` | 487 | route/page |
| `app/(app)/dashboard/page.tsx` | 653 | route/page, Supabase, large file |
| `app/(app)/employees/page.tsx` | 462 | route/page |
| `app/(app)/generate/page.tsx` | 3 | route/page |
| `app/(app)/ichef/page.tsx` | 399 | route/page |
| `app/(app)/inventory/page.tsx` | 648 | route/page, large file |
| `app/(app)/kitchen/page.tsx` | 354 | route/page, browser/localStorage |
| `app/(app)/layout.tsx` | 235 | support/data/ui |
| `app/(app)/plans/page.tsx` | 129 | route/page, browser/localStorage |
| `app/(app)/recipe-studio/page.tsx` | 333 | route/page |
| `app/(app)/settings/page.tsx` | 21 | route/page |
| `app/(app)/staff/page.tsx` | 502 | route/page, large file |
| `app/(app)/weekly/page.tsx` | 226 | route/page |
| `app/(app)/workforce/page.tsx` | 380 | route/page |

### app/admin-generate

| File | Lines | Notes |
|---|---:|---|
| `app/admin-generate/page.tsx` | 512 | route/page, large file |

### app/ai engines

| File | Lines | Notes |
|---|---:|---|
| `app/ai/g7-adaptive.ts` | 78 | support/data/ui |
| `app/ai/g7-autonomous-engine.ts` | 29 | support/data/ui |
| `app/ai/g7-decision-engine.ts` | 57 | support/data/ui |
| `app/ai/g7-engine.ts` | 157 | support/data/ui |
| `app/ai/g7-evolution-engine.ts` | 78 | support/data/ui |
| `app/ai/g7-flavors.ts` | 44 | support/data/ui |
| `app/ai/g7-food-db.ts` | 91 | support/data/ui |
| `app/ai/g7-grocery.ts` | 42 | support/data/ui |
| `app/ai/g7-guard.ts` | 34 | support/data/ui |
| `app/ai/g7-ichef-documentation-engine.ts` | 178 | support/data/ui |
| `app/ai/g7-inventory-engine.ts` | 298 | support/data/ui |
| `app/ai/g7-learning-engine.ts` | 49 | support/data/ui |
| `app/ai/g7-meal-engine.ts` | 423 | support/data/ui |
| `app/ai/g7-nutrition-identity.ts` | 33 | support/data/ui |
| `app/ai/g7-personality.ts` | 60 | support/data/ui |
| `app/ai/g7-plans.ts` | 18 | support/data/ui |
| `app/ai/g7-predictive-engine.ts` | 37 | support/data/ui |
| `app/ai/g7-predictor.ts` | 31 | support/data/ui |
| `app/ai/g7-production-engine.ts` | 244 | support/data/ui |
| `app/ai/g7-recipe-system.ts` | 133 | support/data/ui |
| `app/ai/g7-system.ts` | 54 | support/data/ui |
| `app/ai/g7-types.ts` | 32 | support/data/ui |
| `app/ai/g7-weekly-system.ts` | 125 | support/data/ui |
| `app/ai/ingredient-db.ts` | 344 | support/data/ui |
| `app/ai/meal-visual-engine.ts` | 1140 | large file |
| `app/ai/production-runtime-store.ts` | 46 | runtime, browser/localStorage |
| `app/ai/production-timeline-store.ts` | 65 | browser/localStorage |
| `app/ai/runtime-engine.ts` | 203 | runtime |
| `app/ai/workforce-runtime-store.ts` | 107 | runtime, browser/localStorage |

### app/api

| File | Lines | Notes |
|---|---:|---|
| `app/api/` | 0 | support/data/ui |
| `app/api/auth/` | 0 | support/data/ui |
| `app/api/auth/otp/route.ts.txt` | 10 | support/data/ui |
| `app/api/get-profile/route.ts` | 22 | Supabase |
| `app/api/login/route.ts` | 35 | Supabase |
| `app/api/save-profile/route.ts` | 29 | Supabase |
| `app/api/test/route.ts` | 16 | support/data/ui |

### app/components/ApprovalCard.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/ApprovalCard.tsx` | 84 | support/data/ui |

### app/components/Button.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/Button.tsx` | 16 | support/data/ui |

### app/components/FlavorSelector.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/FlavorSelector.tsx` | 596 | Supabase, large file |

### app/components/IChefDocumentViewer.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/IChefDocumentViewer.tsx` | 383 | support/data/ui |

### app/components/KitchenExecutionPanel.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/KitchenExecutionPanel.tsx` | 384 | support/data/ui |

### app/components/MealCard.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/MealCard.tsx` | 18 | support/data/ui |

### app/components/WeeklyPlan.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/components/WeeklyPlan.tsx` | 67 | support/data/ui |

### app/components/g7

| File | Lines | Notes |
|---|---:|---|
| `app/components/g7/JoinHero.tsx` | 38 | support/data/ui |
| `app/components/g7/JoinPlans.tsx` | 290 | support/data/ui |
| `app/components/g7/MacroCard.tsx` | 21 | support/data/ui |
| `app/components/g7/MealVisualCardV2.tsx` | 283 | support/data/ui |
| `app/components/g7/PdfBooklet.tsx` | 5376 | large file |
| `app/components/g7/RecipePage.tsx` | 0 | support/data/ui |
| `app/components/g7/SectionTitle.tsx` | 23 | support/data/ui |
| `app/components/g7/VisualMealExperienceV21.tsx` | 242 | support/data/ui |
| `app/components/g7/grocery.ts` | 83 | support/data/ui |
| `app/components/g7/ingredient-normalizer.ts` | 402 | support/data/ui |
| `app/components/g7/macro-adjustment-engine.ts` | 264 | support/data/ui |
| `app/components/g7/macro-distribution.ts` | 183 | support/data/ui |
| `app/components/g7/macro-gap-engine.ts` | 44 | support/data/ui |
| `app/components/g7/macro-matrix.ts` | 321 | support/data/ui |
| `app/components/g7/master-meals.ts` | 1198 | large file |
| `app/components/g7/meal-intelligence-notes.ts` | 216 | support/data/ui |
| `app/components/g7/meal-translations.ts` | 1276 | large file |
| `app/components/g7/meals.ts` | 697 | large file |
| `app/components/g7/nutrition-calculator.ts` | 424 | support/data/ui |
| `app/components/g7/plan-branding.ts` | 114 | support/data/ui |
| `app/components/g7/plans.ts` | 176 | support/data/ui |
| `app/components/g7/portion-matrix.ts` | 446 | support/data/ui |
| `app/components/g7/portion-scaler.ts` | 299 | support/data/ui |

### app/components/kitchen

| File | Lines | Notes |
|---|---:|---|
| `app/components/kitchen/AIKitchenOrchestrator.tsx` | 237 | imported 1x |
| `app/components/kitchen/AIRuntimeSupervisor.tsx` | 349 | runtime, imported 1x |
| `app/components/kitchen/AdaptiveRuntimeLayoutEngine.tsx` | 235 | runtime, imported 1x |
| `app/components/kitchen/ApprovalQueue.tsx` | 79 | imported 1x |
| `app/components/kitchen/ApprovedProduction.tsx` | 73 | imported 3x |
| `app/components/kitchen/KitchenAlerts.tsx` | 113 | imported 1x |
| `app/components/kitchen/KitchenSectionSidebar.tsx` | 43 | imported 0x |
| `app/components/kitchen/KitchenStats.tsx` | 77 | imported 2x |
| `app/components/kitchen/ProductionFlow.tsx` | 270 | imported 1x |
| `app/components/kitchen/ProductionTimeline.tsx` | 402 | imported 1x |
| `app/components/kitchen/RealtimeRuntimeEngine.tsx` | 486 | runtime, imported 2x |
| `app/components/kitchen/RuntimeActionCenter.tsx` | 612 | runtime, imported 1x, large file |
| `app/components/kitchen/RuntimeAlertsFeed.tsx` | 264 | runtime, imported 2x |
| `app/components/kitchen/RuntimeCauseEffectEngine.tsx` | 346 | runtime, imported 1x |
| `app/components/kitchen/RuntimeCockpitTabs.tsx` | 286 | runtime, imported 3x |
| `app/components/kitchen/RuntimeCommandBar.tsx` | 404 | runtime, imported 1x |
| `app/components/kitchen/RuntimeDecisionTimeline.tsx` | 260 | runtime, imported 1x |
| `app/components/kitchen/RuntimeFocusModes.tsx` | 203 | runtime, imported 1x |
| `app/components/kitchen/RuntimeInterventionPlanner.tsx` | 294 | runtime, imported 1x |
| `app/components/kitchen/RuntimeMemoryGraph.tsx` | 364 | runtime, imported 1x |
| `app/components/kitchen/StaffTimeline.tsx` | 182 | imported 1x |
| `app/components/kitchen/VoiceAssistant.tsx` | 87 | imported 1x |
| `app/components/kitchen/WorkerBoard.tsx` | 625 | imported 1x, large file |
| `app/components/kitchen/WorkerCard.tsx` | 99 | imported 0x |
| `app/components/kitchen/WorkforceMap.tsx` | 537 | imported 2x, large file |
| `app/components/kitchen/dynamic-runtime-zones.ts` | 87 | runtime, imported 1x |
| `app/components/kitchen/kitchen-data.ts` | 621 | imported 2x, large file |
| `app/components/kitchen/kitchen-runtime-data.ts` | 1026 | runtime, imported 11x, large file |
| `app/components/kitchen/kitchen-workforce-data.ts` | 592 | imported 4x, large file |
| `app/components/kitchen/layouts/AnalysisRuntimeLayout.tsx` | 14 | runtime, imported 1x |
| `app/components/kitchen/layouts/CommandRuntimeLayout.tsx` | 18 | runtime, imported 1x |
| `app/components/kitchen/layouts/ExecutionRuntimeLayout.tsx` | 18 | runtime, imported 1x |
| `app/components/kitchen/layouts/WorkforceRuntimeLayout.tsx` | 95 | runtime, imported 1x |
| `app/components/kitchen/runtime-attention.ts` | 95 | runtime, imported 1x |
| `app/components/kitchen/runtime-context.tsx` | 83 | runtime, imported 15x |
| `app/components/kitchen/runtime-decision-log.ts` | 96 | runtime, imported 0x |
| `app/components/kitchen/runtime-engine-data.ts` | 675 | runtime, imported 19x, large file |
| `app/components/kitchen/runtime-memory.ts` | 118 | runtime, imported 1x |
| `app/components/kitchen/runtime-mood.ts` | 78 | runtime, imported 1x |
| `app/components/kitchen/runtime-store.ts` | 258 | runtime, imported 1x |

### app/components/recipe-cards

| File | Lines | Notes |
|---|---:|---|
| `app/components/recipe-cards/CostCard.tsx` | 10 | support/data/ui |
| `app/components/recipe-cards/DishHeroCard.tsx` | 8 | support/data/ui |
| `app/components/recipe-cards/IngredientsCard.tsx` | 16 | support/data/ui |
| `app/components/recipe-cards/NutritionCard.tsx` | 10 | support/data/ui |
| `app/components/recipe-cards/RecipeGrid.tsx` | 57 | support/data/ui |

### app/components/system

| File | Lines | Notes |
|---|---:|---|
| `app/components/system/RuntimeBadge.tsx` | 27 | runtime |
| `app/components/system/RuntimeDock.tsx` | 60 | runtime |
| `app/components/system/RuntimeHero.tsx` | 106 | runtime |
| `app/components/system/RuntimePanel.tsx` | 33 | runtime |
| `app/components/system/RuntimeSectionHeader.tsx` | 57 | runtime |
| `app/components/system/RuntimeStatCard.tsx` | 41 | runtime |
| `app/components/system/RuntimeSwitcher.tsx` | 108 | runtime |
| `app/components/system/RuntimeWorkspaceNav.tsx` | 62 | runtime |
| `app/components/system/runtime/RuntimeEscalationFeed.tsx` | 100 | runtime |
| `app/components/system/runtime/RuntimeWorkforcePressurePanel.tsx` | 101 | runtime |
| `app/components/system/runtime/runtime-action-engine.ts` | 124 | runtime |
| `app/components/system/runtime/runtime-actions.ts` | 135 | runtime |
| `app/components/system/runtime/runtime-mutations.ts` | 179 | runtime |
| `app/components/system/runtime/runtime-store.ts` | 126 | runtime |
| `app/components/system/runtime/runtime-types.ts` | 64 | runtime |
| `app/components/system/runtime/runtime-workforce-pressure.ts` | 95 | runtime |
| `app/components/system/runtime/runtime-workforce-sync.ts` | 71 | runtime |

### app/components/ui

| File | Lines | Notes |
|---|---:|---|
| `app/components/ui/G7Button.tsx` | 24 | support/data/ui |
| `app/components/ui/G7Card.tsx` | 28 | support/data/ui |

### app/data

| File | Lines | Notes |
|---|---:|---|
| `app/data/g7-base-meals.ts` | 824 | large file |
| `app/data/g7-flavor-profiles.ts` | 203 | support/data/ui |
| `app/data/g7-master-ingredients.ts` | 15099 | large file |
| `app/data/g7-plan-modifiers.ts` | 355 | support/data/ui |
| `app/data/g7-production.ts` | 211 | support/data/ui |
| `app/data/g7-weekly-assembly-rules.ts` | 405 | support/data/ui |
| `app/data/g7-yield-system.ts` | 285 | support/data/ui |

### app/design

| File | Lines | Notes |
|---|---:|---|
| `app/design/tokens.ts` | 54 | support/data/ui |

### app/globals.css

| File | Lines | Notes |
|---|---:|---|
| `app/globals.css` | 504 | large file |

### app/goal

| File | Lines | Notes |
|---|---:|---|
| `app/goal/page.tsx` | 162 | route/page, browser/localStorage |

### app/history

| File | Lines | Notes |
|---|---:|---|
| `app/history/page.tsx` | 55 | route/page, Supabase |

### app/join

| File | Lines | Notes |
|---|---:|---|
| `app/join/flavor-systems.ts` | 202 | support/data/ui |
| `app/join/meal-intelligence.ts` | 298 | support/data/ui |
| `app/join/page.tsx` | 1192 | route/page, large file |
| `app/join/prep-systems.ts` | 155 | support/data/ui |

### app/layout.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/layout.tsx` | 26 | support/data/ui |

### app/login

| File | Lines | Notes |
|---|---:|---|
| `app/login/page.tsx` | 219 | route/page, Supabase |

### app/page.tsx

| File | Lines | Notes |
|---|---:|---|
| `app/page.tsx` | 149 | route/page |

### app/pdf-preview

| File | Lines | Notes |
|---|---:|---|
| `app/pdf-preview/page.tsx` | 19 | route/page |

### app/ui

| File | Lines | Notes |
|---|---:|---|
| `app/ui/g7-design-system.ts` | 33 | support/data/ui |
| `app/ui/g7-style.ts` | 47 | support/data/ui |
| `app/ui/g7-theme.ts` | 28 | support/data/ui |
| `app/ui/g7-ui-tokens.ts` | 29 | support/data/ui |
| `app/ui/g7-ui.ts` | 58 | support/data/ui |

### lib

| File | Lines | Notes |
|---|---:|---|
| `lib/approval-data.ts` | 60 | support/data/ui |
| `lib/g7-billing.ts` | 10 | support/data/ui |
| `lib/g7-memory.ts` | 66 | browser/localStorage |
| `lib/g7/mealEngine.ts` | 46 | support/data/ui |
| `lib/g7Orchestrator.ts` | 147 | support/data/ui |
| `lib/g7PricingEngine.ts` | 54 | support/data/ui |
| `lib/g7Stores.ts` | 31 | support/data/ui |
| `lib/supabase.ts` | 6 | Supabase |
| `lib/supabaseClient.ts` | 6 | Supabase |

### public

| File | Lines | Notes |
|---|---:|---|
| `public/file.svg` | 1 | support/data/ui |
| `public/globe.svg` | 1 | support/data/ui |
| `public/next.svg` | 1 | support/data/ui |
| `public/vercel.svg` | 1 | support/data/ui |
| `public/window.svg` | 1 | support/data/ui |

### root/config/docs

| File | Lines | Notes |
|---|---:|---|
| `.gitignore` | 41 | support/data/ui |
| `AGENTS.md` | 5 | support/data/ui |
| `CLAUDE.md` | 1 | support/data/ui |
| `G7_KITCHEN_OS_RUNTIME_COCKPIT_PHASE_2_AUDIT.md` | 729 | runtime, large file |
| `README.md` | 36 | support/data/ui |
| `eslint.config.mjs` | 18 | support/data/ui |
| `g7-mvp/.gitattributes` | 2 | support/data/ui |
| `next-env.d.ts` | 6 | support/data/ui |
| `next.config.ts` | 7 | support/data/ui |
| `package-lock.json` | 7135 | Supabase, large file |
| `package.json` | 31 | Supabase |
| `postcss.config.js` | 5 | support/data/ui |
| `postcss.config.mjs` | 7 | support/data/ui |
| `proxy.ts` | 6 | support/data/ui |
| `tailwind.config.js` | 11 | support/data/ui |
| `tsconfig.json` | 43 | support/data/ui |


## Final Verdict

The Kitchen OS is at a serious prototype stage. The strongest achievement is the architecture of a runtime cockpit combined with stage-specific AI decisions and early operator execution. The main danger is not UI quality; the UI is already strong. The main danger is runtime fragmentation. The next stage must unify the multiple stores and make every action an event. Once that happens, G7 Kitchen OS can move from prototype toward MVP.
