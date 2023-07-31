import React from 'react'
import Image from 'next/image'

export default function CategoryCard({ item,setCategoryId,selectedStep,setSelectedStep,setTypeId,setIsPeriodic }) {
    return (
        <div 
            onClick={()=>{
                if(item.id <= 3){
                    setCategoryId(item.id)
                }else{
                    setTypeId(item.id)
                    setIsPeriodic(item.is_periodic)
                }
                setSelectedStep(selectedStep+1)
            }} 
            className='flex flex-col items-center justify-center w-full sm:w-[195px] max-h-[150px] bg-black px-4 py-[24px] rounded-lg hover:scale-[1.1] cursor-pointer'>
            <div className='h-[74px] '>
                <Image
                    src={'/'+item.image}
                    alt={'/'+item.image}
                    width={70}
                    height={70}
                    priority
                />
            </div>
            <h1 className='text-[#FCD33B] flex justify-center items-center text-center mt-1'>{item.name}</h1>
        </div>
    )
}
