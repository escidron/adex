import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const inter = Inter({ subsets: ['latin'] })

export default function CompanyCard({ company }) {
    return (
        <div className={`bg-white w-full h-[150px] mt-4 p-4 shadow-md rounded-lg flex border ${inter.className} cursor-pointer hover:border-black`}>
            <div className="w-1/4">
                <Image
                    src={company.company_logo}
                    alt="Company Logo"
                    width={2000}
                    height={2000}

                    className='w-full h-full rounded-lg object-cover'
                />    </div>
            <div className="w-3/4 ml-4">
                <h3 className="text-lg font-semibold mb-2">{company.company_name}</h3>
                <div className='flex items-start  gap-1'>
                    <LocationOnIcon sx={{ fontSize: '18px', color: 'gray',marginTop:'4px' }} />
                    <p className="text-gray-500">{company.address}</p>
                  </div>
            </div>
        </div>
    )
}
