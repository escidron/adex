import Image from 'next/image'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';

import LocationOnIcon from '@mui/icons-material/LocationOn';

const inter = Inter({ subsets: ['latin'] })
const itens = [
    { id: 1, name: 'Gas station' },
    { id: 2, name: 'Restaurant' },
    { id: 3, name: 'Hotel' },
    { id: 4, name: 'Store / Retail' },
    { id: 5, name: 'Gym / Fitness' },
    { id: 6, name: 'Entertainment' }
];

export default function CompanyCard({ company }) {
    const [industryName, setIndustryName] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        
        itens.map((item)=>{
            if(item.id == company.industry){
                setIndustryName(item.name)
            }
        })
    }, [company]);
    return (
        <Link href={`/my-company?id=${company.id}`} className={`bg-white w-full h-[150px] mt-4 p-4 shadow-md rounded-lg flex border ${inter.className} cursor-pointer hover:border-black`}>
            <div className="w-1/4">
                <Image
                    src={company.company_logo}
                    alt="Company Logo"
                    width={2000}
                    height={2000}

                    className='w-full h-full rounded-lg object-cover'
                />
            </div>
            <div className="w-3/4 ml-4">
                <h3 className="text-lg font-semibold">{company.company_name}</h3>
                <p className='text-[14px] mb-2'>{industryName}</p>
                <div className='flex items-start  gap-1'>
                    <LocationOnIcon sx={{ fontSize: '18px', color: 'gray', marginTop: '4px' }} />
                    <p className="text-gray-500">{company.address?company.address:'Home-base business'}</p>
                </div>
            </div>
        </Link>
    )
}
