"use Client"
import AddCompanyModal from '@/sections/companies/AddCompanyModal';

import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { ImageIcon, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { industries } from '@/utils/industries';
import CompanyCard from '../infoCard/CompanyCard';

export default function BusinessForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [addCompany, setAddCompany] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSelectedCompany = (companyId) => {
        setListingProperties({ ...listingProperties, select_business: companyId })
    }

    useEffect(() => {
        async function GetCompanies() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-companies`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                console.log(res)
                console.log('getting companies')

                setCompanies(res)
            }
        }
        GetCompanies();
    }, [refetch]);

    useEffect(() => {

        setIsLoaded(true)

    }, []);

    if (!isLoaded) {
        return null
    }
    return (
        <div className='w-full flex flex-col items-center overflow-y-auto invisible_scroll_bar'>
            <div className='w-full flex justify-center'>
                {
                    companies.length === 0 || addCompany ? (
                        <>
                            {
                                addCompany ? (
                                    <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} setRefetch={(refresh) => setRefetch(refresh)} />
                                ) : (
                                    <div className={`flex justify-center items-center mt-8`}>

                                        <Card className='mt-4 max-w-[400px]'>
                                            <CardHeader>
                                                <CardTitle>My Business</CardTitle>
                                                <CardDescription>You haven&apos;t registered any business yet. </CardDescription>
                                            </CardHeader>

                                            <CardFooter>
                                                <Button className='w-full' onClick={() => {
                                                    setAddCompany(true)
                                                    setRefetch((prev) => !prev)
                                                }}>
                                                    <div className='mr-2'>
                                                        <Plus size={20} />
                                                    </div>
                                                    Add Business
                                                </Button>

                                            </CardFooter>
                                        </Card>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div className='w-full max-w-[800px] h-[200px] mt-4 flex flex-wrap gap-8'>
                            {
                                companies.map((company) => (
                                    <div key={company.id} className={` hover:cursor-pointer p-2 border  rounded-lg ${listingProperties.select_business == company.id ? 'border-black' : 'border-transparent'}`} onClick={() => handleSelectedCompany(company.id)}>
                                        {
                                            company.company_logo ? (
                                                <div className='border rounded-lg h-[200px] max-h-[200px] max-w-[200px]'>

                                                    <Image
                                                        src={company.company_logo}
                                                        alt="Company Logo"
                                                        width={2000}
                                                        height={2000}

                                                        className='w-full h-full rounded-lg object-cover'
                                                    />
                                                </div>
                                            ) : (
                                                <div className='w-full h-[200px] max-h-[200px] aspect-square bg-slate-200 flex justify-center items-center rounded-lg'>
                                                    <ImageIcon />
                                                </div>
                                            )
                                        }
                                        <h1 className='mt-2 font-bold text-center' >
                                            {company.company_name}
                                        </h1>
                                    </div>

                                ))
                            }
                            <div onClick={()=>setAddCompany(true)} className='cursor-pointer w-[200px] h-[200px] max-h-[200px] aspect-square bg-slate-200 flex justify-center items-center rounded-lg'>
                                <Plus size={30}/>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}
