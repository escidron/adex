export default async function GetAvailableSellers() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/available-sellers`,
        {
          method:  "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",  
        }
      );
      if (response.status === 200) {
        const availableSellers = await response.json();
        return availableSellers.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  