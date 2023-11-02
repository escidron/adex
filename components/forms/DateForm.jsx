import { useContext, useState, useEffect } from 'react'
import { ListingContext } from '@/app/listing/layout';
import { Calendar } from '../ui/calendar';

export default function DateForm() {
    //sub category == 4 is event type
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleDate = (date) => {
        console.log('date', date)
        console.log('listingProperties', listingProperties)
        if( listingProperties.sub_category == 4 ){
            setListingProperties({ ...listingProperties, date: date })
        }else{
            setListingProperties({ ...listingProperties, first_available_date: date })
        }
    }
    return (
        <div className='w-full flex flex-col items-center overflow-y-auto invisible_scroll_bar'>
            <div className={`w-full  ${listingProperties.sub_category == 4 ? 'max-w-[550px]' : 'max-w-[280px]'}`}>
                <div className='flex flex-col'>
                    <div className='flex gap-1 items-end'>
                        <h1 className='text-[32px]'>Date</h1>
                        <p className='mb-2 text-[14px]'>{`(optional)`}</p>
                    </div>
                    <p className='text-[18px] text-gray-500'>{listingProperties.sub_category == 4 ? 'Select the Event Start Date and End Date' : 'Asset first available date'}</p>
                </div>
                <div className=' mt-8 '>
                    <Calendar
                        initialFocus
                        mode={listingProperties.sub_category == 4 ? 'range' : 'single'}
                        selected={listingProperties.sub_category == 4 ? listingProperties.date: listingProperties.first_available_date}
                        onSelect={(date) => handleDate(date)}
                        numberOfMonths={listingProperties.sub_category == 4 ? 2 : 1}
                        className="rounded-md border shadow-md " />
                </div>
            </div>
        </div>
    )
}
