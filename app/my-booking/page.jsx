'use client'

import { useEffect, useState, useContext } from 'react'
import { UserContext } from "@/app/layout";
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApproveReservation from '@/components/reservation/ApproveReservation'
import MultiImage from '@/components/multiImage/MultiImage';
import { Skeleton } from '@mui/material';



export default function MyBooking() {
    const [buyer, setBuyer] = useState({});
    const [user, setUser] = useContext(UserContext)
    const [discounts, setDiscounts] = useState([])
    const [currentDiscount, setCurrentDiscount] = useState(0)
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const [advertisement, setAdvertisement] = useState({
        image: '',
        title: '',
        address: '',
        description: '',

    });

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const notificationId = searchParams.get('notification_id')
    useEffect(() => {
        axios.post('https://test.adexconnect.com/api/advertisements/my-booking',
            {
                advertisementId: id,
                notificationId: notificationId
            },
            {
                withCredentials: true,

            })
            .then(function (response) {
                console.log(response)
                GetNotifications()
                GetUserProfile(response.data.data[0].created_by)
                setAdvertisement(response.data.data[0])
                setIsContentLoaded(true)

            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    async function GetUserProfile(id) {
        axios.post('https://test.adexconnect.com/api/users/user-profile',
            {
                id: id
            }, {
            withCredentials: true,

        })
            .then(function (response) {
                setBuyer(response.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    async function GetNotifications() {
        axios.post('https://test.adexconnect.com/api/users/notifications',
            {}, {
            withCredentials: true,
        })
            .then(function (response) {

                setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length, notifications: response.data.notifications }))
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    return (
        <>
            <div className='mt-[120px] px-[60px] py-[30px] w-[60%] flex flex-col mx-auto'>
                <h1 className='text-[45px] flex mx-auto'>Advertisement Details</h1>
                <div className={`flex gap-3 justify-between mt-8 `}>
                    {
                        isContentLoaded ? (
                            <div className='w-full md:w-[50%] max-w-[500px]'>
                                <div className='w-full h-[300px] shadow-image rounded-lg'>
                                    <MultiImage images={advertisement.image ? advertisement.image : [{ data_url: '/nouser.png' }]} height={'300px'} remove={false} />
                                </div>

                                <div className='mt-4'>
                                    <div className='flex justify-between advertisements-center'>
                                        <h1 className='text-[20px] font-[500]'>{advertisement.title}</h1>
                                        <div className="flex advertisements-center justify-center">
                                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                            <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                                            <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                                        </div>
                                    </div>
                                    <div className='flex advertisements-center  gap-1'>
                                        <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                        <h1 className='text-[15px] text-gray-500'>{advertisement.address}</h1>
                                    </div>
                                    <h1 className='text-[15px] mt-4'>{advertisement.description}</h1>
                                </div>
                            </div>
                        ) : (
                            <div className={`w-[80%] max-w-[500px] min-w-[400px] flex flex-col   shadow-lg rounded-lg border p-4 `}>
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                                <div className='mt-4 flex justify-between'>
                                    <Skeleton variant="text" sx={{ fontSize: '25px' }} width={'60%'} />
                                    <Skeleton variant="text" sx={{ fontSize: '25px' }} width={'20%'} />
                                </div>
                                <Skeleton variant="text" width={'60%'} sx={{ fontSize: '25px' }} />
                                <div className='mt-4'>
                                    <Skeleton variant="text" width={'100%'} sx={{ fontSize: '25px' }} />
                                    <Skeleton variant="text" width={'100%'} sx={{ fontSize: '25px' }} />
                                    <Skeleton variant="text" width={'100%'} sx={{ fontSize: '25px' }} />
                                </div>
                            </div>
                        )
                    }

                    <ApproveReservation
                        discounts={discounts}
                        currentDiscount={currentDiscount}
                        advertisement={advertisement} />
                </div>
            </div>
        </>
    )
}
