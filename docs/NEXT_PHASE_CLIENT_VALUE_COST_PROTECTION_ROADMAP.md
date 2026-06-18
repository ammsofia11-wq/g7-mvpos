# G7 Kitchen OS — Client Value, Control & Cost Protection Roadmap

## Current Lockpoint

Current confirmed lockpoint:

**Production Tasks Demo + Handoff Docs Completed**

Latest verified commits:

```txt
4d08f69 Add production tasks handoff docs
7ec8e72 Add live runtime handoff to production tasks
60ad4c9 Add production tasks entry to command
```

Current stable demo flow:

```txt
/demo-sale
→ /production-tasks
→ /worker-task
→ /kitchen
```

And:

```txt
/command
→ /production-tasks
→ /worker-task
→ /kitchen
```

Current product story:

```txt
Demand Lock
→ Station Tasks
→ Worker SOP
→ Completion Proof
→ Live Runtime Floor
```

---

# Protected Boundaries

Before any new code, these areas remain protected:

```txt
/kitchen
runtime stores
API
WorkerBoard
ProductionTimeline
ingredientDB
G7_RECIPES
homepage
```

No direct imports of protected recipe or ingredient assets into client pages.

Kitchen OS remains separate from Gym / PDF / Join.

G7 sells the operating system and runtime engine, not the founder’s private recipes, private numbers, or protected kitchen data.

---

# Main Client Value

G7 Kitchen OS should be presented to clients as a complete central kitchen control system.

The client should understand that G7 helps control:

```txt
Purchasing
Receiving
Supplier quality
Inventory
Ingredient yield
Recipe costing
Recipe standardization
SOPs
Prep tasks
Cooking tasks
Cooling
QA
Portioning
Packaging
Dispatch
Worker performance
Station pressure
Waste
Cost leakage
Savings
Management decisions
```

The core message:

**G7 gives the owner visibility and control over the heavy kitchen operation, not just recipes or dashboards.**

---

# Commercial Positioning

G7 is like a POS, but for central kitchen production.

A normal POS controls sales, orders, and payments.

G7 controls what happens after demand exists:

```txt
Demand
→ Production planning
→ Station tasks
→ Worker SOPs
→ Batch execution
→ QA gates
→ Cooling control
→ Portioning
→ Packaging
→ Dispatch
→ Live runtime visibility
→ Cost protection
```

---

# The 5 Big Client Promises

G7 should sell five major values:

```txt
1. Control the operation
2. Standardize the work
3. Reduce waste and cost leakage
4. Evaluate workers fairly
5. Help the kitchen scale without depending only on one person
```

---

# 1. Control the Operation

G7 should help the client see what is happening across the kitchen in real time.

The owner or manager should be able to see:

```txt
What needs to be produced today
Which station is active
Which station is delayed
Which batch is at risk
Which task is blocked
Which worker is assigned
Which recipe is being executed
Which QA gate is pending
Which production stage needs support
```

This turns the kitchen from verbal management into system-controlled execution.

---

# 2. Standardize the Work

G7 should help make every task clear and repeatable.

Each worker should see:

```txt
What to do
How to do it
Which SOP to follow
Which quality signs to check
Which mistakes to avoid
When to start
When to finish
What proof is required
```

The worker does not need to see sensitive costing or private business data.

The worker only sees the approved task and the instructions needed to execute correctly.

---

# 3. Reduce Waste and Cost Leakage

G7 should not only calculate recipe cost.

G7 should track where money is leaking inside the operation.

The system should follow the ingredient from purchase to final portion:

```txt
Purchased Weight
→ Received Weight
→ Cleaned / Trimmed Weight
→ Prep Weight
→ Cooked Weight
→ Portion Weight
→ Packed Weight
→ Waste / Loss
→ Cost Leakage
→ Savings Report
```

G7 should measure:

```txt
Purchase weight
Received weight
Supplier variance
Trim waste
Prep yield
Cooking yield
Cooling loss
Overproduction
Portioning error
Packaging loss
Final portion count
Actual batch cost
Expected batch cost
Cost variance
Lost portions
```

Example:

```txt
Recipe: Grilled Chicken
Raw Input: 10 kg
Expected Cooked Yield: 7.8 kg
Actual Cooked Yield: 7.4 kg
Expected Portions: 52
Actual Portions: 49
Lost Portions: 3
Cost Leakage: calculated automatically
```

The client should see:

```txt
Food cost leakage this month
Waste percentage by recipe
Waste percentage by station
Waste percentage by ingredient
Waste percentage by supplier
Lost portions by batch
Recipes above target cost
Stations with high waste
Workers needing training
Supplier yield comparison
Estimated savings opportunities
```

## Waste Benchmark Language

G7 should not promise a fixed saving percentage to every client.

Instead, G7 should show:

```txt
Your current waste baseline
Your current cost leakage
Your current yield loss
Your current lost portions
Your improvement target
Your actual savings after using G7
```

