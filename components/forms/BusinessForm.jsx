"use Client"
import AddCompanyModal from '@/sections/companies/AddCompanyModal';
import Image from 'next/image';

import { useContext, useEffect, useState } from 'react'
import { ImageIcon, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

import GetCompanies from '@/actions/GetCompanies';

export default function BusinessForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [companies, setCompanies] = useState([]);
    const [addCompany, setAddCompany] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSelectedCompany = (companyId) => {
        setListingProperties({ ...listingProperties, select_business: companyId })
    }

    useEffect(() => {
        async function GetData() {
            const companies = await GetCompanies()
            setCompanies(companies)
        }
        GetData();
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
                        <div className='w-full max-w-[800px] h-[200px] mt-4 flex flex-wrap gap-8 justify-center'>
                            {
                                companies.map((company) => (
                                    <div key={company.id} className={` hover:cursor-pointer p-2 border  rounded-lg ${listingProperties.select_business == company.id ? 'border-black' : 'border-transparent'}`} onClick={() => handleSelectedCompany(company.id)}>
                                        {
                                            company.company_logo ? (
                                                <div className='border rounded-lg h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] max-h-[200px] max-w-[200px]'>
                                                    <Image
                                                        src={company.company_logo}
                                                        alt="Company Logo"
                                                        width={2000}
                                                        height={2000}

                                                        className='w-full h-full rounded-lg object-cover'
                                                    />
                                                </div>
                                            ) : (
                                                <div className='w-full h-[150px]  sm:h-[200px] sm:w-[200px] max-h-[200px] aspect-square bg-slate-200 flex justify-center items-center rounded-lg'>
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

                            <div onClick={() => setAddCompany(true)} className='mt-2 cursor-pointer h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] max-h-[200px] aspect-square bg-slate-200 flex justify-center items-center rounded-lg'>
                                <Plus size={30} />
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}
