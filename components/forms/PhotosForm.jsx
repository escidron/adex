import DropImageArea from '../dropImageArea/DropImageArea';

import { useContext, useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function PhotosForm({ ListingContext }) {
  const [listingProperties, setListingProperties] = useContext(ListingContext)

  const handleImages = (images) => {
    setListingProperties((prev) => ({ ...prev, images: images }))
  }
  return (
    <div className='w-full max-w-[800px] flex flex-col items-center overflow-y-auto invisible_scroll_bar mt-[-50px]'>
      <Card className='w-full h-[150px] '>
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
            Photos
          </CardTitle>
          <CardDescription>Across nearly every industry and every major platform, profiles and listings with more pics have been proven to attract more interest, views, likes, and bookings. Be sure to add plenty of pics to your profile and to your listings.</CardDescription>
        </CardHeader>
      </Card>
      <div className='w-full h-full mt-6'>
        <div className='flex flex-col'>
          <h1 className='text-[32px]'>Add some photos</h1>
          <p className='text-[18px] text-gray-500'>Pick images to highlight your Listing</p>
        </div>
        <div className='h-[400px]  mt-2'>
          <DropImageArea
            images={listingProperties.images}
            setImages={(image) => handleImages(image)}
          />
        </div>
      </div>
    </div>
  )
}
