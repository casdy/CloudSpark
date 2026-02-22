import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GUEST_USER_ID = "cloudspark-guest";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conversation = await prisma.conversation.findUnique({
      where: { id, userId: GUEST_USER_ID },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
    return NextResponse.json(conversation);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.conversation.delete({
      where: { id, userId: GUEST_USER_ID },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}
