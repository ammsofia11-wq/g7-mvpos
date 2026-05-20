export default function DishHeroCard({ name, description }: any) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-2xl font-bold">🍽️ {name}</h2>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  )
}