'use client'

import Image from 'next/image'
import GetPayoutMethod from '@/actions/getPayoutMethod'
import AddAccountModals from '@/components/addAccount/AddAccountModals'
import TabsComponent from '@/components/tabs/TabsComponent'
import MyListing from './MyListing'
import MyBookings from './MyBookings'
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'
import GetMyBookings from '@/actions/GetMyBookings'
import GetPendingBookings from '@/actions/GetPendingBookins'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState, createContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import GetCompanies from '@/actions/GetCompanies'
import GetUserProfile from '@/actions/GetUserProfile'
import { Separator } from '@/components/ui/separator'

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
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [allListings, setAllListings] = useState([]);
  const [user, setUser] = useState({});
  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    draft: 0,
    finished: 0,
    pending: 0
  });
  const router = useRouter();

  useEffect(() => {
    async function getInfo() {
      let checkPayout
      const { myListing, status } = (await GetMyAdvertisement()) || {}
      const myBookings = await GetMyBookings()
      const pendingListing = await GetPendingBookings()
      const user = await GetUserProfile()
      const companies = await GetCompanies()
      if (myListing?.length > 0) {
        setListingData(myListing)
        setAllListings(myListing)
      }
      if (user.userType == 1 && myListing?.length > 0) {
        const newListing = myListing.filter(item => item.company_id == myListing[0].company_id)
        setListingData(() => newListing)
        const newStatus = filterStatus(newListing)
        setStatus(newStatus)
        setSelectedCompany(() => companies[0].company_name)
        setSelectedCompanyId(() => companies[0].id)
        checkPayout = await GetPayoutMethod(companies[0].id)
      } else if (user.userType == '2') {
        checkPayout = await GetPayoutMethod()
        setStatus(status)

      }
      setUser(user)
      setHasPayoutMethod(checkPayout)
      setBookingData([...pendingListing, ...myBookings])
      setIsContentLoaded(true)
      setCompanies(companies)

      console.log('status',status)

      if (subTab == '1') {
        setValue(1)
      }
    }
    getInfo();
  }, []);

  const filterStatus = (companyListings)=>{
    const status = {
      all: 0,
      draft: 0,
      available: 0,
      running: 0,
      finished: 0,
      pending: 0,
    };

    companyListings.map((item) => {
      if (item.status == "0") {
        status.draft++;
        status.all++;
      } else if (item.status == "1") {
        status.available++;
        status.all++;
      } else if (item.status == "2") {
        status.running++;
        status.all++;
      } else if (item.status == "3") {
        status.finished++;
        status.all++;
      } else if (item.status == "4") {
        status.pending++;
        status.all++;
      }
    });
    return status
  }

  const filterListing = async (id) => {
    const newListing = allListings.filter(item => item.company_id == id)
    const selectedCompany = companies.find(item => item.id === id)
    const checkPayout = await GetPayoutMethod(id)
    const newStatus = filterStatus(newListing)
    setStatus(newStatus)
    //to do
    //const newBooking = allBookings.filter(item=>item.company_id == id)
    setListingData(newListing)
    setSelectedCompany(selectedCompany.company_name)
    setSelectedCompanyId(selectedCompany.id)
    setHasPayoutMethod(checkPayout)


  }
  console.log('selectedCompany', selectedCompany);
  console.log('companies', companies);
  return (
    <div className='w-full flex flex-col items-center px-[20px]'>
      <div>
        <h1 className='text-[30px] mt-8'>My ADEX</h1>
      </div>
      {
        user.userType == 1 && (

          <div className='w-full flex flex-col items-start gap-2 md:px-8 '>
            <p className='font-[600]'>Select Business</p>
            <Select onValueChange={(value) => filterListing(value)} className='overflow-y-scroll'>
              <SelectTrigger className='shadow-md w-[300px]'>

                <SelectValue className='text-[12px]' placeholder={selectedCompany} />


              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  {
                    companies.map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.company_name}</SelectItem>
                    ))
                  }
                </SelectGroup>

              </SelectContent >
            </Select>
            <Separator className='my-3' />
          </div>
        )
      }
      <div className='flex flex-col lg:flex-row w-full items-start  md:px-8'  >
        <div className='w-full xl:w-[40%]'>
          <RefreshContext.Provider value={[refresh, setRefresh]}>
            <TabsComponent value={value} setValue={(value) => setValue(value)}>
              <MyListing label='My Listing' data={listingData} status={status} isContentLoaded={isContentLoaded} />
              <MyBookings label='My Booking' data={bookingData} isContentLoaded={isContentLoaded} />
            </TabsComponent>
          </RefreshContext.Provider>
        </div>
        {
          isContentLoaded && !hasPayoutMethod && listingData.length > 0 && value == '0' && (

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
                <AddAccountModals
                  setRefetch={(toggle) => setRefresh(toggle)}
                  selectedCompany={selectedCompany}
                  selectedCompanyId={selectedCompanyId}
                  setHasPayoutMethod={(hasPayout)=>setHasPayoutMethod(hasPayout)}
                />
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>

  )
}
