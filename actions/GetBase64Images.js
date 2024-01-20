
export default async function GetBase64Images( id) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-base64-images`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            id: id
          
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        const images = res.data
        return images;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  