"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@/app/components/text-field";
import { authClient } from "@/lib/auth-client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    let { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    // Admins are provisioned manually and don't go through email verification.
    if (signInError?.code === "EMAIL_NOT_VERIFIED") {
      await fetch("/api/admin/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => null);

      ({ error: signInError } = await authClient.signIn.email({
        email,
        password,
      }));
    }

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/admin/me");
    const data = await response.json().catch(() => null);

    if (!data?.isAdmin) {
      await authClient.signOut();
      setError("This account does not have admin access.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <TextField
        id="admin-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        id="admin-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
