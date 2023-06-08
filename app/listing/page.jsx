'use client'
import Categories from '@/components/categories/Categories'
import StepperComponent from '@/components/stepper/StepperComponent'
import React from 'react'

export default function page() {
    return (
        <div className='mt-[120px] w-full flex flex-col items-center'>
            <h1 className='text-[50px]'>List your Ad</h1>
            <StepperComponent />
            <div className=' flex mt-10 mx-auto w-1/2   flex-col'>
                <h1 className='text-[35px]'>Category</h1>
                <p className='text-[24px]'>Choose what category </p>
            </div>
            <div className=' flex mt-10 mx-auto w-1/2   flex-col'>
                <Categories />
            </div>

        </div>
    )
}

