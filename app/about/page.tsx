import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartBar, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link
        className="flex items-center justify-center"
        href="/"
        prefetch={false}
      >
        <ChartBar className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">Stockwise</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/features"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
          prefetch={false}
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/contact"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

function OurTeam() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          Our Team
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Jane Doe",
              role: "CEO & Co-founder",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "John Smith",
              role: "CTO & Co-founder",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Emily Johnson",
              role: "Head of Product",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-60"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
                <div className="flex space-x-4 mt-4">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
