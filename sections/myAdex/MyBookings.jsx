'use client'
import { useState } from 'react';
import Card from './Card'
import CardSkeleton from './_components/CardSkeleton'
import StatusBookingsTabBar from './_components/StatusBookingsTabBar';

export default function MyBookings({ data, isContentLoaded, setBookingData, status }) {

  const [currentStatus, setCurrentStatus] = useState('all');
  if (data?.length == 0 && isContentLoaded) {
    return (
      <>
        <h1 className='text-[20px]'>No Bookings yet.</h1>
        <p className='text-gray-600'>Go to our Market Place to get started.</p>
      </>
    )
  }
  if (!isContentLoaded) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
      </>
    )
  }
  const handleCurrentStatus = (e, statusValue) => {
    const id = statusValue ? statusValue : e.currentTarget.id
    if (id !== currentStatus) {
      setCurrentStatus(id);
    }
  }

  const updateRatingStastus = (id) => {
    // Criar uma nova array atualizada
    const updatedData = data.map(item =>
      item.id === id ? { ...item, is_rated_by_buyer: '1' } : item
    );

    // Atualizar o estado com a nova array
    setBookingData(updatedData)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <StatusBookingsTabBar
        status={status}
        currentStatus={currentStatus}
        handleCurrentStatus={(e, current) => handleCurrentStatus(e, current)}
      />
      {
        data.map((item, index) => {
          if (item.status == currentStatus || currentStatus == 'all') {
            return (
              <section key={item.id + `${index}`} className='w-full justify-center'>
                <Card
                  item={item}
                  route={`/my-booking/${item.id}`}
                  updateRatingStastus={(id) => updateRatingStastus(id)}
                  isListingView={false}
                />
                <div className='w-[90%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div>
              </section>
            )
          }
        })
      }

    </div>
  )
}
