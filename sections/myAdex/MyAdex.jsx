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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState, createContext } from 'react'
import { useSearchParams } from 'next/navigation'
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
  const [allBookings, setAllBookings] = useState([]);
  const [user, setUser] = useState({});
  const [status, setStatus] = useState({
    available: 0,
    running: 0,
    draft: 0,
    finished: 0,
    pending: 0
  });

  useEffect(() => {
    async function getInfo() {
      let checkPayout

      const { myListing, status } = (await GetMyAdvertisement()) || { myListing: [], status: {} }
      const myBookings = await GetMyBookings()
      const pendingListing = await GetPendingBookings()
      const user = await GetUserProfile()
      const companies = await GetCompanies()
      setAllBookings([...pendingListing, ...myBookings])
      if (user.userType == 1) {

        if (companies.length > 0) {
          checkPayout = await GetPayoutMethod(selectedCompanyId ? selectedCompanyId : companies[0].id)

          const newListing = myListing.filter(item => item.company_id == (selectedCompanyId ? selectedCompanyId : companies[0].id))
          const newStatus = filterStatus(newListing)
          const newBookings = myBookings.filter(item => item.requested_by_company == (selectedCompanyId ? selectedCompanyId : companies[0].id))
          const newPendings = pendingListing.filter(item => item.requested_by_company == (selectedCompanyId ? selectedCompanyId : companies[0].id))

          setBookingData([...newPendings, ...newBookings])
          setListingData(() => newListing)
          setStatus(newStatus)
          setSelectedCompany(() => companies[0].company_name)
          setSelectedCompanyId(() => companies[0].id)
        }

      } else if (user.userType == '2') {
        checkPayout = await GetPayoutMethod()
        if (myListing.length > 0) {
          setListingData(myListing)
        }
        setStatus(status)
        setBookingData([...pendingListing, ...myBookings])

      }

      setUser(user)
      setAllListings(myListing)
      setHasPayoutMethod(checkPayout)
      setIsContentLoaded(true)
      setCompanies(companies)

      if (subTab == '1') {
        setValue(1)
      }
    }
    getInfo();
  }, [refresh]);

  const filterStatus = (companyListings) => {
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
    //use for listing filter
    const newListing = allListings.filter(item => item.company_id == id)
    const selectedCompany = companies.find(item => item.id === id)
    const checkPayout = await GetPayoutMethod(id)
    const newStatus = filterStatus(newListing)
    setStatus(newStatus)
    setListingData(newListing)
    setHasPayoutMethod(checkPayout)

    //use for booking filter
    const newBookings = allBookings.filter(item => item.requested_by_company == id)
    setBookingData(newBookings)

    //use for both
    setSelectedCompany(selectedCompany.company_name)
    setSelectedCompanyId(selectedCompany.id)

  }
  return (
    <div className='w-full flex flex-col items-center px-[20px]'>
      <div>
        <h1 className='text-[30px] mt-8'>My ADEX</h1>
      </div>
      {
        user.userType == 1 && companies.length > 0 && (

          <div className='w-full flex flex-col items-start gap-2 md:px-8 '>
            <p className='font-[600]'>Select Business</p>
            <Select defaultValue={companies[0].id} onValueChange={(value) => filterListing(value)} className='overflow-y-scroll'>
              <SelectTrigger className='shadow-md w-[300px]'>
                <SelectValue className='text-[12px]' placeholder={selectedCompany} />
              </SelectTrigger>
              <SelectContent ref={(ref) => {
                //prevent bubbling
                if (!ref) return;
                ref.ontouchstart = (e) => {
                  e.preventDefault();
                };
              }}>
                <SelectGroup >
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
                  setHasPayoutMethod={(hasPayout) => setHasPayoutMethod(hasPayout)}
                />
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>

  )
}
