"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import VerifyEmail from '@/actions/VerifyEmail'
import Image from 'next/image';
import { MailCheck, Ban } from 'lucide-react';
import { Skeleton } from '@mui/material';

export default function VerifyEmailPage() {
    const [isVerified, setIsVerified] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams()
    const tempToken = searchParams.get('temp_token')
    const userId = searchParams.get('user_id')
    console.log(tempToken)
    console.log(userId)
    console.log(isVerified)
    console.log(isLoading)


    useEffect(() => {
        async function getEmailVerification() {
            const response = await VerifyEmail(userId, tempToken)
            if (response) {
                setIsVerified(true)
                setIsLoading(false)
            } else {
                setIsVerified(false)
                setIsLoading(false)
            }
        }
        getEmailVerification();

    }, []);

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
                {
                    isLoading &&
                    <>
                        <Skeleton variant="circular" width={'100px'} height={'100px'} className='mt-2 z-[91]' />
                        <Skeleton variant="rounded" width={'60%'} height={'50px'} sx={{ borderRadius: '16px', marginTop: '10px' }} />
                        <Skeleton variant="rounded" width={'100%'} height={'30px'} sx={{ borderRadius: '16px', marginTop: '10px' }} />
                    </>


                }
                {
                    isVerified && !isLoading &&
                    <>
                        <MailCheck size={100} color='green' />
                        <div className="text-white text-[46px] mt-4">Email Verified</div>
                        <p className="text-white text-[18px] mt-2">Your email has been verified, you can now log in.</p>
                    </>
                }
                {
                    !isVerified && !isLoading &&
                    <>
                        <Ban size={100} color='red' />
                        <div className="text-white text-[46px] mt-4">Email Not Verified</div>
                        <p className="text-white text-[18px] mt-2">Something went wrong, please try again or contact support.</p>

                    </>
                }
            </div>
        </div>
    )
}
