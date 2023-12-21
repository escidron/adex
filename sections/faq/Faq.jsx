import AccordionComponent from '@/components/accordion/AccordionComponent'
import React from 'react'

export default function Faq() {
  return (
    <div className='w-full flex flex-col items-center mt-8 min-h-[300px] mb-10'>
       <h1 className='text-[40px] md:text-[48px] lg:text-[51px]'>FAQ</h1>
       <p className='text-[18px]'>You have questions. We’ve got answers</p>
       <div className=' md:w-[80%] lg:w-[70%] xl:w-1/2 mt-4 px-[10px]'>
            <AccordionComponent />
       </div>
    </div>
  )
}
