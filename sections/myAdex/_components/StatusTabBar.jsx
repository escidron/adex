import React from 'react'

export default function StatusTabBar({ status, currentStatus, handleCurrentStatus }) {
    return (
        <div className=" mt-2 w-full flex gap-4">
            <div className={`w-full`}>
                <div className="flex gap-2">
                    <div
                        type="text"
                        id=""
                        name="all"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>All</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.all}</p>
                    </div>
                    <div
                        type="text"
                        id="0"
                        name="all"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '0' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Draft</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.draft}</p>
                    </div>
                    <div
                        type="text"
                        id="1"
                        name="available"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Available</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.available}</p>
                    </div>

                    <div
                        type="text"
                        id="2"
                        name="running"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Running</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.running}</p>
                    </div>

                    <div
                        type="text"
                        id="3"
                        name="finished"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Finished</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.finished}</p>
                    </div>

                    <div
                        type="text"
                        id="4"
                        name="available"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Pending</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.pending}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
