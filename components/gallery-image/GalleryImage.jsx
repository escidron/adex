import React from 'react'
import Image from 'next/image';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { ImageIcon } from 'lucide-react';

export default function GalleryImage({ gallery, isSelectable, selected, setSelected, setImportFromGallery }) {

  const handleSelected = (index) => {


    if (!selected.includes(index)) {
      setSelected([...selected, index])
      setImportFromGallery(true)

    } else {
      const newSelected = selected.filter(item => item != index)
      setSelected(newSelected)
      setImportFromGallery(true)
    }
  }
  return (
    <>
      {
        gallery.length > 0 ? (

          <div className='mt-6 grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-full '>
            {
              gallery[0].company_gallery.map((item, index) => (
                <div key={index} id={index} className='relative hover:cursor-pointer max-w-[250px] hover:opacity-80 shadow-md border rounded-lg' onClick={() => handleSelected(index)}>
                  <div className="w-full aspect-square rounded-lg max-w-[250px]">
                    <Image
                      src={item.data_url}
                      alt="Company Logo"
                      width={2000}
                      height={2000}
                      className='w-full max-w-[250px] h-full rounded-lg object-cover '
                    />
                  </div>
                  {
                    isSelectable && (
                      <>
                        {
                          selected.includes(index) && (
                            <>
                              <div className='bg-black w-full h-full absolute top-0 rounded-lg z-[98] opacity-50' >
                              </div>
                              <div className='absolute top-4 right-4 bg-white z-[99] rounded-md text-green-700'>
                                <CheckBoxRoundedIcon />
                              </div>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </div>
              ))
            }
          </div >
        ) : (
          <div className='mt-8 w-full bg-slate-200 h-[200px] rounded-lg flex flex-col justify-center items-center'>
            <ImageIcon color='gray' size={30}/>
            <h1 className='mt-2 text-xl text-gray-500'>This gallery is empty</h1>
          </div>
        )
      }
    </>
  )
}
