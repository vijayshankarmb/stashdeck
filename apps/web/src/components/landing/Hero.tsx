import React from 'react'
import Container from '../common/Container'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className='pt-16'>
            <Container>

                <div className='flex flex-col md:flex-row justify-center items-center'>
                    <div className='max-w-md md:max-w-sm py-4 flex flex-col gap-4'>
                        <h1 className='text-4xl font-semibold tracking-tight'>
                            All-in-one bookmark manager
                        </h1>
                        <p>
                            Intuitive. Powerful. Runs everywhere
                        </p>
                        <Link href="/dashboard">
                            <Button size="sm" variant="default" className='bg-blue-500'>Open app</Button>
                        </Link>
                    </div>

                    <div className='flex-1 p-2'>
                        <video
                            autoPlay
                            loop
                            muted
                            width='100%'
                        >
                            <source src="https://raindrop.io/_next/static/videos/intro-cf784d51ef4837b013c5ee8d208ed31e.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Hero
