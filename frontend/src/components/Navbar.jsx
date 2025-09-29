"use client";

import { useQuery } from "@apollo/client/react";
import { GET_NAVBAR } from "@/lib/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { data, loading, error } = useQuery(GET_NAVBAR);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check JWT on mount
  useEffect(() => {
    const token = localStorage.getItem("strapi_jwt");
    setIsAuthenticated(!!token);
  }, []);

  if (loading) return null;
  if (error) return <p>{error.message}</p>;

  const navbar = data.navbars[0]; // assuming single navbar
  const { title, buttons } = navbar;

  const handleLogout = () => {
    localStorage.removeItem("strapi_jwt");
    localStorage.removeItem("hasSeenHero");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">
      <h1 className="text-xl font-bold">{title}</h1>
      </Link>
      <div className="space-x-4">
        {/* Render login/signup only if not authenticated */}
        {buttons
          .filter((btn) => (btn.type === "login" || btn.type === "signup") && !isAuthenticated)
          .map((btn) => (
            <a
              key={btn.id}
              href={btn.link}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              {btn.label}
            </a>
          ))}

        {/* Show logout button if authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
