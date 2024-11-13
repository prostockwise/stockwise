import { getURL } from "@/lib/utils";
import { permanentRedirect, redirect } from "next/navigation";
import { Tables } from "@/types_db";

export default async function DetailNewsPage({
  params,
  searchParams,
}: {
  params: { inner_url: string };
  searchParams: { refer: string | undefined };
}) {
  // fetch news
  const resp = await fetch(getURL(`/api/news/detail/${params.inner_url}`));
  if (!resp.ok) {
    redirect("/");
  }
  const news: Tables<"news"> = await resp.json();
  let newUrl = `/news/${news.date}/${news.inner_url}`;
  if (searchParams.refer) {
    newUrl += `?refer=${encodeURI(searchParams.refer)}`;
  }
  permanentRedirect(newUrl);
}
