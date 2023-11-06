import { useContext } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';

export default function DescriptionForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const handleDescription = (description) => {
        setListingProperties({ ...listingProperties, description: description })
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Description</h1>
                    <p className='text-[18px] text-gray-500'>Enter a description for your listing.</p>
                </div>
                <div className=' mt-4'>
                    <TextAreaEditor
                        value={listingProperties.description}
                        onChange={(description) => handleDescription(description)}
                    />
                </div>
            </div>
        </div>
    )
}
