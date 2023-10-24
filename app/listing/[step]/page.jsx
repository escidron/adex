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

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ClipboardList, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { listingURL } from '@/utils/ListingURLs'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext } from '../layout'
import { checkCategoryType } from '@/utils/checkCategoryType'

const requiredFields = ['category','sub_category','title', 'location', 'description', 'price', 'date', 'images']

export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [required, setRequired] = useState(false);
    const [totalSteps, setTotalSteps] = useState(10);
    const [isPending, setIsPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')

    const step = params.step
    const router = useRouter();


    useEffect(() => {
        if (requiredFields.includes(step)) {
            
            if (!listingProperties[step] || listingProperties[step].length == 0) {
                setRequired(true)
            } else {
                setRequired(false)
            }
        }

        const categoryType = checkCategoryType(listingProperties.sub_category)
        setAdvertisementType(categoryType)
    }, [listingProperties, step]);

    const nextStep = () => {

        let currentIndex = listingURL.findIndex(item => item.url === step);

        if (currentIndex !== -1 && currentIndex < listingURL.length - 1) {
            console.log('advertisementType',advertisementType)
            if ((step === 'price' && advertisementType == 1) ||
                step === 'discounts' ||
                (step === 'sub_category' && listingProperties.sub_category != 9)) {
                currentIndex += 1
            }

            router.push(`/listing/${listingURL[currentIndex + 1].url}`)
            setListingProperties((prev) => ({ ...prev, currentStep: currentIndex + 1}))

        }

    }
    const previusStep = () => {
        let currentIndex = listingURL.findIndex(item => item.url === step);
        console.log('prev', advertisementType)
        if (currentIndex > 0) {
            if ((step === 'date' && advertisementType == 1) ||
                (step === 'images' && advertisementType != 1) ||
                (step === 'title' && listingProperties.sub_category != 9)) {
                currentIndex -= 1
            }

            router.push(`/listing/${listingURL[currentIndex - 1].url}`)
            setListingProperties((prev) => ({ ...prev, currentStep: currentIndex - 1 }))
        }
    }

    const createListing = () => {
        setIsPending(true)
        axios.post(`https://test.adexconnect.com/api/advertisements/new`,
            {

                title: listingProperties.title,
                description: listingProperties.description,
                price: listingProperties.price,
                category_id: listingProperties.category,
                images: listingProperties.images,
                address: listingProperties.location,
                lat: listingProperties.latitude,
                long: listingProperties.longitude,
                ad_duration_type: advertisementType,
                sub_asset_type: listingProperties.building_asset,
                per_unit_price: advertisementType ? 2 : listingProperties.price,
                discounts: listingProperties.discounts,
                company_id: selectedCompany,
                // importFromGallery: importFromGallery,
                start_date: listingProperties.date
            }, {
            withCredentials: true,
        })
            .then(function (response) {


                router.push('/my-profile?tab=5')
                toast.success('Listing edited successfully!')
                
                setIsPending(false)
            })
            .catch(function (error) {
                
                console.log(error)
                toast.error('Something went wrong!')
                setIsPending(false)

            })
    }
    return (
        <>
            <Toaster />
            <div className='h-[80px] border  flex items-center justify-between px-8 fixed top-0 w-full'>
                <div className='flex gap-2'>
                    <ClipboardList />
                    <p className='font-[600]'>Create Your Listing</p>
                </div>
                <Button variant='outline'>Save & Exit</Button>
            </div>
            <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex flex-col items-center justify-center `}>
                {/* form div */}
                <div className='w-full max-w-[800px] px-6 h-full flex justify-center pt-[100px]'>
                    {step === 'category' && <CategoryForm />}
                    {step === 'sub_category' && <SubCategoryForm />}
                    {step === 'building_assets' && <BuildingAssetsForm />}
                    {step === 'title' && <TitleForm />}
                    {step === 'location' && <LocationForm />}
                    {step === 'description' && <DescriptionForm />}
                    {step === 'price' && <PriceForm />}
                    {step === 'discounts' && <DiscountsForm />}
                    {step === 'date' && <DateForm />}
                    {step === 'images' && <PhotosForm />}
                    {step === 'preview' && <PreviewForm />}
                </div>
            </div>
            <div className='h-[120px] flex flex-col items-center fixed bottom-0 w-full '>
                <Progress value={(listingProperties.currentStep / totalSteps) * 100} className='w-full rounded-none h-[10px]' />
                <div className='mt-4 w-full md:w-[600px] flex justify-between px-6'>
                    <Button onClick={previusStep} variant='outline' className='flex gap-2'>
                        <ChevronLeft size={18} />
                        Back
                    </Button>
                    <Button disabled={required || isPending} onClick={step === 'preview' ? createListing : nextStep} variant='default' className='flex gap-2 items-center'>
                        {
                            isPending && (
                                <Loader2 size={18} className='animate-spin' />
                            )
                        }
                        {step === 'preview' ? 'Create' : 'Next'}
                    </Button>
                </div>
            </div>
        </>
    )
}

