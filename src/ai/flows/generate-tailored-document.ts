'use server';
/**
 * @fileOverview A tailored document generation AI agent.
 *
 * - generateTailoredDocument - A function that handles the tailored document generation process.
 * - GenerateTailoredDocumentInput - The input type for the generateTailoredDocument function.
 * - GenerateTailoredDocumentOutput - The return type for the generateTailoredDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTailoredDocumentInputSchema = z.object({
  clientData: z.string().describe('Client data to generate document.'),
  templateType: z.string().describe('Type of the document template to use.'),
  informationNeeded: z.string().describe('Specific information required in the document.'),
});
export type GenerateTailoredDocumentInput = z.infer<
  typeof GenerateTailoredDocumentInputSchema
>;

const GenerateTailoredDocumentOutputSchema = z.object({
  document: z.string().describe('The generated document.'),
});
export type GenerateTailoredDocumentOutput = z.infer<
  typeof GenerateTailoredDocumentOutputSchema
>;

export async function generateTailoredDocument(
  input: GenerateTailoredDocumentInput
): Promise<GenerateTailoredDocumentOutput> {
  return generateTailoredDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredDocumentPrompt',
  input: {schema: GenerateTailoredDocumentInputSchema},
  output: {schema: GenerateTailoredDocumentOutputSchema},
  prompt: `You are an AI that specializes in generating tailored documents based on client data and specified template types.

  Here is the client data: {{{clientData}}}
  Here is the template type: {{{templateType}}}
  Here is the information needed: {{{informationNeeded}}}

  Generate a document that includes all required information.
  Follow all legal guidelines.
  Do not include personal opinions in the document.
  Use professional tone and terminology.
  Ensure the document is coherent and well-structured.
  The length of the document should not exceed two pages.
  `,
});

const generateTailoredDocumentFlow = ai.defineFlow(
  {
    name: 'generateTailoredDocumentFlow',
    inputSchema: GenerateTailoredDocumentInputSchema,
    outputSchema: GenerateTailoredDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
