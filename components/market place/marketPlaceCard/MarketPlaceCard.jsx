'use client'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Link from 'next/link';
import MultiImage from '@/components/multiImage/MultiImage';
import { MapPin } from 'lucide-react';
import { Preview } from '@/components/textarea/TextAreaReader';
import { formatPrice } from '@/utils/format';
import { useContext } from 'react';
import { UserContext } from '@/app/layout';

export default function MarketPlaceCard({ ad }) {
  const [user, setUser] = useContext(UserContext)

  return (
    <Link href={`/market-place/details?id=${ad.id}`} className={` relative styled_map_cards min-w-[360px] max-w-[360px] md:min-w-[300px] md:w-[90%] lg:w-[100%] xl:w-[360px] 2xl:w-full   `}>
      <div className="style_image_box w-full rounded-[24px] h-[200px]">
        <MultiImage images={ad.image} height={'200px'} remove={false} />
        <p>
          <span className={`text-white absolute top-[20px] right-[20px] ${ad.status == "1" ? 'bg-green-600' : ad.status == "2" ? "bg-orange-600" : "bg-gray-600"} py-[1px] px-[4px] text-[12px] font-[400] rounded-md`}>
            {ad.status == "1" ? 'Available' : ad.status == "2" ? 'Running' : (ad.status == "4" && user.userId == ad.requested_by) ? 'Pending' :'Currently Unavailable'}
          </span>
        </p>
        <div className='style_card_info w-full h-1/2 p-[10px] mt-1'>
          <div className="w-full flex items-center justify-between">
            <p className="font-[600] text-[18px] ">{ad.title}</p>
          </div>

          <div className='flex gap-1'>
            <MapPin size={14} color='gray' className='min-w-[14px]' />
            <p className='text-[12px] text-gray-500 line-clamp-2'>{ad.address}</p>
          </div>
          <Preview value={ad.description} heigth={80} />

          <div className='flex w-[90%] justify-between items-center absolute bottom-[25px]'>
            <p className='font-[400px] text-gray-500 text-[14px]'><b className="style_price_text text-[18px] text-black">{formatPrice(ad.price)}</b>{
              ad.ad_duration_type == '0' ? '/ Month' : ad.ad_duration_type == '2' ? '/ Unit' : ''
            }
            </p>
            <div className=" min-w-[70px]">
              <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '15px' }} />
              <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '15px' }} />
              <StarRoundedIcon sx={{ color: '#FCD33B', fontSize: '15px' }} />
              <StarRoundedIcon sx={{ color: 'gray', fontSize: '15px' }} />
              <StarRoundedIcon sx={{ color: 'gray', fontSize: '15px' }} />
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}
