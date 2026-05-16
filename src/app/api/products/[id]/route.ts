
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  getAdminSessionTokenFromRequest,
  isAdminAuthorizedRequest,
} from "@/lib/admin-security";
import { productSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        skinTypes: true,
        skinTones: true,
        faceShapes: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product fetch failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionToken = getAdminSessionTokenFromRequest(req);
  if (!isAdminAuthorizedRequest(req.headers, sessionToken)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, brand, category, description, priceEstimate, affiliateUrl, imageUrl, muaVerdict, skinTypes, skinTones, faceShapes } = result.data;

    // We handle updates by deleting old relations and creating new ones in a transaction
    const product = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Clear existing relations
      await tx.productSkinType.deleteMany({ where: { productId: id } });
      await tx.productSkinTone.deleteMany({ where: { productId: id } });
      await tx.productFaceShape.deleteMany({ where: { productId: id } });

      // Update product and create new relations
      return await tx.product.update({
        where: { id },
        data: {
          name,
          brand,
          category,
          description,
          priceEstimate,
          affiliateUrl,
          imageUrl,
          muaVerdict,
          skinTypes: {
            create: skinTypes.map((type) => ({ skinType: type })),
          },
          skinTones: {
            create: skinTones.map((tone) => ({ skinTone: tone })),
          },
          faceShapes: {
            create: faceShapes.map((shape) => ({ faceShape: shape })),
          },
        },
      });
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product operation failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionToken = getAdminSessionTokenFromRequest(req);
  if (!isAdminAuthorizedRequest(req.headers, sessionToken)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  try {
    // Relationships should be handled by onDelete: Cascade in schema, 
    // but if not, we handle it here.
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product deletion failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
