import { todayDate } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function NewsPage() {
  const today = todayDate();
  redirect(`/news/${today}`);
}
