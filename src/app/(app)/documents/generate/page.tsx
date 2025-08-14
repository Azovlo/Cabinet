import { DocumentGenerator } from "@/components/document-generator";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GenerateDocumentPage() {
    return (
        <div className="flex flex-col gap-6">
             <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold font-headline">Генератор документов</h1>
                <div className="text-sm text-muted-foreground flex items-center gap-2 ml-auto">
                    <Home className="h-4 w-4" />
                    <Link href="/dashboard" className="hover:text-primary">Главная</Link>
                    <span>/</span>
                    <span>Генератор документов</span>
                </div>
            </div>
            <DocumentGenerator />
        </div>
    )
}
