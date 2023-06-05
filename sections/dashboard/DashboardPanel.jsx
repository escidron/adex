import React from 'react'

export default function DashboardPanel() {
  return (
    <div className='p-4 bg-[#D9D9D9] flex min-h-[600px]'>
        <div className='w-[70%] bg-red-400 px-2 h-auto '>
            <div className='w-full  grid grid-cols-4 gap-2'>
                <div className='w-full h-[105px] bg-white rounded-lg'>a</div>
                <div className='w-full h-[105px] bg-white rounded-lg'>b</div>
                <div className='w-full h-[105px] bg-white rounded-lg'>c</div>
                <div className='w-full h-[105px] bg-white rounded-lg'>d</div>
            </div>
            <div className='w-full h-[70%] mt-2 grid grid-cols-4  gap-2 '>
                <div className='col-span-3 bg-green-500 rounded-lg'>grafico</div>
                <div className=' bg-pink-400  rounded-lg'>
                    longest
                </div>
            </div>
        </div>
        <div className='w-[30%] bg-black'>df</div>
    </div>
  )
}
