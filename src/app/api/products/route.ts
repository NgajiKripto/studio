
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, brand, category, description, priceEstimate, 
      affiliateUrl, imageUrl, muaVerdict, 
      skinTypes, skinTones, faceShapes 
    } = body;

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

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
