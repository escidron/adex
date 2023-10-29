import CurrencyInput from 'react-currency-input-field';

import { useContext,useState,useEffect } from 'react'
import { ListingContext } from '@/app/listing/layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Info } from 'lucide-react';
import { checkCategoryType } from '@/utils/checkCategoryType';


export default function PriceForm() {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')

    useEffect(() => {

        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(categoryType)
    }, []);


    const handleTitle = (value) => {
        let price = value.replace(/[$,]/g, '');
        let pricesParts
        if (price.includes('.')) {
            pricesParts = price.split('.')
            if (pricesParts[1].length > 2) {
                price = pricesParts[0] + '.' + pricesParts[1].substring(0, 2)
            }
        }
        setListingProperties({ ...listingProperties, price: price })
    }
    console.log('listing ', listingProperties)
    return (
        <div className='w-full max-w-[800px] flex flex-col items-center'>
            <div className='w-full flex flex-col  md:flex-row justify-between '>
                <div>
                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-center'>
                            <p className='text-[32px]'>Price</p>
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
                        <p className='text-[18px] text-gray-500'>Enter the price of your listing.</p>
                    </div>
                    <div className=' mt-4'>
                        <CurrencyInput
                            autoFocus={true}
                            className=' text-[55px] font-[700] text-gray-800  w-full rounded-md outline-none p-2'
                            name="input-name"
                            placeholder="$ 0,00"
                            allowDecimals={true}
                            decimalsLimit={2}
                            decimalSeparator="."
                            groupSeparator=","
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(/[^0-9.,]/g, '');
                                handleTitle(numericValue);
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
                                    <Info />
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
