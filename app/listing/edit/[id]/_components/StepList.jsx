"use Client"

import { useContext } from 'react'

import { Separator } from '@/components/ui/separator'
import { ListingContext } from '../layout'

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
export default function StepList({ userData, setStep ,requiredInformations }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    console.log(    'required',requiredInformations)
    return (
        <div className='w-[350px] pt-[100px] flex flex-col items-start px-6 h-full ml-[100px]'>
            <p className='text-[32px]'>Listing Details</p>
            <Separator className='mb-2' />
            {
                editSteps.map((step) => {

                    if (userData.userType == 2 && step.id == "Business") {
                        return undefined
                    }

                    if (listingProperties.sub_category == 4 && step.id == "Discounts") {
                        return undefined
                    }

                    if (listingProperties.sub_category != 9 && step.id == "Building Assets") {
                        return undefined
                    }
                    return (

                        <p key={step.id} onClick={() => {
                            setListingProperties(prev => ({ ...prev, selectedStep: step.id }))
                            setStep(step.url)
                        }}
                            className={`w-full mt-1 flex items-center  border-2 p-2 rounded-lg  cursor-pointer ${listingProperties.selectedStep == step.id ? 'bg-black text-[#FCD33B] hover:bg-black' : 'hover:bg-slate-300'} ${requiredInformations.includes(step.id) ? 'border-red-700 bg-white text-black hover:bg-slate-300' : 'border-transparent'}`}>{step.id}</p>
                    )
                })
            }
        </div>
    )
}
