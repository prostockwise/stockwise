import { permanentRedirect, redirect } from "next/navigation";
import { fetchNewsDetail } from "@/lib/news";

export default async function DetailNewsPage({
  params,
}: {
  params: { inner_url: string };
}) {
  // fetch news
  let news;
  try {
    news = await fetchNewsDetail(params.inner_url);
  } catch (e) {
    console.log(e);
    redirect("/");
  }
  let newUrl = `/news/${news.date}/${news.inner_url}`;
  permanentRedirect(newUrl);
}
