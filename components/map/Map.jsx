"use client"
import React, { useState, useContext, useCallback } from 'react'
import MarketPlaceGrid from '../market place/marketPlaceGrid/MarketPlaceGrid';
import loading from '../../public/loading.gif'
import Image from 'next/image';
import RatingComponent from '../rating/RatingComponent';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapCoordinatesContext } from '@/app/market-place/page';
import { formatPrice } from '@/utils/format';
import { MapPin } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '91vh'
};


function Map({ newData, isDataLoaded, located, availableSellers }) {
  const libraries = ["places"]
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedPersonMarker, setSelectedPersonMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    libraries: libraries,
  })
  const [map, setMap] = useState(null)
  const [coords] = useContext(MapCoordinatesContext)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  const handlePersonMarkerClick = (marker) => {
    setSelectedPersonMarker(marker);
  };
  const handlePersonMarkerClose = (marker) => {
    setSelectedPersonMarker(null);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (

    <div className='w-full h-[100vh]'>
      <div className={`h-[100%] fixed  left-0 w-full lg:w-[60%]`}>
        <MarketPlaceGrid newData={newData} isDataLoaded={isDataLoaded} located={located} />
      </div>
      <div className='h-[100%] hidden lg:fixed right-0  lg:flex justify-center items-center w-[40%] mt-[45px]  '>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={15}
          onLoad={map => setMap(map)}
          onUnmount={onUnmount}
        >
          <Marker position={coords}
            map={map}
            icon={{
              url: '/mylocation.ico',
            }} />

          {newData.map((marker) => {

            return (

              <Marker key={marker.id}

                className='h-4'
                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.long) }}
                map={map}
                // onMouseOver={() => onOpenChange(true)}
                onClick={() => handleMarkerClick(marker)}

                icon={{
                  url: marker.status == 1 ? '/greenPin.ico' : '/redPin.ico',
                }}
              />
            )

          })}
          {availableSellers.map((marker) => {

            return (

              <Marker key={marker.id}

                className='h-4'
                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.long) }}
                map={map}
                onClick={() => handlePersonMarkerClick(marker)}
                icon={{
                  url: '/person.ico',
                }}
              />
            )

          })}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.long) }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className='w-[240px] p-0'>
                <Image
                  src={selectedMarker.image[0].data_url}
                  alt="Adex item"
                  id='image-loaded'
                  width={2000}
                  height={2000}
                  className={`rounded-[8px] w-full h-[100px] object-cover `}
                />
                <div className='mt-2'>
                  <p className='text-[15px] font-[600]'>{selectedMarker.title}</p>
                  <div className='flex gap-1 mt-1'>
                    <MapPin size={14} color='gray' />
                    {
                      selectedMarker.address ? (
                        <p className='text-[12px] text-gray-500 line-clamp-2'>{selectedMarker.address}</p>
                      ) : (
                        <p className='text-[12px] text-gray-500 line-clamp-2'>Online Asset</p>
                      )
                    }
                  </div>
                  <div className='w-full flex justify-between mt-3'>
                    <p className='text-[16px] font-[600]' >{formatPrice(selectedMarker.price)}</p>
                    <div className="flex items-center justify-start">
                      <RatingComponent readOnly={true} size='small' rating={selectedMarker.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
          {selectedPersonMarker && (
            <InfoWindow
              position={{ lat: parseFloat(selectedPersonMarker.lat), lng: parseFloat(selectedPersonMarker.long) }}
              onCloseClick={handlePersonMarkerClose}
            >
              <div className='w-[240px] p-0'>
              <p>{selectedPersonMarker.user_type == '1' ?  'This seller is looking to use their personal asset' : 'This seller is looking to be leveraged to advertise assets'}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  ) : <div className='w-full flex justify-center items-center h-[100vh]'>
    <Image
      src={loading}
      alt="loading"
      width={50}
      height={50}
      priority
    />
  </div>
}

export default Map

