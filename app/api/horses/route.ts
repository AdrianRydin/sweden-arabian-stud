import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/mongodb";
import { Horse } from "../../models/Horse";

const allowedSections = ["females", "males", "sale-horses"];

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    const query: Record<string, unknown> = {
      isVisible: true,
    };

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
    console.error("GET /api/horses error:", error);

    return NextResponse.json(
      { message: "Failed to fetch horses" },
      { status: 500 },
    );
  }
}
