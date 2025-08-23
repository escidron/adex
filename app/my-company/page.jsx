'use client'
import { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
import { ArrowLeft, BookmarkCheck, ImageIcon, LineChart, MapPin, FileText } from 'lucide-react'
import { menuOptions } from '@/utils/companyAccountOptions'
import GetMyBookings from '@/actions/GetMyBookings'
import GetPendingBookings from '@/actions/GetPendingBookins'
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'



export const CompanyRefreshContext = createContext();

export default function MyCompanyPage() {
    const [company, setCompany] = useState({});
    const [rating, setRating] = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [refresh, setRefresh] = useState(false)
    const [listingData, setListingData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [images, setImages] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [balance, setBalance] = useState(null);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [invoices, setInvoices] = useState([]);

    const [status, setStatus] = useState({
        available: 0,
        booked: 0,
        completed: 0,
        pending: 0
    });
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const selectedOption = searchParams.get('option')
    const router = useRouter()


    useEffect(() => {
        async function getInfo() {
            const { myListing, status } = (await GetMyAdvertisement()) || {}
            const {myBookings} = (await GetMyBookings()) || { myBookings: [] }
            const pendingListing = await GetPendingBookings()

            if (myListing?.length > 0) {
                setListingData(myListing)
                setStatus(status)
            }
            setBookingData([...pendingListing, ...myBookings])
            setIsContentLoaded(true)

        }
        getInfo();
    }, []);

    useEffect(() => {

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/get-account-balance`,
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

    const fetchInvoices = async () => {
        console.log('🔍 Fetching invoices for company ID:', id);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/companies/${id}/invoices`,
                { withCredentials: true }
            );
            console.log('📋 Invoices API response:', response.data);
            if (response.data && response.data.data) {
                setInvoices(response.data.data);
            } else if (response.data) {
                setInvoices(response.data);
            }
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/my-company`,
            {
                id: id,
            },
            {
                withCredentials: true,

            })
            .then(function (response) {
                setCompany(response.data[0])
                setRating(response.data[0].rating)
            })
            .catch(function (error) {
                console.log(error)
            });

        // Fetch invoices when component mounts
        if (id) {
            fetchInvoices();
        }
    }, [id]);

    useEffect(() => {
        if (images.length > 0) {

            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/image-gallery`,
                {
                    id: id,
                    images: images
                },
                {
                    withCredentials: true,

                })
                .then(function (response) {
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
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-image-gallery`,
            {
                id: id,
            },
            {
                withCredentials: true,
            })
            .then(function (response) {
                setGallery(response.data.galleryWithImages)
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
                        src={company?.company_logo ? company.company_logo : '/nouser.png'}
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
            <div className={`mt-4 flex flex-col items-center `}>
                {
                    selectedOption ? (
                        <div className='flex justify-between items-center mt-8 gap-[50px]'>
                            <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                            <p className='text-[28px] md:text-[36px]'>
                                {menuOptions.find((opt) => opt.id == selectedOption).label}
                            </p>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center mt-8 gap-[50px]'>
                            <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                            <p className='text-[28px] md:text-[36px] '>Company Account</p>
                        </div>
                    )
                }
                <div className='mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]'>
                    {
                        !selectedOption && (

                            menuOptions.map((option) => (
                                <Link href={`my-company?id=${id}&option=${option.id}`} key={option.id} className='flex flex-col items-center justify-center w-full min-w-[190px]  max-h-[150px] bg-black px-4 py-[24px] rounded-lg hover:opacity-80 cursor-pointer'>
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
                                    <AddCard label='Payments' companyId={id} />
                                    <AddAccount label='Payouts' companyId={id} companyName={company.company_name}/>
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
                            <>
                                {
                                    balance ? (
                                        <>
                                            <h1 className='text-[26px] mb-4'>Company Financial Balance</h1>
                                            <DashboardPanel balance={balance} />
                                        </>
                                    ) : (
                                        <div className='mt-8 w-full bg-slate-200 h-[200px] rounded-lg flex flex-col justify-center items-center'>
                                            <LineChart color='gray' size={30} />
                                            <h1 className='mt-2 text-xl text-gray-500'>No balance available</h1>
                                        </div>)
                                }
                            </>
                        )
                    }
                    {
                        selectedOption == 4 && (
                            <>
                                <h1 className='text-[26px] mb-4'>My Invoices</h1>
                                {invoices.length > 0 ? (
                                    <div className='space-y-4'>
                                        {invoices.map((invoice, index) => (
                                            <div key={index} className='bg-white border rounded-lg p-4 shadow-sm'>
                                                <div className='flex justify-between items-center'>
                                                    <div>
                                                        <h3 className='font-semibold text-lg'>{invoice.campaign_name}</h3>
                                                        <p className='text-gray-500 text-sm'>
                                                            Generated: {new Date(invoice.generated_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={invoice.pdf_url}
                                                        download={invoice.filename}
                                                        className='bg-[#FCD33B] text-black px-4 py-2 rounded-lg hover:bg-[#FCD33B]/90 transition-colors inline-block text-center'
                                                    >
                                                        Download PDF
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='mt-8 w-full bg-slate-200 h-[200px] rounded-lg flex flex-col justify-center items-center'>
                                        <FileText color='gray' size={30} />
                                        <h1 className='mt-2 text-xl text-gray-500'>No invoices available</h1>
                                        <p className='text-gray-400 text-sm mt-1'>Invoices will appear here after creating campaigns</p>
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

