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
  const [counted,setCounted] = useState(false)
  const [status, setStatus] = useState({
    available:0,
    running:0,
    finished:0,
    pending:0
  });
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
        setStatus(response.data.status)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, []);
  console.log('status',status)

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
        <h1 className='text-[30px] mt-4'>My ADEX</h1>
      </div>
      <div className='flex w-[80%] items-center'>
        <div className='w-[40%]'>
          <TabsComponent>
            <MyListing label='My Listing' data={listingData} status={status}  />
            <MyBooking label='My Booking' data={bookingData}/>
          </TabsComponent>
        </div>
      </div>
    </div>

  )
}
