'use client'

import { useState } from 'react'
import Image from 'next/image'
import BlackButton from '@/components/buttons/BlackButton'
import { Inter } from 'next/font/google'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CloseIcon from '@mui/icons-material/Close';

const inter = Inter({ subsets: ['latin'] })

export default function InfoCard({ advertisement, buyer }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={`relative flex gap-1 mt-4 mx-auto min-w-[600px] max-w-[850px] max-h-[300px] p-[20px]  mb-8 border-[1px] rounded-lg border-bg-gray-200 ${inter.className}`}>
            <div className='h-[210px] w-[210px] min-h-[210px] min-w-[210px] rounded-md relative'>
                <Image
                    src='/default-user.png'
                    alt='the profile image of the buyer'
                    priority
                    width={2100}
                    height={2100}
                    className='h-full w-full rounded-md'
                />
            </div>
            <div className='ml-8 flex flex-col w-full'>
                <div>
                    <div className='flex justify-between advertisements-center'>
                        <h1 className='text-[24px] font-[600]'>{`${buyer.name} ${buyer.lastName}`}</h1>
                    </div>
                    <div className="flex advertisements-center justify-start ">
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <EmailIcon sx={{ fontSize: '18px', color: 'gray' }} />
                        <p className='text-[14px] mt-[-3px] text-gray-600'>{buyer.email}</p>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <LocalPhoneIcon sx={{ fontSize: '18px', color: 'gray' }} />
                        <p className='text-[14px] mt-[-3px] text-gray-600'>{buyer.phone}</p>
                    </div>

                    <div className='flex gap-2 advertisements-center '>
                        <p className='text-[14px] mt-2 w-full'>
                            {buyer.bio?.length > 425 ? buyer.bio.split(' ').slice(0, 58).join(' ') + "..."
                                : buyer.bio}
                            {buyer.bio?.length > 125 ? <label href='#' className='text-black cursor-pointer' onClick={() => setShowModal(true)}><b>read more</b></label> : ''}
                        </p>
                        {
                            showModal && (
                                <div className='absolute top-0 left-0 w-full h-full bg-slate-200 z-[99] py-2 px-4'>
                                    <CloseIcon onClick={() => setShowModal(false)} sx={{ "&:hover": { color: "#FCD33B", cursor: 'pointer' } }} className='flex ml-auto' />
                                    <div className='mt-2'>
                                        {buyer.bio}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
