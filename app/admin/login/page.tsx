"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to log in");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not log in.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-6">
      <div className="w-full max-w-[420px] rounded-md bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--beige-light)] text-[var(--sage-dark)]">
            <Lock size={22} />
          </div>

          <h1 className="font-['Cormorant_SC'] text-[1.8rem] tracking-[0.12em] text-[#2a2a2a]">
            Admin Login
          </h1>

          <p className="mt-2 font-['Raleway'] text-sm text-[var(--text-muted)]">
            Sweden Arabian Stud
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded border border-red-200 bg-red-50 px-4 py-3 font-['Raleway'] text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block font-['Raleway'] text-[0.7rem] font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-[#d0d0d0] px-4 py-3 font-['Raleway'] text-sm outline-none transition focus:border-[var(--teal)]"
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-['Raleway'] text-[0.7rem] font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-[#d0d0d0] px-4 py-3 font-['Raleway'] text-sm outline-none transition focus:border-[var(--teal)]"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer rounded border-0 bg-[var(--teal)] px-6 py-3 font-['Raleway'] text-[0.75rem] tracking-[0.12em] text-white uppercase transition hover:bg-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
