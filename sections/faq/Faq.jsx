import AccordionComponent from '@/components/accordion/AccordionComponent'
import React from 'react'

export default function Faq() {
  return (
    <div className='w-full flex flex-col items-center mt-8 min-h-[300px] mb-10'>
       <h1>FAQ</h1>
       <p>You have questions. We’ve got answers</p>
       <div className='w-1/2 mt-4'>
            <AccordionComponent />
       </div>
    </div>
  )
}
