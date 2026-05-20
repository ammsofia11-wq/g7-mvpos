export default function RecipeGrid({ result }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* 🍽️ MAIN CARD */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <h2 className="text-xl font-bold">{result.name}</h2>
        <p className="text-gray-500 mt-1">
          AI-generated optimized meal
        </p>

        <div className="mt-4 text-sm space-y-1">
          <p>🔥 {result.nutrition.calories} kcal</p>
          <p>💪 {result.nutrition.protein}g Protein</p>
          <p>🍚 {result.nutrition.carbs}g Carbs</p>
          <p>🥑 {result.nutrition.fat}g Fat</p>
        </div>
      </div>

      {/* 🧾 INGREDIENTS CARD */}
      <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold mb-3">🧾 Ingredients</h3>

        <div className="space-y-2 text-sm">
          {result.ingredients.map((i: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b pb-1">
              <span>{i.name}</span>
              <span className="text-gray-500">{i.grams}g</span>
            </div>
          ))}
        </div>
      </div>

      {/* 💰 COST CARD */}
      <div className="bg-black text-white rounded-2xl p-5">
        <h3 className="font-bold mb-2">💰 Cost Analysis</h3>
        <p className="text-2xl font-bold">${result.totalCost}</p>
        <p className="text-gray-300 text-sm mt-2">
          AI-optimized meal cost estimation
        </p>
      </div>

      {/* 📊 MACROS CARD */}
      <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold mb-3">📊 Nutrition Profile</h3>

        <div className="space-y-1 text-sm">
          <p>🔥 Calories: {result.nutrition.calories}</p>
          <p>💪 Protein: {result.nutrition.protein}g</p>
          <p>🍚 Carbs: {result.nutrition.carbs}g</p>
          <p>🥑 Fat: {result.nutrition.fat}g</p>
        </div>
      </div>

    </div>
  )
}