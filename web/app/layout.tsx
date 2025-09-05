import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/dashboard/header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Investo",
  description:
    "Investo is a full-stack finance platform that helps users manage their investments in stocks and metals, track real-time market data, and receive AI-powered portfolio guidance with secure authentication and interactive dashboards.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
        </body>
      </html>
  );
}

export default RootLayout;