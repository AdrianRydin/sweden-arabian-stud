import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/mongodb";
import { Horse } from "../../../../models/Horse";
import { slugify } from "../../../../lib/slugify";
import { requireAdmin } from "../../../../lib/auth";

const allowedSections = ["females", "males", "sale-horses"];

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

    const horse = await Horse.findById(id);

    if (!horse) {
      return NextResponse.json({ message: "Horse not found" }, { status: 404 });
    }

    return NextResponse.json(horse, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/horses/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch horse" },
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

    const existingHorse = await Horse.findById(id);

    if (!existingHorse) {
      return NextResponse.json({ message: "Horse not found" }, { status: 404 });
    }

    if (body.section && !allowedSections.includes(body.section)) {
      return NextResponse.json(
        { message: "Invalid horse section" },
        { status: 400 },
      );
    }

    const allowedUpdateFields = [
      "name",
      "birthYear",
      "breed",
      "description",
      "image",
      "owner",
      "breeder",
      "sire",
      "dam",
      "pedigree",
      "section",
      "status",
      "price",
      "isVisible",
    ];

    const updateData: Record<string, unknown> = {};

    for (const field of allowedUpdateFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    if (typeof body.name === "string" && body.name !== existingHorse.name) {
      const baseSlug = slugify(body.name);
      let slug = baseSlug;
      let counter = 1;

      while (await Horse.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      updateData.slug = slug;
    }

    if (body.pedigree || body.name) {
      updateData.pedigree = {
        ...(existingHorse.pedigree || {}),
        ...(body.pedigree || {}),
        horse: body.name || existingHorse.name,
      };
    }

    const updatedHorse = await Horse.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedHorse, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/horses/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update horse" },
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

    const deletedHorse = await Horse.findByIdAndDelete(id);

    if (!deletedHorse) {
      return NextResponse.json({ message: "Horse not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Horse deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/admin/horses/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete horse" },
      { status: 500 },
    );
  }
}
