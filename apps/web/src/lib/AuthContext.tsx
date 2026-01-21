'use client'

import React, { useState, useEffect, createContext } from "react";

interface User {
    id: number,
    email: string
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    signup: (email: string, password: string) => Promise<void>,
    signin: (email: string, password: string) => Promise<void>,
    signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const fetchMe = async () => {
        try {
            const res = await fetch(`${base_url}/auth/me`, {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.status) {
                setUser(data.data.user)
            } else {
                setUser(null)
            }
        } catch {
            console.log('error')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const signin = async (email: string, password: string) => {
        setLoading(true)
        try {
            const res = await fetch(`${base_url}/auth/signin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error)
            }

            await fetchMe()

        } catch (error: any) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signup = async (email: string, password: string) => {
        try {
            const res = await fetch(`${base_url}/auth/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error)
            }
            
            await signin(email, password)

        } catch (error: any) {
           throw error
        } finally {
            setLoading(false)
        }
    }

    const signout = async () => {
        try {
            await fetch(`${base_url}/auth/signout`, {
                method: 'POST',
                credentials: 'include'
            })
            setUser(null)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMe()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading, signup, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
