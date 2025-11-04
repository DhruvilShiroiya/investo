import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing NEWS_API_KEY" }, { status: 500 });
  }

  // Compute yesterday’s date (YYYY-MM-DD)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split("T")[0];

  // Build URL for Indian finance/business news
  const url = new URL("https://newsapi.org/v2/top-headlines");
  url.searchParams.set("category", "business");
  url.searchParams.set("pageSize", "100"); // fetch 20 articles
  url.searchParams.set("from", dateStr);
  url.searchParams.set("to", dateStr);
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || "Failed to fetch news" }, { status: res.status });
  }

  return NextResponse.json({ articles: data.articles ?? [] });
}
