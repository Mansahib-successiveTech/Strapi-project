"use client";
import React from "react";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    // Redirect user to Strapi Google OAuth endpoint
    // Strapi handles user creation internally
    window.location.href = "http://localhost:1337/api/connect/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Login with Google
    </button>
  );
}
