
export default async function RemoveListing( id) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/delete-advertisement`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ id: id }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        const message = res.message
        return message;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }