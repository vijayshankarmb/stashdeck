'use client'

interface Tag {
    id: string
    name: string
}

interface Bookmark {
    id: string
    title: string
    url: string
    description?: string
    tags?: Tag[]
}

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BookmarkCard from '@/components/common/BookmarkCard'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { CreateBookmarkDialog } from '@/components/common/CreateBookmarkDialog'
import { EditBookmarkDialog } from '@/components/common/EditBookmarkDialog'

const page = () => {
    const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])
    const [error, setError] = React.useState('')
    const [searchQuery, setSearchQuery] = React.useState('')
    const [editingBookmark, setEditingBookmark] = React.useState<Bookmark | null>(null)
    const [isEditOpen, setIsEditOpen] = React.useState(false)

    const searchParams = useSearchParams()

    const tag = searchParams.get('tag')

    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const fetchBookmarks = async (query?: string) => {
        setError('')
        try {
            let url: string = tag
                ? `${base_url}/bookmarks?tag=${tag}`
                : `${base_url}/bookmarks`

            if (query) {
                const separator = url.includes('?') ? '&' : '?'
                url = `${url}${separator}q=${encodeURIComponent(query)}`
            }

            const response = await fetch(url, {
                credentials: 'include'
            })
            if (!response.ok) {
                setError('Failed to fetch bookmarks')
            }
            const data = await response.json()
            setBookmarks(data.data.bookmarks)
        } catch (error: any) {
            setError(error.message)
        }
    }

    React.useEffect(() => {
        fetchBookmarks()
    }, [tag])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this bookmark?')) return
        try {
            const response = await fetch(`${base_url}/bookmarks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.ok) {
                fetchBookmarks()
            }
        } catch (error) {
            console.error('Delete failed:', error)
        }
    }

    const handleEdit = (bookmark: Bookmark) => {
        setEditingBookmark(bookmark)
        setIsEditOpen(true)
    }

    return (
        <section className='min-h-screen w-full px-6'>
            <div className='p-6 flex justify-between border-b '>
                <div className='flex gap-2 w-full md:w-1/3'>
                    <Input
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetchBookmarks(searchQuery)
                            }
                        }}
                    />
                    <Button className='mr-2' size='icon' onClick={() => fetchBookmarks(searchQuery)}>
                        <Search />
                    </Button>
                </div>
                <CreateBookmarkDialog onRefresh={() => fetchBookmarks()} />
            </div>
            <div className='p-6 space-y-4 flex flex-col gap-4'>
                {error && <p className='text-red-500'>{error}</p>}
                {bookmarks.length === 0 ? (
                    <p>No bookmarks found</p>
                ) : (
                    bookmarks.map((bookmark: Bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            id={bookmark.id}
                            title={bookmark.title}
                            url={bookmark.url}
                            description={bookmark.description}
                            tags={bookmark.tags}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
            <EditBookmarkDialog
                bookmark={editingBookmark}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onRefresh={fetchBookmarks}
            />
        </section>
    )
}

export default page
