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
import TopBar from './_components/TopBar'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext } from './layout'
import { Separator } from '@/components/ui/separator'
import StepList from './_components/StepList'
import GetUserProfile from '@/actions/GetUserProfile'
import GetCategories from '@/actions/GetCategories'
import GetDiscounts from '@/actions/GetDiscounts'
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'
import ListDetailsSkeleton from './_components/ListDetailsSkeleton'
import FormSkeleton from './_components/FormSkeleton'
import Footer from '@/components/footer/Footer'
import { checkCategoryType } from '@/utils/checkCategoryType'


const requiredFields = ['select_business', 'category', 'sub_category', 'title', 'location', 'description', 'price', 'images']



export default function EditListing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [isPending, setIsPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    const [userData, setUserData] = useState('');
    const [step, setStep] = useState('category');
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [requiredInformations, setRequiredInformations] = useState([]);

    const router = useRouter();


    const id = params.id
    useEffect(() => {

        async function getInfo() {
            const userData = await GetUserProfile()
            setUserData(userData)
            if(userData.userType == 1){
                setStep('select_business')
            }
            const myListing = await GetMyAdvertisement(id)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)
            if (myListing) {
                const categoryType = checkCategoryType(myListing.category_id)
                setListingProperties((prev) => ({
                    ...prev,
                    selectedStep: userData?.userType == 2 ? 'Category' : 'Business',
                    sub_category: myListing.category_id,
                    ad_duration_type:categoryType,
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
                    otherListingType:myListing.ad_duration_type
                }));
            }
            if (categories && myListing) {

                categories.map((category) => {
                    if (category.id == myListing.category_id) {
                        setListingProperties((prev) => ({
                            ...prev,
                            category: category.parent_id,
                        }));
                    }
                });
            }
            if (discounts) {

                setListingProperties((prev) => ({
                    ...prev,
                    discounts: discounts,
                }));
            }
            setIsContentLoaded(true)
        }
        getInfo();

    }, []);

    const checkPendingInformations = () => {
        let pendingInformations = false
        //manage the logic for required fields
        
        if (!listingProperties.title) {
            pendingInformations = true
            if (!requiredInformations.includes('Title')) {
                setRequiredInformations(prev => ([...prev, 'Title']))
            }
        } else {
            if (requiredInformations.includes('Title')) {
                const newRequiredInformations = requiredInformations.filter(item => item != "Title")
                setRequiredInformations(newRequiredInformations)
            }
        }

        if (listingProperties.description.length < 12) {
            pendingInformations = true
            if (!requiredInformations.includes('Description')) {
                setRequiredInformations(prev => ([...prev, 'Description']))
            }
        }else {
            if (requiredInformations.includes('Description')) {
                const newRequiredInformations = requiredInformations.filter(item => item != "Description")
                setRequiredInformations(newRequiredInformations)
            }
        }

        if (!listingProperties.price) {
            pendingInformations = true
            if (!requiredInformations.includes('Description')) {
                setRequiredInformations(prev => ([...prev, 'Price']))
            }
        }else {
            if (requiredInformations.includes('Price')) {
                const newRequiredInformations = requiredInformations.filter(item => item != "Price")
                setRequiredInformations(newRequiredInformations)
            }
        }

        if (listingProperties.images.length == 0) {
            pendingInformations = true
            if (!requiredInformations.includes('Description')) {
                setRequiredInformations(prev => ([...prev, 'Photos']))
            }
        }else {
            if (requiredInformations.includes('Photos')) {
                const newRequiredInformations = requiredInformations.filter(item => item != "Photos")
                setRequiredInformations(newRequiredInformations)
            }
        }

        return pendingInformations
    }
    
    const editListing = () => {
        setIsPending(true)

        const pendingInformations = checkPendingInformations()

        if (!pendingInformations) {
            const categoryType = checkCategoryType(listingProperties.sub_category)

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
                    ad_duration_type: listingProperties.otherListingType ? listingProperties.otherListingType : categoryType,
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
        } else {
            toast.error('Missing Required Informations')
            setIsPending(false)
        }
    }

    return (
        <>
            <Toaster />
            <TopBar isPending={isPending} editListing={() => editListing()} />
            <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex items-center justify-center `}>
                {
                    isContentLoaded ? (

                        <StepList
                            setStep={(newStep) => setStep(newStep)}
                            userData={userData}
                            requiredInformations={requiredInformations}
                        />
                    ) : (
                        <ListDetailsSkeleton />
                    )
                }

                {
                    isContentLoaded ? (
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
                    ) : (
                        <FormSkeleton />
                    )
                }

            </div>
        </>
    )
}

