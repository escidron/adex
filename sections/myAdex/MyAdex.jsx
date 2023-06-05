import React from 'react'
import Card from './Card'

const MockData = [
  {
    id:1,
    name: 'Property A',
    address: '456 Elm Street, Townsville',
    createdDate:' 2023-05-20',
    image: '/get-paid4.png',
    days: 10,
    price: 100000
  },
  {
    id:2,
    name: 'Property B',
    address: '456 Elm Street, Townsville',
    createdDate:' 2023-05-20',
    image: '/get-paid4.png',
    days: 10,
    price: 1000
  }
]
export default function MyAdex() {

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      {
        MockData.map((item)=>{
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
