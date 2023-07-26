"use client"
import { useEffect, useState,useContext } from 'react'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApproveReservation from '@/components/reservation/ApproveReservation'
import { Divider } from '@mui/material';
import { Inter } from 'next/font/google'
import BuyerCard from '@/components/infoCard/BuyerCard'
import { UserContext } from "@/app/layout";
import MultiImage from '@/components/multiImage/MultiImage'

const inter = Inter({ subsets: ['latin'] })

export default function MyListing() {
    const [buyer, setBuyer] = useState({});
    const [user, setUser] = useContext(UserContext)

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
        axios.post('http://3.132.48.54:5000/api/advertisements/my-advertisement',
            { id: id,
            notificationId:notificationId }, {
            withCredentials: true,
        })
            .then(function (response) {
                GetNotifications()
                setAdvertisement(response.data.data[0])
                GetUserProfile(response.data.data[0].requested_by)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    async function GetUserProfile(id) {
        axios.post('http://3.132.48.54:5000/api/users/user-profile',
            { id: id }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                console.log('buyer info', response)
                setBuyer(response.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    async function GetNotifications() {
        axios.post('http://3.132.48.54:5000/api/users/notifications',
        {}, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(function (response) {
            
          setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length }))
          setUser((prev) => ({ ...prev, notifications: response.data.notifications }))
        //   setNotificationsQtd(response.data.notifications.length)
        })
        .catch(function (error) {
          console.log(error)
        });
    }

    return (
        <>
            <div className='mt-[120px] px-[60px] py-[30px] w-[60%] flex flex-col mx-auto'>
                <h1 className='text-[45px] flex mx-auto'>Advertisement Details</h1>
                <div className={`flex gap-3 justify-between mt-8 ${inter.className}`}>
                    <div className='w-1/2 max-w-[450px]'>
                        <div className='w-full h-[300px] shadow-image rounded-lg'>
                            <MultiImage images={advertisement.image ? advertisement.image : [{data_url:'/nouser.png'}]} height={'300px'} remove={false}/>
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
                    <ApproveReservation advertisement={advertisement} />
                </div>
                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />

                <div className='flex flex-col mx-auto'>
                    <h1 className='text-[35px]'>
                        {advertisement.status == 2?'Booked by':'Booking requested by'}  
                    </h1>
                    <BuyerCard  buyer={buyer}/>
                </div>
            </div>
        </>
    )
}

