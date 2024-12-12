"use server";

import { Tables } from "@/types_db";
import { createClient } from "@/lib/supabase/server";

export async function fetchLatestNews(
  limit: number,
): Promise<Tables<"news">[]> {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch latest news limit: ${limit}, num: ${data.length}`);
  return data;
}

export async function fetchDateNews(
  date: string, // YYYY-MM-DD
): Promise<Tables<"news">[]> {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("date", date)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`fetch news failed: ${error.message}`);
  console.log(`fetch date news : ${date}, num: ${data.length}`);
  return data;
}
