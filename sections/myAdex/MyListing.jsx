
'use client'
import Card from './Card'
import { useState, useContext } from 'react';
import { Inter } from 'next/font/google'
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import SecondaryButton from '@/components/buttons/SecondaryButton';
import BlackButton from '@/components/buttons/BlackButton';
import axios from 'axios';
import { RefreshContext } from './MyAdex';
import { CompanyRefreshContext } from '@/app/my-company/page';


const inter = Inter({ subsets: ['latin'] })


export default function MyListing({ data, status, isCompanyPage }) {
  const [currentStatus, setCurrentStatus] = useState('0');
  const [advertisementId, setAdvertisementId] = useState('');
  const [refresh, setRefresh] = useContext(isCompanyPage ? CompanyRefreshContext : RefreshContext)

  if (data.length === 0) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Listing yet</h1>
        <p className='text-gray-600'>Go to Listing for getting your first one.</p>
      </>
    )
  }
  const handleCurrentStatus = (e) => {
    const id = e.currentTarget.id
    if (id !== currentStatus) {
      setCurrentStatus(id);
    }
  }


  const deleteAdvertisement = () => {
    console.log('advertisementId', advertisementId)
    axios.post('https://test.adexconnect.com/api/advertisements/delete-advertisement',
      { id: advertisementId }, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response)
        setAdvertisementId('')
        setRefresh(prev => (!prev))
        toast.success('Advertisement deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  return (
    <div className='flex flex-col items-center '>
      <div><Toaster /></div>
      <div className=" mt-2 w-full flex gap-4">
        <div className={`w-full`}>
          <div className="flex gap-2">
            <div
              type="text"
              id="0"
              name="all"
              onClick={(e) => handleCurrentStatus(e)}
              className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '0' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>All</p>
              <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
              <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.all}</p>
            </div>
            <div
              type="text"
              id="1"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Available</p>
              <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
              <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.available}</p>
            </div>

            <div
              type="text"
              id="2"
              name="running"
              onClick={(e) => handleCurrentStatus(e)}
              className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Running</p>
              <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
              <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.running}</p>
            </div>

            <div
              type="text"
              id="3"
              name="finished"
              onClick={(e) => handleCurrentStatus(e)}
              className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Finished</p>
              <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
              <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.finished}</p>
            </div>

            <div
              type="text"
              id="4"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Pending</p>
              <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
              <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.pending}</p>
            </div>
          </div>
        </div>
      </div>
      {
        data.map((item, index) => {
          if (item.status == currentStatus || currentStatus === '0') {
            const bulletPoints = item.description.split('\n');
            return (
              <>
                <section key={item.id + index} className='w-full flex gap-4 items-center'>

                    <Card 
                      item={item} 
                      bulletPoints={bulletPoints} 
                      setAdvertisementId={(id)=>setAdvertisementId(id)}
                    />

                </section>

              </>
            )
          }
          return null
        })
      }

      {
        advertisementId != '' && (
          <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center' onClick={() => setAdvertisementId('')}>
            </div>
            <div className='card-payment-modal px-[60px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[400px]'>
              <h1 className='text-[25px]'>
                Are you sure you want to delete this listing?
              </h1>
              <div className='flex items-center justify-between mt-2 w-full'>
                <div onClick={() => setAdvertisementId('')}>
                  <SecondaryButton label='Cancel' dark={true} />
                </div>
                <div onClick={deleteAdvertisement}>
                  <BlackButton label='Delete' />
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
