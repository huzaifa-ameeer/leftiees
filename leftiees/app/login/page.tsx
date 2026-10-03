import AuthForm from "../components/auth-form";

export default async function Login({ searchParams }: PageProps<"/login">) {
  const { redirect } = await searchParams;
  const redirectTo = typeof redirect === "string" ? redirect : undefined;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-4 py-15 text-center sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Account
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Login
        </h1>
        <p className="max-w-prose text-lg text-zinc-600">
          Log in to your Leftiees account.
        </p>
      </div>
      <AuthForm mode="login" redirectTo={redirectTo} />
    </main>
  );
}
