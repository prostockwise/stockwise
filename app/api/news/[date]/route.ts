import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

// fetch all news of specific date
export async function GET(
  req: Request,
  { params }: { params: { date: string } },
) {
  // turn `2024-09-17` to `Sep-17 2024`
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("date", params.date)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news date: ${params.date}, num: ${data.length}`);
  return Response.json(data);
}
