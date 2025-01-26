import { useContext, useState } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';
import TextField from '../inputs/TextField';

export default function CampaignDetailsForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const [counter, setCounter] = useState(0);
    const handleTitle = (title) => {
        setCounter(title.length)
        setListingProperties({ ...listingProperties, title: title })
    }
    const handleDescription = (description) => {
        //quill component render this when is empty
        if (description == '<p><br></p>') {
            setListingProperties({ ...listingProperties, description: '' })
        } else {
            setListingProperties({ ...listingProperties, description: description })
        }
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <h1 className='text-[28px] md:text-[32px]'>Campaign Details</h1>
            <div className='w-full sm:w-[500px] '>
                <div className='mt-4 w-full max-w-[500px]'>
                    <h1 className='text-[28px]'>Title</h1>
                    <TextField
                        autoFocus={true}
                        id='title'
                        label=''
                        onChange={(e) => handleTitle(e.target.value)}
                        onBlur={() => { }}
                        value={listingProperties.title}
                        maxLength={30}
                    />
                    <div className='w-full flex justify-end'>

                        <p className={`font-[500] ${counter == 30 && 'text-red-600'}`}>{counter}/30</p>
                    </div>
                </div>
            </div>
            <div className='w-full sm:w-[500px]'>
                <h1 className='text-[28px]'>Description</h1>
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
