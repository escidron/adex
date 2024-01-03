import { Skeleton } from '@mui/material'
import React from 'react'

export default function SellerCardSkeleton() {
    return (
        <div className="flex mx-auto gap-6 items-center justify-center border shadow-md py-8 px-4 rounded-lg w-[70%]">
            <div className='w-[150px] h-[150px] min-w-[150px] min-h-[150px] cursor-pointer flex flex-col'>
                <Skeleton variant="circular" width={140} height={140} />
                <div className='mt-2 flex justify-center'>
                    <Skeleton variant="text" width={'100px'} sx={{ fontSize: '18px' }} />
                </div>

            </div>
            <div className='flex flex-col justify-start h-auto w-full gap-2' >
                <Skeleton variant="text" width={'100%'} sx={{ fontSize: '15px' }} />
                <Skeleton variant="text" width={'100%'} sx={{ fontSize: '15px' }} />
                <Skeleton variant="text" width={'100%'} sx={{ fontSize: '15px' }} />
                <Skeleton variant="text" width={'100%'} sx={{ fontSize: '15px' }} />
            </div>
        </div>
    )
}
