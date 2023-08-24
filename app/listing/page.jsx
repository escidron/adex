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
                "http://localhost:5000/api/users/user-profile",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                console.log('res', res)
                setUserData(res)
            }
        }
        GetUserProfile();
    }, []);

    useEffect(() => {
        async function GetCompanies() {
            const response = await fetch(
                "http://localhost:5000/api/users/get-companies",
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
    }, []);

    return (
        <>
            <div className={`mt-[120px] w-full flex flex-col items-center ${inter.className} `}>
                <h1 className='text-[42px]'>List your Ad</h1>
                {
                    userData.user_type == '1' && !selectedCompany  ?  (
                        <>
                            <h1 className='text-lg'>Choose a Company to Create the Listing For</h1>
                            <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-[50%]'>
                                {
                                    companies.map((company) => (
                                        <div key={company.id} className='hover:cursor-pointer' onClick={()=>setSelectedCompany(company.id)}>
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
                            <div className=' flex mt-10 mx-auto w-[90%] sm:w-1/2  justify-between items-center'>
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
                            <div className=' flex mt-10 mx-auto w-[90%] sm:w-[55%] flex-col'>
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

