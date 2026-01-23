import React from 'react'
import AppSidebar from '@/components/common/Sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar/>
        <main className="flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
