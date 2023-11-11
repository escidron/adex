'use client'
import Image from 'next/image'

export default function ImagesBox({ listingProperties }) {
    return (
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
    )
}
