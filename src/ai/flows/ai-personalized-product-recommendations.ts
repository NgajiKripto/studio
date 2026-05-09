'use server';
/**
 * @fileOverview A Genkit flow for providing personalized makeup product recommendations.
 *
 * - aiPersonalizedProductRecommendations - A function that generates personalized product recommendations.
 * - AIPersonalizedProductRecommendationsInput - The input type for the aiPersonalizedProductRecommendations function.
 * - AIPersonalizedProductRecommendationsOutput - The return type for the aiPersonalizedProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define enums based on the Prisma schema as provided in the requirements
const SkinTypeEnum = z.enum([
  'OILY',
  'DRY',
  'NORMAL',
  'COMBINATION',
  'SENSITIVE',
]);
const SkinToneEnum = z.enum([
  'FAIR_COOL', 'FAIR_WARM', 'FAIR_NEUTRAL',
  'LIGHT_COOL', 'LIGHT_WARM', 'LIGHT_NEUTRAL',
  'MEDIUM_COOL', 'MEDIUM_WARM', 'MEDIUM_NEUTRAL',
  'TAN_COOL', 'TAN_WARM', 'TAN_NEUTRAL',
  'DEEP_COOL', 'DEEP_WARM', 'DEEP_NEUTRAL',
]);
const FaceShapeEnum = z.enum([
  'OVAL', 'ROUND', 'SQUARE', 'HEART', 'DIAMOND', 'OBLONG',
]);

const ProductSchema = z.object({
  id: z.string().describe('Unique identifier for the product.'),
  name: z.string().describe('Name of the product.'),
  brand: z.string().describe('Brand of the product.'),
  category: z.string().describe('Category of the product (e.g., Lipstick, Foundation).'),
  description: z.string().describe('Brief description of the product.'),
  priceEstimate: z.string().describe('Estimated price of the product (e.g., "$25 - $35").'),
  affiliateUrl: z.string().url().describe('Affiliate URL to purchase the product.'),
  imageUrl: z.string().url().describe('URL to the product image.'),
  muaVerdict: z.string().describe('Expert MUA verdict and recommendation for the product.'),
  // Assuming these are arrays of applicable types for a product from the database join
  skinTypes: z.array(SkinTypeEnum).describe('List of skin types this product is suitable for.'),
  skinTones: z.array(SkinToneEnum).describe('List of skin tones this product is suitable for.'),
  faceShapes: z.array(FaceShapeEnum).describe('List of face shapes this product is suitable for.'),
});

const AIPersonalizedProductRecommendationsInputSchema = z.object({
  skinType: SkinTypeEnum.describe('The user\'s skin type preference for recommendations.'),
  skinTone: SkinToneEnum.describe('The user\'s skin tone preference for recommendations.'),
  faceShape: FaceShapeEnum.describe('The user\'s face shape preference for recommendations.'),
  // This array would typically be fetched from the database before calling the flow.
  allProducts: z.array(ProductSchema).describe('A comprehensive list of all available makeup products with their suitability attributes.'),
});
export type AIPersonalizedProductRecommendationsInput = z.infer<typeof AIPersonalizedProductRecommendationsInputSchema>;

const RecommendedProductSchema = z.object({
  id: z.string().describe('Unique identifier for the recommended product.'),
  name: z.string().describe('Name of the recommended product.'),
  brand: z.string().describe('Brand of the recommended product.'),
  imageUrl: z.string().url().describe('URL to the recommended product image.'),
  muaVerdict: z.string().describe('Expert MUA verdict and recommendation for the product.'),
  reasonsForRecommendation: z.string().describe('A concise explanation of why this product is recommended for the user, based on their skin type, skin tone, face shape, and the MUA verdict.'),
});

const AIPersonalizedProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema).describe('A list of personalized product recommendations, typically 3-5 items.'),
});
export type AIPersonalizedProductRecommendationsOutput = z.infer<typeof AIPersonalizedProductRecommendationsOutputSchema>;

export async function aiPersonalizedProductRecommendations(
  input: AIPersonalizedProductRecommendationsInput
): Promise<AIPersonalizedProductRecommendationsOutput> {
  return personalizedProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedProductRecommendationsPrompt',
  input: {schema: AIPersonalizedProductRecommendationsInputSchema},
  output: {schema: AIPersonalizedProductRecommendationsOutputSchema},
  prompt: `You are an expert makeup artist (MUA) and a highly skilled product recommendation AI.
Your goal is to suggest the most suitable makeup products for a user based on their specific personal criteria: skin type, skin tone, and face shape.
You must perform the following steps:
1. From the 'Available Products' list, first filter out any products that are NOT suitable for the user's 'Skin Type', 'Skin Tone', OR 'Face Shape'. A product is suitable if its 'skinTypes' array includes the user's 'Skin Type', its 'skinTones' array includes the user's 'Skin Tone', AND its 'faceShapes' array includes the user's 'Face Shape'.
2. From this filtered list, select the best 3 to 5 products. Prioritize products with MUA verdicts that strongly align with the user's needs or address common concerns for their criteria.
3. For each selected product, provide its ID, name, brand, image URL, the MUA verdict, and a brief, compelling explanation of why it is specifically recommended for the user based on their input criteria and the product's attributes.

User's Criteria:
- Skin Type: {{{skinType}}}
- Skin Tone: {{{skinTone}}}
- Face Shape: {{{faceShape}}}

Available Products (JSON array of objects):
{{{JSON.stringify allProducts}}}

Provide your recommendations in the specified JSON output format. Ensure the reasons for recommendation are clear and personalized.`,
});

const personalizedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedProductRecommendationsFlow',
    inputSchema: AIPersonalizedProductRecommendationsInputSchema,
    outputSchema: AIPersonalizedProductRecommendationsOutputSchema,
  },
  async input => {
    // The prompt is designed to handle the filtering and selection directly.
    // We pass the raw input to the prompt.
    const {output} = await prompt(input);

    if (!output) {
      // In case of a parse error or no output from the LLM, return an empty array or throw.
      // For user experience, an empty array might be more graceful than a crash.
      console.error('AI failed to generate a valid output for recommendations.');
      return { recommendations: [] };
    }

    return output;
  }
);
