import { ArrowDownCircle, ArrowUpCircle, MinusCircle } from "lucide-react";

export default function SentimentIcon(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
    case "negative":
      return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
    default:
      return <MinusCircle className="h-4 w-4 text-gray-500" />;
  }
}
