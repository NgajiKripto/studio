import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Check API key authentication
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Only aggregate data where consent was given
    const whereConsented = { consentGiven: true };

    // Get total count
    const totalProfiles = await prisma.quizResult.count({
      where: whereConsented,
    });

    // Group by skinType
    const skinTypeGroups = await prisma.quizResult.groupBy({
      by: ["skinType"],
      where: whereConsented,
      _count: { skinType: true },
    });

    // Group by skinTone
    const skinToneGroups = await prisma.quizResult.groupBy({
      by: ["skinTone"],
      where: whereConsented,
      _count: { skinTone: true },
    });

    // Group by faceShape
    const faceShapeGroups = await prisma.quizResult.groupBy({
      by: ["faceShape"],
      where: whereConsented,
      _count: { faceShape: true },
    });

    // Group by activity
    const activityGroups = await prisma.quizResult.groupBy({
      by: ["activity"],
      where: whereConsented,
      _count: { activity: true },
    });

    // Transform into key-value objects
    const bySkinType: Record<string, number> = {};
    skinTypeGroups.forEach((g: { skinType: string; _count: { skinType: number } }) => {
      bySkinType[g.skinType] = g._count.skinType;
    });

    const bySkinTone: Record<string, number> = {};
    skinToneGroups.forEach((g: { skinTone: string; _count: { skinTone: number } }) => {
      bySkinTone[g.skinTone] = g._count.skinTone;
    });

    const byFaceShape: Record<string, number> = {};
    faceShapeGroups.forEach((g: { faceShape: string; _count: { faceShape: number } }) => {
      byFaceShape[g.faceShape] = g._count.faceShape;
    });

    const byActivity: Record<string, number> = {};
    activityGroups.forEach((g: { activity: string; _count: { activity: number } }) => {
      byActivity[g.activity] = g._count.activity;
    });

    return NextResponse.json({
      totalProfiles,
      bySkinType,
      bySkinTone,
      byFaceShape,
      byActivity,
    });
  } catch (error) {
    console.error("Error fetching aggregate data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
