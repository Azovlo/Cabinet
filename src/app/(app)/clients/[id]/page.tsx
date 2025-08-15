import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Mail, Phone, Globe, Download, User as UserIcon, Users, Euro, Send } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const client = {
  id: '2',
  name: 'Solutions Co.',
  contact: 'Olivia Smith',
  email: 'olivia@solutions.com',
  phone: '+1 (555) 234-5678',
  website: 'solutions.com',
  avatarUrl: 'https://placehold.co/100x100.png',
  bio: 'Solutions Co. is a leading provider of innovative business solutions, helping clients achieve their strategic goals with cutting-edge technology and expert consulting services.',
};

const documents = [
    { id: 'doc1', title: 'Service Agreement', status: 'Signed', date: '2023-05-15' },
    { id: 'doc2', title: 'NDA', status: 'Signed', date: '2023-05-10' },
    { id: 'doc3', title: 'Project Proposal', status: 'In Progress', date: '2023-06-01' },
    { id: 'doc4', title: 'Invoice #1234', status: 'Paid', date: '2023-06-20' },
];

const interactions = [
    { id: 'int1', type: 'Email', summary: 'Initial contact and intro', date: '2023-05-01', from: 'employee' },
    { id: 'int2', type: 'Call', summary: 'Discussed project requirements', date: '2023-05-05', from: 'client' },
    { id: 'int3', type: 'Meeting', summary: 'Presented project proposal', date: '2023-05-25', from: 'employee' },
    { id: 'int4', type: 'Message', summary: 'Can you send over the latest invoice?', date: '2023-07-01', from: 'client' },
    { id: 'int5', type: 'Message', summary: 'Sure, I have just sent it to your email.', date: '2023-07-01', from: 'employee' },
];

const balance = {
  current: 1250.75,
  currency: 'EUR',
  transactions: [
    { id: 'txn1', date: '2023-06-20', description: 'Invoice #1234 Payment', amount: 2500, type: 'credit' },
    { id: 'txn2', date: '2023-06-01', description: 'Service Charge', amount: -1249.25, type: 'debit' },
  ],
};


export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Signed':
        return 'default';
      case 'Paid':
        return 'secondary';
      case 'In Progress':
        return 'outline';
      default:
        return 'outline';
    }
  }

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
          {client.name}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Client
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="company logo"/>
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-headline">{client.name}</CardTitle>
              <CardDescription className="mt-1">{client.bio}</CardDescription>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <UserIcon className="h-4 w-4" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${client.email}`} className="hover:text-primary hover:underline">{client.email}</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                 <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4" />
                  <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{client.website}</a>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="documents">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="balance">Balance</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>All documents related to {client.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell><Badge variant={getBadgeVariant(doc.status)}>{doc.status}</Badge></TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                           <Download className="h-4 w-4" />
                           <span className="sr-only">Download PDF</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Financial overview for {client.name}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-lg bg-secondary">
                 <div className="flex items-center gap-2">
                    <Euro className="h-8 w-8 text-primary"/>
                    <div className="text-3xl font-bold">{balance.current.toLocaleString('de-DE', { style: 'currency', currency: balance.currency })}</div>
                 </div>
                 <Button>Add Transaction</Button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Transaction History</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {balance.transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell className={`text-right font-medium ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.amount.toLocaleString('de-DE', { style: 'currency', currency: balance.currency })}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat">
           <Card>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
              <CardDescription>Chat history with {client.name}.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[60vh]">
              <div className="flex-grow space-y-4 overflow-y-auto pr-4">
                {interactions.filter(i => i.type === 'Message' || i.from === 'client' || i.from === 'employee').map(interaction => (
                  <div key={interaction.id} className={`flex items-start gap-3 ${interaction.from === 'employee' ? 'justify-end' : ''}`}>
                    {interaction.from === 'client' && (
                       <Avatar className="h-9 w-9 border">
                        <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="company logo" />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-2 max-w-[70%] ${interaction.from === 'employee' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{interaction.summary}</p>
                        <p className="text-xs text-right mt-1 opacity-70">{interaction.date}</p>
                    </div>
                     {interaction.from === 'employee' && (
                       <Avatar className="h-9 w-9 border">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Employee" data-ai-hint="profile picture" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 border-t pt-4">
                  <Input placeholder="Type your message..." className="flex-grow" />
                  <Button><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
