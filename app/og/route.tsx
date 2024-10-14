import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req);
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const title = searchParams.get("title") || "Breaking Stock News";
  const forecasts: {
    symbol: string;
    sentiment: "positive" | "neutral" | "negative";
  }[] = JSON.parse(searchParams.get("forecasts") || "[]");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1e293b",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f172a",
            borderRadius: "16px",
            padding: "40px",
            margin: "40px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Stockwise Logo and Slogan */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            <div
              style={{
                marginLeft: "16px",
                color: "#f8fafc",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Stockwise
            </div>
          </div>
          <div
            style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px" }}
          >
            AI-Powered Stock Insights
          </div>

          {/* News Title */}
          <div
            style={{
              color: "#f8fafc",
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "32px",
              maxWidth: "800px",
            }}
          >
            {title}
          </div>

          {/* Forecasts */}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "24px" }}
          >
            {forecasts.slice(0, 3).map((forecast, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#1e293b",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    color: "#f8fafc",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {forecast.symbol}
                </div>
                <div
                  style={{
                    color:
                      forecast.sentiment === "positive"
                        ? "#4ade80"
                        : forecast.sentiment === "negative"
                          ? "#ef4444"
                          : "#94a3b8",
                    fontSize: "18px",
                    marginTop: "8px",
                  }}
                >
                  {forecast.sentiment.charAt(0).toUpperCase() +
                    forecast.sentiment.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
