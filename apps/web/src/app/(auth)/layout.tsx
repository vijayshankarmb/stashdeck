import React from 'react'

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-muted/40 p-4'>
        <div className='w-full max-w-md space-y-8'>
        { children }
        </div>
    </div>
  )
}

export default AuthLayout
