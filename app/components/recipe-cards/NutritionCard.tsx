export default function NutritionCard({ nutrition }: any) {
  return (
    <div className="bg-gray-50 border rounded-2xl p-4 flex justify-between text-sm">
      <span>🔥 {nutrition.calories} kcal</span>
      <span>💪 {nutrition.protein}g P</span>
      <span>🍚 {nutrition.carbs}g C</span>
      <span>🥑 {nutrition.fat}g F</span>
    </div>
  )
}