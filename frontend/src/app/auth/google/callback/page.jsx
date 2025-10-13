"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const googleAccessToken =
      queryParams.get("access_token") || queryParams.get("raw[access_token]");

    if (googleAccessToken) {
      // give Google token and get Strapi JWT
      fetch(
        `http://localhost:1337/api/auth/google/callback?access_token=${googleAccessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.jwt) {
            // Save JWT and user info
            localStorage.setItem("strapi_jwt", "Bearer " + data.jwt);
            localStorage.setItem("strapi_user", JSON.stringify(data.user));
            localStorage.setItem("login", "login succesfull"); 
          
            window.dispatchEvent(new Event("authChange"));

            alert("Login successful!");
            router.push("/");
          } else {
            alert("Login failed: " + (data.error?.message || "Unknown error"));
            router.push("/login");
          }
        })
        .catch(() => {
          alert("Something went wrong while logging in.");
          router.push("/login");
        });
    } else {
      alert("Google login failed. No token received.");
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-700">Logging in with Google...</p>
    </div>
  );
}