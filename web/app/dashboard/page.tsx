"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import News from "./news";
import LineChart from "@/components/charts/LineChart";
import { SignOutButton } from "@clerk/nextjs";

type Markets = {
  niftySensex: { date: string; nifty: number; sensex: number }[];
  goldSilver: { date: string; gold: number; silver: number }[];
};

type Series = {
  name: string;
  color: string;
  points: { x: number; y: number }[];
};

const Page = () => {
  return (
    <div className="w-full">
      {/* News box at the top */}
      <News />

      {/* 3-column layout below news */}
      <div className="grid grid-cols-12 gap-6 px-6 mt-2 items-stretch">
        {/* Left: Navigation (col-span-2 on lg, full on small) */}
        <aside className="col-span-12 lg:col-span-2 border-r pr-4 flex flex-col h-full">
          <nav className="space-y-4 mt-4">
            <Link className="block hover:underline" href="/dashboard">Home</Link>
            <Link className="block hover:underline" href="/dashboard/stocks">Stocks</Link>
            <Link className="block hover:underline" href="/dashboard/news">News</Link>
            <Link className="block hover:underline" href="/dashboard/metals">Metals</Link>
            <Link className="block hover:underline" href="/dashboard/settings">Settings</Link>
          </nav>
          <div className="mt-auto pt-8 mb-6">
            <SignOutButton redirectUrl="/">
              <button className="text-red-500 hover:underline">Log out</button>
            </SignOutButton>
          </div>
        </aside>

        {/* Middle: Graphs (render actual charts) */}
        <main className="col-span-12 lg:col-span-7 h-full">
          <ChartsSection />
        </main>

        {/* Right: Chatbot preview */}
        <section className="col-span-12 lg:col-span-3 flex h-full">
          <div className="bg-white border rounded-lg shadow p-4 flex flex-col h-full w-full">
            <div className="flex-1 flex flex-col items-center justify-center -mt-50">
              <div className="text-xl font-bold mb-2 text-center">Start Investing</div>
              <p className="text-gray-600 text-center">Explore Insights with our Smart Investing AI Assistant</p>
            </div>
            <div className="mt-3 sticky bottom-3 bg-white pt-3 border-t">
              <form className="relative">
                <input
                  className="w-full border rounded-full px-4 py-2 pr-12"
                  placeholder="Search"
                />
                <button
                  type="button"
                  aria-label="Send"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black text-white flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-6 border-t px-6 py-8 text-center text-gray-700">
        <div className="space-y-2">
          <div className="text-base font-medium">© {new Date().getFullYear()} Investo. All rights reserved.</div>
          <div className="text-sm text-gray-600">Guiding smarter decisions across stocks and metals with AI-driven insights.</div>
        </div>
      </footer>
    </div>
  );
};

export default Page;

function ChartsSection() {
  const [data, setData] = useState<Markets | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/data/markets.json", { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const json: Markets = await res.json();
        setData(json);
      } catch (e) {
        const maybeName = (e as { name?: unknown })?.name;
        if (maybeName === "AbortError") return; // ignore expected aborts
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const niftySensexSeries = useMemo((): Series[] => {
    if (!data) return [];
    const pointsX = data.niftySensex.map((_, i) => i);
    return [
      { name: "Nifty", color: "#2563EB", points: data.niftySensex.map((d, i) => ({ x: pointsX[i], y: d.nifty })) },
      { name: "Sensex", color: "#16A34A", points: data.niftySensex.map((d, i) => ({ x: pointsX[i], y: d.sensex })) },
    ];
  }, [data]);

  const goldSilverSeries = useMemo((): Series[] => {
    if (!data) return [];
    const pointsX = data.goldSilver.map((_, i) => i);
    return [
      { name: "Gold", color: "#2563EB", points: data.goldSilver.map((d, i) => ({ x: pointsX[i], y: d.gold })) },
      { name: "Silver", color: "#16A34A", points: data.goldSilver.map((d, i) => ({ x: pointsX[i], y: d.silver })) },
    ];
  }, [data]);

  const formatDateLabel = (iso: string) => {
    // Expects YYYY-MM-DD → returns D Mon YY (e.g., 2025-09-03 → 3 Sep 25)
    const [y, m, d] = iso.split("-").map((s) => parseInt(s, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(y, m - 1, d);
    const day = date.getDate();
    const monthShort = date.toLocaleString("en-US", { month: "short" });
    const yearShort = String(date.getFullYear()).slice(-2);
    return `${day} ${monthShort} ${yearShort}`;
  };

  const niftyDates = useMemo(() => data?.niftySensex.map((d) => formatDateLabel(d.date)) ?? [], [data]);
  const metalDates = useMemo(() => data?.goldSilver.map((d) => formatDateLabel(d.date)) ?? [], [data]);

  return (
    <div className="space-y-8">
      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1"><span className="w-3 h-1 bg-blue-600 rounded" />Nifty</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-1 bg-green-600 rounded" />Sensex</span>
          </div>
        </div>
        {loading ? (
          <div className="h-64 grid place-items-center text-gray-500">Loading…</div>
        ) : error ? (
          <div className="h-64 grid place-items-center text-red-600">{error}</div>
        ) : (
          <LineChart height={300} series={niftySensexSeries} xLabels={niftyDates} />
        )}
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1"><span className="w-3 h-1 bg-blue-600 rounded" />Gold</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-1 bg-green-600 rounded" />Silver</span>
          </div>
        </div>
        {loading ? (
          <div className="h-64 grid place-items-center text-gray-500">Loading…</div>
        ) : error ? (
          <div className="h-64 grid place-items-center text-red-600">{error}</div>
        ) : (
          <LineChart height={300} series={goldSilverSeries} xLabels={metalDates} />
        )}
      </div>
    </div>
  );
}