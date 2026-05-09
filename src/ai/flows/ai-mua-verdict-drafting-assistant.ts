'use server';
/**
 * @fileOverview An AI assistant for drafting MUA verdicts.
 *
 * - aiMuaVerdictDraftingAssistant - A function that generates a draft of the MUA verdict for a product.
 * - AiMuaVerdictDraftingAssistantInput - The input type for the aiMuaVerdictDraftingAssistant function.
 * - AiMuaVerdictDraftingAssistantOutput - The return type for the aiMuaVerdictDraftingAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiMuaVerdictDraftingAssistantInputSchema = z.object({
  name: z.string().describe('The name of the product.'),
  brand: z.string().describe('The brand of the product.'),
  category: z.string().describe('The category of the product (e.g., Foundation, Lipstick, Eyeshadow).'),
  description: z.string().describe('A detailed description of the product.'),
  skinTypes: z.array(z.enum(['OILY', 'DRY', 'NORMAL', 'COMBINATION', 'SENSITIVE'])).optional().describe('Applicable skin types for the product.'),
  skinTones: z.array(z.enum(['FAIR_COOL', 'FAIR_WARM', 'FAIR_NEUTRAL', 'LIGHT_COOL', 'LIGHT_WARM', 'LIGHT_NEUTRAL', 'MEDIUM_COOL', 'MEDIUM_WARM', 'MEDIUM_NEUTRAL', 'TAN_COOL', 'TAN_WARM', 'TAN_NEUTRAL', 'DEEP_COOL', 'DEEP_WARM', 'DEEP_NEUTRAL'])).optional().describe('Applicable skin tones for the product.'),
  faceShapes: z.array(z.enum(['OVAL', 'ROUND', 'SQUARE', 'HEART', 'DIAMOND', 'OBLONG'])).optional().describe('Applicable face shapes for the product.'),
});
export type AiMuaVerdictDraftingAssistantInput = z.infer<typeof AiMuaVerdictDraftingAssistantInputSchema>;

const AiMuaVerdictDraftingAssistantOutputSchema = z.object({
  muaVerdictDraft: z.string().describe('A draft of the MUA verdict for the product.'),
});
export type AiMuaVerdictDraftingAssistantOutput = z.infer<typeof AiMuaVerdictDraftingAssistantOutputSchema>;

export async function aiMuaVerdictDraftingAssistant(input: AiMuaVerdictDraftingAssistantInput): Promise<AiMuaVerdictDraftingAssistantOutput> {
  return aiMuaVerdictDraftingAssistantFlow(input);
}

const aiMuaVerdictDraftingAssistantPrompt = ai.definePrompt({
  name: 'aiMuaVerdictDraftingAssistantPrompt',
  input: { schema: AiMuaVerdictDraftingAssistantInputSchema },
  output: { schema: AiMuaVerdictDraftingAssistantOutputSchema },
  prompt: `You are an expert professional makeup artist (MUA) specializing in product recommendations.
Your task is to generate a concise, expert-level "MUA Verdict" draft for a new makeup product based on the provided details.
The verdict should highlight key benefits, ideal use cases, and suitability for different personal criteria.

Product Details:
Name: {{{name}}}
Brand: {{{brand}}}
Category: {{{category}}}
Description: {{{description}}}

{{#if skinTypes}}
Recommended for Skin Types: {{#each skinTypes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

{{#if skinTones}}
Recommended for Skin Tones: {{#each skinTones}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

{{#if faceShapes}}
Recommended for Face Shapes: {{#each faceShapes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

Based on this information, please provide a draft for the MUA Verdict:`,
});

const aiMuaVerdictDraftingAssistantFlow = ai.defineFlow(
  {
    name: 'aiMuaVerdictDraftingAssistantFlow',
    inputSchema: AiMuaVerdictDraftingAssistantInputSchema,
    outputSchema: AiMuaVerdictDraftingAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await aiMuaVerdictDraftingAssistantPrompt(input);
    return output!;
  }
);