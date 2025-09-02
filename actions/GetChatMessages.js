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
          body: JSON.stringify({ key: key || null }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        const messages = res.messages || res.data || res || [];
        
        if (messages && messages.length > 0) {
          return messages;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      return [];
    }
  }