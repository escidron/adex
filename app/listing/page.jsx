'use client'
import { useState } from 'react'
import Categories from '@/components/categories/Categories'
import StepperComponent from '@/components/stepper/StepperComponent'
import React from 'react'
import { Inter } from 'next/font/google'
import BlackButton from '@/components/buttons/BlackButton'
import ListingForm from '@/components/listingForm/ListingForm'
import Footer from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Listing() {
    const [selectedStep, setSelectedStep] = useState(1);
    const [categoryId, setCategoryId] = useState(1);
    const [typeId, setTypeId] = useState(1);
    const [isPeriodic, setIsPeriodic] = useState('');
    return (
        <>
            <div className={`mt-[120px] w-full flex flex-col items-center ${inter.className} `}>
                <h1 className='text-[42px]'>List your Ad</h1>
                <StepperComponent selectedStep={selectedStep} />
                <div className=' flex mt-10 mx-auto w-[90%] sm:w-1/2  justify-between items-center'>
                    {selectedStep === 1 ? (
                        <div className='flex flex-col'>
                            <h1 className='text-[30px]'>Category</h1>
                            <p className='text-[18px] text-gray-500'>Choose which category best suits your needs or interests.</p>
                        </div>
                    ) : selectedStep === 2 ? (

                        <div className='flex flex-col'>
                            <h1 className='text-[30px]'>Type</h1>
                            <p className='text-[18px] text-gray-500'>Choose which type of asset will be most effective for your target audience or marketing goals. </p>
                        </div>
                    ) : selectedStep === 3 ? (
                        <div className='flex flex-col'>
                            <h1 className='text-[30px]'>Create ad</h1>
                            <p className='text-[18px] text-gray-500'>Fill in the relevant information for the advertising </p>
                        </div>
                    ) : (
                        ''
                    )
                    }
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
                <div className=' flex mt-10 mx-auto w-[90%] sm:w-1/2 flex-col'>
                    {selectedStep < 3 ? (
                        <Categories
                            selectedStep={selectedStep}
                            setSelectedStep={(step) => setSelectedStep(step)}
                            categoryId={categoryId}
                            setCategoryId={(id) => setCategoryId(id)}
                            typeId={typeId}
                            setTypeId={(id) => setTypeId(id)}
                            setIsPeriodic={(res) => setIsPeriodic(res)}
                        />
                    ) : (

                        <ListingForm categoryId={categoryId} typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)} />
                    )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

