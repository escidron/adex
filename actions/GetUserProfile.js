

export default async function GetUserProfile(token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
      {
        method: "GET",
        headers: {
          Cookie: `jwt=${token}`, // Inclui o token no cabeçalho Cookie
        },
        credentials: "include",
      }
    );

    if (response.status === 200) {
      const user = await response.json();
        return user        
    }else{
        return null
    }

  }