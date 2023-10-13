'use client'
import { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import RatingComponent from '@/components/rating/RatingComponent'
import ImageUploading from "react-images-uploading";
import MyWallet from '@/sections/myWallet/MyWallet'
import TabsComponent from '@/components/tabs/TabsComponent'
import AddCard from '@/components/addCard/AddCard'
import AddAccount from '@/components/addAccount/AddAccount'
import { Divider } from '@mui/material';
import MyListing from '@/sections/myAdex/MyListing'
import MyBookings from '@/sections/myAdex/MyBookings'
import DashboardPanel from '@/sections/dashboard/DashboardPanel'
import Footer from '@/components/footer/Footer'
import GalleryImage from '../../components/gallery-image/GalleryImage'
import GalleryCarrousel from '@/components/gallery-image/GalleryCarrousel'
import ImageLoader from '@/components/ImageLoader/ImageLoader'
import ImageImporter from '@/components/gallery-image/imageImporter'
import { BookmarkCheck, ImageIcon, LineChart, MapPin } from 'lucide-react'
import { menuOptions } from '@/utils/companyAccountOptions'

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
    const [balance, setBalance] = useState(null);

    const [status, setStatus] = useState({
        available: 0,
        running: 0,
        finished: 0,
        pending: 0
    });
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const selectedOption = searchParams.get('option')

    console.log('selectedOption', selectedOption)
    useEffect(() => {

        axios.post('https://test.adexconnect.com/api/payments/get-account-balance',
            {},
            {
                withCredentials: true,

            })
            .then(function (response) {
                setBalance(response.data)

            })
            .catch(function (error) {
                console.log(error)
            });

    }, []);

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
        if (images.length > 0) {

            axios.post('https://test.adexconnect.com/api/users/image-gallery',
                {
                    id: id,
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
        } else {
            getGallery()

        }
    }, [images]);

    const getGallery = () => {
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
        <>

            <div className='bg-black h-[200px] md:h-[180px] w-full mt-[90px] flex items-center justify-center lg:justify-start z-[99]'>
                <div className='w-[100px] h-[100px]  sm:w-[140px] sm:h-[140px]   rounded-full bg-black lg:ml-[200px] border-4 border-[#FCD33B] relative mt-[-10px]'>
                    <Image
                        src={company.company_logo ? company.company_logo : '/nouser.png'}
                        alt="Company Logo"
                        priority
                        width={2000}
                        height={2000}
                        className='rounded-full w-full h-full object-cover'
                    />

                </div>
                <div className='ml-8'>
                    <div className='flex items-center'>
                        <h1 className='text-white text-[26px] md:text-[32px] '>{`${company.company_name}`}</h1>
                    </div>
                    <div className='flex gap-2 items-center mt-2'>
                        <div className='flex items-center gap-1'>
                            {/* <LocationOnIcon sx={{ fontSize: '18px', color: 'white', marginTop: '4px' }} /> */}
                            <MapPin color='white' size={15} className='mb-1' />
                            <p className="text-white m-0">{company.address ? company.address : 'Home based'}</p>
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
            <div className={`mt-4 flex flex-col items-center ${inter.className} md:h-[60vh] `}>
                {/* <div className='w-[50%] mt-4 flex flex-col items-center'>
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

                    {
                        balance && (
                            <>
                                <h1 className='text-[26px] mb-4'>Company Financial Balance</h1>
                                <DashboardPanel balance={balance} />
                            </>
                        )
                    }

                    <h1 className='text-[26px] mb-4 mt-6'>Image Gallery</h1>
                    <div className='w-full flex justify-start'>
                        <div>
                            <ImageImporter
                                images={images}
                                setImages={(image) => setImages(image)}
                            />
                        </div>
                    </div>
                    <GalleryImage gallery={gallery} />


                </div> */}

                {
                    selectedOption ? (
                        <>
                            <p className='text-[30px] mt-8'>
                                {menuOptions.find((opt) => opt.id == selectedOption).label}
                            </p>
                        </>
                    ) : (

                        <p className='text-[36px] mt-8'>Company Account</p>
                    )
                }
                <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]'>
                    {
                        !selectedOption && (

                            menuOptions.map((option) => (
                                <Link href={`my-company?id=${id}&option=${option.id}`} key={option.id} className='flex flex-col items-center justify-center w-full min-w-[190px]  max-h-[150px] bg-black px-4 py-[24px] rounded-lg hover:scale-[1.1] cursor-pointer'>
                                    <div className='h-[74px] aspect-square flex items-center justify-center'>
                                        {option.icon}
                                    </div>
                                    <h1 className='text-[#FCD33B] flex justify-center items-center text-center mt-1'>{option.label}</h1>
                                </Link>
                            ))
                        )
                    }
                </div>
                <div className='w-full px-8 md:w-[80%] lg:w-[70%] max-w-[700px]'>

                    {
                        selectedOption == 1 && (
                            <>
                                <TabsComponent value={value1} setValue={(value) => setValue1(value)}>
                                    <AddCard label='Payments' />
                                    <AddAccount label='Payouts' />
                                </TabsComponent>
                            </>
                        )
                    }
                    {
                        selectedOption == 2 && (
                            <>
                                <div className='w-full flex justify-start'>
                                    <div>
                                        <ImageImporter
                                            images={images}
                                            setImages={(image) => setImages(image)}
                                        />
                                    </div>
                                </div>
                                <GalleryImage gallery={gallery} />
                            </>
                        )
                    }
                    {
                        selectedOption == 3 && (
                            <CompanyRefreshContext.Provider value={[refresh, setRefresh]}>
                                <TabsComponent value={value2} setValue={(value) => setValue2(value)}>
                                    <MyListing label='My Listing' data={listingData} status={status} isCompanyPage={true} />
                                    <MyBookings label='My Booking' data={bookingData} />
                                </TabsComponent>
                            </CompanyRefreshContext.Provider>
                        )
                    }
                    {
                        selectedOption == 4 && (
                            <>
                                {
                                    balance ? (
                                        <>
                                            <h1 className='text-[26px] mb-4'>Company Financial Balance</h1>
                                            <DashboardPanel balance={balance} />
                                        </>
                                    ) : (
                                        <div className='mt-8 w-full bg-slate-200 h-[200px] rounded-lg flex flex-col justify-center items-center'>
                                        <LineChart color='gray' size={30}/>
                                        <h1 className='mt-2 text-xl text-gray-500'>No balance available</h1>
                                      </div>                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

