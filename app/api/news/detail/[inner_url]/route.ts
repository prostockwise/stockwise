import { createClient } from "@/lib/supabase/server";

// fetch news by id
export async function GET(
  req: Request,
  { params }: { params: { inner_url: string } },
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("inner_url", params.inner_url)
    .single();
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch news by inner_url: ${params.inner_url}`);
  return Response.json(data);
}
