'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const employees = [
  { name: 'Alexey Smirnov', email: 'alexey.s@clientdesk.ai' },
  { name: 'Elena Petrova', email: 'elena.p@clientdesk.ai' },
  { name: 'Dmitry Ivanov', email: 'dmitry.i@clientdesk.ai' },
  { name: 'Default User', email: 'employee@clientdesk.ai' },
];

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have auth logic here.
    // For now, we'll just redirect to the dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 inline-block">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Logo className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="font-headline text-2xl">
            Welcome to ClientDesk AI
          </CardTitle>
          <CardDescription>
            Select a user to simulate login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Select Employee</Label>
               <Select defaultValue="employee@clientdesk.ai">
                  <SelectTrigger id="employee">
                      <SelectValue placeholder="Select an employee to log in as" />
                  </SelectTrigger>
                  <SelectContent>
                      {employees.map(emp => (
                          <SelectItem key={emp.email} value={emp.email}>{emp.name}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
