import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin";

export async function GET() {
  const admin = await getAdminSession();
  return NextResponse.json({
    isAdmin: !!admin,
    email: admin?.user.email ?? null,
  });
}
