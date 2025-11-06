"use client";

import { useEffect, useState } from "react";
import NewsRotator, { Article } from "@/components/NewsAnimation/NewsRotator";

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const load = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch("/api/news", { signal });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Status ${res.status}: ${txt}`);
        }
        const json = await res.json();

        const items: Article[] =
          Array.isArray(json?.articles) && json.articles.length > 0
            ? json.articles.map((a: unknown) => {
                // Narrow unknown into a predictable shape
                const obj = a as { title?: unknown; description?: unknown };
                return {
                  title: typeof obj.title === "string" ? obj.title : "Untitled",
                  description: typeof obj.description === "string" ? obj.description : "",
                } as Article;
              })
            : [];

        setArticles(items);
      } catch (e: unknown) {
        // Safely check for AbortError without using `any`
        const maybeName = (e as { name?: unknown })?.name;
        if (maybeName === "AbortError") return;

        console.error("Fetch error:", e);
        const message = e instanceof Error ? e.message : String(e);
        setErr(message ?? "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full mt-[70px]">
      <div className="w-full">
        {loading ? (
          <div className="p-6 bg-white rounded shadow text-center">Loading news…</div>
        ) : err ? (
          <div className="p-6 bg-white rounded shadow text-red-600">Error: {err}</div>
        ) : articles.length === 0 ? (
          <div className="p-6 bg-white rounded shadow text-gray-600">No news available.</div>
        ) : (
          <div className="w-full">
            <NewsRotator articles={articles} intervalMs={5000} heightClass="h-20" />
          </div>
        )}
      </div>
    </div>
  );  
};

export default News;
