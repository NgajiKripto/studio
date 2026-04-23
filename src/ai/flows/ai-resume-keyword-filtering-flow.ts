'use server';
/**
 * @fileOverview A Genkit flow to automatically score candidate resumes based on specified keywords and phrases.
 *
 * - aiResumeKeywordFiltering - A function that handles the AI-powered resume scoring process.
 * - AiResumeKeywordFilteringInput - The input type for the aiResumeKeywordFiltering function.
 * - AiResumeKeywordFilteringOutput - The return type for the aiResumeKeywordFiltering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiResumeKeywordFilteringInputSchema = z.object({
  jobDescription: z
    .string()
    .describe(
      'The job description, including critical keywords and phrases that candidates must possess.'
    ),
  candidateResume: z
    .string()
    .describe('The full text content of the candidate\'s resume.'),
});
export type AiResumeKeywordFilteringInput = z.infer<
  typeof AiResumeKeywordFilteringInputSchema
>;

const AiResumeKeywordFilteringOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('A match score between 0 and 100.'),
  status: z
    .enum(['Lolos', 'Gagal'])
    .describe('The final status, "Lolos" if score >= 70, otherwise "Gagal".'),
  cocok: z
    .array(z.string())
    .describe('An array of skills from the resume that match the job description.'),
  kurang: z
    .array(z.string())
    .describe('An array of required skills that are missing from the resume.'),
});
export type AiResumeKeywordFilteringOutput = z.infer<
  typeof AiResumeKeywordFilteringOutputSchema
>;

export async function aiResumeKeywordFiltering(
  input: AiResumeKeywordFilteringInput
): Promise<AiResumeKeywordFilteringOutput> {
  return aiResumeKeywordFilteringFlow(input);
}

const aiResumeKeywordFilteringPrompt = ai.definePrompt({
  name: 'aiResumeKeywordFilteringPrompt',
  input: {schema: AiResumeKeywordFilteringInputSchema},
  output: {schema: AiResumeKeywordFilteringOutputSchema},
  prompt: `Anda adalah AI Recruitment Assistant. Analisis teks CV berikut dan cocokkan dengan kualifikasi pekerjaan. Anda HANYA boleh membalas dengan format JSON murni tanpa markdown, tanpa backticks, dan tanpa teks pengantar. Format wajib:
{
  "score": <angka 0-100>,
  "status": <"Lolos" atau "Gagal">,
  "cocok": [<array skill yang sesuai>],
  "kurang": [<array skill yang tidak ada>]
}

Tetapkan "status" menjadi "Lolos" jika skor 70 atau lebih, dan "Gagal" jika sebaliknya.
Dasarkan skor Anda pada keberadaan keterampilan yang dibutuhkan, pengalaman bertahun-tahun, dan relevansi secara keseluruhan.

Kualifikasi Pekerjaan:
{{{jobDescription}}}

CV Kandidat:
{{{candidateResume}}}
`,
});

const aiResumeKeywordFilteringFlow = ai.defineFlow(
  {
    name: 'aiResumeKeywordFilteringFlow',
    inputSchema: AiResumeKeywordFilteringInputSchema,
    outputSchema: AiResumeKeywordFilteringOutputSchema,
  },
  async (input) => {
    const {output} = await aiResumeKeywordFilteringPrompt(input);
    return output!;
  }
);
