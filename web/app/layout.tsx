import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/dashboard/header";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investo",
  description:
    "Investo is a full-stack finance platform that helps users manage their investments in stocks and metals, track real-time market data, and receive AI-powered portfolio guidance with secure authentication and interactive dashboards.",
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