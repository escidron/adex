'use client'

import { MapPin } from 'lucide-react'
import ListingHeaderPrice from './ListingHeaderPrice'
import RatingComponent from '@/components/rating/RatingComponent'

export default function ListingHeader({ listingProperties, advertisementType, hasPaymentBox }) {
    console.log('sub_category', listingProperties.sub_category)
    return (
        <>
            <div className='mt-2 flex flex-col md:flex-row md:justify-between md:items-center'>
                <h1 className='text-[20px] md:text-[28px] font-[500] line-clamp-1'>{listingProperties.title}</h1>
                {
                    listingProperties.sub_category != '24' && (

                        <div className='hidden md:flex'>
                            <ListingHeaderPrice
                                hasPaymentBox={hasPaymentBox}
                                price={listingProperties.price}
                                advertisementType={advertisementType}
                                otherType={listingProperties.otherListingType}
                                subCategory={listingProperties.sub_category}
                            />
                        </div>
                    )
                }
            </div>
            <div className="flex gap-1 items-center min-w-[70px]">
                <RatingComponent readOnly={true} size='small' rating={listingProperties.rating} />
                <p className='text-[12px] text-gray-600 mb-1'>({listingProperties.amount_reviews ? listingProperties.amount_reviews : 0})</p>
            </div>
            {
                listingProperties.sub_category != '24' && (
                    <div className='md:hidden mt-4'>
                        <ListingHeaderPrice
                            hasPaymentBox={hasPaymentBox}
                            price={listingProperties.price}
                            advertisementType={advertisementType}
                            otherType={listingProperties.otherListingType}
                            subCategory={listingProperties.sub_category}
                        />
                    </div>
                )
            }

            <div className='flex items-start mt-4 gap-1'>
                <MapPin size={14} color='gray' className='min-w-[14px] mt-[2px]' />
                {
                    listingProperties.location ? (
                        <h1 className='mt-[-2px] text-[15px] text-gray-500'>{listingProperties.location}</h1>
                    ) : (
                        <h1 className='mt-[-2px] text-[15px] text-gray-500'>Online Asset</h1>
                    )
                }
            </div>
        </>
    )
}
