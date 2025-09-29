"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const googleAccessToken = queryParams.get("access_token") || queryParams.get("raw[access_token]");

    if (googleAccessToken) {
      // Exchange Google token with Strapi for JWT
      fetch(`http://localhost:1337/api/auth/google/callback?access_token=${googleAccessToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.jwt) {
            localStorage.setItem("strapi_jwt", "Bearer "+data.jwt);
            localStorage.setItem("strapi_user", JSON.stringify(data.user));
            alert("Login successful!");
            router.push("/");
          } else {
            alert("Login failed: " + (data.error?.message || "Unknown error"));
          }
        })
        .catch(() => {
          alert("Something went wrong while logging in.");
        });
    } else {
      alert("Google login failed. No token received.");
      router.push("/login");
    }
  }, [router]);

  return <p>Logging in with Google...</p>;
}
