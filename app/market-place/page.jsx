"use client"
import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios';
import Map from '@/components/map/Map';
import { useRouter, useSearchParams } from 'next/navigation';
import haversine_distance from '@/utils/haversine_distance';
import toast, { Toaster } from "react-hot-toast";
import GetFilteredAdvertisements from '@/actions/GetFilteredAdvertisements';

export const MapCoordinatesContext = createContext();

export default function MarketPlace() {
  const [newData, setNewData] = useState([]);
  const [located, setLocated] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coords, setCoords] = useState({
    lat:  39.8283,
    lng: -98.5795
  });

  const params = useSearchParams()
  
  const radius = params.get('radius') ? params.get('radius') : 50
  const type = params.get('type')
  const adGroup = params.get('adGroup')
  const priceMin = params.get('priceMin') ? params.get('priceMin') : 0
  const priceMax = params.get('priceMax') ? params.get('priceMax') : 1000000
  const key = params.get("key") ;


  const router = useRouter();
  useEffect(() => {
    if (located) {
      async function getAds() {
        setNewData([])
        const response = await GetFilteredAdvertisements( type, adGroup, priceMin, priceMax, key )
        if (response.length > 0 ) {
          console.log('entrou no new data')
          // Calculate  the distance between markers
          response.map((ad) => {
            var distance = haversine_distance(coords, { lat: ad.lat, lng: ad.long });
            if (distance < radius) {
              setNewData((prevData) => [...prevData, ad])
            }
          })
          setIsDataLoaded(true)
        } else {
          setNewData([])
        }
      }
      getAds();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
          setLocated(true)
        });

      } else {
        toast.dismiss()
        toast.error('Please make sure your browser has access to your location', {
          duration: 10000,
          style: {
            padding: '8px',
            fontWeight: 500
          }
        })
      }
    }


  }, [located, coords,type, adGroup, priceMin, priceMax,router,radius,key]);

  console.log('newdata',newData)
  return (

    <div className=' w-full flex absolute top-0 h-[100%]' >
      <div><Toaster /></div>
      <MapCoordinatesContext.Provider value={[coords, setCoords]}>
          <Map newData={newData} isDataLoaded={isDataLoaded} />
      </MapCoordinatesContext.Provider>

    </div>

  )
}
