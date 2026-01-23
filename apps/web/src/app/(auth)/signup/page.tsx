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

const SignupPage = () => {

    const router = useRouter()

    const { signup } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signup(email, password)
            router.push('/')
        } catch (error: any) {
            setError(error.message || "Could not create account")
        }
        setLoading(false)
    }

    return (
        <div>
            <Card className='p-6'>
                <CardHeader>
                    <CardTitle className='font-bold text-4xl'>
                        Create an Account
                    </CardTitle>
                    <CardDescription className='text-sm text-muted-foreground'>
                        Enter your email and password to create an account
                    </CardDescription>

                    {error && <p className='text-red-500'>{error}</p>}

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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='passwrod'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            size="sm"
                            variant='default'
                            type='submit'
                        >
                            {loading ? <><Loader2 className='inline animate-spin' /> Signup</> : 'Signup'}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className='flex justify-center items-center'>
                    <p>Already have an account? <Link className='text-blue-400' href='/signin'>Signin</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupPage
