'use client'


export default function DiscountsInfo({ listingProperties, advertisementType }) {
    console.log('advetisement type',advertisementType)
    return (
        <div>
            {
                listingProperties?.discounts?.length > 0 && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>Discounts</p>
                            <div>
                                {
                                    listingProperties.discounts.map((item, index) => (
                                        <div key={item.id}>
                                            <div className='flex gap-2 justify-between items-center p-2 w-full border mt-2 rounded-md'>
                                                <div className='flex w-[90%]'>
                                                    {
                                                        advertisementType == 2 && (

                                                            <h1 className='text-[14px]'>Get<label className='font-semibold'>{` ${item.discount}% discount `}</label>when book<label className='font-semibold'>{` ${item.duration} units `}</label>or more.</h1>
                                                        )
                                                    }
                                                    {
                                                        advertisementType == 0 && (

                                                            <h1 className='text-[14px]'>Get<label className='font-semibold'>{` ${item.discount}% discount `}</label>when book for<label className='font-semibold'>{` ${item.duration} months `}</label>or more.</h1>
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
                !listingProperties.discounts || listingProperties?.discounts?.length == 0 && (
                    <div>
                        <h1 className='text-[26px]'>Discounts</h1>
                        <p className='text-gray-600 italic'>No Discount provided</p>
                    </div>
                )
            }
        </div>
    )
}
