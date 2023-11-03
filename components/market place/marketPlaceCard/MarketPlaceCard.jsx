'use client'
import React, { useState,useEffect } from 'react'
import StarRoundedIcon from '@mui/icons-material/StarRounded';// import path from '../../public/ad_images/6456fd7bc5413.png'
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import MultiImage from '@/components/multiImage/MultiImage';
import { MapPin } from 'lucide-react';




export default function MarketPlaceCard({ ad }) {
  const [src, setSrc] = useState('/ad_images/' + ad.image);
  const [showModal, setShowModal] = useState(false)
  const [bulletPoints, setBulletPoints] = useState([]);
  const path = '/ad_images/'
  //duration type
  // '1'=>'Daily',
  // '2'=>'Weekly',
  // '3'=>'Monthly',
  // '4'=>'Unit',
  // '5'=>'Year' 

  useEffect(() => {
    if (ad) {
      const bulletPoints = ad.description.split('\n');
      setBulletPoints(bulletPoints)
    }

  }, []);
  return (
    <Link href={`/market-place/details?id=${ad.id}`}  className={` relative styled_map_cards w-[360px] md:w-[90%] lg:w-[100%] xl:w-[360px] 2xl:w-full   `}>
      <div className="style_image_box w-full rounded-[24px] h-[200px]">
        <MultiImage images={ad.image} height={'200px'} remove={false} />
        <p><span className={`text-white absolute top-[20px] right-[20px] ${ad.status == "1" ? 'bg-green-600' : "bg-orange-600"} py-[1px] px-[4px] text-[12px] font-[400] rounded-md`}>{ad.status == "1" ? 'Available' : 'Running'}</span></p>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="style_title_row w-full flex items-center justify-between">
            <p className="font-[600] text-[20px] line-clamp-1">{ad.title}</p>
            <div className="w-[100px] min-w-[100px]">
              <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
              <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
              <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
              <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
              <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
            </div>
          </div>
          <div className='flex gap-1'>
            <MapPin size={14} color='gray' />
            <p className='text-[12px] text-gray-500 line-clamp-2'>{ad.address}</p>
          </div>
          <div className='style_card_description_box mt-2 '>
            <div className="style_card_description text-[14px] h-[20px] ">
              <p className='line-clamp-3'>
                {
                bulletPoints.length > 0 ? (
                  <ul>
                    {bulletPoints.map((point, index) => {
                      return (

                        <li key={index}>{point}</li>
                      )
                    })}
                  </ul>
                ) : `${ad.description}`
                }
              </p>
            </div>
            {
              showModal && (
                <div className='absolute top-0 left-0 w-full h-full bg-slate-200 z-[99] p-2'>
                  <CloseIcon onClick={() => setShowModal(false)} sx={{ "&:hover": { color: "#FCD33B", cursor: 'pointer' } }} className='flex ml-auto' />
                  <div className='mt-2'>
                    {ad.description}
                  </div>
                </div>
              )
            }
          </div>

          <div className='style_price_row flex w-[90%] justify-between items-center absolute bottom-[25px]'>
            <p className='font-[400px] text-gray-500 text-[14px]'><b className="style_price_text text-[18px] text-black">${ad.price}</b>{
              ad.ad_duration_type == '0' ? '/ Month' : ad.ad_duration_type == '2' ? '/ Unit' : ''
            }</p>
          </div>

        </div>
      </div>
    </Link>
  )
}
