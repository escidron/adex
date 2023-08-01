"use Client"
import React,{useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import PersonalInfo from '@/sections/personalInformations/PersonalInfo';
import Security from '@/sections/security/Security';
import Notifications from '@/sections/notifications/Notifications';
import MyWallet from '@/sections/myWallet/MyWallet';
import MyAdex from '@/sections/myAdex/MyAdex';

const inter = Inter({ subsets: ['latin'] })
export default function FolderComponent() {
    const [folder, setFolder] = useState(1);
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab')
    console.log('tab',tab)
    return (
        <>
        <div className='flex justify-center bg-[#D9D9D9] h-[40px]'>
            <Link href='my-profile?tab=1' className={`border-l-[1px] border-r-[1px] ${tab==1?'bg-[#FCD33B]':'bg-white'}  px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>Personal Information</Link>
            <Link href='my-profile?tab=2' className={`border-l-[1px] border-r-[1px] ${tab==2?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>Security</Link>
            <Link href='my-profile?tab=3' className={`border-l-[1px] border-r-[1px] ${tab==3?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>Notifications</Link>
            <Link href='my-profile?tab=4' className={`border-l-[1px] border-r-[1px] ${tab==4?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>My Wallet</Link>
            <Link href='my-profile?tab=5' className={`border-l-[1px] border-r-[1px] ${tab==5?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>My ADEX</Link>
        </div>
        {tab==1?(<PersonalInfo/>):''}
        {tab==2?(<Security/>):''}
        {tab==3?(<Notifications/>):''}
        {tab==4?(<MyWallet/>):''}
        {tab==5?(<MyAdex/>):''}
        </>
  )
}
