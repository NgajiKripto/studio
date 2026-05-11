import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get("ref");
    const productId = searchParams.get("product");
    const targetUrl = searchParams.get("url");

    if (!ref || !productId || !targetUrl) {
      return NextResponse.json(
        { error: "Missing required parameters: ref, product, url" },
        { status: 400 }
      );
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

      // Record the click
      await prisma.affiliateClick.create({
        data: {
          userId: user.id,
          productId,
          visitorIp: ip,
          referrer,
        },
      });

      // Increment saldo (Rp 500 per click as example commission)
      await prisma.user.update({
        where: { id: user.id },
        data: { saldo: { increment: 500 } },
      });
    }

    // Redirect to the actual product URL with affiliate ref parameter
    const finalUrl = new URL(targetUrl);
    finalUrl.searchParams.set("ref", ref);

    return NextResponse.redirect(finalUrl.toString(), 302);
  } catch (error) {
    console.error("Affiliate click tracking error:", error);

    // Fallback: if there's an error, still try to redirect
    const targetUrl = new URL(request.url).searchParams.get("url");
    if (targetUrl) {
      return NextResponse.redirect(targetUrl, 302);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
