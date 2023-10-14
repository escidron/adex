import React from 'react'
import Image from 'next/image';

export default function ChatListBox({ name, lastMessage, avatar }) {
    return (
        <div className='w-full flex gap-2 items-center p-2 cursor-pointer '>

            {
                avatar ? (

                    <Image
                        src={avatar}
                        alt="user image"
                        width={2000}
                        height={2000}
                        priority
                        className='w-8 h-8 rounded-full'
                    />
                ) : (
                    <div className='w-8 h-8 rounded-full bg-[#FCD33B] text-black font-bold flex justify-center items-center border-2 border-[#FCD33B]'>{name.substring(0, 1).toUpperCase()}</div>
                )
            }
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
