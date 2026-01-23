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
import { Bookmark } from 'lucide-react'
import useAuth from '@/lib/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AppSidebar = () => {

    const [openSidebar, setOpenSidebar] = React.useState('')

    const { user, signout } = useAuth()

    const router = useRouter()

    const item = [
        {
            title: 'All Bookmarks',
            href: '/dashboard/all-bookmarks',
            icon: <Bookmark />
        }
    ]

    return (

        <Sidebar>
            <SidebarHeader className='border-b py-4'>
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
                            onClick={() => {
                                signout().then(() => {
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
                                <SidebarMenuItem key={index} onClick={()=>setOpenSidebar(menuItem.title)}>
                                    <SidebarMenuButton asChild className={`${openSidebar === menuItem.title ? 'bg-secondary-foreground/10' : ''} hover:bg-secondary-foreground/10`}>
                                        <Link href={menuItem.href}>
                                           {menuItem.icon} {menuItem.title}
                                        </Link>
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
