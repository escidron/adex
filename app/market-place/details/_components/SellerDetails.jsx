'use client'

import Link from "next/link"
import Image from 'next/image'
import RatingComponent from '@/components/rating/RatingComponent'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function SellerDetails({sellerId, sellerProfile, companyProfile }) {
    const router = useRouter()

    return (
        <div>
            {
                sellerProfile.userType == 1 && companyProfile ? (
                    <div className='flex flex-col gap-2'>
                        <p className='text-[26px]'>Seller</p>
                        <div className="flex items-center">

                            <Link href={`/market-place/seller-details?id=${companyProfile.user_id}&company_id=${companyProfile.id}`} className='w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                {
                                    companyProfile.company_logo ? (

                                        <Image
                                            src={companyProfile.company_logo}
                                            alt="company Logo"
                                            priority
                                            width={2000}
                                            height={2000}
                                            className='rounded-full w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                            {companyProfile.company_name.substring(0, 1).toUpperCase()}
                                        </div>
                                    )
                                }
                            </Link>
                            <div className='ml-2'>
                                <p className="text-[24px]">{companyProfile.company_name}</p>
                                <div className="flex items-center justify-start">
                                    <RatingComponent readOnly={true} size='small' rating={companyProfile.rating} />
                                </div>
                            </div>
                            <Button onClick={() => router.push(`/market-place/seller-details?id=${companyProfile.user_id}&company_id=${companyProfile.id}`)} size='sm' variant='outline' className='ml-auto'>Seller Details</Button>
                        </div>
                    </div>
                ) : sellerProfile.userType == 1 && !companyProfile ? (
                    <div className='flex flex-col gap-2'>
                        <p className='text-[26px]'>Seller</p>
                        <div className="flex items-center">
                            <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                ?
                            </div>
                            <div className='ml-2'>
                                <p className="text-[24px]">Company Profile Unavailable</p>
                                <div className="flex items-center justify-start">
                                    <p className="text-gray-500 text-sm">Company information not found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <p className='text-[26px]'>Seller</p>
                        <div className="flex items-center">

                        <Link href={`/market-place/seller-details?id=${sellerId}`} className='w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                {
                                    sellerProfile.image ? (

                                        <Image
                                            src={sellerProfile.image}
                                            alt="Seller Logo"
                                            priority
                                            width={2000}
                                            height={2000}
                                            className='rounded-full w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                            {sellerProfile.name.substring(0, 1).toUpperCase()}
                                        </div>
                                    )
                                }
                            </Link>
                            <div className='ml-2'>
                                <p className="text-[24px]">{sellerProfile.name}</p>
                                <div className="flex items-center justify-start">
                                    <RatingComponent readOnly={true} size='small' rating={sellerProfile.rating} />
                                </div>
                            </div>
                            <Button onClick={() => router.push(`/market-place/seller-details?id=${sellerId}`)} size='sm' variant='outline' className='ml-auto'>Seller Details</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
