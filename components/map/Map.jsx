"use client"
import React,{useState,useContext} from 'react'
import { GoogleMap, useJsApiLoader, Marker, MapContext } from '@react-google-maps/api';
import loading from '../../public/loading.gif'
import Image from 'next/image';
import { MapCoordinatesContext } from '@/app/market-place/page';
import MarketPlaceGrid from '../market place/marketPlaceGrid/MarketPlaceGrid';
import icon from '../../public/mylocation.ico'
const containerStyle = {
  width: '100%',
  height: '91vh'
};

function Map({ newData,isDataLoaded }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyATrfv2ahP3hrMsAP8x5vwq3Hpy6qjGQgM',
    libraries: ["places"],
  })

  const [map, setMap] = React.useState(null)
  const [coords] = useContext(MapCoordinatesContext)

  const [selected, setSelected] = useState(null);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (

    <div className='w-full h-[100vh]'>
      <div className={`h-[100%] fixed  left-0 w-full lg:w-[60%]`}>
          <MarketPlaceGrid newData = {newData} isDataLoaded={isDataLoaded}/>
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
          onClick={() => alert('qwe')}         
          icon={{ 
                url: '/mylocation.ico',
              }}/>

          {newData.map((marker)=>{

            return(
              <Marker key={marker.id } 

              className='h-4'
              position={{lat:parseFloat(marker.lat),lng:parseFloat(marker.long)}} 
              map={map} 
              onClick={() => alert('qwe')} 
              icon={{ 
                url: marker.status==1?'/greenPin.ico':'/redPin.ico',
              }}
              />
              )

          })}
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

export default React.memo(Map)

