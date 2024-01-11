'use client'
import VideoComponent from '@/components/video/VideoComponent'
import GetPaid from '@/sections/getPaid/GetPaid'
import React from 'react'
import Image from 'next/image'
import Faq from '@/sections/faq/Faq'
import Footer from '@/components/footer/Footer'
import UseCases from '@/sections/useCases/UseCases'



export default function page() {
  return (
    <div className='text-black pt-[120px]'>
      <div className='w-full flex  flex-col items-center'>
        <h1 className='flex text-[40px] md:text-[46px] lg:text-[51px] '>How <span className='text-[#FCD33B] mx-2'>ADEX</span> Works</h1>
        <p className='text-[20px] lg:text-[25px]'>Advertising Reimagined</p>
        <VideoComponent />
        {/* <GetPaid /> */}
        <UseCases />
        <div className='bg-black p-5 w-full flex justify-center mt-8'>
          <p className={`text-white text-[16px]  lg:text-[25px] font-[400] `}>Whether you’re a local celeb or just your average Joe/Jane, it doesn’t matter, anyone can earn with ADEX</p>
        </div>
        <div className=' w-full flex'>
          <Image
              src='/Rectangle 101.jpg'
              alt="image of people"
              priority
              width={2000}
              height={2000}
              className='hidden sm:flex sm:w-1/2  lg:w-[33.3%]  object-cover'
          />
          <Image
              src='/Rectangle 108.jpeg'
              alt="image of people"
              priority
              width={2000}
              height={2000}
              className='hidden lg:flex lg:w-[33.3%]   object-cover'

          />
          <Image
              src='/Rectangle 105.jpg'
              alt="image of people"
              priority
              width={2000}
              height={2000}
              className='w-full sm:w-1/2 md:flex  lg:w-[40%]  object-cover'

          />
         
        </div>
        <Faq />
      </div>
      <Footer/> 
    </div>
  )
}
