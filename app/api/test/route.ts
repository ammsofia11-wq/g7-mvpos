import { g7Orchestrator } from "@/lib/g7Orchestrator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = g7Orchestrator(body);

    return Response.json(result);
  } catch (err) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}