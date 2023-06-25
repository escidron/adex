'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import StarRoundedIcon from '@mui/icons-material/StarRounded';// import path from '../../public/ad_images/6456fd7bc5413.png'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import CloseIcon from '@mui/icons-material/Close';

const inter = Inter({ subsets: ['latin'] })


export default function MarketPlaceCard({ad}) {
  const [src, setSrc] = useState('/ad_images/'+ad.image);
  const [showModal,setShowModal] = useState(false)
  const path = '/ad_images/'
  //duration type
  // '1'=>'Daily',
  // '2'=>'Weekly',
  // '3'=>'Monthly',
  // '4'=>'Unit',
  // '5'=>'Year'  
  return (
    <div className={` relative styled_map_cards w-[360px] md:w-[90%] lg:w-[100%] xl:w-[360px] 2xl:w-full  mx-auto ${inter.className}`}>
      <div className="style_image_box w-full h-1/2 rounded-[5px] bg-slate-600">
        <Image
            src={src}
            alt="Adex Logo"
            width={0}
            height={0}
            sizes="100%"
            className='w-full h-full rounded-[5px] object-cover'
            onError={() => {
              console.log('errorrr')
              setSrc('/no-image.png')}}
        />
        <p><span className={`text-white absolute top-[20px] right-[20px] ${ad.status == "1"?'bg-green-600':"bg-red-600"} py-[1px] px-[4px] text-[12px] font-[400] rounded-md`}>{ad.status == "1"?'Available':'Running'}</span></p>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="style_title_row w-full flex items-center justify-between">
            <p className="style_card_title ">{ad.title}</p>
            <div className="style_rating">
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'#FCD33B'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
              <StarRoundedIcon fontSize='small' sx={{color:'gray'}}/>
            </div>
          </div>

          <div className='style_card_description_box mt-2 '>
            <div className="style_card_description text-[14px] h-[20px] font-[400] text-[#838383]">
              <p>
              {ad.description.length>125?ad.description.replace(/^(.{125}[^\s]*).*/, "$1") + "..."
              :ad.description}
              {ad.description.length>125?<label href='#' className='text-black cursor-pointer' onClick={()=>setShowModal(true)}><b>read more</b></label>:''}
              </p>
            </div>
            {
              showModal&&(
                <div className='absolute top-0 left-0 w-full h-full bg-slate-200 z-[99] p-2'>
                    <CloseIcon onClick={()=>setShowModal(false)} sx={{ "&:hover": { color: "#FCD33B",cursor:'pointer' } }} className='flex ml-auto'/>
                    <div className='mt-2'>
                      {ad.description}
                    </div>
                </div>
              )
            }
          </div>

          <div className='style_price_row flex w-[90%] justify-between items-center absolute bottom-[25px]'>
            <p className='font-[400px] text-[#838383] text-[14px]'><b className="style_price_text text-[18px] text-black">${ad.price} / </b>{
              ad.ad_duration_type=='1'?'Daily':ad.ad_duration_type=='2'?'Weekly':ad.ad_duration_type=='3'?'Monthly':ad.ad_duration_type=='4'?'Unit':'Year'
            }</p>
          <button className='z-10 bg-[#FCD33B] py-[8px] px-[20px] mr-2 rounded-md hover:bg-black hover:text-[#FCD33B] text-md flex items-center justify-center'>
            <Link href={`/market-place/details?id=${ad.id}`} className='style_banner_button_text font-semibold text-18px]'>View Details</Link>
          </button>
          </div>

        </div>
      </div>
    </div>
  )
}
