import PlacesAutocomplete from '../placesAutocomplete/PlacesAutocomplete';

import { useContext, useState } from 'react'
import { MapCoordinatesContext } from '@/app/market-place/page';

export default function LocationForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [coords, setCoords] = useState({
        lat: -3.745,
        lng: -38.523
    });
    const handleAddress = (address) => {
        setListingProperties((prev) => ({ ...prev, location: address }))
    }
    const handleCoords = (coords) => {
        setListingProperties((prev) => ({ ...prev, longitude: coords.lng, latitude: coords.lat }))
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full sm:w-[500px]'>
                <div className='flex flex-col'>
                    <h1 className='text-[32px]'>Location</h1>
                    <p className='text-[18px] text-gray-500'>Enter a the location</p>
                </div>
                <div className=' mt-4'>
                    <MapCoordinatesContext.Provider value={[coords, setCoords]}>
                        <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center shadow-sm">
                            <PlacesAutocomplete
                                setSelected={(coords) => handleCoords(coords)}
                                setAddress={(ad) => handleAddress(ad)}
                                currentLocation={listingProperties.location}
                            />
                        </div>
                    </MapCoordinatesContext.Provider>
                </div>
            </div>
        </div>
    )
}
