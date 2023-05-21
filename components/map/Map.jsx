"use client"
import React from 'react'
import dotenv from 'dotenv';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
dotenv.config();

const containerStyle = {
    width: '100%',
    height: '91vh'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  function Map() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyATrfv2ahP3hrMsAP8x5vwq3Hpy6qjGQgM'
    })
  
    const [map, setMap] = React.useState(null)
  
    // const onLoad = React.useCallback(function callback(map) {
    //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //   const bounds = new window.google.maps.LatLngBounds(center);
    //   map.fitBounds(bounds);
  
    //   setMap(map)
    // }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
  
    return isLoaded ? (
        <div className='w-full h-[100vh]'>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        //   onLoad={onLoad}
          onUnmount={onUnmount}
        //   options={{
        //     zoomControl:false
        //   }}
          >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
            </div>
    ) : <></>
  }
  
  export default React.memo(Map)
