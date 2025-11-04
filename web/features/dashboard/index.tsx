"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!showPopup) return null; // hide completely after timeout

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-opacity-5 bg-gray-100 shadow-lg rounded-xl p-4 border border-gray-200 animate-fade-in-out">
        {user && (
          <p className="mt-2 text-gray-600">
            Welcome <span className="font-medium">{user.fullName}</span>
          </p>
        )}
      </div>

      {/* animation keyframes */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
