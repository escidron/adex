'use client'


import MarketPlaceCard from '@/components/market place/marketPlaceCard/MarketPlaceCard'
import GetSellerListing from '@/actions/GetSellerListings'
import SellerCardSkeleton from './_components/SellerCardSkeleton';
import MarketPlaceCardSkeleton from '@/components/market place/marketPlaceCard/MarketPlaceCardSkeleton';
import Footer from '@/components/footer/Footer';
import ReviewsCarrousel from './_components/ReviewsCarrousel';
import GetSellerReviews from '@/actions/GetSellerReviews';
import SeeAllReviews from '../details/_components/SeeAllReviews';


import { industries } from '@/utils/industries'
import { Divider } from '@mui/material';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SellerProfileInfo from './_components/SellerProfileInfo';
import CompanyProfileInfo from './_components/CompanyProfileInfo';


export default function SellerDetailsPage() {
    const [seller, setSeller] = useState({});
    const [sellerListings, setSellerListings] = useState([]);
    const [sellerReviews, setSellerReviews] = useState([]);
    const [contentIsLoaded, setContentIsLoaded] = useState(false);
    const [industry, setIndustry] = useState('');

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const companyId = searchParams.get('company_id')

    useEffect(() => {
        async function getInfo() {
            const { listings, profile_info } = await GetSellerListing(id, companyId)
            const sellerReviews = await GetSellerReviews(id, companyId)
            setSellerReviews(sellerReviews)
            setSellerListings(listings)
            setSeller(profile_info)
            setContentIsLoaded(true)

            if (companyId) {

                industries.map((item) => {
                    if (item.id == profile_info.industry) {
                        setIndustry(item.name)
                    }
                })
            }
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

            <div className={`px-4 mt-[150px] w-full h-full flex justify-center items-center `}>
                <div className='flex flex-col w-full md:w-[80%] max-w-[1000px] items-start'>

                    {
                        contentIsLoaded ? (
                            <>
                                {
                                    companyId ? (

                                        <CompanyProfileInfo company={seller} industry={industry} />
                                    ) : (

                                        <SellerProfileInfo seller={seller} />
                                    )
                                }
                            </>
                        ) : (
                                <SellerCardSkeleton />
                        )
                    }



                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />
                    {
                        contentIsLoaded && (

                            <div className='w-[80%] md:w-full flex flex-col items-start'>
                                <p className='text-[32px] mb-4'>{`${companyId ? seller.company_name : seller.name}’s Reviews`}</p>
                                <ReviewsCarrousel data={sellerReviews} />
                                {
                                    sellerReviews.length > 4 && (
                                        <div className='mt-4 w-full flex justify-center'>
                                            <SeeAllReviews reviews={sellerReviews} />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />


                    {
                        contentIsLoaded && (

                            <div className='w-full flex justify-start'>
                                <p className='text-[32px]'>{`${companyId ? seller.company_name : seller.name}’s Listings`}</p>
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

                            <div className={`flex flex-col items-center h-auto mt-8 md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:p-2 xl:p-[10px] `}>
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
