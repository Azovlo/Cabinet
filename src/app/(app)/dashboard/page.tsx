'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Briefcase,
  FileCheck2,
  PlusCircle,
  FilePlus2,
} from 'lucide-react';
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "January", deals: 10, signed: 8 },
  { month: "February", deals: 15, signed: 12 },
  { month: "March", deals: 12, signed: 11 },
  { month: "April", deals: 20, signed: 18 },
  { month: "May", deals: 25, signed: 22 },
  { month: "June", deals: 22, signed: 20 },
];

const chartConfig = {
  deals: { label: "Deals", color: "hsl(var(--primary))" },
  signed: { label: "Signed", color: "hsl(var(--accent))" },
}

const recentClients = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', status: 'Active' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', status: 'Active' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', status: 'Lead' },
    { name: 'William Kim', email: 'will@email.com', status: 'Active' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', status: 'Inactive' },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's a summary of your activities.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button asChild className="flex-1 sm:flex-none">
            <Link href="/clients">
              <PlusCircle />
              Add Client
            </Link>
          </Button>
          <Button variant="secondary" asChild className="flex-1 sm:flex-none">
            <Link href="/documents/generate">
              <FilePlus2 />
              Generate
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deals in Progress
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">
              +12 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Documents Signed
            </CardTitle>
            <FileCheck2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Deals Overview</CardTitle>
            <CardDescription>Monthly deals and signed documents.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="#888888"
                    fontSize={12}
                  />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="deals" fill="var(--color-deals)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="signed" fill="var(--color-signed)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Clients</CardTitle>
            <CardDescription>
              Clients added in the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentClients.map(client => (
                    <TableRow key={client.email}>
                        <TableCell>
                            <div className="font-medium">{client.name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                            {client.email}
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <Badge variant={client.status === 'Active' ? 'default' : client.status === 'Lead' ? 'secondary' : 'outline'}>{client.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
