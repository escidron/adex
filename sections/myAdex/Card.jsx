import Image from 'next/image'
import BlackButton from '@/components/buttons/BlackButton'
import { Inter } from 'next/font/google'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const inter = Inter({ subsets: ['latin'] })

export default function Card({ item, setBookingModalOpen ,edit}) {
    console.log(item)
    var date1 = new Date(item.start_date);
    var date2 = new Date(item.end_date);

    var differenceInMilliseconds = date2.getTime() - date1.getTime();

    // Convert the difference to days
    var days = differenceInMilliseconds / (1000 * 3600 * 24);
    return (
        <div className={`flex gap-1 mt-4 mx-auto min-w-[600px] max-w-[850px] max-h-[300px] p-[20px]  mb-8 border-[1px] rounded-lg border-bg-gray-200 hover:border-black ${inter.className}`}>
            <div className='h-[210px] w-[210px] min-h-[210px] min-w-[210px] rounded-md relative'>
                <Image
                    src={item.image}
                    alt={item.image}
                    priority
                    width={2100}
                    height={2100}
                    className='h-full w-full rounded-md'
                />
                {
                    item.status === 2 && (

                        <div className='bg-white text-black rounded-xl absolute top-2 left-2 text-[10px] px-2 py-1 font-semibold'>
                            {`${days} days left`}
                        </div>
                    )
                }
            </div>
            <div className='ml-8 flex flex-col w-full'>
                <div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[24px] font-[600]'>{item.title}</h1>
                        <div className={`${item.status === 1 ? 'bg-green-700' : item.status === 2 ? 'bg-orange-700' : item.status === 3 ? 'bg-red-700' : 'bg-gray-700'} px-2 py-1 h-[22px] rounded-2xl flex items-center text-[10px] font-[600] text-white ml-auto`}>
                            <p>{item.status === 1 ? 'Available' : item.status === 2 ? 'Running' : item.status === 3 ? 'Finished' : 'Pending'}</p>
                        </div>

                    </div>
                    <div className='flex gap-2'>
                        <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                        <p className='text-[14px] mt-[-3px]'>{item.address}</p>
                    </div>
                    <div className="flex items-center justify-start">
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p className='text-[14px] mt-2 w-full'>
                            {item.description.length > 125 ? item.description.split(' ').slice(0,15).join(' ') + "..."
                                : item.description}
                        </p>
                        {/* <div className='ml-auto flex flex-col items-center'>
                            {item.status == 2 && (
                                <div className='h-[120px] w-[160px] border-[1px] rounded-md flex flex-col justify-center items-center mt-2'>
                                    <p className='text-[15px]'>Days left on</p>
                                    <p className='text-[15px]'> contract</p>
                                    <p className='text-[24px] font-[600] mt-2'>{days}</p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
                <div className='flex justify-between items-center mt-auto'>
                    <div className='flex mt-auto text-[20px] '>
                        ${item.price}/{item.ad_duration_type === '1' ? (<p className='text-[15px] text-gray-600 flex items-center'>Month</p>) : item.ad_duration_type === '2' ? (<p className='text-[15px] text-gray-600 flex items-center'>Quarter</p>) : (<p className='text-[15px] text-gray-600 flex items-center'>Year</p>)}
                    </div>
                    <div className='flex mt-auto' onClick={() => {
                        if (item.status === 4) {

                            setBookingModalOpen(true)
                        }
                    }}>
                        {/* <BlackButton label='view details' /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
