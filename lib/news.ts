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
  if (error) {
    console.log(error);
    throw new Error(`fetch latest news failed: ${error.message}`);
  }
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
  if (error) {
    console.log(error);
    throw new Error(`fetch date news failed: ${error.message}`);
  }
  console.log(`fetch date news: ${date}, num: ${data.length}`);
  return data;
}

export async function fetchSymbolNews(
  symbol: string,
  limit: number,
): Promise<Tables<"news">[]> {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .contains("symbols", [symbol])
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.log(error);
    throw new Error(`fetch symbol news failed: ${error.message}`);
  }
  console.log(
    `fetch symbol news: ${symbol}, limit: ${limit}, num: ${data.length}`,
  );
  return data;
}

export async function fetchNewsDetail(
  inner_url: string,
): Promise<Tables<"news">> {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .not("analyze", "is", null)
    .eq("inner_url", inner_url)
    .single();
  if (error) {
    console.log(error);
    throw new Error(`fetch news detail failed: ${error.message}`);
  }
  console.log(`fetch news detail: ${inner_url}`);
  return data;
}
