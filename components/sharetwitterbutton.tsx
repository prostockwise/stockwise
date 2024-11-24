"use client";

import { Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ShareTwitterButton({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileRegex = /iPhone|iPad|iPod|Android/i;
    setIsMobile(mobileRegex.test(navigator.userAgent));
  }, []);

  const shareText = encodeURIComponent(text);
  const shareUrl = encodeURIComponent(url);
  return (
    <Link
      href={
        isMobile
          ? `twitter://post?text=${shareText}&url=${shareUrl}`
          : `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`
      }
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex items-center text-blue-400"
    >
      <Twitter />
    </Link>
  );
}
