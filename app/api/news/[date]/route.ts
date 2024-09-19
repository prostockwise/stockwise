import { createClient } from "@/lib/supabase/server";
import { turnDateFormat } from "@/lib/utils";

// fetch all news of specific date
export async function GET(
  req: Request,
  { params }: { params: { date: string } },
) {
  // turn `2024-09-17` to `Sep-17 2024`
  const date = turnDateFormat(params.date);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("date", date)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news date: ${params.date}, num: ${data.length}`);
  return Response.json(data);
}
