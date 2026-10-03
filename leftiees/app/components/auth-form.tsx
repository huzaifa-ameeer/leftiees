"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import TextField from "./text-field";

type Mode = "login" | "signup";

export default function AuthForm({
  mode,
  redirectTo,
}: {
  mode: Mode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignup) {
      const checkResponse = await fetch("/api/auth/email-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const check = await checkResponse.json().catch(() => null);

      if (check?.exists) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push(redirectTo || "/");
      router.refresh();
      return;
    }

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message ?? "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    router.push(redirectTo || "/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-3">
      {isSignup && (
        <TextField
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}

      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete={isSignup ? "new-password" : "current-password"}
        minLength={8}
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
        {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="text-sm text-zinc-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          href={
            redirectTo
              ? `${isSignup ? "/login" : "/signup"}?redirect=${encodeURIComponent(redirectTo)}`
              : isSignup
                ? "/login"
                : "/signup"
          }
          className="font-medium text-denim hover:underline"
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
