export default async function GetSellerListing(id,companyId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/seller-listings`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: id,companyId:companyId }),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      const listings = res;
      return listings;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
