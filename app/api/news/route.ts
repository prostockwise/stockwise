import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export const revalidate = 60;

// fetch latest limit news
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");
  let limit = 10;
  if (limitParam != null) {
    limit = parseInt(limitParam);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news limit: ${limit}, num: ${data.length}`);
  return Response.json(data);
}
