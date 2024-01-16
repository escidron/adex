
'use client'


import Card from './Card'
import toast from "react-hot-toast";
import StatusTabBar from './_components/StatusTabBar';
import CardSkeleton from './_components/CardSkeleton';
import RemoveListing from '@/actions/RemoveListing';

import { useState, useContext } from 'react';
import { RefreshContext } from './MyAdex';
import { CompanyRefreshContext } from '@/app/my-company/page';

export default function MyListing({ data,setListingData, status, isCompanyPage, isContentLoaded }) {
  const [currentStatus, setCurrentStatus] = useState('all');
  const [advertisementId, setAdvertisementId] = useState('');
  const [refresh, setRefresh] = useContext(isCompanyPage ? CompanyRefreshContext : RefreshContext)

  if (data?.length == 0 && isContentLoaded) {
    return (
      <>
        <h1 className='text-[20px]'>No Listings yet.</h1>
        <p className='text-gray-600'>Go to &quot;Create Listing&quot; to get started.</p>
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
  const handleCurrentStatus = (e, statusValue) => {
    const id = statusValue ? statusValue : e.currentTarget.id
    if (id !== currentStatus) {
      setCurrentStatus(id);
    }
  }

  const deleteListing = async (id) => {
    const response = await RemoveListing(id)
    toast.success('Advertisement deleted successfully')
    setRefresh(prev => !prev)
  }

  const updateRatingStastus = (id) =>{
      // Criar uma nova array atualizada
      const updatedData = data.map(item =>
        item.id === id ? { ...item, is_rated_by_seller: '1' } : item
      );
  
      // Atualizar o estado com a nova array
      setListingData(updatedData);
    
  }
  return (
    <div className='flex flex-col items-center '>
        <StatusTabBar
          status={status}
          currentStatus={currentStatus}
          handleCurrentStatus={(e, current) => handleCurrentStatus(e, current)}
        />
      {
        data.map((item, index) => {
          if (item.status == currentStatus || currentStatus == 'all') {
            return (
              <div key={item.id + `${index}`} className='w-full flex gap-4 items-center'  >
                <Card
                  item={item}
                  setAdvertisementId={(id) => setAdvertisementId(id)}
                  route={`/listing/view/${item.id}`}
                  deleteListing={(id) => deleteListing(id)}
                  updateRatingStastus={(id)=>updateRatingStastus(id)}
                  isListingView={true}
                />
              </div>
            )
          }
          return null
        })
      }
    </div>
  )
}
