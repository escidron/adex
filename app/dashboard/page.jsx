'use client'

import { useEffect,useState } from 'react'
import ProfileHeader from '@/components/profileHeader/ProfileHeader'
import DashboardPanel from '@/sections/dashboard/DashboardPanel'
import axios from 'axios';

export default function Dashboard() {
  //create logic if the user is individual and bussiness
  const [balance, setBalance] = useState(null);
  useEffect(() => {

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/get-account-balance`,
      {},
      {
        withCredentials: true,

      })
      .then(function (response) {
        setBalance(response.data)

      })
      .catch(function (error) {
        console.log(error)
      });

  }, []);
  return (
    <div>
      <ProfileHeader />
      <div className='bg-[#FCD33B] h-[20px] w-full'></div>
      {
        balance && (
          <DashboardPanel balance={balance}/>
        )
      }
    </div>
  )
}
