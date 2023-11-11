import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@mui/material'
import React from 'react'

export default function ListDetailsSkeleton() {
    return (

        <div className='w-[350px] pt-[100px] flex flex-col items-start px-6 h-full ml-[100px]'>
            <p className='text-[32px]'>Listing Details</p>
            <Separator className='mb-2' />
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>
            <Skeleton variant="rounded" width={'100%'} height={'40px'} className='mt-2'/>

        </div>
    )
}
