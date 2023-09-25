'use client'
import { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import RatingComponent from '@/components/rating/RatingComponent'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TabsComponent from '@/components/tabs/TabsComponent'
import AddCard from '@/components/addCard/AddCard'
import AddAccount from '@/components/addAccount/AddAccount'
import { Divider } from '@mui/material';
import MyListing from '@/sections/myAdex/MyListing'
import MyBookings from '@/sections/myAdex/MyBookings'
import DashboardPanel from '@/sections/dashboard/DashboardPanel'
import Footer from '@/components/footer/Footer'
import ImageImporter from '@/components/gallery-image/imageImporter'
import GalleryImage from '../../components/gallery-image/GalleryImage'



const inter = Inter({ subsets: ['latin'] })

export const CompanyRefreshContext = createContext();

export default function MyCompanyPage() {
    const [company, setCompany] = useState({});
    const [rating, setRating] = useState(2);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [refresh, setRefresh] = useState(false)
    const [listingData, setListingData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [images, setImages] = useState([]);
    const [gallery, setGallery] = useState([]);

    const [status, setStatus] = useState({
        available: 0,
        running: 0,
        finished: 0,
        pending: 0
    });
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
                console.log(response)
                setCompany(response.data[0])
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);

    useEffect(() => {
        if(images.length > 0){

            axios.post('https://test.adexconnect.com/api/users/image-gallery',
                {
                    id:id,
                    images: images
                },
                {
                    withCredentials: true,
    
                })
                .then(function (response) {
                    console.log('image added')
                    setImages([])
                    getGallery()
                })
                .catch(function (error) {
                    console.log(error)
                });
        }else{
            getGallery()

        }
    }, [images]);

    const getGallery =() => {
            console.log('entrou no efect')
            axios.post('https://test.adexconnect.com/api/users/get-image-gallery',
                {
                    id:id,
                },
                {
                    withCredentials: true,
                })
                .then(function (response) {
                    setGallery(response.data.galleryWithImages)
                    console.log('get gallery response',response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        
    }
    return (
        <>

            <div className='bg-black h-[200px] md:h-[180px] w-full mt-[90px] flex items-center justify-center lg:justify-start z-[99]'>
                <div className='w-[140px] h-[140px]  rounded-full bg-black lg:ml-[200px] border-4 border-[#FCD33B] relative mt-[-10px]'>
                    <Image
                        src={company.company_logo ? company.company_logo : '/nouser.png'}
                        alt="Company Logo"
                        priority
                        width={2000}
                        height={2000}
                        className='rounded-full w-full h-full object-cover'
                    />
                    {/* <ImageUploading
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
                </ImageUploading> */}

                </div>
                <div className='ml-8'>
                    <div className='flex items-center'>
                        <h1 className='text-white text-[41px] h-[55px]'>{`${company.company_name}`}</h1>
                    </div>
                    <div className='flex gap-2 items-center mt-2'>
                        <div className='flex items-start  gap-1'>
                            <LocationOnIcon sx={{ fontSize: '18px', color: 'white', marginTop: '4px' }} />
                            <p className="text-white">{company.address}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <RatingComponent
                            readOnly={true}
                            rating={rating}
                            setRating={() => { }}
                        />
                    </div>
                </div>

            </div>
            <div className={`mt-4 flex flex-col items-center ${inter.className} `}>
                <div className='w-[50%] mt-4 flex flex-col items-center'>
                    <h1 className='text-[26px]'>Payments & Payouts</h1>
                    <TabsComponent value={value1} setValue={(value) => setValue1(value)}>
                        <AddCard label='Payments' />
                        <AddAccount label='Payouts' />
                    </TabsComponent>

                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />

                    <h1 className='text-[26px]'>Listings & Bookings</h1>

                    <CompanyRefreshContext.Provider value={[refresh, setRefresh]}>
                        <TabsComponent value={value2} setValue={(value) => setValue2(value)}>
                            <MyListing label='My Listing' data={listingData} status={status} isCompanyPage={true} />
                            <MyBookings label='My Booking' data={bookingData} />
                        </TabsComponent>
                    </CompanyRefreshContext.Provider>

                    <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />

                    <h1 className='text-[26px] mb-4'>Company Financial Balance</h1>
                    <DashboardPanel />

                    <h1 className='text-[26px] mb-4 mt-6'>Image Gallery</h1>
                    <div className='w-full flex justify-start'>
                        <div>

                            <ImageImporter
                                    images={images}
                                    setImages={(image) => setImages(image)}
                                />
                        </div>
                    </div>
                    <GalleryImage gallery={gallery}/>
                </div>
            </div>
            <Footer />
        </>
    )
}

