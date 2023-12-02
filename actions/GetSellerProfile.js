export default async function GetSellerProfile() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/seller-profile`,
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
        const seller = res.data
        return seller;
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  