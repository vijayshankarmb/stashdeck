import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode,
  className?: string
}
const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={cn(
      "mx-auto w-full max-w-5xl px-4 md:px-8 lg:px-12",
      className)}>
        {children}
    </div>
  )
}

export default Container
