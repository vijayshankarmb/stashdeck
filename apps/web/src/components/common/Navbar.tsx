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
            label: "About",
            href: "/about"
        }
    ]

    return (
        <nav>
            <Container>
                <div className='flex justify-between items-center'>
                    <div>
                        StashDeck
                    </div>
                    <div className='flex gap-4 items-center'>
                        {
                            NavItems.map((item, idx) => (
                                <Link key={idx} href={item.href}>
                                    {item.label}
                                </Link>
                            ))
                        }
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button size="sm" variant="ghost">Signin</Button>
                        <Button size="sm" variant="default">Signup</Button>
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
