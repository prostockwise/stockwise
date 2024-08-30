"use server";

import { Tables } from "@/types_db";
import { createClient } from "@/lib/supabase/server";

// turn 20240829 to Aug-29 2024
function formatDate(dateString: string): string {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[date.getMonth()]}-${day} ${year}`;
}

// input date like 20240829
export async function fetchNews(inputDate: string): Promise<Tables<"news">[]> {
  "use server";

  const date = formatDate(inputDate);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select()
    .eq("date", date)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`fetchNews error: ${error.message}`);
  return data;
}
