"use client"
import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios';
import Map from '@/components/map/Map';
import { useRouter } from 'next/navigation';
import haversine_distance from '@/utils/haversine_distance';
import toast, { Toaster } from "react-hot-toast";

export const MapCoordinatesContext = createContext();
export const FilterContext = createContext();


export default function MarketPlace() {
  const [newData, setNewData] = useState([]);
  const [located, setLocated] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coords, setCoords] = useState({
    lat:  39.8283,
    lng: -98.5795
  });
  const [adFilter, setAdFilter] = useState({
    radius: 50,
    type: '',
    adGroup: '',
    priceMin: 0,
    priceMax: 1000000
  });
  const router = useRouter();
  useEffect(() => {
    if (located) {
      async function getAds() {
        setNewData([])
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements`,
          {
            radius: adFilter.radius,
            type: adFilter.type,
            adGroup: adFilter.adGroup,
            priceMin: adFilter.priceMin,
            priceMax: adFilter.priceMax,
          }, {
          withCredentials: true,
          headers: {
            'content-type': 'application/json'
          }
        }
        );
        if (response.status === 200) {
          response.data.data.map((ad) => {
            // Calculate  the distance between markers
            var distance = haversine_distance(coords, { lat: ad.lat, lng: ad.long });

            if (distance < adFilter.radius) {
              setNewData((prevData) => [...prevData, ad])
            }
          })
          setIsDataLoaded(true)
        } else {
          router.push('/')
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


  }, [located, coords, adFilter]);

  
  return (

    <div className=' w-full flex absolute top-0 h-[100%]' >
      <div><Toaster /></div>
      <MapCoordinatesContext.Provider value={[coords, setCoords]}>
        <FilterContext.Provider value={[adFilter, setAdFilter]}>
          <Map newData={newData} isDataLoaded={isDataLoaded} />
        </FilterContext.Provider>
      </MapCoordinatesContext.Provider>

    </div>

  )
}
