
export default function DigitalDurationType({ currentPriceType, handleCurrentPriceType }) {

    console.log('listing type',currentPriceType)
    return (
        <div className=" mt-2 w-full flex gap-4">
            <div className={`w-full`}>
                <div className="flex gap-2">
                    <div
                        type="text"
                        id="0"
                        onClick={() => handleCurrentPriceType('0')}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentPriceType == '0' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Monthly Payments</p>
                    </div>
                    <div
                        type="text"
                        id="1"
                        onClick={() => handleCurrentPriceType('1')}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentPriceType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>One-Time Payments</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
