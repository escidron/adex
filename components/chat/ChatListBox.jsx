import React from 'react'
import Image from 'next/image';

export default function ChatListBox({ image, name, lastMessage, time }) {
    return (
        <div className='w-full flex gap-2 items-center px-2 cursor-pointer'>

            <div className='w-[45px] h-[45px] '>
                <Image
                    src={image ? image : '/nouser.png'}
                    alt="Seller Logo"
                    priority
                    width={2000}
                    height={2000}
                    className='rounded-full w-full h-full object-cover'
                />
            </div>
            <div className='flex justify-between items-center w-full'>
                <div>
                    <h1 className='text-left text-[14px] font-semibold'>{name}</h1>
                    <p className='text-left text-[12px] text-gray-700'>{lastMessage}</p>
                </div>
                <p className='text-left text-[12px] text-gray-700'>10:20</p>
            </div>
        </div>
    )
}
