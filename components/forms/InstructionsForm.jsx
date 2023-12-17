

import { useContext } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function InstructionsForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleInstructions = (instructions) => {
        setListingProperties({ ...listingProperties, instructions: instructions })
    }
    return (
        <div className='w-full flex flex-col items-center lg:flex-row lg:justify-around lg:items-start max-w-[1000px] mx-auto'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <div className='flex gap-1 items-end'>
                        <h1 className='text-[32px]'>Instructions</h1>
                        <p className='mb-2 text-[14px]'>{`(optional)`}</p>
                    </div>
                    <p className='text-[18px] text-gray-500'>Provide logistical information for the buyers</p>
                </div>
                <div className=' mt-4'>
                    <TextAreaEditor
                        value={listingProperties.instructions}
                        onChange={(instructions) => handleInstructions(instructions)}
                    />
                </div>
            </div>
            <Card className='w-full mt-[150px] max-w-[450px] h-[150px] lg:mt-[90px]'>
                <CardHeader>
                    <CardTitle className='flex gap-2 items-center'>
                        <div className='w-[50px]'>
                            <Image
                                src='/note.png'
                                alt="note icon"
                                priority
                                width={2000}
                                height={2000}
                                className='w-full'

                            />
                        </div>
                        Instructions 
                    </CardTitle>
                    <CardDescription>As needed, provide instructions for buyers such as ad drop location, other logistical details, or simply tell buyers to message you with questions. </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
