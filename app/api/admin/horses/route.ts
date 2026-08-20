import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Horse } from "../../../models/Horse";
import { slugify } from "../../../lib/slugify";
import { requireAdmin } from "../../../lib/auth";

const allowedSections = ["females", "males", "sale-horses"];

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    const query: Record<string, unknown> = {};

    if (section) {
      if (!allowedSections.includes(section)) {
        return NextResponse.json(
          { message: "Invalid horse section" },
          { status: 400 },
        );
      }

      query.section = section;
    }

    const horses = await Horse.find(query).sort({ createdAt: -1 });

    return NextResponse.json(horses, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/horses error:", error);

    return NextResponse.json(
      { message: "Failed to fetch admin horses" },
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

    const {
      name,
      birthYear,
      breed,
      description,
      image,
      owner,
      breeder,
      sire,
      dam,
      pedigree,
      section,
      status = "available",
      price = "",
      isVisible = true,
    } = body;

    if (
      !name ||
      !birthYear ||
      !breed ||
      !description ||
      !image ||
      !owner ||
      !breeder ||
      !sire ||
      !dam ||
      !section
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { message: "Invalid horse section" },
        { status: 400 },
      );
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;

    while (await Horse.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const horse = await Horse.create({
      name,
      birthYear,
      breed,
      description,
      image,
      owner,
      breeder,
      sire,
      dam,
      pedigree: {
        ...pedigree,
        horse: name,
      },
      section,
      status,
      price,
      isVisible,
      slug,
    });

    return NextResponse.json(horse, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/horses error:", error);

    return NextResponse.json(
      { message: "Failed to create horse" },
      { status: 500 },
    );
  }
}
