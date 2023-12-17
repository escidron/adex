

import { useContext } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';
import InstructionNote from './notes/InstructionNote';


export default function InstructionsForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleInstructions = (instructions) => {
        setListingProperties({ ...listingProperties, instructions: instructions })
    }
    return (
        <div className='w-full flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-start max-w-[1000px] mx-auto'>
            <div className=' lg:hidden '>
                <InstructionNote />
            </div>
            <div className='w-full sm:w-[500px] mt-6'>
                <div className='flex flex-col'>
                    <div className='flex gap-1 items-end'>
                        <h1 className='text-[32px]'>Instructions</h1>
                        <p className='mb-2 text-[14px]'>{`(optional)`}</p>
                    </div>
                </div>
                <div className=' mt-4'>
                    <TextAreaEditor
                        value={listingProperties.instructions}
                        onChange={(instructions) => handleInstructions(instructions)}
                    />
                </div>
            </div>
            <div className='hidden lg:flex '>
                <InstructionNote />
            </div>
        </div>
    )
}
