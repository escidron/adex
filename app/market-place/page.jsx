"use client"
import React, { useEffect, useState, createContext, useContext, useMemo } from 'react'
import axios from 'axios';
import Map from '@/components/map/Map';
import { useRouter, useSearchParams } from 'next/navigation';
import haversine_distance from '@/utils/haversine_distance';
import toast, { Toaster } from "react-hot-toast";
import GetFilteredAdvertisements from '@/actions/GetFilteredAdvertisements';
import { findKeyWords } from '@/utils/findKeyWords';
import { AllDataContext } from './layout';
import GetCategories from '@/actions/GetCategories';

export const MapCoordinatesContext = createContext();

export default function MarketPlace() {
  const [newData, setNewData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useContext(AllDataContext);
  const [located, setLocated] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coords, setCoords] = useState({
    lat: 39.8283,
    lng: -98.5795
  });

  const params = useSearchParams()

  const radius = params.get('radius') ? params.get('radius') : 50
  const type = params.get('type')
  const adGroup = params.get('adGroup')
  const priceMin = params.get('priceMin') ? params.get('priceMin') : 0
  const priceMax = params.get('priceMax') ? params.get('priceMax') : 1000000
  const key = params.get("key");
  const latitude = params.get("latitude")
  const longitude = params.get("longitude")

  const router = useRouter();
  useEffect(() => {
    if (located) {
      console.log('alldata inside the effect', allData)

      async function getAds() {
        setNewData([])
        const response = await GetFilteredAdvertisements(type, adGroup, priceMin, priceMax, key)
        setAllData(response)
        const categories = await GetCategories()
        setCategories(categories)
        setIsDataLoaded(true);

      }

      if(allData.length == 0){
        getAds();
      }else{
        setIsDataLoaded(true);
      }

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


  }, [located]);

  console.log('located',located)

  const filteredData = useMemo(() => {

    return allData.filter(ad => {
      let distance
      if (latitude && longitude) {
        const filterCoords = {
          lat: latitude,
          lng: longitude
        }
        distance = haversine_distance(filterCoords, { lat: ad.lat, lng: ad.long });
      } else {
        distance = haversine_distance(coords, { lat: ad.lat, lng: ad.long });

      }

      let types = "";
      if (type == 1) {
        types = "4,5,6,7,8";
      } else if (type == 2) {
        types = "9,10,11,12";
      } else if (type == 3) {
        types = "17,18";
      }

      const isKeyFound =  findKeyWords(ad, key,categories)
      console.log(  'isKeyFound',isKeyFound)
      const filterConditions = [
        distance < radius || radius == 2000,
        type ? types.includes(ad.category_id) : true,
        adGroup ? ad.created_by_type == adGroup : true,
        (ad.price >= priceMin && ad.price <= priceMax),
        key ?  isKeyFound : true

      ];

      return filterConditions.every(condition => condition);
    });
  }, [allData, located, coords, type, adGroup, priceMin, priceMax, router, radius, key, latitude, longitude]);

  useEffect(() => {
    setNewData(()=>(filteredData));
    // toast.success('data loaded')
  }, [filteredData]);

  return (

    <div className=' w-full flex absolute top-0 h-[100%]' >
      <div><Toaster /></div>
        <MapCoordinatesContext.Provider value={[coords, setCoords]}>
          <Map newData={newData} isDataLoaded={isDataLoaded} located={located}/>
        </MapCoordinatesContext.Provider>

    </div>

  )
}
