import DropImageArea from '../dropImageArea/DropImageArea';

import { useContext } from 'react'
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
    <div className='w-full max-w-[800px] flex flex-col items-center  mx-auto mb-[100px]'>
      <Card className='w-full h-fit '>
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
          <CardDescription>Across nearly every industry and every major platform, profiles and listings with more pics have been proven to attract more interest, views, likes, and bookings. Be sure to add plenty of clear, high-quality pics to your profile and to your listings.</CardDescription>
        </CardHeader>
      </Card>
      <div className='w-full h-full mt-6 min-h-[500px]'>
        <h1 className='text-[28px] md:text-[32px]'>Pick some photos</h1>
        <div className='flex-1 mt-2'>
          <DropImageArea
            images={listingProperties.images}
            setImages={(image) => handleImages(image)}
          />
        </div>
      </div>
    </div>
  )
}
