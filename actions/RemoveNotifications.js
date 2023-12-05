
export default async function RemoveNotifications( notifications, notificationId) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/clear-notifications`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            notifications: notifications,
            notificationId: notificationId
        }),
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
  