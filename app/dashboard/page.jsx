import ProfileHeader from '@/components/profileHeader/ProfileHeader'
import DashboardPanel from '@/sections/dashboard/DashboardPanel'
import React from 'react'

export default function Dashboard() {
  //create logic if the user is individual and bussiness
  return (
    <div>
        <ProfileHeader />
        <div className='bg-[#FCD33B] h-[20px] w-full'></div>
        <DashboardPanel />
    </div>
  )
}
