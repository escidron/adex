import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function GetPaid() {
  return (
    <div className='flex justify-around  w-full mx-auto  p-[80px]'>
        <div className='flex w-[60%] justify-between '>

            <div className='w-[60%]'>
                <h1 className='flex text-[51px]'>Get paid to be <span className='text-[#FCD33B] mx-2'>you</span></h1>
                <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is, making it look like readable English.</p>
                <p className='mt-5 text-[18px] font-[600]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <button  className={`style_banner_button z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                  lg:py-[15px] lg:px-[40px] lg:mt-10 '><p className='style_banner_button_text font-medium ${inter.className}`}><p>Create Listing-signup</p>
                </button>
            </div>
            <div className='w-[320px]  h-full flex justify-between'>
                <div className='h-full  w-[48%] flex flex-col justify-between mt-[20px]'>
                    <Image
                    src='/get-paid4.png'
                        alt="Adex Logo"
                        priority
                        style={{width:'100%',height:'60%',aspectRatio:1}}
                        width={120}
                        height={200}
                        />
                    <Image
                    src='/get-paid1.png'
                        alt="Adex Logo"
                        priority
                        style={{width:'100%',height:'35%',aspectRatio:1}}
                        width={100}
                        height={200}
                        />
                </div>
                <div className='h-full w-[48%] flex flex-col justify-between mt-[-20px]'>

                    <Image
                    src='/get-paid1.png'
                        alt="Adex Logo"
                        priority
                        style={{width:'100%',height:'35%',aspectRatio:1}}
                        width={100}
                        height={200}
                        />
                  <Image
                    src='/get-paid4.png'
                        alt="Adex Logo"
                        priority
                        style={{width:'100%',height:'60%',aspectRatio:1}}
                        width={100}
                        height={200}
                        />
                </div>
            </div>
        </div>
    </div>
  )
}
