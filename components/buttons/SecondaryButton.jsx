import React from 'react'

export default function SecondaryButton({ dark, label,onClick }) {
    return (
        <div>
            {dark ? (

                <button onClick={onClick?onClick:()=>{}} className='flex items-center z-10 h-10 border-black border-2 text-black py-[4px] px-[15px] rounded-md    hover:bg-[#FCD33B]  hover:text-black text-md'>
                    <p className='style_banner_button_text font-semibold text-[16px]'>{label}</p>
                </button>
            ) : (

                <button onClick={onClick?onClick:()=>{}} className='flex items-center z-10  h-10 border-[#FCD33B] border-2 text-[#FCD33B] py-[4px] px-[15px] rounded-md    hover:bg-[#FCD33B]  hover:text-black text-md'>
                    <p className='style_banner_button_text font-semibold text-[16px]'>{label}</p>
                </button>
            )}
        </div>
    )
}

