export default function CostCard({ cost }: any) {
  return (
    <div className="bg-black text-white rounded-2xl p-5">
      <h3 className="font-bold">💰 Total Cost</h3>
      <div className="text-xl mt-1">
        ${cost.toFixed(2)}
      </div>
    </div>
  )
}