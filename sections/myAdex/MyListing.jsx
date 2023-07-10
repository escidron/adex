
'use client'
import Card from './Card'
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import BookingModal from '@/components/modals/BookingModal';


const inter = Inter({ subsets: ['latin'] })

export default function MyListing({ data, status }) {
  const [currentStatus, setCurrentStatus] = useState('1');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (data.length === 0) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Listing yet</h1>
        <p className='text-gray-600'>Go to Listing for getting your first one.</p>
      </>
    )
  }
  const handleCurrentStatus = (e) => {
    const id = e.currentTarget.id
    if (id !== currentStatus) {
      setCurrentStatus(id);
    }
  }
  return (
    <div className='flex flex-col items-center '>
      <div className=" mt-2 w-full flex gap-4">
        <div className={`w-full`}>
          <div className="flex gap-2">
            <div
              type="text"
              id="1"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Available</p>
              <p>|</p>
              <p className='pl-1'>{status.available}</p>
            </div>

            <div
              type="text"
              id="2"
              name="running"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Running</p>
              <p>|</p>
              <p className='pl-1'>{status.running}</p>
            </div>

            <div
              type="text"
              id="3"
              name="finished"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Finished</p>
              <p>|</p>
              <p className='pl-1'>{status.finished}</p>
            </div>

            <div
              type="text"
              id="4"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Pending</p>
              <p>|</p>
              <p className='pl-1'>{status.pending}</p>
            </div>
          </div>
        </div>
      </div>
      {
        data.map((item,index) => {
          console.log(item)
          if (item.status == currentStatus) {
            return (
              <>
                <section key={item.id+index} className='w-full justify-center'>
                  <Card item={item} setBookingModalOpen={(isOpen) => setBookingModalOpen(isOpen)} />
                </section>
                {/* <div className='w-[100%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div> */}
                {
                  bookingModalOpen && (
                    <BookingModal setBookingModalOpen={(isOpen) => setBookingModalOpen(isOpen)} item={item} key={item.id+index} />
                  )
                }
              </>
            )
          }
          return (
            // <div key={item.id} className='mt-8 w-full'>
            //   <p className='text-[20px] text-center'>No data found</p>
            //   <p className='text-[16px] text-center font-thin'>
            //     {
            //      currentStatus == 1?'No Available Listing found':
            //      currentStatus == 2?'No Running   Listing found':
            //      currentStatus == 3?'No Finished  Listing found':
            //      currentStatus == 4?'No Pending   Listing found':''
            //     }
            //   </p>
            // </div>
            null
          )
        })
      }
    </div>
  )
}
