'use server';

/**
 * @fileOverview An AI agent that suggests whether certain information should be included in a generated document based on a client profile.
 *
 * - suggestDocumentInformation - A function that suggests information for document generation.
 * - SuggestDocumentInformationInput - The input type for the suggestDocumentInformation function.
 * - SuggestDocumentInformationOutput - The return type for the suggestDocumentInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDocumentInformationInputSchema = z.object({
  clientProfile: z
    .string()
    .describe('The profile of the client, including relevant details.'),
  documentType: z.string().describe('The type of document to be generated.'),
  informationConsidered: z
    .string()
    .describe('The information to be considered for inclusion in the document.'),
});
export type SuggestDocumentInformationInput = z.infer<
  typeof SuggestDocumentInformationInputSchema
>;

const SuggestDocumentInformationOutputSchema = z.object({
  includeInformation: z
    .boolean()
    .describe(
      'Whether or not the information should be included in the document.'
    ),
  reason: z.string().describe('The reasoning behind the decision.'),
});
export type SuggestDocumentInformationOutput = z.infer<
  typeof SuggestDocumentInformationOutputSchema
>;

export async function suggestDocumentInformation(
  input: SuggestDocumentInformationInput
): Promise<SuggestDocumentInformationOutput> {
  return suggestDocumentInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDocumentInformationPrompt',
  input: {schema: SuggestDocumentInformationInputSchema},
  output: {schema: SuggestDocumentInformationOutputSchema},
  prompt: `You are an AI assistant helping to generate documents.

You will be provided with a client profile, the type of document to be generated, and a piece of information to consider for inclusion.

Your task is to determine whether the information should be included in the document based on the client profile and document type.

Client Profile: {{{clientProfile}}}
Document Type: {{{documentType}}}
Information to Consider: {{{informationConsidered}}}

Based on the information above, should the information be included in the document? Explain your reasoning.
`, // Improved prompt for better context and instructions
});

const suggestDocumentInformationFlow = ai.defineFlow(
  {
    name: 'suggestDocumentInformationFlow',
    inputSchema: SuggestDocumentInformationInputSchema,
    outputSchema: SuggestDocumentInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
