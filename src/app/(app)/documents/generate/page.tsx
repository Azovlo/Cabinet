import { DocumentGenerator } from "@/components/document-generator";

export default function GenerateDocumentPage() {
    return (
        <div className="flex flex-col gap-4">
             <div>
                <h1 className="text-3xl font-bold font-headline">AI Document Generation</h1>
                <p className="text-muted-foreground">
                    Leverage AI to create tailored documents and get suggestions on content.
                </p>
            </div>
            <DocumentGenerator />
        </div>
    )
}
