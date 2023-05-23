"use client"
import React,{useEffect,useState,createContext} from 'react'
import axios from 'axios';
import Map from '@/components/map/Map';
import { useRouter } from 'next/navigation';
import haversine_distance from '@/utils/haversine_distance';

export const MapCoordinatesContext = createContext();
export const FilterContext = createContext();


export default function MarketPlace() {
  const [newData, setNewData] = useState([]);
  const [located, setLocated] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coords, setCoords] = useState({
    lat: -3.745,
    lng: -38.523
  });
  const [adFilter, setAdFilter] = useState({
    radius:50,
    type:'',
    adGroup:'',
    priceMin:0,
    priceMax:1000000
  });
  console.log('mudou o filtro',adFilter)
  const router = useRouter();
  console.log('altercord',coords)
  useEffect(() => {
    if (located){
      async function getAds() {
        const response = await axios("http://localhost:8000/api/advertisements", 
          {
            withCredentials: true,
            headers: {
              'content-type': 'application/json'
            }}
        );
        if (response.status === 200) {
          // console.log(response.data)
          response.data.data.map((ad)=>{
            // Calculate  the distance between markers
            var distance = haversine_distance(coords, {lat:ad.lat,lng:ad.long});
            if (distance < 50){
              setNewData((prevData)=>[...prevData,ad])
            }
          })
          setIsDataLoaded(true)
        } else {
          router.push('/')
        }
      }
      getAds();
    }else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          setCoords({lat:position.coords.latitude,lng:position.coords.longitude})
          setLocated(true)
        });
      }
    }
      

  }, [located,coords]);
  
  return (

    <div className=' w-full flex absolute top-0 h-[100%]' >
      <MapCoordinatesContext.Provider value={[coords,setCoords]}>
        <FilterContext.Provider value={[adFilter,setAdFilter]}>
          <Map newData = {newData} isDataLoaded={isDataLoaded}/>
        </FilterContext.Provider>
      </MapCoordinatesContext.Provider>

    </div>

  )
}
