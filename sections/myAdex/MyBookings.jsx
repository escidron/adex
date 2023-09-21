'use client'
import { useState } from 'react'
import Card from './Card'
import Link from 'next/link'

export default function MyBookings({ data }) {
  if (data.length === 0) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Booking yet</h1>
        <p className='text-gray-600'>Go to market place for getting your first one.</p>
      </>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      {
        data.map((item) => {
          const bulletPoints = item.description.split('\n');

          return (
            <section key={item.id} className='w-full justify-center'>
              <Link href={`/my-booking?id=${item.id}`}
                className='cursor-pointer'>
                <Card item={item} bulletPoints={bulletPoints} />
              </Link>
              <div className='w-[90%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div>
            </section>
          )
        })
      }

    </div>
  )
}
