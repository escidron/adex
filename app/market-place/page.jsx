"use client"
import MarketPlaceGrid from '@/components/marketPlaceGrid/MarketPlaceGrid'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Map from '@/components/map/Map';
export default function MarketPlace() {
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    async function getAds() {
      const response = await axios("http://localhost:8000/api/advertisements", 
        {
          withCredentials: true,
          headers: {
            'content-type': 'application/json'
          }}
      );
      if (response.status === 200) {
        setNewData(response.data.data)

      } else {
        console.log('sin usuario');
      }
    }
    getAds();
  }, []);
  return (
    <div className=' w-full flex absolute top-0 h-[100%]' >
        <div className={`h-[100%] fixed top-[-90px] left-0 w-[60%] mt-[90px] ${newData.length>0?'overflow-y-scroll':''}`}>
          <MarketPlaceGrid newData = {newData}/>
        </div>
        <div className='h-[100%] fixed top-0 right-0  bg-green-600 w-[40%] mt-[90px]  '>
          <Map />
        </div>
    </div>
    
  )
}
