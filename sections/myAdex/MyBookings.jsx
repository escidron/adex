'use client'
import Card from './Card'
import CardSkeleton from './_components/CardSkeleton'

export default function MyBookings({ data, isContentLoaded }) {

  if (data?.length == 0 && isContentLoaded ) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Booking yet</h1>
        <p className='text-gray-600'>Go to market place for getting your first one.</p>
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
  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      {
        data.map((item) => {

          return (
            <section key={item.id + index} className='w-full justify-center'>
              <Card
                item={item}
                route={`/my-booking?id=${item.id}`}
              />
              <div className='w-[90%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div>
            </section>
          )
        })
      }

    </div>
  )
}
