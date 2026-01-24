'use client'

interface Tag {
    id:string
    name:string
}

interface Bookmark {
    id:string
    title:string
    url:string
    description?:string
    tags?:Tag[]
}

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BookmarkCard from '@/components/common/BookmarkCard'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])
    const [error, setError] = React.useState('')

    const searchParams = useSearchParams()

    const tag = searchParams.get('tag')

    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const fetchBookmarks = async () => {
        setError('')
        try {
            const url: string = tag
            ? `${base_url}/bookmarks?tag=${tag}`
            : `${base_url}/bookmarks`

            const response = await fetch(url, {
                credentials: 'include'
            })
            if(!response.ok) {
                setError('Failed to fetch bookmarks')
            }
            const data = await response.json()
            setBookmarks(data.data.bookmarks)
        } catch (error: any) {
            setError(error.message)
        }
    }

    React.useEffect(()=>{
        fetchBookmarks()
    }, [tag])

  return (
    <section className='min-h-screen w-full px-6'>
        <div className='p-6 flex justify-between border-b '>
            <div className='flex gap-2 w-1/3'>
            <Input
            type='text'
            placeholder='Search'
            />
            <Button size='icon'>
                <Search/>
            </Button>
            </div>
            <Button>
                Add
            </Button>
        </div>
        <div className='p-6 space-y-4 flex flex-col gap-4'>
            {error && <p className='text-red-500'>{error}</p>}
            {bookmarks.length === 0 ? (
                <p>No bookmarks found</p>
            ) : (
                    bookmarks.map((bookmark: Bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            title={bookmark.title}
                            url={bookmark.url}
                            description={bookmark.description}
                            tags={bookmark.tags}
                        />
                    ))
            )}
        </div>
    </section>
  )
}

export default page
