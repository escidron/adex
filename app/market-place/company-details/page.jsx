'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Inter } from 'next/font/google'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Image from 'next/image'
import { Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GalleryImage from '@/components/gallery-image/GalleryImage'
import { industries } from '@/utils/industries'
const inter = Inter({ subsets: ['latin'] })

export default function CompanyDetailsPage() {
    const [company, setCompany] = useState({});
    const [gallery, setGallery] = useState([]);
    const [industry, setIndustry] = useState('');
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {

        axios.post('https://test.adexconnect.com/api/users/my-company',
            {
                id: id,
            },
            {
                withCredentials: true,
            })
            .then(function (response) {
                setCompany(response.data[0])
                getGallery(id)
                industries.map((item)=>{
                    if(item.id == response.data[0].industry){
                        setIndustry(item.name)
                    }
                })
                console.log('company response', response)
            })
            .catch(function (error) {
                console.log(error)
            });

    }, []);


    const getGallery = (id) => {
        console.log('entrou no efect')
        axios.post('https://test.adexconnect.com/api/users/get-image-gallery',
            {
                id: id,
            },
            {
                withCredentials: true,
            })
            .then(function (response) {
                setGallery(response.data.galleryWithImages)
                console.log('get gallery response', response)
            })
            .catch(function (error) {
                console.log(error)
            });

    }

    return (
        <div className={`mt-[150px] w-full h-full flex justify-center items-center ${inter.className}`}>
            <div className='flex flex-col w-[80%] max-w-[1000px] '>

                <div className={`flex flex-col items-center justify-center`}>
                    <div className='w-[150px] h-[150px] cursor-pointer'>
                        <Image
                            src={company.company_logo ? company.company_logo : '/nouser.png'}
                            alt="Seller Logo"
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
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                        <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                </div>
                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />


                <GalleryImage gallery={gallery}/>


            </div >
        </div>

    )
}
