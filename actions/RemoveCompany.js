
export default async function RemoveCompany( id) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/remove-company`,
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
        console.log('response',res)
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
  