'use client'

import Footer from '@/components/footer/Footer'
import SellerCardSkeleton from '../seller-details/_components/SellerCardSkeleton'
import WorkIcon from '@mui/icons-material/Work';
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GetUserProfile from '@/actions/GetUserProfile'
import ProfileImages from '../company-details/_components/ProfileImages'
import ReviewsCarrousel from '../seller-details/_components/ReviewsCarrousel'
import GetBuyerReviews from '@/actions/GetBuyerReviews'
import SeeAllReviews from '../details/_components/SeeAllReviews'
import RatingComponent from '@/components/rating/RatingComponent'

import { useEffect, useState } from 'react'
import { Divider, Skeleton } from '@mui/material'
import { useSearchParams } from 'next/navigation'

export default function BuyerDetailspage() {
    const [contentIsLoaded, setContentIsLoaded] = useState(false);
    const [buyer, setBuyer] = useState('');
    const [buyerReviews, setBuyerReviews] = useState([]);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        async function getInfo() {
            const buyerInfo = await GetUserProfile(id)
            const buyerReviews = await GetBuyerReviews(id)
            setBuyerReviews(buyerReviews)
            setBuyer(buyerInfo)
            setContentIsLoaded(true)
        }
        getInfo();
    }, []);

    return (
        <>
            <div className={`mt-[150px] w-full h-full flex justify-center items-center `}>
                <div className='flex flex-col w-[80%] max-w-[1000px] items-center'>
                    {
                        contentIsLoaded ? (
                            <div className="flex gap-6 items-center border shadow-md py-8 px-4 rounded-lg w-[70%]">
                                <div className='w-[150px] h-[150px] min-w-[150px] cursor-pointer flex flex-col items-center'>

                                    {
                                        buyer.image ? (

                                            <Image
                                                src={buyer.image}
                                                alt="Buyer Logo"
                                                priority
                                                width={2000}
                                                height={2000}
                                                className='rounded-full w-full h-full object-cover'
                                            />
                                        ) : (
                                            <div className="bg-black text-[28px] text-white font-[600] rounded-full min-w-[120px] w-[120px] h-[120px] flex justify-center items-center">
                                                {buyer.name.substring(0, 1).toUpperCase()}
                                            </div>
                                        )
                                    }
                                    <div className="flex items-center justify-center">
                                        <RatingComponent readOnly={true} rating={buyer.rating}/>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-start h-auto' >
                                    <h1 className='text-[35px]'>{`${buyer.name}`}</h1>
                                    {
                                        buyer.handleIsPublic == "1" && buyer.handle && (
                                            <div className='mt-1 flex items-center gap-3'>
                                                <AccountCircleIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{buyer.handle}</h1>
                                            </div>

                                        )
                                    }
                                    {
                                        buyer.cityIsPublic == '1' && buyer.city && (

                                            <div className='mt-1 flex items-center gap-3'>
                                                <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{buyer.city}</h1>
                                            </div>
                                        )
                                    }
                                    {
                                        buyer.professionIsPublic == '1' && buyer.profession && (

                                            <div className='mt-1 flex items-center gap-3'>
                                                <WorkIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{buyer.profession}</h1>
                                            </div>
                                        )
                                    }
                                    {
                                        buyer.bioIsPublic == '1' && (

                                            <p className='mt-2 max-w-full'>{buyer.bio != 'null' ? buyer.bio : ''}</p>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <SellerCardSkeleton />
                        )
                    }
                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />
                    {
                        contentIsLoaded && (

                            <div className='w-full flex flex-col items-start'>
                                <p className='text-[32px] mb-4'>{`${buyer.name}’s Reviews`}</p>
                                <ReviewsCarrousel data={buyerReviews} />
                                {
                                    buyerReviews.length > 4 && (
                                        <div className='mt-4 w-full flex justify-center'>
                                            <SeeAllReviews reviews={buyerReviews} />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />
                    {
                        contentIsLoaded && (

                            <div className='w-full flex flex-col items-start'>
                                <p className='text-[32px]'>{`${buyer.name}’s Images`}</p>
                            </div>
                        )
                    }

                    {
                        !contentIsLoaded && (
                            <div className='mt-6 grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-full '>
                                <Skeleton variant="rounded" width={'100%'} height={'200px'} sx={{ borderRadius: '16px' }} />
                                <Skeleton variant="rounded" width={'100%'} height={'200px'} sx={{ borderRadius: '16px' }} />
                                <Skeleton variant="rounded" width={'100%'} height={'200px'} sx={{ borderRadius: '16px' }} />
                                <Skeleton variant="rounded" width={'100%'} height={'200px'} sx={{ borderRadius: '16px' }} />

                            </div>
                        )
                    }
                    {
                        contentIsLoaded && (

                            <ProfileImages images={buyer.images} />
                        )
                    }
                </div >
            </div>
            <Footer />
        </>
    )
}

