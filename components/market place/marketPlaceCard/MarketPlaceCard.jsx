'use client'
import Link from 'next/link';
import MultiImage from '@/components/multiImage/MultiImage';
import RatingComponent from '@/components/rating/RatingComponent';

import { MapPin } from 'lucide-react';
import { Preview } from '@/components/textarea/TextAreaReader';
import { formatPrice } from '@/utils/format';
import { useContext } from 'react';
import { UserContext } from '@/app/layout';
import Image from 'next/image';

export default function MarketPlaceCard({ ad }) {
  const [user, setUser] = useContext(UserContext)
  return (
    <Link href={`/market-place/details?id=${ad.id}`} className={` relative styled_map_cards min-w-[360px] max-w-[360px] md:min-w-[300px] md:w-[90%] lg:w-[100%] xl:w-[360px] 2xl:w-full   `}>
      <div className="style_image_box w-full rounded-[24px] h-[200px]">
        {
          ad.image.length > 0 ? (
            <MultiImage images={ad.image} height={'200px'} remove={false} />
          ) : (
            <div className='w-full h-full flex justify-center items-center bg-black rounded-[16px]'>
              <Image
                src='/adex-logo-white-yellow.png'
                alt="Image placeholder"
                width={150}
                height={150}
              />
            </div>
          )
        }

        <p>
          <span className={`text-white absolute top-[20px] right-[20px] ${ad.status == "1" ? 'bg-green-600' : ad.status == "2" ? "bg-orange-600" : "bg-gray-600"} py-[1px] px-[4px] text-[12px] font-[400] rounded-md`}>
            {ad.status == "1" ? 'Available' : ad.status == "2" ? 'Booked' : (ad.status == "4" && user.userId == ad.requested_by) ? 'Pending' : 'Currently Unavailable'}
          </span>
        </p>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="w-full flex items-center justify-between">
            <p className="font-[600] text-[18px] ">{ad.title}</p>
          </div>

          <div className='flex gap-1'>
            <MapPin size={14} color='gray' className='min-w-[14px]' />
            {
              ad.address ? (
                <p className='text-[12px] text-gray-500 line-clamp-2'>{ad.address}</p>
              ) : (
                <p className='text-[12px] text-gray-500 line-clamp-2'>Online Asset</p>
              )
            }
          </div>
          <Preview value={ad.description} heigth={80} />

          <div className={`flex w-[90%] ${ad.category_id == 24 ? 'justify-end' : 'justify-between'} items-center absolute bottom-[25px] `}>
            {
              ad.category_id != 24 && (
                <p className='font-[400px] text-gray-500 text-[14px]'><b className="style_price_text text-[18px] text-black">{formatPrice(ad.price)}</b>
                  {
                    ad.category_id == 7 ? (
                      <>
                        {
                          ad.digital_price_type == '0' ? '/ Per Mention' : ad.digital_price_type == '1' ? '/ Per Inclusion' : ad.digital_price_type == '2' ? '/ Per Post' : '/ Per Month'
                        }
                      </>
                    ) : (
                      <>
                        {
                          ad.ad_duration_type == '0' ? '/ Month' : ad.ad_duration_type == '2' ? '/ Unit' : ''
                        }
                      </>
                    )
                  }
                </p>
              )
            }
            <div className="flex gap-1 items-center min-w-[70px]">
              <RatingComponent readOnly={true} size='small' rating={ad.rating} />
              <p className='text-[12px] text-gray-600'>({ad.amount_reviews ? ad.amount_reviews : 0})</p>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}
