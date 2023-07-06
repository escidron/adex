"use client"
import React from 'react'
import ApproveReservation from '../reservation/ApproveReservation'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BookingModal({ setBookingModalOpen, item }) {
    return (
        <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center' onClick={() => setBookingModalOpen(false)}>
            </div>
            <div className='card-payment-modal px-[60px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[1000px]'>
                <div className='flex gap-3 justify-between '>
                    <div className='w-1/2'>
                        <div className='w-full h-[300px] shadow-image rounded-lg'>
                            <Image
                                src={item.image ? item.image : '/nouser.png'}
                                alt="Adex Logo"
                                priority
                                width={2000}
                                height={2000}
                                className='rounded-lg w-full h-full object-cover'
                            />
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-[20px] font-[500]'>{item.title}</h1>
                                <div className="flex items-center justify-center">
                                    <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                    <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                    <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                                    <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                                    <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                                </div>
                            </div>
                            <div className='flex items-center  gap-1'>
                                <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                <h1 className='text-[15px] text-gray-500'>{item.address}</h1>
                            </div>
                            <h1 className='text-[15px] mt-4'>{item.description}</h1>
                        </div>
                    </div>
                    <ApproveReservation item={item} />
                </div>
            </div>
        </>
    )
}

