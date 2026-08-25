import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/mongodb";
import { Moment } from "../../models/Moment";

export async function GET() {
  try {
    await dbConnect();

    const moments = await Moment.find({ isVisible: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(moments, { status: 200 });
  } catch (error) {
    console.error("GET /api/moments error:", error);

    return NextResponse.json(
      { message: "Failed to fetch moments" },
      { status: 500 },
    );
  }
}
