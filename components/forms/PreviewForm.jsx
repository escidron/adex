import MultiImage from '../multiImage/MultiImage';

import { useContext, useState, useEffect } from 'react'
import { MapPin } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { checkCategoryType } from '@/utils/checkCategoryType';
import { Preview } from '../textarea/TextAreaReader';


const otherListingType = [8, 12, 18]//categories of other


export default function PreviewForm({ ListingContext }) {
    const [categoryType, setCategoryType] = useState('');
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    useEffect(() => {
        if (listingProperties.otherListingType &&  otherListingType.includes(listingProperties.sub_category)) {
            setCategoryType(listingProperties.otherListingType)

        } else {

            const categoryType = checkCategoryType(listingProperties.sub_category)
            setCategoryType(categoryType)
        }
    }, []);

    return (
        <div className='w-full flex flex-col items-center overflow-y-auto invisible_scroll_bar'>
            <div className='w-full sm:w-[500px]'>

                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>How your listing will look like.</h1>
                    <p className='text-[18px] text-gray-500'>We are almost done, before you finalize your listing, take a moment to review and confirm the details.</p>
                </div>
                <div className="p-2 mt-6 rounded-[24px] w-[80%] border shadow-sm">
                    <MultiImage images={listingProperties.images} height={'200px'} remove={false} />
                    <div className='w-full p-[10px] mt-1'>
                        <div className="w-full flex items-center justify-between">
                            <p className="font-[600] text-[20px] line-clamp-1">{listingProperties.title}</p>
                        </div>
                        <div className='flex gap-1'>
                            <MapPin size={14} color='gray' />
                            <p className='text-[12px] text-gray-500'>{listingProperties.location}</p>
                        </div>
                        <div className='mt-2 text-[14px]'>
                            <Preview value={listingProperties.description} heigth={80} />
                        </div>
                        <div className='flex w-[90%] justify-between items-center mt-[40px]'>
                            <p className='font-[400px] text-gray-500 text-[14px]'>
                                <b className="text-[18px] text-black">{formatPrice(listingProperties.price)}</b>
                                {
                                    categoryType == 0 ? '/Month' : categoryType == 2 ? "/Unit" : ''
                                }
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
