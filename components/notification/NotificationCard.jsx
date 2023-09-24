import React from 'react'
import Link from 'next/link'
export default function NotificationCard({ notification }) {
    console.log('notification', notification)
    

    const givenTimestamp = notification.created_at.slice(0, 10);
    const currentDate = new Date();
    const dateObject = new Date(givenTimestamp);
    const isSameDay = currentDate.getDate() === dateObject.getDate() && currentDate.getMonth() === dateObject.getMonth()&& currentDate.getYear() === dateObject.getYear();
    
    const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
    const day = dateObject.toLocaleDateString('en-US', { day: 'numeric' });

    const time = notification.created_at.slice(11, 16)
    return (
        <div className='mt-2 hover:bg-[#FCD33B] hover:text-black hover:rounded-md  px-4 py-2 w-full'>
            <Link href={`${notification.redirect}&notification_id=${notification.id}`} className='w-full' >
                <div className='flex justify-between items-center'>
                    <h1 className='text-[15px]'>{notification.header}</h1>
                    <p className='text-[10px]'>{isSameDay?time:`${month}, ${day}`}</p>
                </div>
                <p className='text-[12px] font-[400] mt-1 opacity-80'>
                    {notification.message.length > 80 ? notification.message.split(' ').slice(0, 13).join(' ') + "..."
                        : notification.message}
                </p>
            </Link>
        </div>
    )
}
