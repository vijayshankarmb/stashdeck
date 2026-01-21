'use client'

import React from 'react'
import useAuth from '@/lib/useAuth'

const Home = () => {
  const { user, loading } = useAuth()
  return (
    <div>
      <h1>Home</h1>
      <p>{loading ? 'Loading...' : user ? `Logged in as ${user.email}` : 'Not logged in'}</p>
    </div>
  )
}

export default Home
