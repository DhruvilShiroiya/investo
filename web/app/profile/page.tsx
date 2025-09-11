"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

const ProfilePage = () => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold">You are not signed in.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="mb-2">Name: {user?.firstName} {user?.lastName}</p>
      <p className="mb-2">Email: {user?.primaryEmailAddress?.emailAddress}</p>
      <p className="text-sm text-gray-500">User ID: {user?.id}</p>
    </div>
  );
};

export default ProfilePage;


