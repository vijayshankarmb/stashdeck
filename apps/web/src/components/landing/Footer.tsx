import React from 'react'
import Container from '../common/Container'
import Link from 'next/link'

const Footer = () => {
    return (
        <section className='py-16 border-t border-border'>
            <Container>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-12'>
                        <div>
                            <ul  className='flex flex-col justify-between gap-2'>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/features">Features</Link>
                                </li>
                                <li>
                                    <Link href="/pricing">Pricing</Link>
                                </li>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='flex flex-col justify-between gap-2'>
                                <li>
                                    <Link href="/download">Download</Link>
                                </li>
                                <li>
                                    <Link href="/suggest">suggest feature</Link>
                                </li>
                                <li>
                                    <Link href="/support">help & support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className='font-semibold text-2xl'>Stashdeck</h3>
                        <p>All in one bookmark manager</p>
                        <p>© 2026 StashDeck. All rights reserved.</p>
                        <div className='flex gap-4'>
                            <Link className='underline text-secondary-foreground/60' href="https://twitter.com/stashdeck">Twiter</Link>
                            <Link className='underline text-secondary-foreground/60' href="/terms">Terms</Link>
                            <Link className='underline text-secondary-foreground/60' href="/privacy">Privacy</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Footer
