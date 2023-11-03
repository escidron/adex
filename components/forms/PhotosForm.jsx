import DropImageArea from '../dropImageArea/DropImageArea';

import { useContext, useState } from 'react'
import { ListingContext } from '@/app/listing/layout';

export default function PhotosForm() {
  const [images, setImages] = useState([]);
  const [listingProperties, setListingProperties] = useContext(ListingContext)
  
  const handleImages = (images) => {
    console.log('images',images)
    setListingProperties((prev)=>({ ...prev, images: images }))
  }
  return (
    <div className='w-full max-w-[800px] flex flex-col items-center overflow-y-auto invisible_scroll_bar'>
      <div className='w-full h-full '>
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
