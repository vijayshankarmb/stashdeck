'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea' // Make sure you have this UI component
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useTags } from '@/lib/TagsContext'
const formSchema = z.object({
    url: z.string().url('Invalid URL'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    tags: z.string().optional(), // We'll input tags as a comma-separated string
})
export function CreateBookmarkDialog({ onRefresh }: { onRefresh: () => void }) {
    const [open, setOpen] = React.useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { url: '', title: '', description: '', tags: '' },
    })
    const { refreshTags } = useTags()
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const tagArray = values.tags ? values.tags.split(',').map(t => t.trim()).filter(t => t !== '') : []

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    tags: tagArray
                }),
                credentials: 'include'
            })
            if (response.ok) {
                toast.success('Bookmark created!')
                setOpen(false)
                form.reset()
                onRefresh()
                refreshTags()
            } else {
                const data = await response.json()
                toast.error(data.message || 'Failed to create bookmark')
                console.error('Create failed:', data)
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
            console.error('Fetch error:', error)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Add</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Add New Bookmark</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="url" render={({ field }) => (
                            <FormItem><FormLabel>URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Awesome Site" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="What's this about?" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    
                        <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem><FormLabel>Tags (split by comma)</FormLabel><FormControl><Input placeholder="tech, news, personal" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}