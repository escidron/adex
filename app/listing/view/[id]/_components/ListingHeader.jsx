'use client'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

import { formatPrice } from '@/utils/format'
import { MapPin } from 'lucide-react'

export default function ListingHeader({ listingProperties,advertisementType } ) {
    console.log('advertuliment type',advertisementType)
    return (
        <>
            <div className='mt-2 flex justify-between items-center'>
                <h1 className='text-[32px] font-[500]'>{listingProperties.title}</h1>
                {/* <p className='mt-2 text-[32px] font-[500]'>{formatPrice(listingProperties.price)}</p> */}
                <div className='flex gap-1 items-center'>
                    <p className='text-[32px]'>{formatPrice(listingProperties.price)}</p>
                    {
                        listingProperties.sub_category === 17 && (
                            <p className='mt-1'>/Unit</p>
                        )
                    }
                    {
                        advertisementType === 0 && (
                            <p className='mt-1'>/Month</p>
                        )
                    }

                </div>
            </div>
            <div className="flex items-center justify-start">
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
            </div>
            <div className='flex items-center mt-2 gap-1'>
                <MapPin size={16} color='gray' />
                <h1 className='mt-[-2px] text-[15px] text-gray-500'>{listingProperties.location}</h1>
            </div>
        </>
    )
}
