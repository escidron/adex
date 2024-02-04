
export default async function SendFiles(data) {
    try {
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/send-files`, 
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          },
          credentials: "include",
          body: data, 

        });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
  
    } catch (error) {
      console.log(error);
      return null;
    }
  }