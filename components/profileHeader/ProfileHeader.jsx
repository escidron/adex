"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import StarRoundedIcon from '@mui/icons-material/StarRounded';// import path from '../../public/ad_images/6456fd7bc5413.png'
import ImageUploading from "react-images-uploading";

export default function ProfileHeader() {
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        email: ''
    });
    const [images, setImages] = useState([]);
    const [src, setSrc] = useState('');
    const onChange = (imageList,addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        setSrc(imageList[0].data_url)
        axios.post('http://localhost:8000/api/users/my-profile-image',
            {
                image: imageList[0].data_url,
            }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {

        }).catch(function (error) {

            console.log(error)
        });
    };

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                "http://localhost:8000/api/users/user-profile",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setUserData(res)
                setSrc(res.image)
            }
        }
        GetUserProfile();
    }, []);
    return (
        <div className='bg-black h-[230px] w-full mt-[90px] flex items-center justify-center lg:justify-start z-[99]'>
            <div className='w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-full bg-black lg:ml-[200px] border-4 border-[#FCD33B] relative mt-[-10px]'>
                <Image
                    src={src?src:'/nouser.png'}
                    alt="Adex Logo"
                    priority
                    width={2000}
                    height={2000}
                    className='rounded-full w-full h-full object-cover'
                />
                <ImageUploading
                    value={images}
                    onChange={onChange}
                    dataURLKey="data_url"
                    acceptType={["jpg", "png", 'JPEG']}

                >
                    {({
                        onImageUpload,
                    }) => (
                        // write your building UI
                        <div className='absolute right-[8px] bottom-[8px] cursor-pointer' onClick={onImageUpload}>
                            <Image
                                src='/Group 6.png'
                                alt="Add profile image"
                                priority
                                width={40}
                                height={40}
                            />
                        </div>

                    )}
                </ImageUploading>

            </div>
            <div className='ml-8'>
                <div className='flex items-center'>
                    <h1 className='text-white text-[41px] h-[55px]'>{`${userData.name} ${userData.lastName}`}</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <p className='text-white text-[15px]'>{userData.email}</p>

                    <div className="ml-4 flex items-center">
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                </div>
                <button className=' bg-[#FCD33B] mt-3 py-[4px] px-[20px] rounded-md  hover:bg-black hover:text-[#FCD33B] text-lg'>
                    <Link href='/dashboard' className='style_banner_button_text font-semibold text-18px]'>View Dashboard</Link>
                </button>
            </div>
        </div>
    )
}
