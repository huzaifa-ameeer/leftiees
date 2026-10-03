import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongoose";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    return NextResponse.json({ exists: false });
  }

  const user = await db.collection("user").findOne({
    email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
  });

  return NextResponse.json({ exists: !!user });
}
