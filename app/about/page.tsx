import { Metadata } from "next";
import { getURL } from "@/lib/utils";
import { CommonNavbar } from "@/components/commonnavbar";

export async function generateMetadata(): Promise<Metadata> {
  const url = getURL("/about");
  return {
    title: "About | Stockwise",
    description:
      "Discover Stockwise, your next-generation market analysis partner. Empowering investors with AI-driven tools and insights for smarter stock market decisions. Join us in democratizing financial intelligence today!",
    alternates: {
      canonical: url,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CommonNavbar location="About" />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About Stockwise
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {
                    "Empowering investors with intelligent tools and insights for smarter decision-making."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {
                    "At Stockwise, our mission is to democratize financial intelligence. We believe that every investor, regardless of their experience level, should have access to powerful tools and insights that can help them make informed decisions in the stock market."
                  }
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {
                    "We're committed to leveraging cutting-edge technology, including artificial intelligence and machine learning, to provide our users with accurate, timely, and actionable information. Our goal is to level the playing field and empower individual investors to achieve their financial goals."
                  }
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Story
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {
                    "Stockwise was founded in 2024 by a team of finance professionals and tech enthusiasts who saw a gap in the market for accessible, yet powerful stock analysis tools. What started as a simple stock screening app has grown into a comprehensive platform that serves investors of all levels."
                  }
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {
                    "We're constantly innovating and expanding our offerings to meet the evolving needs of our users and the dynamic nature of the global financial markets."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*<OurTeam />*/}
      </main>
    </div>
  );
}
