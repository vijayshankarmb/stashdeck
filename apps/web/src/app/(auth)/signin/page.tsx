'use client'

import React, { FormEvent, useState } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import useAuth from '@/lib/useAuth'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const SigninPage = () => {

    const router = useRouter()

    const { signin } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signin(email, password)
            router.push('/')
        } catch (error: any) {
            setError(error.message || "Invalid email or password" )
        }
        setLoading(false)
    }

    return (
        <div>
            <Card className='p-6'>
                <CardHeader>
                    <CardTitle className='font-bold text-4xl'>
                        Signin
                    </CardTitle>
                    <CardDescription className='text-sm text-muted-foreground'>
                        Enter your email and password to signin to your account
                    </CardDescription>
                    {error && <p className='text-red-500'> {error} </p> }
                </CardHeader>

                <CardContent>
                    <form
                    onSubmit={handleSubmit}
                    className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                            id='email'
                            type='email'
                            placeholder='me@example.com'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            disabled={loading}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='passwrod'>Password</Label>
                            <Input
                            id='password'
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            disabled={loading}
                            />
                        </div>
                        <Button 
                        size="sm"
                        variant='default'
                        type='submit'
                        > {loading ? <><Loader2 className='inline animate-spin' /> Signin</> : 'Signin'} </Button>
                    </form>
                </CardContent>

                <CardFooter className='flex justify-center items-center'>
                    <p>Dont have an account? <Link className='text-blue-400' href='/signup'>Signup</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SigninPage
