import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skinType = searchParams.get("skinType");
    const skinTone = searchParams.get("skinTone");
    const faceShape = searchParams.get("faceShape");

    if (!skinType || !skinTone || !faceShape) {
      return NextResponse.json(
        { error: "Missing parameters: skinType, skinTone, faceShape" },
        { status: 400 }
      );
    }

    // Find premium users with matching skin profile
    const twins = await prisma.user.findMany({
      where: {
        role: { in: ["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"] },
        subscriptionStatus: "ACTIVE",
        skinType: skinType as any,
        skinTone: skinTone as any,
        faceShape: faceShape as any,
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        role: true,
        bio: true,
      },
      orderBy: { role: "desc" }, // GLOW_STAR first
      take: 5,
    });

    return NextResponse.json({ twins });
  } catch (error) {
    console.error("Error fetching skin twins:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
