import { PrismaClient, SkinType, SkinTone, FaceShape } from '@prisma/client';

const prisma = new PrismaClient();

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
      name: 'Mineralist Hydra-Smoothing Lipstick',
      brand: 'bareMinerals',
      category: 'Lipstick',
      description: 'Clean, mineral-infused lipstick that hydrates and smooths lips.',
      priceEstimate: '$20 - $25',
      affiliateUrl: 'https://example.com/buy-4',
      imageUrl: 'https://picsum.photos/seed/lip3/400/400',
      muaVerdict: 'Beautifully hydrating. Highly recommended for mature or dry lips.',
      skinTypes: [SkinType.DRY, SkinType.SENSITIVE, SkinType.NORMAL],
      skinTones: [SkinTone.FAIR_COOL, SkinTone.FAIR_WARM, SkinTone.FAIR_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.HEART, FaceShape.DIAMOND],
    },
    {
      name: 'Double Wear Stay-in-Place Foundation',
      brand: 'Estée Lauder',
      category: 'Foundation',
      description: 'The #1 foundation worldwide. 24-hour wear. Flawless, natural, matte.',
      priceEstimate: '$45 - $50',
      affiliateUrl: 'https://example.com/buy-5',
      imageUrl: 'https://picsum.photos/seed/found2/400/400',
      muaVerdict: 'The gold standard for bridal and red carpet makeup. Incredible staying power.',
      skinTypes: [SkinType.OILY, SkinType.COMBINATION, SkinType.NORMAL],
      skinTones: [SkinTone.MEDIUM_NEUTRAL, SkinTone.MEDIUM_WARM, SkinTone.TAN_WARM, SkinTone.LIGHT_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.SQUARE, FaceShape.HEART, FaceShape.DIAMOND, FaceShape.OBLONG],
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
    },
    {
      name: 'Airbrush Flawless Finish',
      brand: 'Charlotte Tilbury',
      category: 'Powder',
      description: 'Ultra-finely milled powder that blurs lines and imperfections.',
      priceEstimate: '$45 - $48',
      affiliateUrl: 'https://example.com/buy-7',
      imageUrl: 'https://picsum.photos/seed/powder1/400/400',
      muaVerdict: 'Magic in a compact. It literally makes your skin look like it has a filter on it.',
      skinTypes: [SkinType.NORMAL, SkinType.COMBINATION, SkinType.DRY, SkinType.SENSITIVE],
      skinTones: [SkinTone.FAIR_NEUTRAL, SkinTone.LIGHT_NEUTRAL, SkinTone.MEDIUM_NEUTRAL, SkinTone.TAN_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.HEART, FaceShape.SQUARE, FaceShape.DIAMOND, FaceShape.OBLONG],
    },
    {
      name: 'Liquid Touch Brightening Concealer',
      brand: 'Rare Beauty',
      category: 'Concealer',
      description: 'Hydrating, long-wearing concealer that blends seamlessly.',
      priceEstimate: '$22 - $26',
      affiliateUrl: 'https://example.com/buy-8',
      imageUrl: 'https://picsum.photos/seed/conc1/400/400',
      muaVerdict: 'Incredible coverage that doesn\'t feel heavy. Great for covering dark circles.',
      skinTypes: [SkinType.DRY, SkinType.NORMAL, SkinType.COMBINATION, SkinType.SENSITIVE],
      skinTones: [SkinTone.FAIR_COOL, SkinTone.LIGHT_WARM, SkinTone.MEDIUM_NEUTRAL, SkinTone.TAN_COOL],
      faceShapes: [FaceShape.OVAL, FaceShape.HEART, FaceShape.DIAMOND],
    },
    {
      name: 'Better Than Sex Mascara',
      brand: 'Too Faced',
      category: 'Mascara',
      description: 'An hourglass-shaped brush that separates, coats, and curls each lash to voluptuous perfection.',
      priceEstimate: '$28 - $30',
      affiliateUrl: 'https://example.com/buy-9',
      imageUrl: 'https://picsum.photos/seed/masc1/400/400',
      muaVerdict: 'Dramatic volume in just one coat. A must-have for those who want that false lash effect.',
      skinTypes: [SkinType.OILY, SkinType.DRY, SkinType.NORMAL, SkinType.COMBINATION, SkinType.SENSITIVE],
      skinTones: [SkinTone.FAIR_COOL, SkinTone.LIGHT_WARM, SkinTone.MEDIUM_NEUTRAL, SkinTone.TAN_COOL, SkinTone.DEEP_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.ROUND, FaceShape.SQUARE, FaceShape.HEART, FaceShape.DIAMOND, FaceShape.OBLONG],
    },
    {
      name: 'Glow Screen SPF 40',
      brand: 'Supergoop!',
      category: 'Sunscreen',
      description: 'A glowy primer that protects skin with SPF 40 and leaves a dewy finish.',
      priceEstimate: '$36 - $38',
      affiliateUrl: 'https://example.com/buy-10',
      imageUrl: 'https://picsum.photos/seed/sun1/400/400',
      muaVerdict: 'The perfect hybrid of skincare and makeup. Gives a beautiful lit-from-within glow.',
      skinTypes: [SkinType.DRY, SkinType.NORMAL, SkinType.COMBINATION],
      skinTones: [SkinTone.FAIR_NEUTRAL, SkinTone.LIGHT_WARM, SkinTone.MEDIUM_WARM, SkinTone.TAN_NEUTRAL],
      faceShapes: [FaceShape.OVAL, FaceShape.HEART, FaceShape.DIAMOND],
    }
  ];

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });