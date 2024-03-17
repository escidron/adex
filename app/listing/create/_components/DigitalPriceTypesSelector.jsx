
export default function DigitalPriceTypeSelector({ currentPriceType, handleCurrentPriceType }) {

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
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Per Mention</p>
                    </div>
                    <div
                        type="text"
                        id="1"
                        onClick={() => handleCurrentPriceType('1')}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentPriceType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Per Inclusion</p>
                    </div>

                    <div
                        type="text"
                        id="2"
                        onClick={() => handleCurrentPriceType('2')}
                        className={` py-2  px-2 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentPriceType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                    >
                        <p className={`flex items-center h-[20px] pr-1 text-[12px] md:text-[14px] lg:text-[16px]`}>Per Post</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
