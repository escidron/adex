'use client'


import { Button } from '@/components/ui/button'
import { format, parseISO  } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

export default function DateInfo({ listingProperties }) {
    return (
        <div>
            {
                listingProperties.date.from && listingProperties.date.to && listingProperties.ad_duration_type == '1' && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>Start and End Date</p>
                            <div className='flex flex-col md:flex-row md:items-center gap-2'>
                                <Button
                                    variant={"outline"}
                                    className="w-[240px] justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    { format(new Date(listingProperties.date.from), "PPP")}
                                </Button>
                                <p className='hidden md:flex'>-</p>
                                <p className=' md:hidden w-[240px] flex justify-center'>To</p>
                                <Button
                                    variant={"outline"}
                                    className="w-[240px] justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    { format(new Date(listingProperties.date.to), "PPP")}
                                </Button>

                            </div>
                        </div>
                    </>
                )
            }
            {
                listingProperties.first_available_date && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>First Available Date</p>
                            <Button
                                variant={"outline"}
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(new Date(listingProperties.first_available_date), "PPP")}
                            </Button>
                        </div>
                    </>
                )
            }
            {
                !listingProperties.first_available_date && listingProperties.ad_duration_type == '0' && (
                    <div>
                        <h1 className='text-[26px]'>Date</h1>
                        <p className='text-gray-600 italic'>No Date provided</p>
                    </div>
                )
            }
            {
             !listingProperties.date.from && !listingProperties.date.from && listingProperties.ad_duration_type == '1' &&(
                    <div>
                        <h1 className='text-[26px]'>Date</h1>
                        <p className='text-gray-600 italic'>No Date provided</p>
                    </div>
                )
            }
        </div>
    )
}
