import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HistoryPage() {
  const { data, error } = await supabase
    .from("meal_plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍽️ G7 History</h1>

      {!data || data.length === 0 ? (
        <p>No meals yet.</p>
      ) : (
        data.map((plan: any) => (
          <div
            key={plan.id}
            style={{
              border: "1px solid #ddd",
              marginTop: "15px",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <h3>🎯 {plan.goal}</h3>

            <p>
              🕒 {new Date(plan.created_at).toLocaleString()}
            </p>

            <div>
              <strong>🥗 Meals:</strong>
              <pre>{JSON.stringify(plan.meals, null, 2)}</pre>
            </div>

            <div>
              <strong>📊 Macros:</strong>
              <pre>{JSON.stringify(plan.macros, null, 2)}</pre>
            </div>
          </div>
        ))
      )}
    </div>
  );
}