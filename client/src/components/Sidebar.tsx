import { Home, Users, BarChart3, Settings, CreditCard, Package, MessageSquare, Building2, FileText, Calendar, Phone } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, Sidebar as SidebarPrimitive } from "./ui/sidebar"
import { memo, useCallback, useMemo } from "react"

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Tariffs', href: '/tariffs', icon: CreditCard, badge: 'New' },
]

const officeNavigation = [
  { name: 'My Office', href: '/office', icon: Building2 },
]

const analyticsNavigation = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

const modulesNavigation = [
  { name: 'CRM System', href: '/crm', icon: Users },
  { name: 'Cabinets', href: '/cabinets', icon: Package },
  { name: 'Modules', href: '/modules', icon: Package },
]

const settingsNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Payments', href: '/payments', icon: CreditCard },
]

const Sidebar = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log('Sidebar: Current location:', location.pathname)

  const isActive = useCallback((href: string) => {
    return location.pathname === href
  }, [location.pathname])

  const handleNavigation = useCallback((href: string) => {
    navigate(href)
  }, [navigate])

  const navigationSections = useMemo(() => [
    { items: navigation, label: null },
    { items: officeNavigation, label: "Office Management" },
    { items: analyticsNavigation, label: "Analytics" },
    { items: modulesNavigation, label: "Modules" },
    { items: settingsNavigation, label: "Configuration" }
  ], [])

  return (
    <SidebarPrimitive className="fixed left-0 top-0 z-50 h-full w-64 border-r border-white/10 bg-black/40 backdrop-blur-md">
      <SidebarContent>
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cabinets Monster</h2>
              <p className="text-xs text-muted-foreground">Business Platform</p>
            </div>
          </div>
        </SidebarHeader>

        <div className="flex-1 px-4 space-y-6">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {sectionIndex > 0 && <Separator className="bg-white/10" />}
              
              <SidebarGroup>
                {section.label && (
                  <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
                    {section.label}
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          onClick={() => handleNavigation(item.href)}
                          className={cn(
                            "w-full justify-start gap-3 text-left hover:bg-white/10 transition-colors",
                            isActive(item.href) && "bg-primary/20 text-primary"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          ))}
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  )
})

Sidebar.displayName = 'Sidebar'

export { Sidebar }