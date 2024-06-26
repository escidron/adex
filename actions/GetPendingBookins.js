export default async function GetPendingBookings() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-pending-bookings`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        const pendingBookings = res.data;
        return pendingBookings;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  