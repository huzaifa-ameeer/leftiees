import { redirect } from "next/navigation";

import AdminSidebar from "@/app/components/admin/admin-sidebar";
import { getAdminSession } from "@/lib/admin";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:px-8">
      <AdminSidebar email={admin.user.email} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
