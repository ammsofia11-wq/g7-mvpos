import Link from "next/link"

import {
  createAllKitchenCommandScenarioReports,
  summarizeKitchenCommandScenarioReport,
} from "../../ai/runtime-support-recommendation-scenarios"

const severityStyles = {
  LOW: "border-lime-300/25 bg-lime-300/[0.06] text-lime-200",
  MEDIUM: "border-amber-300/25 bg-amber-300/[0.06] text-amber-200",
  HIGH: "border-orange-300/25 bg-orange-300/[0.06] text-orange-200",
  CRITICAL: "border-red-300/25 bg-red-300/[0.06] text-red-200",
}

const typeLabels: Record<string, string> = {
  SUPPORT_MOVEMENT: "Support Movement",
  PRIORITIZE_BATCH: "Prioritize Batch",
  HOLD_RELEASE: "Hold Release",
  NO_SAFE_ACTION: "No Safe Action",
  MONITOR: "Monitor",
}

export default function KitchenCommandPreviewPage() {
  const reports = createAllKitchenCommandScenarioReports()
  const summaries = reports.map(summarizeKitchenCommandScenarioReport)

  const totalRecommendations = reports.reduce((total, report) => {
    return total + report.summary.recommendationsCount
  }, 0)

  const approvalRequiredCount = reports.filter((report) => {
    return report.recommendations.some((recommendation) => {
      return recommendation.approvalRequired
    })
  }).length

  const criticalOrHighCount = reports.filter((report) => {
    return report.summary.highestRisk === "CRITICAL" || report.summary.highestRisk === "HIGH"
  }).length

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
              Command OS - Executive Chef Runtime Preview
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white sm:text-5xl">
              Intelligent Kitchen Command OS
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              This command preview shows how G7 Kitchen OS reads production
              pressure, detects delayed stations, protects QA and release gates,
              and recommends safe support movement before decisions move into
              the live kitchen runtime floor.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/demo-sale"
                className="rounded-full bg-cyan-300 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#06111F] transition hover:bg-white"
              >
                Open Sellable Demo Journey
              </Link>

              <Link
                href="/production-tasks"
                className="rounded-full border border-lime-300/25 bg-lime-300/[0.08] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-lime-100 transition hover:bg-lime-300 hover:text-[#06111F]"
              >
                Open Production Tasks
              </Link>

              <Link
                href="/kitchen"
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                Open Live Runtime
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[420px] xl:grid-cols-4">
            <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
                Scenarios
              </p>
              <p className="mt-2 text-3xl font-black text-white">{reports.length}</p>
            </div>

            <div className="rounded-[22px] border border-lime-300/15 bg-lime-300/[0.06] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-lime-300">
                Actions
              </p>
              <p className="mt-2 text-3xl font-black text-white">{totalRecommendations}</p>
            </div>

            <div className="rounded-[22px] border border-amber-300/15 bg-amber-300/[0.06] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-300">
                Approval
              </p>
              <p className="mt-2 text-3xl font-black text-white">{approvalRequiredCount}</p>
            </div>

            <div className="rounded-[22px] border border-orange-300/15 bg-orange-300/[0.06] p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-300">
                High Risk
              </p>
              <p className="mt-2 text-3xl font-black text-white">{criticalOrHighCount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[30px] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.09),rgba(204,255,51,0.035))] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                Demo-Sale Entry Point
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
                Show the full G7 production story before opening runtime screens.
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
                Use the sellable demo journey to explain how G7 moves from Demand
                Lock to Recipe Runtime, Station Tasks, Worker SOP, Cooling Checks,
                QA Release, Packaging Readiness, and Command View.
              </p>
            </div>

            <Link
              href="/demo-sale"
              className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-300 hover:text-[#06111F]"
            >
              Open /demo-sale -&gt;
            </Link>
          </div>
        </section>

        <section className="rounded-[30px] border border-lime-300/15 bg-[linear-gradient(135deg,rgba(204,255,51,0.08),rgba(34,211,238,0.035))] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-lime-300">
                Production Tasks Entry Point
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
                Inspect how locked demand becomes station work before worker SOP.
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
                Open the production tasks bridge to review station workload,
                batch tasks, required proof, QA handoff, barcode identity, and
                the path into tablet-first worker execution.
              </p>
            </div>

            <Link
              href="/production-tasks"
              className="shrink-0 rounded-full border border-lime-300/30 bg-lime-300/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-lime-100 transition hover:bg-lime-300 hover:text-[#06111F]"
            >
              Open /production-tasks -&gt;
            </Link>
          </div>
        </section>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-[#07101d] p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
            Runtime Intelligence
          </p>
          <h2 className="mt-3 text-xl font-black tracking-[-0.04em] text-white">
            What the engine is checking
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Delayed station detection",
              "Time pressure calculation",
              "Station pressure scoring",
              "Available support worker selection",
              "QA / release gate protection",
              "Approval requirement",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
                <span className="text-sm font-bold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#07101d] p-5 lg:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
            Scenario Summary
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {summaries.map((summary) => (
              <div
                key={summary.scenarioId}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-black leading-5 text-white">
                    {summary.title}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${
                      severityStyles[summary.highestRisk]
                    }`}
                  >
                    {summary.highestRisk}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-white/8 bg-black/15 p-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Recommendation
                    </p>
                    <p className="mt-1 text-xs font-black text-cyan-100">
                      {summary.firstRecommendationType
                        ? typeLabels[summary.firstRecommendationType] ??
                          summary.firstRecommendationType
                        : "None"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-black/15 p-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Approval
                    </p>
                    <p className="mt-1 text-xs font-black text-amber-100">
                      {summary.approvalRequired ? "Required" : "Not required"}
                    </p>
                  </div>
                </div>

                {summary.firstRecommendationReason && (
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    {summary.firstRecommendationReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 space-y-4">
        {reports.map((report) => (
          <article
            key={report.scenarioId}
            className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
                  {report.scenarioId}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
                  {report.scenarioTitle}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {report.scenarioDescription}
                </p>
              </div>

              <div
                className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${
                  severityStyles[report.summary.highestRisk]
                }`}
              >
                Highest Risk: {report.summary.highestRisk}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
              <Metric label="Stages" value={report.summary.totalStages} />
              <Metric label="Delayed" value={report.summary.delayedStages} />
              <Metric label="Blocked" value={report.summary.blockedStages} />
              <Metric label="QA Protected" value={report.summary.qaProtectedStages} />
              <Metric label="Support Workers" value={report.summary.availableSupportWorkers} />
              <Metric label="Actions" value={report.summary.recommendationsCount} />
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {report.recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="rounded-[24px] border border-white/10 bg-[#06101d] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {recommendation.targetStation}
                      </p>

                      <h3 className="mt-1 text-lg font-black tracking-[-0.04em] text-white">
                        {recommendation.targetStageName}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${
                          severityStyles[recommendation.severity]
                        }`}
                      >
                        {recommendation.severity}
                      </span>

                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-100">
                        {typeLabels[recommendation.type] ?? recommendation.type}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {recommendation.reason}
                  </p>

                  {recommendation.supportMove && (
                    <div className="mt-4 rounded-[20px] border border-lime-300/20 bg-lime-300/[0.06] p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-lime-300">
                        Suggested support move
                      </p>

                      <p className="mt-2 text-sm font-black text-white">
                        {recommendation.supportMove.workerName} -&gt;{" "}
                        {recommendation.supportMove.toStation}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        From {recommendation.supportMove.fromStation ?? "source station"} for{" "}
                        {recommendation.supportMove.durationMinutes} minutes as{" "}
                        {recommendation.supportMove.supportRole}.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <InfoList title="Evidence" items={recommendation.evidence} />
                    <InfoList
                      title="Safe Limits"
                      items={recommendation.safeLimits}
                      tone="amber"
                    />
                  </div>

                  {recommendation.blockers.length > 0 && (
                    <div className="mt-3">
                      <InfoList title="Blockers" items={recommendation.blockers} tone="red" />
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <p className="text-xs font-bold text-slate-400">
                      Confidence:{" "}
                      <span className="font-black text-white">
                        {recommendation.confidence}%
                      </span>
                    </p>

                    <p className="text-xs font-bold text-slate-400">
                      Approval:{" "}
                      <span className="font-black text-amber-200">
                        {recommendation.approvalRequired
                          ? recommendation.approvalRoles.join(" / ")
                          : "Not required"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-5 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
          Runtime Control Readiness
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
          Ready to move from command intelligence into live runtime control
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
          This view gives owners and operators the decision layer before they
          open the live kitchen floor: scenario logic, risk, support movement,
          approval requirements, blockers, confidence, and safe limits stay
          visible before runtime action.
        </p>
      </section>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/15 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  )
}

function InfoList({
  title,
  items,
  tone = "cyan",
}: {
  title: string
  items: string[]
  tone?: "cyan" | "amber" | "red"
}) {
  const toneClass =
    tone === "red"
      ? "text-red-200"
      : tone === "amber"
        ? "text-amber-200"
        : "text-cyan-100"

  return (
    <div className="rounded-[18px] border border-white/10 bg-black/15 p-3">
      <p className={`text-[9px] font-black uppercase tracking-[0.18em] ${toneClass}`}>
        {title}
      </p>

      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-5 text-slate-400">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
