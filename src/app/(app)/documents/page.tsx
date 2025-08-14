import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilePlus2, Search, Filter, Download } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const documents = [
  { id: '1', title: 'Q2 Financial Report', client: 'Innovate Inc.', status: 'In Progress', date: '2023-06-30' },
  { id: '2', title: 'Service Agreement', client: 'Solutions Co.', status: 'Signed', date: '2023-05-15' },
  { id: '3', title: 'Project Proposal', client: 'Apex Enterprises', status: 'Paid', date: '2023-04-20' },
  { id: '4', title: 'NDA', client: 'Synergy Corp.', status: 'Signed', date: '2023-03-10' },
  { id: '5', title: 'Invoice #5678', client: 'Quantum Ltd.', status: 'Paid', date: '2023-06-01' },
];

export default function DocumentsPage() {
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
            <div>
                <CardTitle className="font-headline">Documents</CardTitle>
                <CardDescription>
                    Manage all your client documents.
                </CardDescription>
            </div>
            <Button asChild>
            <Link href="/documents/generate">
                <FilePlus2 />
                Generate Document
            </Link>
            </Button>
        </div>
        <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search documents..."
                className="w-full rounded-lg bg-background pl-8"
            />
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Signed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Paid</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map(doc => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.title}</TableCell>
                <TableCell className="hidden sm:table-cell">{doc.client}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(doc.status)}>{doc.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
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
  );
}
