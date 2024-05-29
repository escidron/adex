

import { useContext } from 'react'
import { Button } from '../ui/button';

const mediaTypes = [
    {
        id:19,//ids in the table "categories"
        label:'Social Media'
    },
    {
        id:20,
        label:'Audio Podcast'
    },
    {
        id:21,
        label:'Video Podcast'
    },
    {
        id:22,
        label:'Video Content'
    },
    {
        id:23,
        label:'Website'
    }
]
export default function MediaTypesForm({ ListingContext }) {

    const [listingProperties, setListingProperties] = useContext(ListingContext)
    
    const handleSelect = (index) => {
        setListingProperties({ ...listingProperties, media_types: index })
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>

                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Media Types</h1>
                    <p className='text-[18px] text-gray-500'>What type of content do you provide?</p>
                </div>
                <div className=' mt-8 flex gap-2'>
                    {
                        mediaTypes.map((item)=>(
                            <Button onClick={()=>handleSelect(item.id)} key={item.id} className={`${listingProperties.media_types == item.id ? 'bg-[#FCD33B] text-black hover:bg-[#FCD33B] hover:opcacity-80' : 'bg-black text-white'} `}>
                                {item.label}
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