For sales/demo language, we can say:

```txt
Many kitchens can lose several percentage points of food cost through trim loss, cooking loss, overproduction, portioning mistakes, and supplier yield variance.

G7 helps measure this leakage and shows where the kitchen can reduce waste, protect margin, and improve food cost.
```

Possible client dashboard labels:

```txt
Current Waste Baseline
Target Waste Reduction
Actual Waste Reduction
Food Cost Protected
Cost Leakage Avoided
Lost Portions Recovered
Supplier Yield Improvement
```

---

# 4. Fair Worker Evaluation

G7 should help evaluate workers using real operational data, not personal opinion or favoritism.

This is important because many kitchens suffer from unfair evaluation, personal bias, or “wasta”.

G7 should create a fairer worker performance system based on measurable actions.

The system can evaluate:

```txt
Tasks completed
Tasks completed on time
SOP compliance
Quality rejection rate
Rework caused
Waste caused
Portion accuracy
Temperature log compliance
Hygiene checklist compliance
Repeated mistakes
Training improvement
Station teamwork
Ability to handle pressure
Escalations needed
```

The goal is not to punish workers.

The goal is to create fair visibility.

A worker should be evaluated by what they actually did, not by who likes them.

## Worker Score Example

```txt
Worker: Prep Cook A
Task Completion: 94%
On-Time Execution: 88%
SOP Compliance: 91%
QA Rejection Rate: 3%
Waste Variance: 2.1%
Training Needed: Knife trimming accuracy
Overall Status: Good, needs yield improvement
```

## Important Fairness Rule

G7 should not blame the worker automatically when the issue is outside their control.

The system should separate:

```txt
Worker mistake
Supplier quality issue
Equipment problem
Late demand change
Manager planning issue
Recipe standard issue
Station overload
```

This protects the worker and gives management a more honest view.

Commercial message:

**G7 helps create fair worker evaluation based on execution data, not favoritism.**

---

# 5. Scale Without Depending Only on One Person

Many kitchens depend too much on the head chef or one strong manager.

G7 should turn the chef’s operating knowledge into a system.

This helps the kitchen scale because:

```txt
SOPs are documented
Recipes are standardized
Tasks are clear
Workers can be trained faster
QA gates are visible
Production pressure is tracked
Management can see problems early
New branches can follow the same system
```

The value is not only today’s production.

The value is building a kitchen that can grow.

---

# Client Data Onboarding Center

G7 should support different levels of client readiness.

Some clients have Excel files.
Some have PDFs.
Some have paper sheets.
Some have photos.
Some have no organized data at all.

The onboarding options should be:

```txt
1. Import from Excel / CSV
2. Upload PDF / Paper / Photos
3. Build with AI Assistant
4. Start from G7 Templates
```

Example data types:

```txt
Ingredient List
Supplier List
Supplier Prices
Recipe Sheets
Menu Items
Nutrition Facts
Allergens
Packaging Rules
Station Mapping
Staff List
QA Checklists
Production Sheets
```

Import flow:

```txt
Client Uploads File
→ Column Mapping
→ Data Validation
→ Review Before Import
→ Save to Client Tenant Workspace
```

If the client has no SOPs, G7 should help build them.

---

# SOP Builder & Kitchen Knowledge Capture

Many kitchens do not have complete SOPs.

Some recipes exist only in the chef’s head.

G7 should help convert kitchen knowledge into structured SOPs.

SOP Builder flow:

```txt
Chef Interview
→ Guided Questions
→ AI SOP Draft
→ Chef Review
→ Approved SOP
→ Worker Task View
```

Questions the system should ask:

```txt
What is the dish name?
Which station prepares it?
What are the ingredients?
What is the prep method?
What is the cooking method?
What is the cooling method?
What are the quality signs?
What is the portion size?
What is the shelf life?
What is the storage temperature?
What packaging is used?
What mistakes should workers avoid?
```

Commercial message:

**Even if the kitchen has no complete SOPs today, G7 helps build them step by step from chef knowledge, paper sheets, recipes, and daily workflow.**

---

# Owner Dashboard Values

The owner should see business value clearly.

Possible dashboard sections:

```txt
Today’s Production Control
Food Cost Protection
Waste & Yield Intelligence
Worker Performance
Station Pressure
Supplier Performance
Recipe Cost Variance
QA & Rework
Savings Opportunities
```

Example owner metrics:

```txt
Food Cost Leakage Detected
Waste Reduced
Lost Portions Recovered
Batches Above Target Cost
QA Rejections Prevented
Overproduction Reduced
Best Supplier Yield
Worst Supplier Yield
Top 5 Recipes Losing Money
Top 5 Workers Needing Training
Stations Under Pressure
Estimated Monthly Savings
```

---

# Manager Dashboard Values

The production manager should see:

