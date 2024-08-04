"use client"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function EmailConfirmationPage() {
    const [isPending, setIsPending] = useState(false)
    const router = useRouter();

    return (
        <div className=" style_login flex flex-col items-center pt-[150px] md:justify-start min-h-screen py-2 fixed z-[99] top-0 left-0 ">
            <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
            <div onClick={() => router.push('/')} className="z-[91] absolute top-[40px] cursor-pointer">
                <Image
                    src='/adex-logo-white-yellow.png'
                    alt="Adex Logo"
                    width={70}
                    height={70}
                    priority
                />
            </div>

            <div className="z-[91] flex flex-col justify-center mt-8 items-center w-full px-8 max-w-[750px] h-fit ">
                <p className="text-white text-[46px]">Account Confirmation</p>
                <p className="text-white text-[18px] mt-4">An email with a confirmation link has been sent to your inbox.</p>
                <p className="text-white text-[18px] mt-2">Please check your email to verify your account, and then return here to log in.</p>

                <Button onClick={() =>{ 
                    setIsPending(true)
                    router.push('/login')}} variant='secondary' disabled={isPending} type='submit' className='w-[200px] mt-6 text-lg font-[600]'>
                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                    Proceed
                </Button>
            </div>
        </div>
    )
}
