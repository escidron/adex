'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Edit, ImageIcon, MapPin, Trash } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const itens = [
    { id: 1, name: 'Gas station' },
    { id: 2, name: 'Restaurant' },
    { id: 3, name: 'Hotel' },
    { id: 4, name: 'Store / Retail' },
    { id: 5, name: 'Gym / Fitness' },
    { id: 6, name: 'Entertainment' }
];

export default function CompanyCard({ company, removeCompany, handleEdit }) {
    const [industryName, setIndustryName] = useState('');
    const router = useRouter()
    useEffect(() => {
        itens.map((item) => {
            if (item.id == company.industry) {
                setIndustryName(item.name)
            }
        })
    }, [company]);

    return (
        <div onClick={() => router.push(`/my-company?id=${company.id}`)} className={`bg-white w-full h-[150px] mt-4 p-4 shadow-md rounded-lg flex border  cursor-pointer hover:border-black`}>
            <div className="card_element w-1/4 rounded-lg">
                {
                    company.company_logo ? (

                        <Image
                            src={company.company_logo}
                            alt="Company Logo"
                            width={2000}
                            height={2000}

                            className='w-full h-full aspect-square rounded-lg object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-slate-200 flex justify-center items-center rounded-lg'>
                            <ImageIcon />
                        </div>
                    )
                }
            </div>
            <div className='w-3/4 relative'>

                <div className="w-full ml-4">
                    <h3 className="text-lg font-semibold">{company.company_name}</h3>
                    <p className='text-[15px] mb-2'>{industryName}</p>
                    <div className='flex items-start  gap-1'>
                        <MapPin size={14} color='gray' className='min-w-[14px] mt-[2px]' />
                        <p className="text-gray-500 text-[12px] line-clamp-2">{company.address ? company.address : 'Home-base business'}</p>
                    </div>
                </div>
                <div className='w-full flex gap-1 justify-end items-center absolute bottom-[-10px]' onClick={(e) => { e.stopPropagation() }} >
                    <div onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(company)
                    }} className='hover:bg-slate-200 hover:text-black p-1 rounded-md cursor-pointer'>
                        <Edit size={20}/>
                    </div>
                    <AlertDialog >
                        <AlertDialogTrigger className='hover:bg-slate-200 p-1 rounded-md cursor-pointer'>
                            <Trash size={20}/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove this company and the listings created by .
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter >
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={removeCompany}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    )
}
