import React from 'react'
import Container from './Container'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {

    const NavItems = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Features",
            href: "/features"
        },
        {
            label: "Pricing",
            href: "/pricing"
        },
        {
            label: "About",
            href: "/about"
        }
    ]

    return (
        <nav className='py-2 border-b '>
            <Container>
                <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-2xl'>
                        StashDeck
                    </h3>
                    <div className='flex gap-4 items-center'>
                        {
                            NavItems.map((item, idx) => (
                                <Link key={idx} href={item.href} className='hidden sm:block'>
                                    {item.label}
                                </Link>
                            ))
                        }
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link href="/dashboard">
                            <Button size="sm" variant="outline">Open App</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
