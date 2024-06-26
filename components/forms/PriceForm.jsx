import CurrencyInput from 'react-currency-input-field';

import { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { checkCategoryType } from '@/utils/checkCategoryType';

import PriceTypeSelector from '@/app/listing/create/_components/PriceTypesSelector';
import Image from 'next/image';
import DigitalPriceTypeSelector from '@/app/listing/create/_components/DigitalPriceTypesSelector';
import DigitalDurationType from '@/app/listing/create/_components/DigitalDurationType';

export default function PriceForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')
    const [isOtherType, setIsOtherType] = useState(false);

    const otherListingType = [8, 12, 18]//categories of other
    useEffect(() => {
        if (otherListingType.includes(listingProperties.sub_category)) {
            setIsOtherType(true)
        }
        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(categoryType)
    }, []);

    const handlePrice = (value) => {
        let price = value.replace(/[$,]/g, '');
        let pricesParts
        if (price.includes('.')) {
            pricesParts = price.split('.')
            if (pricesParts[1].length > 2) {
                price = pricesParts[0] + '.' + pricesParts[1].substring(0, 2)
            }
        }
        console.log(price)
        setListingProperties({ ...listingProperties, price: price })
    }

    const handleCurrentPriceType = (type) => {
        setListingProperties({ ...listingProperties, otherListingType: type })

    }
    const handleDigitalPriceType = (type) => {
        console.log('type', type)
        setListingProperties({ ...listingProperties, digitalPriceType: type })

    }

    return (
        <div className='w-full max-w-[800px] flex flex-col items-center mx-auto'>
            <div className={`w-full flex flex-col px-[20px] md:flex-row  ${listingProperties.sub_category === 17 ? 'justify-between' : 'justify-center'}`}>
                <div className='w-full'>
                    {
                        isOtherType && (
                            <>
                                <p className='text-[24px]'>Select the type of the price</p>
                                <PriceTypeSelector
                                    currentPriceType={listingProperties.otherListingType}
                                    handleCurrentPriceType={(type) => handleCurrentPriceType(type)}
                                />
                            </>
                        )
                    }
                    {
                        listingProperties.sub_category === 7 && (
                            <>
                                <p className='text-[24px]'>Select the type of the price</p>
                                <DigitalPriceTypeSelector
                                    currentPriceType={listingProperties.digitalPriceType}
                                    handleCurrentPriceType={(type) => handleDigitalPriceType(type)}
                                />
                                {/* <p className='text-[24px] mt-4'>Select the frequence </p>
                                <DigitalDurationType
                                    currentPriceType={listingProperties.digitalListingDuration}
                                    handleCurrentPriceType={(type) => handleDigitalDuration(type)}
                                /> */}
                            </>
                        )
                    }
                    <div className='flex flex-col mt-[40px]'>
                        <div className='flex gap-1 items-center'>
                            <p className='text-[32px]'>Price</p>
                            {
                                isOtherType ? (
                                    <>
                                        {
                                            listingProperties.otherListingType == 2 && (
                                                <p className='mt-1'>/Unit</p>
                                            )
                                        }
                                        {
                                            listingProperties.otherListingType == 0 && (
                                                <p className='mt-1'>/Month</p>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            listingProperties.sub_category == 17 && (
                                                <p className='mt-1'>/Unit</p>
                                            )
                                        }
                                        {
                                            advertisementType == 0 && (
                                                <p className='mt-1'>/Month</p>
                                            )
                                        }
                                    </>
                                )
                            }


                        </div>
                        <p className='text-[18px] text-gray-500'>Enter the price of your listing.</p>
                    </div>
                    <div className=' mt-4'>
                        <CurrencyInput
                            autoFocus={true}
                            className=' text-[55px] font-[700] text-gray-800  w-full rounded-md outline-none p-2'
                            name="input-name"
                            placeholder="$"
                            allowDecimals={true}
                            decimalsLimit={2}
                            decimalSeparator="."
                            groupSeparator=","
                            onChange={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue.length > 8) {
                                    inputValue = inputValue.slice(0, 8);
                                }
                                const numericValue = inputValue.replace(/[^0-9.,]/g, '');
                                handlePrice(numericValue);
                            }}
                            prefix='$'
                            value={listingProperties.price ? listingProperties.price : null}
                        />
                    </div>
                </div>

                {
                    listingProperties.sub_category === 17 && (
                        <Card className='w-full mt-[50px] md:max-w-[400px]  md:mt-0'>
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
                                    Unit Pricing
                                </CardTitle>
                                <CardDescription>Unit pricing is for Unit-based listings such as pizza boxes. One flyer goes out with each pizza box. For this type of listing, ADEX has implemented a minimum of 100 items/Unit. Use the following examples when creating a Unit-based listing:</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>100 items = 1 Unit</p>
                                <p>500 items = 5 Units</p>
                                <p>1000 items = 10 Units</p>
                            </CardContent>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}
