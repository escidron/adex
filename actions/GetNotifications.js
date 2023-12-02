export default async function GetNotifications() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/notifications`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        if (res.notifications.length > 0) {
          const notifications = res.notifications;
          return notifications;
        } else {
          return [];
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }