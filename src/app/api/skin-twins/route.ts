export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skinTwinsSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = {
      skinType: searchParams.get("skinType") || undefined,
      skinTone: searchParams.get("skinTone") || undefined,
      faceShape: searchParams.get("faceShape") || undefined,
    };

    const result = skinTwinsSchema.safeParse(rawParams);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { skinType, skinTone, faceShape } = result.data;

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
    console.error("Error fetching skin twins:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
