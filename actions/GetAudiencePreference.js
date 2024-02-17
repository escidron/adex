export default async function GetAudiencePreference() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-audience-preference`,
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
        const preference = res.data;
        console.log('geting preferences',preference)
        return preference;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }