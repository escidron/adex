import React from 'react'
import Image from 'next/image'
import properties1 from '../../public/properties-1.jpg'
import properties2 from '../../public/properties-2.jpg'
import properties3 from '../../public/properties-3.jpg'
import properties4 from '../../public/about-adex-section.png'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HaveSpace() {
  return (
    
    <div className='w-full h-auto'>
        <div className='w-full flex'>
            <div className={`bg-[#FCD33B] w-[40%] flex flex-col justify-center items-center ${inter.className}`}>
                <h1 className='text-5xl'>Have AD space?</h1>
                <p className='text-lg mt-3'>Transform your world into a billboard</p>
                <button className='style_banner_button z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:scale-[1.1] hover:text-white text-lg
                                 lg:py-[10px] lg:px-[40px] lg:mt-5 '><p className=' font-medium'>Sign Up</p>
                </button>
            </div>
            <div className=' w-[60%] flex'>
                <Image
                    src={properties2}
                    alt="Adex Logo"
                    priority
                    style={{width:'33.3%',aspectRatio:1}}
                />
                <Image
                    src={properties1}
                    alt="Adex Logo"
                    priority
                    style={{width:'33.3%',aspectRatio:1}}

                />
                <Image
                    src={properties3}
                    alt="Adex Logo"
                    priority
                    style={{width:'33.4%',aspectRatio:1}}

                />
            </div>
        </div>

         <div className='style_earn_extra flex justify-around  w-full mx-auto p-[80px] '>
            <div className='w-[80%] flex justify-around items-center '>

                <div className='w-[40%]'>
                    <p className='flex text-[51px]'>Earn extra <span className='text-[#FCD33B] mx-2'>money</span> with <span className='text-[#FCD33B] mx-2'>ADEX</span></p>
                    <p className='mt-5 text-[18px]'>Whether you’re looking for short term gig income or seeking to earn long term passive income, you can do it with ADEX. Our self-service marketplace listing platform empowers people and local businesses alike, allowing you to create conventional and unique advertising opportunities.</p>
                </div>
                <div className='w-[50%] bg-white rounded-md'>
                    <Image
                        className='rounded-md max-w-[600px]'
                        src={properties4}
                        alt="Adex Logo"
                        priority
                        style={{width:'100%',height:'300px',aspectRatio:1}}
                        
                        />
                </div>
            </div>
        </div>
    </div>
  )
}
