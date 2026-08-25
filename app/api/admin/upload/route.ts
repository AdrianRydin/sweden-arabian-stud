import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { requireAdmin } from "../../../lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FOLDERS = [
  "sweden-arabian-stud/horses",
  "sweden-arabian-stud/moments",
];

function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { message: "Cloudinary is not configured" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const requestedFolder = formData.get("folder");

    const folder =
      typeof requestedFolder === "string" &&
      ALLOWED_FOLDERS.includes(requestedFolder)
        ? requestedFolder
        : "sweden-arabian-stud/horses";

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image is too large. Max size is 5MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);

    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 },
    );
  }
}
