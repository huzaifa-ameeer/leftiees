import { redirect } from "next/navigation";

import AdminLoginForm from "@/app/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/admin";

export default async function AdminLoginPage() {
  const admin = await getAdminSession();
  if (admin) redirect("/admin");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 px-4 py-15 text-center sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-denim">
          Leftiees
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Admin login
        </h1>
        <p className="max-w-prose text-lg text-zinc-600">
          Sign in with your admin account to manage products and orders.
        </p>
      </div>
      <AdminLoginForm />
    </main>
  );
}
