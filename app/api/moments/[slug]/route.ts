import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { Moment } from "../../../models/Moment";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { slug } = await params;

    const moment = await Moment.findOne({ slug, isVisible: true });

    if (!moment) {
      return NextResponse.json(
        { message: "Moment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(moment, { status: 200 });
  } catch (error) {
    console.error("GET /api/moments/[slug] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch moment" },
      { status: 500 },
    );
  }
}
