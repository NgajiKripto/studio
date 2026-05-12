
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  getAdminSessionTokenFromRequest,
  isAdminAuthorizedRequest,
} from "@/lib/admin-security";
import { productSchema } from "@/lib/validations";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        skinTypes: true,
        skinTones: true,
        faceShapes: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Product fetch failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionToken = getAdminSessionTokenFromRequest(req);
  if (!isAdminAuthorizedRequest(req.headers, sessionToken)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

    const product = await prisma.product.create({
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

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product creation failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
