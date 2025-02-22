import { useContext, useState } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';
import TextField from '../inputs/TextField';
import DropImageArea from '../dropImageArea/DropImageArea';

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
    const handleInstructions = (instructions) => {
        setListingProperties({ ...listingProperties, instructions: instructions })
    }
    const handleImages = (images) => {
        setListingProperties((prev) => ({ ...prev, images: images }))
    }
    return (
        <div className='w-full flex flex-col items-center gap-2'>
            <h1 className='text-[28px] md:text-[32px]'>Campaign Details</h1>
            <div className='w-full sm:w-[500px] md:w-[650px]'>
                <div className='mt-4 w-full'>
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
            <div className='w-full sm:w-[500px] md:w-[650px]'>
                <h1 className='text-[28px]'>Description</h1>
                <TextAreaEditor
                    value={listingProperties.description}
                    onChange={(description) => handleDescription(description)}
                />
            </div>
            <div className='w-full sm:w-[500px] md:w-[650px] mt-[80px]'>
                <h1 className='text-[28px]'>Instructions</h1>
                <TextAreaEditor
                    value={listingProperties.instructions}
                    onChange={(instructions) => handleInstructions(instructions)}
                />
            </div>
            <div className='w-full sm:w-[500px] md:w-[650px] h-full mt-[80px] min-h-[500px]'>
                <h1 className='text-[28px] md:text-[32px]'>Pick some photos</h1>
                <DropImageArea
                    images={listingProperties.images}
                    setImages={(image) => handleImages(image)}
                />
            </div>
        </div>
    )
}
