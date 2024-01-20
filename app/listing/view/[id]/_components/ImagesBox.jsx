'use client'
import ViewPhotosSlider from './ViewPhotosSlider'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Eye, X } from 'lucide-react'
import { useState } from 'react'

export default function ImagesBox({ listingProperties }) {
    const [showImages, setShowImages] = useState(false);
    console.log('images box')
    return (
        <>

            <div className='relative w-full mt-4 flex gap-1 h-[200px] md:h-[300px] lg:h-[400px]'>
                <div className={`w-full  rounded-lg ${listingProperties.images.length < 3 ? 'md:w-full' : 'md:w-[70%]'}`}>
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
                <Button onClick={() => setShowImages(true)} className='absolute px-2 py-1  flex items-center rounded-lg bottom-4 right-4 gap-2 border border-black bg-white text-black hover:bg-white hover:opacity-85 hover:text-black'>
                    <Eye size={15} />
                    Show all photos
                </Button>
            </div>
            {
                showImages && (
                    <div className='fixed top-0 left-0 bg-black z-[98] h-[100%] w-full text-white p-2 flex justify-center items-center'>
                        <X onClick={()=>setShowImages(false)} className='fixed top-8 right-8 z-[99] rounded-lg cursor-pointer hover:bg-slate-200 hover:text-black'/>
                        <ViewPhotosSlider images={listingProperties.images}/>
                    </div>
                )
            }
        </>
    )
}
