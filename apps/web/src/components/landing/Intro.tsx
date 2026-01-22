import React from 'react'
import Container from '../common/Container'
import { PencilLine } from 'lucide-react'
import Image from 'next/image'

const Intro = () => {
  return (
    <section className='py-16'>
      <Container>
        <div className='flex flex-col items-center text-center gap-6'>
            <div className='max-w-2xl flex flex-col gap-4'>
                <h1 className='text-4xl'>
                    Designed for <PencilLine className='inline h-6 w-6' /> creatives, built for {"{coders}"}
                </h1>
                <h3 className='text-2xl text-secondary-foreground/80'>
                    Raindrop.io is the best place to keep all your favorite books, songs, articles or whatever else you come across while browsing.
                </h3>
                <p className='text-lg text-secondary-foreground/60'>
                    We are not trying to reinvent the wheel; we are working on a tool that does everything you expect from a modern bookmark manager.
                </p>
            </div>

            <div className='flex flex-col items-center md:flex-row'>
                <div className='max-w-md md:max-w-sm py-4 flex flex-col gap-4 text-start'>
                  <h1 className='text-4xl'>
                    Organize with ease
                  </h1>
                  <p className='text-lg'>
                    StashDeck is not just a pretty interface, it can help you untangle your bookmarks mess.
                  </p>
                  <div>
                    motion features come here animated features card
                  </div>
                </div>

                <div className='flex-1'>
                  <Image
                  src="https://raindrop.io/_next/static/images/duplicates-2112-9e536142e72e5c4809864d0f7202d0ca.png"
                  height={1000}
                  width={1000}
                  alt='Demo Image'
                  />
                </div>
            </div>
        </div>
      </Container>
    </section>
  )
}

export default Intro



