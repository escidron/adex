import React from 'react'
import Image from 'next/image';
import GalleryCarrousel from './GalleryCarrousel';

const images = [
  { id: 1, image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
  { id: 2, image: "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__480.jpg" },
  { id: 3, image: "https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040__480.jpg" },
  { id: 4, image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg" },
  { id: 5, image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg" },
  { id: 6, image: "https://cdn.pixabay.com/photo/2016/02/19/10/12/love-1209790__480.jpg" },
  { id: 7, image: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg" }
];

export default function GalleryImage({ gallery }) {


  return (
    <>
      {
        gallery.length > 0 ?(

      <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-full'>
        {
          gallery[0].company_gallery.map((item,index) => (
            <div key={index} className='hover:cursor-pointer'>
              <div className="w-full aspect-square">
                <Image
                  src={item.data_url}
                  alt="Company Logo"
                  width={2000}
                  height={2000}
                  className='w-full h-full rounded-lg object-cover hover:scale-[1.1]'
                />
              </div>
            </div>
          ))
        }
      </div >
        ):(
          <h1 className='mt-10  text-2xl'>The Image Gallery is empty</h1>
        )
      }
    </>
  )
}
