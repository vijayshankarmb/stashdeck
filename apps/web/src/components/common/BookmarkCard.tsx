import React from 'react'

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

const BookmarkCard = ({title, url, description, tags}:Bookmark) => {
  return (
    <div className='p-4 border border-gray-200 rounded-lg'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='text-sm text-gray-500'>{url}</p>
        <p className='text-sm text-gray-500'>{description}</p>
        {tags && tags.length > 0 && (
    <div className='flex gap-2 mt-2'>
        {tags.map(tag => (
            <span key={tag.id} className='px-2 py-1 text-xs bg-gray-100 rounded-full'>
                #{tag.name}
            </span>
        ))}
    </div>
)}
    </div>
  )
}

export default BookmarkCard