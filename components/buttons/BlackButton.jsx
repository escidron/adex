import React from 'react'

export default function BlackButton({label}) {
  return (
    <button  className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg
         '><p className='style_banner_button_text font-medium'>{label}</p>
    </button>   
  )
}
