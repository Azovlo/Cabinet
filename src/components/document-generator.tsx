'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Sparkles, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateDocumentAction, suggestInformationAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from './ui/label';

const SuggestionFormSchema = z.object({
  clientProfile: z.string().min(10, 'Please provide a more detailed client profile.'),
  documentType: z.string().min(3, 'Please specify the document type.'),
  informationConsidered: z.string().min(5, 'Please specify the information to consider.'),
});

const GenerationFormSchema = z.object({
  clientData: z.string().min(10, 'Please provide detailed client data.'),
  templateType: z.string().min(3, 'Please specify the template type.'),
  informationNeeded: z.string().min(10, 'Please describe the information needed.'),
});

type SuggestionResult = {
  includeInformation: boolean;
  reason: string;
};

export function DocumentGenerator() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const [generatedDocument, setGeneratedDocument] = useState<string>('');

  const suggestionForm = useForm<z.infer<typeof SuggestionFormSchema>>({
    resolver: zodResolver(SuggestionFormSchema),
    defaultValues: {
      clientProfile: '',
      documentType: '',
      informationConsidered: '',
    },
  });

  const generationForm = useForm<z.infer<typeof GenerationFormSchema>>({
    resolver: zodResolver(GenerationFormSchema),
    defaultValues: {
      clientData: '',
      templateType: '',
      informationNeeded: '',
    },
  });

  async function onSuggestionSubmit(values: z.infer<typeof SuggestionFormSchema>) {
    setIsSuggesting(true);
    setSuggestion(null);
    try {
      const result = await suggestInformationAction(values);
      setSuggestion(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get suggestion. Please try again.',
      });
    } finally {
      setIsSuggesting(false);
    }
  }

  async function onGenerationSubmit(values: z.infer<typeof GenerationFormSchema>) {
    setIsGenerating(true);
    setGeneratedDocument('');
    try {
      const result = await generateDocumentAction(values);
      setGeneratedDocument(result.document);
      toast({
        title: 'Document Generated',
        description: 'Your tailored document is ready.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate document. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  }
  
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Lightbulb className="text-primary" />
            Information Suggester
          </CardTitle>
          <CardDescription>
            AI-powered reasoning on whether to include specific information in a document.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...suggestionForm}>
            <form onSubmit={suggestionForm.handleSubmit(onSuggestionSubmit)} className="space-y-4">
              <FormField
                control={suggestionForm.control}
                name="clientProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Profile</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A startup in the tech industry, pre-seed funding, 5 employees..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={suggestionForm.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Non-Disclosure Agreement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={suggestionForm.control}
                name="informationConsidered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Information to Consider</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Clause about future funding rounds" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSuggesting} className="w-full">
                {isSuggesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Suggestion
              </Button>
            </form>
          </Form>
          {suggestion && (
            <Alert className="mt-4">
              {suggestion.includeInformation ? <ThumbsUp className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
              <AlertTitle>{suggestion.includeInformation ? "Recommendation: Include" : "Recommendation: Do Not Include"}</AlertTitle>
              <AlertDescription>{suggestion.reason}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Sparkles className="text-primary" />
            Tailored Document Generator
          </CardTitle>
          <CardDescription>
            Generate a document tailored to your client's needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Form {...generationForm}>
            <form onSubmit={generationForm.handleSubmit(onGenerationSubmit)} className="space-y-4">
               <FormField
                control={generationForm.control}
                name="clientData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste relevant client data here..." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={generationForm.control}
                name="templateType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Consulting Agreement" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={generationForm.control}
                name="informationNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Information Needed</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Include payment terms, project timeline, and confidentiality clause." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Document
              </Button>
            </form>
          </Form>
          {generatedDocument && (
            <div className="mt-4 space-y-2">
                <Label>Generated Document</Label>
                <Textarea readOnly value={generatedDocument} className="h-64 font-mono text-xs" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
