import React from 'react'
import Link from 'next/link'
export default function NotificationCard({ notification }) {
    return (
        <div className='mt-2 hover:bg-[#FCD33B] hover:text-black  px-4 py-2 w-full'>
            <Link href={notification.redirect} className='w-full' >
                <div className='flex justify-between items-center'>
                    <h1 className='text-[15px]'>{notification.header}</h1>
                    <p className='text-[10px]'>12:20</p>
                </div>
                <p className='text-[12px] font-[400] mt-1 opacity-80'>
                    {notification.message.length > 20 ? notification.message.split(' ').slice(0, 13).join(' ') + "..."
                        : notification.message}
                </p>
            </Link>
        </div>
    )
}
