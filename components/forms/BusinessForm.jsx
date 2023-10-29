"use Client"
import AddCompanyModal from '@/sections/companies/AddCompanyModal';

import { useContext, useEffect, useState } from 'react'
import { ListingContext } from '@/app/listing/layout';
import { Image } from '@mui/icons-material';
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

export default function BusinessForm() {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [addCompany, setAddCompany] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleTitle = (title) => {
        setListingProperties({ ...listingProperties, title: title })
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
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                {
                    companies.length === 0 ? (
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
                                                <Dialog className='w-full'>
                                                    <DialogTrigger className='w-full'>
                                                        <Button className='w-full'>
                                                            <div className='mr-2'>
                                                                <Plus size={20} />
                                                            </div>
                                                            Add Business
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">

                                                        <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} setRefetch={(refresh) => setRefetch(refresh)} />
                                                        <Select className="w-[70%] text-black" onValueChange={(value) => {}}>
                                                            <SelectTrigger className='shadow-md'>
                                                                <SelectValue className='text-[12px]' placeholder="Select ..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {
                                                                        industries.map((item) => (
                                                                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </DialogContent>
                                                </Dialog>

                                            </CardFooter>
                                        </Card>
                                    </div>
                                )
                            }
                        </>
                    ) : (

                        <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-[50%]'>
                            {
                                companies.map((company) => (
                                    <div key={company.id} className='hover:cursor-pointer' onClick={() => setSelectedCompany(company.id)}>
                                        {
                                            company.company_logo ? (

                                                <Image
                                                    src={company.company_logo}
                                                    alt="Company Logo"
                                                    width={2000}
                                                    height={2000}

                                                    className='w-full h-full rounded-lg object-cover'
                                                />
                                            ) : (
                                                <div className='w-full h-full bg-slate-200 flex justify-center items-center rounded-lg'>
                                                    <ImageIcon />
                                                </div>
                                            )
                                        }
                                        <h1 className='mt-2 font-bold'>
                                            {company.company_name}
                                        </h1>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div >
        </div >
    )
}
