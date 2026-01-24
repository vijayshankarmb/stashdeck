'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
interface Tag {
    id: number
    name: string
    userId: number
    _count: { bookmarks: number }
}
interface TagsContextType {
    tags: Tag[]
    refreshTags: () => Promise<void>
}
const TagsContext = createContext<TagsContextType | undefined>(undefined)
export const TagsProvider = ({ children }: { children: React.ReactNode }) => {
    const [tags, setTags] = useState<Tag[]>([])
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const fetchTags = useCallback(async () => {
        try {
            const response = await fetch(`${base_url}/bookmarks/tags`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setTags(data.data.tags)
            }
        } catch (error) {
            console.error("Failed to fetch tags:", error)
        }
    }, [base_url])
    useEffect(() => {
        fetchTags()
    }, [fetchTags])
    return (
        <TagsContext.Provider value={{ tags, refreshTags: fetchTags }}>
            {children}
        </TagsContext.Provider>
    )
}
export const useTags = () => {
    const context = useContext(TagsContext)
    if (!context) throw new Error("useTags must be used within TagsProvider")
    return context
}