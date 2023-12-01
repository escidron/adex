
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
import RemoveListing from '@/actions/RemoveListing';





export default function MyListing({ data, status, isCompanyPage, isContentLoaded }) {
  const [currentStatus, setCurrentStatus] = useState('');
  const [advertisementId, setAdvertisementId] = useState('');
  const [refresh, setRefresh] = useContext(isCompanyPage ? CompanyRefreshContext : RefreshContext)

  if (data?.length == 0 && isContentLoaded) {
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


  const deleteListing = async (id)=> {
      const response = await RemoveListing(id)
      toast.success('Advertisement deleted successfully')
      setRefresh(prev => !prev)
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
            if (item.status == currentStatus || currentStatus == '') {
              return (
                <>
                  <div key={item.id + index} className='w-full flex gap-4 items-center'>
                    <Card
                      item={item}
                      setAdvertisementId={(id) => setAdvertisementId(id)}
                      route={`/listing/view/${item.id}`}
                      deleteListing={(id)=>deleteListing(id)}
                    />
                  </div>
                </>
              )
            }
            return null
          })
        }
    </div>
  )
}
