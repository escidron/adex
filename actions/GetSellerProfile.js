export default async function GetSellerProfile(companyId) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/seller-profile`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ companyId: companyId }),

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
  