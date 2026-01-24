'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useTags } from '@/lib/TagsContext'

const formSchema = z.object({
    url: z.string().url('Invalid URL'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    tags: z.string().optional(),
})

interface Bookmark {
    id: string
    title: string
    url: string
    description?: string
    tags?: { id: string, name: string }[]
}

interface EditBookmarkDialogProps {
    bookmark: Bookmark | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onRefresh: () => void
}

export function EditBookmarkDialog({ bookmark, open, onOpenChange, onRefresh }: EditBookmarkDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { url: '', title: '', description: '', tags: '' },
    })
    const { refreshTags } = useTags()
  
    React.useEffect(() => {
        if (bookmark) {
            form.reset({
                url: bookmark.url,
                title: bookmark.title,
                description: bookmark.description || '',
                tags: bookmark.tags?.map(t => t.name).join(', ') || ''
            })
        }
    }, [bookmark, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!bookmark) return
        try {
            const tagArray = values.tags ? values.tags.split(',').map(t => t.trim()).filter(t => t !== '') : []

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/${bookmark.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    tags: tagArray
                }),
                credentials: 'include'
            })

            if (response.ok) {
                toast.success('Bookmark updated!')
                onOpenChange(false)
                onRefresh()
                refreshTags()
            } else {
                const data = await response.json()
                toast.error(data.message || 'Failed to update')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader><DialogTitle>Edit Bookmark</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="url" render={({ field }) => (
                            <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem><FormLabel>Tags (split by comma)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
