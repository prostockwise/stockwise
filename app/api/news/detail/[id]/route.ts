import { createClient } from "@/lib/supabase/server";

// fetch news by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("id", params.id)
    .single();
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news by id: ${params.id}`);
  return Response.json(data);
}
