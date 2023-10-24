import { useEffect, useState, createContext } from 'react'
import { useSearchParams } from 'next/navigation'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBookings from './MyBookings'
import axios from 'axios'

export const RefreshContext = createContext();

export default function MyAdex() {
  const [listingData, setListingData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const searchParams = useSearchParams()
  const subTab = searchParams.get('sub-tab')
  const [value, setValue] = useState(subTab?parseInt(subTab):0);
  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    finished: 0,
    pending: 0
  });
  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
      {}, {
      withCredentials: true,
    })
      .then(function (response) {
        setListingData(response.data.data)
        setStatus(response.data.status)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [refresh]);

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-booking`,
      {}, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response)
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
      <div className='flex w-full items-center md:px-8'>
        <div className='w-full lg:w-[40%]'>
          <RefreshContext.Provider value={[refresh, setRefresh]}>
            <TabsComponent value={value} setValue={(value)=>setValue(value)}>
              <MyListing label='My Listing' data={listingData} status={status} />
              <MyBookings label='My Booking' data={bookingData} />
            </TabsComponent>
          </RefreshContext.Provider>

        </div>
      </div>
    </div>

  )
}
