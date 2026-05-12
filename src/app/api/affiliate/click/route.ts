export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { affiliateClickSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = {
      ref: searchParams.get("ref") || undefined,
      product: searchParams.get("product") || undefined,
    };

    const result = affiliateClickSchema.safeParse(rawParams);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { ref, product: productId } = result.data;

    // Look up the product from the database to get the real affiliate URL
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { affiliateUrl: true },
    });

    if (!product || !product.affiliateUrl) {
      // Product not found in DB, redirect to products page
      const url = new URL("/products", request.url);
      return NextResponse.redirect(url.toString(), 302);
    }

    // Find the user by affiliate code
    const user = await prisma.user.findUnique({
      where: { affiliateCode: ref },
      select: { id: true },
    });

    if (user) {
      // Get visitor IP for tracking (best effort)
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
      const referrer = request.headers.get("referer") || null;

      // Use a transaction to ensure click record and saldo increment are atomic
      await prisma.$transaction([
        prisma.affiliateClick.create({
          data: {
            userId: user.id,
            productId,
            visitorIp: ip,
            referrer,
          },
        }),
        prisma.user.update({
          where: { id: user.id },
          data: { saldo: { increment: 500 } },
        }),
      ]);
    }

    // Redirect to the database-stored affiliate URL (not user-supplied)
    const finalUrl = new URL(product.affiliateUrl);
    finalUrl.searchParams.set("ref", ref);

    return NextResponse.redirect(finalUrl.toString(), 302);
  } catch (error) {
    console.error("Affiliate click tracking error:", error instanceof Error ? error.message : "Unknown error");

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
