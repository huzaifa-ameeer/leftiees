import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/products";
import { WAIST_MAX, WAIST_MIN, isValidWaists } from "@/lib/waist";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body?.waists !== undefined && !isValidWaists(body.waists)) {
    return NextResponse.json(
      {
        error: `Waist must be one or more even numbers between ${WAIST_MIN} and ${WAIST_MAX} inches`,
      },
      { status: 400 },
    );
  }

  const product = await updateProduct(id, body);

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteProduct(id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
