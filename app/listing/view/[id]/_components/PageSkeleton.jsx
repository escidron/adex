'use client'

import { Skeleton } from '@mui/material'

export default function PageSkeleton() {
    return (
        <div className={`w-full  px-6 h-full max-w-[1000px]`}>
            <div className='w-full mt-4 flex gap-1 h-[200px] md:h-[300px]  lg:h-[400px]'>
                <div className='w-full md:w-[70%] rounded-lg'>
                    <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                </div>
                <div className='hidden md:flex w-[30%]  flex-col  gap-1'>

                    <div className='w-full h-1/2'>
                        <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                    </div>
                    <div className='w-full h-1/2'>
                        <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
            <div className='mt-2 flex w-full md:w-[60%] justify-between'>
                <Skeleton variant="rounded" width={'60%'} height={20} />
                <Skeleton variant="rounded" width={'20%'} height={20} />
            </div>
            <div className='mt-2'>
                <Skeleton variant="rounded" width={'80px'} height={20} />
            </div>
            <div className='mt-2'>
                <Skeleton variant="rounded" width={'60%'} height={20} />
            </div>
            <div className='mt-8 flex flex-col gap-3'>
                <Skeleton variant="rounded" width={'40%'} height={10} />
                <Skeleton variant="rounded" width={'20%'} height={10} />
                <Skeleton variant="rounded" width={'35%'} height={10} />
                <Skeleton variant="rounded" width={'55%'} height={10} />
                <Skeleton variant="rounded" width={'20%'} height={10} />
                <Skeleton variant="rounded" width={'35%'} height={10} />
            </div>
        </div>
    )
}
