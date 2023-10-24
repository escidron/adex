import { useContext, useState,useEffect } from 'react'
import { ListingContext } from '@/app/listing/layout';
import { Calendar } from '../ui/calendar';

export default function DateForm() {

    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleDate = (date) => {
        setListingProperties({ ...listingProperties, date: date })
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Date</h1>
                    <p className='text-[18px] text-gray-500'>Enter the date of the Event.</p>
                </div>
                <div className=' mt-8 max-w-[300px]'>
                    <Calendar
                        mode="single"
                        selected={listingProperties.date}
                        onSelect={(date)=>handleDate(date)}
                        className="rounded-md border shadow-md " />
                </div>
            </div>
        </div>
    )
}
