"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ERROR_MESSAGES = {
  email_already_registered:    "That email is already registered. Try signing in instead.",
  email_and_password_required: "Please fill in all required fields.",
  password_too_short:          "Password must be at least 8 characters.",
};

export default function RegisterPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match. Please try again.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          email:        email.trim().toLowerCase(),
          password,
          display_name: displayName.trim(),
        }),
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

  const fieldStyle = {
    background:  "white",
    borderColor: "var(--color-lavender-pale)",
    color:       "var(--color-warm-gray)",
    fontFamily:  "var(--font-body)",
  };

  const labelStyle = {
    color:         "var(--color-violet-deep)",
    letterSpacing: "0.15em",
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
              Create Your Account
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-warm-gray)" }}>
              Join Tulip Faith to read, reflect, and pray together.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="display_name" className="text-xs uppercase tracking-widest font-medium" style={labelStyle}>
                Your Name <span style={{ color: "var(--color-warm-gray)", fontWeight: 400 }}>(shown to others)</span>
              </label>
              <input
                id="display_name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
                placeholder="e.g. Joe H."
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={fieldStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium" style={labelStyle}>
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
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={fieldStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs uppercase tracking-widest font-medium" style={labelStyle}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={fieldStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className="text-xs uppercase tracking-widest font-medium" style={labelStyle}>
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={fieldStyle}
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
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm" style={{ color: "var(--color-warm-gray)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-violet-primary)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
