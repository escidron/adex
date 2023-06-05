import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AddCard() {
  return (
    <div>
        <div>
            <h1 className={`text-[25px] ${inter.className}`}>Payment methods</h1>
            <p className={`text-[18px] ${inter.className} mt-4`}>Once you&apos;ve securely added a payment method through our reliable payment system, you can embark on planning your upcoming journey.</p>
        </div>
        <button onClick={()=>onSubmit()} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payment Method</p>
          </button>
    </div>
  )
}
