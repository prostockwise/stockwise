import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getURL } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Breaking Stock News";
  const forecasts: {
    symbol: string;
    direction: "positive" | "neutral" | "negative";
  }[] = JSON.parse(searchParams.get("forecasts") || "[]");
  const publishedAt = searchParams.get("publishedAt") || "";

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
            width: "1100px",
            height: "530px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Stockwise Logo and Slogan */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <img
              src={getURL("/icon.png")}
              alt="Stockwise Logo"
              width="48"
              height="48"
            />
            <div
              style={{
                marginLeft: "16px",
                color: "#f8fafc",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Stockwise
            </div>
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            Your ultimate AI-powered investing assistant
          </div>

          {/*add a divider line*/}
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#334155",
              marginTop: "20px",
            }}
          ></div>

          {/* News Title */}
          <div
            style={{
              display: "block",
              color: "#f8fafc",
              fontSize: "42px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "30px",
              width: "800px",
              height: "120px",
              lineClamp: 2,
              justifyContent: "center",
            }}
          >
            {title}
          </div>

          {/*publishedAt*/}
          <div
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            {publishedAt}
          </div>

          {/* Forecasts */}
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "center",
              gap: "24px",
              height: "120px",
            }}
          >
            {forecasts.slice(0, 6).map((forecast, index) => (
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
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  {forecast.symbol}
                </div>
                <div
                  style={{
                    color:
                      forecast.direction === "positive"
                        ? "#4ade80"
                        : forecast.direction === "negative"
                          ? "#ef4444"
                          : "#94a3b8",
                    fontSize: "24px",
                    marginTop: "8px",
                  }}
                >
                  {forecast.direction.charAt(0).toUpperCase() +
                    forecast.direction.slice(1)}
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
