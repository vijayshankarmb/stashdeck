import React from 'react'
import Container from '../common/Container'
import { Pencil } from 'lucide-react'

const Intro = () => {
  return (
    <section className='py-12'>
      <Container>
        <div>
            <div>
                <h1>
                    Designed for <Pencil className='inline h-4 w-4' />  creatives, built for coders
                </h1>
                <h3>
                    Raindrop.io is the best place to keep all your favorite books, songs, articles or whatever else you come across while browsing.
                </h3>
                <p>
                    We are not trying to reinvent the wheel; we are working on a tool that does everything you expect from a modern bookmark manager.
                </p>
            </div>
        </div>
      </Container>
    </section>
  )
}

export default Intro
