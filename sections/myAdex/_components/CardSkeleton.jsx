import { Skeleton } from '@mui/material'
import React from 'react'

export default function CardSkeleton() {
    return (
        <div className={`flex Z-[99] gap-1 mt-4 mx-auto flex-col w-[400px] md:w-[700px] md:flex-row md:min-w-[700px]  md:max-h-[300px] p-2 mb-8 border-[1px] cursor-pointer rounded-[24px] border-bg-gray-200  `}>
            <div className='h-[210px] w-full md:w-[210px] min-h-[210px] min-w-[210px] rounded-lg relative'>
                <Skeleton variant="rounded" width={'100%'} height={'100%'} />
            </div>
            <div className={`relative md:ml-8 flex flex-col w-full`}>
                <div>
                    <div className='flex justify-between items-center'>
                        <Skeleton variant="text" sx={{ fontSize: '25px' }} width={'60%'} />
                        <Skeleton variant="text" sx={{ fontSize: '20px' }} width={'30%'} />
                    </div>
                    <div className="flex items-center justify-start">
                        <Skeleton variant="text" sx={{ fontSize: '18px' }} width={'80px'} />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <Skeleton variant="rounded" width={'100%'} height={'80px'} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <div className='text-[14px] mt-2 w-full'>
                            <Skeleton variant="text" sx={{ fontSize: '25px' }} width={'100px'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
