"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ERROR_MESSAGES = {
  invalid_credentials:         "The email or password you entered is incorrect.",
  email_and_password_required: "Please enter your email and password.",
  account_disabled:            "Your account has been disabled. Please contact us.",
};

export default function LoginPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(ERROR_MESSAGES[data.error] || "Something went wrong. Please try again.");
        return;
      }
      login(data.access, data.user);
      router.push("/journal");
    } catch {
      setError("Unable to connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
              Welcome Back
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-warm-gray)" }}>
              Sign in to your Tulip Faith account to access your journal,<br />
              reading progress, and prayer history.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: "var(--color-violet-deep)", letterSpacing: "0.15em" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="px-4 py-3 rounded-xl border text-sm outline-none transition-shadow"
                style={{
                  background:   "white",
                  borderColor:  "var(--color-lavender-pale)",
                  color:        "var(--color-warm-gray)",
                  fontFamily:   "var(--font-body)",
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: "var(--color-violet-deep)", letterSpacing: "0.15em" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={{
                  background:  "white",
                  borderColor: "var(--color-lavender-pale)",
                  color:       "var(--color-warm-gray)",
                  fontFamily:  "var(--font-body)",
                }}
              />
            </div>

            {error && (
              <p
                className="text-sm text-center px-4 py-3 rounded-xl"
                style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-1"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center mt-8 text-sm" style={{ color: "var(--color-warm-gray)" }}>
            New to Tulip Faith?{" "}
            <Link
              href="/register"
              style={{ color: "var(--color-violet-primary)", fontWeight: 600 }}
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
