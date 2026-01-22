'use client'

import React from 'react'
import Navbar from '@/components/common/Navbar'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Intro />
    </div>
  )
}

export default Home
