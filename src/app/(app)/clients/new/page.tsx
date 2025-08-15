
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                <Link href="/clients">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold font-headline tracking-tight sm:grow-0">
                Add New Client
                </h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                    <CardDescription>Fill in the details below to add a new client.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="client-name">Client Name</Label>
                                <Input id="client-name" placeholder="e.g., Innovate Inc." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact-person">Contact Person</Label>
                                <Input id="contact-person" placeholder="e.g., Liam Johnson" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="e.g., liam@innovate.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="e.g., +1 (555) 000-0000" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" placeholder="e.g., innovate.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Client Bio</Label>
                            <Textarea id="bio" placeholder="A brief description of the client..." />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/clients">Cancel</Link>
                            </Button>
                            <Button type="submit">Save Client</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
