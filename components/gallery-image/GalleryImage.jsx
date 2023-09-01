import React from 'react'
import Image from 'next/image';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

export default function GalleryImage({ gallery, isSelectable, selected, setSelected,setImportFromGallery }) {


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

          <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-full'>
            {
              gallery[0].company_gallery.map((item, index) => (
                <div key={index} id={index} className='relative hover:cursor-pointer shadow-md border rounded-lg' onClick={() => handleSelected(index)}>
                  <div className="w-full aspect-square rounded-lg">
                    <Image
                      src={item.data_url}
                      alt="Company Logo"
                      width={2000}
                      height={2000}
                      className='w-full h-full rounded-lg object-cover hover:scale-[1.1]'
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
          <h1 className='mt-10  text-2xl'>The Image Gallery is empty</h1>
        )
      }
    </>
  )
}
