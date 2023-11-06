

import { useContext } from 'react'
import { Button } from '../ui/button';

const buildingParts = [
    {
        id:13,//ids in the table "categories"
        label:'Window'
    },
    {
        id:14,
        label:'Door'
    },
    {
        id:15,
        label:'Interior Wall'
    },
    {
        id:16,
        label:'Exterior Wall'
    }
]
export default function BuildingAssetsForm({ ListingContext }) {

    const [listingProperties, setListingProperties] = useContext(ListingContext)
    
    const handleSelect = (index) => {
        setListingProperties({ ...listingProperties, building_asset: index })
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>

                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Building Assets</h1>
                    <p className='text-[18px] text-gray-500'>Wich part of the build do you want to advertise.</p>
                </div>
                <div className=' mt-8 flex gap-2'>
                    {
                        buildingParts.map((item)=>(
                            <Button onClick={()=>handleSelect(item.id)} key={item.id} className={`${listingProperties.building_asset == item.id ? 'bg-[#FCD33B] text-black hover:bg-[#FCD33B] hover:opcacity-80' : 'bg-black text-white'} `}>
                                {item.label}
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
