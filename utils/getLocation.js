export const getLocation = ()=>{
    navigator.geolocation.getCurrentPosition(
        (position) => {
          return { latitude: position.coords.latitude, longitude: position.coords.longitude };
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        })
}