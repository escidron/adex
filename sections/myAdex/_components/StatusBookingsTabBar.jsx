import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function StatusBookingsTabBar({ status, currentStatus, handleCurrentStatus }) {
    return (
        <div>
            <div className='md:hidden w-full flex justify-center gap-2 md:px-8 ' >
                <Select defaultValue={'all'} onValueChange={(value) => handleCurrentStatus('', value)} className='overflow-y-scroll'>
                    <SelectTrigger className='shadow-md w-[200px]'>
                        <SelectValue className='text-[12px]' />
                    </SelectTrigger>
                    <SelectContent ref={(ref) => {
                        //prevent bubbling
                        if (!ref) return;
                        ref.ontouchstart = (e) => {
                            e.preventDefault();
                        };
                    }}>
                        <SelectGroup>
                            <SelectItem value='all'>Show All</SelectItem>
                            <SelectItem value='2'>Booked</SelectItem>
                            <SelectItem value='3'>Finished</SelectItem>
                            <SelectItem value='4'>Pending</SelectItem>
                        </SelectGroup>
                    </SelectContent >
                </Select>
            </div>

            <div className="hidden md:flex mt-2 w-full gap-4 flex-wrap">
                <div className="flex gap-2 pb-2 overflow-x-auto ">
                    <div
                        type="text"
                        id="all"
                        name="all"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == 'all' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>All</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.all}</p>
                    </div>

                    <div
                        type="text"
                        id="2"
                        name="booked"
                        onClick={(e) => handleCurrentStatus(e)}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Booked</p>
                        <p className='text-[12px] md:text-[14px] lg:text-[16px]'>|</p>
                        <p className=' pl-1 text-[12px] md:text-[14px] lg:text-[16px]'>{status.booked}</p>
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
                        name="pending"
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
