
export default async function RemovePreference( preferenceId) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/remove-audience-preference`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({preferenceId}),
        }
      );
  
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
  