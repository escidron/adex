'use client'

import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from 'next/image'


export default function BuyerDetails({buyerId, buyerProfile, companyProfile }) {
    const router = useRouter()
    return (
        <div>
            {
                (buyerProfile.userType == 1 ) ? (
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>Buyer</p>
                            <div className="flex items-center">

                                <Link href={`/market-place/company-details?id=${companyProfile.id}`} className='w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                    {
                                        companyProfile.company_logo ? (

                                            <Image
                                                src={ companyProfile.company_logo }
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
                                        <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                        <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                        <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                        <StarRoundedIcon sx={{ color: 'gray', fontSize: '16px' }} />
                                        <StarRoundedIcon sx={{ color: 'gray', fontSize: '16px' }} />
                                    </div>
                                </div>
                                <Button onClick={() => router.push(`/market-place/company-details?id=${companyProfile.id}`)} size='sm' variant='outline' className='ml-auto'>Buyer Details</Button>
                            </div>
                        </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <p className='text-[26px]'>Buyer</p>
                        <div className="flex items-center">

                            <Link href={`/market-place/buyer-details?id=${buyerId}`} className='w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                {
                                    buyerProfile.image ? (

                                        <Image
                                            src={buyerProfile.image}
                                            alt="Buyer Logo"
                                            priority
                                            width={2000}
                                            height={2000}
                                            className='rounded-full w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                            {buyerProfile.name.substring(0, 1).toUpperCase()}
                                        </div>
                                    )
                                }
                            </Link>
                            <div className='ml-2'>
                                <p className="text-[24px]">{buyerProfile.name} {buyerProfile.lastName}</p>
                                <div className="flex items-center justify-start">
                                    <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                    <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                    <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '16px' }} />
                                    <StarRoundedIcon sx={{ color: 'gray', fontSize: '16px' }} />
                                    <StarRoundedIcon sx={{ color: 'gray', fontSize: '16px' }} />
                                </div>
                            </div>
                            <Button onClick={() => router.push(`/market-place/buyer-details?id=${buyerId}`)} size='sm' variant='outline' className='ml-auto'>Buyer Details</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
