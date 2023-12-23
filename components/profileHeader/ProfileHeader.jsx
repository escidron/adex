"use client"
import { useEffect, useState,useContext } from 'react'
import { UserContext } from '@/app/layout';

import Image from 'next/image'
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import RatingComponent from '../rating/RatingComponent';
import { ImageIcon } from 'lucide-react';
import GetUserProfile from '@/actions/GetUserProfile';
import { useDateField } from '@mui/x-date-pickers/DateField/useDateField';

export default function ProfileHeader() {
    const [rating, setRating] = useState(0);
    const [user, setUser] = useContext(UserContext)

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
        setUser((prev) => ({ ...prev, image: imageList[0].data_url }))
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/my-profile-image`,
        {
            image: imageList[0].data_url,
        }, {
            withCredentials: true,
        }).then(function (response) {

        }).catch(function (error) {

            console.log(error)
        });
    };

    useEffect(() => {
        async function GetInfo() {
            const userData = await GetUserProfile()
            setUserData(userData)
            setSrc(userData.image)
        }
        GetInfo();
    }, []);
    return (
        <div className='bg-black h-[180px] md:h-[230px] w-full mt-[90px] flex items-center justify-center lg:justify-start z-[99] px-6'>
            <div className='w-[100px] h-[100px]  sm:w-[140px] sm:h-[140px]  md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full bg-black lg:ml-[200px] border-4 border-[#FCD33B] relative mt-[-10px]'>
                {
                    src ? (

                        <Image
                            src={src}
                            alt="Adex Logo"
                            priority
                            width={2000}
                            height={2000}
                            className='rounded-full w-full h-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-slate-200 flex justify-center items-center rounded-full'>
                            <ImageIcon />
                        </div>
                    )
                }
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
                        <div className='absolute right-[-5px] bottom-[-5px] sm:right-0 sm:bottom-0 lg:right-[8px] lg:bottom-[8px] cursor-pointer' onClick={onImageUpload}>
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
                    <p className='text-white text-[26px] md:text-[32px] lg:text-[36px] xl:text-[41px] m-0'>{`${userData.name} ${userData.lastName}`}</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 md:items-center'>
                    <p className='text-white text-[15px]'>{userData.email}</p>
                    <div className="md:ml-4 flex items-center">
                        <RatingComponent 
                            readOnly={true}
                            rating={rating}
                            setRating={(rating)=>setRating(rating)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
