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
import { PlusCircle, Search, Filter } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const clients = [
  { id: '1', name: 'Innovate Inc.', contact: 'Liam Johnson', email: 'liam@innovate.com', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '2', name: 'Solutions Co.', contact: 'Olivia Smith', email: 'olivia@solutions.com', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '3', name: 'Apex Enterprises', contact: 'Noah Williams', email: 'noah@apex.com', status: 'Inactive', avatar: 'https://placehold.co/100x100.png' },
  { id: '4', name: 'Synergy Corp.', contact: 'Emma Brown', email: 'emma@synergy.com', status: 'Lead', avatar: 'https://placehold.co/100x100.png' },
  { id: '5', name: 'Quantum Ltd.', contact: 'Ava Jones', email: 'ava@quantum.com', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '6', name: 'Starlight LLC', contact: 'James Taylor', email: 'james@starlight.com', status: 'Lead', avatar: 'https://placehold.co/100x100.png' },
];

export default function ClientsPage() {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Lead':
        return 'secondary';
      case 'Inactive':
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
                <CardTitle className="font-headline">Clients</CardTitle>
                <CardDescription>
                    Manage your clients and their information.
                </CardDescription>
            </div>
            <Button asChild>
            <Link href="/clients/new">
                <PlusCircle />
                Add Client
            </Link>
            </Button>
        </div>
        <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search clients..."
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
                <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Lead</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="hidden sm:table-cell">Contact Person</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id} className="group">
                 <TableCell>
                  <Link href={`/clients/${client.id}`} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="company logo"/>
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium group-hover:underline">{client.name}</span>
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{client.contact}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{client.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
