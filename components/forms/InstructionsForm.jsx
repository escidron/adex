
import TextField from '../inputs/TextField'

import { useContext } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';

export default function InstructionsForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleInstructions = (instructions) => {
        setListingProperties({ ...listingProperties, instructions: instructions })
    }
    return (
        <div className='w-full flex flex-col items-center'>
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
        </div>
    )
}
