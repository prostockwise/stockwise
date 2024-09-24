import { todayDate } from "@/lib/utils";
import { redirect } from "next/navigation";

export const revalidate = 60;

export default async function NewsPage() {
  const today = todayDate();
  redirect(`/news/${today}`);
}
