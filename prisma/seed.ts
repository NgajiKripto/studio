
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define enums locally since SQLite doesn't support them in schema
const SkinType = {
  OILY: 'OILY',
  DRY: 'DRY',
  NORMAL: 'NORMAL',
  COMBINATION: 'COMBINATION',
  SENSITIVE: 'SENSITIVE',
};

const SkinTone = {
  FAIR_COOL: 'FAIR_COOL',
  FAIR_WARM: 'FAIR_WARM',
  FAIR_NEUTRAL: 'FAIR_NEUTRAL',
  LIGHT_COOL: 'LIGHT_COOL',
  LIGHT_WARM: 'LIGHT_WARM',
  LIGHT_NEUTRAL: 'LIGHT_NEUTRAL',
  MEDIUM_COOL: 'MEDIUM_COOL',
  MEDIUM_WARM: 'MEDIUM_WARM',
  MEDIUM_NEUTRAL: 'MEDIUM_NEUTRAL',
  TAN_COOL: 'TAN_COOL',
  TAN_WARM: 'TAN_WARM',
  TAN_NEUTRAL: 'TAN_NEUTRAL',
  DEEP_COOL: 'DEEP_COOL',
  DEEP_WARM: 'DEEP_WARM',
  DEEP_NEUTRAL: 'DEEP_NEUTRAL',
};

const FaceShape = {
  OVAL: 'OVAL',
  ROUND: 'ROUND',
  SQUARE: 'SQUARE',
  HEART: 'HEART',
  DIAMOND: 'DIAMOND',
  OBLONG: 'OBLONG',
};

async function main() {
  const products = [
    {
      name: 'SuperStay Matte Ink',
      brand: 'Maybelline',
      category: 'Lipstick',
      description: 'Long-lasting liquid lipstick with a flawless matte finish.',
      priceEstimate: '$10 - $12',
      affiliateUrl: 'https://example.com/buy-1',
      imageUrl: 'https://picsum.photos/seed/lip1/400/400',
      muaVerdict: 'Perfect for long days when you need a bold lip that won\'t budge. Excellent pigment payoff.',
      skinTypes: [SkinType.OILY, SkinType.DRY, SkinType.NORMAL, SkinType.COMBINATION, SkinType.SENSITIVE],
      skinTones: [SkinTone.FAIR_COOL, SkinTone.LIGHT_COOL, SkinTone.MEDIUM_COOL, SkinTone.TAN_COOL, SkinTone.DEEP_COOL],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.HEART, FaceShape.SQUARE, FaceShape.DIAMOND, FaceShape.OBLONG],
    },
    {
      name: 'Exclusive Matte Lip Cream',
      brand: 'Wardah',
      category: 'Lipstick',
      description: 'Creamy matte lipstick with high coverage and breathable formula.',
      priceEstimate: '$5 - $7',
      affiliateUrl: 'https://example.com/buy-2',
      imageUrl: 'https://picsum.photos/seed/lip2/400/400',
      muaVerdict: 'A great everyday option. The formula is lightweight and comfortable for all-day wear.',
      skinTypes: [SkinType.NORMAL, SkinType.DRY, SkinType.SENSITIVE],
      skinTones: [SkinTone.FAIR_WARM, SkinTone.LIGHT_WARM, SkinTone.MEDIUM_WARM, SkinTone.TAN_WARM, SkinTone.DEEP_WARM],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.HEART, FaceShape.SQUARE, FaceShape.DIAMOND, FaceShape.OBLONG],
    },
    {
      name: 'Powerstay Matte Powder Foundation',
      brand: 'Make Over',
      category: 'Foundation',
      description: 'A long-lasting powder foundation that provides a smooth, matte finish.',
      priceEstimate: '$12 - $15',
      affiliateUrl: 'https://example.com/buy-3',
      imageUrl: 'https://picsum.photos/seed/found1/400/400',
      muaVerdict: 'Ideal for oily skin types looking for full coverage without the cakey feeling.',
      skinTypes: [SkinType.OILY, SkinType.COMBINATION],
      skinTones: [SkinTone.MEDIUM_NEUTRAL, SkinTone.TAN_NEUTRAL, SkinTone.DEEP_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.SQUARE],
    },
    {
      name: 'Orgasm Blush',
      brand: 'NARS',
      category: 'Blush',
      description: 'The industry\'s most iconic shade of blush for a natural, healthy-looking glow.',
      priceEstimate: '$30 - $35',
      affiliateUrl: 'https://example.com/buy-6',
      imageUrl: 'https://picsum.photos/seed/blush1/400/400',
      muaVerdict: 'Universally flattering. It adds the perfect amount of shimmer and warmth to any look.',
      skinTypes: [SkinType.NORMAL, SkinType.DRY, SkinType.COMBINATION, SkinType.OILY, SkinType.SENSITIVE],
      skinTones: [SkinTone.LIGHT_WARM, SkinTone.MEDIUM_WARM, SkinTone.TAN_WARM, SkinTone.FAIR_WARM],
      faceShapes: [FaceShape.ROUND, FaceShape.SQUARE, FaceShape.OBLONG, FaceShape.OVAL],
    }
  ];

  console.log('Cleaning up database...');
  await prisma.productSkinType.deleteMany();
  await prisma.productSkinTone.deleteMany();
  await prisma.productFaceShape.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding products...');
  for (const product of products) {
    const { skinTypes, skinTones, faceShapes, ...productData } = product;
    
    await prisma.product.create({
      data: {
        ...productData,
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
  }
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
