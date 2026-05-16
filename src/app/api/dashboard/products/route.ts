export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dashboardProductsSchema } from "@/lib/validations";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = dashboardProductsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productIds } = result.data;
    const userId = session.user.id;

    // Verify user is premium
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || !["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"].includes(user.role)) {
      return NextResponse.json(
        { error: "Only premium users can manage recommended products" },
        { status: 403 }
      );
    }

    // Delete existing recommendations and replace with new ones
    await prisma.$transaction([
      prisma.userRecommendedProduct.deleteMany({
        where: { userId },
      }),
      prisma.userRecommendedProduct.createMany({
        data: productIds.map((productId) => ({
          userId,
          productId,
        })),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating recommended products:", message);
    if (message.includes("DATABASE_URL") || (error as any)?.name === "PrismaClientInitializationError") {
      return NextResponse.json(
        { error: "Database service unavailable" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
