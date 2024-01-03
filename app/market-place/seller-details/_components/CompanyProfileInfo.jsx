import RatingComponent from '@/components/rating/RatingComponent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';

export default function CompanyProfileInfo({company,industry}) {
    return (
        <div className={`flex flex-col items-center justify-center w-full`}>
            <div className='w-[150px] h-[150px] cursor-pointer'>
                <Image
                    src={company.company_logo ? company.company_logo : '/nouser.png'}
                    alt="company Logo"
                    priority
                    width={2000}
                    height={2000}
                    className='rounded-full w-full h-full object-cover'
                />
            </div>
            <h1 className='text-[35px] min-w-[250px] text-center cursor-pointer'>{company.company_name}</h1>
            <h1 className='text-[18px] min-w-[250px] text-center cursor-pointer'>{industry}</h1>

            <div className='flex items-center  gap-1'>
                <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                <h1 className='text-[15px] text-gray-500'>{company.address ? company.address : 'Home-based company'}</h1>
            </div>
            <div className="flex items-center justify-center">
                <RatingComponent readOnly={true} rating={company.rating} />
            </div>
        </div>
    )
}
