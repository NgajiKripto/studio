
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  getAdminSessionTokenFromRequest,
  isAdminAuthorizedRequest,
} from "@/lib/admin-security";

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
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionToken = getAdminSessionTokenFromRequest(req);
  if (!isAdminAuthorizedRequest(req.headers, sessionToken)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { 
      name, brand, category, description, priceEstimate, 
      affiliateUrl, imageUrl, muaVerdict, 
      skinTypes, skinTones, faceShapes 
    } = body;

    // We handle updates by deleting old relations and creating new ones in a transaction
    const product = await prisma.$transaction(async (tx) => {
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
            create: skinTypes.map((type: string) => ({ skinType: type })),
          },
          skinTones: {
            create: skinTones.map((tone: string) => ({ skinTone: tone })),
          },
          faceShapes: {
            create: faceShapes.map((shape: string) => ({ faceShape: shape })),
          },
        },
      });
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionToken = getAdminSessionTokenFromRequest(req);
  if (!isAdminAuthorizedRequest(req.headers, sessionToken)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
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
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
