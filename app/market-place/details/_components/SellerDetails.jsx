'use client'

import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Image } from "lucide-react"
import { useRouter } from "next/navigation"


export default function SellerDetails({ listingProperties }) {
    const router = useRouter()
    return (
        <div>
            {
                (listingProperties) && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>Seller</p>
                            <div className="flex items-center">
                                <Link href={`/market-place/${listingProperties.company_id ? 'company-details' : 'seller-details'}?id=${listingProperties.company_id ? listingProperties.company_id : listingProperties.seller_id}`} className='w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                    {
                                        listingProperties.seller_image ? (

                                            <Image
                                                src={listingProperties.seller_image && !listingProperties.company_id ? listingProperties.seller_image : listingProperties.company_id ? company.company_logo : '/nouser.png'}
                                                alt="Seller Logo"
                                                priority
                                                width={2000}
                                                height={2000}
                                                className='rounded-full w-full h-full object-cover'
                                            />
                                        ) : (
                                            <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                                {listingProperties.seller_name.substring(0, 1).toUpperCase()}
                                            </div>
                                        )
                                    }
                                </Link>
                                <div className='ml-2'>
                                    <p className="text-[24px]">{listingProperties.seller_name}</p>
                                    <div className="flex items-center justify-start">
                                        <StarRoundedIcon  sx={{ color: '#FCD33B',fontSize:'16px' }} />
                                        <StarRoundedIcon  sx={{ color: '#FCD33B',fontSize:'16px' }} />
                                        <StarRoundedIcon  sx={{ color: '#FCD33B',fontSize:'16px' }} />
                                        <StarRoundedIcon  sx={{ color: 'gray',fontSize:'16px' }} />
                                        <StarRoundedIcon  sx={{ color: 'gray',fontSize:'16px' }} />
                                    </div>
                                </div>
                                <Button onClick={() => router.push(`/market-place/${listingProperties.company_id ? 'company-details' : 'seller-details'}?id=${listingProperties.company_id ? listingProperties.company_id : listingProperties.seller_id}`)} size='sm' variant='outline' className='ml-auto'>Seller Details</Button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
