"use Client"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import PersonalInfo from '@/sections/personalInformations/PersonalInfo';
import Security from '@/sections/security/Security';
import Notifications from '@/sections/notifications/Notifications';
import MyWallet from '@/sections/myWallet/MyWallet';
import MyAdex from '@/sections/myAdex/MyAdex';
import MyCompanies from '@/sections/companies/MyCompanies'
import { Bell, Building2, ScrollText, Shield, UserSquare2, Wallet } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function FolderComponent({ userType }) {
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab')


    return (
        <>
            <div className='flex justify-center bg-[#D9D9D9] h-[40px]'>
                <Link href='my-profile?tab=1' className={`border-l-[1px] border-r-[1px] ${tab == 1 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px]  lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>
                    <p className='hidden text-[13px] md:flex lg:text-[15px]'>Personal Information</p>
                    <div className='md:hidden'>
                        <UserSquare2 size={25} />
                    </div>
                </Link>
                <Link href='my-profile?tab=2' className={`border-l-[1px] border-r-[1px] ${tab == 2 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] sm:px-[30px] lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>
                    <p className='hidden md:flex'>Security</p>
                    <div className='md:hidden'>
                        <Shield size={25} />
                    </div>
                </Link>
                <Link href='my-profile?tab=3' className={`border-l-[1px] border-r-[1px] ${tab == 3 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] sm:px-[30px] lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>
                    <p className='hidden md:flex'>Notifications</p>
                    <div className='md:hidden'>
                        <Bell size={25} />
                    </div>
                </Link>
                {
                    userType == '2' && (

                        <Link href='my-profile?tab=4' className={`border-l-[1px] border-r-[1px] ${tab == 4 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] sm:px-[30px] lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>
                            <p className='hidden md:flex'>My Wallet</p>
                            <div className='md:hidden'>
                                <Wallet size={25} />
                            </div>
                        </Link>
                    )
                }
                <Link href='my-profile?tab=5' className={`border-l-[1px] border-r-[1px] ${tab == 5 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] sm:px-[30px] lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>

                    <p className='hidden md:flex'>My ADEX</p>
                    <div className='md:hidden'>
                        <ScrollText size={25} />
                    </div>
                </Link>
                {
                    userType == '1' && (

                        <Link href='my-profile?tab=6' className={`border-l-[1px] border-r-[1px] ${tab == 6 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] sm:px-[30px] lg:px-[40px] text-[15px] ${inter.className} font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}>
                            <p className='hidden md:flex'>My Companies</p>
                            <div className='md:hidden'>
                                <Building2 size={25} />
                            </div>

                        </Link>
                    )
                }
            </div>
            {tab == 1 && (<PersonalInfo />)}
            {tab == 2 && (<Security />)}
            {tab == 3 && (<Notifications />)}
            {tab == 4 && (<MyWallet />)}
            {tab == 5 && (<MyAdex />)}
            {tab == 6 && (<MyCompanies />)}
        </>
    )
}
