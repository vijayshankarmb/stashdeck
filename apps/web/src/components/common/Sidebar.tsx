'use client'

interface Tag {
    id: number
    name: string
    userId: number
    _count: {
        bookmarks: number
    }
}

import React from 'react'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel
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
import { Hash } from 'lucide-react'
import useAuth from '@/lib/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const AppSidebar = () => {

    const [openSidebar, setOpenSidebar] = React.useState('')
    const [tags, setTags] = React.useState([])

    const { user, signout } = useAuth()

    const router = useRouter()

    const item = [
        {
            title: 'All Bookmarks',
            href: '/dashboard/all-bookmarks',
            icon: <Bookmark />
        }
    ]

    const base_url = process.env.NEXT_PUBLIC_BASE_URL

    const fetchTags = async () => {
        try {
            const response = await fetch(`${base_url}/bookmarks/tags`, {
                credentials: 'include'
            });
            if (!response.ok) {
                console.error("Failed to fetch tags");
                return;
            }
            const data = await response.json();
            setTags(data.data.tags);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    }

    React.useEffect(() => {
        fetchTags()
    }, [])

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
                    <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
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
                <SidebarGroup title="Tags">
                    <SidebarGroupLabel>
                        Tags {tags.length === 0 ? '(0)' : `(${tags.length})`}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {tags.map((tag: Tag) => (
                                <SidebarMenuItem key={tag.id} onClick={()=>setOpenSidebar(tag.name)}>
                                    <SidebarMenuButton asChild className={`${openSidebar === tag.name ? 'bg-secondary-foreground/10' : ''} hover:bg-secondary-foreground/10`}>
                                        <Link href={`/dashboard/all-bookmarks?tag=${tag.name}`}>
                                            <Hash size={16} className='inline mr' />{tag.name}
                                            ({tag._count.bookmarks})
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
