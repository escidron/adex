import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import RatingComponent from '@/components/rating/RatingComponent';
import { Preview } from '@/components/textarea/TextAreaReader';

export default function SellerProfileInfo({ seller }) {
    return (
        <div className="flex flex-col mx-auto md:flex-row gap-6 items-center justify-center sm:items-center sm:justify-start border shadow-md py-8 px-4 rounded-lg w-fit lg:w-[70%]">
            <div className='w-[150px] h-[150px] min-w-[150px] cursor-pointer flex flex-col items-center'>

                {
                    seller.image ? (

                        <Image
                            src={seller.image}
                            alt="seller Logo"
                            priority
                            width={2000}
                            height={2000}
                            className='rounded-full w-full h-full object-cover'
                        />
                    ) : (
                        <div className="bg-black text-[28px] text-white font-[600] rounded-full min-w-[120px] w-[120px] h-[120px] flex justify-center items-center">
                            {seller.name.substring(0, 1).toUpperCase()}
                        </div>
                    )
                }
                <div className="flex items-center justify-center">
                    <RatingComponent readOnly={true} rating={seller.rating} />
                </div>
            </div>
            <div className='flex flex-col justify-start h-auto' >
                <h1 className='text-[35px]'>{`${seller.name}`}</h1>
                {
                    seller.handle_is_public == "1" && seller.handle && (
                        <div className='mt-1 flex items-center gap-3'>
                            <AccountCircleIcon sx={{ fontSize: '18px', color: 'gray' }} />
                            <h1>{seller.handle}</h1>
                        </div>

                    )
                }
                {
                    seller.city_is_public == '1' && seller.city && (

                        <div className='mt-1 flex items-center gap-3'>
                            <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                            <h1>{seller.city}</h1>
                        </div>
                    )
                }
                {
                    seller.profession_is_public == '1' && seller.profession && (

                        <div className='mt-1 flex items-center gap-3'>
                            <WorkIcon sx={{ fontSize: '18px', color: 'gray' }} />
                            <h1>{seller.profession}</h1>
                        </div>
                    )
                }
                {
                    seller.bio_is_public == '1' && (

                        // <p className='mt-2 max-w-full'>{seller.bio != 'null' ? seller.bio : ''}</p>
                        <Preview value={seller.bio != 'null' ? seller.bio : ''} heigth={200} autoHeigth={true} />

                    )
                }
            </div>
        </div>
    )
}
