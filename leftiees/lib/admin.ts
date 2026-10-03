import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "huzaifaameer098@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

export function isAdminUser(user?: {
  email?: string | null;
  role?: string | null;
}) {
  if (!user) return false;
  return user.role === "admin" || isAdminEmail(user.email);
}

export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const user = session.user as { email?: string; role?: string };
  if (!isAdminUser(user)) return null;

  return session;
}
