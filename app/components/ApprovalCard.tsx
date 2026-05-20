"use client"

import type { ApprovalRequest } from "@/lib/approval-data"

type ApprovalCardProps = {
  request: ApprovalRequest
  onApprove: (requestId: string) => void
  onReject: (requestId: string) => void
}

export default function ApprovalCard({
  request,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
            {request.type} • {request.priority}
          </p>

          <h3 className="mt-1 text-[16px] font-black text-white">
            {request.title}
          </h3>

          <p className="mt-1 text-[10px] font-bold text-slate-500">
            Requested by {request.requestedBy}
          </p>
        </div>

        <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-amber-300">
          {request.status}
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <InfoBox
          label="AI Recommendation"
          value={request.aiRecommendation}
        />

        <InfoBox label="Operational Impact" value={request.impact} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          onClick={() => onApprove(request.id)}
          className="rounded-full bg-emerald-300 px-4 py-3 text-[11px] font-black text-emerald-950 transition hover:scale-[1.01]"
        >
          Approve Request
        </button>

        <button
          onClick={() => onReject(request.id)}
          className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-3 text-[11px] font-black text-red-300 transition hover:scale-[1.01]"
        >
          Reject Request
        </button>
      </div>
    </div>
  )
}

function InfoBox({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-amber-300">
        {label}
      </p>

      <p className="mt-2 text-[10px] leading-4 text-slate-400">
        {value}
      </p>
    </div>
  )
}