import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bell,
  ChartBar,
  Newspaper,
  Search,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { getURL } from "@/lib/utils";
import { CommonNavbar } from "@/components/commonnavbar";

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL("/features");
  return {
    title: "Features | Stockwise",
    description:
      "Explorer Stockwise Features: Get real-time news updates, advanced stock screening, portfolio building tools, and custom alerts.",
    alternates: {
      canonical: url,
    },
  };
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CommonNavbar location="Features" />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Powerful Features for Smart Investing
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover how Stockwise empowers you with cutting-edge tools
                  and insights for successful investing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Newspaper className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Market News & Stock Predictions</CardTitle>
                  <CardDescription>
                    Stay ahead with timely market updates and data-driven stock
                    predictions based on the latest news.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      Analyze current market news to predict potential movements
                      in individual stocks and ETFs.
                    </li>
                    <li>
                      Leverage breaking news and expert insights to identify
                      opportunities in the market.
                    </li>
                    <li>
                      Receive clear explanations of how news events influence
                      stock behavior and why specific stocks or ETFs are poised
                      for movement.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Search className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Advanced Stock Screening</CardTitle>
                  <CardDescription>
                    Find the perfect stocks with natural language queries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>AI-powered search capabilities</li>
                    <li>Customizable screening criteria</li>
                    <li>Real-time data and analytics</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Portfolio Builder & Backtester</CardTitle>
                  <CardDescription>
                    Create and test investment strategies with ease
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Drag-and-drop portfolio creation</li>
                    <li>Historical performance analysis</li>
                    <li>Risk assessment tools</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Custom Alerts</CardTitle>
                  <CardDescription>
                    Never miss an opportunity with personalized notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Price movement alerts</li>
                    <li>Technical indicator notifications</li>
                    <li>News-based triggers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Leverage machine learning for smarter decision-making
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Predictive market trends</li>
                    <li>Sentiment analysis</li>
                    <li>Automated pattern recognition</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Community & Collaboration</CardTitle>
                  <CardDescription>
                    Connect with fellow investors and share insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Discussion forums</li>
                    <li>Shared watchlists</li>
                    <li>Expert Q&A sessions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to elevate your investing?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of successful investors who trust Stockwise for
                  their market analysis and portfolio management.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
