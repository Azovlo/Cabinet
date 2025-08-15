'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Activity, Clock, UserPlus, UserMinus, FileUp, FileEdit } from 'lucide-react';


const employees = [
  {
    name: 'Alexey Smirnov',
    avatar: 'https://placehold.co/100x100.png',
    email: 'alexey.s@clientdesk.ai',
    stats: {
      clientsAdded: 12,
      clientsRemoved: 2,
      docsCreated: 35,
      docsEdited: 58,
      onlineTime: '15h 24m',
    },
    lastActivity: 'Logged in 15 minutes ago',
  },
  {
    name: 'Elena Petrova',
    avatar: 'https://placehold.co/100x100.png',
    email: 'elena.p@clientdesk.ai',
    stats: {
      clientsAdded: 8,
      clientsRemoved: 1,
      docsCreated: 22,
      docsEdited: 41,
      onlineTime: '12h 5m',
    },
    lastActivity: 'Edited a document 1 hour ago',
  },
  {
    name: 'Dmitry Ivanov',
    avatar: 'https://placehold.co/100x100.png',
    email: 'dmitry.i@clientdesk.ai',
    stats: {
      clientsAdded: 15,
      clientsRemoved: 0,
      docsCreated: 40,
      docsEdited: 72,
      onlineTime: '20h 18m',
    },
    lastActivity: 'Added a new client 3 hours ago',
  },
];

const chartData = employees.map(e => ({
    name: e.name.split(' ')[0],
    clients: e.stats.clientsAdded,
    documents: e.stats.docsCreated
}));

const chartConfig = {
  clients: { label: 'Clients Added', color: 'hsl(var(--primary))' },
  documents: { label: 'Documents Created', color: 'hsl(var(--accent))' },
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Аналитика</h1>
        <p className="text-muted-foreground">
          Отслеживайте производительность и активность вашей команды.
        </p>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle>Обзор производительности</CardTitle>
            <CardDescription>Сравнение ключевых показателей по сотрудникам.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="clients" fill="var(--color-clients)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="documents" fill="var(--color-documents)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статистика по сотрудникам</CardTitle>
          <CardDescription>Подробная информация о действиях каждого сотрудника.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Сотрудник</TableHead>
                <TableHead>Действия</TableHead>
                <TableHead>Последняя активность</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="employee avatar" />
                        <AvatarFallback>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-1.5">
                        <UserPlus className="h-4 w-4 text-green-500"/> Добавлено клиентов: <span className="font-semibold">{employee.stats.clientsAdded}</span>
                      </div>
                       <div className="flex items-center gap-1.5">
                        <UserMinus className="h-4 w-4 text-red-500"/> Удалено клиентов: <span className="font-semibold">{employee.stats.clientsRemoved}</span>
                      </div>
                       <div className="flex items-center gap-1.5">
                        <FileUp className="h-4 w-4 text-blue-500"/> Создано документов: <span className="font-semibold">{employee.stats.docsCreated}</span>
                      </div>
                       <div className="flex items-center gap-1.5">
                        <FileEdit className="h-4 w-4 text-yellow-500"/> Отредактировано: <span className="font-semibold">{employee.stats.docsEdited}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground"/> Время в сети: <Badge variant="outline">{employee.stats.onlineTime}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Activity className="h-3 w-3" />
                            {employee.lastActivity}
                        </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
