"use client"

import { useState } from "react"
import {
  INVENTORY,
  generateProcurementRecommendations,
  generateSmartProcurementForecast,
  generateWeeklyInventoryConsumption,
  getEstimatedProcurementCost,
  getInventoryValue,
  getLowStockItems,
  getProjectedInventoryValueAfterWeeklyUsage,
  getUrgentProcurementItems,
  getWeeklyUsage,
} from "@/app/ai/g7-inventory-engine"

const suppliers = [
  {
    name: "Prime Poultry",
    category: "Protein",
    leadTime: "24h",
    score: "96%",
  },
  {
    name: "Fresh Farm",
    category: "Vegetables",
    leadTime: "12h",
    score: "92%",
  },
  {
    name: "Dairy Pro",
    category: "Dairy",
    leadTime: "48h",
    score: "88%",
  },
]

export default function InventoryPage() {
  const [showSheet, setShowSheet] = useState(false)

  const inventoryItems = generateWeeklyInventoryConsumption()
  const procurementList = generateProcurementRecommendations()
  const urgentItems = getUrgentProcurementItems()
  const forecast = generateSmartProcurementForecast()

  const totalItems = INVENTORY.length
  const lowStock = getLowStockItems().length
  const weeklyUsage = getWeeklyUsage()
  const totalInventoryCost = getInventoryValue()
  const projectedValue = getProjectedInventoryValueAfterWeeklyUsage()
  const procurementCost = getEstimatedProcurementCost()

  const downloadProcurementCSV = () => {
    const headers = [
      "Ingredient",
      "Supplier",
      "Required Order",
      "Unit",
      "Estimated Cost",
      "Priority",
      "Reason",
      "AI Action",
    ]

    const rows = procurementList.map((item) => [
      item.name,
      item.supplier,
      item.requiredOrder,
      item.unit,
      item.estimatedOrderCost.toFixed(2),
      item.priority,
      item.reason,
      item.recommendedAction,
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.setAttribute("download", "g7-procurement-sheet.csv")

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-4">
        <section className="rounded-[22px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(255,255,255,0.025))] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                G7 Inventory OS
              </p>

              <h1 className="mt-2 text-[30px] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-[38px]">
                Inventory &
                <span className="block text-cyan-300">
                  Procurement Intelligence
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-[12px] leading-5 text-slate-300">
                AI-powered inventory simulation, procurement forecasting,
                supplier pressure analysis, and autonomous purchasing workflow.
              </p>
            </div>

            <div className="rounded-[18px] border border-cyan-300/20 bg-cyan-300/10 px-4 py-3">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-300">
                Procurement Mode
              </p>

              <p className="mt-1 text-sm font-black text-white">
                AI Purchasing Active
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 md:grid-cols-5">
          <StatCard label="Total Ingredients" value={totalItems} />
          <StatCard label="Low Stock Items" value={lowStock} />
          <StatCard label="Weekly Usage" value={`${weeklyUsage} kg`} />
          <StatCard
            label="Inventory Value"
            value={`$${totalInventoryCost.toFixed(2)}`}
          />
          <StatCard
            label="Procurement Cost"
            value={`$${procurementCost.toFixed(2)}`}
          />
        </section>

        <section className="mt-3 rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.05] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                AI Forecast Intelligence
              </p>

              <h2 className="mt-1 text-[24px] font-black leading-none tracking-[-0.04em] text-white">
                Smart Procurement Forecasting
              </h2>
            </div>

            <div className="rounded-full border border-cyan-300/20 bg-black/20 px-4 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-300">
              Forecast Engine Active
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-4">
            <ForecastCard
              label="Next Week Demand"
              value={`${forecast.nextWeekDemand} kg`}
            />
            <ForecastCard
              label="Predicted Procurement"
              value={`$${forecast.predictedProcurementCost.toFixed(2)}`}
            />
            <ForecastCard
              label="Monthly Projection"
              value={`$${forecast.monthlyProjectedProcurementCost.toFixed(2)}`}
            />
            <ForecastCard
              label="Budget Buffer"
              value={`$${forecast.recommendedBudgetBuffer.toFixed(2)}`}
            />
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.7fr_0.7fr_1.3fr]">
            <ForecastInsight
              title="Highest Consumption"
              value={`${forecast.highestConsumptionIngredient} • ${forecast.highestConsumptionValue}kg`}
            />
            <ForecastInsight title="Waste Risk" value={forecast.wasteRisk} />
            <ForecastInsight
              title="Supplier Pressure"
              value={forecast.supplierPressure}
            />
            <ForecastInsight
              title="Forecast Status"
              value={forecast.forecastStatus}
            />
          </div>
        </section>

        <section className="mt-3 grid gap-4 xl:grid-cols-[1fr_300px]">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Consumption Engine
                </p>

                <h2 className="mt-1 text-[22px] font-black leading-none tracking-[-0.04em] text-white">
                  Weekly Inventory Simulation
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] font-bold text-slate-400">
                Live operational sync
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-white/10">
              <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_0.8fr_0.8fr] bg-white/[0.04] px-3 py-2 text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
                <div>Ingredient</div>
                <div>Stock</div>
                <div>Usage</div>
                <div>Remaining</div>
                <div>Order</div>
                <div>Status</div>
              </div>

              {inventoryItems.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_0.8fr_0.8fr] border-t border-white/10 px-3 py-2.5 text-[12px]"
                >
                  <div>
                    <p className="font-black text-white">{item.name}</p>
                    <p className="mt-0.5 text-[9px] font-bold text-slate-500">
                      ${item.costPerUnit.toFixed(2)} / {item.unit}
                    </p>
                  </div>

                  <div className="font-black text-white">
                    {item.stock} {item.unit}
                  </div>

                  <div className="font-bold text-slate-400">
                    {item.weeklyUsage} {item.unit}
                  </div>

                  <div className="font-bold text-cyan-300">
                    {item.projectedRemaining} {item.unit}
                  </div>

                  <div className="font-black text-amber-300">
                    {item.requiredOrder} {item.unit}
                  </div>

                  <div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-3">
            <Panel title="Urgent Procurement">
              <div className="space-y-2">
                {urgentItems.length === 0 ? (
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-3 text-[11px] leading-5 text-slate-400">
                    No urgent purchasing required.
                  </div>
                ) : (
                  urgentItems.map((item) => (
                    <AlertCard
                      key={item.name}
                      title={item.name}
                      text={item.reason}
                      status={item.priority}
                    />
                  ))
                )}
              </div>
            </Panel>

            <Panel title="Inventory Forecast">
              <div className="space-y-2">
                <ForecastRow
                  label="Current Inventory"
                  value={`$${totalInventoryCost.toFixed(2)}`}
                />
                <ForecastRow
                  label="Projected Value"
                  value={`$${projectedValue.toFixed(2)}`}
                />
                <ForecastRow
                  label="Procurement Needed"
                  value={`$${procurementCost.toFixed(2)}`}
                />
              </div>
            </Panel>
          </aside>
        </section>

        <section className="mt-3 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Supplier Intelligence
            </p>

            <h2 className="mt-1 text-[22px] font-black leading-none tracking-[-0.04em] text-white">
              Procurement Matrix
            </h2>

            <div className="mt-3 grid gap-2">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.name}
                  className="rounded-[16px] border border-white/10 bg-black/20 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[12px] font-black text-white">
                        {supplier.name}
                      </h3>

                      <p className="mt-1 text-[10px] font-bold text-slate-500">
                        {supplier.category} • Lead time {supplier.leadTime}
                      </p>
                    </div>

                    <div className="rounded-[12px] border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-right">
                      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-cyan-300">
                        Score
                      </p>

                      <p className="text-xs font-black text-white">
                        {supplier.score}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.06] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  AI Procurement Engine
                </p>

                <h2 className="mt-1 text-[22px] font-black leading-none tracking-[-0.04em] text-white">
                  Autonomous Purchasing
                </h2>
              </div>

              <div className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-red-300">
                {urgentItems.length} urgent
              </div>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {procurementList.map((item) => (
                <div
                  key={item.name}
                  className="rounded-[16px] border border-white/10 bg-black/20 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[12px] font-black text-white">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[9px] font-bold text-slate-500">
                        {item.supplier}
                      </p>
                    </div>

                    <PriorityBadge priority={item.priority} />
                  </div>

                  <div className="mt-3 space-y-2">
                    <ProcurementRow
                      label="Order"
                      value={`${item.requiredOrder} ${item.unit}`}
                    />
                    <ProcurementRow
                      label="Cost"
                      value={`$${item.estimatedOrderCost.toFixed(2)}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button
                onClick={() => setShowSheet(true)}
                className="w-full rounded-full bg-cyan-300 px-5 py-3 text-xs font-black text-[#001018] transition hover:scale-[1.01]"
              >
                Generate AI Procurement Sheet
              </button>

              <button
                onClick={downloadProcurementCSV}
                className="w-full rounded-full border border-cyan-300/30 bg-white/[0.04] px-5 py-3 text-xs font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-[#001018]"
              >
                Download Procurement CSV
              </button>
            </div>
          </div>
        </section>

        {showSheet && (
          <section className="mt-3 rounded-[24px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Generated Sheet
                </p>

                <h2 className="mt-1 text-[24px] font-black leading-none tracking-[-0.05em] text-white">
                  AI Procurement Sheet
                </h2>
              </div>

              <button
                onClick={() => setShowSheet(false)}
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-black text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
              >
                Close Sheet
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-[18px] border border-white/10">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr_1.3fr] bg-white/[0.04] px-3 py-2 text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
                <div>Ingredient</div>
                <div>Order</div>
                <div>Cost</div>
                <div>Priority</div>
                <div>Supplier Action</div>
              </div>

              {procurementList.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr_1.3fr] border-t border-white/10 px-3 py-2.5 text-[12px]"
                >
                  <div className="font-black text-white">{item.name}</div>

                  <div className="font-bold text-cyan-300">
                    {item.requiredOrder} {item.unit}
                  </div>

                  <div className="font-bold text-white">
                    ${item.estimatedOrderCost.toFixed(2)}
                  </div>

                  <div>
                    <PriorityBadge priority={item.priority} />
                  </div>

                  <div className="font-bold leading-5 text-slate-300">
                    {item.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[21px] font-black leading-none tracking-[-0.03em] text-white">
        {value}
      </p>
    </div>
  )
}

function ForecastCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[22px] font-black leading-none tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}

function ForecastInsight({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-[12px] font-black leading-5 text-white">
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const active =
    status === "CRITICAL"
      ? "border-red-400/30 bg-red-400/10 text-red-300"
      : status === "RESTOCK"
        ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
        : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {status}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const active =
    priority === "URGENT"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : priority === "HIGH"
        ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
        : priority === "MEDIUM"
          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {priority}
    </span>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-3 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
        {title}
      </p>

      <div className="mt-3">{children}</div>
    </div>
  )
}

function AlertCard({
  title,
  text,
  status,
}: {
  title: string
  text: string
  status: string
}) {
  return (
    <div className="rounded-[15px] border border-white/10 bg-black/20 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-black text-white">{title}</p>

        <PriorityBadge priority={status} />
      </div>

      <p className="mt-2 text-[10px] leading-4 text-slate-400">{text}</p>
    </div>
  )
}

function ForecastRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-black/20 px-3 py-2.5">
      <p className="text-[10px] font-bold text-slate-400">{label}</p>

      <p className="text-[12px] font-black text-white">{value}</p>
    </div>
  )
}

function ProcurementRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[12px] bg-white/[0.03] px-3 py-2">
      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="text-right text-[11px] font-bold leading-5 text-white">
        {value}
      </p>
    </div>
  )
}