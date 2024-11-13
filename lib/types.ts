export interface Analyze {
  summary: string;
  forecasts: {
    symbol: string;
    analyze: string;
    direction: "positive" | "negative" | "neutral";
  }[];
  has_article: boolean;
}

export interface RelativeNews {
  title: string;
  description: string;
  inner_url: string;
  published_at: string;
  date: string;
  forecasts: {
    symbol: string;
    direction: "positive" | "negative" | "neutral";
  }[];
}
