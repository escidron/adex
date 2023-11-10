'use client'
import axios from 'axios'
import CategoryForm from '@/components/forms/CategoryForm'
import SubCategoryForm from '@/components/forms/SubCategoryForm'
import TitleForm from '@/components/forms/TitleForm'
import LocationForm from '@/components/forms/LocationForm'
import DescriptionForm from '@/components/forms/DescriptionForm'
import PriceForm from '@/components/forms/PriceForm'
import DiscountsForm from '@/components/forms/DiscountsForm'
import DateForm from '@/components/forms/DateForm'
import PhotosForm from '@/components/forms/PhotosForm'
import BuildingAssetsForm from '@/components/forms/BuildingAssetsForm'
import PreviewForm from '@/components/forms/PreviewForm'
import toast, { Toaster } from 'react-hot-toast'
import BusinessForm from '@/components/forms/BusinessForm'
import InstructionsForm from '@/components/forms/InstructionsForm'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {  Edit, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext } from './layout'
import { Separator } from '@/components/ui/separator'
import GetUserProfile from '@/actions/GetUserProfile'


const requiredFields = ['select_business', 'category', 'sub_category', 'title', 'location', 'description', 'price', 'images']

const editSteps = [
    {
        id: 'Business',
        url: 'select_business'
    },
    {
        id: 'Category',
        url: 'category'
    },
    {
        id: 'Sub-category',
        url: 'sub_category'
    },
    {
        id: 'Building Assets',
        url: 'building_assets'
    },
    {
        id: 'Title',
        url: 'title'
    },
    {
        id: 'Location',
        url: 'location'
    },
    {
        id: 'Description',
        url: 'description'
    },
    {
        id: 'Price',
        url: 'price'
    },
    {
        id: 'Discounts',
        url: 'discounts'
    },
    {
        id: 'Date',
        url: 'date'
    },
    {
        id: 'Photos',
        url: 'images'
    },
    {
        id: 'Instructions',
        url: 'instructions'
    }

]

export default  function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [required, setRequired] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    const [userData, setUserData] = useState({});
    const [step, setStep] = useState('category');
    //const step = params.step
    const id = params.id
    const router = useRouter();


    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await GetUserProfile();
          console.log('response',response)
          // ...
        }
        fetchData();
      }, [])

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setUserData(res)
            }
        }
        GetUserProfile();
    }, []);

    const editListing = () => {
        setIsPending(true)

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/update`,
            {
                id: id,
                category_id: listingProperties.sub_category,
                title: listingProperties.title,
                address: listingProperties.location,
                lat: listingProperties.latitude,
                long: listingProperties.longitude,
                description: listingProperties.description,
                price: listingProperties.price,
                images: listingProperties.images,
                ad_duration_type: advertisementType,
                sub_asset_type: listingProperties.building_asset,
                per_unit_price: advertisementType ? 2 : listingProperties.price,
                discounts: listingProperties.discounts,
                company_id: selectedCompany,
                first_available_date: listingProperties.first_available_date,
                date: listingProperties.date,
                company_id: listingProperties.select_business,
                instructions: listingProperties.instructions
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                toast.success('Listing successfully updated!')
                router.push('/my-profile?tab=5')
                setIsPending(false)
            })
            .catch(function (error) {

                console.log(error)
                toast.error('Something went wrong!')
                setIsPending(false)

            })
    }

    console.log('listing',listingProperties)
    return (
        <>
            <Toaster />
            <div className='h-[80px] border  flex items-center justify-between px-8 fixed top-0 w-full'>
                <div className='flex gap-2'>
                    <Edit />
                    <p className='font-[600]'>Edit your Listing</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <Button variant='outline' onClick={() => router.push('/my-profile?tab=5&sub-tab=0')} className='flex gap-2 items-center'>
                        Cancel
                    </Button>
                    <Button disabled={isPending} onClick={editListing} className='flex gap-2 items-center'>
                        {
                            isPending && (
                                <Loader2 size={18} className='animate-spin' />
                            )
                        }
                        Save & Exit
                    </Button>
                </div>
            </div>
            <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex items-center justify-center `}>
                {/* form div */}
                <div className='w-[350px] pt-[100px] flex flex-col items-start px-6 h-full ml-[100px]'>
                    <p className='text-[32px]'>Listing Details</p>
                    <Separator className='mb-2' />
                    {
                        editSteps.map((step) => {

                            if( userData.userType == 2 && step.id == "Business" ){
                                return undefined
                            }
                            
                            if( listingProperties.sub_category == 4 && step.id == "Discounts" ){
                                return undefined
                            }

                            if( listingProperties.sub_category != 9 && step.id =="Building Assets" ){
                                return undefined
                            }
                            return (

                                <p key={step.id} onClick={() => {
                                    setListingProperties(prev => ({ ...prev, selectedStep: step.id }))
                                    setStep(step.url)
                                    // router.push(`/listing/edit/${id}/${step.url}`)
                                }}
                                    className={`w-full mt-1 flex items-center p-2 rounded-lg  cursor-pointer ${listingProperties.selectedStep == step.id ? 'bg-black text-[#FCD33B] hover:bg-black' : 'hover:bg-slate-300'}`} >{step.id}</p>
                            )
                        })
                    }
                </div>
                <div className='w-full  px-6 h-full flex justify-center pt-[100px]'>
                    {step === 'select_business' && <BusinessForm ListingContext={ListingContext} />}
                    {step === 'category' && <CategoryForm ListingContext={ListingContext} />}
                    {step === 'sub_category' && <SubCategoryForm ListingContext={ListingContext} />}
                    {step === 'building_assets' && <BuildingAssetsForm ListingContext={ListingContext} />}
                    {step === 'title' && <TitleForm ListingContext={ListingContext} />}
                    {step === 'location' && <LocationForm ListingContext={ListingContext} />}
                    {step === 'description' && <DescriptionForm ListingContext={ListingContext} />}
                    {step === 'price' && <PriceForm ListingContext={ListingContext} />}
                    {step === 'discounts' && <DiscountsForm ListingContext={ListingContext} />}
                    {step === 'date' && <DateForm ListingContext={ListingContext} />}
                    {step === 'images' && <PhotosForm ListingContext={ListingContext} />}
                    {step === 'instructions' && <InstructionsForm ListingContext={ListingContext} />}
                    {step === 'preview' && <PreviewForm ListingContext={ListingContext} />}
                </div>
            </div>
        </>
    )
}

