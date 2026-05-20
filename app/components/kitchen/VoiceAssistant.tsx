type VoiceLog = {
  speaker: string
  text: string
}

const aiVoiceLogs: VoiceLog[] = [
  {
    speaker: "Worker",
    text: "Start carnivore bowl batch",
  },
  {
    speaker: "AI Chef",
    text: "Carnivore Bowl batch started. Estimated completion 9 minutes.",
  },
  {
    speaker: "Worker",
    text: "Need QC for salmon batch",
  },
  {
    speaker: "AI Chef",
    text: "QC supervisor notified.",
  },
]

export default function VoiceAssistant() {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">

      <div className="flex items-center justify-between gap-3">

        <div>

          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
            AI Voice Kitchen Assistant
          </p>

          <h2 className="mt-2 text-[22px] font-black leading-none tracking-[-0.05em] text-white">
            Voice Runtime
          </h2>

        </div>

        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-cyan-300">
          Listening
        </div>

      </div>

      <div className="mt-5 space-y-3">

        {aiVoiceLogs.map((log, index) => (

          <div
            key={index}
            className="rounded-[16px] border border-white/10 bg-black/20 p-3"
          >

            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
              {log.speaker}
            </p>

            <p className="mt-2 text-[11px] leading-5 text-slate-300">
              {log.text}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-5 rounded-[18px] border border-cyan-300/20 bg-cyan-300/[0.05] p-4">

        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
          Next Phase
        </p>

        <p className="mt-2 text-[11px] leading-5 text-slate-300">
          Real microphone execution, AI speech parsing,
          worker voice commands, and kitchen dispatch automation.
        </p>

      </div>

    </div>
  )
}