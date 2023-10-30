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
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext, MachineStatesContext } from '../layout'
import { checkCategoryType } from '@/utils/checkCategoryType'
import { listingMachine } from '@/utils/listingStatesmachine'
import BusinessForm from '@/components/forms/BusinessForm'


const requiredFields = ['category', 'sub_category', 'title', 'location', 'description', 'price', 'date', 'images']

export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [stateMachine, setStateMachine] = useContext(MachineStatesContext)
    const [required, setRequired] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [isDraftPending, setIsDrafPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    const [userData, setUserData] = useState({});
    const [importFromGallery, setImportFromGallery] = useState(false);

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
    const handleNext = () => {
        let nextRoute = listingMachine.states[stateMachine.currentState].NEXT
        const isValid = listingMachine.states[nextRoute].ISVALID
        if (!isValid) {
            nextRoute = validRoute(nextRoute, 'NEXT')
        }
        router.push(`/listing/${nextRoute}`)
        setStateMachine((prev) => ({ ...prev, currentState: nextRoute, currentStep: stateMachine.currentStep + 1 }))
        controlSteps()
    }

    const handlePrevious = () => {
        let nextRoute = listingMachine.states[stateMachine.currentState].PREVIOUS

        const isValid = listingMachine.states[nextRoute].ISVALID

        if (!isValid) {
            nextRoute = validRoute(nextRoute, 'PREVIOUS')
        }
        router.push(`/listing/${nextRoute}`)
        setStateMachine((prev) => ({ ...prev, currentState: nextRoute, currentStep: stateMachine.currentStep - 1 }))
        controlSteps()
    }

    const validRoute = (url, direction) => {
        let validRoute

        switch (url) {
            case 'building_assets':

                if (listingProperties.sub_category == 9) {
                    validRoute = url;
                } else {
                    validRoute = listingMachine.states[url][direction];
                }

                break;

            case 'discounts':

                if (advertisementType == 1) {
                    validRoute = listingMachine.states[url][direction];
                } else {
                    validRoute = url;
                }

                break;
            case 'date':

                if (advertisementType == 1) {
                    validRoute = url;
                } else {
                    validRoute = listingMachine.states[url][direction];
                }

                break;
            default:
                validRoute = url;
                break;
        }
        return validRoute
    }

    //control the amount of steps,depends of the user sub category choice and type of user
    const controlSteps = () => {

        if (userData.userType == 2) {
            //for individual user,have 1 less step
            if (step === 'sub_category' && stateMachine.totalSteps == 10 && listingProperties.sub_category != 9) {
                setStateMachine((prev) => ({ ...prev, totalSteps: 9 }))
            } else if (step === 'sub_category' && stateMachine.totalSteps == 9 && listingProperties.sub_category == 9) {
                setStateMachine((prev) => ({ ...prev, totalSteps: 10 }))
            }
        } else {
            if (step === 'sub_category' && stateMachine.totalSteps == 11 && listingProperties.sub_category != 9) {
                setStateMachine((prev) => ({ ...prev, totalSteps: 10 }))
            } else if (step === 'sub_category' && stateMachine.totalSteps == 10 && listingProperties.sub_category == 9) {
                setStateMachine((prev) => ({ ...prev, totalSteps: 11 }))
            }
        }
    }

    const createListing = (isDraft) => {
        if (isDraft) {
            setIsDrafPending(true)
        } else {
            setIsPending(true)
        }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/${isDraft ? 'draft' : 'new'}`,
            {

                title: listingProperties.title,
                description: listingProperties.description,
                price: listingProperties.price,
                category_id: listingProperties.sub_category,
                images: listingProperties.images,
                address: listingProperties.location,
                lat: listingProperties.latitude,
                long: listingProperties.longitude,
                ad_duration_type: advertisementType,
                sub_asset_type: listingProperties.building_asset,
                per_unit_price: advertisementType ? 2 : listingProperties.price,
                discounts: listingProperties.discounts,
                company_id: selectedCompany,
                importFromGallery: importFromGallery,
                start_date: listingProperties.date,
                company_id: listingProperties.selected_company,
                discounts:listingProperties.discounts
            }, {
            withCredentials: true,
        })
            .then(function (response) {

                if (isDraft) {
                    router.push('/')
                    toast.success('Draft successfully saved!')
                    setIsDrafPending(false)
                } else {
                    router.push('/my-profile?tab=5')
                    toast.success('Listing created successfully!')
                    setIsPending(false)
                }

            })
            .catch(function (error) {

                console.log(error)
                toast.error('Something went wrong!')
                setIsPending(false)
                setIsDrafPending(false)

            })
    }
    return (
        <>
            <Toaster />
            <div className='h-[80px] border  flex items-center justify-between px-8 fixed top-0 w-full'>
                <div className='flex gap-2'>
                    <ClipboardList />
                    <p className='font-[600]'>{listingProperties.isDraft ? 'Finish Your Listing' : 'Create Your Listing'}</p>
                </div>
                <Button disabled={isDraftPending} variant='outline' onClick={() => createListing(true)} className='flex gap-2 items-center'>
                    {
                        isDraftPending && (
                            <Loader2 size={18} className='animate-spin' />
                        )
                    }
                    Save & Exit
                </Button>
            </div>
            <div className={` w-full h-[calc(100vh-200px)] mt-[80px] py-4 flex flex-col items-center justify-center `}>
                {/* form div */}
                <div className='w-full  px-6 h-full flex justify-center pt-[100px]'>
                    {step === 'select_business' && <BusinessForm />}
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
                <Progress value={(stateMachine.currentStep / stateMachine.totalSteps) * 100} className='w-full rounded-none h-[10px] animate-in' />
                <div className='mt-4 w-full md:w-[600px] flex justify-between px-6'>
                    <Button disabled={userData.userType == 2 && step === 'category' || isDraftPending} onClick={handlePrevious} variant='outline' className='flex gap-2'>
                        <ChevronLeft size={18} />
                        Back
                    </Button>
                    <Button disabled={required || isPending || isDraftPending} onClick={step === 'preview' ? () => createListing(false) : handleNext} variant='default' className='flex gap-2 items-center'>
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

