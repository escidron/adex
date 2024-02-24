export default async function GetSocialMediaInfo(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-social-media-info`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: id ? JSON.stringify({ id: id }) : null

        }
      );
      if (response.status === 200) {
        const res = await response.json();
        const plataforms = res.data;
        return plataforms;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }