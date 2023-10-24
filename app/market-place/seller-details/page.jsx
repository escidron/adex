'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Image from 'next/image'
import { Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GalleryImage from '@/components/gallery-image/GalleryImage'

import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SellerDetailsPage() {
    const [seller, setSeller] = useState({});

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        if (id) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
                { id: id }, {
                withCredentials: true,
            })
                .then(function (response) {
                    setSeller(response.data)
                    console.log('user-profile', response.data)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }, []);
    return (
        <div className={`mt-[150px] w-full h-full flex justify-center items-center `}>
            <div className='flex flex-col w-[80%] max-w-[1000px] items-center'>

                <div className="flex gap-6 items-center justify-center border shadow-md py-8 px-4 rounded-lg w-[70%]">
                    <div className='w-[150px] h-[150px] min-w-[150px] cursor-pointer'>
                        <Image
                            src={seller.image ? seller.image : '/nouser.png'}
                            alt="Seller Logo"
                            priority
                            width={2000}
                            height={2000}
                            className='rounded-full w-full h-full object-cover'
                        />
                        <div className="flex items-center justify-center">
                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                            <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                            <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                            <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-start h-auto' >
                        <h1 className='text-[35px]'>{`${seller.name} ${seller.lastName}`}</h1>
                        {
                            seller.handleIsPublic == "1" && seller.handle && (
                                <div className='mt-1 flex items-center gap-3'>
                                    <AccountCircleIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                    <h1>{seller.handle}</h1>
                                </div>

                            )
                        }
                        {
                            seller.cityIsPublic == '1' && seller.city && (

                                <div className='mt-1 flex items-center gap-3'>
                                    <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                    <h1>{seller.city}</h1>
                                </div>
                            )
                        }
                        {
                            seller.professionIsPublic == '1' && seller.profession && (

                                <div className='mt-1 flex items-center gap-3'>
                                    <WorkIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                    <h1>{seller.profession}</h1>
                                </div>
                            )
                        }
                        {
                            seller.bioIsPublic == '1' && (

                                <p className='mt-2 max-w-full'>{seller.bio != 'null' ? seller.bio : ''}</p>
                            )
                        }
                    </div>
                </div>


                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />


                {/* <GalleryImage gallery={gallery}/> */}


            </div >
        </div>

    )
}
