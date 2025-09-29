"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OAuthLoginButton from "./OAuth";

export const LoginPage=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const data = await res.json();

      if (data.jwt) {
    
        localStorage.setItem("strapi_jwt","Bearer "+data.jwt);
        alert("Login successful!");
        router.push("/"); // redirect after login
      } else {
        alert(data.error?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  return (
    <>
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Emaill"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
    <div className="mx-137 mt-4">
        <OAuthLoginButton/>
    </div>
    </>
  );
}
