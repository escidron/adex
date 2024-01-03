'use client'
import Card from './Card'
import CardSkeleton from './_components/CardSkeleton'

export default function MyBookings({ data, isContentLoaded, setBookingData }) {

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

  const updateRatingStastus = (id) =>{
    // Criar uma nova array atualizada
    const updatedData = data.map(item =>
      item.id === id ? { ...item, is_rated_by_buyer: '1' } : item
    );

    // Atualizar o estado com a nova array
    setBookingData(updatedData);
  
}

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      {
        data.map((item,index) => {

          return (
            <section key={item.id + index} className='w-full justify-center'>
              <Card
                item={item}
                route={`/my-booking/${item.id}`}
                updateRatingStastus={(id)=>updateRatingStastus(id)}
                isListingView={false}

              />
              <div className='w-[90%] h-[1px] mx-auto bg-gray-200 mt-8 mb-8'></div>
            </section>
          )
        })
      }

    </div>
  )
}
