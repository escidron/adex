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
        <div className='bg-black p-5 w-full flex justify-center'>
          <p className={`text-white text-[25px] font-[400] ${inter.className}`}>Whether you’re a local celeb or just your average Joe/Jane, it doesn’t matter, anyone can earn with ADEX</p>
        </div>
        <div className=' w-full flex'>
          <Image
              src='/rectangle 101.png'
              alt="Adex Logo"
              priority
              style={{width:'25%',height:'288px',aspectRatio:1}}
              width={300}
              height={300}
          />
          <Image
              src='/rectangle 100.png'
              alt="Adex Logo"
              priority
              style={{width:'25%',height:'288px',aspectRatio:1}}
              width={300}
              height={300}

          />
          <Image
              src='/rectangle 105.png'
              alt="Adex Logo"
              priority
              style={{width:'25%',height:'288px',aspectRatio:1}}
              width={300}
              height={300}
          />
          <Image
              src='/rectangle 104.png'
              alt="Adex Logo"
              priority
              style={{width:'25%',height:'288px',aspectRatio:1}}
              width={300}
              height={300}
          />
        </div>
        <Faq />
      </div>
      <Footer/> 
    </div>
  )
}
