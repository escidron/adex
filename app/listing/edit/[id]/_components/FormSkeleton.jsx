import { Skeleton } from '@mui/material'

export default function FormSkeleton() {
    return (
        <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex items-start justify-center `}>
            <div className='w-full max-w-[800px] overflow-y-auto invisible_scroll_bar'>
                <div className='hidden mt-[80px] w-full lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 '>
                    <Skeleton variant="rounded" width={'200px'} height={'200px'} className='mt-2' />
                    <Skeleton variant="rounded" width={'200px'} height={'200px'} className='mt-2' />
                    <Skeleton variant="rounded" width={'200px'} height={'200px'} className='mt-2' />
                </div>
                <div className=' lg:hidden w-full flex flex-col items-center '>
                    <Skeleton variant="rounded" width={'90%'} height={'130px'} className='mt-2' />
                    <Skeleton variant="rounded" width={'90%'} height={'130px'} className='mt-2' />
                    <Skeleton variant="rounded" width={'90%'} height={'130px'} className='mt-2' />
                </div>
            </div>
        </div>
    )
}
