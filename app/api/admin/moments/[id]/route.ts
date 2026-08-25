import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { Moment } from "../../../../models/Moment";
import { slugify } from "../../../../lib/slugify";
import { requireAdmin } from "../../../../lib/auth";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const { id } = await params;

    const moment = await Moment.findById(id);

    if (!moment) {
      return NextResponse.json(
        { message: "Moment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(moment, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/moments/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch moment" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    const existingMoment = await Moment.findById(id);

    if (!existingMoment) {
      return NextResponse.json(
        { message: "Moment not found" },
        { status: 404 },
      );
    }

    if ("images" in body && (!Array.isArray(body.images) || body.images.length === 0)) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 },
      );
    }

    const allowedUpdateFields = ["title", "description", "images", "isVisible"];

    const updateData: Record<string, unknown> = {};

    for (const field of allowedUpdateFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    if (typeof body.title === "string" && body.title !== existingMoment.title) {
      const baseSlug = slugify(body.title);
      let slug = baseSlug;
      let counter = 1;

      while (await Moment.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      updateData.slug = slug;
    }

    const updatedMoment = await Moment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedMoment, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/moments/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update moment" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const { id } = await params;

    const deletedMoment = await Moment.findByIdAndDelete(id);

    if (!deletedMoment) {
      return NextResponse.json(
        { message: "Moment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Moment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/admin/moments/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete moment" },
      { status: 500 },
    );
  }
}
