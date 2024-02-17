export default async function GetSocialMediaInfo() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-social-media-info`,
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