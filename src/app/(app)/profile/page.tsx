import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    return (
        <div className="grid gap-6">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Profile Settings</CardTitle>
                        <CardDescription>Manage your account settings and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label>Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="https://placehold.co/100x100" data-ai-hint="profile picture" />
                                        <AvatarFallback>UN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex gap-2">
                                    <Button>Change</Button>
                                    <Button variant="outline">Remove</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" type="text" className="w-full" defaultValue="User Name" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" className="w-full" defaultValue="user@clientdesk.ai" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Password</CardTitle>
                        <CardDescription>Change your password here. After changing, you will be logged out.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Roles and Access</CardTitle>
                        <CardDescription>Your assigned roles determine your access level.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">Administrator</Badge>
                            <Badge variant="secondary">Editor</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-start">
                <Button>Save All Changes</Button>
            </div>
        </div>
    )
}
