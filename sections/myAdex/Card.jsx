import { useState } from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MultiImage from '@/components/multiImage/MultiImage';
import { Copy, Share2, Trash, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShareButtonFacebook from '@/components/facebook/ShareButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';



export default function Card({ item, bulletPoints, setAdvertisementId }) {
    const router = useRouter();
    const [sharingOptions, setSharingOptions] = useState(false);
    const [copied, setCopied] = useState(false);

    var date1 = new Date(item.start_date);
    var date2 = new Date(item.end_date);

    var differenceInMilliseconds = date2.getTime() - date1.getTime();
    // Convert the difference to days
    var days = differenceInMilliseconds / (1000 * 3600 * 24);



    const onCopy = () => {
        setCopied(true);
        toast.success('Link copy to your clipboard')
    }
    return (
        <div onClick={() => router.push(`/my-listing${item.status == 1 ? '/edit-advertisement' : ''}/?id=${item.id}`)} className={`flex gap-1 mt-4 mx-auto flex-col w-[400px] md:w-[700px] md:flex-row md:min-w-[700px]  md:max-h-[300px] p-[20px]  mb-8 border-[1px] cursor-pointer rounded-lg border-bg-gray-200 hover:border-black `}>
            <div className='h-[210px] w-full md:w-[210px] min-h-[210px] min-w-[210px] rounded-lg relative'>
                <MultiImage images={item.image} height={'210px'} remove={false} />
                {
                    item.status === 2 && (

                        <div className='bg-white text-black rounded-xl absolute top-2 left-2 text-[10px] px-2 py-1 font-semibold'>
                            {`${days} days left`}
                        </div>
                    )
                }
            </div>
            <div className={`relative md:ml-8 flex flex-col w-full`}>
                <div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[24px] font-[600]'>{item.title}</h1>
                        <div className={`${item.status === 1 ? 'bg-green-700' : item.status === 2 ? 'bg-orange-700' : item.status === 3 ? 'bg-red-700' : 'bg-gray-700'} px-2 py-1 h-[22px] rounded-2xl flex items-center text-[10px] font-[600] text-white ml-auto`}>
                            <p>{item.status === 1 ? 'Available' : item.status === 2 ? 'Running' : item.status === 3 ? 'Finished' : 'Pending'}</p>
                        </div>

                    </div>
                    <div className="flex items-center justify-start">
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                    <div className='flex gap-2'>
                        <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                        <p className='text-[14px] mt-[-3px] line-clamp-2'>{item.address}</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p className='text-[14px] mt-2 w-full'>
                            {item.description.length > 125 ? `${item.description.split(' ').slice(0, 15).join(' ')} ...`
                                : bulletPoints.length > 0 ? (
                                    <ul>
                                        {bulletPoints.map((point, index) => {
                                            if (index > 3) return null
                                            return (

                                                <li key={index}>{point}</li>
                                            )
                                        })}
                                    </ul>
                                ) : `${item.description}`}
                        </p>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-auto '>
                    <div className='flex mt-auto text-[20px] justify-between items-center'>
                        ${item.price}{item.ad_duration_type === '1' ? (<p className='text-[15px] text-gray-600 flex items-center'>/Month</p>) : item.ad_duration_type === '2' ? (<p className='text-[15px] text-gray-600 flex items-center'>/Quarter</p>) : item.ad_duration_type === '3' ? (<p className='text-[15px] text-gray-600 flex items-center'>/Year</p>) : ''}
                    </div>
                    <div className={` gap-2 ${sharingOptions ? 'hidden' : 'flex'}`}>
                        <div onClick={(e) => {
                            setSharingOptions(true)
                            e.stopPropagation()
                        }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer z-[20]'>
                            <Share2 />
                        </div>
                        {
                            item.status == 1 && (

                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    setAdvertisementId(item.id)
                                }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                                    <Trash />
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    sharingOptions && (
                        <div onClick={(e) => e.stopPropagation()} className='w-full h-full bg-slate-200 rounded-lg absolute top-0 right-0 p-2 '>
                            <div onClick={(e) => {
                                e.stopPropagation()
                                setSharingOptions(false)
                            }} className='absolute top-1 right-1 hover:bg-slate-300 p-1 rounded-md cursor-pointer'>
                                <X />
                            </div>
                            <ShareButtonFacebook id={item.id} />
                            <CopyToClipboard onCopy={onCopy} text={`http://localhost:3000/market-place/details?id=${item.id}`}>
                                <div className='w-[180px] flex gap-3 border p-3 mt-2 bg-white shadow-sm rounded-lg cursor-pointer hover:border-black'>
                                    <Copy />
                                    <h1>Copy Link</h1>
                                </div>
                            </CopyToClipboard>
                        </div>

                    )
                }
            </div>
        </div>
    )
}
