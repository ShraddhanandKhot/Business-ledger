"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        redirectTo: `${window.location.origin}/auth/login`,
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      alert(result.error || "Signup failed.");
      return;
    }

    if (result.user) {
      alert("Signup successful. Please log in.");
      router.push("/auth/login");
      return;
    }

    alert(
      "Signup successful. Check your email for confirmation, then log in. " +
        "If you do not receive a confirmation email, configure Supabase SMTP settings."
    );
    router.push("/auth/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-5 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Sign up</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Signing up…" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Already have an account? <a href="/auth/login" className="font-semibold text-blue-600">Log in</a>
        </p>
      </div>
    </main>
  );
}
