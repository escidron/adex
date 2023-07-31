"use client"
import { useEffect, useState, useContext } from 'react'
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
import Success from '@/components/messages/Success'
import Link from 'next/link'
import BlackButton from '@/components/buttons/BlackButton'

const inter = Inter({ subsets: ['latin'] })

export default function MyListing() {
    const [buyer, setBuyer] = useState({});
    const [user, setUser] = useContext(UserContext)
    const [discounts, setDiscounts] = useState([])
    const [currentDiscount, setCurrentDiscount] = useState(0)
    const [bookingAccepted, setBookingAccepted] = useState(false)
    const [bookingRejected, setBookingRejected] = useState(false)

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
        axios.post('https://test.adexconnect.com/api/advertisements/my-advertisement',
            {
                id: id,
                notificationId: notificationId
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                GetNotifications()
                setAdvertisement(response.data.data[0])
                GetUserProfile(response.data.data[0].requested_by)
                GetDiscounts(id, response.data.data[0].duration)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    async function GetUserProfile(id) {
        axios.post('https://test.adexconnect.com/api/users/user-profile',
            { id: id }, {
            withCredentials: true,
        })
            .then(function (response) {
                console.log('buyer info', response)
                setBuyer(response.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    async function GetDiscounts(id, duration) {
        axios.post('https://test.adexconnect.com/api/advertisements/discounts',
            { id: id }, {
            withCredentials: true,
        })
            .then(function (response) {
                console.log(  'discounts',response.data)
                setDiscounts(response.data.discounts)
                let hasDiscount = false
                response.data.discounts.map((item) => {
                    if (duration >= item.duration) {
                        hasDiscount = true
                        setCurrentDiscount(item.discount)
                    }
                })
                if (!hasDiscount) {
                    setCurrentDiscount(0)
                }
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
            <div className='mt-[120px] px-[60px] py-[30px] w-full  flex flex-col items-center mx-auto'>
                {
                    !bookingAccepted && !bookingRejected && (
                        <>
                            <h1 className='text-[45px] flex mx-auto'>Advertisement Details</h1>
                            <div className={`flex flex-col lg:flex-row gap-3  w-[80%]  justify-between mt-8 ${inter.className}`}>
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
                                <ApproveReservation advertisement={advertisement} 
                                discounts={discounts} 
                                currentDiscount={currentDiscount} 
                                setBookingAccepted={(accepted)=>setBookingAccepted(accepted)}
                                setBookingRejected={(rejected)=>setBookingRejected(rejected)}
                                />
                            </div>
                            <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />

                            <div className='flex flex-col mx-auto'>
                                <h1 className='text-[35px]'>
                                    {advertisement.status == 2 ? 'Booked by' : 'Booking requested by'}
                                </h1>
                                <BuyerCard buyer={buyer} />
                            </div>
                        </>
                    )
                }

                {
                    bookingAccepted && (
                        < Success >
                            <h1 className='text-[25px]'>Booking request accepted</h1>
                            <p className='my-4'>A contract has been generated, you will receive the funds in your registered payout method.</p>
                            <div className='flex justify-center w-full'>
                              <Link href='/' className='mt-6'>
                                <BlackButton label='Done' />
                              </Link>
                            </div>
                          </Success>
                          
                    )
                }
                {
                    bookingRejected && (
                        < Success >
                            <h1 className='text-[25px]'>Booking request rejected</h1>
                            <p className='my-4'> {`If you have any specific feedback or questions, please send a message to ${buyer.name}.`}</p>
                            <div className='flex justify-center w-full'>
                              <Link href='/' className='mt-6'>
                                <BlackButton label='Done' />
                              </Link>
                            </div>
                          </Success>
                          
                    )
                }
            </div>
        </>
    )
}

