export default async function GetMyBookings(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-booking`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ advertisementId: id }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        
        if (res.data.length > 0) {
          const myBookings = res.data;
          const bookingStatus = res.status;
          return {myBookings,bookingStatus};
        } else {
          const myBookings = []
          const bookingStatus = {}
          {myBookings,bookingStatus};
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  