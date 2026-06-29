import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Horse } from "../../../models/Horse";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { slug } = await params;

    const horse = await Horse.findOne({
      slug,
      isVisible: true,
    });

    if (!horse) {
      return NextResponse.json({ message: "Horse not found" }, { status: 404 });
    }

    return NextResponse.json(horse, { status: 200 });
  } catch (error) {
    console.error("GET /api/horses/[slug] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch horse" },
      { status: 500 },
    );
  }
}
