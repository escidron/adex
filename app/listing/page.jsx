'use client'
import { useState,useEffect } from 'react'
import Image from 'next/image'
import Categories from '@/components/categories/Categories'
import StepperComponent from '@/components/stepper/StepperComponent'
import React from 'react'
import { Inter } from 'next/font/google'
import BlackButton from '@/components/buttons/BlackButton'
import ListingForm from '@/components/listingForm/ListingForm'
import Footer from '@/components/footer/Footer'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrums'
import AddCompanyModal from '@/sections/companies/AddCompanyModal'

const inter = Inter({ subsets: ['latin'] })

export default function Listing() {
    const [selectedStep, setSelectedStep] = useState(1);
    const [categoryId, setCategoryId] = useState(1);
    const [typeId, setTypeId] = useState(1);
    const [isPeriodic, setIsPeriodic] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [path, setPath] = useState([]);
    const [userData, setUserData] = useState({});
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [addCompany, setAddCompany] = useState(false);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {

        if(selectedStep === 2){

            categoryList.map((category)=>{
                if(category.id === categoryId){
                    setPath([{name:category.name,step:selectedStep-1}])
                }
            })
        }else if (selectedStep === 3){
            categoryList.map((category)=>{
                if(category.id === typeId){
                    setPath([...path,{name:category.name,step:selectedStep-1}])
                }
            })
        }else if (selectedStep === 1){
            setPath([])
        }

    }, [categoryId,typeId,selectedStep]);

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                "https://test.adexconnect.com/api/users/user-profile",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setUserData(res)
            }
        }
        GetUserProfile();
    }, []);

    useEffect(() => {
        async function GetCompanies() {
            const response = await fetch(
                "https://test.adexconnect.com/api/users/get-companies",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setCompanies(res)
            }
        }
        GetCompanies();
    }, [refetch]);

    return (
        <>
            <div className={`mt-[120px] w-full flex flex-col items-center ${inter.className} `}>
                <h1 className='text-[42px]'>List your Ad</h1>
                {
                    userData.user_type == '1' && !selectedCompany ? (
                        <>
                            <h1 className='text-lg'>Choose a Company to Create the Listing For</h1>
                            {
                                companies.length === 0 ? (
                                    <>

                                    {
                                        addCompany ? (
                                            <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} setRefetch={(refresh) => setRefetch(refresh)} />
                                        ) : (
                                            <div className={`flex justify-center items-center mt-8 ${inter.className} `}>
                                                <div className="bg-white p-8 rounded-lg shadow-md border">
                                                    <h2 className="text-2xl font-semibold mb-4">My Companies</h2>
                                                    <p className="text-gray-500">You haven&apos;t registered any companies yet.</p>
                                                    <button onClick={() => setAddCompany(true)} className='style_banner_button w-full  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                                         lg:py-[10px] lg:px-[30px] lg:mt-10 '>
                                                        <p className='style_banner_button_text font-medium'>Register company</p>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                ) : (

                                    <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-[50%]'>
                                        {
                                            companies.map((company) => (
                                                <div key={company.id} className='hover:cursor-pointer' onClick={() => setSelectedCompany(company.id)}>
                                                    <div className="w-full aspect-square">
                                                        <Image
                                                            src={company.company_logo}
                                                            alt="Company Logo"
                                                            width={2000}
                                                            height={2000}
                                                            className='w-full h-full rounded-lg object-cover hover:scale-[1.1]'
                                                        />
                                                    </div>
                                                    <h1 className='mt-2 font-bold'>
                                                        {company.company_name}
                                                    </h1>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <StepperComponent selectedStep={selectedStep} />
                            {
                                selectedStep > 1 && (
                                    <div className='mt-8'>
                                        <BreadCrumbs
                                            path={path}
                                            setPath={(path) => setPath(path)}
                                            selectedStep={selectedStep}
                                            setSelectedStep={(step) => setSelectedStep(step)} />
                                    </div>
                                )
                            }
                            <div className=' flex mt-10 mx-auto w-[90%] xl:w-[75%]  justify-between items-center'>
                                {selectedStep === 1 ? (
                                    <div className='flex flex-col'>
                                        <h1 className='text-[30px]'>Category</h1>
                                        <p className='text-[18px] text-gray-500'>Choose which category best suits your needs or interests.</p>
                                    </div>
                                ) : selectedStep === 2 ? (

                                    <div className='flex flex-col'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1 className='text-[30px]'>Type</h1>
                                            {
                                                selectedStep > 1 ? (

                                                    <div className='' onClick={() => {
                                                        setSelectedStep(prev => (prev - 1))
                                                    }}>
                                                        {
                                                            selectedStep <= 3 ? (

                                                                <BlackButton label='Back' />
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    ''
                                                )
                                            }
                                        </div>
                                        <p className='text-[18px] text-gray-500'>Choose which type of asset will be most effective for your target audience or marketing goals. </p>
                                    </div>
                                ) : selectedStep === 3 ? (
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1 className='text-[30px]'>Create ad</h1>
                                            {
                                                selectedStep > 1 ? (

                                                    <div className='' onClick={() => {
                                                        setSelectedStep(prev => (prev - 1))
                                                    }}>
                                                        {
                                                            selectedStep <= 3 ? (

                                                                <BlackButton label='Back' />
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    ''
                                                )
                                            }
                                        </div>
                                        <p className='text-[18px] text-gray-500'>Fill in the relevant information for the advertising </p>
                                    </div>
                                ) : (
                                    ''
                                )
                                }

                            </div>
                            <div className=' flex mt-10 mx-auto w-[90%] xl:w-[75%] flex-col'>
                                {selectedStep < 3 ? (
                                    <Categories
                                        selectedStep={selectedStep}
                                        setSelectedStep={(step) => setSelectedStep(step)}
                                        categoryId={categoryId}
                                        setCategoryId={(id) => setCategoryId(id)}
                                        typeId={typeId}
                                        setTypeId={(id) => setTypeId(id)}
                                        setIsPeriodic={(res) => setIsPeriodic(res)}
                                        setCategoryList={(categories) => setCategoryList(categories)}
                                    />
                                ) : (

                                    <ListingForm
                                        categoryId={categoryId}
                                        typeId={typeId}
                                        isPeriodic={isPeriodic}
                                        setSelectedStep={(step) => setSelectedStep(step)}
                                        selectedCompany={selectedCompany}
                                    />
                                )
                                }
                            </div>
                        </>

                    )
                }
            </div>
            <Footer />
        </>
    )
}

