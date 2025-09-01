import { Outlet } from "react-router-dom"
import { DashboardHeader } from "./DashboardHeader"
import { Sidebar } from "./Sidebar"
import { SidebarProvider } from "./ui/sidebar"
import { memo } from "react"

const DashboardLayout = memo(() => {
  console.log('DashboardLayout: Rendering dashboard layout')
  
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Sidebar />
        <div className="flex flex-col lg:pl-64">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
})

DashboardLayout.displayName = 'DashboardLayout'

export { DashboardLayout }