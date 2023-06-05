import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AddAccount() {
  return (
    <div>
        <div>
            <h1 className={`text-[25px] ${inter.className}`}>Payout methods</h1>
            <p className={`text-[18px] ${inter.className} mt-4`}>Choose your preferred payment method to receive your funds</p>
        </div>
        <button onClick={()=>onSubmit()} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payout Method</p>
          </button>
    </div>
  )
}
