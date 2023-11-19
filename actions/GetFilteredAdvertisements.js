
export default async function GetFilteredAdvertisements( ) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        console.log('res',res)
        const listings = res.data
        return listings;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  