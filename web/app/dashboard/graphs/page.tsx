"use client";
import React, { useEffect, useMemo, useState } from "react";
import LineChart from "@/components/charts/LineChart";

type Markets = {
  niftySensex: { date: string; nifty: number; sensex: number }[];
  goldSilver: { date: string; gold: number; silver: number }[];
};

type Series = {
  name: string;
  color: string;
  points: { x: number; y: number }[];
};

const GraphsPage = () => {
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
    const pointsX = data.niftySensex.map((d, i) => i);
    return [
      {
        name: "Nifty",
        color: "#2563EB", // blue
        points: data.niftySensex.map((d, i) => ({ x: pointsX[i], y: d.nifty })),
      },
      {
        name: "Sensex",
        color: "#16A34A", // green
        points: data.niftySensex.map((d, i) => ({ x: pointsX[i], y: d.sensex })),
      },
    ];
  }, [data]);

  const goldSilverSeries = useMemo((): Series[] => {
    if (!data) return [];
    const pointsX = data.goldSilver.map((d, i) => i);
    return [
      {
        name: "Gold",
        color: "#2563EB", // blue
        points: data.goldSilver.map((d, i) => ({ x: pointsX[i], y: d.gold })),
      },
      {
        name: "Silver",
        color: "#16A34A", // green
        points: data.goldSilver.map((d, i) => ({ x: pointsX[i], y: d.silver })),
      },
    ];
  }, [data]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Nifty vs Sensex</span>
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
            <LineChart height={280} series={niftySensexSeries} />
          )}
        </div>
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Gold vs Silver</span>
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
            <LineChart height={280} series={goldSilverSeries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphsPage;

