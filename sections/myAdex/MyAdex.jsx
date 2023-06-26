import { useEffect, useState } from 'react'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBooking from './MyBooking'
import axios from 'axios'
const MockData = [
  {
    id: 1,
    name: 'Property A',
    address: '456 Elm Street, Townsville',
    createdDate: ' 2023-05-20',
    image: '/get-paid4.png',
    days: 10,
    price: 100000
  },
  {
    id: 2,
    name: 'Property B',
    address: '456 Elm Street, Townsville',
    createdDate: ' 2023-05-20',
    image: '/get-paid4.png',
    days: 10,
    price: 1000
  }
]
export default function MyAdex() {
  const [listingData, setListingData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:8000/api/advertisements/my-advertisement',
      {}, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (response) {
        setListingData(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, []);
  
  useEffect(() => {
    axios.post('http://localhost:8000/api/advertisements/my-booking',
      {}, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (response) {
        setBookingData(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, []);
  return (
    <div className='w-full flex flex-col items-center '>
      <div>
        <h1 className='text-[30px] mt-8'>My ADEX</h1>
      </div>
      <div className='flex mt-4 w-[80%] items-center'>
        <div className='w-[60%]'>
          <TabsComponent>
            <MyListing label='My Listing' data={listingData} />
            <MyBooking label='My Booking' data={bookingData}/>
          </TabsComponent>
        </div>
      </div>
    </div>

  )
}