```txt
Active batches
Delayed batches
Blocked stages
Station workload
Worker assignment
Production progress
Escalations
Support needed
QA pending
Cooling pending
Packaging pending
Dispatch readiness
```

---

# Chef Dashboard Values

The chef should see:

```txt
Recipe execution accuracy
SOP compliance
Batch quality
Yield variance
Cooking loss
Prep loss
Portion accuracy
Worker skill gaps
Recipe improvement opportunities
```

---

# Purchasing Dashboard Values

The purchasing manager should see:

```txt
Supplier price comparison
Supplier yield comparison
Ingredient price movement
Receiving variance
Rejected items
Alternative suppliers
Cost impact by supplier
Best supplier by usable yield
```

The cheapest supplier is not always the best supplier.

G7 should show which supplier gives the best usable value after yield and quality.

---

# Storekeeper Dashboard Values

The storekeeper should see:

```txt
Received weight
Issued weight
Stock movement
Expiry risk
Storage temperature
Ingredient usage
Missing items
Over-issued items
Inventory variance
```

---

# QA Dashboard Values

QA should see:

```txt
Pending QA gates
Rejected batches
Rework reasons
Cooling compliance
Temperature checks
Packaging checks
Shelf-life compliance
Quality trend by recipe
Quality trend by station
```

---

# Worker Dashboard Values

The worker should see only what they need:

```txt
Assigned task
Approved SOP
Start button
Completion button
Required proof
Quality signs
Safety notes
What not to do
Training video or visual guide
```

The worker should not see:

```txt
Recipe costing
Supplier prices
Private business data
Full commercial margin
Protected internal numbers
```

---

# Why Clients Pay for G7

Clients do not pay only for screens.

Clients pay because G7 helps them:

```txt
Reduce waste
Protect food cost
Control workers fairly
Standardize recipes
Reduce rework
Improve QA
Train staff faster
Reduce dependency on verbal instructions
Compare suppliers by real yield
Find cost leakage early
Scale to new branches
Make kitchen operations visible
```

---

# Sales Message

G7 Kitchen OS helps a central kitchen move from:

```txt
Verbal management
Manual follow-up
Hidden waste
Unfair worker evaluation
Late food cost discovery
Chef-dependent execution
```

To:

```txt
System-controlled production
Visible tasks
Measured waste
Fair worker evaluation
Live cost leakage detection
Standardized SOP execution
Scalable kitchen operations
```

---

# Final Product Position

G7 Kitchen OS should be positioned as:

```txt
Central Kitchen Runtime OS
+
Client Data Onboarding System
+
SOP Builder
+
Food Cost Protection Engine
+
Fair Worker Performance System
```

This gives G7 a stronger commercial story:

**G7 controls the kitchen operation, protects food cost, reduces waste, standardizes SOPs, and evaluates workers fairly using real execution data.**

---

# Recommended Next Phase Order

The next phase should not touch `/kitchen` runtime yet.

The safest order is:

## Phase A — Roadmap Documentation

Document the complete client value direction:

```txt
Client Data Onboarding
SOP Builder
Cost Protection
Yield Intelligence
Fair Worker Evaluation
Full Operation Control
```

No code.

## Phase B — Read-only Audit

Review current project structure and decide where these features can live safely.

Possible future pages:

```txt
/client-onboarding
/import-center
/sop-builder
/cost-protection
/yield-intelligence
/worker-performance
/client-value
```

No code changes during audit.

## Phase C — Demo Polish

Improve the sales story around the current demo.

Focus on explaining:

```txt
Demand Lock
Station Tasks
Worker SOP
Completion Proof
Live Runtime Floor
Cost Protection
Client Onboarding
Fair Worker Evaluation
```

Avoid touching runtime.

## Phase D — Client Value Demo Page

Create a safe front-end-only page that explains why the client pays for G7.

Possible page:

```txt
/client-value
```

This page should be separate from runtime and should not import protected data.

## Phase E — Client Onboarding Demo Page

Create a safe demo page that explains how a client can start using G7.

Possible page:

```txt
/client-onboarding
```

## Phase F — Cost Protection Demo Page

Create a front-end-only demo showing:

```txt
Purchase weight
Prep yield
Cooking yield
Waste
Lost portions
Cost leakage
Savings report
```

No runtime store changes yet.

## Phase G — Worker Performance Demo Page

Create a front-end-only demo showing fair worker evaluation based on operational data.

No real HR decisions or payroll logic yet.

## Phase H — Runtime Integration Decision

Only after the demo pages and product logic are approved, decide whether to connect these layers to:

```txt
/kitchen
Recipe Studio
Production Tasks
Runtime stores
API
```

This should be a separate read-only decision before any code.

---

# Final Recommendation

The next safe roadmap step is:

**Create complete client value documentation first, then run a read-only audit before any new code.**

Recommended lockpoint name:

**Client Value + Cost Protection Roadmap Defined**

No code should start until the next implementation target is selected.
