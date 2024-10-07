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
import GetPayoutMethod from '@/actions/getPayoutMethod'
import debounce from 'debounce';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ClipboardList, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { ListingContext, MachineStatesContext } from '../layout'
import { checkCategoryType } from '@/utils/checkCategoryType'
import { reverseListingMachine } from '@/utils/reverseListingStateMachine'
import MediaTypesForm from '@/components/forms/MediaTypesForm'
import PreviewReverseListing from '../_components/PreviewReverseListing'


const requiredFields = ['select_business', 'category', 'sub_category', 'media_types', 'location', 'description']

export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [stateMachine, setStateMachine] = useContext(MachineStatesContext)
    const [required, setRequired] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [advertisementType, setAdvertisementType] = useState('')
    const [userData, setUserData] = useState({});
    const step = params.step
    const router = useRouter();

    useEffect(() => {
        if (requiredFields.includes(step)) {
            if (!listingProperties[step] || listingProperties[step].length == 0) {
                setRequired(true)
            } else {
                if (step == 'price' && listingProperties.sub_category == 7) {
                    if (!listingProperties.digitalPriceType) {
                        setRequired(true)
                    } else {
                        setRequired(false)
                    }
                } else {
                    setRequired(false)
                }
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
    }, [listingProperties.select_business]);

    const handleNext = debounce(() => {
        setIsPending(true)
        let force = false
        let nextRoute = reverseListingMachine.states[stateMachine.currentState].NEXT
        let isValid = reverseListingMachine.states[nextRoute].ISVALID

        while (!isValid && !force) {
            ({ nextRoute, force } = validRoute(nextRoute, 'NEXT'))

            isValid = reverseListingMachine.states[nextRoute].ISVALID
            force = force
        }
        router.push(`/reverse-listing/create/${nextRoute}`)
        setStateMachine((prev) => ({ ...prev, currentState: nextRoute, currentStep: stateMachine.currentStep + 1 }))
        controlSteps()
        setIsPending(false)


    }, 200)

    const handlePrevious = debounce(() => {
        setIsPending(true)
        let force = false
        let nextRoute = reverseListingMachine.states[stateMachine.currentState].PREVIOUS
        let isValid = reverseListingMachine.states[nextRoute].ISVALID

        while (!isValid && !force) {
            ({ nextRoute, force } = validRoute(nextRoute, 'PREVIOUS'))

            isValid = reverseListingMachine.states[nextRoute].ISVALID
            force = force
        }
        router.push(`/reverse-listing/create/${nextRoute}`)
        setStateMachine((prev) => ({ ...prev, currentState: nextRoute, currentStep: stateMachine.currentStep - 1 }))
        controlSteps()
        setIsPending(false)

    }, 200)

    const validRoute = (url, direction) => {
        let nextRoute
        let force = false
        switch (url) {
            case 'building_assets':
                if (listingProperties.sub_category == 9) {
                    nextRoute = url;
                    force = true
                } else {
                    nextRoute = reverseListingMachine.states[url][direction];
                }

                break;
            case 'media_types':
                if (listingProperties.sub_category == 7) {
                    nextRoute = url;
                    force = true
                } else {
                    nextRoute = reverseListingMachine.states[url][direction];
                }

                break;
            case 'location':
                if (listingProperties.sub_category != 7) {
                    nextRoute = url;
                    force = true
                } else {
                    nextRoute = reverseListingMachine.states[url][direction];
                    //clear the location for online assets
                    setListingProperties({ ...listingProperties, location: '', longitude: 0, latitude: 0 })

                }

                break;

            case 'discounts':

                if (advertisementType == 1) {
                    nextRoute = reverseListingMachine.states[url][direction];
                } else {
                    nextRoute = url;
                    force = true
                }
                break;
            case 'date':

                if (advertisementType == 1) {
                    nextRoute = url;
                    force = true

                } else {
                    nextRoute = reverseListingMachine.states[url][direction];
                }

                break;
            default:
                nextRoute = url;
                force = true

                break;
        }
        return { nextRoute, force }
    }
    //control the amount of steps,depends of the user sub category choice and type of user
    const controlSteps = () => {
        const categoryType = checkCategoryType(listingProperties.sub_category)

        if (step === 'sub_category') {
            if (userData.userType == 2) {
                if (categoryType == 1) {
                    setStateMachine((prev) => ({ ...prev, totalSteps: 5 }))
                } else {
                    if (listingProperties.sub_category != 9) {
                        setStateMachine((prev) => ({ ...prev, totalSteps: 5 }))
                    } else {
                        setStateMachine((prev) => ({ ...prev, totalSteps: 6 }))
                    }
                }
            } else {
                if (categoryType == 1) {
                    setStateMachine((prev) => ({ ...prev, totalSteps: 5 }))
                } else {
                    if (listingProperties.sub_category != 9) {
                        setStateMachine((prev) => ({ ...prev, totalSteps: 6 }))
                    } else {
                        setStateMachine((prev) => ({ ...prev, totalSteps: 7 }))
                    }
                }
            }
            if (!listingProperties.isDraft) {
                setListingProperties({ ...listingProperties, date: '', first_available_date: "", discounts: [] })
            }
        }
        //restart this params when change the listing type
    }
    const createReverseListing = () => {

        setIsPending(true)
        
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/reverse-listing/new`,
            {
                category_id: listingProperties.sub_category,
                title: listingProperties.title,
                address: listingProperties.location,
                latitude: listingProperties.latitude,
                longitude: listingProperties.longitude,
                description: listingProperties.description,
                sub_asset_type: listingProperties.building_asset,
                media_types: listingProperties.media_types,
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                toast.success('Reverse Listing created successfully!')
                router.push('/my-profile?tab=5')
                setIsPending(false)
            })
            .catch(function (error) {
                console.log('error', error)
                toast.error(error.response.data.error)
                setIsPending(false)

            })
    }
    return (
        <div className="flex flex-col h-screen">
            <Toaster />
            <div className="bg-white p-4 h-[80px] flex justify-between items-center border shadow-sm">
                <div className='flex gap-2'>
                    <ClipboardList />
                    <p className='hidden sm:flex sm:text-[18px] font-[600]'>{listingProperties.isDraft ? 'Finish Your Listing' : 'Create Reverse Listing'}</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <Button variant='outline' disabled={isPending} onClick={() => router.push('/')} className='flex gap-2 items-center'>
                        Cancel
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 mb-[130px]">
                {step === 'category' && <CategoryForm ListingContext={ListingContext} />}
                {step === 'sub_category' && <SubCategoryForm ListingContext={ListingContext} />}
                {step === 'building_assets' && <BuildingAssetsForm ListingContext={ListingContext} />}
                {step === 'media_types' && <MediaTypesForm ListingContext={ListingContext} />}
                {step === 'location' && <LocationForm ListingContext={ListingContext} />}
                {step === 'description' && <DescriptionForm ListingContext={ListingContext} />}
                {step === 'preview' && <PreviewReverseListing ListingContext={ListingContext} />}
            </div>

            <div className="bg-white shadow-sm border text-gray-700 h-[120px] justify-end fixed bottom-0 left-0 w-full">
                <Progress value={(stateMachine.currentStep / stateMachine.totalSteps) * 100} className='w-full rounded-none h-[10px] animate-in' />
                <div className='mt-4 w-full md:w-[600px] flex justify-between px-6 mx-auto'>
                    <Button disabled={(userData.userType == 2 && step === 'category') || (userData.userType == 1 && step === 'select_business')} onClick={handlePrevious} variant='outline' className='flex gap-2'>
                        <ChevronLeft size={18} />
                        Back
                    </Button>
                    <Button disabled={required || isPending } onClick={step === 'preview' ? () => createReverseListing(false) : handleNext} variant='default' className='flex gap-2 items-center'>
                        {
                            isPending && (
                                <Loader2 size={18} className='animate-spin' />
                            )
                        }
                        {step === 'preview' ? 'Create' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>


    )
}

