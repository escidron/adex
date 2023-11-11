
'use client'
import Card from './Card'
import { useState, useContext } from 'react';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import SecondaryButton from '@/components/buttons/SecondaryButton';
import BlackButton from '@/components/buttons/BlackButton';
import axios from 'axios';
import { RefreshContext } from './MyAdex';
import { CompanyRefreshContext } from '@/app/my-company/page';
import StatusTabBar from './_components/StatusTabBar';
import { Skeleton } from '@mui/material';
import CardSkeleton from './_components/CardSkeleton';





export default function MyListing({ data, status, isCompanyPage, isContentLoaded }) {
  const [currentStatus, setCurrentStatus] = useState('0');
  const [advertisementId, setAdvertisementId] = useState('');
  const [refresh, setRefresh] = useContext(isCompanyPage ? CompanyRefreshContext : RefreshContext)

  if (data.length && isContentLoaded === 0) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Listing yet</h1>
        <p className='text-gray-600'>Go to Listing for getting your first one.</p>
      </>
    )
  }
  if (!isContentLoaded) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
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
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/delete-advertisement`,
      { id: advertisementId }, {
      withCredentials: true,
    })
      .then(function (response) {
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
      {/* <div><Toaster /></div> */}
      <StatusTabBar
        status={status}
        currentStatus={currentStatus}
        handleCurrentStatus={(current) => handleCurrentStatus(current)}
      />
      {
        data.map((item, index) => {
          if (item.status == currentStatus || currentStatus === '0') {
            return (
              <>
                <div key={item.id + index} className='w-full flex gap-4 items-center'>
                  <Card
                    item={item}
                    setAdvertisementId={(id) => setAdvertisementId(id)}
                    route={`/listing/view/${item.id}`}
                  />
                </div>

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
