import { useContext, useState, useEffect } from 'react'
import { ListingContext } from '@/app/listing/layout';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from '../ui/button';
import { Info, Plus, Trash } from 'lucide-react';
import { Separator } from '../ui/separator';
import { checkCategoryType } from '@/utils/checkCategoryType';

const monthsOptions = [
    { id: 1, label: '1 month' },
    { id: 2, label: '2 months' },
    { id: 3, label: '3 months' },
    { id: 4, label: '4 months' },
    { id: 5, label: '5 months' },
    { id: 6, label: '6 months' },
    { id: 7, label: '7 months' },
    { id: 8, label: '8 months' },
    { id: 9, label: '9 months' },
    { id: 10, label: '10 months' },
    { id: 11, label: '11 months' },
    { id: 12, label: '12 months' },
]

export default function DiscountsForm() {

    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [newDiscount, setNewDiscount] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [percentage, setPercentage] = useState('');
    const [advertisementType, setAdvertisementType] = useState('')

    useEffect(() => {

        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(categoryType)
    }, []);

    const addDiscount = () => {
        setNewDiscount(false)
        setListingProperties((prev) => ({ ...prev, discounts: [...prev.discounts, { duration: selectedMonth, discount: percentage }] }))
    }
    const removeDiscount = (id) => {
        const newDiscounts = listingProperties.discounts.filter((item, index) => index != id);
        setListingProperties((prev) => ({ ...prev, discounts: newDiscounts }))
    }
    return (
        <div className='w-full max-w-[1000px] flex flex-col items-center'>
            <div className='w-full flex flex-col  md:flex-row justify-between '>
                <div className='w-full sm:w-[400px]'>
                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-end'>
                            <h1 className='text-[32px]'>Discounts</h1>
                            <p className='mb-2 text-[14px]'>{`(optional)`}</p>
                        </div>
                        <p className='text-[18px] text-gray-500'>Attract more buyers! Offering exclusive discounts can boost your sales and attract a wider audience to your listings.</p>
                    </div>
                    <div className='mt-4'>
                        <Button disabled={newDiscount} onClick={() => setNewDiscount(true)}>
                            <Plus />
                            Add Discount
                        </Button>
                    </div>
                    {
                        newDiscount && (
                            <>
                                <Card className='mt-4 max-w-[400px]'>
                                    <CardHeader>
                                        <CardTitle>Add Discount</CardTitle>
                                        <CardDescription>Select the minimum booking duration to apply this discount and set the discount percentage. </CardDescription>
                                    </CardHeader>
                                    <CardContent className='flex gap-2'>
                                        <Select className="w-[70%]" onValueChange={(value) => setSelectedMonth(value)}>
                                            <SelectTrigger className='shadow-md'>
                                                <SelectValue className='text-[12px]' placeholder="Select ..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        monthsOptions.map((item) => (
                                                            <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <div className='w-[30%] border relative px-2 rounded-md shadow-md'>
                                            <input
                                                type='number'
                                                min={0}
                                                max={100}
                                                maxLength="3"
                                                onInput={(e) => {
                                                    let value = parseInt(e.target.value, 10);
                                                    if (isNaN(value)) {
                                                        value = 0;
                                                    }
                                                    if (value > 100) {
                                                        value = 100;
                                                    }
                                                    e.target.value = value;
                                                    setPercentage(value);
                                                }}
                                                className='bg-transparent w-[45px] h-full focus:outline-none'
                                            />
                                            <p className='absolute top-[7px] right-2 font-[600] text-[18px]'>%</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className='mt-4 w-full md:w-[600px] flex justify-between'>
                                            <Button onClick={() => setNewDiscount(false)} variant='outline' className='flex gap-2'>
                                                Cancel
                                            </Button>
                                            <Button onClick={addDiscount} variant='default' disabled={!selectedMonth || !percentage}>Accept</Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </>
                        )
                    }
                    {
                        !newDiscount && listingProperties.discounts.length > 0 && (
                            <>
                                <Separator className="my-4" />
                                {
                                    listingProperties.discounts.map((item, index) => (
                                        <div key={index}>
                                            <div className='flex gap-2 justify-between items-center p-2 w-full border mt-2 rounded-md'>
                                                <div className='flex w-[90%]'>
                                                    <h1 className='text-[14px]'>Buyers gets<label className='font-semibold'>{` ${item.discount}% discount `}</label>when they book for<label className='font-semibold'>{` ${item.duration} months `}</label>or more.</h1>
                                                </div>
                                                <div onClick={() => removeDiscount(index)} className='cursor-pointer w-[10%] flex justify-center items-center' >
                                                    <Trash size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </>
                        )
                    }
                </div>
                {
                    advertisementType === 0 && (
                        <Card className='w-full mt-[50px] md:max-w-[450px] h-[260px] md:mt-0'>
                            <CardHeader>
                                <CardTitle className='flex gap-2 items-center'>
                                    <Info />
                                    Long Duration Bookings
                                </CardTitle>
                                <CardDescription>Much like many (if not all) of the big companies, ADEX encourages you to offer duration discounts. This incentivizes buyers to book your ad for longer durations. For example: </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>• 3 months earns the buyer a 10% discount,</p>
                                <p>• 6 months earns the buyer a 15% discount, and </p>
                                <p>• 12 months ears the buyer a 20% discount. </p>
                            </CardContent>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}
