import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quizResultSchema = z.object({
  sessionId: z.string().min(1),
  skinType: z.string().min(1),
  skinTone: z.string().min(1),
  faceShape: z.string().min(1),
  activity: z.enum(["OUTDOOR", "INDOOR"]),
  consentGiven: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = quizResultSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, skinType, skinTone, faceShape, activity, consentGiven } = parsed.data;

    // Only save if consent is given
    if (!consentGiven) {
      return NextResponse.json(
        { error: "Consent is required to save data" },
        { status: 400 }
      );
    }

    const result = await prisma.quizResult.create({
      data: {
        sessionId,
        skinType,
        skinTone,
        faceShape,
        activity,
        consentGiven,
      },
    });

    return NextResponse.json(
      { success: true, id: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
