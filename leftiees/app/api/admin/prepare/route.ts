import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/admin";
import { connectToDatabase } from "@/lib/mongoose";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Admins are provisioned manually in MongoDB, so they are not expected to go
// through the customer email-OTP flow. Before an admin signs in we clear the
// "email not verified" gate on their account (only for admin accounts).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const user = await db.collection("user").findOne<{
    _id: mongoose.Types.ObjectId;
    role?: string;
    emailVerified?: boolean;
  }>({
    email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
  });

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const isAdmin = user.role === "admin" || isAdminEmail(email);

  if (isAdmin && !user.emailVerified) {
    await db.collection("user").updateOne(
      { _id: user._id },
      { $set: { emailVerified: true, updatedAt: new Date() } },
    );
  }

  return NextResponse.json({ ok: true });
}
