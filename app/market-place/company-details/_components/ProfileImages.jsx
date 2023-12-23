import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProfileImages({ images }) {

  console.log('galllery images',images);

  if (images.length == 0) {
    return (
      <div className='mt-8 w-full bg-slate-200 h-[200px] rounded-lg flex flex-col justify-center items-center'>
        <ImageIcon color='gray' size={30} />
        <h1 className='mt-2 text-xl text-gray-500'>This gallery is empty</h1>
      </div>
    )
  }
  return (
    <div className='mt-6 grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-full '>
      {images.map((image, index) => (

        <div key={index} className="w-full aspect-square rounded-lg max-w-[250px]">
          <Image
            src={image.data_url}
            alt="Company Logo"
            width={2000}
            height={2000}
            className='w-full max-w-[250px] h-full rounded-lg object-cover '
          />
        </div>
      ))}
    </div>
  )
}
