import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id } = body;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) {
      return Response.json({ data: null });
    }

    return Response.json({ data });
  } catch (err) {
    return Response.json({ data: null });
  }
}