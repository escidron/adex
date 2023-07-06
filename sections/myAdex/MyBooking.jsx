'use client'
import { useState } from 'react'
import Card from './Card'

export default function MyBooking({data}) {
  if(data.length === 0){
    return(
      <>
      <h1 className='text-[20px]'>There are not exist any Booking yet</h1>
      <p className='text-gray-600'>Go to market place for getting your first one.</p>
      </>
    )
  }

  return (
        <div className='flex flex-col items-center justify-center mt-8'>
      {
        data.map((item)=>{
          return(
            <section key={item.id} className='w-full justify-center'>
              <Card item={item}/>
              <div className='w-[90%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div>
            </section>
          )
       })
      }

    </div>
  )
}
