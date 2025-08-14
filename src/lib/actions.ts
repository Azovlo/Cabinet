'use server';

import {
  suggestDocumentInformation,
  type SuggestDocumentInformationInput,
} from '@/ai/flows/suggest-document-information';
import {
  generateTailoredDocument,
  type GenerateTailoredDocumentInput,
} from '@/ai/flows/generate-tailored-document';

export async function suggestInformationAction(
  input: SuggestDocumentInformationInput
) {
  try {
    const result = await suggestDocumentInformation(input);
    return result;
  } catch (error) {
    console.error('Error in suggestInformationAction:', error);
    throw new Error('Failed to get suggestion from AI.');
  }
}

export async function generateDocumentAction(
  input: GenerateTailoredDocumentInput
) {
  try {
    const result = await generateTailoredDocument(input);
    return result;
  } catch (error) {
    console.error('Error in generateDocumentAction:', error);
    throw new Error('Failed to generate document from AI.');
  }
}
