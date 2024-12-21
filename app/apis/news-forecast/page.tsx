import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Brain,
  FileJson,
  Newspaper,
  Rocket,
} from "lucide-react";
import { CommonNavbar } from "@/components/commonnavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { getURL } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL("/apis/news-forecast");
  return {
    title: "News Forecast API | Stockwise",
    description: "Explorer Stockwise AI-powered Stock News Forecast API",
    alternates: {
      canonical: url,
    },
  };
}

async function ButtonPair() {
  return (
    <div className="flex gap-4">
      <Button variant="default" asChild>
        <Link
          href="https://rapidapi.com/prostockwise/api/stockwise-news-forecast"
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
        >
          RapidAPI
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/apis">Explorer more APIs</Link>
      </Button>
    </div>
  );
}

export default async function NewsForecastApiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CommonNavbar location="News Forecast API" />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 md:space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                News Forecast API
              </h1>
              <ButtonPair />
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="w-[64rem] max-w-full mx-auto my-6 md:my-10">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Introduction
          </h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <p className="text-lg text-muted-foreground">
                Our API uses advanced artificial intelligence techniques to
                analyze news articles. Simply provide the URL, and our
                cutting-edge analysis pipeline will fetch the content and
                deliver a detailed forecast:
              </p>
              <ul className="space-y-2 text-lg">
                <li className="flex items-center gap-2">
                  📝 Concise summary of the news content
                </li>
                <li className="flex items-center gap-2">
                  📈 Forecasts of related stocks with reasoning
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Comparison Section */}
        <section className="w-[64rem] max-w-full mx-auto my-6 md:my-10">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Feature Comparison
          </h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Stockwise News Forecast API</TableHead>
                    <TableHead>Traditional News Sentiment Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Input Type</TableCell>
                    <TableCell>Any news article via URL</TableCell>
                    <TableCell>Clean text only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Related Stocks/ETFs
                    </TableCell>
                    <TableCell>Discovers relevant symbols using AI</TableCell>
                    <TableCell>
                      Only stocks mentioned or manually listed
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Output Type</TableCell>
                    <TableCell>Provides reasoning with sentiment</TableCell>
                    <TableCell>
                      Only simple positive or negative sentiment
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Endpoints Section */}
        <section className="w-[64rem] max-w-full mx-auto my-6 md:my-10">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <FileJson className="h-8 w-8 text-primary" />
            API Endpoints
          </h2>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">
                POST /news_forecast
              </h3>
              <div className="rounded-lg bg-zinc-950 p-4">
                <pre className="text-sm text-white">
                  <code>{`{
  "url": "https://finance.yahoo.com/news/example"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="w-[64rem] max-w-full mx-auto my-6 md:my-10">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  🚀 Why Use Stockwise News Forecast API?
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    ⚡️ Real-time insights for up-to-the-minute analysis
                  </li>
                  <li className="flex items-center gap-2">
                    🤖 AI-powered accuracy with advanced machine learning
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  🎯 Can Stockwise News Forecast API Make Mistakes?
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  While our API uses advanced AI for accurate predictions, no
                  forecasting tool is 100% reliable. Markets are influenced by
                  complex factors, some unpredictable or not present in the
                  news.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-[64rem] max-w-full mx-auto my-6 md:my-10">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Real-time Analysis
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant insights from news articles as they are published
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms for accurate predictions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Detailed Insights
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive analysis with reasoning behind each prediction
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
