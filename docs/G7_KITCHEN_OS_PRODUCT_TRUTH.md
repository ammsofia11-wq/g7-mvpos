# G7 Kitchen OS Product Truth

## LOCKPOINT

This document is the fixed product truth for G7 Kitchen OS.

Before judging, rebuilding, cleaning, refactoring, or renaming any page, route, component, data model, or workflow, check this document first.

---

## 1. Product Separation

G7 Kitchen OS is separate from the Gym / PDF / Join legacy layer.

Likely Gym / PDF / Join legacy pages:

* `app/admin-generate/page.tsx`
* `app/join/page.tsx`
* `app/pdf-preview/page.tsx`

These pages must stay isolated from Kitchen OS unless explicitly scoped.

Kitchen OS must not be judged as Gym/PDF only because it contains program names, meal categories, calories, protein, carbs, or fat.

---

## 2. What G7 Kitchen OS Sells

G7 sells the operating system, not Ahmed's private recipes or real kitchen numbers.

G7 Kitchen OS sells:

* Recipe builder
* Program architecture
* Master dish and component variant engine
* SOP builder
* Visual SOP steps
* Production reports engine
* Station task assignment
* Worker mobile/tablet execution
* Batch tracking
* Cooling checks
* QA gates
* Barcode and fridge location tracking
* Packaging workflow
* Inventory and procurement logic
* Tenant settings
* Runtime command system

G7 does not automatically give clients Ahmed's proprietary recipes, costs, menus, grocery logic, portion rules, photos, videos, SOPs, or operational numbers.

---

## 3. Protected Internal Data

Ahmed's real data is protected internal/demo/reference data.

This includes:

* Real recipes
* Real menus
* Real portions
* Real grocery reports
* Real ingredient alternatives
* Real production logic
* Real cost assumptions
* Real SOP knowledge
* Real photos and videos
* Real operational numbers

This data may be used for development, testing, demos, and proof of concept, but must not be treated as default client-owned data.

---

## 4. Tenant Data Principle

A client kitchen should receive an empty or safe-sample tenant.

The client enters or imports their own:

* Recipes
* Ingredients
* Suppliers
* Costs
* Menus
* Program lines
* Nutrition facts
* Portion sizes
* Yield data
* SOPs
* Photos
* Videos
* Staff
* Stations
* Packaging rules
* QA rules
* Operational numbers

The system must be country-agnostic and tenant-driven.

No hard-coded currency, country, timezone, locale, or client-specific operational data.

---

## 5. Program Lines Are Not Automatically Legacy

Program names such as Fat Loss, Keto, Diabetic, Vegan, GF & DF, Athlete, Classic, Balanced, or similar are not automatically Gym/PDF contamination.

In a healthy central kitchen, these can be real production program lines.

They are valid when used as:

* Menu architecture
* Recipe eligibility
* Production demand
* Portion rules
* Nutrition metadata
* Label validation
* Batch planning
* Station workload
* Packaging rules

They are wrong only when presented as:

* Gym UI
* PDF meal plan UI
* Customer diet journey UI
* Save-a-meal-system UI
* Macro cards disconnected from kitchen execution

---

## 6. Nutrition Data Is Valid Metadata

Calories, protein, carbs, and fat are valid recipe/menu metadata.

They may be used for:

* Recipe Studio
* Nutrition validation
* Program eligibility
* Customer-facing menu data
* Label/sticker data
* Portion validation
* QA checks

They should not dominate the Kitchen OS dashboard as if the dashboard is a diet-plan generator.

---

## 7. Core G7 Architecture

The core architecture is:

Master Dish
→ Component Slots
→ Program Variants
→ Portion/Yield Rules
→ Nutrition/Cost Recalculation
→ SOP Visual Steps
→ Batch Rules
→ Cooling Checks
→ QA Gates
→ Packaging Rules
→ Runtime Worker Tasks

One master dish can serve multiple programs by controlled swaps:

* Carb base
* Sauce
* Fat source
* Bread or wrap
* Side component
* Portion size
* Packaging format

This is a core G7 advantage.

---

## 8. Worker Execution Promise

G7 must convert real kitchen knowledge into a system that works anywhere.

A trained or new worker should be able to log in on mobile/tablet and see:

* Assigned station
* Assigned tasks
* Dish/component/batch to execute
* Start button
* Step-by-step SOP
* Photos for each movement
* Short videos for key actions
* Prep instructions
* Cutting instructions
* Cooking method
* Temperature checks
* Cooling steps
* Barcode scan
* Fridge/storage location
* Portioning instructions
* Packing instructions
* Sealing/label handoff
* QA or supervisor escalation

The system must reduce dependency on specific people.

---

## 9. Kitchen Operations Scope

G7 Kitchen OS controls kitchen operations from supplier to customer handoff inside the operation.

Scope includes:

* Approved suppliers
* Receiving
* Store / inventory
* Grocery and butchery prep
* Thawing
* Prep and marinades
* Component production
* Cooking
* Cooling
* QA
* Portioning
* Packaging
* Barcode and fridge location
* Dispatch readiness
* Customer-order fulfillment handoff

Customer app selection, final delivery routing, and external PDF/admin/sticker systems are separate unless explicitly scoped.

Kitchen OS consumes locked demand as operational input.

---

## 10. Daily Production Reality

In healthy meal-prep central kitchens, customers may subscribe for 1 to 4 weeks and choose/change meals until a daily lock time, for example 9 AM.

After demand lock, Kitchen OS should convert selections into operational reports and tasks:

* Full menu dish count report
* Program/plan demand report
* Size split report
* Grocery/butchery report
* Prep report
* Cooking report
* Sauce/dressing report
* Bakery report
* Pastry report
* Packaging report
* Batch/fridge/barcode report
* Dispatch readiness handoff

These should become digital station tasks, not static PDF-style displays.

---

## 11. Page Evaluation Rule

Before judging any page, ask:

Is this using plans/macros as valid kitchen production metadata?

Or is it using them as old Gym/PDF/customer meal-plan UI?

Valid Kitchen OS pages should be tied to:

* Demand
* Stations
* Tasks
* Batches
* SOPs
* QA
* Cooling
* Packaging
* Inventory
* Workforce
* Barcode/fridge location
* Handoff

---

## 12. Coding Rules

* Full-file replacement only.
* No partial patches.
* No search/replace patches.
* Do not touch WorkerBoard, ProductionTimeline, runtime stores, API, ingredientDB, or G7_RECIPES unless explicitly requested.
* Do not directly import G7_RECIPES or ingredientDB inside client pages.
* Keep the system global and country-agnostic.
* Use tenant settings for currency, country, locale, timezone, and units.

---

## 13. Current Separation Target

Legacy Gym/PDF/Join layer should be isolated from Kitchen OS.

Likely legacy routes:

* `/admin-generate`
* `/join`
* `/pdf-preview`

Kitchen OS routes should not depend on these routes unless explicitly designed.

---

## Final Rule

G7 Kitchen OS is not a PDF generator and not a gym diet-plan app.

G7 Kitchen OS is a central-kitchen operating system that turns culinary knowledge, recipe architecture, production demand, SOPs, workers, QA, inventory, packaging, and runtime execution into a repeatable system that can run in any country and any kitchen.
