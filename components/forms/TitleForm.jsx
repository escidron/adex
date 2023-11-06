
import TextField from '../inputs/TextField'

import {useContext} from 'react'

export default function TitleForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleTitle = (title)=>{
        setListingProperties({...listingProperties,title:title})
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Title</h1>
                    <p className='text-[18px] text-gray-500'>Enter a descriptive title for your listing.</p>
                </div>
                <div className=' mt-4'>
                    <TextField
                        autoFocus={true}
                        id='title'
                        label='Title'
                        onChange={(e) =>handleTitle(e.target.value)}
                        onBlur={() => { }}
                        value={listingProperties.title}
                    />
                </div>
            </div>
        </div>
    )
}
