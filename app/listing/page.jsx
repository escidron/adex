'use client'
import { Skeleton } from '@mui/material'

export default function Listing() {


    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className={`w-[80%] max-w-[800px] mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4`}>
                <Skeleton variant="rounded" width={'100%'} height={250} />
                <Skeleton variant="rounded" width={'100%'} height={250} />
                <Skeleton variant="rounded" width={'100%'} height={250} />
            </div>
        </div>
    )
}

