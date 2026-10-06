import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin";
import { createProduct, getProducts } from "@/lib/products";
import { WAIST_MAX, WAIST_MIN, isValidWaist } from "@/lib/waist";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body?.name || typeof body.price !== "number") {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 },
    );
  }

  if (!isValidWaist(body?.waist)) {
    return NextResponse.json(
      {
        error: `Waist must be an even number between ${WAIST_MIN} and ${WAIST_MAX} inches`,
      },
      { status: 400 },
    );
  }

  const product = await createProduct(body);
  return NextResponse.json({ product }, { status: 201 });
}
