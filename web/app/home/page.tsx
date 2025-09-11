import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white px-4 pt-24 pb-8">
      <div className="container mx-auto grid gap-6 lg:grid-cols-12">
        <aside className="hidden lg:block lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">S&P 500</span>
                <span className="text-emerald-500">+0.30%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">AAPL</span>
                <span className="text-emerald-500">+0.66%</span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-2 text-sm">
            <div className="text-muted-foreground">MAIN MENU</div>
            <div className="space-y-2">
              <div>Home</div>
              <div className="text-muted-foreground">Exchange</div>
            </div>
            <div className="mt-4 text-muted-foreground">Stock & Fund</div>
            <div className="space-y-2">
              <div>Index</div>
              <div className="text-muted-foreground">Currency</div>
              <div className="text-muted-foreground">Mutual Fund</div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Stock Portfolio</CardTitle>
              <CardDescription>Overview of your holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="text-sm font-medium">Apple, Inc</div>
                    <div className="text-xs text-emerald-600">+0.66%</div>
                    <div className="mt-2 text-lg font-semibold">15,215.70</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Watchlists</CardTitle>
              <CardDescription>S&amp;P 500</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full rounded-lg border bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center text-muted-foreground">
                Chart placeholder
              </div>
            </CardContent>
          </Card>
        </main>

        <section className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>S&amp;P 500 • 24 h</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Previous Close</span><span>4,566.48</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Day Range</span><span>4,533.94 - 4,598.53</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Year Range</span><span>3,233.94 - 4,598.53</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Market Cap</span><span>$40.3T</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Volume</span><span>2,924,736</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Dividend Yield</span><span>1.43%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">P/E Ratio</span><span>31.08</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Cap</CardTitle>
              <CardDescription>$40.3 T</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-lg border bg-muted" />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HomePage;



