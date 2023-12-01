'use client'
import { useEffect, useState, createContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBookings from './MyBookings'
import axios from 'axios'
import GetAdvertisementDetails from '@/actions/GetAdvertisementDetails'
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'
import GetMyBookings from '@/actions/GetMyBookings'
import GetFilteredAdvertisements from '@/actions/GetFilteredAdvertisements'
import GetPendingBookings from '@/actions/GetPendingBookins'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import GetPayoutMethod from '@/actions/getPayoutMethod'

export const RefreshContext = createContext();

export default function MyAdex() {
  const [listingData, setListingData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const searchParams = useSearchParams()
  const subTab = searchParams.get('sub-tab')
  const [value, setValue] = useState(subTab ? parseInt(subTab) : 0);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [hasPayoutMethod, setHasPayoutMethod] = useState(false);

  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    draft:0,
    finished: 0,
    pending: 0
  });
  const router = useRouter();

  useEffect(() => {
    async function getInfo() {
      const { myListing, status } = (await GetMyAdvertisement()) || {}
      const myBookings = await GetMyBookings()
      const pendingListing = await GetPendingBookings()
      const checkPayout = await GetPayoutMethod()
      setHasPayoutMethod(checkPayout)

      if (myListing?.length > 0) {
        setListingData(myListing)
        setStatus(status)
      }
      setBookingData([...pendingListing, ...myBookings])
      setIsContentLoaded(true)
      if (subTab == '1') {
        setValue(1)
      }
    }
    getInfo();
  }, []);


  return (
    <div className='w-full flex flex-col items-center px-[20px]'>
      <div>
        <h1 className='text-[30px] mt-8'>My ADEX</h1>
      </div>
      <div className='flex flex-col lg:flex-row w-full items-start  md:px-8'>
        <div className='w-full xl:w-[40%]'>
          <RefreshContext.Provider value={[refresh, setRefresh]}>
            <TabsComponent value={value} setValue={(value) => setValue(value)}>
              <MyListing label='My Listing' data={listingData} status={status} isContentLoaded={isContentLoaded} />
              <MyBookings label='My Booking' data={bookingData} isContentLoaded={isContentLoaded} />
            </TabsComponent>
          </RefreshContext.Provider>
        </div>
        {
          isContentLoaded && !hasPayoutMethod && listingData.length > 0 && (

            <Card className='w-full mt-[50px] md:max-w-[550px] h-fit ml-[80px] mx-auto'>
              <CardHeader>
                <CardTitle className='flex gap-2 items-center'>
                  <div className='w-[25px]'>
                    <Image
                      src='/warning.png'
                      alt="note icon"
                      priority
                      width={2000}
                      height={2000}
                      className='w-full mr-3'

                    />
                  </div>
                  Set Up Your Payout Method
                </CardTitle>
                <CardDescription className='mt-3'>To ensure the visibility of your advertisements and allow potential viewers to explore and book them, it&apos;s mandatory to set up at least one Payout Method. Without a registered Payout Method, your advertisements will not be visible to others. After register, all your listings will automatically become visible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={()=>router.push('add-payout-method')}>Add Payout Method</Button>
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>

  )
}
