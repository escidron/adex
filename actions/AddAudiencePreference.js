

export default async function AddAudiencePreference(preference) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/add-audience-preference`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ preference }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        return res
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  