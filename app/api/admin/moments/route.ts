import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Moment } from "../../../models/Moment";
import { slugify } from "../../../lib/slugify";
import { requireAdmin } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const moments = await Moment.find().sort({ createdAt: -1 });

    return NextResponse.json(moments, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/moments error:", error);

    return NextResponse.json(
      { message: "Failed to fetch admin moments" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const body = await req.json();

    const { title, description, images, isVisible = true } = body;

    if (
      !title ||
      !description ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Moment.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const moment = await Moment.create({
      title,
      description,
      images,
      isVisible,
      slug,
    });

    return NextResponse.json(moment, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/moments error:", error);

    return NextResponse.json(
      { message: "Failed to create moment" },
      { status: 500 },
    );
  }
}
