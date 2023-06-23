import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import properties4 from '../../public/properties-4.png'
import properties5 from '../../public/properties-5.png'
import properties6 from '../../public/properties-6.png'

export default function AnyPerson() {
    return (
        <div className='bg-black h-auto py-[30px] flex flex-col justify-center items-center'>
            <h1 className='flex text-[32px] lg:text-[51px] text-white'>Any <span className='text-[#FCD33B] mx-2'>person</span>, place or thing</h1>
            <div className='lg:w-[70%] text-white mt-6'>
                <p className='text-center text-[16px] lg:text-[18px] px-[10px]'>By now you know – any person, place, or thing can earn with ADEX. Your creativity is your only limitation.  Good news is, now you’re here ready to create a listing – fantastic! Here are some things to keep in mind so that your listing pops and stands out above the crowd:</p>
            </div>
            <div className=' w-full flex mt-6'>
                <Image
                    src={properties4}
                    alt="Adex Logo"
                    priority
                    className='w-1/2 md:w-[33.3%] '

                />
                <Image
                    src={properties5}
                    alt="Adex Logo"
                    priority
                    className='w-1/2 md:w-[33.3%] '
                />

                <Image
                    src={properties6}
                    alt="Adex Logo"
                    priority
                    className='hidden md:flex w-1/2 md:w-[33.3%] '
                />
            </div>
            <div className='lg:w-[50%] text-white mt-6 px-[15px]'>
                <p className='text-center text-[16px] lg:text-[18px]'>Are you a person that would like to offer yourself as Ad space or, do you have a place or thing you’d like to offer up as Ad space, create a Listing in a few easy steps:</p>
            </div>
            <Link href='/listing'>
                <button className='z-10 bg-[#FCD33B] py-[8px] px-[20px] mt-6 rounded-md hover:bg-black hover:text-[#FCD33B] text-md flex items-center justify-center'>
                    <p className='style_banner_button_text font-semibold text-18px]'>Create a listing</p>
                </button>
            </Link>
        </div>
    )
}
