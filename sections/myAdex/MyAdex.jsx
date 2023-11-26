'use client'
import { useEffect, useState, createContext } from 'react'
import { useSearchParams } from 'next/navigation'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBookings from './MyBookings'
import axios from 'axios'
import GetAdvertisementDetails from '@/actions/GetAdvertisementDetails'
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'
import GetMyBookings from '@/actions/GetMyBookings'

export const RefreshContext = createContext();

export default function MyAdex() {
  const [listingData, setListingData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const searchParams = useSearchParams()
  const subTab = searchParams.get('sub-tab')
  const [value, setValue] = useState(subTab ? parseInt(subTab) : 0);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    finished: 0,
    pending: 0
  });
  console.log('subTab', subTab)

  useEffect(() => {
    async function getInfo() {
      const { myListing,status } = (await GetMyAdvertisement()) || {}
      const myBookings = await GetMyBookings()
      console.log('myBookings',myBookings)
      if(myListing?.length > 0){
        setListingData(myListing)
        setStatus(status)
      }
      setBookingData(myBookings)
      setIsContentLoaded(true)
      if( subTab == '1'){
        setValue(1)
      }
    }
    getInfo();
  }, []);

  // useEffect(() => {
  //   axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
  //     {}, {
  //     withCredentials: true,
  //   })
  //     .then(function (response) {
  //       setListingData(response.data.data)
  //       setStatus(response.data.status)
  //       setIsContentLoaded(true)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     });
  // }, [refresh]);

  // useEffect(() => {
  //   axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-booking`,
  //     {}, {
  //     withCredentials: true,
  //   })
  //     .then(function (response) {
  //       setBookingData(response.data.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     });
  // }, []);

  return (
    <div className='w-full flex flex-col items-center '>
      <div>
        <h1 className='text-[30px] mt-8'>My ADEX</h1>
      </div>
      <div className='flex w-full items-center md:px-8'>
        <div className='w-full lg:w-[40%]'>
          <RefreshContext.Provider value={[refresh, setRefresh]}>
            <TabsComponent value={value} setValue={(value) => setValue(value)}>
              <MyListing label='My Listing' data={listingData} status={status} isContentLoaded={isContentLoaded} />
              <MyBookings label='My Booking' data={bookingData} isContentLoaded={isContentLoaded} />
            </TabsComponent>
          </RefreshContext.Provider>

        </div>
      </div>
    </div>

  )
}
