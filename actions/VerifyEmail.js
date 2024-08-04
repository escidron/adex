

export default async function VerifyEmail(id,token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/verify-email`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              id: id,
              token: token
            }),
          }
        );
    
        if (response.status === 200) {
          const res = await response.json();
          return true
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    