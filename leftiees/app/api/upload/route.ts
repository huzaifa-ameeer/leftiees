import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env file.",
      },
      { status: 500 },
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "leftiees", resource_type: "image" },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Upload failed"));
            return;
          }
          resolve(
            result.secure_url.replace(
              "/image/upload/",
              "/image/upload/f_auto,q_auto,w_1600,c_limit/",
            ),
          );
        },
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url });
  } catch (error) {
    const status = (error as { http_code?: number })?.http_code;
    const message = error instanceof Error ? error.message : "Upload failed";
    const hint =
      status === 403
        ? ' Cloudinary rejected the request — the API key is likely missing the upload ("create") permission.'
        : "";

    return NextResponse.json({ error: `${message}${hint}` }, { status: 500 });
  }
}
