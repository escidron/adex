import React from 'react'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded';// import path from '../../public/ad_images/6456fd7bc5413.png'
import Link from 'next/link';
export default function MarketPlaceCard({ad}) {
  const path = '/ad_images/'
  //duration type
  // '1'=>'Daily',
  // '2'=>'Weekly',
  // '3'=>'Monthly',
  // '4'=>'Unit',
  // '5'=>'Year'
  return (
    <div className='styled_map_cards'>
      <div className="style_image_box w-full h-1/2 rounded-[5px] bg-slate-600">
        <Image
            src={path+ad.image}
            alt="Adex Logo"
            width={0}
            height={0}
            sizes="100%"
            className='w-full h-full rounded-[5px] object-cover'
        />
        <p><span className={`text-white absolute top-[20px] right-[20px] ${ad.status == "1"?'bg-green-600':"bg-red-600"} py-[1px] px-[4px] text-[12px] font-[700] rounded-md`}>{ad.status == "1"?'Available':'Running'}</span></p>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="style_title_row w-full flex items-center justify-between">
            <p className="style_card_title font-[800]">{ad.title}</p>
            <div className="style_rating">
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
            </div>
          </div>

          <div className='style_card_description_box mt-2'>
            <div className="style_card_description text-[14px] h-[20px] font-[400] text-[#838383]">
              <p>
              {ad.description.length>125?ad.description.replace(/^(.{125}[^\s]*).*/, "$1") + "..."
              :ad.description}
              {ad.description.length>125?<Link href='#' className='text-black'><b>read more</b></Link>:''}
              </p>
            </div>
          </div>

          <div className='style_price_row flex w-[90%] justify-between items-center absolute bottom-[25px]'>
            <p className='font-[400px] text-[#838383] text-[14px]'><b className="style_price_text text-[18px] text-black">${ad.price} / </b>{
              ad.ad_duration_type=='1'?'Daily':ad.ad_duration_type=='2'?'Weekly':ad.ad_duration_type=='3'?'Monthly':ad.ad_duration_type=='4'?'Unit':'Year'
            }</p>
          <button className='z-10 bg-[#FCD33B] py-[8px] px-[20px] mr-2 rounded-md hover:bg-black hover:text-[#FCD33B] text-md'>
            <p className='style_banner_button_text font-semibold text-18px]'>View Details</p>
          </button>
          </div>

        </div>
      </div>
    </div>
  )
}
