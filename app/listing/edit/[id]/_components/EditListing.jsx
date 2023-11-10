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
import TopBar from './TopBar'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext } from '../layout'
import { Separator } from '@/components/ui/separator'
import StepList from './StepList'


const requiredFields = ['select_business', 'category', 'sub_category', 'title', 'location', 'description', 'price', 'images']



export default function EditListing({ userData, myListing,categories,discounts }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [isPending, setIsPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    const [step, setStep] = useState('category');
    const router = useRouter();
    
    
    useEffect(() => {
        console.log('listing',myListing)
        console.log('userData',userData)
        console.log('categories',categories)
        console.log('discounts',discounts)
        if (myListing) {
            setListingProperties((prev) => ({
                ...prev,
                selectedStep: userData?.userType == 2 ? 'Category' : 'Business',
                sub_category: myListing.category_id,
                title: myListing.title,
                location: myListing.address,
                latitude: myListing.lat,
                longitude: myListing.long,
                description: myListing.description,
                price: myListing.price,
                date: {
                    from: myListing.start_date,
                    to: myListing.end_date,
                },
                first_available_date: myListing.first_available_date,
                images: myListing.image,
                select_business: myListing.company_id,
                instructions: myListing.instructions,
                building_asset: myListing.sub_asset_type,
            }));
        }
        if(categories && myListing){

            categories.map((category) => {
              if (category.id == myListing.category_id) {
                setListingProperties((prev) => ({
                  ...prev,
                  category: category.parent_id,
                }));
              }
            });
        }
        if(discounts){

            setListingProperties((prev) => ({
                ...prev,
                discounts: discounts,
              }));
        }
    }, [myListing,userData,discounts,categories]);

    const editListing = () => {
        setIsPending(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/update`,
            {
                id: myListing.id,
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


    return (
        <>
            <Toaster />
            <TopBar isPending={isPending} editListing={()=>editListing()} />
            <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex items-center justify-center `}>
                <StepList 
                    setStep={(newStep)=>setStep(newStep)}
                    userData={userData}
                />
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

