"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyOtpForm({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    const { error: verifyError } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    if (verifyError) {
      setError(
        verifyError.message ?? "That code isn't valid. Please try again.",
      );
      setLoading(false);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  async function onResend() {
    setError(null);
    setNotice(null);
    setResending(true);

    const { error: resendError } = await authClient.emailOtp.sendVerificationOtp(
      {
        email,
        type: "email-verification",
      },
    );

    setResending(false);

    if (resendError) {
      setError(
        resendError.message ?? "Couldn't resend the code. Please try again.",
      );
      return;
    }

    setNotice("A new code is on its way.");
  }

  if (!email) {
    return (
      <p className="text-sm text-zinc-600">
        <Link href="/signup" className="font-medium text-denim hover:underline">
          Sign up
        </Link>{" "}
        to get a verification code.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-sm flex-col items-center gap-4"
    >
      <label htmlFor="otp" className="sr-only">
        Verification code
      </label>
      <input
        id="otp"
        name="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={6}
        required
        value={otp}
        onChange={(event) =>
          setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
        }
        placeholder="000000"
        className="h-14 w-full rounded-xl border border-black/15 bg-background text-center text-2xl tracking-[0.4em] text-foreground transition-colors placeholder:text-zinc-300 focus:border-denim"
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {notice && <p className="text-sm text-denim">{notice}</p>}

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Verify email"}
      </button>

      <button
        type="button"
        onClick={onResend}
        disabled={resending}
        className="text-sm font-medium text-denim transition-opacity hover:underline disabled:opacity-60"
      >
        {resending ? "Sending..." : "Resend code"}
      </button>

      <p className="text-sm text-zinc-600">
        Already verified?{" "}
        <Link href="/login" className="font-medium text-denim hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
