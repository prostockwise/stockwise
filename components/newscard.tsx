import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SentimentIcon from "@/components/sentimenticon";
import Link from "next/link";
import { turnISODateToNature } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function NewsCard({
  news,
  forecasts,
}: {
  news: {
    title: string;
    description: string | null;
    inner_url: string;
    published_at: string | null;
    date: string;
  };
  forecasts:
    | {
        symbol: string;
        direction: "positive" | "negative" | "neutral";
      }[]
    | null;
}) {
  return (
    <Card className="bg-background hover:bg-gray-900 flex flex-col">
      <CardHeader>
        <CardTitle className="hover:underline">
          <Link href={`/news/${news.date}/${news.inner_url}`} prefetch={false}>
            {news.title}
          </Link>
        </CardTitle>
        <CardDescription>
          {news.published_at != null
            ? turnISODateToNature(news.published_at)
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-6">
          {news.description ? news.description : ""}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {forecasts &&
            forecasts.map((forecast, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {forecast.symbol}
                {SentimentIcon(forecast.direction)}
              </Badge>
            ))}
        </div>
        <Link href={`/news/detail/${news.inner_url}`} prefetch={false}>
          <Button variant="link">Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
