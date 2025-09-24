import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/landing/header";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investo",
  description:
    "Investo analyzes correlations between stocks and metals using historical data, real-time signals, and news sentiment to surface portfolio-aware insights. Informational use only — not an investing platform.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <html lang="en">
        <body className={`${inter.className}`}>
          <Providers>
            <Header />
            <main className="min-h-screen">{children}</main>
          </Providers>
        </body>
      </html>
  );
}

export default RootLayout;