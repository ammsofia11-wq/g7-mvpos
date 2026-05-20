export default function IngredientsCard({ ingredients }: any) {
  return (
    <div className="bg-white border rounded-2xl p-5">
      <h3 className="font-bold mb-3">🧾 Ingredients</h3>

      <div className="space-y-2 text-sm">
        {ingredients.map((ing: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>{ing.name}</span>
            <span className="text-gray-500">{ing.grams}g</span>
          </div>
        ))}
      </div>
    </div>
  )
}