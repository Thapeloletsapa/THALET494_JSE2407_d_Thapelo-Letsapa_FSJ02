"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logOut } from "../lib/useAuth";


export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load current user on component mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logOut();
    setUser(null); // Reset user state after logout
    router.push("/"); // Redirect to home page after logging out
  };

  return (
    <header className="bg-gray-300 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-900"
        >
          My ecommerce store
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            // Display user's email and a logout button if logged in
            <>
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            // Show login and sign-up links if the user is not logged in
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1 hover:text-blue-500 transition duration-300"
              >
               
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}