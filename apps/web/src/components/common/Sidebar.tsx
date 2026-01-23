'use client'

import React from 'react'
import { 
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from '../ui/sidebar'
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel
} from '../ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
import { ChevronDown } from 'lucide-react';
import useAuth from '@/lib/useAuth'
import { useRouter } from 'next/navigation'

const AppSidebar = () => {

    const { user, signout } = useAuth()

    const router = useRouter()

    const item = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'All Bookmarks', href: '/dashboard' }
    ]

  return (

      <Sidebar>
        <SidebarHeader>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <><CircleUser size={16} className='inline' /> {user?.email} <ChevronDown size={16} className='inline' /> </>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuItem 
                    className='text-destructive'
                    onClick={()=>{
                        signout().then(()=>{
                            router.refresh()
                        })
                    }}>
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup title="Main">
                <SidebarGroupContent>
                    <SidebarMenu>
                        {item.map((menuItem, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton href={menuItem.href}>
                                    {menuItem.title}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}

export default AppSidebar
