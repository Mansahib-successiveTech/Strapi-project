"use client";

import { useQuery } from "@apollo/client/react";
import { GET_NAVBAR } from "@/lib/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleLoginButton from "./OAuth";

export default function Navbar() {
  const { data, loading, error } = useQuery(GET_NAVBAR);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("login");
    setIsAuthenticated(!!token);
  };

  // Run on mount and listen for custom events + storage changes
  useEffect(() => {
    checkAuth(); // initial check

    // Listen for storage changes (other tabs)
    window.addEventListener("storage", checkAuth);

    // Listen for login/logout events in the same tab
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  if (loading) return null;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const navbar = data.navbars[0];
  const { title, buttons } = navbar;

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("strapi_jwt");
    localStorage.removeItem("strapi_user");
    setIsAuthenticated(false);

    // Notify other components in the same tab
    window.dispatchEvent(new Event("authChange"));

    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">{title}</h1>
      </Link>
      <div className="space-x-4">
        {!isAuthenticated &&
        <GoogleLoginButton />
        }

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
