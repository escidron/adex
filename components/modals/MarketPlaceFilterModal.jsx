"use client"

import PriceSlider from '../slider/PriceSlider';
import qs from "query-string";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";

import { useContext, useState } from 'react'
import { MapCoordinatesContext } from '@/app/market-place/page';
import { NewSearchAddress } from '../placesAutocomplete/NewSearchAddress';

const radiusValues = [100, 500, 1000, 2000]
const typesValues = [{ id: 1, label: 'Person' }, { id: 2, label: 'Place' }, { id: 3, label: 'Thing' }, { id: 4, label: 'Online Assets' }]

export default function MarketPlaceFilterModal() {
    const [filters, setFilters] = useState([]);
    const [coords, setCoords] = useContext(MapCoordinatesContext)

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const radius = searchParams.get("radius");
    const adGroup = searchParams.get("adGroup");
    const type = searchParams.get("type");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const key = searchParams.get("key");
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    const onClick = (field, value) => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                radius: field == 'radius' ? (value == radius ? null : value) : radius,
                adGroup: field == 'adGroup' ? (value == adGroup ? null : value) : adGroup,
                type: field == 'type' ? (value == type ? null : value) : type,
                priceMin: field == 'price' ? value.priceMin : null,
                priceMax: field == 'price' ? value.priceMax : null,
                key: key,
                latitude:field == 'coords' ? value.lat : latitude,
                longitude:field == 'coords' ? value.lng : longitude
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);

    };


    const handleCoords = (coords) => {
        onClick('coords',coords)
        setCoords(coords)
    }

    console.log('filtering',adGroup)
    return (
        <>

            <div className='bg-white rounded-xl'>

                <div className='flex flex-col items-center'>
                    <div className='md:px-[20px] flex flex-col items-center  gap-6 w-full'>
                        <MapCoordinatesContext.Provider value={[coords, setCoords]}>
                            <div onClick={(e) => { e.stopPropagation() }} className="z-[99] w-full border rounded-lg outline-none  flex items-center shadow-sm">
                                <NewSearchAddress
                                    setSelected={(coords) => handleCoords(coords)}
                                />
                            </div>
                        </MapCoordinatesContext.Provider>

                        <div className='w-full flex flex-col items-start '>
                            <label>Search radius (in miles)</label>
                            <div className='mt-2 '>
                                {
                                    radiusValues.map((item) => (
                                        <button key={item} onClick={() => onClick('radius', item)} className={`${radius == item ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>{item}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start'>
                            <label>Seller type</label>
                            <div className='flex gap-2 mt-2'>
                                <button onClick={() => onClick('adGroup', 1)} onTouchStart={() => onClick('adGroup', 1)} className={`flex items-center justify-center h-10 px-[15px] ${adGroup == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>
                                    <p className=' flex items-center'>Business</p>
                                </button>
                                <button onClick={() => onClick('adGroup', 2)} onTouchStart={() => onClick('adGroup', 2)} className={`flex items-center justify-center h-10 px-[15px] ${adGroup == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>
                                    <p className=' flex items-center'>Individual</p>
                                </button>
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start'>
                            <label>Avertisement type</label>
                            <div className='mt-2 flex justify-end'>
                                {
                                    typesValues.map((item) => (
                                        <button key={item.id} onClick={() => onClick('type', item.id)} onTouchStart={() => onClick('type', item.id)} className={`${type == item.id ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>{item.label}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start w-full'>

                        <div className='px-[20px] mt-4   '>
                            <PriceSlider
                                filters={filters}
                                setFilters={(newPrices) => setFilters(newPrices)}
                                priceMin={priceMin}
                                priceMax={priceMax}
                                onClick={(field, value) => onClick(field, value)}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
