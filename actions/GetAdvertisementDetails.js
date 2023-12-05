
export default async function GetAdvertisementDetails( id,notificationId) {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/details`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'        
        },
        credentials: "include",
        body: JSON.stringify({ 
          id: id,
          notificationId: notificationId 
        
        }),
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      console.log('response',res.data)
      const myListing = res.data
      return myListing;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
