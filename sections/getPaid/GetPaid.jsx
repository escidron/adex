'use client'
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function GetPaid() {
    const [user, setUser] = useContext(UserContext)

    return (
        <div className='flex justify-around  w-full mx-auto p-[40px] xl:p-[80px]'>
            <div className='flex xl:w-[80%] flex-col lg:flex-row justify-between items-center px-[15px]'>
                <div className='lg:w-[60%] flex flex-col'>
                    <h1 className='text-[34px] lg:text-[51px]'>Get paid to be <span className='text-[#FCD33B] mx-2'>you</span></h1>
                    <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is, making it look like readable English.</p>
                    <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <Link href={user.hasPayout && user.isLogged ? '/listing' : !user.isLogged ? '/login' : !user.hasPayout && user.isLogged ? '/add-payout-method' : '/'} className={`style_banner_button mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                  lg:py-[15px] lg:px-[40px] lg:mt-10 '><p className='style_banner_button_text font-medium ${inter.className}`}><p>Create Listing</p>
                    </Link>
                </div>
                <div className='w-[320px]  h-full max-h-[400px] flex justify-between mt-[50px]'>
                    <Image
                        src='/get-paid-image.png'
                        alt="get-paid image"
                        priority
                        width={2000}
                        height={2000}
                    />
                </div>
            </div>
        </div>
    )
}
