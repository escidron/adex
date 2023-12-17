import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

export default function DiscountNote({ advertisementType }) {
    return (
        <div>
            {
                advertisementType == 0 && (
                    <Card className='w-full mt-[50px] md:max-w-[450px] h-fit md:mt-0'>
                        <CardHeader>
                            <CardTitle className='flex gap-2 items-center'>
                                <div className='w-[50px]'>
                                    <Image
                                        src='/note.png'
                                        alt="note icon"
                                        priority
                                        width={2000}
                                        height={2000}
                                        className='w-full'

                                    />
                                </div>
                                <p className='text-[18px] md:text-[26px]'>Long Duration Bookings</p>
                            </CardTitle>
                            <CardDescription className='text-[16px] '>Much like many (if not all) of the big companies, ADEX encourages you to offer duration discounts. This incentivizes buyers to book your ad for longer durations. For example: </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-[14px] md:text-[16px]'>• 3 months earns the buyer a 10% discount,</p>
                            <p className='text-[14px] md:text-[16px]'>• 6 months earns the buyer a 15% discount, and </p>
                            <p className='text-[14px] md:text-[16px]'>• 12 months ears the buyer a 20% discount. </p>
                        </CardContent>
                    </Card>
                )
            }
            {
                advertisementType == 2 && (
                    <Card className='w-full mt-[50px] md:max-w-[450px] h-[260px] md:mt-0'>
                        <CardHeader>
                            <CardTitle className='flex gap-2 items-center'>
                                <div className='w-[50px]'>
                                    <Image
                                        src='/note.png'
                                        alt="note icon"
                                        priority
                                        width={2000}
                                        height={2000}
                                        className='w-full'

                                    />
                                </div>
                                <p className='text-[18px] md:text-[26px]'>Quantity Discount</p>
                            </CardTitle>
                            <CardDescription>Much like many (if not all) of the big companies, ADEX encourages you to offer discounts. This incentivizes buyers to book more units. For example: </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-[14px] md:text-[16px]'>• 5 units earns the buyer a 10% discount,</p>
                            <p className='text-[14px] md:text-[16px]'>• 6 units earns the buyer a 15% discount, and </p>
                            <p className='text-[14px] md:text-[16px]'>• 12 units ears the buyer a 20% discount. </p>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}
