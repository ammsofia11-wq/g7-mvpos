"use client";

import { useEffect, useMemo, useState } from "react";
import {
  activatePilotBatch,
  completePilotTask,
  getPilotProgress,
  getPilotReport,
  holdPilotTask,
  isTaskCompleteAllowed,
  loadPilotState,
  markTrolleyReady,
  masterDispatchPilot,
  PILOT_OUTPUT_FIELDS,
  reopenPilotTask,
  recordPilotCheckpoint,
  resetPilotState,
  saveTaskOutput,
  startPilotTask,
  updateInventoryItem,
} from "@/lib/g7-real-pilot-runtime";
import type {
  PilotInventoryItem,
  PilotState,
  PilotTask,
  RealPilotMode,
} from "@/lib/g7-real-pilot-runtime";

type RealPilotWorkspaceProps = {
  mode: RealPilotMode;
};

export default function RealPilotWorkspace({ mode }: RealPilotWorkspaceProps) {
  const [state, setState] = useState<PilotState | null>(null);

  useEffect(() => {
    setState(loadPilotState());

    const sync = () => setState(loadPilotState());

    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const report = useMemo(() => {
    if (!state) {
      return null;
    }

    return getPilotReport(state);
  }, [state]);

  if (!state || !report) {
    return (
      <section className="mx-auto max-w-7xl py-10">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7 text-white">
          Loading Real Pilot Workspace...
        </div>
      </section>
    );
  }

  const updateState = (nextState: PilotState) => {
    setState(nextState);
  };

  return (
    <section className="mx-auto max-w-7xl border-t border-white/10 py-12">
      <div className="rounded-[2.2rem] border border-cyan-300/25 bg-[#06131f] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-8">
        <PilotHeader state={state} mode={mode} />

        {mode === "head-chef" && (
          <HeadChefConsole state={state} onChange={updateState} />
        )}

        {mode === "inventory" && (
          <InventoryBoard state={state} onChange={updateState} />
        )}

        {mode === "worker" && (
          <WorkerBoard state={state} onChange={updateState} />
        )}

        <PilotRunReport state={state} />

        <EventLog state={state} />

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-400">
            Independent localStorage pilot runtime. Does not touch kitchen
            runtime, WorkerBoard, ProductionTimeline, API, ingredientDB, or
            G7_RECIPES.
          </p>

          <button
            type="button"
            onClick={() => {
              const confirmed = window.confirm(
                "Reset Real Pilot session QD-BC-100?",
              );

              if (confirmed) {
                updateState(resetPilotState());
              }
            }}
            className="rounded-full border border-red-300/30 bg-red-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-100 transition hover:bg-red-500/20"
          >
            Reset Real Pilot Session
          </button>
        </div>
      </div>
    </section>
  );
}

function PilotHeader({
  state,
  mode,
}: {
  state: PilotState;
  mode: RealPilotMode;
}) {
  const progress = getPilotProgress(state);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.32em] text-cyan-200">
          G7-REAL-PILOT-CORE-1A
        </p>

        <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
          Real Pilot Operating Workspace
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
          Q Diet Butter Chicken with Basmati Rice is now controlled as a real
          pilot batch. Head Chef releases once, then Inventory, Butchery, Prep,
          Cooking, QA, Cooling, Fridge, and Packaging move by gates.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge label={`Mode: ${mode}`} />
          <Badge label={`Batch: ${state.batch.id}`} />
          <Badge label={`Status: ${state.batch.status}`} />
          <Badge label={`Progress: ${progress}%`} />
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
          Locked Product Numbers
        </p>

        <div className="mt-4 grid gap-3 text-sm">
          <Metric label="Batch quantity" value={`${state.product.meals} meals`} />
          <Metric label="Raw chicken issue" value="15kg" />
          <Metric label="Expected cooked chicken" value="8.25kg" />
          <Metric label="Sauce batch" value="8kg" />
          <Metric label="Raw rice issue" value="4.5kg" />
          <Metric label="Cooked rice target" value="12kg" />
          <Metric label="Packaging" value={state.product.packaging} />
        </div>

        <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            Appearance Rule
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-50">
            {state.product.appearanceRule}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeadChefConsole({
  state,
  onChange,
}: {
  state: PilotState;
  onChange: (state: PilotState) => void;
}) {
  return (
    <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
        Head Chef Console
      </p>

      <h3 className="mt-3 text-2xl font-black text-white">
        Create / Activate Batch → Master Dispatch
      </h3>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
        This is the real operating rule: the Head Chef activates QD-BC-100 once,
        then releases the full role-based production flow through Master
        Dispatch. No manual role switching and no task-by-task sending.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ActionCard
          title="1. Batch Created"
          text="QD-BC-100 is seeded as a controlled pilot batch for 100 meals."
          status="Ready"
        />

        <ActionCard
          title="2. Activate Batch"
          text="Move the batch from draft into active production control."
          status={state.batch.status === "DRAFT" ? "Action needed" : "Done"}
        />

        <ActionCard
          title="3. Master Dispatch"
          text="Release Storekeeper and all dependent station tasks once."
          status={
            state.batch.status === "ACTIVE"
              ? "Action needed"
              : state.batch.status === "DRAFT"
                ? "Waiting"
                : "Done"
          }
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={state.batch.status !== "DRAFT"}
          onClick={() => onChange(activatePilotBatch(state))}
          className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Activate QD-BC-100
        </button>

        <button
          type="button"
          disabled={state.batch.status !== "ACTIVE"}
          onClick={() => onChange(masterDispatchPilot(state))}
          className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Master Dispatch / Release Production Flow
        </button>
      </div>
    </div>
  );
}

function InventoryBoard({
  state,
  onChange,
}: {
  state: PilotState;
  onChange: (state: PilotState) => void;
}) {
  const isDispatched =
    state.batch.status !== "DRAFT" && state.batch.status !== "ACTIVE";
  const storeIssueCompleted = state.tasks.some(
    (task) => task.id === "store_issue" && task.status === "COMPLETED",
  );

  return (
    <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
            Pilot Issue / Trolley Board
          </p>

          <h3 className="mt-3 text-2xl font-black text-white">
            Storekeeper issue for QD-BC-100
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            Inventory receives the pilot issue only after Head Chef Master
            Dispatch. Actual issue quantities are recorded here and flow into
            the Pilot Run Report.
          </p>
        </div>

        <Badge label={isDispatched ? "Dispatch received" : "Waiting for dispatch"} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {state.inventory.map((item) => (
          <InventoryItemCard
            key={item.id}
            item={item}
            disabled={!isDispatched}
            onIssue={(actualQty) =>
              onChange(updateInventoryItem(state, item.id, actualQty))
            }
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!isDispatched || storeIssueCompleted}
          onClick={() => onChange(markTrolleyReady(state))}
          className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {storeIssueCompleted
            ? "Pilot Trolley Already Ready"
            : "Mark Pilot Trolley Ready"}
        </button>
      </div>
    </div>
  );
}

function InventoryItemCard({
  item,
  disabled,
  onIssue,
}: {
  item: PilotInventoryItem;
  disabled: boolean;
  onIssue: (actualQty: number) => void;
}) {
  const [value, setValue] = useState(String(item.actualQty ?? item.plannedQty));

  useEffect(() => {
    setValue(String(item.actualQty ?? item.plannedQty));
  }, [item.actualQty, item.plannedQty]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">{item.name}</p>

          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
            Planned: {item.plannedQty} {item.unit}
          </p>
        </div>

        <StatusBadge status={item.status} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-bold text-white outline-none focus:border-cyan-300/50 disabled:opacity-40"
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => onIssue(Number(value))}
          className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Issue
        </button>
      </div>
    </div>
  );
}

function WorkerBoard({
  state,
  onChange,
}: {
  state: PilotState;
  onChange: (state: PilotState) => void;
}) {
  return (
    <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
        Real Pilot Worker Task Flow
      </p>

      <h3 className="mt-3 text-2xl font-black text-white">
        Role-based tasks unlocked by gates
      </h3>

      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
        Workers do not switch roles manually. Each task becomes ready only when
        its dependency is complete. QA, Cooling, Fridge, Packaging, and Final QA
        are protected gates.
      </p>

      <div className="mt-6 grid gap-4">
        {state.tasks.map((task) => (
          <TaskCard
            key={task.id}
            state={state}
            task={task}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  state,
  task,
  onChange,
}: {
  state: PilotState;
  task: PilotTask;
  onChange: (state: PilotState) => void;
}) {
  const fields = PILOT_OUTPUT_FIELDS[task.id] ?? [];
  const canStart = task.status === "READY";
  const canComplete =
    (task.status === "READY" || task.status === "IN_PROGRESS") &&
    isTaskCompleteAllowed(task);
  const checkpointCount = Number(task.outputs.checkpoint_count ?? 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={`${String(task.order).padStart(2, "0")} · ${task.role}`} />
            <StatusBadge status={task.status} />
            {task.gateType && <Badge label={task.gateType} />}
          </div>

          <h4 className="mt-3 text-xl font-black text-white">{task.title}</h4>

          <p className="mt-2 text-sm font-bold text-cyan-100">
            {task.station} · {task.module}
          </p>

          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 md:grid-cols-2">
            {task.instructions.map((instruction) => (
              <li key={instruction} className="rounded-xl bg-black/20 px-3 py-2">
                {instruction}
              </li>
            ))}
          </ul>

          {task.dependsOn.length > 0 && (
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
              Depends on: {task.dependsOn.join(", ")}
            </p>
          )}

          <TimingPlan task={task} checkpointCount={checkpointCount} />
        </div>

        <div className="flex min-w-[180px] flex-col gap-2">
          <button
            type="button"
            disabled={!canStart}
            onClick={() => onChange(startPilotTask(state, task.id, task.role))}
            className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start
          </button>

          {task.timing && (
            <button
              type="button"
              disabled={task.status !== "IN_PROGRESS"}
              onClick={() =>
                onChange(recordPilotCheckpoint(state, task.id, task.role))
              }
              className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Record Checkpoint
            </button>
          )}

          <button
            type="button"
            disabled={!canComplete}
            onClick={() =>
              onChange(completePilotTask(state, task.id, task.role))
            }
            className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Complete Task
          </button>

          <button
            type="button"
            disabled={task.status === "LOCKED" || task.status === "COMPLETED"}
            onClick={() => onChange(holdPilotTask(state, task.id, task.role))}
            className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-amber-100 transition hover:bg-amber-300/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Hold
          </button>

          <button
            type="button"
            disabled={task.status === "LOCKED"}
            onClick={() => onChange(reopenPilotTask(state, task.id, task.role))}
            className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reopen
          </button>
        </div>
      </div>

      {fields.length > 0 && (
        <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                {field.label}
              </span>

              <div className="mt-2 flex gap-2">
                <input
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  value={String(task.outputs[field.key] ?? "")}
                  disabled={
                    task.status === "LOCKED" || task.status === "COMPLETED"
                  }
                  onChange={(event) =>
                    onChange(
                      saveTaskOutput(
                        state,
                        task.id,
                        field.key,
                        field.type === "number"
                          ? Number(event.target.value)
                          : event.target.value,
                      ),
                    )
                  }
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-bold text-white outline-none focus:border-cyan-300/50 disabled:opacity-40"
                />

                {field.unit && (
                  <span className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-black text-slate-300">
                    {field.unit}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function TimingPlan({
  task,
  checkpointCount,
}: {
  task: PilotTask;
  checkpointCount: number;
}) {
  if (!task.timing) {
    return null;
  }

  const startedAt = task.outputs.started_at
    ? formatDateTime(String(task.outputs.started_at))
    : "Not started";
  const nextCheckpointAt = task.outputs.next_checkpoint_at
    ? formatDateTime(String(task.outputs.next_checkpoint_at))
    : "Waiting for start";
  const lastCheckpointAt = task.outputs.last_checkpoint_at
    ? formatDateTime(String(task.outputs.last_checkpoint_at))
    : "No checkpoint yet";

  return (
    <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-100">
            Timed Cooking / Worker Availability
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-50">
            {task.timing.monitoringNotes}
          </p>
        </div>

        <StatusBadge status={task.timing.attentionLevel.split("_").join(" ")} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Active work"
          value={String(task.timing.activeMinutes) + " min"}
        />
        <Metric
          label="Passive cook / hold"
          value={String(task.timing.passiveMinutes) + " min"}
        />
        <Metric
          label="Checkpoint every"
          value={
            task.timing.checkpointEveryMinutes
              ? String(task.timing.checkpointEveryMinutes) + " min"
              : "Not required"
          }
        />
        <Metric label="Checkpoint count" value={String(checkpointCount)} />
        <Metric label="Started at" value={startedAt} />
        <Metric label="Last checkpoint" value={lastCheckpointAt} />
        <Metric label="Next checkpoint" value={nextCheckpointAt} />
        <Metric
          label="Worker status"
          value={
            task.timing.canWorkerTakeAnotherTask
              ? "Can take compatible task"
              : "Stay on task"
          }
        />
      </div>

      {task.timing.nextBestTasks.length > 0 && (
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {task.timing.nextBestTasks.map((nextTask) => (
            <div
              key={nextTask}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-bold text-amber-50"
            >
              {nextTask}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PilotRunReport({ state }: { state: PilotState }) {
  const report = getPilotReport(state);

  return (
    <div className="mt-8 rounded-[1.8rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-100">
        Pilot Run Report
      </p>

      <h3 className="mt-3 text-2xl font-black text-white">
        Actual vs planned production control
      </h3>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Progress" value={`${report.progress}%`} />
        <Metric label="Planned meals" value={`${report.plannedMeals}`} />
        <Metric
          label="Packed meals"
          value={formatValue(report.packedMeals, "meals")}
        />
        <Metric
          label="Packaging variance"
          value={formatValue(report.packagingVariance, "meals")}
        />
        <Metric
          label="Chicken issued"
          value={formatValue(report.actualChickenIssued, "kg")}
        />
        <Metric
          label="Cooked chicken"
          value={formatValue(report.cookedChicken, "kg")}
        />
        <Metric
          label="Chicken variance"
          value={formatValue(report.chickenVarianceKg, "kg")}
        />
        <Metric
          label="Sauce final"
          value={formatValue(report.sauceFinal, "kg")}
        />
        <Metric
          label="Sauce variance"
          value={formatValue(report.sauceVarianceKg, "kg")}
        />
        <Metric
          label="Cooked rice"
          value={formatValue(report.cookedRice, "kg")}
        />
        <Metric
          label="Rice variance"
          value={formatValue(report.riceVarianceKg, "kg")}
        />
        <Metric
          label="Fridge location"
          value={report.fridgeLocation ?? "Pending"}
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <ActionCard
          title="QA Modules Decision"
          text={report.qaDecision ?? "Pending QA decision"}
          status={report.qaDecision ?? "Pending"}
        />

        <ActionCard
          title="Final QA Decision"
          text={report.finalDecision ?? "Pending final QA"}
          status={report.finalDecision ?? "Pending"}
        />
      </div>
    </div>
  );
}

function EventLog({ state }: { state: PilotState }) {
  return (
    <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
        Pilot Event Log
      </p>

      <div className="mt-4 grid max-h-[360px] gap-3 overflow-y-auto pr-1">
        {state.events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-black text-white">{event.action}</p>

              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                {new Date(event.at).toLocaleString()}
              </p>
            </div>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
              {event.actor}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {event.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-base font-black text-white">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  text,
  status,
}: {
  title: string;
  text: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071a27] p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-black text-white">{title}</h4>

        <StatusBadge status={status} />
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-100">
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
      {status}
    </span>
  );
}

function formatDateTime(value: string): string {
  if (!value) {
    return "Pending";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatValue(value: number | string | null, unit?: string): string {
  if (value === null || value === undefined || value === "") {
    return "Pending";
  }

  return unit ? `${value} ${unit}` : String(value);
}