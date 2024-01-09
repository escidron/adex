import axios from 'axios';

import { useContext, useState, useEffect } from 'react'
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
import toast from 'react-hot-toast';
import { monthsOptions, unitOptions } from '@/utils/discountsOptions';
import Image from 'next/image';
import DiscountNote from './notes/DiscountNote';


export default function DiscountsForm({ ListingContext }) {

    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [newDiscount, setNewDiscount] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [percentage, setPercentage] = useState('');
    const [advertisementType, setAdvertisementType] = useState('')

    useEffect(() => {

        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(listingProperties.otherListingType ? listingProperties.otherListingType : categoryType)
    }, [listingProperties]);

    const addDiscount = () => {
        setNewDiscount(false)
        setListingProperties((prev) => ({ ...prev, discounts: [...prev.discounts, { duration: selectedMonth, discount: percentage }] }))
    }
    const removeDiscount = (id, deleteIndex) => {
        let newDiscounts = []
        if (id) {
            newDiscounts = listingProperties.discounts.filter((item) => item.id != id);
        } else {
            newDiscounts = listingProperties.discounts.filter((item, index) => index != deleteIndex);
        }
        setListingProperties((prev) => ({ ...prev, discounts: newDiscounts }))
        if (listingProperties.discounts[0].id) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/delete-discount`,
                {
                    id
                }, {
                withCredentials: true,
            })
                .then(function (response) {
                    toast.success('Discount deleted')
                })
                .catch(function (error) {
                    console.log(error)
                    toast.error('Something went wrong!')
                })
        }
    }

    return (
        <div className='w-full max-w-[1000px] flex flex-col items-center  mx-auto'>
            <div className='w-full flex flex-col  lg:flex-row justify-between '>
                <div className='w-full flex lg:hidden justify-center'>
                    <DiscountNote advertisementType={advertisementType} />
                </div>
                <div className='w-full sm:w-[400px] mx-auto mt-6'>
                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-end'>
                            <h1 className='text-[28px] md:text-[32px]'>Discounts</h1>
                            <p className='mb-2 text-[14px]'>{`(optional)`}</p>
                        </div>
                        {/* <p className='text-[18px] text-gray-500'>Attract more buyers! Offering exclusive discounts can boost your sales and attract a wider audience to your listings.</p> */}
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
                                            <SelectContent ref={(ref) => {
                                                //prevent bubbling
                                                if (!ref) return;
                                                ref.ontouchstart = (e) => {
                                                    e.preventDefault();
                                                };
                                            }}>
                                                {
                                                    advertisementType == 0 && (

                                                        <SelectGroup>
                                                            {
                                                                monthsOptions.map((item) => (
                                                                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    )
                                                }
                                                {
                                                    advertisementType == 2 && (

                                                        <SelectGroup>
                                                            {
                                                                unitOptions.map((item) => (
                                                                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    )
                                                }
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
                                            <Button onClick={addDiscount} variant='default' disabled={!selectedMonth || !percentage}>Save</Button>
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
                                                    {
                                                        advertisementType == 2 && (

                                                            <h1 className='text-[14px]'>Buyers gets<label className='font-semibold'>{` ${item.discount}% discount `}</label>when they book<label className='font-semibold'>{` ${item.duration} units `}</label>or more.</h1>
                                                        )
                                                    }
                                                    {
                                                        advertisementType == 0 && (

                                                            <h1 className='text-[14px]'>Buyers gets<label className='font-semibold'>{` ${item.discount}% discount `}</label>when they book for<label className='font-semibold'>{` ${item.duration} months `}</label>or more.</h1>
                                                        )
                                                    }
                                                </div>
                                                <div onClick={() => removeDiscount(item.id, index)} className='cursor-pointer w-[10%] flex justify-center items-center' >
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
                <div className='w-full hidden lg:flex justify-center'>
                    <DiscountNote advertisementType={advertisementType} />
                </div>
            </div>
        </div>
    )
}
