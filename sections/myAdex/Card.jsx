import React from 'react'
import Image from 'next/image'
import BlackButton from '@/components/buttons/BlackButton'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Card({item}) {
    console.log(item.image)
  return (
    <div className={`flex gap-1 mt-4 mx-auto min-w-[600px] max-w-[750px] p-[20px] ${inter.className}`}>
        <div className='h-[210px] w-[210px] rounded-md'>
            <Image
                src={item.image}
                alt="Adex Logo"
                priority
                width={210}
                height={210}
                className='h-full w-full'
            />
        </div>
        <div className='ml-8 flex flex-col justify-around'>
            <div>

            <h1 className='text-[24px] font-[600]'>{item.name}</h1>
            <p className='mt-4 text-[20px]'>{item.address}</p>
            </div>
            <p className=' text-[24px] '>${item.price}</p>
        </div>
        <div className='ml-auto flex flex-col items-center'>
            <h1 className='text-[24px] font-[600]'>{item.createdDate}</h1>
            <div className='h-[140px] w-[160px] border-[1px] rounded-md flex flex-col justify-center items-center'>
                <p className='text-[15px]'>Days left on</p>
                <p className='text-[15px]'> contract</p>
                <p className='text-[24px] font-[600] mt-2'>{item.days}</p>
            </div>  
            <div className='mt-2 '>

            <BlackButton label='view details'/>
            </div>
        </div>
    </div>
  )
}
