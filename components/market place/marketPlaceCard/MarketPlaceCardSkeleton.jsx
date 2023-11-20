import { Skeleton } from '@mui/material'
import React from 'react'

export default function MarketPlaceCardSkeleton() {
  return (
    <div className={` relative styled_map_cards w-[360px] md:w-[90%] lg:w-[100%] xl:w-[360px] 2xl:w-full   `}>
      <div className="style_image_box w-full rounded-[24px] h-[200px]">
        <div className='w-full rounde-[16px] h-[200px]'>

          <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ borderRadius: '16px' }} />
        </div>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="w-full flex items-center justify-between">
            <Skeleton variant="text" width={'80%'} sx={{ fontSize: '25px' }} />

          </div>
          <div className='flex gap-1'>
            <Skeleton variant="text" width={'90%'} sx={{ fontSize: '20px' }} />
          </div>
          <div className='flex flex-col gap-1 w-full mt-2 ml-3'>
            <div className='flex gap-2 items-center w-full'>
              <Skeleton variant="circular" width={10} height={10} />
              <Skeleton variant="text" width={'40%'} sx={{ fontSize: '15px' }} />
            </div>
            <div className='flex gap-2 items-center w-full'>
              <Skeleton variant="circular" width={10} height={10} />
              <Skeleton variant="text" width={'40%'} sx={{ fontSize: '15px' }} />
            </div>
          </div>

          <div className='flex w-[90%] justify-between items-center absolute bottom-[25px]'>
            <Skeleton variant="text" width={'80px'} sx={{ fontSize: '25px' }} />

            <div className=" min-w-[70px]">
              <Skeleton variant="text" width={'100'} sx={{ fontSize: '25px' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
