'use client'

import {useContext} from 'react'
import { UserContext } from '../../app/layout';

import NotificationCard from './NotificationCard';

export default function Notifications({ notifications,notificationsQtd }) {
    const [user, setUser] = useContext(UserContext)

    console.log(user)
    return (
        <div className='w-full py-2'>
            <div className='mt-4 border-b py-2 w-[90%] flex mx-auto items-center'>
                {
                    user.notificationQuantity > 0 ? (

                        <p className='flex  ml-auto text-[#FCD33B] text-[12px]'>Mark all as read</p>
                    ) : (

                        <p className='flex mx-auto text-[15px]'>You have no notifications.</p>
                    )
                }
            </div>
            <div className='notifications_list overflow-y-scroll max-h-[300px] w-full'>

                {user.notifications.map((notification) => (
                    <div key={notification.id} className='w-full'>
                        <NotificationCard notification={notification} />
                    </div>
                ))}
            </div>
        </div>
    )
}