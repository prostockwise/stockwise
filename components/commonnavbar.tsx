import Link from "next/link";
import Image from "next/image";

export async function CommonNavbar({ location }: { location: string | null }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <Image
          src="/icon.webp"
          alt="icon"
          width={64}
          height={64}
          className="w-8 h-8"
        />
        <span className="ml-2 text-lg font-bold">
          {location ?? "Stockwise"}
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {location && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
        )}
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
