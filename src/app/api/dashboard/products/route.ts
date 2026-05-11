import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productIds } = body as { productIds: string[] };

    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "productIds must be an array" },
        { status: 400 }
      );
    }

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
    console.error("Error updating recommended products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
