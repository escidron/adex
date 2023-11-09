'use client'
import axios from 'axios'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Footer from '@/components/footer/Footer'

import { Preview } from '@/components/textarea/TextAreaReader'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Eye, Loader2, LogOut, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext, MachineStatesContext } from './layout'
import { checkCategoryType } from '@/utils/checkCategoryType'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { formatPrice } from '@/utils/format'
import { Skeleton } from '@mui/material'





export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')
    const [date, setDate] = useState({});
    const step = params.step
    const router = useRouter();
    const [hasPayout, setHasPayout] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);


    useEffect(() => {
        async function hasPayoutMethod() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/external-account`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                if (res.data) {
                    setHasPayout(true);
                }
            }
        }
        hasPayoutMethod();
    }, []);

    useEffect(() => {
        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(categoryType)
    }, [listingProperties, step]);


    useEffect(() => {

        const categoryType = checkCategoryType(listingProperties.sub_category)

        if (categoryType != 1) {
            if (listingProperties.first_available_date) {

                const newDate = new Date(listingProperties.first_available_date)
                setDate(newDate)
            }
        } else {
            if (listingProperties.date.from && listingProperties.date.to) {

                const newDateFrom = new Date(listingProperties.date.from)
                const newDateTo = new Date(listingProperties.date.to)

                setDate({
                    from: newDateFrom,
                    to: newDateTo
                })
            }
        }
    }, [listingProperties]);

    useEffect(() => {

        if (listingProperties.images.length > 0) {
            setIsContentLoaded(true)
        }

    }, [listingProperties]);


    return (
        <>
            <Toaster />
            <div className='h-[80px] z-[99] border bg-white flex items-center justify-between px-8 fixed top-0 w-full'>
                <div className='flex gap-2'>
                    <Eye />
                    <p className='font-[600]'>View your Listing</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <Button onClick={() => router.push('/my-profile?tab=5&sub-tab=0')} className='flex gap-2 items-center'>
                        <LogOut size={15} />
                        Exit
                    </Button>
                </div>
            </div>
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center `}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1000px]'>
                            {
                                !hasPayout && (

                                    <div className='w-full bg-[#ffb837] rounded-lg flex justify-between items-center p-3 shadow-md'>
                                        <div className='flex gap-2 items-center'>
                                            <AlertTriangle size={18} />
                                            <p>Please set up a Payout Method to make your listings public.</p>
                                        </div>
                                        <Button onClick={() => router.push('/add-payout-method')}>Add Payout Method</Button>
                                    </div>
                                )
                            }

                            <div>

                                <div className='w-full mt-4 flex gap-1 h-[400px]'>
                                    <div className='w-full md:w-[70%] rounded-lg'>
                                        <Image
                                            src={listingProperties.images[0] ? listingProperties.images[0].data_url : ''}
                                            alt="Listing images"
                                            width={2000}
                                            height={2000}
                                            className={`w-full object-cover h-full rounded-lg`}
                                        />
                                    </div>
                                    {
                                        listingProperties.images.length >= 3 && (

                                            <div className='hidden md:flex w-[30%]  flex-col  gap-1'>

                                                <div className='w-full h-1/2'>
                                                    <Image
                                                        src={listingProperties.images[1] ? listingProperties.images[1].data_url : ''}
                                                        alt="Listing images"
                                                        width={2000}
                                                        height={2000}
                                                        className={`h-full object-cover rounded-lg`}
                                                    />
                                                </div>
                                                <div className='w-full h-1/2'>
                                                    <Image
                                                        src={listingProperties.images[2] ? listingProperties.images[2].data_url : ''}
                                                        alt="Listing images"
                                                        width={2000}
                                                        height={2000}
                                                        className={`h-full object-cover rounded-lg`}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='w- full gap-4 flex justify-between'>
                                    <div className='w-full md:w-[60%] '>
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
                                        <Separator className='my-3' />
                                        <Preview value={listingProperties.description} heigth={200} />

                                         {
                                            (listingProperties.date || listingProperties.first_available_date) && (
                                                <>
                                                    <Separator className='my-3' />
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='text-[26px]'>Start and End Date</p>
                                                        <Calendar
                                                            initialFocus
                                                            mode={listingProperties.sub_category == 4 ? 'range' : 'single'}
                                                            selected={date}
                                                            numberOfMonths={listingProperties.sub_category == 4 ? 2 : 1}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        } 
                                        {
                                            listingProperties.discounts.length > 0 && (
                                                <>
                                                    <Separator className='my-5' />
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='text-[26px]'>Discounts</p>
                                                        <div>
                                                            {
                                                                listingProperties.discounts.map((item, index) => (
                                                                    <div key={item.id}>
                                                                        <div className='flex gap-2 justify-between items-center p-2 w-full border mt-2 rounded-md'>
                                                                            <div className='flex w-[90%]'>
                                                                                {
                                                                                    advertisementType === 2 && (

                                                                                        <h1 className='text-[14px]'>Buyers gets<label className='font-semibold'>{` ${item.discount}% discount `}</label>when they book<label className='font-semibold'>{` ${item.duration} units `}</label>or more.</h1>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    advertisementType === 0 && (

                                                                                        <h1 className='text-[14px]'>Buyers gets<label className='font-semibold'>{` ${item.discount}% discount `}</label>when they book for<label className='font-semibold'>{` ${item.duration} months `}</label>or more.</h1>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                        {
                                            (listingProperties.instructions) && (
                                                <>
                                                    <Separator className='my-5' />
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='text-[26px]'>Instructions</p>
                                                        <Preview value={listingProperties.instructions} heigth={200} />
                                                    </div>
                                                </>
                                            )
                                        }


                                    </div>
                                    {/* <div className='w-[40%] flex flex-col border rounded-lg'>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`w-full  px-6 h-full max-w-[1000px]`}>
                            <div className='w-full mt-4 flex gap-1 h-[400px]'>
                                <div className='w-full md:w-[70%] rounded-lg'>
                                    <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                                </div>
                                <div className='hidden md:flex w-[30%]  flex-col  gap-1'>

                                    <div className='w-full h-1/2'>
                                        <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                                    </div>
                                    <div className='w-full h-1/2'>
                                        <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 flex w-full md:w-[60%] justify-between'>
                                <Skeleton variant="rounded" width={'60%'} height={20} />
                                <Skeleton variant="rounded" width={'20%'} height={20} />
                            </div>
                            <div className='mt-2'>
                                <Skeleton variant="rounded" width={'80px'} height={20} />
                            </div>
                            <div className='mt-2'>
                                <Skeleton variant="rounded" width={'60%'} height={20} />
                            </div>
                            <div className='mt-8 flex flex-col gap-3'>
                                <Skeleton variant="rounded" width={'40%'} height={10} />
                                <Skeleton variant="rounded" width={'20%'} height={10} />
                                <Skeleton variant="rounded" width={'35%'} height={10} />
                                <Skeleton variant="rounded" width={'55%'} height={10} />
                                <Skeleton variant="rounded" width={'20%'} height={10} />
                                <Skeleton variant="rounded" width={'35%'} height={10} />
                            </div>
                        </div>
                    )
                }

            </div>
            {/* <Footer /> */}
        </>
    )
}

