import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GUEST_USER_ID = "cloudspark-guest";

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: GUEST_USER_ID },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
