'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
const page = () => {
    useEffect(() => {
        redirect('/dashboard/all-bookmarks')
    }, [])
    return null
}
export default page