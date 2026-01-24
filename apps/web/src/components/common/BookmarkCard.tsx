import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface BookmarkCardProps extends Bookmark {
    onDelete?: (id: string) => void
    onEdit?: (bookmark: Bookmark) => void
}

const BookmarkCard = ({ id, title, url, description, tags, onDelete, onEdit }: BookmarkCardProps) => {
    return (
        <div className='p-4 border border-gray-200 rounded-lg group hover:border-primary/50 transition-colors'>
            <div className='flex justify-between items-start'>
                <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                        <h2 className='text-lg font-semibold'>{title}</h2>
                        <a href={url} target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-primary'>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                    <p className='text-sm text-gray-500 line-clamp-1'>{url}</p>
                    <p className='text-sm text-gray-600 mt-1'>{description}</p>
                </div>

                <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Button variant="ghost" size="icon-sm" onClick={() => onEdit?.({ id, title, url, description, tags })}>
                        <Pencil className='text-gray-500' />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => onDelete?.(id)}>
                        <Trash2 className='text-red-500' />
                    </Button>
                </div>
            </div>

            {tags && tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-3'>
                    {tags.map(tag => (
                        <span key={tag.id} className='px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full'>
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookmarkCard