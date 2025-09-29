"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.jwt) {
        localStorage.setItem("strapi_jwt", "Bearer " + data.jwt);
        alert("Signup successful!");
        router.push("/"); // redirect after signup
      } else {
        alert(data.error?.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-3 max-w-sm mx-auto mt-10"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
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
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
};
