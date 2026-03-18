import { dbConnect } from "@/app/lib/mongodb";
import { Horse } from "@/app/models/Horse";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const horses = await Horse.find().sort({ createdAt: -1 });

  return NextResponse.json(horses);
}
