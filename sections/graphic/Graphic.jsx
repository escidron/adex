import Image from 'next/image'
import React from 'react'

export default function Graphic() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[90%] md:w-[70%]  lg:w-[50%] xl:w-[40%] mt-8 h-full  flex justify-between '>
                <Image
                    src='/graphic.jpg'
                    alt="graphic image"
                    priority
                    width={2000}
                    height={2000}
                />
            </div>
        </div>
    )
}
