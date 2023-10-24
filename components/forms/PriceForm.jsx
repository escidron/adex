import CurrencyInput from 'react-currency-input-field';

import { useContext } from 'react'
import { ListingContext } from '@/app/listing/layout';

export default function PriceForm() {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

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
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Price</h1>
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
        </div>
    )
}
