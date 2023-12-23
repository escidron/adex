'use client'

import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarketPlaceCard from '@/components/market place/marketPlaceCard/MarketPlaceCard'
import GetSellerListing from '@/actions/GetSellerListings'

import { Divider } from '@mui/material';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SellerCardSkeleton from './_components/SellerCardSkeleton';
import MarketPlaceCardSkeleton from '@/components/market place/marketPlaceCard/MarketPlaceCardSkeleton';
import Footer from '@/components/footer/Footer';

export default function SellerDetailsPage() {
    const [seller, setSeller] = useState({});
    const [sellerListings, setSellerListings] = useState([]);
    const [contentIsLoaded, setContentIsLoaded] = useState(false);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        async function getInfo() {
            const { listings, profile_info } = await GetSellerListing(id)
            setSellerListings(listings)
            setSeller(profile_info)
            setContentIsLoaded(true)
        }
        getInfo();
    }, []);


    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);
        };
        handleRouteChange()
    }, []);
    return (
        <>

            <div className={`mt-[150px] w-full h-full flex justify-center items-center `}>
                <div className='flex flex-col w-[80%] max-w-[1000px] items-center'>

                    {
                        contentIsLoaded ? (
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
                                    <h1 className='text-[35px]'>{`${seller.name}`}</h1>
                                    {
                                        seller.handle_is_public == "1" && seller.handle && (
                                            <div className='mt-1 flex items-center gap-3'>
                                                <AccountCircleIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{seller.handle}</h1>
                                            </div>

                                        )
                                    }
                                    {
                                        seller.city_is_public == '1' && seller.city && (

                                            <div className='mt-1 flex items-center gap-3'>
                                                <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{seller.city}</h1>
                                            </div>
                                        )
                                    }
                                    {
                                        seller.profession_is_public == '1' && seller.profession && (

                                            <div className='mt-1 flex items-center gap-3'>
                                                <WorkIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                                <h1>{seller.profession}</h1>
                                            </div>
                                        )
                                    }
                                    {
                                        seller.bio_is_public == '1' && (

                                            <p className='mt-2 max-w-full'>{seller.bio != 'null' ? seller.bio : ''}</p>
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

                            <div>
                                <p className='text-[32px]'>{`${seller.name}’s Listings`}</p>
                            </div>
                        )
                    }

                    {
                        !contentIsLoaded && (
                            <div className='w-full h-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:p-2 xl:p-[10px]'>

                                <MarketPlaceCardSkeleton />
                                <MarketPlaceCardSkeleton />
                                <MarketPlaceCardSkeleton />
                            </div>
                        )
                    }

                    {
                        sellerListings.length > 0 && contentIsLoaded && (

                            <div className={` h-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:p-2 xl:p-[10px] `}>
                                {sellerListings.map((ad) => (
                                    <MarketPlaceCard key={ad.id} ad={ad} />
                                ))}
                            </div>
                        )
                    }

                </div >
            </div>
            <Footer />
        </>

    )
}
