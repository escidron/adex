'use client'
import VideoComponent from '@/components/video/VideoComponent'
import GetPaid from '@/sections/getPaid/GetPaid'
import React from 'react'
import Image from 'next/image'
import Faq from '@/sections/faq/Faq'
import Footer from '@/components/footer/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function page() {
  return (
    <div className='text-black pt-[120px]'>
      <div className='w-full flex  flex-col items-center'>
        <h1 className='flex text-[51px] '>How <span className='text-[#FCD33B] mx-2'>ADEX</span> Works</h1>
        <p className='text-[25px]'>Advertising Reimagined</p>
        <VideoComponent />
        <GetPaid />
        <div className='bg-black p-5 w-full flex justify-center mt-8'>
          <p className={`text-white text-[16px]  lg:text-[25px] font-[400] ${inter.className}`}>Whether you’re a local celeb or just your average Joe/Jane, it doesn’t matter, anyone can earn with ADEX</p>
        </div>
        <div className=' w-full flex'>
          <Image
              src='/Rectangle 101.png'
              alt="image of people"
              priority
              width={300}
              height={300}
              className='w-1/2 md:w-[33.3%] lg:w-1/5 h-[288px]'
          />
          <Image
              src='/Rectangle 100.png'
              alt="image of people"
              priority
              width={300}
              height={300}
              className='w-1/2 md:w-[33.3%] lg:w-[30%] h-[288px]'

          />
          <Image
              src='/Rectangle 105.png'
              alt="image of people"
              priority
              width={300}
              height={300}
              className='hidden md:flex w-[33.3%] lg:w-[30%] h-[288px]'

          />
          <Image
              src='/Rectangle 104.png'
              alt="image of people"
              priority
              width={300}
              height={300}
              className='hidden lg:flex w-1/5 h-[288px]'
          />
        </div>
        <Faq />
      </div>
      <Footer/> 
    </div>
  )
}
