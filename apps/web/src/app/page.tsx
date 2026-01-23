'use client'

import React from 'react'
import Navbar from '@/components/common/Navbar'
import Hero from '@/components/landing/Hero'
import Intro from '@/components/landing/Intro'
import Footer from '@/components/landing/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Intro />
        <Footer />
    </div>
  )
}

export default Home
