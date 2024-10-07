export default async function GetAudiencePreference(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-audience-preference`,
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
        const preference = res.data;
        return preference;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }