import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

export default function PleaseLoginPage() {
    const router = useRouter()
    return (
        <div className='flex m-auto items-center justify-center text-lg'>
            <Link className='m-auto' href={'/login'}>Log In</Link>
        </div>
    )
}
