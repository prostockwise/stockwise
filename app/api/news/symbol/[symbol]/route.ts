import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

// fetch all news of specific date
export async function GET(
  req: Request,
  { params }: { params: { symbol: string } },
) {
  // turn `2024-09-17` to `Sep-17 2024`
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .contains("symbols", [params.symbol])
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news symbol: ${params.symbol}, num: ${data.length}`);
  return Response.json(data);
}
