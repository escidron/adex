import React from 'react'
import Image from 'next/image'
import haveSpace1 from '../../public/properties-1.jpg'
export default function HaveSpace() {
  return (
    <div className='w-full h-auto'>
        <div className='w-full flex'>
            <div className='bg-yellow-400 w-[40%] flex flex-col justify-center items-center
            '>
                <h1 className='text-5xl'>Have AD space?</h1>
                <p className='text-lg mt-5'>Transform your world into a billboard</p>
                <button className='style_banner_button z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[15px] lg:px-[40px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Sign Up</p>
                </button>
            </div>
            <div className='bg-red-600 w-[60%] flex'>
                <Image
                    src={haveSpace1}
                    alt="Adex Logo"
                    priority
                    style={{width:'33%',height:'320px',aspectRatio:1}}

                />
                <Image
                    src={haveSpace1}
                    alt="Adex Logo"
                    priority
                    style={{width:'33%',height:'320px',aspectRatio:1}}
                />
                <Image
                    src={haveSpace1}
                    alt="Adex Logo"
                    priority
                    style={{width:'33%',height:'320px',aspectRatio:1}}

                />
            </div>
        </div>

         <div className='flex justify-around items-center w-[65%] mx-auto mt-[100px] p-[20px]'>
            <div className='w-[40%]'>
                <h1 className='flex text-[34px]'>Earn extra <span className='text-[#FCD33B] mx-2'>money</span> with <span className='text-[#FCD33B] mx-2'>ADEX</span></h1>
                <p className='mt-5'>Whether you’re looking for short term gig income or seeking to earn long term passive income, you can do it with ADEX. Our self-service marketplace listing platform empowers people and local businesses alike, allowing you to create conventional and unique advertising opportunities.</p>
            </div>
            <div className='w-[40%] bg-white rounded-md'>
                <Image
                    className='rounded-md'
                    src={haveSpace1}
                    alt="Adex Logo"
                    priority
                    style={{width:'100%',height:'200px',aspectRatio:1}}

                />
            </div>
        </div>
    </div>
  )
}
