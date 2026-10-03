import VerifyOtpForm from "../components/verify-otp-form";

export default async function VerifyEmailPage({
  searchParams,
}: PageProps<"/verify-email">) {
  const { email } = await searchParams;
  const address = typeof email === "string" ? email : "";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Account
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Verify your email
        </h1>
        <p className="max-w-prose text-lg text-zinc-600">
          {address ? (
            <>
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{address}</span>.
              Enter it below to activate your account.
            </>
          ) : (
            "Enter the 6-digit code we emailed you to activate your account."
          )}
        </p>
      </div>
      <VerifyOtpForm email={address} />
    </main>
  );
}
