'use client'
import {useState} from 'react'
import Image from 'next/image'
import properties1 from '../../public/properties-1.jpg'
import properties2 from '../../public/properties-2.jpg'
import properties3 from '../../public/properties-3.jpg'
import properties4 from '../../public/about-adex-section.jpg'
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function HaveSpace() {
    const [user, setUser] = useContext(UserContext)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter();

    return (

        <div className='w-full h-auto'>
            <div className='w-full flex flex-col lg:flex-row'>
                <div className={`bg-[#FCD33B] h-[288px] lg:w-[40%] flex flex-col justify-center items-center `}>
                    <h1 className='text-5xl'>Have AD space?</h1>
                    <p className='text-lg mt-3'>Transform your world into a billboard</p>
                    <Button className='mt-4' disabled={isPending} size='lg' onClick={() => {
                        setIsPending(true)
                        router.push(user.isLogged ? '/listing' : '/sign-up')
                    }}>
                        {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                        {user.isLogged ? 'Create Listing' : 'Sign Up'}
                    </Button>
                </div>
                <div className=' lg:w-[60%] flex h-[288px]'>
                    <Image
                        src={properties2}
                        alt="Adex Logo"
                        priority
                        className='hidden md:flex w-1/2 md:w-[28%] lg:hidden xl:flex xl:w-[25%] '
                    />
                    <Image
                        src={properties1}
                        alt="Adex Logo"
                        priority
                        className='w-full sm:w-1/2 md:w-[36%] lg:w-1/2 xl:w-[37.5%]'
                    />
                    <Image
                        src={properties3}
                        alt="Adex Logo"
                        priority
                        className='hidden sm:flex sm:w-1/2 md:w-[36%] lg:w-1/2 xl:w-[37.5%]'

                    />
                </div>
            </div>

            <div className='style_earn_extra flex justify-center w-full mx-auto p-[40px] lg:px-[20px] xl:p-[80px] '>
                <div className='md:w-[80%] lg:w-[90%] 2xl:w-[80%] gap-8 flex flex-col lg:flex-row justify-between items-center '>
                    <div className='w-full flex flex-col items-center lg:items-start lg:w-[50%] '>
                        <p className=' text-[25px] lg:text-[28px] xl:text-[32px] '>Earn extra <span className='text-[#FCD33B] mx-2'>money</span> with <span className='text-[#FCD33B] mx-2'>ADEX</span></p>
                        <p className='mt-5 text-[18px]'>Whether you’re looking for short term gig income or seeking to earn long term passive income, you can do it with ADEX. Our self-service marketplace listing platform empowers people and local businesses alike, allowing you to create conventional and unique advertising opportunities.</p>
                    </div>
                    <div className='w-full lg:w-[50%] bg-white rounded-md flex items-center'>
                        <Image
                            src={properties4}
                            alt="Adex Logo"
                            priority
                            className='rounded-md shadow-md lg:max-w-[600px]  w-full h-[250px] lg:h-[300px] mt-4 object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
