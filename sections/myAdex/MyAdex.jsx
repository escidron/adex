import { useEffect, useState, createContext } from 'react'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBooking from './MyBooking'
import axios from 'axios'

export const RefreshContext = createContext();

export default function MyAdex() {
  const [listingData, setListingData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    finished: 0,
    pending: 0
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
  }, [refresh]);
  console.log('status', status)

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
          <RefreshContext.Provider value={[refresh, setRefresh]}>
            <TabsComponent>
              <MyListing label='My Listing' data={listingData} status={status} />
              <MyBooking label='My Booking' data={bookingData} />
            </TabsComponent>
          </RefreshContext.Provider>

        </div>
      </div>
    </div>

  )
}
