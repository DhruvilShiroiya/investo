"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      {user && (
        <p className="mt-2 text-gray-600">
          Signed in as <span className="font-medium">{user.fullName}</span>
        </p>
      )}
    </div>
  );
};

export default DashboardPage;