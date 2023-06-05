"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import StarRoundedIcon from '@mui/icons-material/StarRounded';// import path from '../../public/ad_images/6456fd7bc5413.png'

export default function ProfileHeader() {
  return (
    <div className='bg-black h-[230px] w-full mt-[90px] flex items-center justify-center lg:justify-start'>
        <div className='w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-full bg-black lg:ml-[200px] border-4 border-[#FCD33B] relative mt-[-10px]'>
            <Image
                    src='/nouser.png'
                    alt="Adex Logo"
                    priority
                    width={300}
                    height={300}
                    className='rounded-full'
                />
            <div className='absolute right-[8px] bottom-[8px]'>
                <Image
                    src='/Group 6.png'
                    alt="Adex Logo"
                    priority
                    width={40}
                    height={40}
                />
            </div>
        </div>
        <div className='ml-8'>
            <div className='flex items-center'>
                <h1 className='text-white text-[41px] h-[55px]'>Eduardo Sanchez</h1>
                <div className="ml-4 flex items-center">
                    <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
                    <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
                    <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
                    <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
                    <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
                </div>
            </div>
            <p className='text-white text-[15px]'>eduardo@email.com</p>
            <button className=' bg-[#FCD33B] mt-3 py-[4px] px-[20px] rounded-md  hover:bg-black hover:text-[#FCD33B] text-lg'>
                <Link href='/dashboard' className='style_banner_button_text font-semibold text-18px]'>View Dashboard</Link>
            </button>
        </div>
    </div>
  )
}
