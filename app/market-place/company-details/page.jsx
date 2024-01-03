'use client'


import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProfileImages from './_components/ProfileImages'
import ReviewsCarrousel from '../seller-details/_components/ReviewsCarrousel';
import SeeAllReviews from '../details/_components/SeeAllReviews';
import GetCompany from '@/actions/GetCompany';
import GetImageGallery from '@/actions/GetImageGallery';
import GetBuyerReviews from '@/actions/GetBuyerReviews';
import RatingComponent from '@/components/rating/RatingComponent';

import { Divider, Skeleton } from '@mui/material';
import { industries } from '@/utils/industries'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '@/components/footer/Footer';

export default function CompanyDetailsPage() {
    const [company, setCompany] = useState({});
    const [gallery, setGallery] = useState([]);
    const [contentIsLoaded, setContentIsLoaded] = useState(false);
    const [buyerReviews, setBuyerReviews] = useState([]);

    const [industry, setIndustry] = useState('');
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        async function getInfo() {
            const companyInfo = await GetCompany(id)
            const imageGallery = await GetImageGallery(id)
            const buyerReviews = await GetBuyerReviews(companyInfo[0].user_id, id)
            setCompany(companyInfo[0])
            setGallery(imageGallery)
            setBuyerReviews(buyerReviews)
            industries.map((item) => {
                if (item.id == companyInfo[0].industry) {
                    setIndustry(item.name)
                }
            })
            setContentIsLoaded(true)

        }
        getInfo();
    }, []);

    return (
        <>
            <div className={`mt-[150px] w-full h-full flex justify-center items-center `}>
                <div className='flex flex-col w-[80%] max-w-[1000px] '>
                    <div className={`flex flex-col items-center justify-center`}>
                        <div className='w-[150px] h-[150px] cursor-pointer'>
                            <Image
                                src={company.company_logo ? company.company_logo : '/nouser.png'}
                                alt="company Logo"
                                priority
                                width={2000}
                                height={2000}
                                className='rounded-full w-full h-full object-cover'
                            />
                        </div>
                        <h1 className='text-[35px] min-w-[250px] text-center cursor-pointer'>{company.company_name}</h1>
                        <h1 className='text-[18px] min-w-[250px] text-center cursor-pointer'>{industry}</h1>

                        <div className='flex items-center  gap-1'>
                            <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                            <h1 className='text-[15px] text-gray-500'>{company.address ? company.address : 'Home-based company'}</h1>
                        </div>
                        <div className="flex items-center justify-center">
                            <RatingComponent readOnly={true} rating={company.rating} />
                        </div>
                    </div>
                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />
                    {
                        contentIsLoaded && (

                            <div className='w-full flex flex-col items-start'>
                                <p className='text-[32px] mb-4'>{`${company.company_name}’s Reviews`}</p>
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
                            <div className='w-full flex flex-col items-start'>
                                <p className='text-[32px]'>{`${company.company_name}’s Images`}</p>
                            </div>
                        )
                    }
                    {
                        contentIsLoaded && (
                            <>
                                {
                                    gallery.length > 0 ? (

                                        <ProfileImages images={gallery[0].company_gallery} />
                                    ) : (
                                        <ProfileImages images={[]} />

                                    )
                                }
                            </>
                        )
                    }
                </div >
            </div>
            <Footer />
        </>
    )
}
