
export default async function GetFilteredAdvertisements( ) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',        
          "X-Client-Token": process.env.NEXT_PUBLIC_CLIENT_TOKEN || "",
          },
          credentials: "include",
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
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
  