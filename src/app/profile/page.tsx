"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {

    const router = useRouter()
  const [user, setUser] = useState<null | {
    _id: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getUserData = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setUser(res.data.data);
    } catch (err) {
      setMessage(" Failed to fetch user data.");
    }

    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setUser(null);
      setMessage(" Logged out successfully!");
      router.push("/login")
      toast.success("Logged out successfully!");
    } catch {
      setMessage("Logout failed.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Profile Page
        </h2>

        <div className="space-y-3">
          {user ? (
            <>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">User ID:</span> {user._id}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Password:</span> {user.password}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Verified:</span>{" "}
                {user.isVerified ? "Yes" : "No"}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No user data found. Click below to load it.
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={getUserData}
            disabled={loading}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            {loading ? "Loading..." : "Get Data"}
          </button>
          <button
            onClick={logout}
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>

        {message && (
          <p
            className={`text-sm text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <span className="text-white text-sm">
          © 2025 Auth App. All rights reserved.
        </span>
        <p className="text-white text-sm ml-2">Designed By Muhammad Abdullah Tanveer</p>
      </div>
    </section>
  );
};

export default ProfilePage;
