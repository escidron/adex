import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@mui/material'
import React from 'react'

export default function ListDetailsSkeleton() {
    return (

        <div className='w-[350px] h-fit lg:pt-[100px] flex flex-col items-start px-6  lg:ml-[100px]'>
            <p className='text-[32px]'>Listing Details</p>
            <Separator className='mb-2' />
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
            <div className='w-full h-full hidden lg:block'>
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
                <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2' />
            </div>

        </div>
    )
}
