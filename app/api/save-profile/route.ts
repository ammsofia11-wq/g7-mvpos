import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { user_id, country, store, budget, prices } = body;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        user_id,
        country,
        store,
        budget,
        chicken: prices?.chicken,
        rice: prices?.rice,
        vegetables: prices?.vegetables,
      });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Save failed" }, { status: 500 });
  }
}