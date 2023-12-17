'use client'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

import { formatPrice } from '@/utils/format'
import { MapPin } from 'lucide-react'
import ListingHeaderPrice from './ListingHeaderPrice'

export default function ListingHeader({ listingProperties, advertisementType, hasPaymentBox }) {
    return (
        <>
            <div className='mt-2 flex flex-col md:flex-row md:justify-between md:items-center'>
                <h1 className='text-[20px] md:text-[28px] font-[500] line-clamp-1'>{listingProperties.title}</h1>
                <div className='hidden md:flex'>
                    <ListingHeaderPrice
                        hasPaymentBox={hasPaymentBox}
                        price={listingProperties.price}
                        advertisementType={advertisementType}
                        otherType={listingProperties.otherListingType}
                        subCategory={listingProperties.sub_category}
                    />
                </div>
            </div>
            <div className="flex items-center justify-start">
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
            </div>
            <div className='md:hidden mt-4'>
                <ListingHeaderPrice
                    hasPaymentBox={hasPaymentBox}
                    price={listingProperties.price}
                    advertisementType={advertisementType}
                    otherType={listingProperties.otherListingType}
                    subCategory={listingProperties.sub_category}
                />
            </div>
            <div className='flex items-start mt-4 gap-1'>
                <MapPin size={14} color='gray' className='min-w-[14px] mt-[2px]' />
                <h1 className='mt-[-2px] text-[15px] text-gray-500'>{listingProperties.location}</h1>
            </div>
        </>
    )
}
