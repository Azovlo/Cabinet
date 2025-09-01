import { Bell, Search, User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { SidebarTrigger } from "./ui/sidebar"
import { memo, useCallback } from "react"

const DashboardHeader = memo(() => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  console.log('DashboardHeader: Rendering header')

  const handleLogout = useCallback(() => {
    console.log('DashboardHeader: User logging out')
    logout()
    navigate("/login")
  }, [logout, navigate])

  const handleProfileSettings = useCallback(() => {
    navigate('/settings')
  }, [navigate])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-64 pl-10 bg-white/10 border-white/20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
              3
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-md" align="end">
              <DropdownMenuItem onClick={handleProfileSettings}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
})

DashboardHeader.displayName = 'DashboardHeader'

export { DashboardHeader }