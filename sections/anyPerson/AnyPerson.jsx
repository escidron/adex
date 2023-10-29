'use client'
import Image from 'next/image'
import properties4 from '../../public/properties-4.jpeg'
import properties5 from '../../public/properties-5.jpeg'
import properties6 from '../../public/properties-6.jpg'

import {useState,useEffect} from 'react'
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function AnyPerson() {
    const [user, setUser] = useContext(UserContext)
    const [isPending, setIsPending] = useState(false)
    const [userData, setUserData] = useState({});

    const router = useRouter();

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setUserData(res)
            }
        }
        GetUserProfile();
    }, [user]);

    return (
        <div className='bg-black h-auto py-[30px] flex flex-col justify-center items-center'>
            <h1 className='flex text-[32px] lg:text-[51px] text-white'>Any <span className='text-[#FCD33B] mx-2'>person</span>, place or thing</h1>
            <div className='lg:w-[70%] text-white mt-6'>
                <p className='text-center text-[16px] lg:text-[18px] px-[10px]'>By now you know – any person, place, or thing can earn with ADEX. Your creativity is your only limitation.  Good news is, now you’re here ready to create a listing – fantastic! Here are some things to keep in mind so that your listing pops and stands out above the crowd:</p>
            </div>
            <div className=' w-full md:w-[70%] flex mt-6'>
                <Image
                    src={properties4}
                    width={2000}
                    height={2000}
                    alt="Adex Logo"
                    priority
                    className='w-1/2 md:w-[33.3%] md:rounded-l-[10px]'

                />
                <Image
                    src={properties5}
                    alt="Adex Logo"
                    width={2000}
                    height={2000}
                    priority
                    className='w-1/2 md:w-[33.3%] '
                />

                <Image
                    src={properties6}
                    alt="Adex Logo"
                    width={2000}
                    height={2000}
                    priority
                    className='hidden md:flex w-1/2 md:w-[33.3%] md:rounded-r-[10px]'
                />
            </div>
            <div className='lg:w-[50%] text-white mt-6 px-[15px]'>
                <p className='text-center text-[16px] lg:text-[18px]'>Are you a person that would like to offer yourself as Ad space or, do you have a place or thing you’d like to offer up as Ad space, create a Listing in a few easy steps:</p>
            </div>
            <Button variant='secondary' className='mt-4' disabled={isPending} size='lg' onClick={() => {
                setIsPending(true)
                router.push(user.isLogged ? `/listing/${userData.userType == 1 ? 'select_business' : 'category'}` : '/login')
            }}>
                {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                Create a listing
            </Button>
        </div>
    )
}
