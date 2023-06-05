"use Client"
import React,{useState} from 'react'
import { Inter } from 'next/font/google'
import GeneralInfo from '@/sections/generalInformations/GeneralInfo';
import Security from '@/sections/security/Security';
import Notifications from '@/sections/notifications/Notifications';
import MyWallet from '@/sections/myWallet/MyWallet';
import MyAdex from '@/sections/myAdex/MyAdex';

const inter = Inter({ subsets: ['latin'] })
export default function FolderComponent() {
    const [folder, setFolder] = useState(1);
    return (
        <>
        <div className='flex justify-center bg-[#D9D9D9] h-[40px]'>
            <button onClick={()=>setFolder(1)} className={`border-l-[1px] border-r-[1px] ${folder===1?'bg-[#FCD33B]':'bg-white'}  px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>General Information</button>
            <button onClick={()=>setFolder(2)} className={`border-l-[1px] border-r-[1px] ${folder===2?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>Security</button>
            <button onClick={()=>setFolder(3)} className={`border-l-[1px] border-r-[1px] ${folder===3?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>Notifications</button>
            <button onClick={()=>setFolder(4)} className={`border-l-[1px] border-r-[1px] ${folder===4?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>My Wallet</button>
            <button onClick={()=>setFolder(5)} className={`border-l-[1px] border-r-[1px] ${folder===5?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>My ADEX</button>
            <button onClick={()=>setFolder(6)} className={`border-l-[1px] border-r-[1px] ${folder===5?'bg-[#FCD33B]':'bg-white'} px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>My Contracts</button>
        </div>
        {folder===1?(<GeneralInfo/>):''}
        {folder===2?(<Security/>):''}
        {folder===3?(<Notifications/>):''}
        {folder===4?(<MyWallet/>):''}
        {folder===5?(<MyAdex/>):''}
        </>
  )
}
