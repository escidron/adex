export default async function GetChatMessages(key) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/chat-info`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ key: key }),

        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        if (res.messages.length > 0) {
          const messages = res.messages;
          return messages;
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