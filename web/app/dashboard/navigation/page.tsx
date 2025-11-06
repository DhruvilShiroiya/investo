import React from "react";
import Link from "next/link";

const NavigationPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Navigation</h1>
      <nav className="space-y-3">
        <Link className="block hover:underline" href="/dashboard">Dashboard Home</Link>
        <Link className="block hover:underline" href="/dashboard/graphs">Graphs</Link>
        <Link className="block hover:underline" href="/dashboard/chatbot">Chatbot</Link>
      </nav>
    </div>
  );
};

export default NavigationPage;

