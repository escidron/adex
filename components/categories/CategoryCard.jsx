import React from 'react'
import Image from 'next/image'

export default function CategoryCard() {
    return (
        <div className='flex flex-col items-center justify-center bg-black px-4 py-6 rounded-lg '>
            <div>
                <Image
                    src='/category-window.png'
                    alt="Adex Logo"
                    width={70}
                    height={70}
                    priority
                />
            </div>
            <h1 className='text-[#FCD33B]'>name</h1>
        </div>
    )
}
